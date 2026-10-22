# JENKINS.pdf — Pages 1–8

## Page 1
NOTEBOOK
Jenkins - Devops
Sarthak Dutta
(watermark: StarNote)

## Page 2
Jenkins Fundamentals.
                     Pg        Est.rev.

No. | Schedule | Description | Time
1 | What is Jenkins ? | 3 | 5min
2 | Why use Jenkins ? | 4 | 5min
3 | Workflow diagram. | 4 | 5min
4 | Architecture of Jenkins | 5 | 10 min
5 | Installing Jenkins. | 6 | --
6 | Job and Projects | 6-8 | 15min
7 | Sample Practice | 8 | --
8 | Credentials | 9 | 10 min
9 | Build, Workspace, Console | 10-11 | 15min
10 | Executors & Nodes | 12 | 10 min

(watermark: StarNote)

## Page 3
pg 3

(1.) What is Jenkins ?

Open Source, automation server, written
in Java. It uses pipeline to build, test
and deploy whenever an event is triggered

such as code commit, a schedule or a
manual click.

It runs on Controller/agent architecture :

    schedules              Executes
      Jobs       ->          them

has an wide range of plugins which
connects -> Git, Docker, Kubernetes, testing

(2.) Why use Jenkins ?

- Continuous Integration : Every code push
  is Automatically build & tested ->
      Integration Bug are caught early

- Continuous Delivery/Deployment :
  Same pipeline packages the app & push
  it to -> production & Staging
  with manual testing.

(watermark: StarNote)

## Page 4
pg 4

- Automation & Consistency : Repeatable
  pipeline replaces error-prone manual
  builds & deployments.

- Faster feedback : Devs get build & test
  within minutes.

- Flexibility : Plugins allows integration
  with almost every toolchain and can run
  distributed builds across many

(3.) Workflow diagram :

    developer pushes  ──────►  Jenkins
      Code                      pulls it
                                 │
                                 ▼
                              Compile
                                 │
                                 ▼
                          runs unit tests
                    │◄─────────────┘
          Builds a docker img
                    │
                    ▼
              deploys to
       a test environment
                    │
                    ▼
              notifies team.

popular alternative : Github Actions.

(watermark: StarNote)

## Page 5
Pg 5

(4.) Jenkins Architecture

uses controller-agent, formerly (master-
slave) distributed architecture.

Controller (master) : Hosts the Web UI,
Stores configuration and job definitions,
schedules builds, dispatches work to agent
and records.

It can run builds it self, but in production
it is used for orchestration only.

Agent (Slaves/Nodes) : Machines (physical,
VMs, Container, or cloud instances) that
actually executes the build steps. They
connect to the controller via SSH/Websocket

Executors : Slots on a node that run jobs.
A node with 4 executors can run 4
builds in parallel.

Jobs/pipelines : defined either as freestyle
projects or as pipeline code in

(*) why use agent instead of Controller
- memory exhaustion & overloading

(watermark: StarNote)

## Page 6
instead of doing 500 task via 1 master
divide 50 tasks per agent total 10 agents
(load - balancing)

Pg 6

(5.) Installing Jenkins & using Jenkins

sudo dnf install -y java-21-amazon-
corretto.

sudo wget -O /etc/yum.....
sudo rpm --import https://pkg.....
sudo dnf install -y jenkins

(6.) Job's & Projects

In Jenkins, a job (also called a
project) configured unit of work
that Jenkins runs

→ what to do
→ when to trigger
→ what to do with results

Each execution of a job is called a
build.

(watermark: StarNote)

## Page 7
Pg-7

Main Job types :

                     What Job Configures :
- Source code management : Git repo & branch
- Triggers : webhook, poll SCM, cron schedule
- Build env : parameters, credentials.

- Build Steps : Compile, test, package, deploy
- Post-build : archive artifacts, publish report

a) Freestyle project :
   GUI Configured Job : fill in forms for
   generic Job Configs. in UI
   and config as XML, Easy for Simple
   tasking and no coding, No parallelism
   or stages hard to manage version control

b) Pipeline : Groovy-based Syntax code
   for defining stages, parallel steps &
   long-running flows. written in
   (Jenkins File.)

Declarative : Structured and Simpler
              with fixed layout.

Scripted : Fully Groovy, more flexible
           but more complex.

(watermark: StarNote)

## Page 8
Pg-8

Key features of Pipeline over Freestyle

Parallel Execution : Run tests on multiple
environment at the same time.

Durable : Survives controller restarts.

Version Controlled : Changes are reviewed
and tracked in
Git.

(7.) Sample Practice. (UI & Dashboard)

(watermark: StarNote)
