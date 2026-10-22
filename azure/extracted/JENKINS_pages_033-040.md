# JENKINS.pdf — Pages 33–40

## Page 33

Jenkins Credential Security Overview (33)

Credentials: Securely stores password tokens, SSH keys, Certificates.

Username/ password: Stores a username and password, commonly used for Git repositories, databases.

SSH keys: Stores an SSH private key for Secure authentication to Git Servers, linux machine.

Secret text: Stores a single secret value such as an API token, access token.

Secret file: Stores Sensitive file such as configuration file, etc

Credentials Binding: Makes credential available to a pipeline temporarily as env. variable ..... without exposing value.

## Page 34

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

## Page 35

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

## Page 36

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

## Page 37

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

## Page 38

(5.) Environment Configuration: (38)

Agent Workspace: A Specific directory on Agent's hard-drive where build takes place. When job runs,

Jenkins —checkout→ Source code → Git → Workspace

[ create temporary files and compiles artifact.        (AGW) ]

(6.) When to use docker Agents:

- Installing Java, Node js, python and maven directly on Agent OS.

Instead Run:

Jenkins Agent runs pipeline inside Specific Docker Container

This guarantees build Environment always Same, no need to manage Software versions on the underlying host machine.

## Page 39

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

## Page 40

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
