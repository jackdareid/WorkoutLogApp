## Branch Naming

Format:

<type>/<issue>-<short-description>

Examples:

feature/18-refresh-token-authentication
fix/27-login-validation

## Commit Message Format

<type>: <imperative short description>

| Type     | When to use                             | Example                                  |
| -------- | --------------------------------------- | ---------------------------------------- |
| feat     | New functionality                       | feat: add workout history page           |
| fix      | Bug fixes                               | fix: prevent duplicate workout creation  |
| docs     | Documentation only                      | docs: rewrite architecture documentation |
| refactor | Improve code without changing behaviour | refactor: simplify auth middleware       |
| test     | Add or update tests                     | test: add login integration tests        |
| chore    | Tooling, configuration, maintenance     | chore: add Docker configuration          |
| style    | Formatting only (no logic changes)      | style: format backend with prettier      |

## Definition of Done

- [ ] Criteria satisfied
- [ ] Code tested locally
- [ ] Documentation updated (if applicable)
- [ ] Pull request opened
- [ ] Pull request viewed
- [ ] Pull request merged into `main`
- [ ] Issue closed

## Pull Request Guidelines

Each pull request should focus on a single issue.

Avoid combining unrelated features or fixes into the same PR.
