// Forward Plumber webhook from the backend to avoid browser CORS issues
// Public function with strict validation to only allow plumber.gov.sg webhook URLs

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InvokeBody {
  webhookUrl: string;
  payload: unknown;
}

Deno.serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ ok: false, message: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { webhookUrl, payload } = (await req.json()) as InvokeBody;

    if (!webhookUrl || typeof webhookUrl !== 'string') {
      return new Response(JSON.stringify({ ok: false, message: 'Missing webhookUrl' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let url: URL;
    try {
      url = new URL(webhookUrl);
    } catch {
      return new Response(JSON.stringify({ ok: false, message: 'Invalid webhook URL' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Strictly allow only plumber.gov.sg webhooks
    if (url.protocol !== 'https:' || url.hostname !== 'plumber.gov.sg' || !url.pathname.startsWith('/webhooks/')) {
      return new Response(
        JSON.stringify({ ok: false, message: 'Only https://plumber.gov.sg/webhooks/... is allowed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Forwarding to Plumber webhook:', url.toString());

    const upstream = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload ?? {}),
    });

    const text = await upstream.text().catch(() => '');

    return new Response(
      JSON.stringify({
        ok: upstream.ok,
        status: upstream.status,
        statusText: upstream.statusText,
        body: text.slice(0, 2000),
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Forward webhook error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ ok: false, message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});