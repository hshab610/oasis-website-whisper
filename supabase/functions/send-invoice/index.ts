
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { PDFDocument, rgb, StandardFonts } from "npm:pdf-lib@1.17.1";

// (Optional) Twilio — requires secret keys set in project
import twilio from "npm:twilio@4.17.0";
const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID") || "";
const authToken = Deno.env.get("TWILIO_AUTH_TOKEN") || "";
const fromPhone = Deno.env.get("TWILIO_PHONE") || "";

const resend = new Resend(Deno.env.get("RESEND_API_KEY") || "");
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2023-10-16" });

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function generatePdfInvoice({ booking, amountPaid, balanceDue, dueDate, paymentLink }) {
  // Generate a simple PDF invoice. Customize as needed.
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText("Oasis Moving & Storage", { x: 50, y: height - 50, size: 20, font });
  page.drawText("INVOICE", { x: width - 150, y: height - 50, size: 16, font, color: rgb(0, 0.5, 0) });
  page.drawText(`Date: ${new Date().toLocaleDateString()}`, { x: 50, y: height - 80, size: 12, font });
  page.drawText(`Booking #: ${booking.id || "-"}`, { x: 50, y: height - 95, size: 10, font });
  page.drawText(`Customer: ${booking.name} (${booking.email})`, { x: 50, y: height - 110, size: 10, font });
  
  let cursor = height - 145;
  page.drawText("Description                    Amount (USD)", { x: 50, y: cursor, size: 12, font });
  cursor -= 25;
  page.drawText(`Deposit`, { x: 50, y: cursor, size: 11, font });
  page.drawText(`$${(amountPaid/100).toFixed(2)}`, { x: 250, y: cursor, size: 11, font });
  cursor -= 25;
  page.drawText(`Balance Due by: ${dueDate}`, { x: 50, y: cursor, size: 11, font });
  cursor -= 20;
  page.drawText(`Amount Due: $${(balanceDue/100).toFixed(2)}`, { x: 250, y: cursor, size: 11, font, color: rgb(1,0,0) });
  
  // Pay Now button (just text with link, styled)
  cursor -= 40;
  page.drawText(`Pay your balance at:`, { x: 50, y: cursor, size: 11, font });
  cursor -= 20;
  page.drawText(paymentLink, { x: 50, y: cursor, size: 10, font, color: rgb(0,0,1) });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    // Expect POST: { booking: {...}, amountPaid: cents, balanceDue: cents, dueDate: string, paymentLink: string, phone: string }
    const { booking, amountPaid, balanceDue, dueDate, paymentLink, phone } = await req.json();
    if (!booking?.email) throw new Error("Invalid booking data");

    // Generate invoice PDF
    const pdfBytes = await generatePdfInvoice({ booking, amountPaid, balanceDue, dueDate, paymentLink });
    const pdfBase64 = btoa(String.fromCharCode(...pdfBytes));

    // Email PDF via Resend
    await resend.emails.send({
      from: "Oasis Moving <no-reply@oasismovingandstorage.com>",
      to: [booking.email],
      subject: "Your Moving Invoice",
      html: `
        <h2>Your Invoice</h2>
        <p>Thank you for your booking. Please find your invoice attached.</p>
        <ul>
          <li><b>Deposit Paid:</b> $${(amountPaid/100).toFixed(2)}</li>
          <li><b>Balance Due:</b> $${(balanceDue/100).toFixed(2)} by ${dueDate}</li>
        </ul>
        <p><a href="${paymentLink}">Pay Now</a></p>
        <p>If you need help just reply to this email or call us.</p>
      `,
      attachments: [{
        filename: "Invoice.pdf",
        content: pdfBase64,
      }],
    });

    // Send SMS via Twilio
    if (phone && accountSid && authToken && fromPhone) {
      const client = twilio(accountSid, authToken);
      await client.messages.create({
        body: `Your Oasis Moving invoice: pay deposit/balance at ${paymentLink}`,
        from: fromPhone,
        to: phone,
      });
    }

    // TODO: Save invoice to storage (Google Drive or backend) — Minimal, you could add integration here.

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
