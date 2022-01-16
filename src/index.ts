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
}, {
  opticToken: process.env.OPTIC_TOKEN || '123',
  gitProvider: {
    token: process.env.GITHUB_TOKEN || '123',
    provider: 'github',
  },
  ciProvider: 'github',
} );

cli.parse(process.argv);
