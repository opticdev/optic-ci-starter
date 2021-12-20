import {ApiCheckDslContext, ApiCheckService} from "@useoptic/api-checks";
import {rules} from "./rules";

export function customRuleset() {
  const service = new ApiCheckService<ApiCheckDslContext>();
  service.useRules(rules)
  return service;
}
