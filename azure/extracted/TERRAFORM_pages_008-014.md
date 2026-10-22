# TERRAFORM.pdf — Pages 8–14
## Page 8
2. Provider :

(P) —interact→ API of external
                    Services ( Aws, Azure, GCP )
        (to) Create,                        ↗ Resources (in)
        update, destroy ┘

Syntax :

provider "aws" {
    region : "us-east-1"
    secret_key : "....."
    access_key : "....."
}

3. Resources : A resource in terraform represents a specific components of our infrashucture

It's defined by : resource block .

resource "aws_instance" "name" {
(block)     (parameter)     (nm)
    ami = " ami-0511 ..... " (img)
    instance_type = " t3.micro "
}

## Page 9
4. Attributes : Resource typically include
multiple attributes such as : (human config)

[Arguments]
a. ami 'holds the amie Id'
b. instance_type 'holds the type power
        resource would get'
c. tags 'Special key : value pair
        attached to resource'

(Input ⇒ Provider API ⇒ Set-up Infrastructure)
Arg → Data before creating
Computed → Data after creating (Cloud provider
        API Config)

[Computed]
provide metadata and details about
the resource that are obtained after
resource actually exists.
Eg. value = aws_eustance .web .public ip

5. State
• What is Terraform State ?

Terraform stale file ( terraform.tfstate )
used to keep track of resources that
terrafolm manages ! Stores metadata
about your infrasbructure in statefile .
4729

## Page 10
Crucial ensuring terraform understand the current state of infrastructure .

Important : -
a) State file (ensures)
            → terraform
                ↳ ( update, created or
   decisions     destroy )
        code → maps configuration
     real infrastructure

b) State Management :

By default State is locally stored in
<terraform.tfstate>
by for larger environments use :

S3 for Aws.

c) Remote State :

Storing Statefile remotely is beneficial for collaboration .

## Page 11
Terraform State In details :

main.tf ( Terraform Config )
||
    Store what we want to-do with
    our infrashucture
||
terraform.tfstate ( terraform State )
||
    store what terraform knows
    about our infrashucture .
Aws infrastructure
( resources running )

Use of State file :
• Resource tracking
• Change detection
• Collaborations.

Example on how stateworks .

main tf → [ Infra - Created . ] → tf state
                    State stored
    ↘ changed → terraform plan   / compares
                        shows what ←
                        changes terraform is going to apply
                        ( modified or replace )

## Page 12
State-locking

State locking : is a mechanism that prevents multiple - users modify the same state simultaneously ( No concurrent changes )

Problem : Operations may overlap, conflicting changes, mismatched configuration, leading to state inconsisteney

How terraform uses statelocking

• dev A : Starts Apply
  Terraform acquires lock → shared state

• dev B : tries to Apply → Operation
        awaits Completion (A) or runs into
        lock-related error
  lock is released ←
  once dev A's task is completed .

backend.tf                |  Commands :
terraform {               |    use_lockfile = true
    backend "s3" {        |
    bûckel = " "          |
    key = " "             |
    region = " "          |
    }                     |
}                         |

## Page 13
Scenarios :

## Page 14
6. Terraform Configuration files : (HCL)

✓ Provider Block : ( Specifies cloud provider )

    provider "aws" {
        region = " " }

• Resource Block : ( Defines what resource
    to manage )

    resource "aws_instance" "name" {
        ami = " "
        iustance type = " "
    }

✓ Variable block : allows →declare configs←    make configurations
dynamic and resuable
