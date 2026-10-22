# AWS Cloud Practitioner Notes.pdf — Pages 25–30

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
