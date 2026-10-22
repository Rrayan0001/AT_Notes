# ANSIBLE.pdf — Pages 9–16

## Page 9
9. Facts :
System details Ansible gathers about managed nodes, generally thnu setup.

cmd :  ansible -i inventory.ini -m setup

10. Registers
Responsible for saving result of a task in a variable ——→ to inspect later on.
Common Registers.

stdout : command -O
stderr : error
rc : return code
changed / f'd

11. Handlers :

Tasks that only run
        ↑____when____ by other
          notified    task
Commonly used to restart/reload Services.

## Page 10
11. File and Permissions :

file module creates, removes, modifies file or directory
manages : ownership & permissions.

Eg. task
   - name : Create directory
   ansible.builtin.file :
     path :
     state : directory / touch / absent   ↗ rm
   # makes sure directory / file exists
   owner : ec2-user ]
   group : ec2-user ] ownership
   mode : 0755  ↷   0- R/w/x
                    G/Oth - R/x.
• Absent / link : remove specified file or dir
                  creates symbolic link.

12. Packages & Services :

Packages are Software Installed on a machine and Services are program running in background.

popular State :
   started, stopped, restarted, reloaded
                        [ Service Config R+]

## Page 11
13. Users & Groups :

Ansible can create / modify / delete users and groups → OS.

task :
-name :
ansible.builtin.group :
name : devG
state : present ( available)

-name :
ansible.builtin.user :     \
name : Jenkinsll.          \
group : devG                >  creating user.
shell : /bin/bash          /
create_home : true        /
state : present          /

-name :
ansible.builtin. user :
name :
state : absent  } removes a user
remove : true   }

## Page 12
14. Tags :

tags allow you to run Selected task or Section of playbook.

task :
- name : Install Nginx
 ansible.builtin. package :
   name : nginx
   state : present
  tags :
    - install .

How to run :  ansible-playbook -i inventory.ini site.yml ——tag install/
   ——skip-tags                    ↓
    ↘   Run all except.           runs only install task

15. group_vars & host_vars (directories)
allows us to organise variables outside the playbook, often help in keeping env Specific variables outside
                                     [practice]

## Page 13
16. Roles :
Roles organises Ansible automation into standard directory structure. particularly useful when multiple project need same standardize Server Configuration

                            [practice]

17. Ansible Galaxy :

Repo - tool for discovering and installing reusable roles and Collection.
                                        ↓ listed in
                              ↖  requirements.yml

ansible - galaxy collection install -r requirement.yml.

18. Ansible Collections : Standardized packaging format to export / distribute ansible content.....
• Components : Packages Modules, plugins, roles, documentation into Single modular structure.
• Namespace, independent Versioning, Distribution.

## Page 14
19. Ansible Vault :

ansible -vault create secrets.yml

Specialized Storage which encrypts Sensitive data : Passwd, API token, Pvt Config....

How to use :              Run :

secrets.yml               ansible-playbook -i inventory.ini file.yml ——ask-vault-pass
db_pass : * * * * *
db_user : ....

playbook :                protected Vault : locked with passwd.
                          ——vault -passwod -file.

- name : Config db.
  var_files :
    - Secrets.yml

task :
 - name :
 ansible.builtin.debug
 var : db_uses

## Page 15
20. Error Handling:

Project : Deploy EC2 with terraform and configure with ansible

## Page 16
[blank page]
