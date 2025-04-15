
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FormData {
  type: 'contact' | 'booking';
  name: string;
  email: string;
  phone?: string;
  message?: string;
  move_date?: string;
  move_time?: string;
  address?: string;
  package_type?: string;
  additional_services?: string;
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: FormData = await req.json();
    let emailContent: string;
    let subject: string;

    if (formData.type === 'contact') {
      subject = `New Contact Form Submission from ${formData.name}`;
      emailContent = `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
      `;
    } else {
      subject = `New Booking Request from ${formData.name}`;
      emailContent = `
        <h1>New Booking Request</h1>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Move Date:</strong> ${formData.move_date}</p>
        <p><strong>Move Time:</strong> ${formData.move_time}</p>
        <p><strong>Address:</strong> ${formData.address}</p>
        <p><strong>Package:</strong> ${formData.package_type}</p>
        <p><strong>Additional Services:</strong> ${formData.additional_services || 'None'}</p>
        <p><strong>Notes:</strong> ${formData.notes || 'None'}</p>
      `;
    }

    const { data, error } = await resend.emails.send({
      from: "Oasis Moving & Storage <onboarding@resend.dev>",
      to: ["westerville.moving@gmail.com"],
      subject: subject,
      html: emailContent,
    });

    if (error) {
      throw error;
    }

    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );
  }
};

serve(handler);
