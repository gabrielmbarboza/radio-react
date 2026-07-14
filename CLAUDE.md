@AGENTS.md

# Project Instructions

## TDD (Test-Driven Development)

Always follow TDD for any code change in this project:

1. Write a failing test first that captures the desired behavior.
2. Run it and confirm it fails for the expected reason.
3. Write the minimum code needed to make the test pass.
4. Refactor while keeping tests green.

Do not write implementation code before there is a test covering it.

## Commit Conventions

Always use **Conventional Commits** format when creating commits. Always write in **English**.

### Format

```
<type>(<scope>): <short description>

<body — list every change made>
```

### Types

| Type | When to use |
|---|---|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Code restructure without behavior change |
| `test` | Adding or fixing tests |
| `chore` | Build, tooling, dependencies, config |
| `perf` | Performance improvement |
| `ci` | CI/CD changes |
| `revert` | Revert a previous commit |

### Scope

Optional. Use the module or affected area in lowercase (e.g., `player`, `ui`, `api`, `mobile`).

### Rules

- **Short description:** imperative mood, lowercase, no period — max 72 chars (`feat(player): add stream reconnect on network drop`)
- **Body is mandatory:** list every file or logical change made, one bullet per item

### Example

```
feat(player): add stream reconnect on network drop

- Add reconnect logic to AudioPlayer component
- Add unit tests for reconnect on network loss and recovery
- Update App.js to surface connection status
```
