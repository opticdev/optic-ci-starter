const createStandardOperationsChecker = require('./optic/standardOperations.js');

module.exports = {
  token: process.env.OPTIC_TOKEN,
  gitProvider: {
    token: process.env.GITHUB_TOKEN,
    provider: 'github'
  },
  checks: [
    { name: 'optic-breaking-changes' }, // on by default
    { 
      name: 'standard-operations',
      type: 'custom',
      checkService: createStandardOperationsChecker(),
    },
    {
      name: 'optic-named-checks',
      config: {
        requestHeaders: {
          rule: 'param-case',
          applies: 'whenAdded',
        },
        queryParameters: {
          rule: 'param-case',
          applies: 'whenAdded',
        },
        requestProperties: {
          rule: 'snake_case',
          applies: 'whenAdded',
        },
        responseProperties: {
          rule: 'camelCase',
          applies: 'whenAdded',
        },
        responseHeaders: {
          rule: 'param-case',
          applies: 'whenAdded',
        },
      },
    },
  ]
};