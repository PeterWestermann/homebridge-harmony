# Peter Westermann maintained Homebridge Harmony build

This maintained variant tracks `nicoduj/homebridge-harmony` branch `Dynamic-Platform` and preserves the existing production PW cached-switch fix.

## PW package

- npm package: `@peterwestermann/homebridge-harmony`
- Homebridge platform identifier: `HarmonyHubWebSocket` (unchanged)
- first scoped PW release: `2.0.7` based on upstream `2.0.6`

## Preserved PW behavior

Homebridge restores HAP services from `cachedAccessories`, but custom JavaScript properties such as `service.name` are not serialized. The PW fix reconstructs that runtime-only value from the same stable service subtype (or switch name) used when the service was first created. This prevents `Characteristic.Name` from receiving `null`/`undefined` for restored command switches without replacing the cached service.

## Migration principle

The npm package identity changes from `homebridge-harmony` to `@peterwestermann/homebridge-harmony`, while `HarmonyHubWebSocket`, accessory UUID generation and service subtypes remain unchanged. Homebridge 2.x contains migration logic for cached dynamic-platform accessories when the package identifier changes but the active platform identifier remains the same.

The first migration on CL-Orion remains a controlled production change: back up Homebridge and retain `homebridge-harmony-2.0.6-pw.1.tgz`, install the scoped package without clearing cached accessories, restart once, and verify existing rooms, scenes, automations and Harmony accessories before considering the migration complete.

## Maintenance

See `PW-MAINTENANCE.md` for the automated upstream, CI and npm release model. GitHub Actions never installs updates on CL-Orion.
