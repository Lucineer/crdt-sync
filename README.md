# CRDT Sync: Merge Agent Writes Without Coordination

You don't need locks, a message broker, or consensus. Post state from any agent, at any time, and it merges.

Test it: open two terminals and hit the public endpoint simultaneously. It handles concurrent writes.

```bash
# Read the current shared state
curl https://the-fleet.casey-digennaro.workers.dev/state

# Submit an update from any agent identifier
curl -X POST -H "Content-Type: application/json" \
  -d '{"agent_7": {"last_checkin": 1735000000}}' \
  https://the-fleet.casey-digennaro.workers.dev/state
```

---

## Why This Exists
You have independent agents reporting state. Existing sync systems often require extra infrastructure, new protocols, or paid services. This is a minimal, reliable alternative. No tricks.

---

## Quick Start
1.  Fork this repository.
2.  Deploy to Cloudflare Workers: `npx wrangler deploy`.
3.  Modify the merge logic in `src/crdt.js` for your data structure.

You will have a global state endpoint in under two minutes.

---

## How It Works
The worker uses a Conflict-Free Replicated Data Type (CRDT) approach via a last-write-wins register for each top-level field. All state is persisted in your Cloudflare KV store. The HTTP API is stateless.

---

## Features
*   **Conflict-Free Merging**: Concurrent writes combine; they do not silently overwrite.
*   **Zero Dependencies**: ~130 lines of plain JavaScript. No npm, no build step.
*   **Fork-First Design**: This is a deployable template, not a library you depend on.
*   **Simple HTTP API**: Works from any client or device.
*   **State in KV**: Data lives exclusively in your Cloudflare KV namespace.
*   **MIT Licensed**: Use it for anything.

The default merge is a shallow object merge. You extend it for nested data or domain-specific rules.

---

## One Specific Limitation
The default merge logic is shallow. If two agents concurrently update different nested properties within the same top-level key, one will overwrite the other. You must implement a deep merge for nested state shapes.

---

## What Makes This Different
1.  **No Client SDK**: Any HTTP client works. You will never upgrade a client library.
2.  **Fully Stateless Workers**: No in-memory state. Deploy as many copies as you want.
3.  **You Own Every Line**: Fork and modify it. You never need to pull upstream updates.

---

## Adapt For Production
After forking:
*   Add authentication for private fleets.
*   Implement deep or custom merge logic for your state shape.
*   Add snapshotting, validation, or webhook triggers.

---

Superinstance and Lucineer (DiGennaro et al.)

<div style="text-align:center;padding:16px;color:#64748b;font-size:.8rem"><a href="https://the-fleet.casey-digennaro.workers.dev" style="color:#64748b">The Fleet</a> &middot; <a href="https://cocapn.ai" style="color:#64748b">Cocapn</a></div>