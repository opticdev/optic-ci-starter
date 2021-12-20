# optic-ci-starter

dream integration for postman oss team....

this repo is a GitHub Action and a Tempalte Repo

In the readme there's a big FORK ME button

They fork and give it a new name theircompany/rule-repo

That name is now a GitHub Action (woot!)

```
- name: Runs optic ci rules
        uses: theircompany/rule-repo@main
        with:
          from: $BASE:openapi.yaml
          to: $HEAD:openapi.yaml
          ruleset: "default"
```

It's magic! When they push to main the rules that run in CI change. If they want to pin them somewhere use GitHub releases 
