# Contributing to AR Inspect Studio

Contributions are welcome around WebXR compatibility, calibration geometry, Quest usability, accessibility, testing, security and documentation.

## Before opening an issue
Include version/commit, device/browser, exact reproduction steps, expected/actual behavior and sanitized logs. Quest reports should also state headset model and whether hand tracking or controllers were used.

## Development
```bash
npm ci
npm run check
php tests/php-domain-test.php
```

Do not commit `config.php`, credentials, database dumps, customer data, inspection evidence or real user data. Hardware-dependent claims must state the exact device/browser actually tested.
