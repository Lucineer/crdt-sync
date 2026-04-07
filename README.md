# crdt-sync

A minimal, conflict-free state synchronization layer for agent fleets, built on CRDT principles. Deploy it yourself to manage shared state across multiple agents without coordination errors.

---

## Why this exists

Most agent examples handle a single task. When you scale to multiple agents writing to shared state simultaneously, you encounter race conditions and lost updates. This provides a simple, self-hosted alternative to a complex distributed database that guarantees merge safety.

## Try the Public Sandbox

You can test the merge behavior using a public, open sandbox. **Note: This instance is writable by anyone.**

```bash
# Read the current shared state
curl https://the-fleet.casey-digennaro.workers.dev/state

# Submit a state update (any JSON object)
curl -X POST -H "Content-Type: application/json" -d '{"agent_7": {"last_checkin": 1735000000}}' https://the-fleet.casey-digennaro.workers.dev/state
```

---

## Quick Start

1.  **Fork** this repository to your GitHub account.
2.  **Deploy** to Cloudflare Workers: `wrangler deploy`
3.  **Modify** the merge logic in `src/crdt.js` for your data structures.

## What This Provides

*   **Self-hosted**: You deploy and control the runtime and data. No service sign-up.
*   **No external dependencies**: The core merge logic is standard JavaScript.
*   **Transparent implementation**: The CRDT logic is concise and readable.
*   **Fork-first**: This is a starting point you are meant to own and modify.

## Key Features

*   **Automatic Conflict Resolution**: Concurrent writes merge without errors or data loss.
*   **Standard JavaScript**: No build step or npm packages required.
*   **Your Infrastructure**: State is stored solely in your Cloudflare KV namespace.
*   **Simple HTTP API**: `GET /state` to read, `POST /state` with JSON to update.
*   **Eventual Consistency**: Prioritizes simplicity and reliability over immediate propagation.
*   **MIT Licensed**: Use for any purpose.

**One Current Limitation**: The default merge logic performs a shallow merge. You will need to extend it for complex, nested object structures to match your specific needs.

---

## Adapt It for Your Fleet

This is a base implementation. After forking, you should:
*   Add authentication for private access.
*   Implement custom deep-merge logic for your state shape.
*   Extend with features like validation, snapshots, or real-time subscriptions.

## Contributing

The project follows a fork-first philosophy. Use and modify the code for your needs. If you develop a general improvement, a pull request is welcome but never required.

## License

MIT © Superinstance & Lucineer (DiGennaro et al.)

---

<div align="center">
  <a href="https://the-fleet.casey-digennaro.workers.dev">The Fleet</a> •
  <a href="https://cocapn.ai">Cocapn</a>
</div>