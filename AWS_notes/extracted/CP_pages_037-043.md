# AWS Cloud Practitioner Notes.pdf — Pages 37–43

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

## Page 43

(circled page number: probable:[43])

→ Reliability focuses on the ability of a workload to Consistently & Correctly perform its intended fns.

→ [crossed-out word] Performance efficiency focuses on using Computing resources efficiently to meet Sys requirements & to maintain that efficiency as demand changes & technologies evolve.

→ Security → protecting data, Systems & assets & using Cloud technologies to improve the security of ur workloads.
