import {ApiChangeDsl, ApiCheckDsl, ApiCheckDslContext, createTestDslFixture} from "@useoptic/api-checks";
import {rules} from "./rules";

export function createFixture() {
  return createTestDslFixture<ApiChangeDsl, ApiCheckDslContext>((input) =>
    new ApiChangeDsl(input.nextFacts, input.changelog, input.currentJsonLike, input.nextJsonLike, input.context))
}

describe("operation ids", () => {
  const baseForOperationIdTests = {
    openapi: '3.0.1',
    paths: {
      '/example': {
        operationId: "before",
        get: {
          responses: {},
        },
      },
    },
    info: { version: '0.0.0', title: 'Empty' },
  };

  it("fails if changed", async () => {
    const {compare} = createFixture()
    const result = await compare(baseForOperationIdTests)
      .to((spec) => {
        spec.paths!["/example"]!.get!.operationId = "changed-from-before";
        return spec;
      })
      .withRule(rules.operationIdRules, {});

    expect(result.results[0].passed).toBeFalsy();
    expect(result).toMatchSnapshot();
  });
  it("passes if no operation id in from spec", async () => {
    const {compare} = createFixture()

    const noOperationId = {
      openapi: '3.0.1',
      paths: {
        '/example': {
          get: {
            responses: {},
          },
        },
      },
      info: { version: '0.0.0', title: 'Empty' },
    };

    const result = await compare(noOperationId)
      .to((spec) => {
        spec.paths!["/example"]!.get!.operationId = "changed-from-empty";
        return spec;
      })
      .withRule(rules.operationIdRules, {});

    expect(result.results[0].passed).toBeFalsy();
    expect(result).toMatchSnapshot();
  });
})
