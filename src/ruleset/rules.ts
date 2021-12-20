import {expect} from "chai";
import {ApiChangeDsl} from "@useoptic/api-checks";

export const rules = {

  operationIdRules: ({operations}: ApiChangeDsl) => {
    operations.changed.must(
      'have consistent operation IDs',
      (current, next) => {
        expect(current.operationId).to.equal(next.operationId);
      }
    );
  },

  propertyRules: ({bodyProperties}: ApiChangeDsl) => {

    function isValidKeyName(key: string) {
      return true
    }

    bodyProperties.added.must('following naming convention', (property) => {
      if (!isValidKeyName(property.key)) expect.fail(`added property ${property.key} must be your_case`)
    })

    bodyProperties.changed.must('request properties should never become required', (before, after, context) => {
      if ('inRequest' in context) {

        if (!before.required && after.required) {
          expect.fail(`${before.key} can not become required`)
        }

      }
    })

    bodyProperties.changed.must('response properties should never become optional', (before, after, context) => {
      if ('inResponse' in context) {

        if (before.required && !after.required) {
          expect.fail(`${before.key} can not become optional`)
        }

      }
    })

  }
}
