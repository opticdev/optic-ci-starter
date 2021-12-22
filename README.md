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
