# AR Inspect Studio

**Open-source WebXR foundation for mixed-reality inspection, spatial quality assurance and vocational training.**

AR Inspect Studio combines browser-based inspection logic, spatial calibration and Meta Quest/WebXR interaction concepts with a conventional LAMP deployment architecture. The project grew from repeated physical Quest 3 testing and real inspection/training workflows rather than from a standalone XR demo.

> **Current public version:** v26.1.0  
> **Repository status:** initial open-source publication. The reusable calibration, editor geometry, camera lifecycle and inspection-domain modules are public and covered by CI; additional application surfaces from the existing LAMP build are being modularized for publication.

## Why this project exists

Industrial and educational inspection workflows are often split between proprietary XR authoring tools, native headset apps and separate documentation systems. AR Inspect Studio explores a web-first alternative: reproducible inspection logic, object-local spatial geometry and open browser technologies that can run on standard infrastructure.

## Public core capabilities

- **Three-point and two-point spatial calibration** for real inspection surfaces.
- **Object-local geometry** rather than persistent headset-world coordinates.
- **2D/MR editor geometry** for scalable inspection regions.
- **Camera lifecycle handling** for browser/Quest companion workflows.
- **Inspection-domain rules** for measurements, status validation and required interactions.
- **Automated Node.js tests**, GitHub Actions CI, CodeQL and Dependabot.
- **Explicit hardware-validation boundary:** simulated tests are not represented as physical Quest acceptance.

## Broader application architecture

The existing application architecture also covers PHP/MySQL scenario management, inspection snapshots, media/evidence workflows, reports, tablet workflows, role handling and Quest authoring. These surfaces are being separated into reviewable public modules instead of dumping a monolithic private deployment package into the repository without cleanup.

See [ARCHITECTURE.md](ARCHITECTURE.md) and [ROADMAP.md](ROADMAP.md).

## Technology

| Layer | Technology |
|---|---|
| Core browser logic | JavaScript / ES modules |
| Mixed Reality | WebXR / Three.js 0.185.1 |
| Target headset | Meta Quest 3 / 3S Browser |
| Application backend | PHP 8.2+ / PDO MySQL |
| Database | MySQL / MariaDB |
| Automated tests | Node.js test runner |
| CI / security | GitHub Actions / CodeQL / Dependabot |

## Development

```bash
npm install
npm test
```

## Current limitations

- Physical Quest 3/3S acceptance for the v26.1 public modularized core is still being documented.
- Automatic recognition of arbitrary machines/components is not implemented.
- Direct passthrough-photo capture inside an immersive WebXR session is constrained by browser/runtime capabilities.
- Free-form non-planar contour calibration is not implemented.
- This software structures inspection workflows; it does not replace legally required measuring equipment, safety procedures, standards or qualified supervision.

## Contributing

Contributions and reproducible hardware reports are welcome, particularly around WebXR compatibility, Quest ergonomics, calibration geometry, accessibility, testing and security. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

Please do not publish exploitable vulnerabilities as normal issues. See [SECURITY.md](SECURITY.md).

## License

MIT — see [LICENSE](LICENSE). Three.js remains subject to its own MIT license; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
