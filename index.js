import {PLUGIN_IDENTIFIER, PLATFORM_IDENTIFIER} from './pwIdentity.js';
import {HarmonyPlatform} from './harmonyPlatform.js';

export default function (api) {
  api.registerPlatform(PLUGIN_IDENTIFIER, PLATFORM_IDENTIFIER, HarmonyPlatform);
}
