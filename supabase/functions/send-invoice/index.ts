
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { PDFDocument, rgb, StandardFonts } from "npm:pdf-lib@1.17.1";

// (Optional) Twilio
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

// Helper function for logging
const logEvent = (event: string, details?: any) => {
  console.log(`[INVOICE-SERVICE] ${event}${details ? ` | ${JSON.stringify(details)}` : ''}`);
};

async function generatePdfInvoice({ booking, amountPaid, balanceDue, dueDate, paymentLink, invoiceNumber }: any) {
  logEvent("Generating PDF invoice", { bookingId: booking.id, amountPaid, balanceDue });
  
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  
  // Embed fonts
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  // Set colors
  const primaryColor = rgb(0.91, 0.7, 0.43); // Oasis brand color
  const textColor = rgb(0.2, 0.2, 0.2);
  const lightTextColor = rgb(0.5, 0.5, 0.5);
  
  // Draw header
  page.drawRectangle({
    x: 0,
    y: height - 120,
    width: width,
    height: 120,
    color: rgb(0.96, 0.96, 0.96),
  });
  
  // Draw logo text (placeholder for actual logo)
  page.drawText("Oasis Moving & Storage", {
    x: 50,
    y: height - 50,
    size: 24,
    font: boldFont,
    color: primaryColor,
  });
  
  // Draw invoice label
  page.drawText("INVOICE", {
    x: width - 150,
    y: height - 50,
    size: 24,
    font: boldFont,
    color: textColor,
  });
  
  // Draw invoice number
  page.drawText(`Invoice #: ${invoiceNumber || 'OM-' + Math.floor(Math.random() * 10000)}`, {
    x: width - 150,
    y: height - 80,
    size: 12,
    font: regularFont,
    color: lightTextColor,
  });
  
  // Draw invoice date
  page.drawText(`Date: ${new Date().toLocaleDateString()}`, {
    x: 50,
    y: height - 90,
    size: 12,
    font: regularFont,
    color: lightTextColor,
  });
  
  // Draw customer info
  let cursor = height - 180;
  page.drawText("BILLED TO:", {
    x: 50,
    y: cursor,
    size: 12,
    font: boldFont,
    color: textColor,
  });
  
  cursor -= 20;
  page.drawText(`${booking.name}`, {
    x: 50,
    y: cursor,
    size: 12,
    font: regularFont,
    color: textColor,
  });
  
  cursor -= 20;
  page.drawText(`${booking.email}`, {
    x: 50,
    y: cursor,
    size: 12,
    font: regularFont,
    color: textColor,
  });
  
  if (booking.phone) {
    cursor -= 20;
    page.drawText(`${booking.phone}`, {
      x: 50,
      y: cursor,
      size: 12,
      font: regularFont,
      color: textColor,
    });
  }
  
  // Draw booking details
  cursor -= 40;
  page.drawText("SERVICE DETAILS:", {
    x: 50,
    y: cursor,
    size: 12,
    font: boldFont,
    color: textColor,
  });
  
  cursor -= 20;
  page.drawText(`Moving Date: ${new Date(booking.move_date).toLocaleDateString()}`, {
    x: 50,
    y: cursor,
    size: 12,
    font: regularFont,
    color: textColor,
  });
  
  cursor -= 20;
  page.drawText(`Time: ${booking.move_time}`, {
    x: 50,
    y: cursor,
    size: 12,
    font: regularFont,
    color: textColor,
  });
  
  cursor -= 20;
  page.drawText(`Package: ${booking.package_type || 'Standard Moving Service'}`, {
    x: 50,
    y: cursor,
    size: 12,
    font: regularFont,
    color: textColor,
  });
  
  if (booking.additional_services) {
    cursor -= 20;
    page.drawText(`Additional Services: ${booking.additional_services}`, {
      x: 50,
      y: cursor,
      size: 12,
      font: regularFont,
      color: textColor,
    });
  }
  
  // Draw payment table
  cursor -= 60;
  
  // Table header
  page.drawRectangle({
    x: 50,
    y: cursor,
    width: width - 100,
    height: 30,
    color: primaryColor,
  });
  
  page.drawText("Description", {
    x: 70,
    y: cursor + 10,
    size: 12,
    font: boldFont,
    color: rgb(1, 1, 1),
  });
  
  page.drawText("Amount (USD)", {
    x: width - 150,
    y: cursor + 10,
    size: 12,
    font: boldFont,
    color: rgb(1, 1, 1),
  });
  
  // Deposit row
  cursor -= 30;
  page.drawRectangle({
    x: 50,
    y: cursor,
    width: width - 100,
    height: 30,
    color: rgb(0.96, 0.96, 0.96),
  });
  
  page.drawText("Deposit (Paid)", {
    x: 70,
    y: cursor + 10,
    size: 12,
    font: regularFont,
    color: textColor,
  });
  
  page.drawText(`$${(amountPaid/100).toFixed(2)}`, {
    x: width - 150,
    y: cursor + 10,
    size: 12,
    font: regularFont,
    color: textColor,
  });
  
  // Balance row
  cursor -= 30;
  page.drawRectangle({
    x: 50,
    y: cursor,
    width: width - 100,
    height: 30,
    color: rgb(1, 1, 1),
  });
  
  page.drawText(`Balance Due (by ${dueDate})`, {
    x: 70,
    y: cursor + 10,
    size: 12,
    font: boldFont,
    color: rgb(1, 1, 1),
  });
  
  page.drawText(`$${(balanceDue/100).toFixed(2)}`, {
    x: width - 150,
    y: cursor + 10,
    size: 12,
    font: boldFont,
    color: rgb(1, 1, 1),
  });
  
  // Payment instructions
  cursor -= 80;
  page.drawText("PAYMENT INSTRUCTIONS:", {
    x: 50,
    y: cursor,
    size: 14,
    font: boldFont,
    color: textColor,
  });
  
  cursor -= 30;
  page.drawText("To pay your balance online, please visit:", {
    x: 50,
    y: cursor,
    size: 12,
    font: regularFont,
    color: textColor,
  });
  
  cursor -= 25;
  page.drawText(paymentLink, {
    x: 50,
    y: cursor,
    size: 12,
    font: regularFont,
    color: rgb(0, 0.3, 0.8),
  });
  
  // Footer
  const footerPosition = 50;
  page.drawLine({
    start: { x: 50, y: footerPosition + 30 },
    end: { x: width - 50, y: footerPosition + 30 },
    thickness: 1,
    color: lightTextColor,
  });
  
  page.drawText("Oasis Moving & Storage", {
    x: 50,
    y: footerPosition + 15,
    size: 10,
    font: boldFont,
    color: textColor,
  });
  
  page.drawText("123 Main Street, Westerville, OH • (555) 123-4567 • support@oasismovingandstorage.com", {
    x: 50,
    y: footerPosition,
    size: 10,
    font: regularFont,
    color: lightTextColor,
  });
  
  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Extract request data
    const { booking, amountPaid, balanceDue, dueDate, paymentLink, phone, invoiceNumber } = await req.json();
    
    logEvent("Invoice request received", { 
      bookingId: booking?.id, 
      email: booking?.email,
      amountPaid, 
      balanceDue 
    });
    
    // Input validation
    if (!booking?.email) throw new Error("Invalid booking data - email is required");
    if (amountPaid === undefined) throw new Error("Amount paid must be specified");
    if (balanceDue === undefined) throw new Error("Balance due must be specified");
    if (!dueDate) throw new Error("Due date is required");
    if (!paymentLink) throw new Error("Payment link is required");
    
    // Generate invoice PDF
    const pdfBytes = await generatePdfInvoice({ 
      booking, 
      amountPaid, 
      balanceDue, 
      dueDate, 
      paymentLink,
      invoiceNumber 
    });
    
    const pdfBase64 = btoa(String.fromCharCode(...pdfBytes));
    
    logEvent("PDF invoice generated", { size: pdfBytes.length });
    
    // Prepare a professional HTML email template
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Moving Invoice</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background-color: #e8b56e; padding: 20px; text-align: center; }
          .header h1 { color: #fff; margin: 0; }
          .content { padding: 20px; }
          .invoice-details { background-color: #f7f7f7; border-radius: 5px; padding: 15px; margin: 20px 0; }
          .button { display: inline-block; background-color: #e8b56e; color: white; text-decoration: none; padding: 12px 25px; border-radius: 4px; font-weight: bold; }
          .footer { background-color: #f7f7f7; padding: 15px; text-align: center; font-size: 12px; color: #777; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Oasis Moving & Storage</h1>
        </div>
        <div class="content">
          <h2>Thank You for Your Booking!</h2>
          <p>Hello ${booking.name},</p>
          <p>Thank you for choosing Oasis Moving & Storage. We're excited to help with your upcoming move!</p>
          
          <div class="invoice-details">
            <h3>Invoice Summary</h3>
            <p><strong>Deposit Paid:</strong> $${(amountPaid/100).toFixed(2)}</p>
            <p><strong>Balance Due:</strong> $${(balanceDue/100).toFixed(2)}</p>
            <p><strong>Due Date:</strong> ${dueDate}</p>
            <p><strong>Moving Date:</strong> ${new Date(booking.move_date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${booking.move_time}</p>
          </div>
          
          <p>Your invoice is attached to this email. You can also pay your balance online by clicking the button below:</p>
          
          <p style="text-align: center; margin: 30px 0;">
            <a href="${paymentLink}" class="button">Pay Balance Now</a>
          </p>
          
          <p>If you have any questions or need to modify your booking, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>The Oasis Moving Team</p>
        </div>
        <div class="footer">
          <p>Oasis Moving & Storage | 123 Main Street, Westerville, OH | (555) 123-4567</p>
          <p>This email was sent to ${booking.email}</p>
        </div>
      </body>
      </html>
    `;
    
    // Send email via Resend
    try {
      const emailResponse = await resend.emails.send({
        from: "Oasis Moving <no-reply@oasismovingandstorage.com>",
        to: [booking.email],
        subject: "Your Moving Invoice",
        html: emailHtml,
        attachments: [{
          filename: `Invoice-${booking.id || 'OasisMoving'}.pdf`,
          content: pdfBase64,
        }],
      });
      
      logEvent("Email sent successfully", { 
        emailId: emailResponse.id,
        recipient: booking.email 
      });
    } catch (emailError) {
      logEvent("Error sending email", { error: emailError.message });
      // Continue with SMS - don't fail the whole request if just email fails
    }

    // Send SMS via Twilio if phone is provided
    if (phone && accountSid && authToken && fromPhone) {
      try {
        const client = twilio(accountSid, authToken);
        const smsResult = await client.messages.create({
          body: `Oasis Moving & Storage: Your invoice for $${(balanceDue/100).toFixed(2)} is due by ${dueDate}. Pay online: ${paymentLink}`,
          from: fromPhone,
          to: phone,
        });
        
        logEvent("SMS sent successfully", { 
          smsId: smsResult.sid,
          recipient: phone 
        });
      } catch (smsError) {
        logEvent("Error sending SMS", { error: smsError.message });
        // Continue - don't fail the whole request if just SMS fails
      }
    } else {
      logEvent("SMS not sent - missing configuration", { 
        hasPhone: !!phone,
        hasTwilioConfig: !!(accountSid && authToken && fromPhone)
      });
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: "Invoice sent successfully" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    logEvent("Error in send-invoice function", { 
      error: error.message,
      stack: error.stack 
    });
    
    return new Response(JSON.stringify({ 
      error: error.message,
      code: error.code || 'unknown_error'
    }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
