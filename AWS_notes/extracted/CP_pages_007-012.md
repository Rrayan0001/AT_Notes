# AWS Cloud Practitioner Notes.pdf — Pages 7–12

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
