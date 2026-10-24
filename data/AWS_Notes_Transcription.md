# AWS Notes — Full Transcription (Cloud Practitioner + Notes + EventBridge)

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
| 1–43 | AWS Cloud Practitioner Notes |
| 44–61 | AWS Notes |
| 62–64 | EventBridge Notes |

---

## Page 1

Module 1 :- AWS
Client-Server &

In Computing, a client can be a web browser or desktop applications that a person interacts with to make probable:[requests] to Computer Servers.

client → Customer → Request ⇒ (The Request can be anything in the Computing world.)
(1) Server → Source.

→ Basically a Customer makes a request, & with [struck-out] permissions, the Server responds to that request.

In AWS, the (service) Server would be called an Amazon Elastic Compute cloud or EC2, an EC2 Instance, a virtual server.

Key Concept to AWS :- "You only pay for what you use".

Cloud Computing :- It is the on-demand delivery of IT resources over the internet with pay as you go pricing.

On demand delivery indicates that AWS has the resources we need, when we need them. We don't need to tell in advance that we are going to need them.

That kind of flexibility is just not possible when we are managing our own Data Centers.

The idea of IT resources is actually a big part of the AWS philosophy. We often get asked why AWS has so many products & the answer is :-

Because businesses need them.

(At AWS, we call that the [struck-out] undifferentiated heavy lifting of IT. Tasks that are common, often repetitive, & ultimately time consuming. These are the tasks AWS wants to help us with.

Over the internet, seems simple enough, but it implies that you can access these resources using a secure webpage console or programmatically)

Pay-as-you-go pricing.

[Scanner watermark: Scanned with OKEN Scanner]

---

## Page 2

Deployment Models for cloud Computing :-

When selecting a cloud strategy, a company must consider factors :-

(2)
→ Cloud Applications.
→ Components.
→ Preferred Resource Management tools.
→ Any legacy IT infrastructure requirements.

The 3 cloud Computing deployments models :-

→ Cloud based
→ On premises. ✓
→ Hybrid.

Cloud Based :-

* Run all parts of the Application in the cloud.
* Migrate existing applications to the cloud.
* Design & Build new applications in the cloud.

→ We can build those applications on low-level infrastructure that requires our IT staff to manage them. Alternatively, we can build them using higher-level services that reduce the management, architecting & scaling requirements of the core infrastructure. ✓

On premises :- (Private cloud Deployment)

* Deploy resources by using virtualization & resource management tools.
* Increase resource [struck-out] utilization by using application management & virtualization Technologies ✓

Hybrid Deployment :-

* Connect cloud based resources to on premises infrastructure.
* Integrate cloud based [ditto] with legacy IT applications.

[Scanner watermark: Scanned with OKEN Scanner]

---

## Page 3

Benefits of cloud Computing :- (3)

(Margin note, top right:) upfront expense → Data centers, physical probable:[costs]

→ Trade upfront expense for variable expense.
→ Stop spending money to run & maintain data Centers.
→ Stop guessing Capacity. (No predictions)
→ Benefit from massive economies of Scale.
→ Increase speed & Agility.
→ Go global in Mins

(Margin notes, right side:)
cost effective → Flexibility → Good ROI with low cost
Flexible → can be able to change at any Condition

(Variable expense → you only pay for Computing resources you consume instead of investing heavily in data centers & servers).

How does the Scale of cloud Computing help you to save Costs?

→ The aggregated cloud usage from a large no of customers results in lower pay as you go prices.
⇒ It describes how Customers can benefit from massive economies of Scale in cloud Computing.

Module 2 :- Amazon Elastic Compute cloud (Amazon EC2) :-

→ Generally, we need probable:[raw] compute capacity to host the applications & provide the Compute power that according to the business needs.

→ When we are working with AWS, those servers are virtual & the servers we use to gain access to virtual servers is called EC2.
→ Using EC2 for Compute is highly flexible, cost effective & quick when we Compare it to running our own servers on premises in the data center that we own.
→ The time & money it takes to get up & running with on-premises resources is fairly high.

EC2 is :- (It is flexible, Reliable, Scalable)

[Scanner watermark: Scanned with OKEN Scanner]

---

## Page 4

Amazon EC2 getting started :- (4)

→ AWS Built Datacenters.
→ AWS Secured Datacenters.
→ AWS purchased Servers (Physical servers)
→ AWS Installed [ditto].
→ The servers are online & ready to use.

(All we have to do is request the EC2 Instances you want & they will launch & boot up, ready to be used within a few mins).
(Once you are done, you can easily stop or terminate the EC2 Instances).
(Your usage of EC2 Instances can vary greatly over time & you only pay for what you use.) Because with EC2, you only pay for running instances, not stopped or terminated instances.

→ EC2 runs on top of physical host machines managed by AWS using Virtualization Technology. When we spin up an EC2 Instance, we aren't necessarily taking an entire host to yourself. Instead, we're sharing the host with multiple other instances otherwise known as Virtual machines.
→ And a hypervisor running on the host machine is responsible for sharing the underlying physical resources b/w the Virtual machines.
→ This idea of sharing underlying hardware is called Multitenancy.
→ The hypervisor is responsible for Coordinating this multitenancy & it is managed by AWS.

Amazon EC2 Configurations :-

→ We can choose the OS :- Based on Windows/Linux
→ Beyond the OS, we can also configure what software we want running on the instance ⇒ Internal Business Apps, WebApps, Databases, 3rd party Software.

[Scanner watermark: Scanned with OKEN Scanner]

---

## Page 5

(5)

EC2 Instances are also resizable. You might start with a small instance, realize the application you are running is starting to max out that server, & then you can give that instance more memory & more CPU → Vertical Scaling.
In essence, you can make instances bigger & or smaller whenever you need to.

→ You also Control the networking aspect of EC2.
So what type of requests make it to your server & if they are publicly or privately accessible is something you decide.
→ AWS [struck-out] has just made it much, much easier & more cost effective for you to acquire servers through this Compute as a Service (CaaS).

AWS has different types of [struck-out] EC2 Instances :-

That we can spin up & deploy into our AWS environment.
Each Amazon EC2 instance type is grouped under an instance family & are optimized for certain types of tasks.
Instance types offer varying combinations of CPU, memory, storage & networking capacity &, give you the flexibility to choose the appropriate mix of resources for your applications.

Amazon EC2 Instance Families :-
→ General Purpose
→ Compute optimized
→ Memory optimized
→ Accelerated Computing
→ Storage optimized.

General purpose provides :-
→ Balanced resources.
→ Diverse workloads.
→ Web servers.
→ Code repositories.

Compute optimized Ideal for :-
→ Compute Intensive Tasks
→ Gaming servers.
→ High Performance Computing (HPC).
→ Scientific Modeling.

Memory optimized are good for :-
→ Memory Intensive tasks

Accelerated Computing good for :-
→ Floating point number Calculations.
→ Graphics processing.
→ Data Pattern Matching.
→ Utilize Hardware Accelerators

Storage optimized :-
→ High performance for locally stored data.

(Left-edge stray marks: "9", "g")

[Scanner watermark: Scanned with OKEN Scanner]

---

## Page 6

EC2 pricing :- (6)

Amazon EC2 purchase options :-

→ On-Demand.
→ Savings Plan
→ Reserved Instances
→ Spot Instances.
→ Dedicated Hosts.

----------------------------------------

On-Demand :- It means that you only pay for the duration that your instance runs for. This can be per hour, or per second, depending on the instance type & the OS you choose to run. Plus, No long-term commitments/upfront payments are needed. This type of pricing is usually for when you get started & want to spin up servers to test out workloads & play around. You don't need any prior contracts/communications with AWS to use on-demand-pricing. You can also use them to get a baseline for your [struck-out] average usage, which leads us to our next pricing option, Savings plan.

SavingsPlan :- It offers low prices on EC2 usage in exchange for a Commitment to a consistent amount of usage measured in dollars per hour for a 1 or 3 year term. This flexible pricing model can therefore provide savings of up to 72% on your AWS Compute usage. This can lower prices on your EC2 usage regardless of instance family, size, OS, tenancy/AWS region. This also applies to AWS Fargate & AWS lambda usage, which are serverless compute options [struck-out].

Reserved Instances :- These are suited for steady-state workloads or ones with predictable usage & offer you up to a 75% discount versus on-demand pricing. You qualify for a discount once you commit to one/3 year term & can pay for them with 3 payment options :-

All upfront, where you pay for them in full when you commit; & no upfront
partial upfront, where [ditto] [ditto] [ditto] a portion [ditto] [ditto] [ditto].
No upfront, where you don't pay anything at the beginning.

[Scanner watermark: Scanned with OKEN Scanner]

---

## Page 7

Spot Instances :- They allow you to request Spare Compute Capacity for up to 70% off of the On-Demand price. The catch here is that AWS can reclaim the Instance at any time they need it, giving u a 2 min warning to finish up work & save state. You can always resume later if needed.

Dedicated Hosts :- They are physical hosts dedicated for your use for EC2. These are usually for meeting Certain Compliance requirements & nobody else will share tenancy of that host.

(Major benefit of AWS :- Scalability & Elasticity)

Scaling Amazon EC2 :- (Backup)

→ Scalability :- The ability of an organization (or a system, such as a Computer Network) to perform well under an increased / expanding workload.

→ Elasticity :- Ability of a deformed material body to return to its original shape & size when the forces causing the deformation are removed.

Scaling up :- It means adding more power to the machines that are running.

→ Amazon EC2 Auto Scaling :- Adds the Instances based on demand & then decommissions Instances when they are no longer needed.

This means that every min of the day, we always have the correct no. of Instances.

Directing traffic with Elastic load Balancing :-
When you have multiple EC2 instances all running the same program, to serve the same purpose & a request comes in, how does that request know which EC2 instance to go to? How can you ensure there's an even distribution of workload across EC2 instances? [crossed out] So not just one is backed up while the others are idle sitting by. You need a way to route requests to instances to process that request.

What u need to solve this is called Load Balancing.

→ A Load Balancer is an application that takes in requests & routes them to the instances to be processed.

Now, there are many off the shelf load balancers that work great on AWS. In which case it will be up to your operations team to install, manage, update, scale, handle [crossed out] fail over & availability. It's a hassle.

---

## Page 8

(circled: 8)

Properly Distribute Traffic :-

→ High Performance.

→ Cost efficient.

→ Highly Available.

→ Automatically Scalable.

Elastic Load Balancing (ELB) :- It is automatically scalable. As your traffic grows ELB is designed to handle the additional throughput with no charge to the hourly cost. When your EC2 fleet auto scales out, as each Instance comes online, the auto scaling service just lets the ELB service know that it's ready to handle the traffic & off it goes. Once the fleet scales in, ELB first stops all new traffic & waits for the existing requests to complete to drain out. Once they do that's, then the auto scaling engine can terminate the Instances without disruption to existing customers. ELB is not only used for external traffic.

[Diagram: a stack of 4 server boxes on the left, arrows marked (Traffic) pointing into a large circle labeled ELB in the middle, two small user circles beside it, then arrows fanning out to a stack of 2 paired server boxes on the right. Left stack labeled: probable:[On-premises] Tier (Front-End). Right stack labeled: Production Tier (Back-End).]

[Boxed side note] Messaging & Queuing :-

Applications send msgs to each other to communicate.

If applications communicate directly → then it will be tightly coupled architecture.

If a single component fails/changes, it causes issues for the other components or even the whole system.

For ex :- If we have Application A & it is sending msgs directly to Application B, If App B has a failure & can't accept those msgs, App A will begin to see errors as well. This is a tightly coupled architecture.

---

## Page 9

(circled: 9)

[Diagram 1: [App(A)] ⇒ (Msg Queue: [▷ ○ ○ ◁]) ⇒ (App (B)]

If App (B) → can't accept :-

[Diagram 2: [App(A)] ⇒ (Queue is. [▷ ○○○○○ ◁]) ⇒ [App (B)] (App B box crossed out)]

[App (B) box next to this line is scribbled out/marked over]

[crossed out] If App (B) ⇒ Accessd

[Diagram 3: [App (A)] ⇒ [▷ ○ ◁] ⇒ (App (B)]

And this brings 2 AWS Leauiues probable:[services] :-

i) Amazon SQS
   (Simple Queue Service)

ii) Amazon SNS
   (Simple Notification Service).

Amazon SQS :- It allows us to :-

→ Send Msgs

→ Store Msgs

→ Receive Msgs

} This is without losing msgs or requiring other services to be Available.

(Payload :- Data contained
  with a msg).
  (It is protected until
  delivery).

Between Software Components at any volume.

Amazon SQS Queues :- Where messages are placed until they are processed.

Amazon SNS :- It is similar in that it is used to send out msgs to services, but it can also send out notifications to end users.

It does this in a different way called a publish/subscribe.

Ex :- Youtube channel subscribe → we get notifications.

(A channel for msgs to be delivered); SMS, email.

Monolithic Applications & Microservices :- (In this Approach to Application Architecture, if a Single Component fails, other ll fails, entire App fails)

Applications are made of multiple Components. The Components communicate with each other to transmit data, fulfill requests & keep the application running.

Suppose that u have an application with highly coupled Components. These Components might include databases, servers, the user interface, business logic, etc. This type of architecture can be considered → Monolithic App.

Microservices :- To help maintain application availability when a single component fails, we can design [crossed out] our application through a micro -vice approach.

---

## Page 10

(circled: 10)

Additional Compute Services - AWS offers multiple Serverless Compute options.

Serverless means that you can't actually see or access the underlying Infrastrucuture or instances that are hosting your application. Instead, all the management of the underlying environment from a Provisioning, scaling, high availability & maintenance Perspective are taken care of for you. All you need to do is focus on your application & the rest is taken care of. AWS Lambda is one Serverless Compute option.

It is a service that allows you to upload your Code into what's called a

Lambda fn.

Configure a trigger & from there, the service waits for the trigger. When the trigger is detected, the Code is automatically run in a managed

environment.

( It is more suited for Quick processing like a web backend, handling reqs

or a backend expence report processing service ).

→ If u still want the efficiency & portability ⇒ go through

   ⇒ AWS Container Services

      Amazon Elastic CS [overhead: Services]

      Amazon ECS . or Amazon Elastic

               Kubernetes

               Services

               Amazon (EKS)

(Both of these services are container orchestration tools)

AWS Fargate :- It is a Serverless Compute platform for ECS or EKS.

Compute Services!

[crossed out: word] Host Traditional Apps

* Full access to the OS.

* Use Amazon EC2.

| If you looking to host short running fns.

* Service oriented apps.

* Event driven apps.

* No provisioning or managing servers.

(AWS Lambda)

---

## Page 11

(circled: 11)

for Docker Container based workloads on AWS

→ Amazon ECS or EKS.

→ Platform ⇒ Amazon EC2 that u manage on in a Serverless environment ⇒ AWS Fargate.

Module 3 :- Global Infrastructure & Reliability :- (⊛ Many branch offices)

⇒ It's not good enough to have 1 giant data center & all of the [illegible] are.

If smthng happens to that data center, like a power outage / Natural disaster ⇒ Everyone's Applications would go down all at once.

⇒ We need high availability & fault tolerance.

Turns out, it's not even good enough to have 2 giant data centers. Instead, AWS operates in all sorts of different areas around the world called Regions. ( [illegible] )

AWS Regions :- Inside each region, we have multiple data centers that have all the Compute, Storage & other Services we need to run [crossed out] Applications.

⇒ Each Region can be connected to each other Region through a high speed fiber network, controlled by AWS, a truly global operation from corner to corner if u need it to be.

⇒ Any data stored in a particular region will be stayed in that region unless we explicitly, with the right Credentials & permissions request the data to be exported.

⇒ Regional data Sovereignty is part of the critical design of AWS Regions: With data being sub to the local laws & statutes of the Country & the Region probable: laws.

---

## Page 12

(circled: 12)

There are 4 business factors that go into choosing a Region :-

i) Compliance :- Before any of the other factors, u must look at your compliance requirements.

Do u have a requirement? your data must live in UK boundares probable:[boundaries]?

Then u should choose the London Region, full stop.

None of the rest of the options matter.

Most governance, though are not governed by such strict regulations.

(Side note) So if u don't have a compliance or regulatory control that dictates ur regions then u can look at the other factors.

[crossed out: word] ii) Proximity :- How close u are to ur customer base is a major factor because Speed of light, still the law of the Universe.

Latency :- The time it takes for data to be sent & received.

iii) Feature Availability :- Sometimes, the closest region may not have all the AWS features u want. We constantly innovating on behalf of our customers. Every year, AWS releases 1000s of new features & products specifically to answer customer requests & needs.

But sometimes those brand new services take a lot of new physical hardware that AWS has to build out to make the service operational & sometimes that means we have to build the service out one Region at a time.

iv) Pricing :- Even when the hardware is equal tb 1 Region to the next, some locations are just more expensive to operate in.

Prices can be determined by the many factors, so AWS has very transparent granular pricing.

---

## Page 13

Availability Zones :- (13)

AWS has dataCentres, Lots of DataCentres, all around the world & each Region is made up of multiple DataCentres. AWS Calls a Single data Centre or a group of data Centres → an Availability Zone or AZ.

Each AZ is one/more discrete data Centres with redundant power, networking & Connectivity.

When u Launch an Amazon EC2 instance, it Launches a virtual machine on a physical Hardware that is installed in an Availability Zone.

This means each AWS Region Consists of multiple Isolated & physically Seperates the AZs within a geographic Region. But we don't build AZ right next to each other because if a large scale incident were to occur, like a Natural Disaster then we could lose the Connectivity to everything in that AZ.

[Diagram: Data Centers — ① → (2) Distance probable:[Ekkarava Vyadali] (Data Centres) ③ — arrow from ① to (2), with (2) far away from ③]

Recommendation :-
        Run across at least 2 AZs in a Region.

Edge Locations (EL) :- Caching Copies of data closer to the Customers all around the world uses the Concept of Content delivery networks / CDN's.

CDN's are Commonly used & on AWS
we Call our CDN Amazon Cloudfront (ACP)
ACP → Service that helps deliver data, video, Applications & API's to Customers around the world with Low Latency & high/Speed transfers.

ACP uses Edge Locations, all around the world to help accelerate Communication with users, no matter where they are.

☑ EL are seperate from Regions, So u can push Content from inside a Region to a Collection of Edge Locs around the world, in Order to accelerate Communication & Content delivery.
AWS EL, also run more than just ACF. They run a domain name Service (DNS) known as Amazon Route 53, helping direct Customers to the Correct web Locs with incredibly Low Latency.

---

## Page 14

(14)

AWS Outposts :- AWS will basically install a fully operational mini Region, right inside our own data Centre. (That is owned & operated by AWS, using most of probable:[AWSecurity], but Isolated within us own building.)

& → AWS Edge locs run ACF to help get Content closer to our Customers. No matter where they are in the world.

AWS Outposts :- Allows us to run AWS Infrastructure right in our own data Centre.

Provision of AWS Resources :- API's → Application Programming Interface

⇒ There are pre determined ways for u to interact with AWS Services & u can invoke / call these API's to provision, Configure & manage ur AWS resources.

Ex :- u can launch an EC2 instance.

Interacting with AWS Services :-
        → AWS Management Console.
        → AWS CLI (Command Line Interface)
        → AWS Software Development Kit (SDKs)
        → Various other tools → AWS CloudFormation.
        to Create requests to send to AWS API's to Create & manage AWS Resources.

AWS Management Console ⇒ * Test environments, view AWS Bills, view monitoring, work with Non-Tech resources:
        (Browser based through the Console).

AWS CLI :- It allows to make API Calls using terminal on ur Machine:
        Commands to launch/run
        Script.

SDKs → Allow us to interact with AWS resources through various programming Languages.
        (It makes easy for developers to Create programs that use AWS without using the low probable:[lvl] API's.)

---

## Page 15

AWS Elastic Beanstalk (EBS) :- Service that helps us to provision Amazon EC2 based environments. Instead of Clicking around the Console or writing multiple probable:[Cmnds] to build out ur network, EC2 Instances, Scaling, EBS.

we Can Instead provide ur App Code & desired Configurations to the AWS EBS which then takes that info & builds out ur environ for you.

AWS EBS makes it easy to save environment Configurations, so they Can be deployed again easily. AWS EBS gives Convenience of not having to provision & manage all of these pieces seperately, while Still giving u the visibility & Control of underlying resources. [annotation: Focus on App Not infra]

AWS CloudFormation :- Infrastructure as a Code tool that allows u to define a wide variety of AWS resources in a declaritive way using JSON/YAML text based docs. → Called CloudForm templates.
It defines us what we want & Supports many diff AWS resources from databases, Storage, ML etc.
It manages all the backend AWS API Calls.

Module -4 :- Networking :-

Amazon VPC (Virtual Private cloud) → A VPC lets u provision a logically isolated section of the AWS cloud & u can launch AWS resources in a virtual network that u define. These resources can be public facing so they have access to the Internet, or private with no Internet access, usually for backend Services like databases/Application Servers.
The public & private grouping of resources → Subnets & they are ranges of IP Addresses in ur VPC.

Connectivity to AWS :- VPC's essentially our own private network in AWS.
A VPC allows us to define our private IP range for ur AWS resources & we place things like EC2 Instances & ELB inside of our VPC.
Subnets are Chunks of IP addresses in our VPC that allow us to group resources together.

---

## Page 16

Public Traffic :- (Internet Gateway is used to Connect a VPC to the Internet).

(16)

[Diagram: Public Traffic (dots) → oval → box: "Security" with circles connected (ELB) → box "Security grp" (spiky icons) → box "Sec grps / DES" → arrow out. Label "Internet gateway" below.]

In order to allow traffic from the Public Internet to flow intro & out of ur VPC, u must attach what is Called → Internet Gateway (IGW) probable:[(Valle Thalupu)]
IGW is like a doorway i.e open to the public.

Private Traffic :-

[Diagram: Private traffic (dots) → lock → "Same Diagram". Public Traffic (dots) squiggling into the lock (blocked). Below: "DC Traffic | DC | Same Pin/Data Center" — a grid connecting to a Data Center.]

(Lowest Latency & Highest amount of Security) ↓

we want the private gateway that allows only people in if they are coming from an approved network. Not the public Internet.
→ This private doorway is known as Virtual private gateway.
& it allows you to create a VPN Connection b/w a private network.

AWS Direct Connect (AWS DC) :- DC allows us to establish a completely private, dedicated fiber Connection from ur data Center to AWS. You work with a DC partner in ur area to establish this Connection. AWS DC → physical line that connects ur network to ur AWS VPC.

AWS DC → It can be used to establish a Private dedicated Connection b/w ur Company's data Center & AWS.

---

## Page 17

Subnets & Network Access Control Lists (ACL's)

AWS has a wide range of tools that Cover every layer of Security:-
→ Network Hardening
→ Application Security
→ User Identity
→ Authentication & Authorization.
→ Distributed Denial of Service prevention.
→ Data Integrity.
→ Encryption.

[Diagram: VPC containing Subnet containing EC2]
VPC → Internet gateway | Subnet → ACL | EC2 → Sec grps

Network Hardening :- [envelope icon] → Packets

[Diagram: VPC with "IGW" → Public Subnet / Private Subnet boxes. Second diagram: packet → "If ✓" passes to Public Subnet; packets → ACL; "If ✗" blocked/looped back.]

Subnets can also Control Traffic permissions
Packets are messages from the Internet, every packet that Crosses the subnet boundaries gets checked against Something Called ACL's.

ACL's → Passport Control officers.
→ It check is to see if the packet has permissions to either leave/enter the subnet based on who it was Sent from & how it's trying to Communicate.

ACL → evaluate a packet only if it Crosses a subnet boundary (in/out).
It doesn't evaluate if a packet can reach a specific EC2 Resource or not.

⇒ Sometimes, we will have the multiple EC2 Instances in the same Subnets, but they might have diff rules around who can send them msgs, what port Those msgs are allowed to be Sent to. So u need instance level network Security as well.

→ we introduce → Security groups.
Every EC2 instance, when it's launched, automatically Comes with a Security group. & By default, the Security group doesn't allow any traffic in to the instance at all. (All ports are blocked) All IP addresses Sending packets → blocked.

---

## Page 18

(18)

[Diagram: Subnet → machine B → machine A → "security grp"; machine B also connects to A below with ✗ / envelope.]

If u want an Instance to actually accept traffic from the outside, like Say a message from a front end Instance / message from the Internet.

So obviously, u can modify → Security grp to accept a Specific type of traffic.

In the Case of website, u want web based traffic / HTTPS to be accepted but not other types of traffic, Saying OS/Administration reqs. If NACLs are a passport Control, a Security grp is like the doorman [doorknob icon] at ur building, the building being the EC2 instance in this Case.

The doorman will check a list to ensure that Someone is allowed to enter the building but won't bother check the list on the way out. With Security grps, u allow Specific traffic in & by default, all traffic is allowed out.

[Diagram: Subnet: HTTPS (envelope) → ✓ to security grp machine → only HTTPS allowed coming In; EC2 (SMTP/icon) → ✗ blocked/looped below.]

ACL → Stateless & allows all inbound & outbound traffic.

[Two-column diagram:]
Security grp                                          Network ACL
→ Stateful & deny all Inbound traffic by def.     → Stateless (Which remembers nothing)
(It has Some kind of memory when it                   (Checks every single packet that Crosses its border
Comes to who follows in/out)                          regardless of any Circumstances)
                                                              → (It always checks its list (own list))

Ex :- let's Start with Instance A. We Wanna Send a packet from Instance A to B in a diff Subnet, Same VPC, diff Subnets. So (Ins A) Sends the packet. Now, the 1st thing that happens is that packet meets the probable:[boudery] of the Sec grp of Ins A. By default, all outbound traffic → allowed from a Sec grp.
The packet made it past the Security grp of Ins A. (Now it has to leave the Subnet boundary.)

---

## Page 19

at the boundary, the passport must now make it through passport control, the network ACL . The ACL doesn't care about the edict the security gaf allowed. It has its own list of who can pass & who can't.

If the target address → allowed → U can keep going on ur journey, which it is.

now, we have exited the original subnet & now the packet goes to the target subnet + Instance B lives.

Now at this target subnet, once again, we have the passport control. Just because the packet was allowed out of its home country doesn't mean that it can enter the destination Country/subnet in this Case.

They both have unique passport officers with their own checklists . U have to be approved on both lists , or u could get turned away at the border . Well, turns out the packet was on the approved list for this subnet , so it's allowed to enter through the network ACL into the subnet.

[Diagram: wifi symbol between two boxes. Left box labeled "Subnet 1"
"Subnet 1" — contains "EC2 Instance (A)" with "Pct" (packet) inside and an arrow, circles/icons beside, labeled "Security grp" — box outlined and labeled below "subnet boundary". Arrow out of box → towards second box, "ACL" label between. Right box labeled "Subnet 2" — contains "grp EC2" and "Instance B".]

[Right column, separated by vertical line:]
Now, we are approaching the target Instance, probable:[Ins B] .

Every EC2 #Instance has their own sec grp.

You wanna enter this Instance, the doorman will need to check to see if u r allowed in , we are on the list.

The packet has reached the target Instance. once the transaction is Complete, Now it's just time to come home". It's seturn traffic pattern.

& Vice versa in reverse .

---

Global Networking :—

→ Amazon Route 53 (DNS) → Domain Name Server.
    → It's Highly available & Scalable.

DNS → Trans lation Service . But instead of translating b/w languages , it translates website names into IP addresses that Computers can read .
for e.g.: When we enter a website address into our browser , it contacts Route53 to obtain the IP address of the Site , say 192.1.1.1 , then it routes ur computer/browser to that address .

---

## Page 20

Amazon Route 53 routing policies :—

→ Latency based routing .
→ Geolocation DNS .
→ Geoproximity
→ Weighted Round Robin

(circled: 20)

[Right column, separated by vertical line:]
If we take geolocation DNS , that means we direct traffic based on [probable: where the] customer ?s located .
→ E.g:- So traffic from North America is routed to the Oregon Region.

We can use Route 53 to register the Domain Names , so we can buy & manage our own domain names right on AWS.
Speaking of websites , there ?s another service which can help ACF that speed up delivery of website assets to customeres.

---

Module 5 :— Storage & Databases :—

Instance Stores & Amazon Elastic Block Store :—

Block level storage : [icon] U can think of Block level storage as a place to store files.
A file being a series of bytes that are stored in blocks on disc.
when a file is updated, the whole series of blocks are not all overwritten. Instead, it updates just the pieces that change . This makes it an efficient storage type. When working with applications like databases, enterprise software or file systems .

When u use our laptop or Pc , you are accessing block-level storage . All block level storage is in this case is in hard drive .

EC2 Instances have hard drives as well & those are few diff types.

When u launch an EC2 Instance, depending on the type of the EC2 Instance u launched, it might provide u with local storage called Instance store volumes.

These vol are physically attached to the host , your EC2 instances running on [scribbled-out text] top of .

& u can write to it just like a normal hard drive .

The catch here is that since this vol is attached to the underlying physical host, if u stop or terminate our EC2 instance , all data [crossed-out word] written to the instance store vol will be deleted.

---

## Page 21

[continuation from previous page; left edge slightly cut]

The reason for this, is that if u start ur Instance from a Stop state, it [cut: al]ready start [cut] — instance will start up on another host . A host whereas that vol does n't exist . Remember, EC2 instances are virtual machines & therefore the underlying host can change after stopping & starting an Instance . Because of this ephemeral or temporary nature of Instance Store volumes, they are useful in situations + u can lose the data being written to the drive such as temporary files , scratch data & data that can be easily recreated without consequences .

(2) [Diagram: cloud (scribbled) → EC2 ; box labeled "physical host" (with signal icon) below, labeled "(local storage) (instance store vol)" ; "Hypervisor" label]

if EC2 gets terminated then local storage will be vanished / deleted

[Diagram: cloud → EC2 → Hypervisor → AWS host .]

Amazon Elastic Block Store (EBS) :— with EBS, we can create virtual Hard drives, that we call EBS volumes, that u can attach to ur EC2 Instances. These are separate drives from the local Instance Store volumes, & they aren't tied directly to the host & [crossed-out mark] u are easy is to running on .

This means, that the data that u write to an EBS volume can persist thru stops & the starts of an EC2 Instance .

EBS volumes come in all diff. sizes & types . ——→ [bar chart icon]

[Diagram: cloud icon over a box; small box labeled "EBS", big box labeled "AWS host"]

How this works, is u define :—
→ Size , type & configurations of vol u need .

Provision the vol, & then attach it ur EC2 Instance . From there, u can configure ur application to write to the vol & you're good to go . If u stop & then start the EC2 Instance, the data on the vol remains . Since the use case for EBS vol . is to have a hard drive that is persistent, that ur application can write to .

It's probably imp that u back that data up.

EBS allows u to take incremental backups of ur data → Snapshots .

It's very imp that u take Snapshots of ur EBS volumes . This way, if a drive ever becomes corrupted , u [crossed-out: have to] launch host w data , & u can restore that data from a snapshot .

---

## Page 22

Amazon S3 :— (Simple Storage Service :— Bucket)   (circled: 23)

Amazon S3 :- It allows us to store & retrieve an unlimited amount of data at any scale . Data is stored as objects but instead of storing them in a file directory, u can store them in a [crossed-out word: directory] buckets.

Think of a file sitting on ur hard Drive, that is an object & think of a file directory → that is the Bucket .   [sidebar: Store data as obj / [probable: n obj in Buckls] / 5TB max . || version obj / Create multiple buckts]

The max object size → 5TB .

You can also version objs to protect them from accidentl deletions & an [uncertain: deposit] .

What this mans ?s that u always retain the previous versions of objects , as like a paper trail . U can even Create multiple buckets & store them across diff classes or tiers of data . U can then Create permissions to limit who can see or even access objects . & u can even stage data b/w different tiers These tiers offer mechanisms for different storage use cases such as data that needs to be retained for several years .

S3 Standard → Comes with 11 nines of Durability .   (margin note: AWS can sustain the concurrent loss of data in 2 separate storage facilities)

That means an obj stored in S3 Standard has 99.999999999% [11 9's] of Durability.

→ Data ?s stored in such a way that AWS can sustain the concurrent loss of data in 2 separate storage facilities .
    → This is because data ?s stored in at least 3 facilities .

So multiple copies reside across locs .

Another way of useful to use S3 → Static website Hosting , → Collection of HTML files

& u can simply offloading all ur HTML , static web assets , & so forth into a bucket & then checking a box to host it as static website. U can enter the bucket URL → Instant website [probable: & we say static] .

Amazon S3 Standard Infrequent Access ( S3-Standard-IA ) ( S3-IA )   | Which is used for data that ?s accessed less frequently but requires rapid access when needed . It means perfect place to store backups , decade old [probable: money] files

---

## Page 23

Amazon S3 Glacier :- If Required to archive the data .   ( S3 G )

To use Glacier, u can simply move data that [probable: u won't translate] to wills [probable: vaults] & then populate them with archives . U can deploy an S3 Glacier vault lock policy & lock as well.

U can specify controls such as write once/read many on WORM [probable], as [probable: a vault lock policy] & lock the policy from future edits . Once locked, the policy cannot be changed .

Amazon S3 Lifecycle Mgmt :— Move data automatically b/w tiers.
        TiB = 1:1TB

Amazon EBS :- [cylinder icon]
(roughly, size up to)
→ Size → 16 TiB
→ Survive termination of their EC2 Instance .
→ Solid state by default .
→ HDD options : ( Spinning platters )

[Right column, separated by vertical line:]
S3 [funnel icon]
→ Unlimited storage
→ Individual objs → 5TBs
→ WORM .
→ 99.999999999%. Durable .

( for updates → EBS )

S3 :- (Images ⟿)   | Obj storage — It totals any files as complete discrete obj ( Change → Re-upload )   || Block Storage — breaks the files into small component parts/blocks . ( updates the block ).

→ Web enabled
→ Regionally Distributed
→ Offers cost savings
→ Serverless

If u are using complete objs :—

Occasional changes → S3 ⟿   | If u are doing complex read, write, img change Freq → EBS ⟿

Amazon EFS ( Elastic File System ):—
    EFS → managed file system
    Extremely common for businesses to have shared file systems across their apps.

e.g.:- U might have multiple servers running analytics on large amount of data being stored in a shared file system . This data traditionally has been hosted on premises .
In this on-pre , u would have to ensure that the storage u have can keep up with the amount of data that ur storing . Make sure backups are taken, & the data is stored redundantly as well as manage all the servers hosting that data .

---

## Page 24

with EFS, u can keep existing file systems in place .   (circled: 24)
→ EFS :- Multiple Instances can access the data on EFS at the same time . It scales up & down as needed .

AMAZON EBS :—
[margin note: EBS volumes store data within a single AZs / EFS multiple AZs]

→ volumes attach to EC2 Instances .
→ Availability zone level resource .
→ Need to be in the same AZ to attach EC2 instances .
→ U can save files on it / run a Database / store Applications . ( Hard Drive )
→ Volumes do not automatically scale to give u more storage .

EFS :-
→ Multiple Instances reading & writing simultaneously .
→ Linux file System .
→ Regional resource .
→ Automatically scales .

[margin note: Amazon RDS storing data in an Amazon Aurora Database & using SQL to organize data]

Amazon RDS ( Relational Database System ) :- [scribble above heading: source DBMS] It means we store data in a way such that it relates to other pieces of Data .
( Ex :- If we had a Customer Entry/record, we store that in Customers Table ) .
( SQL ) > Structured Query language )
Database sys → MySQL , PostgreSQL , Oracle , Microsof tSQL etc .   [margin note: probable:( community? )]
But is there a way to easily move them to the cloud? ⇒ Yes .
    We can do Lift & Shift & migrate ur Database ( DB ) to run on Amazon EC2 .

⇒ The other option for running your DBs in the cloud is to use a more managed service called Amazon RDS . ( It supports all the major DBs probable:[by e.g.] ).
→ It includes :- Automated patching , Backups , Redundancy , failover , Disaster recovery .
    [small note: → clicks backup every 5 probable:[min]]
    → (Point in Recovery)
Amazon Aurora :— ( Most managed Relational Database Option ) → 2 forms → MySQL , PostgreSQL
( upto 15 Rep ) ( Data Replication ) ( 1/10th cost of Commercial/DB's )

---

## Page 25

(probable:25)

Amazon DynamoDB:— (Seamless Database)

→ It is a Non-Relational, No-SQL Database. (Simple flexible Schemas / not complex)

→ It is purpose built ⇒ it has a specific Use cases & it is not the best fit for every
workload out there.
(dataset)

→ It has millisecond response time (Highly Scalable)

→ It is fully managed & it is highly scalable.


(With DynamoDB, u create tables. A DynamoDB table is just a place -t u can
store & query data.) Data is organised into items, & items have attributes.

Attributes are just diff features of data.

If u have 1 item in ur table of 2 Million items in a table, DynamoDB manages
the underlying storage for u. (Need not to worry about the scaling of the
system).

Dynamo DB stores this data redundantly across AZs .


[rule]


Amazon RDS :—

→ Automatic high availability, recovery provided.

→ Customer ownership of Data & Schema. (Control)

→ Customer Control of network.


Amazon DynamoDB :—

→ The NoSQL using key-value pair ⇒ No advanced Schema.
Able to operate Global Database.

→ Massive throughput capabilities.

→ PB (Peta byte) Scale potential.

→ Granular API access .

Scanned with OKEN Scanner

---

## Page 26

Amazon Redshift:— (ARS) (used to query & Analyze data across a data warehouse)

Take Workloads ⇒ They are engineered specifically for this kind of Big data, -t
u are looking at historical analytics as opposed to operational analysis.

→ Historical may be as soon as :— Show me last hour's sales nos across all the
stores. The key thing is, the data is now set. (26)

ARS ⇒ It is data Warehousing as a Source.

⇒ Massively Scalable.

RS (Nodes in multiple petabyte sizes ⇒ very Common).

In fact, in cooperation with Amazon RS spectrum, u can directly use a
single SQL query against exabytes of unstructured data running in data lakes.

⇒ But it's more than just being able to handle massively larger data sets.

⇒ RS uses a variety of innovations that allow u to achieve up to 10 times
higher performances than traditional DBs, when it comes to business intel-
ligence workloads.

→ RS allows u to get started with a single APPcall.


[rule]


AWS Database Migration Service (AWS DMS):—


AWS DMS ⇒ enables us to migrate relational databases, Non-Relational DBs
& other types of data stores onto AWS in a secure & easy fashion,


→ The Source DataBase (DB) remains fully functional during the migration.

⇒ Downtime is minimized for applications that rely on that database.

→ The Source & Target databases don't have to be of the same type.

(Databases that are of same type (source/target) ⇒ Homogenous Migrations) & can be
from MySQL to Amazon RDS for MySQL, Microsoft SQL Server to Amazon RDS for
SQL Server. The process is fairly straight forward since schema structures,
datatypes & database code is compatible b/w Source & Target.

The Source can be on premises, Amazon EC2, Amazon RDS
The Target can be a Database in Amazon EC2, Amazon RDS.

Scanned with OKEN Scanner

---

## Page 27

(probable:27)

[Diagram:]
(Source) ⟶ (AWS DMS) ⟶ (Target)

(On premises)      " " ↑ " "               (⇗ Target)
(Amazon EC2)       (AWS DMS)              (Amazon EC2)
(|| RDS)                                   (|| RDS)

2nd Type ⇒ Heterogenous migrations when Source & Target Databases are
of different types. (2 Step process)


[Diagram:]
(Source) ⟶ (AWS DMS) ⟶ (Target ++)

✓ Schema structure
✗ Data types
✓ Database Code.

(after this) Same step


But these are not the only use Case for DMS

Others Include :—

→ Development & test Database Migrations.
   (when u want to develop this to test against production data but without
    affecting production users.)

→ Database Consolidation.
   (Is when u have Several DBs & want to
    consolidate them in 1 central DB ).

→ Continuous Database replication.
   ↓
   (Is when u use DMS to
    perform cts Data Replication.)
   (This Could be for disaster recovery or because geographic separation).


Additional Database Services — There is no one type fits all database for all
Purposes.


Amazon DocumentDB → Great for Content management, catalogs, user
                                     Profiles.

Amazon Neptune ⇒ A graph database, engineered for social networking &
recommendation engines, also great for fraud detection
needs.

Scanned with OKEN Scanner

---

## Page 28

(28)

Amazon Manged Blockchain :— It solves the part of the Equations, but adds
                             a huge decentralization Component.


Amazon QLDB/Quantum Ledger DataBase

⇒ An immutable System of record -t any entry can never
  be removed from the Audits.


DAX → The DynamoDB Accelerator (A native caching layer designed to
                                dramatically improve read times for ur non-relational data)


[rule]


Module 6 :— Security :—

AWS Shared Responsibility Model:—

[Table:]

Customer           | Customer Data
Responsible for    | Platform, Applications, Identity & Access Management.
security "in" the  | Operating System, Network & firewall configuration."
cloud ?            | Customer side      | Source side    | Network Traffic
                   | data encryption    | Data Encryption| Protection .
                                                             EC2:
                                                             | Data
                                                             | Application
                                                             | OS

AWS                | AWS foundation Services :—
Responsible for    | Compute | Storage | Database | Networking
security "of" the  | AWS global         Regions
Cloud              | Infrastructure     Edge locs
                                      AZs
                                                             probable:[Hypervisor]
                                                             Network
                                                             Physical


⇒ When it Comes to securing the business on AWS ⇒ The Customer & AWS are both
responsible for the Security. (Patching Software on Amazon EC2 instances
setting permissions for u r S3 objs) → Customer side


Ex:— The Builder Constructed the house with 4 Walls & a door.
It's their responsibility to make sure the walls are strong & the doors
are solid. (AWS)

→ It's u r responsibility the homeowner, to close & lock the
doors. (Customer)

Scanned with OKEN Scanner

---

## Page 29

(29)

User Permissions & Access :— (IAM policy:— Doc that grants/denies permissions, to
                                                              Sources & resources)


→ When u create an AWS Account, u are given what is called the root acc
user &  has permission to do anything they want inside of that acc .

→ AWS acc root user ⇒ Access & Control any resource in the acc .
   We can spin up EC2 instances, databases, blockchain services or
   literally anything. Because that user is so powerful .

→ You turn on Multi factor Authentication (MFA) :— To ensure that u need not
only the email & password but also a randomized token to log in.


⇒ You Control access in a granular way by using the AWS Service, AWS
Identity & Access Management (IAM).

u Can Create IAM users. When u create an IAM user, by default,
It has no permissions. The user Can't even log into the AWS acc at
1st, It has absolutely zero permissions. It Can't launch EC2 instances,
Can't create S3 Buckets, Nothing . You have to explicitly give the user permis-
sions to do anything in that acc.

→ By default, all actions are denied. u have to explicitly allow any action
done by any user. u give people access only what they need & nothing else

→ known as Least privilege principle.

→ The way that u grant/deny permission is to associate what is called an
 IAM policy to an IAM user .

→ An IAM policy is a JSON doc that describes what API calls a user Can
or Can't make .

⇒ Effect : Allow/Deny , Action: Any AWS API Call .
   Resource : which AWS resource the API Call is for.

→ 1 way to make it easier to manage u r users & their permissions is to
organize them into IAM groups .

AWS IAM :— Root user, Users, Grps, Policies, Roles.

⇒ U Can Create Identities in AWS that are called Roles.
                                               (Access to - temporarily permissions)

⇒ Roles :— Associated permissions that allow/deny specific actions & Assured for
temporary amount of time . (Similar to user, but no username & Password)

Scanned with OKEN Scanner

---

## Page 30

(30)

AWS organizations :—

1 way to install order &  to enforce who is allowed to perform certain functions
in what account is to make use of an AWS Service Called AWS Organizations .

The easiest way [illegible] to think of Organizations is as a Central location to manage
multiple AWS accs.

u Can manage billing Control, access, Compliance, Security & Share Resources
across u r AWS accs.


⇒ Centralized Management.

⇒ Consolidated Billing.

⇒ Hierarchical groupings of accs.

⇒ AWS Services & API actions access Control .
                      | Service Control policies
                      | (SCPs) :— to Specify
                      | the maximum permissions
                      | for member accs in the
                      | Organization .

                      | In essence, with SCPs, u can restrict which
                      | AWS Services, resources & Individual
                      | API actions, the Users & roles in
                      | Each member acc Can Access )


Complaince :— The act
of obeying a law/rules,
especially one that Controls
a particular industry or
type of work .
                (Inspection)

(An Organizational unit (Ou) & an Individual
 member acc (SCP Can Supply)).


⇒ GDPR (General Data Protection Regulation) :— If u run Software that
deals with Consumer data in EU, u would need to make sure that u rose
in Complaince with GDPR . (Shared responsibility).


[rule]


AWS Artifact:— 1 place u can access the documents is through a service
                    Called AWS Artifact .

⇒ With AWS Artifact, u Can gain access to Compliance reports
   done by 3rd parties who have validated a wide range of
   Compliance standards.


AWS Artifact [illegible] :—

Access AWS Compliance reports on demand .

Review, Accept & manage agreements with AWS .

Scanned with OKEN Scanner

---

## Page 31

(31)

Denial of Service Attacks :-


Distributed Denial of Service Attacks (DDoS):-

It's an attack on ur enterprise's Infrastructure.

The objective of a DDoS attack is to shut down ur app's ability to function by over-
whelming the system to the point it probable:[can no longer] operate.

>> In Nrml operations, ur app takes requests from clients & probable:[returns] results.

>> In DDOS, the bad actor tries to overwhelm the Capacity of ur app,
basically to deny anyone probable:[sources].

>> Problem: UDP flood (probable:weather) → Solution :- Security groups (only allow in probable:[proper] req, traffic) - will
(operate at the AWS
network level)

→ Problem :- Slowloris Attack (probable:[queue]te) ↓ solution :
ELB → Elastic Load Balancer.

⇒ For the cheapest, most Sophisticated attacks, AWS also offers Specialized
defense tools → AWS Shield with AWS WAF.

⇒ AWS WAF uses a webapp firewall to filter incoming traffic for the
Signatures of bad actors. It has extensive ML Capabilities, can recognize
new threats as they evolve & proactively help defend ur system against
an ever-growing list of destructive vectors.


Additional Security Services :-


→ Encryption :- Securing a msg/data in a way that only authorized parties
can access it.


→ Encryption at Rest :- At rest, we mean ur data is idle (just sitting & not
moving).


→ Encryption at Transit :- It means the data is travelling b/w Service &
client.
(across the probable:[services])

→ AWS KMS (Key management Service) :- Enables to perform encryption of
data through the use of Cryptographic keys.


Scanned with OKEN Scanner

---

## Page 32

(32)

→ Amazon Inspector → Helps to improve security & Compliance of ur AWS deployed
apps by running an automated security assessment against ur
Infrastructure.

Specifically, it helps to check on deviations of security best practices.


→ It consists of 3 parts:-

 i) Network configuration reachability piece

 ii) Amazon agent → Can be installed at EC2 instances.

 iii) Security assessment services


→ Amazon Guard Duty ← Another service dimension in our threat detection offering
( Analyzes <t> streams of metadata generated from
ur acc & network activity. )

Found on Amazon CloudTrail, VPC Flow logs, DNS logs

 → uses Integrated Threat Intelligence

 ( But runs independently from
 ur other AWS
 services ).

 → malicious IP addresses,
 anomaly detection
 & ML to identify
 threats more
 accurately


[rule]


An employee requires temporary access to create Several Amazon S3 buckets

→ IAM role is best choice for task.
 ( it can assume to gain temporary access to permissions )

→ MFA → Authentication process that provides an extra layer of protection
for ur AWS Acc.


→ The root user → The Identity that is established when u probable:[1st] create an
AWS Acc.


→ AWS Shield service helps protect ur apps against DDos attacks.


Scanned with OKEN Scanner

---

## Page 33

(33)

Module-7 :- Monitoring & Analytics:-


Monitoring ← The Idea of observing Systems, Collecting metrics, evaluating
those metrics over time & then using them to make
decision/take actions.

→ It's imp to set up mon in Cloud.


→ It will help u measure how ur Systems are performing, alert
u when things aren't right, & even help u debug & troubleshoot
issues.


Amazon Cloudwatch :- It allows u to monitor ur AWS Infrastructure &
Amazon CW | the apps u run on AWS in realtime.

 → It works by tracking & monitoring metrics.

 → Think of metrics as variables that are tied to ur resources .

 → CW allows us to create a custom metric Called Espresso
 count & once it hits 100, it alert staff to clean.

 ⇒ (CW Alarm) → u set a threshold for a metric, &
 when that threshold is reached cloudwatch can generate
 an alert & trigger an action.

 → CW integrated with SNS.


→ Access all ur metrics from a Central loc.

→ Gain visibility into ur apps, Infrastructure & services.

→ Reduce MTTR &, improve TCO .

→ Drive insights to optimize apps & operational resources.


[rule]


Amazon CloudTrail ( CT ) :- The principle is simple :- Trust but verify.

ACT records API calls for ur Acc. The recorded info includes the identity
of the API caller, the time of the API Call, the Source IP address of the
API caller & more . CT as trail of bread crumbs ( log of actions ) that
someone has left them.

Every request gets logged in the CT Engine.

 ( The Engine records exactly who made the request )


Scanned with OKEN Scanner

---

## Page 34

(34)

Tasks of Amazon Cloud Trail:-

 → Track user Activities & API requests throughout ur AWS Infrastructure.

 → Filter logs to assists with operational analysis & troubleshooting.


AWS Trusted Advisor :- AWS has an automated advisor known as
AWS Trusted advisor ( AWSTA )


→ When running a business, u might need some advisors who can come
in from the outside & advise u..


AWS TA :- This is a service that u can use in ur AWS Acc that will
evaluate ur resources against 5 pillars.


These pillars :-

 i) Cost Optimization
 ii) Performance
~~iii~~ iii) Security
 iv) Fault Tolerance
 v) Service Limits .

Trust Advisor in realtime runs through a ~~check~~ set of checks for each pillar in
ur Acc, based on AWS best practices & it
Compiles Categorized items for u to look into,
& u can view them directly in the AWS Console.


[rule]


Actions of Amazon Cloudwatch:-

 → Monitor ur resources utilization & Performance.

 → Access metrics from a single dashboard .


[rule]


AWS Trusted Advisor service enables u to review the security of Amazon S3
buckets by checking for open access permissions.


[rule]


Amazon Guard Duty → Service that provides intelligent threat detection for ur
AWS environment & resources. It identifies threats by continuously
monitoring the network activity & probable:[acc] behavior within ur
AWS environment.


Scanned with OKEN Scanner

---

## Page 35

(35)

Module 8 :- Pricing & Support :- AWS provides a lot of free tools to help
u plan & analyze ur budgets for ur AWS environments .


AWS Free tier:-

The Free tier offers 3 different ways to try out a Service :-

i) Always Free :- Means a Service is available to all AWS Customers &
 it doesn't expire.


ii) 12 Months Free ( 1 Year ) :- Mean u have 12 months to try out a service follo[w]-
ing ur Initial sign up date to AWS , So the date
u Created ur AWS Acc.


iii) Trials :- Some Services offer a short term free trial & then they expire
after that period ends.


Ex :- Always free ⇒ AWS Lambda &

 12 Months free ⇒ Amazon S3 [struck-out] free for 1 year for up to
 5GB of Standard Storage .

 Trials → AWS Lightsail offers 1 month trial up of 750hrs
 of usage .


AWS Free tier Services:-                AWS Pricing Concepts:-

→ Amazon SageMaker .                    ⇒ How AWS pricing works :- It offers
→ " Comprehend Medical .                   a range of Cloud Computing Services
→ " DynamoDB .                             with pay-as-go-pricing .
→ " SNS
→ " Cognito . & etc .                   ( Pay for what u use ?
                                        For each Service, u pay for exactly the
                                        amount of Services that u actually use, without requiring Long term
                                        Contracts & Complex Licensing .


Pay less when u reserve :- Some Services offer reservation options that
provide a Significant discount Compared to On-Demand Pricing .


Scanned with OKEN Scanner

---

## Page 36

(36)

Pay less with volume based discounts when u use more :- Some Services offer
tiered pricing is so the per unit Cost is incrementally lower with [illegible] usage .


Ex :- S3 Storage Space used, the less u pay for it per GB .


AWS pricing Calculators ← AWS pricing Calc Explore AWS Services & Create
an estimate for the Cost of ur use cases on AWS. u Can Organise ur
AWS estimates by groups that u define. A group can reflect how ur Company
is organized, such as providing estimates by Cost Center.


→ When u have Created an estimate, u can save it & generate a link to
share it with others .


Ex :- AWS Lambda Pricing ,        Amazon EC2 Pricing
 ( Pay less when           ( u pay only the compute time )
 u reserve )


 Amazon S3 pricing

 ↓ Storage
 ↓ Requests & Data Retreivals
 ↓ Data Transfer,
 ↓ Management & Replication .


Billing Dashboard :- Use the AWS Billing & Cost Management dashboard to pay
ur AWS bill, Monitor ur usage & Analyse &, Control ur Costs .


 → Compare ur Current month to date balance with previous month & get
 a forecast of the next month based on Current usage .


 → View month to date Spend by Service.


 → u Free tier Usage u u .


 → Access Cost Explorer & Create budgets .


 → Purchase & Manage Savings plans .


 → Publish AWS Cost & Usage Reports .


Scanned with OKEN Scanner

---

## Page 37

(circled page number: 52)

Consolidated Billing ←

[Diagram: a box containing a central rectangle connected by lines to several small circles labelled "O"; an arrow points right from the diagram]

→ Anni bills main organization ke velthunndhi rather than on individuals.

A singular Company will more than likely have multiple Aws accs & u Can manage multiple accs via Aws by using Aws orgs.

→ Consolidated Billing :- At the end of every month, instead of having to pay an Aws bill for every single acc, u Can roll those bills up into 1 bill owned by the owner of the org. It makes it easier to keep track of ur bills.

→ u don't get 100 bills, if u have 100 Aws accs.
  ↳ they would make 1 bill for the billing cycle.
    So, it's easier for the Company to manage.

→ [crossed-out] Consolidated billing
  ⇒ Simplifies billing process
  ⇒ Share Savings across accs.
  ⇒ Doesn't cost u any extra money. (Free Feature).

AWS Budgets :- u Can Create budgets to plan ur service usage, service Costs & Instance reservations. The Info in Aws budgets updates 3 Times a day. This helps u to accurately determine how close ur usage is to ur budgeted amounts or to the Aws free tier limits.
→ u Can also Set Custom alerts when ur usage exceeds the budgeted amount. (Mobile Balance)

AWS Cost Explorer :- A tool that enables u to visualize, understand &, manage ur Aws Costs & usage over time. (Gives us historical data. (Trails))
It includes a default report of the Costs & usage for ur Top 5 Cost accruing Aws Services. You Can Apply Custom filters & groups to analyze ur data.

---

## Page 38

(circled page number: 53)

AWS Support Plans :-
It offers 4 different support plans to help u troubleshoot & issues, Lower Costs & efficiently use Aws services!

→ Basic → Free for all Aws Customers. It includes AWS Trusted Advisor, access to whitepapers, documenation & Support Communities. [“AWS Trusted Advisor” written above the line with an arrow inserting it here]
→ Developer → Best practice use, Client side de diagnostic tools, Building block architecture li [illegible]
→ Business → All Aws Trusted Advisor Checks, identify Aws offerings, limited support for 3rd pty
→ Enterprise → A Technical Account manager. Application architecture guidances Infrastructure event managemet.

Basic Support :-
→ 24/7 Customer Service
→ Documentation
→ Whitepapers
→ Support forums
→ AWS Trusted Advisor
→ Free for all

Developer :-
→ Basic Support
→ Email access to Customer support

Business :-
→ Basic & Developer Support.
→ Aws Trusted Advisor provides full set of best practice checks
→ Direct phone access to Cloud Support engineers.
→ Infrastructure event management.

[Note with arrow] → Business Support plan (Cos) Enterprise includes all Aws Trusted Advisor Checks at the lowest Cost.

Enterprise :-
→ All previous free Support
→ 15 min SLA for business Critical workloads.
→ Technical Acc Manager (TAM). ⇒ They specialize not only in proactively monitoring ur environment & assist with optimizations but provide Infra event management, well Architected reviews & probable:[efficiency] reviews.

5 pillars of Well Architected framework :-
→ Operational Excellence
→ Security
→ Reliability
→ Performance efficiency
→ Cost optimization.

TAMs work with Clients to probable:[create] architectures probable:[using] the well W framework:

---

## Page 39

(circled page number: 54)

AWS Marketplace :- It is a Curated digital Catalog that Streamlines ur Steps to find, deploy, & manage 3rd party Software running in ur Aws Architecture. (Helps in accelerating Innovation).

→ 1 click deployment → that allows them to quickly procure & use products from 1000s of Software Sellers.
(Pay as yo Options)

Categories :- Infrastructure Products, Business Apps, Data Products & DevOps.

Enterprise focused features!-
→ Custom terms & pricing
→ A private Marketplace.
→ Integration into ur procurement Systems.
→ Cost management tools.

Module 9 :- Migration & Innovation!-

Aws Cloud Adoption framework (Aws CAF) :- Migrating to the cloud is a process.
The Aws professional Services team has Created Something Called the Aws CAF that can help u manage the process through guidance.
The Cloud Adoption framework exists to provide advice to ur Company to enable a quick & Smooth migration to Aws.
The framework organizes guidances into 6 areas :- (Perspective)

→ Business     ⎫
→ People       ⎬ focus on the Business Capabilities.
→ Governance   ⎭

→ Platform     ⎫
→ Security     ⎬ Focus on the Technical Capabilities.
→ Operations   ⎭

[Sidebar, right margin:]
AWS CAF Action Plan :- Helps guide ur organization for Cloud migration
---
Each perspective is used to uncover gaps in ur skills & processes, which are then recorded as inputs. These inputs are then used as the basis for Creating [text cut off at page edge]

---

## Page 40

(circled page number: 55)

→ Platform Perspective of the Aws Cloud Adoption framework helps u design, implement, & optimize ur Aws Infrastructure based on ur business goals & probable:[perspectives]
→ The Platform Perspective of the Aws CAF also includes principles for implementing new Solutions & migrating on-premises workloads to the cloud.
→ The Business perspective helps u to move from a model that Separates business & IT Strategies into a business model that integrates IT Strategy.
→ The operational perspective focuses on operating & recovering IT workloads to meet the requirements of ur business stakeholders.
→ The people perspective helps HR Employees prepare their teams for cloud Adoption by updating organizational processes & Staff Skills to include Cloud based Competencies.

Migration Strategies :-

The 6 R's :- u Can decide which option among the 6 R's is the best fit based on time, Cost, priority, Criticality.

→ Rehosting ⇒ This is otherwise known as lift & shift & easy this for business to do because of not making any changes.
  → Easier to optimize apps once they live in the cloud
  → Because the org has the better Skills to do.

→ Replatforming ⇒ Lift, tinker / shift.
  · It is purely lift & shift but instead of pure 1 to 1, u might make few cloud optimizations.
    (Not touching any core Code is the process)

→ Retire ⇒ Some parts of enterprise IT portfolio are just no longer needed
  (IT Can Save Significat Cost & effort of a team)
  (without being used)

→ Retain ⇒ Some Apps are about to be deprecated but maybe not just yet for 3 to 6 months.
  (Should only migrate what makes Sense for the business)

---

## Page 41

(circled page number: probable:[56])

→ Repurchase :- This is Common for Companies looking to abandon legacy Software vendors & get a fresh [illegible] Start as a part of migration.

→ Refactoring :- u are writing new Code → driven by Strong business need to add features / performance that might not be possible to persue, but now within ur reach.
(Dramatic changes to ur architecture Can be very beneficial to ur enterprise) but this will Come at the highest probable:[price] Cost in terms of planning & human effort.

⇒ Repurchasing migration Strategy provides probable:[moving] to a different product. (It replaces an existing app with a Cloud based version).

→ Refactoring ⇒ Changing how an App is architected & developed, typically by using Cloud native features.

→ Replatforming :- Selectively optimized aspects of an app to achieve benefits in the cloud without changing the core architecture of the app. (Lift, tinker & shift).

AWS Snow Family :- Collection of physical devices that help to physically transport up to Exabytes of data into & out of Aws.

→ SnowCone, Snowball, SnowMobile.

⇒ SnowCone → Small, rugged & Secure edge Computing & data transfer device features → 2 CPUS, 4GB of memory, 8TB of usage Storage.

⇒ Snowball → 2 types of devices :-
  → 80TB Storage Capacity.
  → Edge Storage optimized (Suited for large-Scale data migrations & recurring transfer workflows, in addition to local Computing with higher Capacity needs)
  → Edge Compute optimized → (powerful Computing resources for use Cases: ML, Data analytics etc)

⇒ Snow Mobile :-
  ↳ Exabyte Scale data transfer Service used to move large amounts of data to Aws.
  100TB Storage Capacity

---

## Page 42

(circled page number: 78)

Innovation with Aws :-

→ Amazon Sagemaker → Service enables us to quickly build, train & deploy ML models.
→ Amazon Textract → ML Service that automatically extracts text & data from Scanned docs.
→ Amazon Lex → Service that enables u to build Conversational interfaces using Voice & text.
→ Aws Deepracer → Autonomous 1/18 Scale race Car that u Can use to test reinforcement learning models.

→ Security perspective of the Aws CAF helps u Structure the Selection & implement-ation of permissions.
→ Governance perspective helps u to identify & implement best practices for IT governance & Support business processes with technology.

Module 10 :- The Cloud Journey :-

[Diagram: nested boxes — "AWS Region" containing "VPC" containing "AZ" containing "EC2 — EC2  DB"]

→ Aws Well Architected framework
⇒ Operational excellence
⇒ Security
⇒ Reliability
⇒ Performance efficiency
⇒ Cost optimization.
(ability to run & monitor Systems to deliver business value & to probable:[continually improve supporting] processes)

(Helps u to understand how to design & operate reliable, Secure, efficient & Cost effective Sys in Aws Cloud. It provides a way for u to Consistently measure ur architecture against best prac & design principles & identify areas for improvement).

---

## Page 43

(circled page number: probable:[43])

→ Reliability focuses on the ability of a workload to Consistently & Correctly perform its intended fns.

→ [crossed-out word] Performance efficiency focuses on using Computing resources efficiently to meet Sys requirements & to maintain that efficiency as demand changes & technologies evolve.

→ Security → protecting data, Systems & assets & using Cloud technologies to improve the security of ur workloads.

---

## Page 44

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

---

## Page 45

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

---

## Page 46

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

---

## Page 47

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

---

## Page 48

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

---

## Page 49

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

---

## Page 50

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

---

## Page 51

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

---

## Page 52

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

---

## Page 53

S3
[Simple Storage Service]

↳ Used to store and refrtieve data as object.

        Apps
         ↓
         S3
         ↓
        Bucket
     ┌────┴────┐
   obj 1     obj 2
     ↓
    Data

* Bucket name should be globally unique because bucket name become part of the public S3 DNS namespace and URL.

↳ Important Concept :
1. Bucket : Container for object
2. Object : The actual file/data stored
3. Key : unique name/path used to identify an object in bucket.

* S3 is regional, but bucket names are globally unique.

* How to create S3 bucket :

S3
↓
Create Bucket
↓
Choose Region
↓
Unique Bucket name
↓
Object Ownership
↓
Block Public Access
↓
Versioning
↓
Tags
↓
Default Encryption → Advanced setting
                                      Upload Objects
                                      ↑
                                      Bucket Created
                                      ↑
                                      Create Bucket
                                      ↑

* Object Ownership
1. ACLs disabled
2. Bucket owner enforced

ACL - Access Control List
Before S3 used ACL but now AWS recommend to use IAM policies

↳ Bucket Owner enforced -
bucket owner owns the object in bucket and ACLs are disabled

* Block public Access
↳ 4 Imprint rules / Setting :
1. Block public ACLs - prevent new public ACL from being created
2. Ignore public ACLs - Ignore public ACLs when evaluating access.
3. Block public bucket policies -
4. Restrict public bucket policies

* Bucket Versioning
↳ allows S3 to maintain multiple versions of an object.
↳ Enable versioning, can retain previous version.

* Tags [Key value pairs]
↳ useful for :
↳ Cost allocation, orgaization, Automation, Resource management

* Default Encryption
↳ S3 supports encryption of objects at rest.
↳ Types : → AWS manages encryption automatically
1. SSE - S3 → straightforward
2. SSE - KMS → more control over encryption keys
3. DSSE - KMS
   (Advanced security, Control encryption key, used by enterprise)
   ↳ dual layer server-side encryption with AWS KMS

---

## Page 54

* Advanced settings
• Object Lock :
↳ Object lock is used when you need objects to remain immutable for a retention period.

* Delete Marker :
↳ If file.txt exist in bucket, & want to delete it, when versioning is enable the S3 doesn't simply destroy it, instead it creates "Delete Marker"

* Versioning can increase S3 storage costs.
* Bucket Key :
This is S3 feature that can reduce the number of request to KMS for SSE-KMS encryption, reduces KMS request cost.
* Object lock modes :
1. Governance mode :
specially authorized users can potentially bypass retention controls.
2. Compliance mode :
Retention is stricter, and even highly priviledged user cannot simply bypass the retention period.

* Is S3 a folder structure ?
No, It uses a flat object namespace.
* S3 object consist of Key, Data, metadata, tags, version ID.
                              ↳ Info about the objects

* S3 Storage Classes :
1. S3 Standard
↳ used for frequently accessed data
↳ High availability, high durability, Frequent access, general-purpose storage
2. S3 Intelligent-Tiering
↳ Useful when you don't know how frequently your objects will be accessed
↳ S3 automatically moves objects between access tier based on access patterns.
↳ reduce storage costs without manually predicting access pattern
3. S3 Standard - IA [Inprequent Access]
↳ must remain quickly accessible
↳ isn't accessed frequently.
↳ Storage is cheaper than standard, but retrieval costs apply.
4. One Zone - IA :
↳ similar to standard-IA but data store in a single Availability zone
↳ cost less, but less reselience to an AZ-level failure than multi-AZ storage
↳ use only when trade-off is acceptable
5. Glacier Instant Retrieval :
↳ For archive data that is rarely accessed but need fast retrival when requested.
6. Glacier Flexible Retrieval :
↳ Designed for archival data where retrieval can take longer.
↳ you can choose retrieval options depending on how quickly you need data.
7. Glacier deep Archive :
↳ Designed for very long-term archival
↳ optimized for very ingrequent access

---

## Page 55

* S3 is highly durable :
↳ Yes, extremely high durability by redundantly storing data across two infra.

* Durability Vs Availability :
D - How likely is my data to survive without being lost ?
A - How often can I access the data when I request it ?

* S3 replication :
1. Same-Region Replication (SRR)
   Bucket A → Bucket B
   (Mumbai)      (Mumbai)
2. Cross-Region Replication (CRR)
   Bucket A → Bucket B
   (Mumbai)      (Ohio)
↳ useful for :
1. Disaster recovery
2. Compliance
3. Geographic redundancy
4. Lower-latency access in another region

* S3 Lifecycle :
↳ As my object get older, automatically move them to cheaper storage or dlt them when I no longer need them.
↳ Flow :
New log
↓
[Frequent] S3 Standard
↓ [After 30 days]
[less frequent] S3 Standard-IA                  Delete
↓ [After 90 days]                        ↑ [After 365 days]
[rarely use] S3 Glacier Flexible Retrieval →

↳ S3 2 important actions :
1. Transition - object one class to another
2. Expiration - Delete object

* Bucket Policy :
↳ is a resource-based policy attached to an S3 bucket.
↳ defines who can access this bucket, what they can do, and under what conditions.

* S3 Common Permissions :
1. GetObject - Download (read an object)
2. PutObject - Upload an object
3. DeleteObject - Delete
4. ListBucket - list obj in bucket

* S3 Presigned URL :
↳ when bucket is private, but you want a user to download one particular file temporarily, then we creat Presigned URL

---

## Page 56

Storage classes :

Class
S3 Standard                    Use frequently                        website images
S3-Standard IA                 Use occasionally                      Monthly reports
S3-Intelligent Tiering         Dont know how often you'll use it     User docs with unpredictable access.
S3 One Zone IA                 Rarely used, okay with one AZ         Re-creatable backups.
S3 Glacier Instant Retrieval   Archive but need it quickly           Medical/legal records.
S3 Glacier Flexible Retrieval  Archive, retrival can take longer     Old backups
S3 Glacier deep Archive        Very rarely accessed long-term archive  7-10 yeaus compltance records

* Standard-IA
1. Data accessed occasionally
2. Storage cost - Higher
3. Retrieval cost - Lower
4. Type - Monthly report, backup
5. Minimum duration - 30 days

S3 Glacier Instant Retrieval
1. Archive data that is rarely accessed but must be retrieved
2. Storage cost - lower
3. Retrieval cost - Higher
4. old medical record
5. 90 days

---

## Page 57

S3 Lab
Bucket type - General Purpose
↳ support - Img, vid, Pdf, website hosting, backup, Logs, IAM, versioning, lifecycle policies

Bucket namespace -
↳ Global - must be unique
↳ Account - AWS will recommend

Block public access
↳ protect files from the internet, nobody can access them publicly

IAM
[Identity Access Management]
• who can access which resource ?
• what actions they can perform ? and
• Under what conditions access is allowed or denied ?

→ It controls programmatic access, temporary credentials, roles and permissions used by application and AWS services.

→ Identity : An entity that can be recognized in an access request, such as an IAM user or an assumed IAM role.

→ Authentication : Proving who you are ?
→ Authorization : What are you allowed to do?
→ Policy : set of rules that describes allowed or denied actions, resources and possibly conditions.

→ Authentication doesn't automatically grant administrative permissions.

* IAM User - Identity created inside an AWS account
↳ User Contains :
1. User name → [Amazon Resource Name]
2. ARN [uniquely identifies the user in …
3. Console password
4. Access keys
5. Attached policies
6. Group memberships
7. Permissions boundary
8. Tags

↳ IAM user ARN names must be unique in their account.

* IAM Groups :
↳ Collection of IAM users.
↳ You attach permission to the group, and its users inherit those permissions.

↳ Rules of groups -
1. group is not a legit identity
2. can contain IAM users, not other groups.
3. can't sign to AWS console.
4. can't assume a role as if it were a user.
5. User can belong to multiple groups.

* IAM Roles :
↳ Is an identity that defines a set of permissions and can be assumed by a trusted principal.

---

## Page 58

IAM Role for EC2 to read S3 file :
1. Create an IAM role for EC2 workload.
2. Attach appropriate S3 read policy to the role
3. Configure the role's trust policy to allow the EC2 service to assume it.
4. Attach role to EC2 instance through an instance profile.
5. Application obtains temporary credentials through EC2 instance metadata service.
6. Application uses those credentials to request the S3 object.

* Two essential parts of Roles :
1. Who is allowed to assume the Role ?
↳ This is controlled by the role's trust policy
2. What can the role do after it is assumed ?
↳ This is controlled by the role's permissions policies and any applicable restrictions.
↳ These 2 things are not interchangeable.

* Common Roles :
1. Cross-account role - Allow trusted principal of another account
2. Federated access role - Allows an externally authenticated user to obtain AWS access
3. Service-linked role - Let an AWS service perform specific operation on your behalf
4. Deployment role - Let an authorized CI/CD system deploy resources.
5. Read-only role - Allows users or workloads to inspect resources without modifying them.

* IAM Policy :
↳ document containing permission rules

↳ Main policy elements :
1. Vesion - policy language version
2. Statement - contains one or more permission
3. Effect - Allow or Deny
4. Action - AWS API operation
5. Resource - specifies the resource to which statement applies
6. Principal - Identifies who is granted or denied access in a resource-based policy or who is trusted in role trust policy.
7. Conditions - Extra requirements [MFA, Region, tags --]

↳ Types of IAM Policies :
1. Identity based - attached to an IAM user, group, role, to define what that Identity can do.
2. Resource based - attached to a supported resource to define which principals may access it and what they may do.
3. Permissions boundaries - limit the maximum permissions that identity based policies can grant to a user or role.
4. Session policies - for temporary sessions
5. Service control policies - ↳ for principals
6. Resource control policies - ↳ for resources
7. VPC endpoint policies - control which principal and resource can access VPC.
8. Access Control List - service-specific resource access mechanism.

---

## Page 59

* Inline Policies :
↳ embedded directly into one IAM role, user, group.
↳ use when permission is intentionally tied to one identity and should have the same lifecycle as that identity.

* MFA :
↳ adds another factor to authentication, [illegible]

* Least Privilege :
↳ Granting only the permission required to perform a specific task.

* Trust Policy :
↳ control which principals are trusted to assume the role.

* Permission Policy :
↳ grant permission to retrieve the specified object, subject to other applicable authorization requirements.

---

## Page 60

Lambda :
↳ serverless
↳ need not to manage the underlying servers
↳ Your are responsible for :
1. writing code
2. configuring IAM permissions.
3. Setting memory and timeout values
4. Managing application dependencies
5. Monitoring errors and performance
6. Control / Manage costs.

* AWS Lambda Function :
↳ unit of code that lambda executes

* Runtime :
↳ provide the environment needed to execute your code in particular programming language.

* Handler :
↳ it is the entry point lambda calls when your function is invoked.
↳ handler format : "filename.function-name"

* Event :
↳ an event is the input supplied to your function when something invokes it.
↳ It (might) Contains :
• user's API request.
• info about an object.
• A message or notif or event.

* Context object :
↳ context paramater contains info about the current lambda invocation and execution environment

* Response :
↳ It is the value your handler returns to the caller on invoking integration.

* IAM execution role :
Two different permissions -
1. Who can invoke Lambda ?
Invocation permission determines who or what can call the function.
2. What can lambda access ?
Execution role determines what the function can do when it calls AWS services.

* Triggers :
↳ an event source or integration that cause a lambda function to be invoked.

* Timeout :
↳ max duration lambda allows an invocation to run before stopping it.

* Memory :
↳ Amount of memory allocated to function execution environment.

* Cold start :
↳ additional initialization work when lambda needs to prepare an execution environment for an invocation.

* Invocation types :
1. Synchronous - caller waits for lambda's invocation
↳ caller waits for the function to complete and receive a response.
Ex: API Gateway calling Lambda
2. Asynchronous - caller sends the request and continues without waiting, lambda process it later
EX: S3 event triggering lambda

---

## Page 61

3. Event source mapping :
↳ It is a configuration that connects an event source (SQS, Kinesis, Dynamo) to a Lambda function.
↳ Some AWS services do not directly invoke Lambda. Instead, Lambda needs to continuously check (poll) these services for new message or records.
↳ ESM handles this polling automatically.

* $LATEST :
↳ when you update a Lambda function code or configuration without publishing a version, you are working with its mutable, unpublished config, refered as $LATEST.

* Published Version :
↳ An immutable snapshot of a function's code and qualifying config.

* Alias :
↳ named pointer to a published version.

---

## Page 62

# Amazon EventBridge — Core Concept

## Problem: polling vs events

Scenario: Your application needs to react to things that happen — an EC2 instance stops, a user signs up in Spotlight, a Salesforce company deal closes or a code pipeline build fails. These are events.

Without EventBridge → polling architecture:
- Application polls EC2 API every 30s → "any state changes?"
- App polls CodePipeline every few seconds → "any builds closed?"
- Polls Salesforce every 5 min → "any deals?"

Disadvantages:
- Delayed reactions
- Multiple blank API calls as there is no change
- Tight coupling
- No central event routing

With EventBridge → near real-time reactions:
- Event delivery < 500 ms
- Zero polling
- Central routing

## Definition

EventBridge is a fully managed, serverless event bus that connects applications using events from AWS services, SaaS partners, and your own applications, routing them to targets via rules.

## Key Terms

- Event: A JSON document describing something that happened.
- Events routes from: AWS services (automatically — no code needed from AWS to publish), SaaS partners, your own application.

---

---

## Page 63

## Key Terms (continued)

- Event Bus: The pipeline that receives events and sends them to targets.
- Rule: Matches events by pattern, routes them to targets.
- Target: Destination — SQS, Lambda, Step Functions, another account's EventBridge bus, etc.
- Schema: Definition of what an event looks like (field names / types).
- EventBridge API: Used for event-driven microservices architectures.

## Event Structure (example)

An event is a JSON document that describes what happened:

```json
{
  "source": "aws.ec2",
  "detail-type": "EC2 Instance State-change Notification",
  "detail": {
    "state": "stopped"
  }
}
```

- `source` → who sent it.
- `detail-type` → kind of description of what happened.
- `detail` → specifics: what state changed.

Unlike SNS, EventBridge routes events; it does not store them.

---

---

## Page 64

## Event Bus Types

1. Default Event Bus:
   - Automatically created in every AWS account.
   - Cannot be deleted.
   - Automatically receives events from AWS services (no code needed to publish).
   - Use for monitoring.

2. Custom Event Bus:
   - You create and name these buses yourself.
   - One per application/domain.
   - Receives events from your own application.
   - Used for building event-driven microservices architectures.

3. Partner Event Bus:
   - Created automatically when you enable SaaS partner integration.
   - Receives events directly from third-party SaaS applications (Salesforce, Datadog, GitHub, Zendesk, etc.).
   - Handles SaaS events natively — not possible with SNS/SQS.

## Rule Matching

- Rule pattern = condition to match.
- Compares incoming event (JSON) to the pattern; if matched → routed to target; if not matched → ignored.
- Detail matching supports OR logic, e.g. `state: ["stopped", "terminated"]`.
- Schema registry defines the event shape.

## Properties Summary

- Like SNS, EventBridge routes events, but does not store them.
- Targets can be cross-account EventBridge buses.
- Only EventBridge (not SNS/SQS) handles SaaS partner events natively.

---


---

**Extent:** 64 shelf pages across 3 notebook(s).
Transcription date: October 2026.
