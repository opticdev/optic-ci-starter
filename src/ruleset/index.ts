import {ApiCheckDslContext, ApiCheckService} from "@useoptic/api-checks";

export function customRuleset() {
  const service = new ApiCheckService<ApiCheckDslContext>();

  service.useRulesFrom(require('./operation-id.rule').default.runner())

  return service;
}
