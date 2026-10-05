# Pavan Notes — Full Transcription

**Source:** `pawan_notes.pdf` — 82 pages, handwritten study notes, spiral-bound notebook
**Scan produced by:** Adobe Scan for Android (image-only PDF, no text layer)
**Transcription date:** 30 September 2026

---

## About this document

This is a **faithful transcription** of every page of the notebook. It is not a summary,
not a rewrite, and not a correction.

**What is preserved exactly as written:**
- Original spelling and capitalisation of every word (`Classless Inter - Domain Routing`,
  `chearty`, `MACI address`, `MPs`, `TCP & OST`, `Parcmiko`, `MAithtains`)
- Grammatical errors, incomplete sentences and dangling fragments
- Wrong facts, wrong formulas and broken code — reproduced, **not fixed**
- Struck-through text (rendered with `~~strikethrough~~`)
- Non-English content — the Devanagari margin note on page 2
- Page-level defects — the clipped right edge of page 81, the blank page 31

**Notation used:**
| Marker | Meaning |
|---|---|
| `## Page N` | Page heading in the source notebook |
| `### / ####` | The student's own underlined topic headings, at their written level |
| `> ` | Marginalia, side notes, dates, roll numbers |
| `~~text~~` | Text the student crossed out |
| `[illegible]` | Could not be read with confidence |
| `[?]` | Read with uncertainty |
| `[clipped at page edge]` | Text physically lost in the scan |
| `[sentence/bullet unfinished in notes]` | Student stopped mid-thought |

**Known physical defects in the source:**
- **Page 31** — blank in the scan.
- **Page 81** — right edge physically clipped; two lines are cut off mid-word.
- **Page 74** — the multi-head-attention sentence is abandoned at the page bottom.
- **Page 82** — the final bullet ends on the single word `With`, ~60% of the page empty.
- **Page 6** — the numeral written before `VMs` is ambiguous between `2` and `x`.

---

## Contents

| Pages | Subject |
|---|---|
| 1–14 | HTTP/HTTPS, OSI, hub/switch/router, subnetting & CIDR, DHCP, TCP/UDP, DNS |
| 6–11 | *(interleaved)* Windows Server, Linux admin, Bash, computer architecture, GitHub |
| 15–28 | DNS lookup/caching, IPv4 private ranges, AD-DS, VPN, subnetting worked example, Cloud, Azure |
| 29–42 | Azure security/monitoring/pricing/storage, AWS architecture, databases & normalization |
| 43–56 | Oracle DBA, CIA triad & attacks, encryption, scripting, REST APIs, IaC/Terraform |
| 57–70 | Terraform in depth, Prompt Engineering |
| 71–82 | RAG, AI timeline, embeddings, transformers & attention, LangChain/LangGraph, vector databases |

---
## Page 1

### HTTP :-

- It operates on port `80` by default.
- Plain text, unencrypted.
- Still used for non-sensitive websites (no security Concern).

#### Advantages:-

- Simple, Fast (Speed), Compatibility

### HTTPS:-

- Operates on `443`
- Uses SSL/TLS for encryption
- Attackers can capture traffic, but can't read message.

#### Advantages:-

- Data Encryption, User Trust, SEO Benefits.
- No data tampering, Supports HTTP/2

## Page 2

### HTTPS over HTTP:-

> Margin note (handwritten in Devanagari/Hindi, top-right of page): `३ घंटे पढ़ाई`
> (transliteration: "3 ghante padhai" — "3 hours of study")

- Data security • User Trust • Protection from Hackers
- Better Search Engine Ranking
- Compliance with Standards • Improved Performance.

### TCP & OST

### OSI Model :-

#### Physical layer :-

- Bit Control
- Transmission mode
- Converts data into Signals

## Page 3

### Hub :-

- Works at the physical layer of OSI model.
- Used to setup LAN
- Has multiple ports
- Star topology.

#### Pros:

- cheaper than switches
- works good for small networks

#### Cons

- Issues with broadcast
- No memory
- Runs in half duplex

### Switch:-

- Unlike hub, Switch has memory
- Stores MACI address
- Layer 2 device. (Data Link Layer)
- It can perform unicasting, multicasting and broadcasting.
- It stores MAC Address and interface port.
- Full duplex and more efficient with security

## Page 4

### Router:

- Router is a networking device that forwards data packets between Computer networks.
- A router is Connected to atleast two networks, LANs / WANs and its ISP network
- It is layer 3 device (Network Layer)
- Stores routing table.
- Decisions are taken based on IP address
- Full duplex, LAN, WAN and MAN

### Linux Commands:-

```
pwd, ls, cd, .., mkdir, touch, clear.
```

### Subnetting and CIDR :-

- A network has 2 parts, network part and host part names the main group and host part are specific '' phone or computer.

Subnetting Takes bits from the host part and turns them into network bits. Basically splitting big group into smaller working groups.

## Page 5

### Classless Inter - Domain Routing (CIDR):-

- It replaces old and Classful Subnet masks like `255.255.255.0` with a Short Slash number like `/24`.

### DHCP:-

- Assigns IP automatically
- Provides Subnet masks and Configures the default gateway for communication.
- Supplies DNS Server addresses
- Gives IP from an address pool and the Settings are delivered as options for a fixed lease time.
- Windows Data Center, Server Manager, Powershell, Windows DataCenter Core ADDS, Linux ~~All~~

## Page 6

### Windows Data center & Server:-

- Server 2019 is a versatile operating system bridging on environments with Azure Services,
    - Enhanced Security
    - Hyper Converged Infrastructure.
- Server 2022 is built on strong foundations of 2019 with Azure hybrid integration, Windows Server 2022 | Data center and Azure Edition, Virtual Machines (VMs).
    - Standard Edition
        - 2 VMs, Storage Replica : 1
        - Basic Security features
        - Small to medium
    - Datacenter Edition
        - Unlimited VMs
        - SDN: (Software defined Networking)
        - 2 Storage Replica
        - Enhanced security
        - Hyper-V (server role)

> Sep 18, '24

## Page 7

### Alt + F2 + Ctrl

- ⇒ terminal in redhat
- ⇒ username & password.
- `ip a`
- ⇒ get ip address
- ⇒ enter in PUTY terminal
    - y enter username & pw
        - `root`
        - `root.123`
    - `192.168.159.123`

```
Cat, sort, uniq, | (pipe), grep, sed
```

- Sort `deserts.txt` | `uniq`

### Computer Architecture :-

- CPU
- RAM
- Rom
- Cache memory.
- virtual Memory
- Multiprocessing
- Multi threading

## Page 8

```
                       OS
                    /       \
               Kernel       Shell

            Kernel
          /    |     \
 Monolithic Microkernel  Hybrid
 Kernel.                 Microkernel.
```

#### Two modes:

- kernel mode
- User mode

```
User
 ↓
Shell/Bash
 ↓
Kernel
```

#### Linux

- Debian
- Ubuntu
- Linux mint
- RHEL
- Fedora
- Arch.

- `/bin` - `ls`, `cp`, `mkdir`
- `/sbin` - administrative tasks `ifconfig`, `reboot`
- `/etc` - Configuration files `/etc/passwd`, `/etc/fstab`
- `/home` - `/home/alice`, `/home/bob`
- `/root` - Home directory for root (superuser)
- `/usr` - user programs, libraries, doc (`/usr/bin`, `/usr/lib`)

## Page 9

### Users and Groups

- Admin & Root): `UID = GID = 0`
- System user: `UID` and `GID` is assigned from `1` to `999`
- Normal user: `UID` and `GID` is assigned from `1000` or greater

### Commands: chmod 777 file, chown

```
- Sudo   useradd, groupadd, userdel, usermod, chgrp.
- sudo   -i
- groupadd  marketing -team  -f
- cat     /etc/group
- groups james.
- Sudo   passwd root
- Service  --status -all
```

Linux hardening makes a linux System more [trut-] Secure. It involves changing settings and removing things that attackers could use to break in. This includes strong passwords, limiting who can use powerful commands, keeping software updated and turning off features you don't need.

## Page 10

- `man ls`, `info ls`
- `gzip`, `bzip2`, `XZ` `*.bz2`

### Zip & tar

- `zip <archive>.zip` / `unzip -R folder`
- `tar -cf <name>.tar  file1  file2`
- `tar -xf <name>.tar`
- `tar -cjf riddles.tar.bz2 riddles`
- `tar -cJf riddles.tar.xz riddles`
- Curl, wget, ping, host, ifconfig.

### Bash:

```bash
#!/bin/bash
phrase = "Hello"
Count = 1             while [
if [ Count -eq 17
then                 -eq
   echo $phrase       -ne
else                 -le, -lt
   echo "Get out"     -ge, -gt
fi                   -z, !=, -=
```

```
alias greet3= './script.sh 3'
```

## Page 11

- Bash Scripts Can execute any terminal command and script.

### Github:

- Repos, Readme, MPs, LICENSE, CODE-of-CONDUCT

### Open Source:

- Improving your Coding skills
- Better Communicator and Collaborator
- Job : Searching and Career.

## Page 12

### TCP (Transmission Control Protocol):

- `HTTP`, `HTTPS`, `FTP`, `SMTP` — byte stream
- Connection-oriented protocol
- Reliable and ordered data delivery
- Higher overhead but high accuracy.

### UDP (User Datagram Protocol)

- `DNS`, `DHCP/VoIP`, Streaming — Independent messages
- Fast, Connectionless and lightweight
- No reliability and guarantee of delivery of order
- Low overhead and high speed.

### DNS (Domain Name System):

#### Working:

- User input

```
User input
   ↓
Local Cache check
   ↓
DNS Resolver Query
   ↓
Root server Query
   ↓
TLD Server Response  →  Authoritative Server Response (Actual IP)  ↑  Final Response
```

## Page 13

### Structure of DNS:

- Root:
    - Topmost level of DNS hierachy represented by .dot, starting point of domain resolution.
- TLDs:
    - Includes .com, .org, .net, .edu, helps Categorize domains by purpose or region.
- Second-level domains:
    - Appears before TLD (example in example.com)
    - Uniquely identifies a domain under a TLD.
- Subdomains:
    - Extensions of the main domain used for organization like WWW, mail, blog
- Hostnames:
    - Identifies specific servers or devices within a domain: like web1, mail server, ftp
    - Maps to actual IP address using DNS records.

## Page 14

### Types of domains:

1. Generic Domains (gTLDs)
    - general purpose use like `.com`, `.org`, `.net`
    - Used for Commercial, organizational and educational purposes.
2. Country code Domains (ccTLDs)
    - To specific countries like `.in` (India), `.us` (USA), `.uk` (UK), `.jp` (Japan).
3. Reverse DNS:
    - These domains are used to map IP addresses back to domain names, PTR records

### Domain Name Server:

- Stores DNS records and resolves domain names into IP addresses.
- Stores DNS records such as A, AAAA, MX, CNAME, NS and PTR.
## Page 15

> Margin note: 440

### DNS Lookup:

- DNS Resolver: Initiates the DNS query from Client Side
- Forwards it to DNS Servers to get the IP address.
- Recurisve Query: A query where the resolver fetches the Complete answer on behalf of the Client.
    - Performs full lookup across multiple DNS Servers if needed.
- Iterative Query: A query where the server provides the best information it has or referral
- Non-recursive Query: A query where the answer is already available in cache or authoritative Server.

## Page 16

### DNS Caching:

Temporarly storing DNS recods to reduce repeated queries and improve resolution efficency.

### TTL (Time -to- Live).

TTL defines the duration for which a DNS record is Considered valid in cache.

- A: IPv4
- CNAME: alias one domain to another domain
- Mx: Mail Server
- TXT: Text information

### IPv4 Private Ranges:

- ClassA (`NHHH`): 1 to 126 (127 Setback)
    - `10.255.255.255`
- ClassB (`NNHH`): 128 to 191
    - `172.16.255.255`
- class C (`NNNH`): 192 to 223
    - `192.168.0.0`
    - `192.168.0.255`

## Page 17

> Date: 31/

> Margin note: `10.000`, `172.16.0.0` ~~to~~, `192-168.0.0`

### AD - DS

Active Directory Domain Services is Microsoft's foundational on-premises directory service that acts as the Central hub for managing users, Computers, and peripheral devices on an organization's network.

Running as a Server role on ~~Windows~~ Server, its primary function is Identity and Access Management (IAM) verifying who a user is (authentication) and Controlling what data or resources they are allowed to access (authorization).

#### Key functions:

- Centralized Authentication & Authorization
- Hierarchical Resource Management.
- High availability & Replication

- Class A : `10.0.0.0` to `10.255.255.255`
- class B : `172.16.0.0` to `172.31.255.255`
- Class C: `192.168.0.0` to `192.168.255.255`

## Page 18

### VPN (Virtual Private Network):

- point to point tunelling
- Encapsulation.

### Express route

Dedicated connection with high speed (Gbps)

VPN is a security tool that establishes a protected, encrypted connection between your device and the internet.

```text
You  ->  VPN client ~~~~~~~~~>  VPN server
                                      |
                                      v
                                   Internet
```

- Data Encryption
    - Tunneling
- IP Masking
- Destination
- Public Wi-Fi security
    - Location Spoofing
- Bypassing Censorship
- Data Privacy.

## Page 19

### Tunneling Protocols:

1. Wireguard
2. Open VPN
3. IPsec

### Encapsulation methods:

1. IP in IP (IPsec, GRE)
2. Ethernet -over-IP (L2TP, SSTP)
3. UDP/TCP Session (Wireguard, Open VPN).

### Class C

```text
192.168.15.0/24
```

- 24 bits = network bits
    - > Margin note: `NWHH`
- 8 bits = host bits

```text
2^8 = 256 hosts
Valid hosts = 256 -2 = 254
```

#### Divide into IP subnets = Making host bits as network bits

```text
2^n equal to or greater than N
h = number of bits to convert from host to network bits
N = number of subnets required
```

## Page 20

```text
2^n = 4
2^2 = 4
h = 2
```

> Margin notes: `1-126`, `128-191`, `192-223`, `224-239`, `240-255`

Total network bits = `24 + 2 = 26`

to get Custom Subnet mask, make all 26 bits as 1 from left to right.

```text
11111111. 11111111. 14111111. 11000000
   to binary
255.255.255.192
```

Block size in 4th octet = `256-192 = 64p`

`IPs = 0.64,128,192`

```text
192.168.15.0/26
192.168.15.64/26
192.168.15.128/26
192.168.15.192/26
```

#### Calculate first valid IP, last valid IP, broadcast

```text
192.168.15.00000000  -> 192.168.15.0   -> network ID
192.168.15.00000001  -> 192.168.15.1   -> 1st valid
192.168.15.00111110  -> 192.168.15.62  -> last valid
```

## Page 21

```text
192.168.15.00 111111  -> 192.168.15.63 -> broadcast
```

### Remote Desktop Protocol, SSH

- (Windows)
- (Linux)

### Azure AD, Entra ID.

Express routes lets you extend your on-premises networks into Microsoft Cloud Services over a secure, private connection via connectivity provider rather than Crossing public internet. It uses dynamic Border Gateway Protocol (BGP) routing to exchange route prefixes between your local infrastructure and Azure.

#### Key benefits:

- No public Internet
- High speed
- Steady performance.

* Simplex
* Half duplex
* Full duplex

## Page 22

### Cloud Fundamentals

Renting Computing resources (Servers, storage, etc...) over the internet instead of owning physical hardware.

### Key characteristics of Cloud:

- On demand Self Service
- Broad Network Access
- Resource Pooling
- Rapid Elasticity
- Measured Service
- High Availability
- Global Reach
- Integrated Devops Tools

## Page 23

### Benefits of cloud Adoption:

- Scalability - (Vertical, Horizontal) Capacity to grow
- Elasticity - Scalability on real-time demand
- Reliability - Redundancy across data Centers
- Cost optimization - CapEx to OpEx

### Cloud Service Models (IaaS/PaaS/SaaS)

#### Iaas (Infrastructure as a Service):

| Manage: | Provides: | Examples: |
| --- | --- | --- |
| OS, middleware, applications and data | Physical hardware, data Centers, Servers and virtualization | Google Compute Engine, Amazon EC2, Microsoft Azure Virtual Machine |

#### Platform as a Service (PaaS):

PaaS offers a ready to use cloud environment designed for developers to build, test and run applications.

## Page 24

| Manage: | Provides: | Example: |
| --- | --- | --- |
| Custom application code and data. | Servers, operating Systems, databases and development tools. | Google App Engine, AWS Elastic Beanstalk |

### Software as a Service (Saas):

It delivers fully developed, ready to use Software applications accessed over the Web!

| Manage: | Provides: | Example: |
| --- | --- | --- |
| Just your user account | Everything from the account application code to the Security | Salesforce, Microsoft 365, Google Workspace. |

## Page 25

### Types of cloud:

1. Public Cloud: CSP own and operate data Centers, multiple Customers (Tenants) share the same physical infrastructure
2. Private Cloud: Infrastructure dedicated to a single organization.
3. Hybrid Cloud: Combines both. Connected via VPN or Azure Express Route.

### Shared Responsibility Model:

The responsibility split moves like a sliding scale as you go from `Iaas → PaaS → SaaS`

- Always Azure's Job: physical data center, security, physical network, hardware.
- Always your Job: your data, your access/identity management and end point devices.

## Page 26

### * CORE Azure Services:

1) Compute - VMs, App Services, Containers, Functions.

    full control to zero management.

    - VMs (Iaas)
    - App Services (PaaS for hosting web apps/APIs)
    - Containers (ACR/AKs)
    - functions (Serverless)

2) Networking

    > Margin note: VM Scale Sets

    - Virtual Networks (VNets) — private isolated network
    - Load Balancers (Distributing incoming traffic)
    - VPN Gateway (encrypted tunnel over internet)
    - Express Route (a private dedicated physical connection).
    - Azure Front Door, Azure DNS

3) Storage

    - Blob storage (images, videos, backups/logs)
    - File storage (file stores by SMB protocol).
    - Queue storage (Decoupling producer and consumer)
    - Disk storage (HDD, SSD)

## Page 27

4) Databases:

- Azure SQL Database (fully managed SQL database with ACID transactions).
- Cosmos DB (globally distributed, multi-model NoSQL database).

5) Identity:

- Azure Active Directory (Microsoft Entra ID) (Authentication)
- Role Based Access Control (Authorization)

### * Azure Architecture & Infrastructure

1) Regions:

- Regions (Central India, East US)
- Availability Zones (Physical datacenters within a region)
- Resource Groups (All the resources for a project)

## Page 28

2) Subscriptions and Management Groups:

- Subscription (billing and access)
- Management Groups (Grouping all subscriptions under one management group)

```text
Management Group -> Subscription -> Resource
                     Resource  <- Groups
```

3) Resource Manager (ARM) Concepts:

- Azure Resource Manager (ARM)
- ARM templates (Json files define Iaas)
- Idempotency (deploying twice produces Same not duplicates).

### * Security, Privacy, Compliance and Trust:

1) Azure Security Center / Microsoft Defender:

Unified security management system that assesses your azure resources, give you a Secure Score.
## Page 29

> __/__/___

- Cloud Security Posture Management (`CSPM`)
    - (Scans for weaknesses)
- Cloud Workflow Protection (`CWP`). (detects active threats on running resources)

### 2) Network Security Groups (NSGs):

A virtual firewall that filters inbound / outbound traffic to resources within a VNet, using allow / deny rules based on IP, port and protocol.

### 3) Compliance Offerings (ISO, GDPR, HIPAA)

- `ISO 27001` (information security management)
- `GDPR` (data privacy, protection of personal data)
- `HIPAA` (protecting health information)

### 4) Azure Governance Tools

- Azure Policy
- Azure Blueprints (`ARM` templates without manual assignment).

## Page 30

> __/__/___

### Azure - pricing, SLA

- Pricing Calculator.
- `TCO` (Total cost of Ownership) Calculator
- Service Level Agreements (SLAs)
- Cost Management and Budgeting

#### Lifecycle of Azure Services:?

- private preview (early access)
- Public preview (open, no SLA)
- General Availability (backed by SLA for prod)
- Depreciation (end of life date)

### Azure Monitor, Log Analytics, Application Insights

Azure monitor. (metrics + logs)

- Log Analytics (Query engine (`KQL`)).
- Application Insights (`APM`)

- Service ~~Health~~, Azure Advisor
    - Health

## Page 31

*(This page is blank in the scan.)*

## Page 32

### 3) Storage:

- `S3` (Simple storage Service)
- `EBS` (Elastic Block Store) (Disk)
- Elastic File System (`EFS`)
- Glacier (low cost storage for archiving data you rarely acess)

### 4) Databases:

- `RDS` (Relational Database Service)
- DynamoDB (NoSQL)
- Aurora (Aws own high performance engine compatible with MySQL, PostgreSQL)

### 5) Identity & Access

- `IAM` (Identity and Access Management)
- Policies (Json documents for permissions)
- `MFA` (multi factor Authentication)

## Page 33

> __/__/___

### AWS Architecture & Infrastructure

1. Resource & Hierarchy
    - ~~Account~~
    - `AWS Account` (All resources one account)
    - `AWS organizations` (multiple accounts under one umbrella)
    - Organizational Units (`OUs`) (grouping accounts with organization to apply different policies).

2. High Availability & Fault Tolerance Design
    - High Availability (spreading resources across multiple Availability zones within a region)
    - Fault Tolerance (Redundancy at every layer, zero disruption even during a failure).

3. Elasticity & Scalability
    - Scalability (`Auto Scaling groups`)
    - Elasticity (expand / shrink down)
    - Vertical vs Horizontal Scaling (AWS strongly favors horizontal scaling via `ASG` + `ELB` for production workloads)

## Page 34

> __/__/___

### Security & Compliance

1. AWS shared Responsibility Model
    - Aws job (data centers, hardware)
    - Your job (depends on the Service type, network controls, `IAM` configuration)

2. IAM best practices
    - Principle of least privilege (grant only what's needed)
    - Never use the ~~root~~ account for daily tasks/
    - Use roles instead of long-lived access keys
    - Enable `MFA`
    - Rotate credentials regularly

3. Security Groups & NACLs (Access Control List)

| Security Groups | Network ACL |
| --- | --- |
| Instance level | Subnet level |
| Stateful | Stateless |
| Allow rules only | Allow and deny rules |
| All rules evaluated together | Rules evaluated in order |

## Page 35

> __/__/___

### Pricing & Support

1. Pricing philosophy
    - On-demand (pay-as-you-go)
    - Reserved Instances (High discount)
    - Spot Instances (bidding on unused spare compute)
    - Savings Plans (Similar to RIs but more flexible)

2. Aws pricing Calculate
    - Pricing Calculator
    - `TCO` (Total Cost of ownership)

3. SLA
    - `S3` Standard (`99.99%`)
    - `EC2` - `99.9%`. (multiple `AZs`)
    - Single (`Az` deployments)

4. Support plans
    - Basic (Free, no tech support)
    - Developer (low fee, email support)
    - Business (% of usage, faster response)
    - Enterprise (% of usage, dedicated support with fastest response)

## Page 36

> __/__/___

### Monitoring & Management

1. Cloud watch
    - Metrics
    - Logs
    - Alarms

2. Cloud Trail
    - Auditing (who did what, when and from where)
    - Governance

3. Trusted Advisor (Cost, Security, Performance Recommendations)

#### VPC Peering

Connects two separate Virtual Private Clouds, so resources can talk to each other using internal private IP addresses without going over the public internet

## Page 37

> __/__/___

### Databases

#### DBA:

Database is Structured Collection of data.

#### ACID properties

- Atomicity (All or Nothing)
- Consistency (Valid state to Valid state)
- Isolation (Transactions don't interfere)
- Durability (Permanent once Committed)

#### Types of databases:

1. Relational
    - Uses `SQL`
    - `MySQL`, `PostgreSQL`

2. NoSQL
    - Unstructured / semi structured
    - key-pair, graph databases, column, document
    - Object oriented, Network database (child with multiple parents), Hierachical (Tree)
    - Cloud, Centralized databases.

## Page 38

> __/__/___

### Datatypes

- `VARCHAR2`, `NVARCHAR,`
- `NUMBER`, `INT, DECIMAL, NUMERIC(p,s)`
- Binary - float
- Binary - double

#### Constraints :

- `UNIQUE`, `NOTNULL`
- `PRIMARY KEY`, `FOREIGN KEY`
- `DEFAULT`, `CHECK`

### DDL (Data Definition Language)

- `Create`, `Alter`, `Truncate`, `Drop`

### DML (Data Manipulation Language)

- `Insert`, `Update`, `Delete`.

### DCL (Data Control Language)

- `Grant`, `Revoke` (To, From/In)

## Page 39

> __/__/___

### TCL (Transaction Control Language)

- `Commit`, `Savepoint`, `Rollback`.

### Normalization :

It is the process of structuring data in a database.

1. `1NF`:
    - Atomicity (Single Attribute)

2. `2NF`:

Prime / key attributes : attributes of relation which exist in at least one of the possible candidate keys.

Non prime: doesn't exist in any of the possible candidate keys

The table shall not possess partial dependency

```
PA --> NPA (X,Y)
```

## Page 40

> __/__/___

### 3NF:

- No transitive dependency and is in Second form

```
NPA --> NPA (X)
```

### BCNF (Boyce Codd):

- Should be in third form
- Every `RAs` attribute of functional dependencies should depend on the Super key of that particular table.

#### ER diagram

Components:

1. Entity (real world object / concept) (Rectangle)
2. Attribute (properties) (oval)
3. Relationship (connection) (diamond)

#### Types of relationships

1. One to one (`1:1`)
2. One to Many (`1:my`)
3. Many to many (`my:my`)

## Page 41

> __/__/___

### Database Architecture:

It is the structural design and methodology, Spanning conceptual, logical and physical

1. 1 tier: The database **sits** directly on the Client machine (uses for local dev).
2. 2 tier (Client-Server): Direct Communication occurs ~~between~~ between the client and server
3. 3 tier: The industry standard for webapps. It separates the client / presentation layer, Business logic layer and Database layer.

#### Data abstraction

- External level (view level) what users see
- Conceptual level (logical level) what data stored
- Internal level (physical) how data is stored

#### Main Components:

- Query processor (parse, optimize , execute)
- Storage Manager (Data storage, retrieval)
- Data modelling ( how data is-organized, manipulated)
- Distributed Architecture (replication, availability)

## Page 42

> __/__/___

### DBA tasks

DBAs are responsible for the performance, integrity and security of data systems.

1. Database Design and development
2. Performance Monitoring and Tuning
3. Security Administration
4. Backup and Recovery
5. Installation and Upgrades
6. Data migration and Maintenance
7. Troubleshooting.

#### Advanced DBA operations

1. High Availability and Disaster Recovery
    - Data Guard management
    - oracle `RAC` (real application clusters)
    - Flashback Technologies

2. Performable tuning and optimizations
    - `SQL` Tuning
    - Instance Tuning
    - Wait Event Analysis
## Page 43

### 3) Backup and Recovery (RMAN)

- Advanced RMAN operations
- Database Duplication / Cloning
- Data Pump & Transportable Tablespaces
- 

### 4) Advanced Security and Auditing

- Database Vault
- Data Masking and Encryption
- Unified Auditing

### 5) Infrastructure and Patching

- Patch Management
- Upgrades and Migrations
- Capacity Planning

### Advanced DBA roles

- Cloud DBA (RDS, Azure SQL)
- Development DBA (Design databases, data models)
- Production DBA

## Page 44

### CIA triad

It is a foundational cybersecurity model designed to guide info security policies within an organization.

It ensures data is protected from unauthorized access, kept accurate and trustworthy and accessible

#### Confdentiality:

data accessible to authorized individuals

- encryption
- Strong authentication (MFA)
- Strict ACL

#### Integrity:

Info is accurate, Consistent and trustworthy.

Techniques:

- file permissions
- version control
- Checksums
- Digital Signatures

## Page 45

#### Availability:

Authorized users have reliable and timely access to data and resources when needed

- Data backups
- Firewalls and proxy servers
- Disaster recovery and incident response
- DDoS (Distributed Dos)

### Comman attacks:

- Phishing: Fraud emails / messages that come from trusted sources to steal Credentials, banking details (Spear, whale)

- Malware: Malicious Software designed to access, damage or steal data from devices

- Ransomware: A type of malware that encrypts a victim's files, with attackers demanding ransom payment for decryption

## Page 46

- Social Engineering: Manipulating individuals into performing actions, often through impersonation

- Denial of Service (DoS): Flooding a System, Server or network with artificial traffic to overload resources, making it unavailable

- Man in the Middle (MITM): Attackers insert themselves into a two party conversation, intercepting data between an user and an application, often on unsecured public Wi-fi

- SQL Injection: Inserting malicious code into a Server that uses SQL, forcing it to reveal sensitive info from its database.

- Password Attacks: Attempting to crack or steal passwords through brute force, dictionary attacks, Credential stuffing.

## Page 47

- Spoofing and DNS spoofing: Disguising communication from an unknown source as being from a trusted one, such as using a fake website to trick users.

- Zero day exploits: Attacking a network vulnerability that has been announced but for which a patch or solution is not yet available

- Insider threats: Security risks originating from within the organization

### Encryption:

- plaintext to cipher text using Algs and keys
- Stolen data useless to unauthorized users
- Key component of modern Security protocols

- b Symmetric Encryption: Uses same key for encryption and decryption (private)
2) Asymmetric Encryption: Uses ~~public~~ for encryption and private for decryption

## Page 48

### Unlabelled list

- Local, Site, Domain, OL
- FSMO (Flexible single Master operation)
- Primary -> Secondary zone
    - (R&W) — (Read only)
- DHCP (67,68)
- Windows disk partitioning
- `MBR, GPT, BIOS, UEFI`
- Start, stop, configure windows Service (service Console)
- `useradd, groupadd, chgrp, usermod, chmod g+r`
- Linux disk partitions (fdisk, parted)
- Linux FS RHEL (XFS), ext4, BtrFS, f2Fs
- Windows -> Linux (Samba)
- Azure LRS, ZRS, GRS
- Ping - ICMP

## Page 49

### Introduction to Scripting & Automation

- ICMP (Ping)
- `getmac`
- `arp -a`
- `pathping` IPaddr/ `tracert` IPaddr
- `nslookup` domain
- `Get-NetIPConfiguration`
- `netstat -ano`

### Ubuntu

- `whoami` && `pwd` (active user and working directory)
- `ls -la /var/log` (Permissions and hidden files)
- `uptime` && `free -h` (System uptime and resource utilizn)

## Page 50

### 1.1 Importance of scripting in IT infrastructure

- Some operations in data Center, cloud

- Physical Infra, Virtual Infra, Cloud Infra

#### Physical Infra:

- Network (Routers, switches, Firewalls)
- Storage (NAS, SAN)
- Physical Servers

#### Virtual Infra:

- Hypervisors
    - OS level (VMware workstation, Virtual Box)
    - Bare metal (RHEV, ESXI, Xen)

#### Cloud Infra:

- Public (AWS, Azure, GCP)
- Private (cloud stack, Openstack)

## Page 51

Instead of admin manually Checking disk usage on 50 servers every morning, a 10 line script can SSH into each one, Check usage, email a report (2hr - 30 seconds)

- Python (requests for API, boto3 for AWS, Parcmiko (SSH))
- Shell (Bash) - native to Linux/mac OS
- Powershell (Windows)

### REST APIs

URI (Identifier) - identifies any resource, by name, location, or both. Every URL is a URI.

URL (Locator) - a URI that also tells you where to find the resource and how to access it (protocol + host + path)

```
https://api.library.com/v1/books/101?format=json
```

- scheme -> `https`
- host -> `api.library.com`
- version -> `v1`
- resource id -> `books/101`
- query -> `?`
- string -> `format=json`

## Page 52

### REST API

- Statelessness
- layered system
- Resource based URLs
- Uniform interface
- Representation (JSON, XML)

#### HTTP methods

- GET (Retrieve) Idempotent (Idpt)
- POST (create) Not Idpt
- PUT (Replace/update) Idpt
- PATCH (partial update) ~~Idpt~~ maybe Idpt
- DELETE (remove a resource) Idpt

#### Authentication

- API keys (static secret string)
- OAuth 2.0 (flow where script request time limited token on behalf of user instead of permanent key)

## Page 53

### HTTP status Codes

#### 2xx - Success

- 200 ok (Success) GET
- 201 created (New resource Created) POST
- 204 No content (Success, no return) DELETE

#### 3xx - Redirection

- 301 Moved permanently (New URL).
- 302 found (Temp redirect)
- 304 Not modified (Cached version valid)

#### 4xx - Client error

- 400 Bad Request (Malformed request)
- 401 Unauthorized (missing / Invalid Credentials)
- 403 Forbidden (Authenticated, not allowed)
- 404 Not found (Resource doesn't exist)
- 429 Too Many Requests (Rate limit exceeded)

#### 5xx - Server error

- 500 Internal Server error (Server crash)
- 502 Bad Gateway (upstream server invalid response)
- 503 Service Unavailable (Server down)
- 504 Gateway Timeout (Upstream server took too long)

## Page 54

### API Key

- Unique String
- Passed via header, query, param or body
- Simple to implement

### REST API Features

- Scalability
- Interoperability
- Simplicity
- Flexibility

## Page 55

### Terraform

#### Declarative

- Idempotent
- Terraform, OpenTofu, AWS Cloud Formation, Azure Bicep

#### Imperative

- Granular level control over every action
- Chef, Ansible, Bash, scripts

```
Var .tf files  ->  Terraform Core operations
                                 |  API calls
                                 v
                    HTTPS API  <-  Providers calls
Actual Cloud       <-
```

- `init`
- `plan`
- `apply`
- `destroy`

IaC is the practice of managing and provisioning Computing infrastructure - networks, VM, Storage through machine readable files

## Page 56

### Iac benefits:

- Speed & Agility
- Consistency
- Version Control
- Cost Control
- Collaboration
- Disaster Recovery

### Terraform Characteristics:

- Cloud agnostic
- Open Source
- HCL (Hashicorp config language)
- Maintains a state file

keys: HCL, Provider, Resource, State, Module.

### HCL:

- Resource block
- Arguments
- Nested blocks
- Builds a dependency graph
## Page 57

### TF state:

terraform.tfstate is a JSON that maps the resources in your code to real world objects in Azure. (IDs, attributes, dependencies)

### Modules:

Module is a reusable, self Contained set of ~~TF~~ Config files that can be multiple times with different inputs.

### Variables

```hcl
1, Variable "instance-Count" {
     type = 'number'
     description = "How many instances to Create"
     default = 2
   }
```

```hcl
1, Variable "tags" {
     type = list(number)
     default = [80, 4503]
   }
```

Types: String, number, bool, list (type), set (type), map (type), object ({...}), tuple ([...]).

## Page 58

### Precedence of Variables:

- export TF_VAR_environment = dev
- terraform.tfvars file
- *.auto.tfvars 1
- -Var -file = Custom.tfvars
- -Var = "environment = dev"
- Interactive prompt

### Dependencies

1, Implicit dependencies ?

When one resource references another attr, Terraform automatically knows to create the referenced one first.

```hcl
resource "local_file" "Config" {
   filename = "${path.module}/app.conf"
   Content = "ready"
}
```

```hcl
resource "local_file" "marker" {
   filename = "${path.module}/marker.txt"
   Content = "Config exists at: ${local_file.config.filename}"
```

## Page 59

```bash
** terraform graph | dot -Tpng > graph.png
```

- Explicit dependencies with depends-on:

```hcl
resource "local-file" "a" {
   filename = "${path.module}/a.txt"
   Content = "a"
}

resource "local-file" "b" {
   filename = "${path.module}/b.txt"
   Content = "b"
   depends-on = [local-file.a]
}
```

### Meta arguments:

- Count:

```hcl
   count = length(Var.server-names)
```

- for-each = Var.servers
- lifecycle {

```hcl
   prevent_destroy = true
   create_before_destroy = true
   ignore_changes = [content]
}
```

## Page 60

- Drift: It is any divergence between the actual infra and what's recorded in the state file

- State locking: Mechanism that prevents Concurrent write operations to state file by sharing/acquiring an exclusive lock before any plan/apply/destroy would modify state

- Provider: It is a plugin that implements resource types and data sources for a specific platform.

- terraform import binds real world resource to a resource address in your state file.

- terraform State mv

Module is a Container for multiple resources used together - any folder of .tf files is a module

### Workspace:

a named, isolated instance of state within the same backend and configuration.
terraform.workspace is a built in reference to the current workspace

## Page 61

- terraform workspace new dev
- terraform workspace new Staging
- " " new dev
- " " " select dev

### Provisioner:

It executes scripts or commands on a local or remote machine as part of resource Creation or destruction. (local -exec, remote- exec)

### Testing (CI CD, Secrets & Debugging):

1, terra form fmt (used for formatting to a Consistent style of Canonical HCL style.
    - recursive, - Check

2, terraform validate (checks whether a Configuration is syntactically valid and internally Consistent

3, linting (tflint) (is a 3rd party linter that adds provider specific rules beyond what "validate" checks

## Page 62

4) tfsec (Static analysis security Scanners for IaC that check Configurations against a database of known misConfiguration patterns and Compliance benchmarks (CIS) without needing to apply anything) (Checkov)

3) CI/CD pipeline
fmt/validate/lint/plan/apply

### Structure

```
project/
    main.tf
    variables.tf
~~descriptions/~~
    ~~outputs.tf~~
    ~~providers.tf~~
~~blocks/~~
    ~~versions.tf~~
providers.tf
```

```
project/
    main.tf
    variables.tf
    outputs.tf
    providers.tf
    versions.tf
    terraform.tfvars
    .gitignore
    modules/
```

terraform State show

## Page 63

### * Versions.tf:

```hcl
terraform {
  required_version = ">=1.5.0"

  required_providers {
     aws = {
        source = "hashicorp/aws"
        version = "~> 5.0"
}
   }
}
```

### * providers.tf:

```hcl
providers "aws" {
   region = Var.aws-region
}
```

## Page 64

### * Variables.tf:

```hcl
Variable "aws-region" {
   type = string
   description = "Aws region to deploy into"
   default = "us-east-1"
}

Variable "bucket -name" {
   type = string
   description = "Globally unique name for the S3 bucket".
}
```

### * main.tf:

```hcl
resource "aws_s3_bucket" "app" {
   bucket = var.bucket-name

   tags = {
      ManagedBy = "terraform"
   }
}
```

## Page 65

### * Outputs.tf:

```hcl
output "bucket_arn" {
   description = "ARN of the Created bucket"
   value = aws_s3_bucket.app.arn
}
```

Terraform is an open source IaC software tool Created by HashiCorp that allows developers to define, provision! and manage cloud and on-premise infrastructure using a declarative Configuration language.

### Key benefits:

- Multi - cloud Deployment
- Declarative Approach.
- State Management
- Version Control Friendly
- Speed and Reusability.

## Page 66

### Prompt Engineering

It is the practise of designing, structuring and refining the input you give a LLM so that it produces the output you actually want.

Three prompt qualities - Vague, Better, Engineered.

### Role of prompts in LLM performance:

1, Prompts Set the "Search space"
2, Prompts activate latent knowledge.
3, Prompts Control Performance ceiling AND floor
4, Prompts affect reliability, not just quality.

### Anatomy of a prompt:

- Instruction
- Context
- Input data
- Output format
- Constraints.

## Page 67

### Prompt Design Strategies

- Zero shot prompting (no examples)
- One Shot prompting (only 1 example)
- Few Shot prompting (multiple examples).

### Instruction based Prompting:

a) Use Imperative verbs, not passive requests
b) Be explicit about Constraints, not implicit.
c) Use Chain of Thought Prompting (CoT)
d) Role Based Prompting
e) Prompt Chaining

### Context Engineering:

Content commonly comes from:

- Conversation history
- System prompts
- Retrieved documents (RAG)
- Metadata
- Tool / function outputs.

## Page 68

### Techniques for Injecting Context:

a) System prompts
b) Metadatta injection
c) External Knowledge injection.

- Models pay less attention to info buried in the middle of a very long context than to info at the start or end.
- Context relevance vs Context volume (precision > volume)
- Context poisoning / injection risk.
- Static and Dynamic Content.

### Role prompting:

- Persona roles
- Functional roles

### Multi Turn Conversation Design:

a) persistent System instructions across Turns
b) State tracking via explicit recap
c) Turn taking discipline
d) Explicit Correction handling

## Page 69

### Prompt Chaining

It is breaking a complex task into a sequence of smaller prompts, where the output of one prompt becomes the input to the next.

- Prompt templates with Variables.

### * Evaluation & Optimization:

a) Accuracy by Relevance & Coherence

### Hallucination:

It is when the model generates plausible sounding but factually incorrect or fabricated info

### mitigation Techniques:

- Ground responses in provided Content
- Ask for confidence / uncertainty flagging
- Request citations / sources for factual claims

## Page 70

### Consistency / robustness testing:

Testing the same prompt variants with minor, meaning less variations. A robust prompt should give stable results despite input variation.

### Integration with Frameworks

LangChain is a popular open-source framework for building applications powered by LLMs, it doesn't replace prompt engineering, it gives you structure to manage prompts, chains, memory and tools in code rather than manually copy pasting text between chat turns.

### Key Concepts:

- Prompt Templates
- Chains
- Memory (Conversation Buffer/Memory/Conversation Summary)
- Agents/ and tool use
## Page 71

### Retrieval Augmented Generation (`RAG`)

```
Ingest docs → split into chunks → convert each
chunk into a
store in a vector database. ← Vector embedding
```

### Azure AI SDK for Prompt Orchestration

Same like `Aws Bedrock`, `Google vertex AI`

- Deployment management
- Content filtering/safety layers
- Structured output enforcement
- Token/cost monitoring.

### Other frameworks like `LangChain`:

- Llama Index (for `RAG`)
- Semantic Kernel (Microsoft)
- `CrewAI`/`AutoGen` (multi agent orchestration).

## Page 72

### AI timeline

1, Symbolic AI/Rule-based Systems (1950s to 1980s)  
2, Classical Machine Learning (1990s to 2000s)  
3, Deep Learning (2012 Onwards)  
4, Transformer (2017)  
5, Pre trained language models (2018 to 2019)  
6, Scaling and LLMs (2020 to 2022)  
7, Multimodal, reasoning and agentic era (2023 to now)

### AIOps:

It replaces manual, slow troubleshooting with a Continuous, automated loop. that ~~access~~ processes vast amount of system data.

- Incident management and root cause analysis
- Log and alert summarization
- Runbook automation / ChatOps
- Infrastructure as Code (IaC)
- ITSM Configuration

## Page 73

### Embeddings:

It is a list of numbers (called vectors) that represents the meaning of words, images or audio. So a computer can understand them.

It Captures intricate relationships and nuances in meaning.

#### Embedding methods:

1, Frequency based (`TF-IDF`)  
2, Prediction based (Semantic reln)

- Word 2 Vec (`CBOW`, Skip-GRAM)
- `GLOVE` (Global vectors for Word Representation)

Transformers use Contextual based embeddings.

## Page 74

### Large Language Models

#### Self attention:

Q (Query) [what am I looking for?]  
K (Key) [What do I Contain?]  
V (Value) ((What information do I offer?]

```
Attention (Q,K,V) = softmax (Q . K^T) / (√d_k) . V
```

d_k is the dimension of key vectors

#### Multi Head attention:

Instead of one attention Computation, run in Several parallel ("heads"), each potentially Specializing (one for syntax, Coreference, long [sentence unfinished in notes]

- Encoder only
    - Bidirectional (`BERT`, `T5`)
    - Understanding Classification, embeddings

## Page 75

- Decoder only
    - Causal/masked (only Sees past tokens)
    - Generation (`GPT`, Claude, Llama)
- Encoder-decoder
    - Encoder bidirectional, decoder casual, plus attention
    - Translation, Summarization
    - T5, `BART`, or 9 Transformer

- ~~[illegible]~~

#### Interoperability protocols

- `MCP` (Model Context Protocol)
- `A2A` (Agent 2 Agent)

### LangChain

- lang chain → Core (messages, prompts, tools)
- langchain (Higher level chains and agents)
- langchain -<provider> (langchain-anthropic, langchain-openai)
- lang chain - Community (loader, Vector stores)

## Page 76

### LangGraph

It is an open source framework designed to build and manage AI agent workflows using graphs structures . It allows developers to define workflows as nodes and edges making Complex agent interactions- more structured Scalable and easier to control.

#### Core Concepts :

- Nodes (Language model /tool)
- Edges (Direct paths to Connect nodes)
- Conditional edges (Decission rules that Check the Current progress and Choose the next node)
- State (Shared memory notebook that every step can read /write to)
- Cycles (Allows AI to think, act, check the result and repeat the process until goal is met)

## Page 77

### Key components of LangChain

- Models (openAI, anthropic, gemini)
- Prompt Templates
- Chains
- Memory
- Agents

### LangSmith

It is a unified platform built by creators of Lang Chain for debugging, testing, evaluating and monitoring LLMs and AI agents

#### Features :

- observability & Tracing
- Testing & Evaluation
- Prompt Engineering
- Deployment.

## Page 78

### RAGAS

Retrieval -Augmented Generation ASsessment (`RAGAS`) is an open source frameworks designed to quantitatively evaluate, test and improve LLM and `RAG` applications.

#### Types of evaluation in RAGAS:

- Core `RAG` metrics
    - Faithfulness
    - Answer Relevancy
    - Context Precision
    - Context Recall

#### Applications :

- RAG pipeline optimization
- CI/CD for AI
- Agentic workflows

## Page 79

### Workflow patterns

1, Prompt chaining  
2, Routing (easy tasks to Small model, hard to large)  
3, Parallelization (Sectioning and voting)  
4, Orchestrator -workers  
5, Evaluator -optimizer

### Microsoft Azure Agent Ecosystem

- Microsoft Foundry (Azure AI Foundry)
    - platform for models, agents, evaluation and deployment
- Foundry Agent Service (runtime for hosting agents, tool execution and enterprise Controls)

### AI Search

we can build and manage cloud search solutions using the Azure AI Search platform for enterprise data retrieval and generative AI grounding.

## Page 80

### Core Components:

- Data Sources (CosmosDB, Azure SQL, Blob)
- Indexers (content ingestion, parsing and field mapping)
- Search Indexer (optimised text and vectors for fast retrieval)

### Vector Databases & Embedding Models

#### Evolution of embeddings

1. Sparse/count-based
    - Bag of words, `TF-IDF`
    - ~~static-word-Embedding~~
2. Static word embeddings
    - Word2Vec, `GloVe`, fastText
3, Contextual embeddings
    - BERT-based, Sentence-based
4, Modern text embedding models
    - Dedicated embedding models (openAI, cohere, Voyage)
5, Multimodal
    - `CLIP` style, multimodal embedding models

## Page 81

The core operation behind vectors `KNN`,

#### Distance and Similarity metrics

- Cosine Similarity (angles between vectors, ignores b [clipped at page edge]
- Dot product (inner product)
- Euclidean Distance (L2)

### Vector Databases

A system to store vectors with their metad [clipped at page edge]  
and payloads, index them for `ANN` search  
and serve queries with filtering, updates, sele [clipped at page edge]

### FAISS (Facebook AI Similarity Search)

- open source C++/ Python
- Runs in process /no server
- weak on metadata filtering and live updates
- Learning, prototypes, batch jobs

## Page 82

### Pinecone

- fully managed cloud vector database
- index → namespaces → records
- Pros : Zero ops, Scales easily, simple API
- Fast prod launch with infra work

### Weaviate

- Open source (Self host /cloud) vector database
- With [bullet unfinished in notes]
