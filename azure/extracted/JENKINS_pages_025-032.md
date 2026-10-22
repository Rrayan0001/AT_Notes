# JENKINS.pdf — Pages 25–32

## Page 25

(11.) Error handling    (25 circled)

Error handling means deciding what
Jenkins —performs—→ when something doesn't
work.

post { failure } : action performed when
pipeline fails.

catchError() : allows us to catch an error
and control the result instead of
immediately stopping everything.
[ loc : stages, step ]

try/catch() : Same as catchError.

## Page 26

Jenkins Plugins

| No. | Schedule | Description | Time |
|-----|----------|-------------|------|
| 1 | Plugins ? | | |
| 2 | Plugin dependencies ⎫ | 27 | |
| 3 |  \ Common plugins ⎬ | | |
| 4 | Pipeline plugins | 28 | |
| 5 | Credentials plugin | 29 | |
| 6 | Git/GitHub/Maven/Docker/ | | |
| 7 |  \ Kubernetes plugins | | |

Rows 8–25 empty.

## Page 27

1. Jenkins Plugins :    (27 circled)

Jenkins plugin is an extension that add
extra-features or integrations to Jenkins
→ Adds capability to Jenkins

Jenkins provide CI/CD
+
plugins → work with Git, Docker, Maven,
Kubernetes, etc.

2. Plugin Dependencies :

plugin dependencies means one Jenkins plugin
—depend—→ another plugin
to work properly.

Installing one plugin can automatically
install its required dependencies.

3. Common Plugins :

Git : Jenkins → Git repos.
Github: Jenkins → Github
pipeline : CI/CD pipeline → using Jenkinsfile
BlueOcean: Visual interface for pipeline
Junit : Display automated test result.

## Page 28

4. Pipeline Plugins :    (28 circled)

Pipeline functionality is provided by a
collection of plugins, rather than one
single plugin.

like:

• pipeline : provides basic pipeline features/
functionalities.

• pipeline : Stage View : Shows stages such
as : Build → test → Deploy.

• pipeline : Basic steps : provides common
steps. echo, sh.

• pipeline : groovy : Provides groovy Scripting
Support used by Jenkins pipeline

• pipeline : Input step : Allows Jenkins to
pause and wait for manual approval.

Workflow :

Source → GitHub → Git/Github → Jenkins
pipeline → Maven (Build) → Junit (Disp Test
results)
→ Docker (Image) → Kubernetes (Deploy) →
Slack Plugin (Notify).

## Page 29

5. Credentials Plugin    (29 circled)

Allows Jenkins to Securely store and
manage Sensitve enformation. such as
password, SSH, key, API tokens, Certificate

Bad practice : Storing Credentials in Jenkinsfile
(Hardcoding)
Good practice : Credentials → store
Jenkins Credential Manager
Credential ID ← Reference by

Concepts:

Credential ID : Name used to reference a
stored credential

Secret Masking : Jenkins tries to hide secret
in console output.

Scope : Controls where a credential can be
used.

## Page 30

Jenkins Configuration as Code plugin.    (30 circled)

Jenkins Configuration as Code (JCasC) is
a core Feature that allow us to define
entire → Jenkins controller's config →
[as Code] by using human readable,
plain-text YAML
probable:[Stefill]

What it eliminates :

Jenkins UI Config
Maintaining complex Groovy initialisation
Scripts.

Benefits :

• Version Control : Track config updates,
manage changes via full probable:[req] , easy rollback

• Disaster Recovery : Spin up identical
controllers from scratch in minutes if a
Server crashes

• 0 drift : Eliminate Snowflake Server (uniquely managed
Server that becomes fragile, difficult to
reproduce).

## Page 31

31 (circled)

(page blank — ruled lines only)

## Page 32

Study Plan    Date : 33–34

Subjects:
○ Credentials
○ Username/password
○ SSH keys
○ Secret text

Subjects:
○ Secret file
○ Credential Bindinng
○ RBAC
○ User & permission

Subjects:
○ Agent Security
○ Securing Jenkins.
○
○

Subjects:
○
○
○
○

Performance:
Credential & Security Jenkins.

Summary:
Shot notes.
