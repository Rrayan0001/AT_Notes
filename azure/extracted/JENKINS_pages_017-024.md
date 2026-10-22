# JENKINS.pdf — Pages 17–24

## Page 17
(4.) BUILD TRIGGERS (17)

Build triggers define when Jenkins automatically starts a build.

Common Trigger type :
1. Remote trigger : Start build by calling URL :
http:// <jenkins> : 8080/job/<job>/build ?
token = <TOKEN>

2. Build after other projects are built. runs when another job finishes. Used to chain Jobs.

3. Build periodically (Cron)
Runs on a schedule regardless of code changes

4. Poll SCM (discussed Later)

5. GitHub Webhook trigger. (discussed Later)

CRON Syntax : Min Hour Date Month Day
0-59 0-23 1-31 1-12 0-7 (arrow pointing to 0-7: Sunday)

(H) hash : spreads load by picking consistent but staggered minute, so that all build dont start at once.

## Page 18
(5.) BUILD PARAMETERS (18)

Build parameters let a job accept input values at build time, so one job can behave differently per run without changing the config.

How to enable : freestyle : "this project is parameterized"
pipeline : "parameters" block

Types :
String : Single-line text    password : Masked Input
Text : Multi-line text
Boolean : checkbox (T/F)    File : (upload)
Choice : Dropdown list of fixed opts.    Run : Pick a build of another job
Git parameter : choose a branch or tag from the repo.

## Page 19
(6.) SCM & Webhooks. (19)

a) Source Code Management : System to store and manage source code and its change.

What Jenkins does is connect to your repository and get the lastest code to build.

b) Poll SCM : periodically checks SCM repository to see whether new code has been committed.

H/5 * * * *   Every ~5min Jenkins checks on GitHub for latest code changes/commit.

if No changes → Do nothing
New commit → Start the build.

c) GitHub Webhook : Works the opposite way to poll SCM, here github checks for changes and notifies webhook — Jenkins starts the build after receiving info from GitHub.

Differenec : Poll SCM : Slight delay, More Netreq, Starts after confirm.
Webhook : faster , less Netreq, Build starts immediately

(margin note : "webhook is more agile than scm")

## Page 20
(7.) Environment Variable : (20)

Environment variables are key-pair that store information which can be used by Jenkins jobs, pipeline , scripts and application during execution.

Temporary settings/information available to a build

Common Jenkins environment variable :

Build_Number ; Build_ID ; Job_Name ;
Workspace ; Build_url ; Node_Name ;
GIT_COMMIT.

(8.) Build history & Artifacts.

Build History is the list of all previous and current builds executed by a jenkins job.

Artifacts are the files produced by a build that Jenkins saves so they can be downloaded or used later.
→ stored in [myapp.jar]

## Page 21
Advanced portions. (9.) Pipeline Syntax : (21)

Jenkins file contains the entire CI/CD process in form of pipeline.

Components :

a. agent : tells where the pipeline should run.
agent any (Runs this pipeline on any available jenkins node)
agent { label 'linux' } Specify agent.

b. Stages : contains major phases of the pipeline.

stages {
    stage('Build') {
        steps {
            echo 'Building'
        }
    }

    .... Same for test, deploy.
}

Extra. tools : tells jenkins which build tools pipeline needs.

## Page 22
c. Step : contains the actual commands/action jenkins need to perform.

steps {
    echo 'Hello'
    sh 'mvn clean package'
}

d. Post : defines what actions Jenkins performs after a pipeline finishes.

5 common condition : always, success, unstable, aborted.

e. Environment : defines environment variable that can be used during pipeline.

f. parameter : allows to take input during build start

parameters { choice(

    name : 'Environment'
    choices : ['dev', ...]
    description : " msg "

) }

## Page 23
g. When : decides whether to run a stage or skip. (23)

stage('deploy') {
    when {
        branch 'main'
    }
}

when {
    expression {
        ......
    } }

h. input : awaits human confirmation (approval/inp) before proceeding

stage('Deploy') {
    steps {

        input message : '....'
    } }

i. Options : controls how jenkins execute and manage pipeline

to timestamps to console log :
options { timestamps() }

## Page 24
(10) Build Stages. (Sequential Vs parallel) (24)

Sequential Stages ....

Sequential means stages execute one after another. in the order they are written.

what happens when a stage fails — Rest are Skipped. Each stages depends on the output of previous build

• Simple, predictable, easy to debug
• Total time is the sum of all stages, so slower in overall process.

Parallel Stages

Independent stages run at a Same time inside a parallel block , and the parent stage finishes when all branch finish.

Multiple independent — stages run Simultaneously,

tasks run without hampering other task. each branch can run on a different agent. Total time ≈ Slowest branch.
logs are interleaved , hard to read
