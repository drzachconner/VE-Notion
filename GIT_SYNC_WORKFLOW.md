# Git Sync Workflow
## For Working Across Multiple Computers

---

## Initial Setup (One-Time per Computer)

### Computer 1 (Already Done)
```bash
# This computer already has the repo initialized
git remote -v  # Verify it points to GitHub
```

### Computer 2 (New Computer)
```bash
# Clone the repository
cd "P:\Dr. Zach\VE Notion"
git clone <your-github-repo-url> "VE Notion"
cd "VE Notion"

# Install Python dependencies
pip install -r requirements.txt

# Copy .env file (DO NOT commit this file!)
# Manually copy .env from Computer 1 or recreate it
```

---

## Daily Workflow

### Starting Work on Any Computer

**ALWAYS pull first to get latest changes:**

```bash
cd "P:\Dr. Zach\VE Notion\VE Notion"
git pull origin main
```

This ensures you have the latest code from the other computer.

---

### After Making Changes

1. **Check what changed:**
   ```bash
   git status
   ```

2. **Review your changes:**
   ```bash
   git diff
   ```

3. **Add all changed files:**
   ```bash
   git add .
   ```

   Or add specific files:
   ```bash
   git add filename.md
   git add another_file.py
   ```

4. **Commit with a descriptive message:**
   ```bash
   git commit -m "Add Notion AI task automation guide"
   ```

5. **Push to GitHub:**
   ```bash
   git push origin main
   ```

---

## Important Files to NEVER Commit

These files are already in `.gitignore` (or should be):

- `.env` - Contains your Notion API key
- `__pycache__/` - Python cache files
- `*.pyc` - Python compiled files
- `node_modules/` - Node packages (if any)

**Why?** Your API keys should never be in version control for security reasons.

---

## Quick Commands Reference

### Before starting work:
```bash
git pull
```

### After making changes:
```bash
git status          # See what changed
git add .           # Stage all changes
git commit -m "Your message here"
git push
```

### If you forget to pull first and get conflicts:
```bash
git stash           # Save your changes temporarily
git pull            # Get latest from GitHub
git stash pop       # Reapply your changes
# Resolve any conflicts manually, then:
git add .
git commit -m "Merge changes from other computer"
git push
```

---

## Best Practices

1. **Always pull before starting work**
   - Prevents merge conflicts
   - Ensures you have latest code

2. **Commit frequently**
   - Small, focused commits
   - Easy to track what changed

3. **Push after each work session**
   - Don't leave uncommitted changes
   - Other computer can pull immediately

4. **Use descriptive commit messages**
   - Good: "Add Slack integration script"
   - Bad: "Update stuff"

5. **Check status before leaving computer**
   ```bash
   git status  # Make sure everything is committed
   git push    # Make sure it's on GitHub
   ```

---

## Common Scenarios

### Scenario 1: Made changes at work, continuing at home
```bash
# At work (before leaving):
git add .
git commit -m "Work on Notion AI integration"
git push

# At home (when starting):
git pull
# Now you have all your work changes!
```

### Scenario 2: Realized you forgot to push
```bash
# At home, realize you didn't push from work
# Nothing you can do remotely, but when back at work:
git push

# Then at home:
git pull
```

### Scenario 3: Made changes on both computers (oops!)
```bash
# You'll get an error when you try to push
# Solution:
git pull                    # Get changes from other computer
# Resolve any conflicts in the files
git add .
git commit -m "Merge changes"
git push
```

---

## Checking Sync Status

### See what commits exist on GitHub that you don't have:
```bash
git fetch
git log HEAD..origin/main
```

### See what commits you have that aren't on GitHub:
```bash
git log origin/main..HEAD
```

### See all recent commits:
```bash
git log --oneline -10
```

---

## Emergency: Lost Work?

### See recent commits:
```bash
git log
```

### Restore a file to previous version:
```bash
git checkout HEAD -- filename.md
```

### Go back to a previous commit:
```bash
git checkout <commit-hash>
# Look around
git checkout main  # Come back to latest
```

---

## Helpful Aliases (Optional)

Add these to make commands shorter:

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.pl pull
git config --global alias.ps push

# Now you can use:
git st   # instead of git status
git pl   # instead of git pull
git ps   # instead of git push
```

---

## Current Repository Info

**Remote:** GitHub (check with `git remote -v`)
**Branch:** main
**Working Directory:** P:\Dr. Zach\VE Notion\VE Notion

---

## When Things Go Wrong

### "Permission denied" or authentication errors:
- Check GitHub authentication
- May need to set up SSH key or Personal Access Token
- See: https://docs.github.com/en/authentication

### "merge conflict":
- Open the conflicted file
- Look for `<<<<<<<`, `=======`, `>>>>>>>` markers
- Manually edit to keep what you want
- Remove the markers
- `git add .` and `git commit`

### "detached HEAD state":
```bash
git checkout main
```

### Want to undo last commit (before pushing):
```bash
git reset --soft HEAD~1  # Keeps changes, removes commit
```

---

**Quick Start Checklist:**

Before work:
- [ ] `git pull`

After work:
- [ ] `git status`
- [ ] `git add .`
- [ ] `git commit -m "description"`
- [ ] `git push`
- [ ] Verify on GitHub.com

---

**Last Updated:** November 12, 2025
