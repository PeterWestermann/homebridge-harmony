# PW changes

## 2.0.7

- Migrates the maintained npm package to `@peterwestermann/homebridge-harmony`.
- Keeps the Homebridge platform identifier `HarmonyHubWebSocket` unchanged.
- Preserves the production cached-switch-name fix from `2.0.6-pw.1`.
- Adds regression tests for cached switch names and plugin/platform identity.
- Adds CI for Node.js 22, 24 and 26 plus automated upstream monitoring and npm release preparation.

## 2.0.6-pw.1

- Restores the runtime-only `service.name` property when a switch service is
  loaded from Homebridge's accessory cache.
- Prevents `Characteristic.Name` from receiving `null`/`undefined` for cached
  command switches such as Memory1 and Memory2.
- Preserves the package name, platform identifier, accessory UUIDs, service
  subtypes and cached-accessory data.
