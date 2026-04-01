interface Env { STATE: KVNamespace }
export default { async fetch(req: Request, env: Env) { if (new URL(req.url).pathname === '/') return new Response('<h1>CRDT Sync</h1><p>Agent Fleet Synchronization</p>', { headers: { 'Content-Type': 'text/html' } }); return new Response('Not found', { status: 404 }); } };
