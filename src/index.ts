import {makeCiCliWithNamedRules, rulesets} from "@useoptic/api-checks";
import {customRuleset} from "./ruleset";
const packageJson = require('../package.json')

const cli = makeCiCliWithNamedRules(packageJson.name, {
  default: customRuleset()
});

cli.parse(process.argv);
