import {ApiCheckDslContext, ApiCheckService} from "@useoptic/api-checks";

export function customRuleset() {
  const service = new ApiCheckService<ApiCheckDslContext>();
  return service;
}
