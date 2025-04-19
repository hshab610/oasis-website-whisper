import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Configure Resend API key
const resendApiKey = Deno.env.get("RESEND_API_KEY") || "re_dummy_key_for_development";
const resend = new Resend(resendApiKey);

// Define recipient emails (both personal and business)
const RECIPIENT_EMAILS = ["shabhuzayfah@gmail.com", "zay@oasismovingandstorage.com"];
const FROM_EMAIL = "notifications@oasismovingandstorage.com";

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
  submission_time?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Function invoked with method:", req.method);
    
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    let formData: FormData;
    
    try {
      formData = await req.json();
      console.log("Received form data:", formData);
      
      // Enhanced validation with more descriptive errors
      if (!formData) {
        throw new Error("Missing form data");
      }
      
      if (!formData.name || formData.name.trim().length < 2) {
        throw new Error("Name is required (minimum 2 characters)");
      }
      
      if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        throw new Error("Valid email address is required");
      }
      
      if (!formData.type || !['contact', 'booking'].includes(formData.type)) {
        throw new Error("Invalid form type");
      }
      
      // Additional validation for booking forms
      if (formData.type === 'booking') {
        if (!formData.move_date) {
          throw new Error("Move date is required for booking requests");
        }
        
        if (!formData.move_time) {
          throw new Error("Move time is required for booking requests");
        }
        
        if (!formData.package_type) {
          throw new Error("Package type is required for booking requests");
        }
      } else {
        // Contact form validation
        if (!formData.message || formData.message.trim().length < 10) {
          throw new Error("Please provide a detailed message (minimum 10 characters)");
        }
      }
    } catch (parseError) {
      console.error("Error parsing or validating request body:", parseError);
      return new Response(
        JSON.stringify({ error: parseError instanceof Error ? parseError.message : "Invalid request body" }), 
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    // Check if API key is properly set
    if (resendApiKey === "re_dummy_key_for_development") {
      console.warn("RESEND_API_KEY is not set. This would normally prevent emails from being sent.");
      // For development purposes, we'll return a success response
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Email would have been sent in production. RESEND_API_KEY not configured.",
          data: formData 
        }), 
        { headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    let emailContent: string;
    let subject: string;
    const submissionTime = formData.submission_time || new Date().toISOString();
    const formattedDate = new Date(submissionTime).toLocaleDateString();
    const formattedTime = new Date(submissionTime).toLocaleTimeString();

    const emailStyles = `
      <style>
        .email-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
        }
        .header {
          background-color: #1a5f7a;
          color: white;
          padding: 24px;
          border-radius: 8px 8px 0 0;
          text-align: center;
        }
        .content {
          background-color: #f8f9fa;
          padding: 24px;
          border-radius: 0 0 8px 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .section {
          margin-bottom: 24px;
          padding: 16px;
          background: white;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }
        .section-title {
          color: #1a5f7a;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e9ecef;
        }
        .field {
          margin-bottom: 12px;
          display: flex;
          flex-direction: column;
        }
        .label {
          font-weight: 600;
          color: #495057;
          margin-bottom: 4px;
        }
        .value {
          color: #212529;
        }
        .footer {
          margin-top: 24px;
          text-align: center;
          color: #6c757d;
          font-size: 14px;
        }
        .urgent {
          background-color: #fff3cd;
          color: #856404;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 16px;
          border: 1px solid #ffeeba;
        }
        @media (max-width: 600px) {
          .email-container {
            padding: 12px;
          }
          .content {
            padding: 16px;
          }
          .section {
            padding: 12px;
          }
        }
      </style>
    `;

    if (formData.type === 'contact') {
      subject = `🔔 New Contact Form Submission from ${formData.name}`;
      emailContent = `
        ${emailStyles}
        <div class="email-container">
          <div class="header">
            <h1 style="margin:0;font-size:24px;">New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="section">
              <div class="section-title">Customer Information</div>
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${formData.name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value">${formData.email}</div>
              </div>
              <div class="field">
                <div class="label">Phone</div>
                <div class="value">${formData.phone || 'Not provided'}</div>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Message</div>
              <div class="value" style="white-space: pre-wrap;">${formData.message}</div>
            </div>
          </div>
          <div class="footer">
            <p>Submitted via Oasis Moving & Storage website contact form</p>
          </div>
        </div>
      `;
    } else {
      // Check if it's an urgent request (within 7 days)
      const moveDate = new Date(formData.move_date);
      const today = new Date();
      const daysDifference = Math.ceil((moveDate - today) / (1000 * 60 * 60 * 24));
      const isUrgent = daysDifference <= 7;
      
      subject = `📦 ${isUrgent ? '[URGENT] ' : ''}New Moving Quote Request from ${formData.name}`;
      emailContent = `
        ${emailStyles}
        <div class="email-container">
          <div class="header">
            <h1 style="margin:0;font-size:24px;">New Moving Quote Request</h1>
          </div>
          <div class="content">
            ${isUrgent ? `
              <div class="urgent">
                ⚡ URGENT REQUEST: Move scheduled in ${daysDifference} day${daysDifference === 1 ? '' : 's'}
              </div>
            ` : ''}
            
            <div class="section">
              <div class="section-title">Customer Information</div>
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${formData.name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value">${formData.email}</div>
              </div>
              <div class="field">
                <div class="label">Phone</div>
                <div class="value">${formData.phone}</div>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Move Details</div>
              <div class="field">
                <div class="label">Date</div>
                <div class="value">${new Date(formData.move_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</div>
              </div>
              <div class="field">
                <div class="label">Preferred Time</div>
                <div class="value">${formData.move_time}</div>
              </div>
              <div class="field">
                <div class="label">Location</div>
                <div class="value">${formData.address}</div>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Service Details</div>
              <div class="field">
                <div class="label">Selected Package</div>
                <div class="value">${formData.package_type}</div>
              </div>
              ${formData.additional_services ? `
                <div class="field">
                  <div class="label">Additional Services</div>
                  <div class="value">${formData.additional_services}</div>
                </div>
              ` : ''}
              ${formData.notes ? `
                <div class="field">
                  <div class="label">Additional Notes</div>
                  <div class="value">${formData.notes}</div>
                </div>
              ` : ''}
            </div>
          </div>
          <div class="footer">
            <p>Submitted via Oasis Moving & Storage website booking form</p>
          </div>
        </div>
      `;
    }

    // For development mode without API key, return mock success
    if (resendApiKey === "re_dummy_key_for_development") {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Form submission successful. Email would be sent in production.",
          data: { type: formData.type } 
        }), 
        { headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Preparing to send email with subject:", subject);
    
    // Make multiple attempts to send the email
    let attempts = 0;
    const maxAttempts = 3;
    let lastError = null;
    
    while (attempts < maxAttempts) {
      try {
        console.log(`Attempt ${attempts + 1} to send notification email`);
        
        const { data, error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: RECIPIENT_EMAILS,
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

        console.log("Notification email sent successfully:", data);
        
        // Also send confirmation to the customer
        try {
          console.log("Sending confirmation email to customer");
          const confirmationSubject = formData.type === 'contact' 
            ? "We've received your message" 
            : "Your moving quote request has been received";
            
          const confirmationHtml = formData.type === 'contact'
            ? `
              ${emailStyles}
              <div class="email-container">
                <div class="header">
                  <h1>Thank You for Contacting Us</h1>
                </div>
                <div class="content">
                  <p>Hello ${formData.name},</p>
                  <p>Thank you for reaching out to Oasis Moving & Storage. We have received your message and will get back to you as soon as possible.</p>
                  <p>Our team strives to respond to all inquiries within 24 hours.</p>
                  <p>Best regards,<br>The Oasis Moving & Storage Team</p>
                </div>
              </div>
            `
            : `
              ${emailStyles}
              <div class="email-container">
                <div class="header">
                  <h1>Your Moving Quote Request</h1>
                </div>
                <div class="content">
                  <p>Hello ${formData.name},</p>
                  <p>Thank you for requesting a quote from Oasis Moving & Storage. We have received your information and will prepare a personalized quote for your upcoming move.</p>
                  <p>A member of our team will contact you within 24 hours to discuss your moving needs and finalize your quote.</p>
                  <p>Best regards,<br>The Oasis Moving & Storage Team</p>
                </div>
              </div>
            `;
            
          const { error: confirmError } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [formData.email],
            subject: confirmationSubject,
            html: confirmationHtml,
          });
          
          if (confirmError) {
            console.error("Error sending confirmation email to customer:", confirmError);
          } else {
            console.log("Confirmation email sent to customer");
          }
        } catch (confirmError) {
          console.error("Exception sending confirmation email to customer:", confirmError);
          // Continue even if customer confirmation fails
        }
        
        return new Response(JSON.stringify({ 
          success: true,
          message: "Form submitted successfully and notifications sent" 
        }), {
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
    
    // Return a "success" response even if email sending failed, since the database entry was successful
    return new Response(
      JSON.stringify({ 
        success: true, 
        warning: "Your submission was received, but email notification couldn't be sent. Our team will still process your request."
      }),
      { 
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "An unexpected error occurred",
        success: false
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );
  }
};

serve(handler);
