# TERRAFORM.pdf — Pages 15–21

## Page 15

```
variable "instance_type" {
  default = "t3.micro"      (the "3" written below as an insertion)
```

- Output block:

Output values to console after running
terraform apply (output, apply underlined)

```
output "instance_ip" {
  value = aws_instance.example.public_ip.
```

- Data Sources:

Allows us to retrieve information
about existing infrastructure (highlighted)
can also be used in configuration.

7. Terraform Workflow:

- init : initializes working directory → Sets up environment
  downloads necessary provider plugins
  configures backend if using remote state.

## Page 16

- validate : • Syntax & Internal Consistency
  (invalid argument/ incorrect d-type) checking

  • Attribute & variable checks.
  • Isolated verification checks
  performed exclusively at
  local/ offline

- plan : Show preview of actions
  terraform is about to perform
  and output
  ( Create(Addition), modify(changes),
  remove (deletion) ).

- apply : Applies actions specified by
  the plan to the infrastructure

- destroy : Destroys infrastructure
  maintained by terraform. [Cleanup]

8. Variables:

variables in terraform provides versatility
and resuability while configuring

## Page 17

Syntax: variable "name" {
  description = " "
  default = " "
}

How to use : < var.name >

Ways to override variables :
> commandline : -var = "region = val"
> terraform.tfvars file.

9. Modules :

Collection of Terraform configuration files
grouped together to create and
manage AWS resources

Examples:— 5 EC2 instances with same
            configuration
   ↳ (curved arrow down to next line)
Create 1 EC2, reuse it 5 times

• Reusability
• Organization
• Consistency
• Easy Maintenance:

## Page 18

Structure of Module:

Folder: (local)
  ↳ main.tf
  ↳ variables.tf
  ↳ outputs.tf

(Remote terraform registry)
```
module "vpc" {
  source = "./module/vpc"
  cidr_block = " "
}
```

1. Root Module : Main directory where
   init , apply are called. It calls other
   modules when required

2. Child Module : Module which is called
   by the root, contains resuable configs
   EC2, 53, or VPC.

3. Published or external module :
   resuable module obtained from terraform
   registry.

(Note:)
Avoid Storing sensitive information
directly in terraform files.

Good practice to use Services like
AWS Secret Manager, HasiCorp Vault
or terraform cloud to securely manage
Secrets.

## Page 19

10. Provisioners & Lifecycle:

Provisioners: allows you to execute
scripts or commands on resource after
they have been created

• Types of provisioners:

  - remote-exec: Executes commands
    over SSH

  - local-exec: Executes commands
    locally

lifecycle:

• prevent_destroy : Prevent accidental
  destruction of resource.

• ignore_changes : Ignore changes to
  certain attributes of resource.

## Page 20

11. Terraform – Interpolation:

Interpolation in Terraform → inserting the
value of a [variable, resource attribute,
or expression into a string or configuration

Helps to use dynamic values instead of
using fixed / hardcaded Values.

Old Syntax: ${ var.instance_name}
New Syntax : var.instance_name .
Example

```
resource "aws-default-vpc" default {
  (id:)
}
```
        ↓ (arrow down)
```
resource "aws-Security-group" my-SG {
  vpc_id = aws_default-vpc.default.id
```
   (curved arrows from "default" block down to "vpc_id" line, and to the circled "id")

........ dynamic value binding.

## Page 21

(blank page — no writing, only ruled lines)
