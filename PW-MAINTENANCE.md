# PW maintenance model

This fork is maintained as a thin delta on top of:

- Upstream: `nicoduj/homebridge-harmony`
- Upstream branch: `Dynamic-Platform`
- PW branch: `Dynamic-Platform`
- Initial upstream baseline: `2.0.6` / `9b98f0d63b993f6083100e702e9c440d6fec943b`

## Functional PW delta

1. Preserve the production cached-switch-name fix from `2.0.6-pw.1`.
2. Keep the Homebridge platform identifier `HarmonyHubWebSocket` unchanged.
3. Publish the maintained package as `@peterwestermann/homebridge-harmony`.
4. Use the scoped plugin identifier for Homebridge accessory registration while preserving accessory UUID and service subtype generation.

## Automatic upstream update and release flow

`.github/workflows/upstream-sync.yml` checks `nicoduj/homebridge-harmony:Dynamic-Platform` every six hours and can also be started manually.

After the initial npm package bootstrap exists, a new upstream commit causes the workflow to merge upstream into an automation branch, stop on unexpected conflicts, compute a stable PW version, run the PW and upstream checks, open an audit PR, run CI on Node.js 22/24/26, merge only after green checks, publish with npm Trusted Publishing/OIDC, verify npm visibility, and create the matching Git tag and GitHub release.

No GitHub workflow installs or restarts anything on CL-Orion.

## npm publication

The maintained package identifier is `@peterwestermann/homebridge-harmony` and uses stable versions. The first scoped release is `2.0.7`, based on upstream `2.0.6` plus the existing PW cached-switch fix and package-identity migration.

After the package exists on npm, `publish.yml` is configured as the Trusted Publisher workflow. Publishing uses GitHub-hosted runners, Node.js 24 and npm 11.15 or newer with OIDC; no long-lived npm write token is stored in GitHub.

## Version policy

For each integrated upstream change, automation chooses the higher of previous PW version + one patch or upstream version + one patch.

## Rollback and production gate

Keep the existing `homebridge-harmony-2.0.6-pw.1.tgz` and a Homebridge backup before the first scoped-package migration. Do not clear cached accessories. Publication is not deployment: CL-Orion remains on the known-good version until the scoped package is deliberately installed and verified.
