const API = 'https://veildrop.chell-discord-officiel.workers.dev';

export async function onRequest(ctx) {
  const url = new URL(ctx.request.url);
  const path = url.pathname.replace(/^\/api/, '') || '/';
  const target = `${API}/api${path}${url.search}`;

  const init = {
    method: ctx.request.method,
    headers: {},
  };

  if (ctx.request.method !== 'GET' && ctx.request.method !== 'HEAD') {
    init.body = ctx.request.body;
  }

  const headersToCopy = ['content-type', 'x-admin-key'];
  for (const h of headersToCopy) {
    const v = ctx.request.headers.get(h);
    if (v) init.headers[h] = v;
  }

  try {
    const res = await fetch(target, init);
    const headers = new Headers(res.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    return new Response(res.body, { status: res.status, headers });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'proxy_error' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}