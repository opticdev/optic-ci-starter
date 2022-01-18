import {makeCiCliWithNamedRules, StandardApiChecks, makeApiChecksForStandards } from "@useoptic/api-checks";
import {customRuleset} from "./ruleset";
const packageJson = require('../package.json');
const config: StandardApiChecks = {
  naming: {},
  breakingChanges: {
    failOn: 'all'
  }
}

const rulesService = makeApiChecksForStandards(config)

rulesService.mergeWith(customRuleset())

const cli = makeCiCliWithNamedRules(packageJson.name, {
  default:  rulesService
}, {
  opticToken: process.env.OPTIC_TOKEN || '123',
  gitProvider: {
    token: process.env.GITHUB_TOKEN || '123',
    provider: 'github',
  },
  ciProvider: 'github',
} );

cli.parse(process.argv);
