import fs from 'node:fs';

const previousVersion = process.argv[2];
const upstreamVersion = process.argv[3];

if (!previousVersion || !upstreamVersion) {
  console.error('Usage: node scripts/prepare-upstream-release.mjs <previous-pw-version> <upstream-version>');
  process.exit(1);
}

function parseVersion(version, label) {
  const match = String(version).match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!match) {
    throw new Error(`${label} version "${version}" is not a supported semantic version`);
  }
  return match.slice(1).map(Number);
}

function compareVersions(a, b) {
  for (let i = 0; i < 3; i += 1) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
  return 0;
}

const pkgPath = 'package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const previous = parseVersion(previousVersion, 'previous PW');
const upstream = parseVersion(upstreamVersion, 'upstream');
const nextFromPrevious = [previous[0], previous[1], previous[2] + 1];
const nextFromUpstream = [upstream[0], upstream[1], upstream[2] + 1];
const next = compareVersions(nextFromUpstream, nextFromPrevious) > 0 ? nextFromUpstream : nextFromPrevious;

pkg.name = '@peterwestermann/homebridge-harmony';
pkg.version = next.join('.');
pkg.description = 'Homebridge Harmony plugin - Peter Westermann maintained variant';
pkg.repository = {type: 'git', url: 'git+https://github.com/PeterWestermann/homebridge-harmony.git'};
pkg.bugs = {url: 'https://github.com/PeterWestermann/homebridge-harmony/issues'};
pkg.homepage = 'https://github.com/PeterWestermann/homebridge-harmony#readme';
pkg.publishConfig = {...(pkg.publishConfig ?? {}), access: 'public'};
pkg.scripts = {
  ...(pkg.scripts ?? {}),
  'test:pw': 'node test/cached-switch-name.test.js && node test/plugin-identity.test.js',
  'test:all': 'npm test && npm run test:pw',
};
delete pkg.private;

fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
console.log(`Prepared PW release ${pkg.version} from upstream ${upstreamVersion} (previous PW ${previousVersion}).`);
