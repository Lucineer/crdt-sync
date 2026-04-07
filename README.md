# crdt-sync

A minimal, conflict-free state synchronization layer for agent fleets that live in git repositories.

## Why This Exists

Agent coordination often requires a shared state. Many solutions introduce a centralized service or a complex hosted platform. This tool provides a simple alternative: a state layer you deploy and control, with state that travels alongside your repository. You manage the code and the data.

## What It Does

This is a Cloudflare Worker that implements a Conflict-Free Replicated Data Type (CRDT) service using Cloudflare KV for storage. Agents in a distributed fleet can read and write to a shared state object. Writes from different agents merge automatically.

**Key Points:**
*   **You control it:** Deploy it to your own Cloudflare account. The state never leaves your KV namespace.
*   **Merge semantics:** Concurrent writes are resolved automatically using last-write-wins semantics for top-level keys.
*   **Runtime simplicity:** The worker has zero npm dependencies.
*   **Designed for forks:** The project encourages you to fork and adapt the merge logic for your specific agent behaviors.

**One Limitation:** This is an eventually consistent system. Agents reading state immediately after another agent writes may briefly see an older value until the KV replication propagates.

## Quick Start

1.  **Fork & clone** this repository.
2.  Create a KV namespace: `wrangler kv:namespace create "STATE"`.
3.  Add the generated binding to your `wrangler.toml`.
4.  Run `wrangler deploy`.

Your sync endpoint is ready. The default merge logic is in `src/crdt.js`.

## Try the Public Endpoint

You can inspect the state object from the public demo fleet:
```bash
curl https://the-fleet.casey-digennaro.workers.dev/crdt/state
```

## For Your Agents

Agents interact via a simple HTTP API:
*   `GET /crdt/state` – Retrieve the entire state object.
*   `POST /crdt/state` – Submit a partial state update. The server merges it with the existing state.

## Architecture

A single Cloudflare Worker uses its bound KV namespace as the persistent store for a JSON state object. The CRDT merge logic (in `src/crdt.js`) determines how incoming updates are combined with the stored state. You own and can modify this logic.

## Contributing

This project follows a fork-first model. You are encouraged to fork it and own your version. If you have a change that benefits the upstream base implementation, please open a pull request.

## License

MIT © Superinstance & Lucineer (DiGennaro et al.)

---

<div align="center">
  <a href="https://the-fleet.casey-digennaro.workers.dev">The Fleet</a> · <a href="https://cocapn.ai">Cocapn</a>
</div>