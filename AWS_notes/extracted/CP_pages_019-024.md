# AWS Cloud Practitioner Notes.pdf — Pages 19–24

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
