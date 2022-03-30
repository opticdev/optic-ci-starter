## Optic CI default API rules

Check your OpenAPI file today for breaking changes to your API. Optic CI comes with a set of default rules that checks for common breaking changes to your API such as:

- Making existing query parameters or request properties required.
- Changing query parameter or property types
- Adding required parameters or request properties
- Removing response properties

These checks work out of the box with our Optic API checks, and can be run via GitHub actions. The following example workflow definition will check the `openapi.yaml` file in the root of your project as it exists on your Pull Request against the target branch of the Pull Request. The differences will be run through the default rules and report any issues. The failures will be annotated in the action run and in your code changes, helping you find what went wrong, why it went wrong, and where to fix it:

**.github/workflows/optic-ci.yml**
```yaml
name: Optic CI example workflow definition

on: [ pull_request ]

jobs:
  optic-ci:
    name: Optic API Checks
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - name: Run Optic cli
        uses: opticdev/optic-ci-starter@main
        with:
          file: openapi.yaml
          ruleset: default
```


## Write custom API rules with Optic CI

1. [Click here to fork me and make your own rules ](https://github.com/opticdev/optic-ci-starter/fork)
2. Read docs https://www.useoptic.com/docs/optic-ci/usage
3. Run rules by adding an action pointing to your fork

```
name: Optic CI example workflow definition

on: [ pull_request ]

jobs:
  optic-ci:
    name: Optic API Checks
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - name: Run Optic CI
        uses: yourOrg/optic-ci-rules-fork@main
        with:
          file: openapi.yaml
          ruleset: default
```

## Check your rules locally

Clone your custom rules fork to your working environment, and install the `optic-ci` tool:

``` sh
npm install --global @useoptic/optic-ci
```

Then you can run `optic-ci` in the root of your project, which will pick up the optic.config.js file and your custom rules. You'll need to point it at a set of changes to see it in action:

``` sh
optic-ci compare --from test-data/petstore/before.yaml --to test-data/petstore/after.yaml
```