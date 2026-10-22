# JENKINS.pdf — Pages 9–16

## Page 9

8. Credential Management     Pg-9

Credentials in Jenkins are Secrets (passwords, tokens, keys) stored securely by the controller → Jobs can use them without hardcoding them in <Jenkinsfile>

Common credentials:
• Username with password.
• Secret text
• SSH username with pvt key.
• Secret file.
• Certificate & Aws credentials.

Scopes:
• Global : usable by any Job and the system.
• System : Only for Jenkins (agents & email), not exposed to Jobs.
• Folder level : Restricted to Jobs inside specific folder.

## Page 10

Pg 10

9) Build : Single execution of a Job, Each 'run' gets a unique sequential number (#1, #2, #3....) and a Status:

Success [● ●], Failed [●], Unstable [●], Aborted [●].

Jenkins stores each build's logs artifacts, test results and metadata under

Jenkins_Home/jobs/<jobs>/builds/<number> with a provision to auto-delete via 'discard old builds'.

Workspace : Directory on the node (C&A) where Jenkins runs a job. It's where source code checked out, files are compiled & temporary build output is created.

• Default Path : /var/lib/Jenkins/workspace/<job-name>

• persists between the builds of Job unless we clean it. cmd: cleanWs() in a pipeline.

• Each job gets its own workspace and concurrent builds get separate ones.

## Page 11

Pg-11

Console Output : Live, line by line log of a build, showing everything Jenkins did :

• SCM checkout      • output
• Shell command     • plugin messages
• errors            • final result.

helps in debugging and also shows timestamps if enabled.

Workflow :

Job → triggers → build        (runs inside a workspace)

(Writes log to the console output.)

Remote directory : Folder on agent where workspace is created.

## Page 12

Pq-12

10) Node & Executors.

Node : Any machine that can run Jenkins builds.
• Controller (built-in node) :

Machine Jenkins runs itself on. Set executor to 0 → only orchestrates!

• Agent Node : Separate machine (physical servers, VM, Docker containers, kubernetes pods, Instances) that run builds.

Executors : A slot on a node that runs one build at a time

Node → 3E → run 3 builds in parallel.

[Extra builds wait on build queue] untill executor is free.

Components : • Executor count is usually set near node's CPU core Count.
• Labels : Tag like " Linux, docker or windows" lets job target specific Node.
• Usage Settings : " Use this node frequently" or run builds on select nodes
• Ephemeral Agent : temporary use and destroy container/VM for a build.

## Page 13

Jenkins : Jobs & Builds.  Pg

| No. | Schedule | Description | Time |
| 1 | Freestyle Projects | 14 | |
| 2 | Pipeline Projects | 15 | |
| 3 | Multibranch pipeline | 16 | |
| 4 | Build trigger | 17 | |
| 5 | Build parameters. | 18 | |
| 6 | SCM & Webhooks | 19 | |
| 7 | Environment Variables | 20 | |
| 8 | Build history & Artifact | 20 | |
| 9 | [Advance] Syntax declarative | 21–23 | |
| 10 | [A] Stages : Seg vs parallel | 24 | |
| 11 | [A] Error handling | 25 | |
| 12 | | | |
| 13 | | | |
| 14 | | | |
| 15 | | | |
| 16 | | | |
| 17 | | | |
| 18 | | | |
| 19 | | | |
| 20 | | | |
| 21 | | | |
| 22 | | | |
| 23 | | | |
| 24 | | | |
| 25 | | | |

## Page 14

1. Freestyle project :     (14)

Simplest and most flexible type of Job.
helps us configure CI/CD job thru Jenkins UI by selecting options Source code mangm, build triggers, build steps & post-build

Different Config Settings:

a) General (contains basic information about the Job.)
    → Description : It describes what Job does
    → Discard Old build : Auto remove old builds.

b) Source Code Management : This tells Jenkins where the application source code is located.

c) Credentials : to access private repo, Jenkins needs credentials

d) Build triggers : determines when Jenkins should start a job
i) Periodic Build ii) Poll SCM iii) GitHub Hook Trigger

e) Build Environment : config conditions/env setting
f) Build Steps : define what Jenkins actually does during the build.

## Page 15

2. Pipeline Projects :     (15)

A pipeline project defines entire CI/CD process as code, written in a Groovy - based DSL.

It models build, test and deploy as a sequence of Stages.

definition live in Jenkins UI or in a <Jenkinsfile> in Git repo.

Pipeline script : Code pasted directly into the job config.

Pipeline script from SCM : Jenkins pulls the <Jenkinsfile> from Git at build time.

2 type of Syntaxes :

Declarative                      Scripted

Strict, predefined blocks.       Free-form Groovy.
pipeline { }                     node { }

Moderate flexibility             High flexibility

## Page 16

3. Multibranch Pipeline     (16)

MBP → • builds      ↓↓↓    Source control repository
      • tests       | | |
      • deploy      | | |

        ↓ ↓ ↓

      multiple branches.

Without requiring us to manually create Jenkins Job/branch

Workflow :

Bind Jenkins → Source Repo ✓ not branch ✗

if branch is deleted        ↓ Jenkins looks thru every branch in search of
   ⟲ Jenkins    JenkinsFile
Auto removes any build job        ↓ if found
<cleaning>   Auto configures dedicated Job and executes pipeline

Benefits : • Automation        (Zero touch)
• Branch Isolation        (0 main branch interfere)
• Version Controlled pipeline
        (Branch-wise CI/CD)
