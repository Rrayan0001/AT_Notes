# Notes.pdf — Pages 10–18

## Page 10

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

## Page 11

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

## Page 12

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

## Page 13

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

## Page 14

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

## Page 15

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

## Page 16

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

## Page 17

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

## Page 18

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
