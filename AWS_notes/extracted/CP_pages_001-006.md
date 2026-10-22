# AWS Cloud Practitioner Notes.pdf — Pages 1–6

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
