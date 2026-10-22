import assert from 'node:assert/strict';
import {HarmonyBase} from '../harmonyBase.js';

const nameWrites = [];
const cachedService = {
  displayName: 'Memory1',
  name: undefined,
  setCharacteristic(characteristic, value) {
    nameWrites.push({characteristic, value});
    return this;
  },
  getCharacteristic() {
    return {
      value: false,
      on() {
        return this;
      },
    };
  },
};

const Characteristic = {Name: 'Name', On: 'On'};
const api = {
  hap: {
    Service: {Switch: class {}},
    Characteristic,
    Categories: {},
    uuid: {},
  },
  platformAccessory: class {},
};

const base = new HarmonyBase(api);
const accessory = {
  getServiceById() {
    return cachedService;
  },
};
const platform = {name: 'Harmony', log() {}};
const stableSubtype = 'Yamaha-AV-Receiver Memory1';

const returnedService = base.getSwitchService(platform, accessory, 'Memory1', stableSubtype);
assert.equal(returnedService, cachedService);
assert.equal(cachedService.name, stableSubtype);

base.setSwitchOnCharacteristic = () => {};
base.bindCharacteristicEventsForSwitch(platform, cachedService);
assert.deepEqual(nameWrites[0], {characteristic: 'Name', value: stableSubtype});

console.log('PASS: cached Harmony switch names are restored without replacing the service.');

for (const command of ['Memory1', 'Memory2']) {
  const subtype = `Yamaha-AV-Receiver ${command}`;
  cachedService.name = undefined;
  assert.equal(base.getSwitchService(platform, accessory, command, subtype), cachedService);
  assert.equal(cachedService.name, subtype);
  cachedService.name = 'previous custom name';
  assert.equal(base.getSwitchService(platform, accessory, command, subtype), cachedService);
  assert.equal(cachedService.name, subtype);
}
assert.equal(base.getSwitchService(platform, accessory, 'Standalone', null), cachedService);
assert.equal(cachedService.name, 'Standalone');
console.log('PASS: Memory1/Memory2 and changed custom names reuse their cached services.');
