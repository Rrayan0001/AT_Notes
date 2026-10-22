# TERRAFORM.pdf — Pages 1–7

## Page 1

Title:

Terraform

(StarNote — app watermark in bottom right corner)

## Page 2

1. IAC

1. What is Infrastructure as Code.

Practice which enables developers and operations teams to provision and manage infrastructure through code & instruction rather than manually configuring the process.

a) Automation: ~
Iac allows to perform infrastructure tasks automatically via code.
- No manual interventions
- Less chances of error
- Rapid
- Streamlines repetitive tasks.
Eg. Using terraform to create EC2 instead of using AWS.

b) Declarative & Imperative ✓
- Below ↓ tell tool what to do and desired result
tool – configures and determines the neccessary stefs.
tell tool how to do it by specifying the commands or stefs to achieve the result.

(annotations: (1) on "commands", (2) on "stefs")

## Page 3

c) Version Control: ~
tracking changes made to code over time.
Supports rollback to older builds incase enconsistencies in code resulting in problem for newer builds.

d) Idempotence: ~

(1) Output of fixed configuration of code would produce exact same intended result.... (2) over and over again.

Eg. Trfm code configured to create x86 EC2 wont create Arm64 EC2
No manual Config mistake.

e) Consistancy: IaC creates identical environment with consistent configurations.

Refproducibility: recreation of envirn. is very easy using same code.

## Page 4

(2) Benifits of IaC:

✓ Speed and Efficiency without human intervention.

✓ Cost-effective : By automation.

✓ (**) Disaster Recovery : Recreation of environment is rapid in events of loss.

✓ Scalability: IaC can scale infra–automatically

(3) Practice : Terraform Code to provision EC2's.

- Configure Aws IAM Role (AwsEC2Full access)

- Attach to host EC2 .... Install terraform

- Mkdir terraform_cd .... write main.tf

- terraform init, plan, apply.

## Page 5

(4) Challenges :

→ Complexity in large-scale deployments: Managing large and complex infrastructure with IaC

→ (State Management:)

→ Security : Storing sensitive data exposed in codebase can be a security risk. Solution: using Vault.

## Page 6

II. Terraform.

1. What is terraform?

Terraform is an open source (1) Infrastructure as Code (IaC) tool created by hashiCorp. (2)

It allows us to define, provision, and manage (3) cloud resources using a declarative config language. ✓

How terraform work :

- Write : (terraform init); configuration file (.tf) and initialize working directory to download the necessary provider plugins. ✓ (creates environment)

- Plan : (terraform plan); previews changes it will make (create, update, destroy) without actually touching infrastructure

- Apply : (terraform apply); Terraform executes the planned changes, provision or updating resources in cloud env.

## Page 7

Terraform Vs Ansible:

Terraform infrastructure code tool — used to provision infrastructure via IaC

Ansible is infastructure configuration tool used to configure and customised infa - after being created. ✓

Aws (Cloud formation) = terraform
