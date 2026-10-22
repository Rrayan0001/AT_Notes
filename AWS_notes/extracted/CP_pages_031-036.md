# AWS Cloud Practitioner Notes.pdf — Pages 31–36

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
