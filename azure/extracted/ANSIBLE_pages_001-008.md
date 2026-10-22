# ANSIBLE.pdf — Pages 1–8

## Page 1

NOTEBOOK

ANsibLE – FUndAmeNTALs

SArTHAK DuTTA.

[bottom-right watermark]: StarNote

## Page 2

1. What is Ansible

[top-right]: Ansible.

Configuration – management tool. helps to
automate Setting up infrastructure with
essontial configuration tuing on multiple
resources.

[Diagram:]
Control Node ---SSH---> EC2
            ---SSH---> EC2
            ---SSH---> EC2
            ---SSH---> EC2

Ansible is agent-less means
to configure the receiptient we dont
to have ansible installed on it.

Supports parallelism :- can run configuration
    setup simultaneously on
    multiple resources.

• Save time to market by faster configuration
• Scaleable approach to set-up configurations.

## Page 3

2. Configuration Management :

• Purpose of Configuration management : means
maintaining Servers in a desired state.

Without Ansible ------------> Configure Servers
                              manually

With Ansible ------------> define desired
                           configuration once
                                ↓
                          Apply to N… Servers.

Ansible Architecture:

[ Ansible Controller ]
  Runs commands & Playbook
        ↓ ↑
      SSH/ WinRM
     /    |    \
 Web   APP   DB
 managed Node (MN)  (MN)  (MN)

## Page 4

Key Components :

• Controller: Server/ Machine where ansilble is installed and executed.

• Managed Nodes: Server where Ansible configures.

• Inventory: List of target hosts.

• Modules: Performs tasks such as installing packages or Copying files.

[Diagram: two boxes, arrows between:]
[Controller nodes]                          [Managed nodes]
 Runs Ansible           ---------------->   Receives Autom…  probable:[Automation]
 Stores playbook                            Runs target
   & Inventory         ---------------->   Application.
 Connects to
   torget Machine   - - - - - - - - ->      provides SSH
 Needs Python           ---------------->     & WinRM
                                            No prerequisite

## Page 5

3. How is Ansible different from CheF/
puppet.

CheF/Muppet ----------------------- Server
                                    (Agent installed)
decide{  • <--------------- information ------- A   ↑ configures
              pull          high turn-around
                            time
         • -----------------------------> A
           push

Ansible --------------------- Server
        fast and Simple.     (Agent-less)
   •
   push    configures thru SSH      ↑

4. How to install Ansible

Sudo dnf install -y ansible

Sudo dnf install -y faython3  probable:[python3]

## Page 6

5. Inventory

defines which machines Ansible should
manage. Can contain indisiuidual IP address,
DNS names, group, variables, etc

Example:
                group
                 ↙
      [Server]
  Server-1  ansible_host = < IP-address >
  Server-1  anible_user = ec2-user
         child.
     ↙
prod ↶
[all : var]
   ansible_ssh_pvt_key_file = /directory
   ansible_python_interpreter = get by
   which python3

6. Ad-hoc Commands.

Used for executing quick-task
without creating playbook

Syntax:
  ansible <host> -i <inventory file>.ini
    -m <module>  -a "<arguments>"  (-v)
                                   verbose

## Page 7

Commands in details.

-m : modules.
-a : arguments
-b : gives Sudo priviledges. (becomes)

Common Modules

ping : Test Connectivity

apt,dnf,yum : Managing packages.

Service,systemd_service : Services Management

user,group,

Shell : executes cmd thru shell.

Setup : Gather System facts.

## Page 8

7. Playbook & tasks:

Playbook is a YAML-file containing
plays that define :- which hosts to target
and what tasks to perform.

(practical done)

task - <individual operations> iside a
  playbook,  tasks ---------calls.------->  module

and are generally executed from top →
bottom. having a name & action.

8. Variables:  Stores values which can be
reused inside playbook, inventory, etc.

Declaration:

    vars:
       package_name : nginx
                    ↓ to use it

 Syntax: "{{ package_name }}"   [closing brace written in the author's "3"-glyph style]

ansible -playbook -i inventory.ini  ↗ Overnide

Site.yml  [ -e "package_name = nginx" ]
