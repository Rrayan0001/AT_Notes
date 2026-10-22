# Azure / DevOps Notes — Full Transcription

**Assembled from:** the per-notebook page-range transcriptions in this repository,
concatenated into one continuous page sequence per domain. Page numbers below are
shelf numbers: every notebook in the domain sits on the same shelf, numbered in order,
and `## Page N` means shelf page N. The notebooks' own page numbers restart at 1, so
each volume's range is listed here.

**What is preserved exactly as written:** original spelling and capitalisation,
grammatical errors, wrong facts and broken code, `[illegible]` markers, struck-out
text, scanner watermarks, and page-level defects. This is a transcription, not a
correction.

## Shelf map

| Shelf pages | Notebook |
|---|---|
| 1–16 | Ansible |
| 17–41 | Docker & Kubernetes |
| 42–51 | GitHub |
| 52–91 | Jenkins |
| 92–110 | Maven |
| 111–131 | Terraform |
| 132–132 | Splunk |

---

## Page 1

NOTEBOOK

ANsibLE – FUndAmeNTALs

SArTHAK DuTTA.

[bottom-right watermark]: StarNote

---

## Page 2

1. What is Ansible

[top-right]: Ansible.

Configuration – management tool. helps to
automate Setting up infrastructure with
essontial configuration tuing on multiple
resources.

[Diagram:]
Control Node ---SSH---> EC2
            ---SSH---> EC2
            ---SSH---> EC2
            ---SSH---> EC2

Ansible is agent-less means
to configure the receiptient we dont
to have ansible installed on it.

Supports parallelism :- can run configuration
    setup simultaneously on
    multiple resources.

• Save time to market by faster configuration
• Scaleable approach to set-up configurations.

---

## Page 3

2. Configuration Management :

• Purpose of Configuration management : means
maintaining Servers in a desired state.

Without Ansible ------------> Configure Servers
                              manually

With Ansible ------------> define desired
                           configuration once
                                ↓
                          Apply to N… Servers.

Ansible Architecture:

[ Ansible Controller ]
  Runs commands & Playbook
        ↓ ↑
      SSH/ WinRM
     /    |    \
 Web   APP   DB
 managed Node (MN)  (MN)  (MN)

---

## Page 4

Key Components :

• Controller: Server/ Machine where ansilble is installed and executed.

• Managed Nodes: Server where Ansible configures.

• Inventory: List of target hosts.

• Modules: Performs tasks such as installing packages or Copying files.

[Diagram: two boxes, arrows between:]
[Controller nodes]                          [Managed nodes]
 Runs Ansible           ---------------->   Receives Autom…  probable:[Automation]
 Stores playbook                            Runs target
   & Inventory         ---------------->   Application.
 Connects to
   torget Machine   - - - - - - - - ->      provides SSH
 Needs Python           ---------------->     & WinRM
                                            No prerequisite

---

## Page 5

3. How is Ansible different from CheF/
puppet.

CheF/Muppet ----------------------- Server
                                    (Agent installed)
decide{  • <--------------- information ------- A   ↑ configures
              pull          high turn-around
                            time
         • -----------------------------> A
           push

Ansible --------------------- Server
        fast and Simple.     (Agent-less)
   •
   push    configures thru SSH      ↑

4. How to install Ansible

Sudo dnf install -y ansible

Sudo dnf install -y faython3  probable:[python3]

---

## Page 6

5. Inventory

defines which machines Ansible should
manage. Can contain indisiuidual IP address,
DNS names, group, variables, etc

Example:
                group
                 ↙
      [Server]
  Server-1  ansible_host = < IP-address >
  Server-1  anible_user = ec2-user
         child.
     ↙
prod ↶
[all : var]
   ansible_ssh_pvt_key_file = /directory
   ansible_python_interpreter = get by
   which python3

6. Ad-hoc Commands.

Used for executing quick-task
without creating playbook

Syntax:
  ansible <host> -i <inventory file>.ini
    -m <module>  -a "<arguments>"  (-v)
                                   verbose

---

## Page 7

Commands in details.

-m : modules.
-a : arguments
-b : gives Sudo priviledges. (becomes)

Common Modules

ping : Test Connectivity

apt,dnf,yum : Managing packages.

Service,systemd_service : Services Management

user,group,

Shell : executes cmd thru shell.

Setup : Gather System facts.

---

## Page 8

7. Playbook & tasks:

Playbook is a YAML-file containing
plays that define :- which hosts to target
and what tasks to perform.

(practical done)

task - <individual operations> iside a
  playbook,  tasks ---------calls.------->  module

and are generally executed from top →
bottom. having a name & action.

8. Variables:  Stores values which can be
reused inside playbook, inventory, etc.

Declaration:

    vars:
       package_name : nginx
                    ↓ to use it

 Syntax: "{{ package_name }}"   [closing brace written in the author's "3"-glyph style]

ansible -playbook -i inventory.ini  ↗ Overnide

Site.yml  [ -e "package_name = nginx" ]

---

## Page 9

9. Facts :
System details Ansible gathers about managed nodes, generally thnu setup.

cmd :  ansible -i inventory.ini -m setup

10. Registers
Responsible for saving result of a task in a variable ——→ to inspect later on.
Common Registers.

stdout : command -O
stderr : error
rc : return code
changed / f'd

11. Handlers :

Tasks that only run
        ↑____when____ by other
          notified    task
Commonly used to restart/reload Services.

---

## Page 10

11. File and Permissions :

file module creates, removes, modifies file or directory
manages : ownership & permissions.

Eg. task
   - name : Create directory
   ansible.builtin.file :
     path :
     state : directory / touch / absent   ↗ rm
   # makes sure directory / file exists
   owner : ec2-user ]
   group : ec2-user ] ownership
   mode : 0755  ↷   0- R/w/x
                    G/Oth - R/x.
• Absent / link : remove specified file or dir
                  creates symbolic link.

12. Packages & Services :

Packages are Software Installed on a machine and Services are program running in background.

popular State :
   started, stopped, restarted, reloaded
                        [ Service Config R+]

---

## Page 11

13. Users & Groups :

Ansible can create / modify / delete users and groups → OS.

task :
-name :
ansible.builtin.group :
name : devG
state : present ( available)

-name :
ansible.builtin.user :     \
name : Jenkinsll.          \
group : devG                >  creating user.
shell : /bin/bash          /
create_home : true        /
state : present          /

-name :
ansible.builtin. user :
name :
state : absent  } removes a user
remove : true   }

---

## Page 12

14. Tags :

tags allow you to run Selected task or Section of playbook.

task :
- name : Install Nginx
 ansible.builtin. package :
   name : nginx
   state : present
  tags :
    - install .

How to run :  ansible-playbook -i inventory.ini site.yml ——tag install/
   ——skip-tags                    ↓
    ↘   Run all except.           runs only install task

15. group_vars & host_vars (directories)
allows us to organise variables outside the playbook, often help in keeping env Specific variables outside
                                     [practice]

---

## Page 13

16. Roles :
Roles organises Ansible automation into standard directory structure. particularly useful when multiple project need same standardize Server Configuration

                            [practice]

17. Ansible Galaxy :

Repo - tool for discovering and installing reusable roles and Collection.
                                        ↓ listed in
                              ↖  requirements.yml

ansible - galaxy collection install -r requirement.yml.

18. Ansible Collections : Standardized packaging format to export / distribute ansible content.....
• Components : Packages Modules, plugins, roles, documentation into Single modular structure.
• Namespace, independent Versioning, Distribution.

---

## Page 14

19. Ansible Vault :

ansible -vault create secrets.yml

Specialized Storage which encrypts Sensitive data : Passwd, API token, Pvt Config....

How to use :              Run :

secrets.yml               ansible-playbook -i inventory.ini file.yml ——ask-vault-pass
db_pass : * * * * *
db_user : ....

playbook :                protected Vault : locked with passwd.
                          ——vault -passwod -file.

- name : Config db.
  var_files :
    - Secrets.yml

task :
 - name :
 ansible.builtin.debug
 var : db_uses

---

## Page 15

20. Error Handling:

Project : Deploy EC2 with terraform and configure with ansible

---

## Page 16

[blank page]

---

## Page 17

Aws Devops Part – I.

1. Docker: Packaging tool/Software helps to package libraries, dependencies and config files required to run a Software.

[Diagram: Application box — arrow pointing up to "Packaging tool/Software" — arrow curving down to Tester box]

→ Docker packaging img.

Tester.

helps to faciliate testing team to run and test software.

1.1.1. Container: A way to package an application with all necessary dependencies and configuration.

Can be easily shared, make developemnt & deployment efficient

---

## Page 18

Architecture of Docker

[Diagram box:]
Container
APP 1
Dependencies.

.... n containers

Docker Engine
↑
Operating System
↑
Hardware

runs on seperate env.

| Docker Container | VMs. |
| low impact on OS, very fast, low disk usage. | High impact on OS, Slower, high disk usage |
| sharing, re-building and distribution is easy | challenging |
| Encapsulates apps instead of whole machine | Encapsulate whole machine |

---

## Page 19

Docker Engine: the Software that allows us to build run and manage containers on a machine.

Contains:

1. Docker Client: Sends cmds to docker eg. docker run, docker build ...

[double arrow (up/down) between Docker Client and REST API]

2. REST API: Allow client to commuuni -cate with daemon ... vise versa

[double arrow (up/down) between REST API and Docker daemon]

3. Docker daemon (dockerd): background Service that listens for docker API req. and manages docker objects such as containers, images, network .... and Volumes

---

## Page 20

1.1.2

[Diagram: Docker file. → Image → (C) (C) (C)]

dep + lib to run
↑ prog.

Intance of an image. (Each isolated with its own file system)

serving under same underlying image layer.

It's is a Simple fat file with instructions to build an image

1.1.3. Docker registry is simple central repository for storing and distributing docker images.

[Diagram: Dockerfile → (app v1.0) Image → Docker Hub/Registry → tester can pull that img to test (app v1.0)]

ECR: Elastic Container Registry, allows to store, share, deploy Docker & OCI artifacts

uses IAM for permissions and scans for vulnerabilities.

1.1.4 Diff. image and Container

Container is the running environment for image.

---

## Page 21

[Diagram: Port. → Container. box: Fs (virtual), Env. Config, Appl. img.]

Helps to talk with Appl. running inside container

cmd: docker run -p 8000:3000 myapp
maps 8000 of host to 3000 of Container

1.1.5 Topics in Overview:

Docker file: text file with instructions to build an image, layer by layer

Common Instructions: (yaml)

- FROM: base image
- WORKDIR: Sets working directory inside the image
- CMD: what runs when container starts
- COPY/ADD: copies file from host into image
- RUN: Executes commands at build
- ENTRYPOINT: User argument gets appended
- ENV: Sets environment variables.
- EXPOSE: documents which port → container listens on

---

## Page 22

Image: Read-only immutable template built from a Dockerfile.

→ stack of layers + metadata (cmds, ports, env)

(filesystem diffs)

Images are stored locally or in a registry

Container: A running instance of an img.

[Diagram: img box]

Docker adds a thin writable layer on top of the image's read only layer

if container is deleted writable layer is gone image remains intact. ← Intact.

any changes during runtime go there

Docker port: Containers have their own private network namespace.

Expose <Port_No.> actually helps to establish connection: host → container

---

## Page 23

1.1.6 Amazon Elastic Container Service

Aws container orchestration service — runs and manages Docker containers at scale

Task definition: JSON blueprint → describes which images to run, CPU/memory, ports, envs.

Task: a running instance of task definition.

Service — keeps a specified number of task running, handles restarts integrates with load balancers.

1.1.7. Architecture of Docker Container

(a) filesystem: inside a docker container is layered, designed for • speed, • efficiency, • portability

(1) Union filesystem:

→ x Monolithic Disk image
→ ✓ layered Union FS, with stacks of lightweight layers on top of each other

---

## Page 24

process:

[Diagram: three stacked boxes]
Add a — img 1.0
Add b — img 1.1, img 1.0
Add C — img 1.2, img 1.1, img 1.0

(brace under all three) Appearing as Single unified System.

Image layers (Read-Only):

creates a new read-only layer shared across any container that uses the same image

Container layer (Read-Write):

img → container

→ Docker adds a thin ephemeral layer (rw), any changes happens in this layer

---

## Page 25

Copy-on-Write (CoW):

[Diagram:]
Read Write ← Docker copies it to
↑ then modifies.

file → needs modifying

read only → Original file. remains unchanged.

(2) Storage Drivers:

Required for handling and managing this complex stacking and merging of layers.

Eg: (latest) overlay2,

(legacy) aufs, btrfs, zfs and devicemapper.

(c) Persistent Storage (Data Management)

facilities provided by docker to preserve data in container layer there

---

## Page 26

host OS.

Volumes: Safest and preferred way to persist data
→ managed by docker, isolated from the core functionality of the host machine.
• Easy to backup, share
• Work Seamlessly across different OS environments.

Bind Mounts:

file, directory (box icon) → Container
host machine    maps.
→ any changes made in Source code gets mapped

So changes reflect instantly without rebuilding

Tmpfs Mount: Stores data strictly in host's System memory (RAM)

---

## Page 27

⑥ Namespaces: linux kernel feature → Namespace.

fs → dictates what Container can see on the disk.

Namespaces → dictates what container can see regarding OS.

→ provide an illusion → Ⓒontainer.
→ running on its own dedicated machine
isolated System resources from process inside container
→ No interference with process Outside of it.
Isolation

6 core namespaces:

• PID:
• NET:
• MNT
• USR:
• HOSTNAME:
?

---

## Page 28

Cgroups.

Cgroups determine what a container can use

Cgroup
→ limits
→ accounts
→ isolates     ]– resource usage.

→ Without it potential problems may arise.

• lets assume a container with a memory leak; CPU–intensive loop could consume 100% of VM resource

Starving all other containers and potentially crashing machine.

To Configure limits on container, config these cgroups limits using flags in <docker run> or <docker-compose.yml>

---

## Page 29

| Resource | Task |
| --- | --- |
| CPU | Restrict Container to Specific fraction of CPU cycle/bin to → Specific CPU Core. |
| memory | hard limit on ram consumption. above this limit linux OOM terminate process |
| Block I/O. | limits Speed at which container R/W → disk prevents bandwidth monopolizing |
| Network. | Shaping and throtting Outbound Net traffic to prevent bandwidth exhausion probable:[exhaustion, cut off at page edge] |
| Device. | Controls access betn Container → physical/Virtual devices on host system. |

Noisy Neighbour problem – multitenancy
→ Soln → Cgroups. provides isolation and partitioning resources within boundaries.

---

## Page 30

Docker Client & Networking (1.18)

Docker Client is the command line tool, used to Communicate with dockerd (Docker daemon)

When we run a command such as 'docker run nginx' DC→(DD) responsible for creating and managing container.

popular docker commands:

docker pull → Downloads an image
docker run → Creates and starts a container
docker images → lists all images
docker build → Creates an img from docker file.
docker ps -a → shows running, all containers
docker stop, rm, log <id>
docker exec -it <id> bash – interactive mode

---

## Page 31

Docker Networking

Allows containers to communicate with:

→ Other Containers
→ Docker host    • Via ports.
→ External Networks.

(C→C.)

Box containing: A (web), (small box), B (Sql)
→ Docker Network (Bridge) (DNB)

Step1. docker network create mynet

docker run -d --name Web -- network mynet nginx

mysql req
Web ————→ db
container      Container

docker run -d --name Sql -- network mynet mysql

(Host → Container) done with help of container ports.

port is where appl. in container listens to commnicate probable:[communicate] (browser → Host:port → Docker port fwd → Container port → Appl)

---

## Page 32

C → Outside Network .
Outside Net → C. (user)

curl https://ex.com.

process: C →
Docker Network
→ Docker Host
→ Internet
→ External Server.

<goes thru Docker NAT on host and reaches Outside Network.>

Outsider user wants to access docker Container

docker run -d --name web -p 8080:80 nginx
Host→ C.
  P     P

Routing would be done like.

Ext- Server (sees) →
Host IP
→ NAT →
containers pvt. Docker IP.

User →
(http://host-IP:8080)
→ Docker host
→ Container:80
→ Nginx.

Docker Overlay Network

Container to Container communication across different host machines

---

## Page 33

docker network create -d overlay my-net.

docker Service create --name web --network my-net nginx. C1 (M1)
docker Service create --name db --network my-net mysql. C2 (M2)

Web Container
↓ http://api:8080
Overlay Network
⇣⇣ Encapsulated network traffic
Docker Host 2
↓
API Container : 8080

Swarm Cluster
  Manager Node
    ⤷ Worker Node 1
    ⤷ Worker Node 2

container A
↓ Original packet
Docker Host 1
↓ Encapsulates packet
physical/ Cloud
↓
Docker Host 2
↓ Decapsulates packet
Container B

---

## Page 34

(Extras: 1.1.9 Docker Compose)

A tool for running multi-container applications with a Single yml file. instead of running a bunch of Separate docker run commands.

(manual)

Eq. docker network create mynet
docker run -d --network mynet --name db -e……… -v
docker build -t web
docker run -d --network mynet --name web -p …. -e ….

Compose:

docker compose up. create and start all services
down stop and rm -v (vol)
build rebuild img
logs -f tail logs across services
ps. list running services in this project.

Key Concepts: Each one becomes a container (service)
Compose auto–creates a shared network
attaches named volume for persistent

'depends ON' : 'Wait Until readdy probable:[ready]' – manages Startup order

build vs image : build → local [obscured by watermark, probable:[Dockerfile]]
image → registry [obscured by watermark, illegible]

---

## Page 35

Aws Devops Part - II

2. KUBERNETES

Container orchestration Service.

Kubernetes also known as K8's, Open-source system for.
> Automating deployment
> Management of containerized apps.
> Scaling & Monitoring of Containers

[Diagram:] App → (arrows to) 1/ 2/ 3/ 4/ [small container boxes] → Server 1, Server 2, Server 3; Server 1 arrow → nodes.

Docker Containers | Kubernetes manages these containers

C3 crashes kubernetes automatically creates new container

can also add C's when traffic is increased (Auto-Scalling)   ← (arrow pointing to above)

< load balanicng >

---

## Page 36

what is exactly Container Orchestration :

Automatic Management of containers which involves :-
• deploying • Networking
• Start / stop. • load - balancing
• Scalling • Replacing crashed C.

II.2.1 Server (Nodes) : A Server (Node) in kubernetes (physical/Virtual) machine in a kubernetes cluster where Containers run.

II.2.2 Architecture of Kubernetes:

[Diagram:] Box: Phy/Vm — Node. — where kubernetes runs appl. Container. → A kubernetes cluster consists of group of nodes (1 or more)

[Three small boxes, each:] Phy/Vm — Node. — where kubernetes runs appl. Container. (Cluster)

to manage a cluster a specialized node called probable:[Master]

---

## Page 37

[Diagram:]

Cluster
└ CONTROL PLANE
   - Cloud Controller Manager → (arrow to cloud) Cloud provider API
   - ETCD (cylinder) ← kube-API Server (double-headed arrows between Cloud Controller Manager and kube-API Server)
   - kube-API Server (arrows in from Scheduler, Controller manager)
   - Scheduler → kube-API Server
   - Controller manager → kube-API Server

Node 1: kubelet, kube proxy → [dashed box: Pod, Pod, Pod] CRI
Node 2: kubelet, kube proxy → [dashed box: Pod] CRI
(Node 1 and Node 2 connect with arrows to kube-API Server)

---

## Page 38

(Workflow diagram)

[Diagram:]
Cluster.
- master API (circle) — labeled Api Server  ← Note (red arrow)
- master (API) → worker nodes: N, N, N
- worker node | woster node | woster node
(red note: Any worker Node can also be Selected as master)
(yellow note: Kubernetes agent (kubelet))
(white note: → machine that runs our appl. pods)

Components of Worker Node.

Kubelet : (arrow) communicates with control plane (master) → Ensure all pods/ Containers are running.

Container Runtime : Actually runs containers, eg containerd

Kube - proxy : provides kubernetes network & Service connectivity (Network rules). → Pod (CNI)

pods : Smallest deployable unit where Containers run.

---

## Page 39

Structure :
K8 Cluster.
→ Control Plane
→ Worker Nodes
   → Node 1
      →Pod : Frontend
         → Container
      →Pod : Backend
         → Container
      →Pod : Payment
         → Container
   → Node 2 → Pod → C
     (power)    (platform)    (Appl)
   → Node 3

Pod : Smallest deployable kubernetes unit that runs one or more Containers.
(Single Insstance of running process)

Components of Master Node.

API Server : provides an Interface (kubectl) CLI to use K8.

Schedular : Assign nodes to newly created Pods.

ETCD : Key - value store, having all cluster data; Config file, log file. stale.

Control Manager : responsible for managing [illegible]

---

## Page 40

II.2.3 Self Healing & Managing Container health.

Example: Worker Node 1: Pod₁→ Container

Worker Node 2: Pod₂ (goes offline)
Auto deploy ⊕ ↙
Worker Node 3: Pod₃ + Pod₂

Self-Healing in Kuberntes.

feature: autodetects failed or unhealthy pods ← takes corrective actions.

mainly done thru controllers : Deployment & Replica Set : Compare Desired vs Current State.

Problem. | Action :

Container Crash — Restarts the container

Pod fails — Create replacement pod.

Node becomes unavailable — Reschedule Pods on healthy nodes.

Application becomes unhealhty — Restart appl/ replace probable:[pod]

---

## Page 41

II.2.4 Replica Set, Deployment, Service

Replica Set : Ensures that a specified number of Identical pods are running at all times

Deployment : (D) Manages Replica Set and provides application updates and rollbacks

Handling Version Change :

Version 1 → nginx : 1.25   (D) ↘
Version 2 → nginex : 1.26   → creates new replica set
                                              ↙ gradually replace
                                    old ←
                                     pods

Service : provides stable network endpoint to access pod. , can also load balance traffic

Workflow :  Deployment
              ↓
                Replica Set
              [Pod 1, Pod 2 , Pod 3]
              ↓
                service ← probable:[Users]

---

## Page 42

StarNote (app logo, top right)

Git-Hub Fundamentals

StarNote (watermark, bottom right)

---

## Page 43

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

---

## Page 44

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

---

## Page 45

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

---

## Page 46

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

---

## Page 47

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

---

## Page 48

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

---

## Page 49

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

---

## Page 50

- gitignore : Explicitly tells git which files
should not be tracked or uploaded.
.env , .log .... etc files with secret info must never be pushed to remote repo.

git reset : moves head backward to undo commits, modify, rewriting commit

git revert : Creates a new commit that reverses a previous commit → No alter to history

git history : Views chronological record of project.

git stashing : Temporary shelving of uncommitted changes

---

## Page 51

(blank page)

---

## Page 52

NOTEBOOK
Jenkins - Devops
Sarthak Dutta
(watermark: StarNote)

---

## Page 53

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

---

## Page 54

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

---

## Page 55

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

---

## Page 56

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

---

## Page 57

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

---

## Page 58

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

---

## Page 59

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

---

## Page 60

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

---

## Page 61

Pg 10

9) Build : Single execution of a Job, Each 'run' gets a unique sequential number (#1, #2, #3....) and a Status:

Success [● ●], Failed [●], Unstable [●], Aborted [●].

Jenkins stores each build's logs artifacts, test results and metadata under

Jenkins_Home/jobs/<jobs>/builds/<number> with a provision to auto-delete via 'discard old builds'.

Workspace : Directory on the node (C&A) where Jenkins runs a job. It's where source code checked out, files are compiled & temporary build output is created.

• Default Path : /var/lib/Jenkins/workspace/<job-name>

• persists between the builds of Job unless we clean it. cmd: cleanWs() in a pipeline.

• Each job gets its own workspace and concurrent builds get separate ones.

---

## Page 62

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

---

## Page 63

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

---

## Page 64

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

---

## Page 65

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

---

## Page 66

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

---

## Page 67

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

---

## Page 68

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

---

## Page 69

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

---

## Page 70

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

---

## Page 71

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

---

## Page 72

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

---

## Page 73

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

---

## Page 74

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

---

## Page 75

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

---

## Page 76

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

---

## Page 77

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

---

## Page 78

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

---

## Page 79

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

---

## Page 80

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

---

## Page 81

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

---

## Page 82

31 (circled)

(page blank — ruled lines only)

---

## Page 83

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

---

## Page 84

Jenkins Credential Security Overview (33)

Credentials: Securely stores password tokens, SSH keys, Certificates.

Username/ password: Stores a username and password, commonly used for Git repositories, databases.

SSH keys: Stores an SSH private key for Secure authentication to Git Servers, linux machine.

Secret text: Stores a single secret value such as an API token, access token.

Secret file: Stores Sensitive file such as configuration file, etc

Credentials Binding: Makes credential available to a pipeline temporarily as env. variable ..... without exposing value.

---

## Page 85

RBAC (Role based Access Control). (34)

Assigns permission based on roles. Usually implemented using an authorization plugin

User & Permission: Controls who can log in and what they can do — view jobs, build, config, adminJister Jenkins

Agent Security: Protects Jenkins Agents by using Secure comms, proper permission and avoiding unnecessary access.
Securing Jenkins:
protecting the Jenkins Server, users, credentials, jobs & agents.

Authentication → Authorization →
update/backup → Secure Credentials →
HTTPS/TLS →
plugin/Agent/ Network Security →
CSRF → Audit & Monitoring → Least privilege

---

## Page 86

Controller & Agent

| No. | Schedule | Description (Time) |
|---|---|---|
| 1 | Controller vs Agent | 36 |
| 2 | Static Agent | 36 |
| 3 | Dynamic Agent | 37 |
| 4 | SSH Agent | 37 |
| 5 | Environment Conf. | 38 |
| 6 | Docker Agent | 38 |
| 7 | Distributed Agent Lifecy. | 39 |
| 8 | JNLP | 40 |
| 9 | | |
| 10 | | |
| 11 | | |
| 12 | | |
| 13 | | |
| 14 | | |
| 15 | | |
| 16 | | |
| 17 | | |
| 18 | | |
| 19 | | |
| 20 | | |
| 21 | | |
| 22 | | |
| 23 | | |
| 24 | | |
| 25 | | |

---

## Page 87

(1.) Controller vs Agent (36)

'Brain' of the operation.        |  'muscle' that performs task.

Manages Agents        |  Connects to the controller for Job.

Task: Hosts Jenkins web UI, stores config, schedules jobs, monitors agents and build results.        |  Executes a job when controller schedules it. Agent runs the code, compiles it, runs the test and sends the logs and final status back to Controller.

(2.) Static Agent

These are permanent machines (dedicated EC2, bare metal server.... etc) that are always on and always connected to the Jenkins controller

Feature:
- fast to start a job
- Always running
- Costs even when idle.

---

## Page 88

(3.) Dynamic Agents (37)

Spun-up on demand just before a build starts, destroyed immediately after the build finishes.

Jenkins —connect→ (Aws, Azure, kubernets) → req new machine
throws away after job is done ← runs the build

- Cost Effective, Clean and ideal for every build.

(4.) SSH Agent: controller to agent connection.

(Jc) → Remote Machine        [ • logs in wsih(?) cred
SSH                    • downloads
connection                 agent.jar ]
starts the process
* Common way to connect linux-based static agent.

Labels: A tag assigned to an Agent to describe its capabilities. Jc looks for available Agent with matching label and sends job there.

---

## Page 89

(5.) Environment Configuration: (38)

Agent Workspace: A Specific directory on Agent's hard-drive where build takes place. When job runs,

Jenkins —checkout→ Source code → Git → Workspace

[ create temporary files and compiles artifact.        (AGW) ]

(6.) When to use docker Agents:

- Installing Java, Node js, python and maven directly on Agent OS.

Instead Run:

Jenkins Agent runs pipeline inside Specific Docker Container

This guarantees build Environment always Same, no need to manage Software versions on the underlying host machine.

---

## Page 90

(7.) Distributed Agent lifecycle (39)

Controller (Jc)        Scheduler/UI        agent: any
    |
    | 1. Evaluate pipeline Context
    |    Usr → Build trigger
    |    JC → parses pipeline def and Job exec context
Static Agent        agent: linux        slot: 2
    | 2. Query static Node pool
    |    pipeline req worke(?)→ label 'linux'
    |    JC queries static Agents in Cluster pool.
Status: Busy (2/2)
    | 3. Enqueue
    |    → Reports both executor busy
    |    JC places task in build queue for: Dynamic Agent/ slot release.
Controller        agent: docker
    | 4. Dynamic level Route Match
    |    JC matches label fwrd to Configured Cloud Provider plugin
Controller + Cloud provider
    | 5. Cloud API provision Request
    |    JC —calls→ Cloud Provider (K8/Docker)
    |    Spawn Ephemeral Worker pod agent
Dynamic Pod + Controller
    | 6. Dynamic Pod Boots up → attaches to Jc via JNLP, executes Build
    |    Streams live Output; Self terminates.

---

## Page 91

(8.) (Java Network launch Protocol) JNLP (40)

way to connect Jenkins agent to Controller

Jenkins Agent —initiates/ JNLP→ JC.

useful when agent is behind firewall/ NAT
JC —✗→ Agent directly.

Working
- Jenkins creates an Agent (or registers)
- Agent Starts and gets information (connection)
- Agent initiates connection to JC.
- Once online JC sends build task. to agent.

---

## Page 92

MAVEN
Israfil

definition: Mauen is a build automation
and project management tool
mainly used for java projects

helps to compile code, manage
dependencies, run tests and
package applications.

.jar.  Multiple .class files bundled
together makes a .jar file.

Artifact: Artifact is a file produced by
software build process
    contains → compiled code
             → required resources
    needed to run or deploy the application.

Stored in
AWS CodeArtifact,
Artifactory,
Jfrog,
etc.

Source code ——build tool——→ Artifact.
              (Automates)

Notewise

---

## Page 93

dependencies
External libraries or packages
that an application needs to
work properly, provide
readymade functionalities
to work with instead of
writing everything from scratch

deployment workflow:
                               (testing requirements)
 Dev → UAT → production
(testing of
           new features
or code changes)                (approved
                                 & tested
                               for customer
                                  use).

Build tool.  task:
Automates:-
1. Downloading defenclencies
2. Comfiling source code
3. packaging
4. testing
5. documentation (DCPTDD)
6. deployment.

Eqs.  ANT, Mauen, Groalle.

Notewise

---

## Page 94

Input file.:   Input file for buildtool is a
configuration file which provides
necessary info about building
the project to the build tool.

        for mauen input file is
            〈pom.xml〉

pom.xml   must be present in base directory
of the buildtool, default input
file Mauen to build our
projects.

                          〈Contents〉
project root element
profesties.
defendencies
plugin
    goals
profile
version
mail list

                          〈Contents〉
Notewise

---

## Page 95

Types of pom

                          Super POM
Contains generic
configurations
and information
required by
multiple builds.
referenced
by other
poms.

pom
inherited
by another
pom
Shares
common
defendencies
config among
multiple
objects.

                          parent pom

Super POM ⇢ parent pom
Super POM → pom | pom | pom | pom | pom
parent pom ↓
(t ⇣ ⁞ ⁞ ⁞

  directly required
  by projects contains
  project Speafic

mauen
Combines info from
all to form a template

fact:
Mauen uses convention over
configuration, which means
developers are not required
to create build process themselves

Notewise

---

## Page 96

Project Object Model.

fundamental unit of work
in Mauen.

Contains info about: project
                              config
            used during build
            process.
                    config

Pom also contains goals and
plugins.
        → during executing
             task.

Pom.xml   has:

·  Project dependencies defined

·  Plugins             · build profile

·  goals.              · project version

·  mailing list

Min req:   project root
〈model version〉
〈group ID〉
〈artifact_ID〉} (GAV)
〈version〉

Notewise

---

## Page 97

Mauen lifecycle.
(Clean → Builtol → Site)

clean.     .java ——→ .class ——→ directory
                    recomfile ↗        del old

Sequence of phases run in
order. -o ↗

phase     Step in build ( 0 or more goals
  ↗       bound to it)

 bound
Goal      Actual task to be performed
          ↗ (t)
plugin ~) Collection of goals.

           mauen compile ↘
(pom) Local.
   ↘
   Search for plugin.
   ↘
(Super pom) → m-c-p {G/A/V}
      ↘
   phases & Goals (
   compile. task.

mauen
compile
plugin.

Notewise

---

## Page 98

Mauen lifecycle:

Validate    (check for correct
               configuration)
   ↓
Camplete    (code → .class.)
   ↓
test
   ↓
package     appl. → JAR, WAR.
   ↓
Verify
   ↓
Install     generated Astifact
               → .m2.
   ↓
deploy      uploads Astifact
               to remote repo.

Notewise

---

## Page 99

Plugin &
goal
relation
-ship

Plugin collection of tasks to be
performed by Maven
(compile, testing, packaging)

Goal however refers to any
single task provided by
plugin

Relationship:
→ Goals (performs specific task)
tool
toolbox → Plugin

hence we can say plugin = collection
of goals.

Version:
x.y.z → Build (minor)
↘ patch.
↳ Generation (major)

Version in maven is referred as
specific build / release of the
project or dependency
helps maven determine probable:[correct ver-]
of a[n] [rest obscured by watermark / cut off at page edge]

---

## Page 100

Settings.xml

Maven Configuration file used to
define settings that are not specific
to a single project.

Can contain

• repository configuration
• credentials for private repository
• proxy settings
• profile and environment specific
settings.

Pom.xml (details)
pom.xml
<contents>

A) project root element.

contains important project related
information, root element of every
maven file.

Syntax/Content

<project>
• <modelVersion>

---

## Page 101

• <groupID>
• <artifactId>
• <version>

• <dependencies>
• <build>
</project>

B) properties

used to declare/ define custom
variables values that can be
reused throughout pom.xml.

avoid repeatation, promotes
reusability

```
<properties>
   <property-name> value
        </property-name>
</>
${value.name} ......... use any
value.
```

---

## Page 102

C) Dependencies

The <dependencies> element is used
to define the external libraries
that a Maven project needs.

Maven automatically downloads
required dependencies from a
configured repo and adds them
to the project.

Syntax

```
<dependencies>
  <dependency>
     <groupId> </>
     <artifact> </>
     <version> </>
   </>
</>
```

Transitive dependency:

Transitive dependency → automatically
included
by Maven
because direct
dependency needs it.

---

## Page 103

Eq.

project need LibA → needs.
maven includes LibB

D) Plugins.

used to Configure Maven Plugins
that perform specific tasks
during the build process.

Plugins can compile code, run
tests, package application, generate
report.

Plugin + Goal
Plugin → Contains
goals → Goals
perform action.

```
<build>
   <plugins>
      <plugin>
         G
         A
         V
         <config>
            <source>
            <target>
         </config>
      </plugin>
      </>
```

---

## Page 104

G) Goals

Goals is a specific task or action
performed by Maven plugin

mvn <plugin-prefix>:<goal>

H) Profile: Set of Configuration
values that can be activated to
customise the maven build for
different environment or situation

profile → Dev
→ uat
→ prod
→ defined in <id> tag

Syntax:
```
<profiles>
   <profile> → profile name
      <id> p_name </id>

      <properties>
         values specific to
         that profile.
      </>
   </>
</>
```

---

## Page 105

How to run profile:

mvn compile -Pdev
mvn compile -Pdev,P₁,P₂,P₃.

multi-profiling: Yes we can activate multiple profile by separating their ID's with commas.

-Pdev,P₂,P₃ ......

GAV: GroupId + ArtifactId + Version.
(unique Maven Coord.) — Combination Maven uses to uniquely identify a project in a maven repository

1. GroupId: (owner) — groupId identifies the organisation, company. or group that owns the project.
2. ArtifactId: (unique identifier) — identifies the actual project/library name.
3. Version: identifies the specific release of that artifact

---

## Page 106

Eq. <groupId> com.example </>
      <artifactId> payment-service </>
      <version> 3.14.0 </>.

Case Study:

<dependency>
    <grpId>
        org.apache.commons.
    </>
    <artifactId>
        commons-lang3
    </>
    <version>
        3.14.0
    </>
</dependency>

Maven will compile it as:

org.apache.commons:commons-lang3: 3.14.0.

Structure:
Repository
 └ groupId
 └ artifact·Id
 └ version
 └ artifact file

---

## Page 107

Sample → pom.xml

Here is a simple sample pom.xml showing the important sections:

```
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">

  <!-- POM Model Version -->
  <modelVersion>4.0.0</modelVersion>

  <!-- GAV -->
  <groupId>com.example</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0.0</version>

  <!-- Packaging -->
  <packaging>jar</packaging>

  <!-- Project Properties -->
  <properties>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
  </properties>

  <!-- Dependencies -->
  <dependencies>

    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>5.10.0</version>
      <scope>test</scope>
    </dependency>

  </dependencies>

  <!-- Build Configuration -->
  <build>
    <plugins>

      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.11.0</version>
      </plugin>

    </plugins>
  </build>

</project>
```

Main parts to remember

Section Purpose

<modelVersion> Defines POM model version
<groupId> Identifies the organization/project
<artifactId> Name of the project/artifact
<version> Project version
<packaging> JAR, WAR, etc.
<properties> Stores project configuration/properties
<dependencies> Libraries required by the project
<build> Build configuration
<plugins> Tools that perform Maven build tasks

GAV = GroupId + ArtifactId + Version

```
com.example : my-app : 1.0.0
      ↑          ↑         ↑
    GroupId   ArtifactId Version
```

---

## Page 108

Maven Repository.

Storage location where maven keeps artifacts, maven uses this repos to find dependencies needed by project to store/download build artifacts.

(3 main types of)
local Repository    Central Repository    Remote Repository

local repository: Stores dependencies/artifacts on our own machine.

local repository is a folder on local machine where maven stores dependencies and artifact that it has downloaded or installed

Workflow:

Maven needs any artifact
  ↓ (checks.
  ↓
~/.m2/repo
  ↓ if not found
  ↓
downloads. it to .m2

---

## Page 109

Default location: ~/.m2/repository

local repository is used for:
• Caching downloaded dependencies
• Avoiding repeated downloads
• Storing artifacts, plugins
• Making builds faster.

Central Repo:

public repository over the INTERNET where most widely used dependencies, Java lib, maven artifacts are stored.

Used for:

• Downloading publicly available dependencies
• Getting open-source libraries

Remote repository:

Remote repo stores custom-modified artifacts generally company specific often are

---

## Page 110

private and not open to public (Internal Company Artifact)
Owned by company or Organisation.
Nexus / Jfrog / Artifactory.

Maven Archetype:

Instead of manually creating project template and directory

mvn archetype : generate

 → my-project/
 ├→ pom.xml
 ├→ src/
 │  ├→ main/
 │  │  ├→ java/
 │  ├→ test/
 │     ├→ java/

---

## Page 111

Title:

Terraform

(StarNote — app watermark in bottom right corner)

---

## Page 112

1. IAC

1. What is Infrastructure as Code.

Practice which enables developers and operations teams to provision and manage infrastructure through code & instruction rather than manually configuring the process.

a) Automation: ~
Iac allows to perform infrastructure tasks automatically via code.
- No manual interventions
- Less chances of error
- Rapid
- Streamlines repetitive tasks.
Eg. Using terraform to create EC2 instead of using AWS.

b) Declarative & Imperative ✓
- Below ↓ tell tool what to do and desired result
tool – configures and determines the neccessary stefs.
tell tool how to do it by specifying the commands or stefs to achieve the result.

(annotations: (1) on "commands", (2) on "stefs")

---

## Page 113

c) Version Control: ~
tracking changes made to code over time.
Supports rollback to older builds incase enconsistencies in code resulting in problem for newer builds.

d) Idempotence: ~

(1) Output of fixed configuration of code would produce exact same intended result.... (2) over and over again.

Eg. Trfm code configured to create x86 EC2 wont create Arm64 EC2
No manual Config mistake.

e) Consistancy: IaC creates identical environment with consistent configurations.

Refproducibility: recreation of envirn. is very easy using same code.

---

## Page 114

(2) Benifits of IaC:

✓ Speed and Efficiency without human intervention.

✓ Cost-effective : By automation.

✓ (**) Disaster Recovery : Recreation of environment is rapid in events of loss.

✓ Scalability: IaC can scale infra–automatically

(3) Practice : Terraform Code to provision EC2's.

- Configure Aws IAM Role (AwsEC2Full access)

- Attach to host EC2 .... Install terraform

- Mkdir terraform_cd .... write main.tf

- terraform init, plan, apply.

---

## Page 115

(4) Challenges :

→ Complexity in large-scale deployments: Managing large and complex infrastructure with IaC

→ (State Management:)

→ Security : Storing sensitive data exposed in codebase can be a security risk. Solution: using Vault.

---

## Page 116

II. Terraform.

1. What is terraform?

Terraform is an open source (1) Infrastructure as Code (IaC) tool created by hashiCorp. (2)

It allows us to define, provision, and manage (3) cloud resources using a declarative config language. ✓

How terraform work :

- Write : (terraform init); configuration file (.tf) and initialize working directory to download the necessary provider plugins. ✓ (creates environment)

- Plan : (terraform plan); previews changes it will make (create, update, destroy) without actually touching infrastructure

- Apply : (terraform apply); Terraform executes the planned changes, provision or updating resources in cloud env.

---

## Page 117

Terraform Vs Ansible:

Terraform infrastructure code tool — used to provision infrastructure via IaC

Ansible is infastructure configuration tool used to configure and customised infa - after being created. ✓

Aws (Cloud formation) = terraform

---

## Page 118

2. Provider :

(P) —interact→ API of external
                    Services ( Aws, Azure, GCP )
        (to) Create,                        ↗ Resources (in)
        update, destroy ┘

Syntax :

provider "aws" {
    region : "us-east-1"
    secret_key : "....."
    access_key : "....."
}

3. Resources : A resource in terraform represents a specific components of our infrashucture

It's defined by : resource block .

resource "aws_instance" "name" {
(block)     (parameter)     (nm)
    ami = " ami-0511 ..... " (img)
    instance_type = " t3.micro "
}

---

## Page 119

4. Attributes : Resource typically include
multiple attributes such as : (human config)

[Arguments]
a. ami 'holds the amie Id'
b. instance_type 'holds the type power
        resource would get'
c. tags 'Special key : value pair
        attached to resource'

(Input ⇒ Provider API ⇒ Set-up Infrastructure)
Arg → Data before creating
Computed → Data after creating (Cloud provider
        API Config)

[Computed]
provide metadata and details about
the resource that are obtained after
resource actually exists.
Eg. value = aws_eustance .web .public ip

5. State
• What is Terraform State ?

Terraform stale file ( terraform.tfstate )
used to keep track of resources that
terrafolm manages ! Stores metadata
about your infrasbructure in statefile .
4729

---

## Page 120

Crucial ensuring terraform understand the current state of infrastructure .

Important : -
a) State file (ensures)
            → terraform
                ↳ ( update, created or
   decisions     destroy )
        code → maps configuration
     real infrastructure

b) State Management :

By default State is locally stored in
<terraform.tfstate>
by for larger environments use :

S3 for Aws.

c) Remote State :

Storing Statefile remotely is beneficial for collaboration .

---

## Page 121

Terraform State In details :

main.tf ( Terraform Config )
||
    Store what we want to-do with
    our infrashucture
||
terraform.tfstate ( terraform State )
||
    store what terraform knows
    about our infrashucture .
Aws infrastructure
( resources running )

Use of State file :
• Resource tracking
• Change detection
• Collaborations.

Example on how stateworks .

main tf → [ Infra - Created . ] → tf state
                    State stored
    ↘ changed → terraform plan   / compares
                        shows what ←
                        changes terraform is going to apply
                        ( modified or replace )

---

## Page 122

State-locking

State locking : is a mechanism that prevents multiple - users modify the same state simultaneously ( No concurrent changes )

Problem : Operations may overlap, conflicting changes, mismatched configuration, leading to state inconsisteney

How terraform uses statelocking

• dev A : Starts Apply
  Terraform acquires lock → shared state

• dev B : tries to Apply → Operation
        awaits Completion (A) or runs into
        lock-related error
  lock is released ←
  once dev A's task is completed .

backend.tf                |  Commands :
terraform {               |    use_lockfile = true
    backend "s3" {        |
    bûckel = " "          |
    key = " "             |
    region = " "          |
    }                     |
}                         |

---

## Page 123

Scenarios :

---

## Page 124

6. Terraform Configuration files : (HCL)

✓ Provider Block : ( Specifies cloud provider )

    provider "aws" {
        region = " " }

• Resource Block : ( Defines what resource
    to manage )

    resource "aws_instance" "name" {
        ami = " "
        iustance type = " "
    }

✓ Variable block : allows →declare configs←    make configurations
dynamic and resuable

---

## Page 125

```
variable "instance_type" {
  default = "t3.micro"      (the "3" written below as an insertion)
```

- Output block:

Output values to console after running
terraform apply (output, apply underlined)

```
output "instance_ip" {
  value = aws_instance.example.public_ip.
```

- Data Sources:

Allows us to retrieve information
about existing infrastructure (highlighted)
can also be used in configuration.

7. Terraform Workflow:

- init : initializes working directory → Sets up environment
  downloads necessary provider plugins
  configures backend if using remote state.

---

## Page 126

- validate : • Syntax & Internal Consistency
  (invalid argument/ incorrect d-type) checking

  • Attribute & variable checks.
  • Isolated verification checks
  performed exclusively at
  local/ offline

- plan : Show preview of actions
  terraform is about to perform
  and output
  ( Create(Addition), modify(changes),
  remove (deletion) ).

- apply : Applies actions specified by
  the plan to the infrastructure

- destroy : Destroys infrastructure
  maintained by terraform. [Cleanup]

8. Variables:

variables in terraform provides versatility
and resuability while configuring

---

## Page 127

Syntax: variable "name" {
  description = " "
  default = " "
}

How to use : < var.name >

Ways to override variables :
> commandline : -var = "region = val"
> terraform.tfvars file.

9. Modules :

Collection of Terraform configuration files
grouped together to create and
manage AWS resources

Examples:— 5 EC2 instances with same
            configuration
   ↳ (curved arrow down to next line)
Create 1 EC2, reuse it 5 times

• Reusability
• Organization
• Consistency
• Easy Maintenance:

---

## Page 128

Structure of Module:

Folder: (local)
  ↳ main.tf
  ↳ variables.tf
  ↳ outputs.tf

(Remote terraform registry)
```
module "vpc" {
  source = "./module/vpc"
  cidr_block = " "
}
```

1. Root Module : Main directory where
   init , apply are called. It calls other
   modules when required

2. Child Module : Module which is called
   by the root, contains resuable configs
   EC2, 53, or VPC.

3. Published or external module :
   resuable module obtained from terraform
   registry.

(Note:)
Avoid Storing sensitive information
directly in terraform files.

Good practice to use Services like
AWS Secret Manager, HasiCorp Vault
or terraform cloud to securely manage
Secrets.

---

## Page 129

10. Provisioners & Lifecycle:

Provisioners: allows you to execute
scripts or commands on resource after
they have been created

• Types of provisioners:

  - remote-exec: Executes commands
    over SSH

  - local-exec: Executes commands
    locally

lifecycle:

• prevent_destroy : Prevent accidental
  destruction of resource.

• ignore_changes : Ignore changes to
  certain attributes of resource.

---

## Page 130

11. Terraform – Interpolation:

Interpolation in Terraform → inserting the
value of a [variable, resource attribute,
or expression into a string or configuration

Helps to use dynamic values instead of
using fixed / hardcaded Values.

Old Syntax: ${ var.instance_name}
New Syntax : var.instance_name .
Example

```
resource "aws-default-vpc" default {
  (id:)
}
```
        ↓ (arrow down)
```
resource "aws-Security-group" my-SG {
  vpc_id = aws_default-vpc.default.id
```
   (curved arrows from "default" block down to "vpc_id" line, and to the circled "id")

........ dynamic value binding.

---

## Page 131

(blank page — no writing, only ruled lines)

---

## Page 132

(Page 1 — Parts A–F)

## Splunk Fundamentals

What is Splunk and why do we need it?

Splunk is a tool that is used to collect, search, monitor, analyze and visualize machine generated data.

probable:[It is a] critical tool for DevOps.
- troubleshooting
- Security Monitoring
- Operational Intelligence

Machine data :-
logs generated by Applications, servers, databases, etc.

why → logs are complex to understand, unstructured in format, difficult to analyze.

Machine data — Splunk → human readable data

### Components of Splunk:-
- forwarders → Collect data
    ↳ fwd oth Splunk instance.
- Indexers → Used as data Storage
- Search heads → Analyze, Visualize [word(s) cut at slice boundary] report.

## Splunk Architecture

Splunk pipeline relies on 3 main components.....

forwarders : Collects raw data from endpoints
(UF) universal forwarder → lightweight agent that collects data and ships data.
(HF) heavy forwarder → can parse and route data before sending it.
Indexer : Receives data, parses it → events, writes it to disk (indexes) for storage.
Search head : Web UI where users write queries. It sends search req → Indexers, merges results.

### Splunk diagram
            Business Matrix
failure cond. →  Splunk  → Search & Investigate
System performance →   → Data Visualisation
            storing data

Data Indexes ——→ Users.
    ↳ Search processing languages

## Why use Splunk as devops Engineer

Use case 1: Troubleshooting from server logs
Use case 2: Monitoring Infra / Appl behavior
3: Error detection.
4: Incident Investigation by analyzing events.
5: Performance analysis.
6: Alerting when something goes wrong.
7: Security → Investigate Suspicious activity.

## Devofs troubleshooting workflow.

Incident Occurs.
 ↘ Generates
    ↯ an Event. → Splunk → Cause. → Investigate using time & correlation.

1. Identify the Spike:
        timechart → obs. → when errors started.
        Eg. index = web status = 5* | timechart count Span = 5m

2. Isolate Source : Group / Aggregate errors
        Server, Container, Endpoint ↯ check
         ↯ (probable:[not]) causing error.
        Eg. index = web status = 5* | stats count by host, url | sort - count

3. Correlate by time :
        pinpoint failing endpoint. / Specific timestamps
        ↳ Search for host / transaction_Td [word cut at slice boundary] to find out probable:[root] cause of underlying [red: errors.]

### Easy breakdown of Code:

index = web → tells Splunk to Search inside bucket named "web"
status = 5* → look for event where status code begins with 5* wildcard (501, 502, ....)
stats count by → group by Specific categories
probable:[timechart] count Span = 5m → groups data into chunks of time

## Search Processing language (SPL)

SPL is the language used to Search and analyze splunk 1 data.

Pipe character : (|) → pass the result of one command to the next command.

### Essential Commands:
Base : index & _time
fields : Keep or remove field to speed up search.
stats : Calculates aggregate statistics.
timechart : Creates timeseries req. _time.
eval : Calculates or creates new fields.
dedup: Remove duplicate events based on a field.
table : formats data into clean grid. (Results)

## Data Onboarding & Parsing

'Holy Trinity' of parsing
- inputs.conf (Tells Splunk where to listen for data) ↳ source
- props.conf (Defines how to handle data format) ↳ configure rules
- transforms.conf (Handles complex data routing and masking) ↳ helps to drop useless events, Sensitive info.

## Data lifecycle: (Buckets)

Indexers → flat files → directories called (Bucket)

        Events (blue squares falling in)
          ↓ bucket is filled
        Hot — 'Actively' being written and heavily searched.
              Cost/performance: fastest/most expensive NVMe/SSD
        Warm — Highly Searched but read only,
              C/P: fast storage (SSD) Expensive
              (blue arrow: out of space)
        — out of Volume →
        Cold — Stores Aged data, can be queried but takes long time
              C/P: cheaper / high capacity HDD
        Frozen (Explicit user action) — Data at retention limit, deleted or archived.
              Not searchable.
              C/P: offline Storage S3, glacier.... tape. cheapest.
        Thawed — moved by an Admin to perform historical searching or auditing.
              C/P: Restored to fast storage temfporarily (SSD)

## Data Ingestion : (How logs enter Splunk ecosystem)

✳ Universal forwarders — Installed · Application / Web Servers · to monitor
   local log files { stream → Splunk.

- HTTP Event Collector (HEC) (allows)
        token → Endpoint → JSON Logs (POST) → Splunk
        fast · Docker Container · Serverless func.
        [orange: No need of local Agent]

- Syslog: Network device (UDP/TCP) → Central Syslog Server (UF ✳)

---


---

**Extent:** 132 shelf pages across 7 notebook(s).
Transcription date: October 2026.
