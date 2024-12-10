# Commit Message Format

# <type>(<scope>): <subject>
# |<----  Using a maximum of 50 characters  ---->|

# [Optional Body] Explain why this change is being made
# |<----   Try to limit each line to a maximum of 72 characters   ---->|

# [Optional Footer] Include "Closes #123, #456" to auto-close issues
# --------------------

# Type Categories (Required):
#    feat       💡 New feature or enhancement
#    fix        🐛 Bug fix
#    docs       📚 Documentation changes
#    style      💅 Code style/formatting (no code change)
#    refactor   ♻️  Code refactoring
#    perf       ⚡️ Performance improvements
#    test       ✅ Adding/updating tests
#    chore      🔧 Maintenance tasks, dependencies
#    ci         👷 CI/CD changes

# Scope (Optional):
#    Specify the module, component, or area of change
#    Example: feat(auth): add OAuth support

# Best Practices:
#    ✓ Use imperative mood ("Add" not "Added" or "Adds")
#    ✓ Don't end subject line with a period
#    ✓ Separate subject from body with blank line
#    ✓ Explain what and why vs. how
#    ✓ Reference issues and PRs in footer

# Example:
# feat(auth): implement JWT authentication
#
# - Add JWT token generation and validation
# - Implement refresh token mechanism
# - Set up secure cookie handling
#
# Closes #123
