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
