import {makeCiCliWithNamedRules, StandardApiChecks, makeApiChecksForStandards } from "@useoptic/api-checks";
const packageJson = require('../package.json');
const config: StandardApiChecks = {
  naming: {},
  breakingChanges: {
    failOn: 'all'
  }
}

const cli = makeCiCliWithNamedRules(packageJson.name, {
  default: makeApiChecksForStandards(config)
});

cli.parse(process.argv);
