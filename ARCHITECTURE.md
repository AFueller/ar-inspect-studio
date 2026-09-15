# Architecture

AR Inspect Studio is designed for conventional LAMP hosting plus browser-native desktop/tablet and WebXR clients.

## Components
- **PHP/MySQL backend:** authentication, scenario and inspection APIs, media, reporting and migrations.
- **Browser authoring UI:** scenarios, reference media, overlays and inspection workflows.
- **Meta Quest WebXR client:** spatial calibration, MR overlays, hand/controller interaction and object-local findings.
- **Snapshot model:** an inspection freezes its scenario state so later template edits do not silently alter historical records.

## Integrity principles
1. Started inspections are isolated from later template edits.
2. Completed records reject normal mutation.
3. Stale concurrent writes are rejected rather than silently merged.
4. Spatial findings are stored object-relative where applicable.
5. Hardware capabilities are explicit; missing camera/WebXR support is never represented as success.

Three.js is version-pinned at 0.185.1. Production does not require a continuously running Node.js service; Node tooling is used for automated development tests.
