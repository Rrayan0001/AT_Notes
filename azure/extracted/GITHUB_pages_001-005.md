# GITHUB.pdf — Pages 1–5

## Page 1

StarNote (app logo, top right)

Git-Hub Fundamentals

StarNote (watermark, bottom right)

## Page 2

GITHUB — Git

- Github is a platform widely by deveLopers for collaborations and sharing.
  - Place to Store Code, Projects, Artifacts
  - track changes
  - Version Control
  - Pull requests ( Review before merging )

Widely used in CI/CD to push code changes and initiate trrgger pipeline — automated build, test, deploy.

Git. (Version control tool, Locally installed
on your computer or server to
track code changes and commit.)

GitHub ( Online platform for hosting Git repos.
access via API, Website — Supports
collaborations but network access ).

- Repositories : CentraLized digital Storage
  location where we can
  manage, track code, data & docum[illegible]
  Enables collaborations without overriding

[watermark: StarNote]

## Page 3

[top edge cut off — partial fragment of a line from previous page, y / ) ]

Local Repo.
— Repo stored in own PC.
— Edit, Stage changes, Commit them.

Remote Repo
— Stored in Remote Server ( GitHub )
— Share code and collab - Synchronise

Concepts: (add
                              ⌒⌒\
a. Staging : Selecting file changes  commit
                        Staging area — index.
                        b/w Working & local

b. " git status" : Show current status of
                   working directory, staged area
modified files, ..... etc

c. "git add" : Move selected files to
               Staging area — ready for
               commit.
   Syntax : git add app.py / . / *.py
              └─────┘   ↑
               file      all
                         change

d. git commit : Saves changes to local
repo — read to be pushed → Remote

[watermark: StarNote]

## Page 4

e. " git init" : initializes empty, new,
       reinitialize repos.
creates hidden .git folder containing
metadata, configuration → to track
project history.

Git Push —          >(R.RP Loc)
                    ⌒'
Syntax : git push Origin (main) / feature-
                                 branch
task : Upload local commits to a
       remote repo. ...

Git Pull —

  Syntax : git pull origin main
  task : downloads changes from a RR p
                          ⌒      integrate
                          my current local
                                 branch
  Cycle : fetch → integrate → merge

Git fetch : downloads changes for review
            doesn't integrate (merge) with
            local repo.

[watermark: StarNote]

## Page 5

PR ( pull request ) :

feature which enables other developers
to review and approve our changes
before merging one branch → another.

• □ → feature_login ══add chng══> main branch
  USR1                  • Create pull req
                        f-1 → main       ↗
                                       if Appr.
                              review by team

Git Branch : Branch in github Separate
             Line of development
      which lets dev work on a
feature or bug fix without directly
changing main code.

main ( Shopping )                |  git branch
 ├─ login & Acc                  |    - list local Br
 ├─ UI / dashboard               |  git branch dev
 ├─ products / inventory         |    - create Br
 ├─ payments                     |  git branch -a
 ├─ Order & Shipping             |    - list local
                                 |      + Remote Br

Git Switch / Checkout : Used for switching
branches ( restore file to prev. state)
checkout -b <name> / switch -c <name>

[watermark: StarNote]
