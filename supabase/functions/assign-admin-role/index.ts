
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Define CORS headers to ensure the function can be called from the frontend
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  try {
    const { userId } = await req.json()
    
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'userId is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }
    
    console.log(`Assigning admin role to user: ${userId}`)
    
    // Create a Supabase client with the service role key for admin privileges
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    
    const adminClient = createClient(supabaseUrl, supabaseKey)
    
    // Insert the admin role directly into the database
    const { error } = await adminClient
      .from('user_roles')
      .insert({
        user_id: userId,
        role: 'admin'
      })
      .select()
    
    if (error) {
      console.error("Error assigning admin role:", error)
      return new Response(
        JSON.stringify({ error: `Failed to assign admin role: ${error.message}` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }
    
    return new Response(
      JSON.stringify({ success: true, message: 'Admin role assigned successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error("Unexpected error:", error)
    return new Response(
      JSON.stringify({ error: `Unexpected error: ${error.message}` }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

// Helper function to create a Supabase client
function createClient(supabaseUrl: string, supabaseKey: string) {
  return {
    from: (table: string) => ({
      insert: (data: any) => ({
        select: async () => {
          const res = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Prefer': 'return=representation'
            },
            body: JSON.stringify(data)
          })
          
          if (!res.ok) {
            const error = await res.json()
            return { error }
          }
          
          return { data: await res.json(), error: null }
        }
      })
    })
  }
}
