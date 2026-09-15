# Testing

Standard development checks:

```bash
npm ci
npm run check
php tests/php-domain-test.php
```

The project separates automated verification from physical XR acceptance. Geometry, DOM logic, camera helpers and inspection rules can be tested automatically; tracking quality, hand/controller ergonomics, camera permissions and long-running headset sessions require a real Meta Quest test.

Never run destructive integration tests against production or shared databases.
