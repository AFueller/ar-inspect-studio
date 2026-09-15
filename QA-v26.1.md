# QA record – v26.1 public core

## Automated scope
The public core is intended to be validated through Node.js tests covering calibration geometry, editor geometry and inspection-domain rules. GitHub Actions runs the test suite on pushes and pull requests.

## Hardware boundary
Automated tests do **not** prove headset tracking quality, hand/controller ergonomics, passthrough behavior, browser permission UX or long-running Quest stability. Those require a physical Meta Quest 3/3S test with device/browser versions recorded.

## Publication rule
Hardware-dependent behavior is only marked accepted after a reproducible physical test. This prevents simulated or desktop-only results from being presented as Quest validation.
