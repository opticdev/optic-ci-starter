const { ApiCheckService, check } = require("@useoptic/rulesets-base");
const { expect } = require("chai"); // this can be substituted for other test assertion libraries

const standardOperations = check("require operation summary")
  .implementation(({ operations }) => {
    operations.requirement.must("have a summary", (operation) => {
      if (!operation.summary) expect.fail("must have a summary");
    });
  });

module.exports = () => {
  const operationsChecker = new ApiCheckService();

  operationsChecker.useRulesFrom(standardOperations.runner());

  return operationsChecker;
};