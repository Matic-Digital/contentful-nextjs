# Contributing Guidelines

## Using Our Templates

### Commit Messages

We use structured commit messages to maintain a clear and organized history. Our commit messages follow a specific format:

```
<type>(<scope>): <subject>

[Optional Body]

[Optional Footer]
```

#### Setup
To use the commit template:
1. Configure git to use the template:
   ```bash
   git config --local commit.template .github/commit_template.md
   ```
2. For each commit, the template will appear in your editor
3. Fill in the required sections and remove the comments

#### Types
- 💡 `feat`: New features or enhancements
- 🐛 `fix`: Bug fixes
- 📚 `docs`: Documentation changes
- 💅 `style`: Code style changes
- ♻️ `refactor`: Code refactoring
- ⚡️ `perf`: Performance improvements
- ✅ `test`: Test-related changes
- 🔧 `chore`: Maintenance tasks
- 👷 `ci`: CI/CD changes

### Pull Requests

Our pull request template helps ensure all necessary information is provided for efficient review:

1. **Title**: Use the format `<type>: Brief description`
2. **Description**: Clearly explain the changes and motivation
3. **Related Issues**: Link any related issues
4. **Testing Steps**: Provide detailed testing instructions
5. **Checklist**: Complete all items before requesting review
6. **Screenshots**: Include for UI changes
7. **Dependencies**: List any new or removed dependencies
8. **Breaking Changes**: Document any breaking changes and migration steps

### Best Practices

1. **Commit Messages**
   - Use imperative mood ("Add" not "Added")
   - Keep subject line under 50 characters
   - Provide detailed body for complex changes
   - Reference issues where applicable

2. **Pull Requests**
   - Keep changes focused and atomic
   - Update documentation alongside code changes
   - Add tests for new functionality
   - Respond promptly to review feedback
   - Request review from appropriate team members

3. **Code Review**
   - Review all checklist items
   - Test changes locally when necessary
   - Provide constructive feedback
   - Approve only when all criteria are met
