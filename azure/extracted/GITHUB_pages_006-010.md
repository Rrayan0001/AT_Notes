# GITHUB.pdf — Pages 6–10

## Page 6

Workflow of cmds: in Corporate

<main>
- git pull origin main
<local>
- git switch -c feature/payments
        build .... test ..... Validate
        (locally)
- git add . (Stage changes for commit)
- git commit -m "done" (Saved locally)
- git push -u origin feature/payment
<Remote>
  github → PR → Main
                ↓ Pull Request
                  ↓ - Validations
                    - checks
        (if approved) main

Branch Protection : Rules within production repo to prevent accidental push to main
- No direct push        - CI must pass
- PR required           - Code review required

## Page 7

Merge, Merge Actions, Merge Conflict

Merge : Combines features & changes from one branch to another

Eg:
        dev —(working)→ Login branch            merge → (target) main
                  • develops                            (existing code
                  login via google                       + login)
                  (source branch)

Working:
        →
git branch , git switch main, git pull origin
                                      main
git merge feature/Login , git push origin main
        →

Merge Actions: merging a Pull Req after reviews are complete.

- Merge commit : Combines branches, preserving history
- Squash Merge : Combines all PR → 1 commit and merge → target
- Rebase Merge : Updating your copy of branch (code) → before merging ...... prevents

## Page 8

messy history

Merge-Conflict occurs when more than one developer is working on the same file and github cannot decide which changes to keep while combining branches.

- Main : app.txt → "Devops"
- feature : " → "Aws Devops"
          conflict

Resolve: ↳ Attempt merge, review, decide correct version then status, add, commit, push.

Git Clone, Rebase:

Git Clone: Used to copy a repositfory from github or remote to the local machine. — files, commit, history and branches.

Git rebase: moves branch's commit on top of latest commits from another branch — creating more linear history

m: A-B-C
F: A-B-D-E → Rebase : (A-B-C-D-E′) (F′B)

## Page 9

- gitignore : Explicitly tells git which files
should not be tracked or uploaded.
.env , .log .... etc files with secret info must never be pushed to remote repo.

git reset : moves head backward to undo commits, modify, rewriting commit

git revert : Creates a new commit that reverses a previous commit → No alter to history

git history : Views chronological record of project.

git stashing : Temporary shelving of uncommitted changes

## Page 10

(blank page)
