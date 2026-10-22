# AWS Cloud Practitioner Notes.pdf — Pages 13–18

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
