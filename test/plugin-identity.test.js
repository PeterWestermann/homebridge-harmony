import assert from 'node:assert/strict';
import fs from 'node:fs';
import initialise from '../index.js';
import {PLUGIN_IDENTIFIER, PLATFORM_IDENTIFIER} from '../pwIdentity.js';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const schema = JSON.parse(fs.readFileSync(new URL('../config.schema.json', import.meta.url), 'utf8'));
const baseSource = fs.readFileSync(new URL('../harmonyBase.js', import.meta.url), 'utf8');
const platformSource = fs.readFileSync(new URL('../harmonyPlatform.js', import.meta.url), 'utf8');

assert.equal(PLUGIN_IDENTIFIER, '@peterwestermann/homebridge-harmony');
assert.equal(pkg.name, PLUGIN_IDENTIFIER);
assert.equal(PLATFORM_IDENTIFIER, 'HarmonyHubWebSocket');
assert.equal(schema.pluginAlias, PLATFORM_IDENTIFIER);
assert.doesNotMatch(baseSource, /['"]homebridge-harmony['"]/);
assert.doesNotMatch(platformSource, /['"]homebridge-harmony['"]/);

let registration;
initialise({
  registerPlatform(...args) {
    registration = args;
  },
});
assert.equal(registration[0], PLUGIN_IDENTIFIER);
assert.equal(registration[1], PLATFORM_IDENTIFIER);
assert.equal(typeof registration[2], 'function');

console.log('PASS: scoped plugin identity preserves HarmonyHubWebSocket and uses the scoped runtime plugin ID.');
