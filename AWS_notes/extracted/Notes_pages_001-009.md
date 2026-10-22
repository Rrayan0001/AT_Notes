# Notes.pdf — Pages 1–9

## Page 1

IP:
Class A: 1.0.0.0 – 126.255.255.255 ——→ Subnet mask: N H H H → 255.0.0.0 ——→ /8
Class B: 128.0.0.0 – 191.255.255.255 ——→ N N H H → 255.255.0.0 ——→ /16
Class C: 192.0.0.0 – 223.255.255.255 ——→ N N N H → 255.255.255.0 ——→ /24

IPv4: 4 octets X 8 bits = 32 bits
→ 1 octets = 8 bits    ∴ 2^8 = 256 values
   i.e. 0 to 255  [255.255.255.255]
→ Host bits = 32 - CIDR
   Ex:- 192.168.1.0/24 ─→ Network bits
   ∴ Host bits = 32 - 24 = 8
→ Total IPs = 2^(Host bits)
   Ex:- 192.168.1.0/24
   Host bit = 8
   ∴ Total IPs = 2^8 = 256
   [ But 1st IP = network address [192.168.1.0]
     Last IP = broadcast address [192.168.1.255] ]
   ∴ Available hosts are = 256 - 2 = 254

→ AWS has 5 IP addresses reserved per subnet
   Ex:- 10.0.1.0/24
   Total = 256
   But available = 256 - 5 = 251 IPs

→ Ex:- 10.0.0.0/24
   Host bit = 32 - 24 = 8
   Total IPs = 2^8 = 256
   Usable IPs = 256 - 2 = 254
   AWS usable = 256 - 5 = 251

→ Number of Subnets = 2^(Borrowed bits)
   Ex:- Need 3 subnets  ∴ 2^2 = 4  ∴ need 2 bits
   Need 10 subnets  ∴ 2^4 = 16  ∴ 4 bits

[margin, top right: 32; 2^8 = 256; 2^6 = 64; 64 - 2; 62]

Private IP:
A — 10.0.0.0 — 10.255.255.255
   10.0.0.0/8
B — 172.16.0.0 — 172.31.255.255
   172.16.0.0/12
C — 192.168.0.0 — 192.168.255.255
   192.168.0.0/16

↗ 127.0.0.0/8 — reserved for loopbacks address

↗ CIDR tells us:
1. Network size
2. Number of available IPs
3. Subnet boundary.

## Page 2

VPC X X X
↳ Logically isolated virtual network
↳ that we create inside AWS to launch
↳ cloud resources.

Cloud Watch
↳ monitoring and observability service used
   to collect, monitor, visualize, analyze and
   respond to metrics, logs and events from AWS
   applications.

→ Monitoring — continuously observing the health,
   performance, availability and behaviour of AWS
   resources and application.

→ Observability — ability to understand the
   internal state of a system by analysing
   its metrics, log, traces and data.

→ Metrics
   ↳ Metric — a numerical measurement
      collected over time that represents
      the performance of resource.

   ↳ Period — length of time over
      which cloudwatch aggregate
      metric data for evaluation.

→ Logs
   ↳ is a service capability that
      collects, stores, monitors, and analyze
      data from AWS resources, applications

   ↳ Log groups – container that organize
      related log stream and allow
      common setting such as retention
      and access control to be applied.

   ↳ Log Stream – sequence of log events
      from a particular source of application
      instance within in a log group.

   ↳ Log Events — individual record in a log stream
      normally containing a timestamp and a log
      message.

   ↳ Log Retention — specifies how long Cloudwatch
      logs keeps logdata before automatically deleting
      it.

   ↳ Log Insgight — interactive log-analysis
      capability that allows user to query, search,
      filter and visulaize log data.

→ Alarms:
   ↳ monitors a metric and changes its
      state when the metric meet a configured
      condition or threshold.

   ↳ Threshold — value against which a metric
      is compared to determine whether an
      alarm condition has been met.

   ↳ Evaluation Period — amount of metric period
      that cloudwatch evaluate to determine an
      alarm's state.

   ↳ Alarm State:
      1. OK –
      2. ALARM –
      3. INSUFFICIENT_ DATA

→ Visualization:
   ↳ Dashoboard — customizable visual interface
      that display metric, graph, alarm and
      other monitoring info in one place.

   ↳ Widget — individual visual compnent on
      a cloudwatch dashboard.

→ Events:
   ↳ Record that describes something that
      happened on system.

   ↳ Eventbridge : serverless event bus service
      that receives events from AWS services and
      routes them to target.

## Page 3

→ RUM : [Real User Monitoring]
   ↳ collect info about the performance
      and behaviour of real users
      interacting with application.

→ Agent:
   ↳ softwcore installed on supported
      server to collect additional system
      metric, logs and other then send
      to cloudwatch.

→ Alert:
   ↳ inform/notify a response
      generated when a monitored
      condition indicates that attention
      may be required.

→ Agent used                          don't use
   1. EC2, Server,
      Linus Server,
      On-premise server,
      VM
                                      1. S3, RDS, lamabda,
                                         dynamoDB, SNS, SQS,
                                         API Gateway, LB

## Page 4

Application Load Balancer
↳ operates at OSI layer 7.
↳ distributes application traffic.
↳ ALB understand content of HTTP/HTTPS
   requests and can make routing decisions
   based on that info.

→ Path-based Routing – routing traffic
   according to URL path.

→ Host-based Routing – route based
   on host name.

→ HTTP header-based Routing – routing
   decision using HTTP header.

→ ALB perform health checks on target

→ ALB supports TLS termination.

→ Cross-Zone Load Balancing:
   ↳ allow traffic to be distributed
      across target in different AZ.

Network Load Balancers
↳ handles network-level connection, layer-4
↳ main protocols – TCP, UDP, TLS
↳ Transport-level connection routing
↳ Supports TLS Listener
↳ provides static IP address for LB,
   and can also use Elastic IP address for
   Internet – facing NLB

↳ Very high throughput, very low latency,
   large number of connections, TCP/UDP
   application.

↳ Health check on TCP, HTTP, HTTPS.

↳ NLB can route traffic to supported target
   types such as : EC2, IP address, ALB.

## Page 5

GLB
↳ designed to deploy, scale and manage
   virtual network appliances such as
   firewalls, IDS, IPS, deep packet inspection.

1. distribute traffic among the firewalls
2. automatically scale the appliances
3. maintain network traffic flow
4. Make the appliances highly available.

↳ Appliances would be:
   1. Firewall        4. Packet inspection
   2. IPS, IDS
   3. network/security appliances

→ GLB Endpoints is type of VPC endpoint
   that allow traffic from your VPC to
   reach GLB.
   ↳ GLBE uses AWS Privatlink technology

→ GLB uses GENEVE protocol for
   encapsulation

→ GENEVE port – UDP 6081
   [Generic Network Virtualization Encapsulation]

→ Flow stickiness – GLB uses flow-based
   distribution so traffic belonging to a flow
   remain associated appropriately with same
   appliance. [stateful appliances]

→ stateful firewall remembers connection
   information.

→ Service insertion means inserting a network
   service into the traffic path.

→ GLB provides transparent network
   application insertion.

→ In 5 tuple - protocol tells "what
   kind of traffic is this?" which helps GLB
   to determine which appliance should handle a
   particular flow.

[Diagram, top right:]
User
↓
Internet
↓
Internet Gateway
↓
Route Table
↓
GLB Endpoint
↓
GLB
↓
Select healthy appliance [Firewall]
↓
GENEVE/UDP 6081
↓
Firewall
↓
Decapsulation
↓
Inspection
        [branching:] Deny → Drop          Allow → continue → GLB → GEBE → Application

* Encapsulation:
[diagram: outer packet containing og packet; Outer Envelop — To: Security Appliance; og letter From: To: Msgs]
Outer packet consist of
Outer IP header, UDP, Src/Dst ports,
UDP dst = 6081, GENEVE header, og packet

Inside/original packet consist : 5 tuples

Outer Envelop

## Page 6

EvenBridge
↳ Serverless event bus service that connects application, AWS services, 3rd prty apps by
   receiving events, filtering them using rules and routing them to appropriate targets.

→ Event – something that hppn in system.

→ EDA – blw architecture in which components
   communicate by producing and responding to
   events.

* Source —→ Event —→ Event bus —→ Rule —→ Target
   ↓                      ↓
   EC2, lamabda,          router that          ↳ represents/determine which
   S3 etc.                receives event and      event should be sent to
                          delivers them to zero or   which target.
                          more targets based on rules.

                          → target is destination where eventbridge send
                             on event to when a
                             rule matches
                             Ex:- lamabda, sqs, SNS,
                             API, Kinesis, ECS, etc.

→ Eventbridge Pipe — provides point to point
   integration blw single event source and a
   single target.

→ Eventbridge — will let you route events from one application to another based on rules.

VPC [Virtual Private Cloud]
↳ we define IP range using CIDR

↳ Subnet belongs to one AZ, but VPC
   can have subnets in multiple AZ.

→ Public subnet – route table connected to IGW.

→ Private subnet – doesn't have direct connection to
   IGW.

→ IGWs — provide path blw VPC and internet.

→ Route Table — tells the network where to send
   traffic.

→ NAT Gateway — allow resources in private subnet
   to initiate outbound connections to Internet without
   giving those resources direct inbound internet access.
   ↳ NAT is placed in public subnet to route through the
      IGW to reach Internet.

→ Security Group                    → network - interface level
   ↳ acts as firewall for resources.
   ↳ statful, allow incoming and outgoing traffic.

→ NACL — stateless, support both allow and deny rule
   ↳ works at subnet level

→ VPC Endpoints — private connectivity blw resources
   in VPC and supported AWS services.

→ Gateway Endpoints — used for S3, dynamoDB

→ Interface Endpoints — use AWS private links
   and create a network interface with
   private IP address in our subnet.
   Ex:- KMS

→ VPC Peering — connection blw two VPGs.

→ Transit Gateway — acts as central
   networking hub. multiple VPCs and
   other network connections can connect
   through it.

→ VPN — AWS site to site VPN provides
   an encrypted connection blw an on-
   premises network and AWS.

→ Direct Connect — dedicated network
   connection to AWS.

→ VPC Flow Logs — help us capture
   information about network traffic
   to and from network interface in
   VPC.

## Page 7

EC2
→ Service that provide resigable
   compute capacity.

→ allows you to create and run virtual servers
   in the AWS cloud.

→ AWS handles the underlying ingras.

→ User is responsible for "guest OS and
   everything running inside instance".

[Diagram:]
AWS Region
↓
Availability zone
↓
VPC
↓
Subnet
(EC2          EC2)
EC2:
CPU    RAM    Storage
              ↓
             EBS

1) AMI: [Amagon Machine Image]
   ↳ template used to create your EC2
      instance.
   ↳ Ex:- Amagon Linux, Ubuntu, Red hat,
      Windows
   ↳ Contains: OS, root volume config,
      Software

2) Instance type:
   ↳ determine hardware resources
      available to your virtual machine.
   ↳ Ex: t3.micro, t3.small, m7i.large, etc..

   ↳ determines things like:
      VCPUs, memory, network capabilities,
      Storage, architecture, processor,
      performance.

* Instance Families:
→ different workloads need
   different resources.
   ↳ Types:
   1. General Purpose (T, M)
      ↳ web servers, development,
         small applications, general workloads

   2. Compute Optimized (C)
      ↳ CPU-intensive applications
      ↳ batch processing
      ↳ compute heavy workloads

   3. Memory Optimized (R, X)
      ↳ large database
      ↳ in-memory application
      ↳ caching

   4. Storage Optimized (I, D, H)
      ↳ high I/O workload
      ↳ large local dataset
      ↳ storage-heavy application

   5. Accelerated computing (P, G, Ig, Trg)
      ↳ machine learning, GPUs,
      ↳ AI workloads.

3) Key Pair:
↳ securely connect EC2 instance

[Diagram:]
Key Pair
Public key          Private key
   ↓                   ↓
AWS/EC2             Myself

4) Network Settings:
   1. VPC
   2. Subnet
   3. Auto assign Public IP
   4. secumity groups.

## Page 8

5) Security Groups:
   ↳ virtual firewall
   ↳ Inbound rules – traffic coming
      towards EC2.
   ↳ stateful [outbound connection
      in automatically allowed]

6) Configure Storage:
   ↳ EC2 normally uses EBS for persis tent
      block storage.

* EBS Volumes:
   1. gp3
   ↳ general purpose SSD
   ↳ very commonly used

   2. gp2
   ↳ older version

   3. io2
   ↳ Designed for high performance,
      high-durabilliy workloads.
      requiring high IOPS.

   4. st1
   ↳ Throughput optimized SSD

   5. sc1
   ↳ cold HDD.
   ↳

7) Advance details:
❶ IAM Instance profile
   ↳ EC2 can have IAM role
   ↳ Instead of putting AWS access
      keys inside code, you attach IAM
      role

❷ Metadata options:
   ↳ EC2 has important service called
      Instance Metadata Service — IMDS
   ↳ instance can retrieve info about
      itself.

   ↳ Modern EC2 uses IMDSv2 , which
      uses a session-oriented token mechanis[m]

❸ Tenancy:
   1. Shaored Tenancy
      ↳ instance runs on AWS hardware
         shared with other customers of underlying
         h/w.

   2. Dedicated Instance:
      ↳ your instance runs on h/w dedicated
         to a single customer, while Aws manages
         placement.

   3. Dedicated Host:
      ↳_physical server dedicated to your use
      and can manage instance placement.

❹ Placement Groups :
   ↳ how instance are physically/logically
      placed

   ↳ Types:
   1. Cluster:
      ↳ instances are placed close together
      ↳ Useful for:
         1. high network performance
         2. low latency

   2. Spread:
      ↳ instance are spread across distinct
         underlying h/w.
      ↳ Useful for:
         1. Reducing correlated h/w failure
            risk.

## Page 9

3. Partition:
   ↳ instance seperated into partitions
   ↳ Useful for large distributed system:
      Hadoop, Kayka, Cassandra.

❺ Purchasing Option:
   1. On-Demand:
      ↳ pay for what you use without
         long-term commitment.

      ↳ Good when workload is
         unpredictable.

   2. Reserved Instance:
      ↳ Commit to a config/term
         for a discount compared with
         equivalent on-demand usage.

   3. Saving Plans:
      ↳ commit to certain amount
         of compute spending for a term
         in exchange for discounted rates.

   4. Spot Instance:
      ↳ Use spare AWS capacity at potentially
         large discounts, but AWS can interrupt
         the instance when capacity is needed.

      ↳ Good for—
         ↳ Batch jobs, fault tolerant
            workloads, stateless processing

* Hypervisor:
↳ EC2 relies on AWS virtualization
   technology.
↳ AWS hypervisor — AWS NItro.

* EC2 Status Checks:
· 2/2 checks passed
1. System status check
   ↳ checks underlying Aws ingra.
   ↳ AWS hardware, AWS networking,
      AWS host infrastructure.

2. Instance status check
   ↳ check instance itself
   ↳ Indicate problem:
      ↳ OS boot failure
      ↳ Network config problems
      ↳ instance-level issues.

· 3/3 checks passed
   ↳ it include "Attached EBS status check"

* Elastic IP:
   ↳ static public IPV4 address
