# AR Inspect Studio

**Open-source WebXR platform for mixed-reality inspection, spatial quality assurance and vocational training.**

AR Inspect Studio combines a classic LAMP backend with browser-based authoring, tablet inspection workflows and a Meta Quest WebXR client. Inspection scenarios, reference media, 2D overlays and spatial MR elements share the same data model and can be used without a proprietary native XR runtime.

> **Current release:** v26.1.0  
> **Status:** automated test build; physical Meta Quest 3/3S acceptance for v26.1 is still pending. See [QA-v26.1.md](QA-v26.1.md).

## Why this project exists

Industrial and educational inspection workflows are often split between proprietary XR authoring tools, native headset apps and separate documentation systems. AR Inspect Studio explores a more accessible approach: author, run and document inspections with web technologies and a conventional PHP/MySQL server.

The project is developed against practical inspection and vocational-training scenarios. It focuses on reproducible workflows, inspectable data and hardware-independent web deployment rather than XR as a visual demo.

## Core capabilities

- **Scenario authoring** for inspection steps, instructions, acceptance criteria and reference media.
- **2D overlays** for browser/tablet workflows.
- **WebXR mixed reality** on Meta Quest with hand/controller interaction.
- **Spatial calibration** and editable MR frames for real inspection surfaces.
- **MR authoring** with rectangles, ellipses and interactive inspection points.
- **Text and photo workflow on Quest** outside the immersive session where browser camera access is available.
- **Inspection snapshots** so already-started inspections are not silently changed by later template edits.
- **Evidence, notes and measurements** with completion rules and revision protection.
- **CSV/report output** and inspection history.
- **White-label settings** for different installations.
- **LAMP deployment** with no Node.js process required in production.

## Technology

| Layer | Technology |
|---|---|
| Backend | PHP 8.2+, PDO MySQL |
| Database | MySQL / MariaDB |
| Browser UI | HTML, CSS, JavaScript |
| Mixed Reality | WebXR, Three.js 0.185.1 |
| Headset target | Meta Quest 3 / 3S Browser |
| Development tests | Node.js test runner, JSDOM, PHP tests |
| Production server | Apache or equivalent HTTPS-capable LAMP stack |

For a deeper technical overview, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Quick start

### Requirements

- PHP 8.2+
- PDO MySQL and Fileinfo
- MySQL or MariaDB
- HTTPS for WebXR/camera features
- Apache or equivalent web server

### Installation

1. Clone or download the repository into a new web directory.
2. Create an empty MySQL/MariaDB database.
3. Make `uploads/` writable by the PHP process.
4. Open `setup.php` over HTTPS.
5. Enter database credentials and create the first administrator account.
6. Log in, create a scenario and publish it.
7. Open `/mr/` in the Meta Quest Browser for the MR workflow.

Do **not** commit a real `config.php`. Start from [config.example.php](config.example.php). More upgrade details are documented in [INSTALLATION-NEU.md](INSTALLATION-NEU.md).

## Development and tests

Install development dependencies and run the standard test suite:

```bash
npm ci
npm run check
php tests/php-domain-test.php
```

The destructive database integration test is intentionally opt-in and must only run against a disposable loopback installation. See [TESTING.md](TESTING.md).

The v26.1 verification record documents 53 Node/DOM/geometry/camera tests, 34 PHP/MariaDB integration checks and 9 PHP domain tests. Hardware-dependent behavior such as tracking quality, camera permissions, readability and long-running headset sessions still requires a physical Quest acceptance run.

## Current limitations

- Automatic recognition of arbitrary machines/components is not implemented.
- Direct passthrough-photo capture inside an active immersive WebXR session is not implemented; the current Quest workflow exits MR before browser camera/file capture.
- Free-form non-planar contour calibration is not implemented.
- The software supports inspection workflows but does not replace legally required measuring equipment, safety procedures, standards or qualified supervision.

These limitations are tracked openly because they materially affect real-world use.

## Roadmap

Current priorities include:

- complete and document physical Quest 3/3S acceptance for v26.1;
- improve calibration robustness and editable geometry;
- evaluate polygon/free-form authoring for non-rectangular inspection areas;
- improve accessibility and headset UI ergonomics;
- expand automated security and compatibility checks;
- research optional computer-vision-assisted object/feature alignment without making it a hidden dependency.

See [ROADMAP.md](ROADMAP.md) for details.

## Contributing

Contributions are welcome, especially around WebXR compatibility, Quest ergonomics, calibration geometry, testing, accessibility, security and documentation. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

For headset-specific bugs, the issue templates ask for the browser/device/test conditions needed to reproduce them.

## Security

Please do not publish exploitable security vulnerabilities as normal issues. Use the process described in [SECURITY.md](SECURITY.md).

## Documentation

- [German v26.1 operator notes](docs/README-v26.1-de.md)
- [Testing](TESTING.md)
- [Architecture](ARCHITECTURE.md)
- [Roadmap](ROADMAP.md)
- [v26.1 QA record](QA-v26.1.md)
- [v26.1 changelog](CHANGELOG-v26.1.md)

## License

AR Inspect Studio is released under the [MIT License](LICENSE).

The repository includes a vendored copy of Three.js components under their own MIT license. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and `vendor/three/LICENSE`.
