import {check} from "@useoptic/api-checks/build/sdk/define-check-test-dsl/define-check";
import {scenario} from "@useoptic/api-checks/build/sdk/define-check-test-dsl/scenarios";
import {expect} from "chai";

export default check('prevent operation id change')
  .description('changing an operation id is a breaking change')
  .implementation(({ operations }) => {
    const { expect } = require('chai');
    operations.changed.must('not change operation ids -- breaking', (before, after) => {
      if (before.operationId !== after.operationId) {
        expect.fail('expected operation id to be the same');
      }
    });
  })
  .failingExample(
    scenario('changing operation id').paths.changed(
      {
        '/example': {
          get: {
            operationId: '123',
            responses: {
              '200': {
                description: '',
              },
            },
          },
        },
      },
      (paths) => {
        paths['/example']!.get!.operationId = '456';
        return paths;
      }
    )
  );
