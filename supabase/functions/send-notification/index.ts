
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

    const emailStyles = `
      <style>
        .email-container {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .header {
          background-color: #1a5f7a;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          background-color: white;
          padding: 20px;
          border-radius: 0 0 5px 5px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .field {
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }
        .label {
          font-weight: bold;
          color: #1a5f7a;
        }
        .value {
          margin-top: 5px;
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 12px;
          color: #888;
        }
      </style>
    `;

    if (formData.type === 'contact') {
      subject = `🔔 New Contact Form Submission from ${formData.name}`;
      emailContent = `
        ${emailStyles}
        <div class="email-container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>Received on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${formData.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${formData.email}</div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${formData.phone || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${formData.message}</div>
            </div>
          </div>
          <div class="footer">
            <p>This message was sent from the Oasis Moving & Storage website contact form.</p>
          </div>
        </div>
      `;
    } else {
      subject = `📦 New Moving Service Request from ${formData.name}`;
      emailContent = `
        ${emailStyles}
        <div class="email-container">
          <div class="header">
            <h1>New Moving Service Request</h1>
            <p>Received on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Customer Information</div>
              <div class="value">
                <strong>Name:</strong> ${formData.name}<br>
                <strong>Email:</strong> ${formData.email}<br>
                <strong>Phone:</strong> ${formData.phone}
              </div>
            </div>
            
            <div class="field">
              <div class="label">Move Details</div>
              <div class="value">
                <strong>Date:</strong> ${formData.move_date}<br>
                <strong>Time:</strong> ${formData.move_time}<br>
                <strong>Address:</strong> ${formData.address}
              </div>
            </div>
            
            <div class="field">
              <div class="label">Service Package</div>
              <div class="value">
                <strong>Selected Package:</strong> ${formData.package_type}<br>
                <strong>Additional Services:</strong> ${formData.additional_services || 'None requested'}
              </div>
            </div>
            
            <div class="field">
              <div class="label">Additional Notes</div>
              <div class="value">${formData.notes || 'No additional notes provided'}</div>
            </div>
          </div>
          <div class="footer">
            <p>This message was sent from the Oasis Moving & Storage website booking form.</p>
          </div>
        </div>
      `;
    }

    // Make multiple attempts to send the email if needed
    let attempts = 0;
    const maxAttempts = 3;
    let lastError = null;
    
    while (attempts < maxAttempts) {
      try {
        console.log(`Attempt ${attempts + 1} to send email`);
        
        const { data, error } = await resend.emails.send({
          from: "Oasis Moving & Storage <onboarding@resend.dev>",
          to: ["shabhuzayfah@gmail.com", "zay@oasismovingandstorage.com"],
          subject: subject,
          html: emailContent,
          reply_to: formData.email,
        });

        if (error) {
          console.error(`Error on attempt ${attempts + 1}:`, error);
          lastError = error;
          attempts++;
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts)));
          continue;
        }

        console.log("Email sent successfully:", data);
        return new Response(JSON.stringify({ success: true }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      } catch (error) {
        console.error(`Unexpected error on attempt ${attempts + 1}:`, error);
        lastError = error;
        attempts++;
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts)));
      }
    }

    // If we've reached here, all attempts failed
    console.error(`Failed to send email after ${maxAttempts} attempts. Last error:`, lastError);
    return new Response(
      JSON.stringify({ error: lastError?.message || "Failed to send email after multiple attempts" }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
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
