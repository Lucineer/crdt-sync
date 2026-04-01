# CRDT Sync — State Synchronization for Agent Fleets

> *Conflict-free replicated data types for repo-native agents.*

## What It Is

CRDT-based state synchronization for fleets of repo-native agents. When multiple agents operate on shared state (documents, knowledge bases, task queues), CRDTs ensure convergence without central coordination.

## Why CRDTs

- **Offline-first**: Agents work without network, sync when connected
- **Conflict-free**: No merge conflicts — CRDTs resolve automatically
- **Scalable**: No central bottleneck — agents sync peer-to-peer
- **Auditable**: Every state change is tracked and reversible

## Integration

- Fleet state: shared knowledge bases, task queues, presence
- Spreadsheet cells: Deckboss cellular agents syncing across instances
- Document collaboration: Multiple agents editing the same repo

## Status

📝 Concept phase. Based on superinstance/SmartCRDT research.

Author: Superinstance
