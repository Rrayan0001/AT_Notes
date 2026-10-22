# MAVEN.pdf — Pages 1–7

## Page 1

MAVEN
Israfil

definition: Mauen is a build automation
and project management tool
mainly used for java projects

helps to compile code, manage
dependencies, run tests and
package applications.

.jar.  Multiple .class files bundled
together makes a .jar file.

Artifact: Artifact is a file produced by
software build process
    contains → compiled code
             → required resources
    needed to run or deploy the application.

Stored in
AWS CodeArtifact,
Artifactory,
Jfrog,
etc.

Source code ——build tool——→ Artifact.
              (Automates)

Notewise

## Page 2

dependencies
External libraries or packages
that an application needs to
work properly, provide
readymade functionalities
to work with instead of
writing everything from scratch

deployment workflow:
                               (testing requirements)
 Dev → UAT → production
(testing of
           new features
or code changes)                (approved
                                 & tested
                               for customer
                                  use).

Build tool.  task:
Automates:-
1. Downloading defenclencies
2. Comfiling source code
3. packaging
4. testing
5. documentation (DCPTDD)
6. deployment.

Eqs.  ANT, Mauen, Groalle.

Notewise

## Page 3

Input file.:   Input file for buildtool is a
configuration file which provides
necessary info about building
the project to the build tool.

        for mauen input file is
            〈pom.xml〉

pom.xml   must be present in base directory
of the buildtool, default input
file Mauen to build our
projects.

                          〈Contents〉
project root element
profesties.
defendencies
plugin
    goals
profile
version
mail list

                          〈Contents〉
Notewise

## Page 4

Types of pom

                          Super POM
Contains generic
configurations
and information
required by
multiple builds.
referenced
by other
poms.

pom
inherited
by another
pom
Shares
common
defendencies
config among
multiple
objects.

                          parent pom

Super POM ⇢ parent pom
Super POM → pom | pom | pom | pom | pom
parent pom ↓
(t ⇣ ⁞ ⁞ ⁞

  directly required
  by projects contains
  project Speafic

mauen
Combines info from
all to form a template

fact:
Mauen uses convention over
configuration, which means
developers are not required
to create build process themselves

Notewise

## Page 5

Project Object Model.

fundamental unit of work
in Mauen.

Contains info about: project
                              config
            used during build
            process.
                    config

Pom also contains goals and
plugins.
        → during executing
             task.

Pom.xml   has:

·  Project dependencies defined

·  Plugins             · build profile

·  goals.              · project version

·  mailing list

Min req:   project root
〈model version〉
〈group ID〉
〈artifact_ID〉} (GAV)
〈version〉

Notewise

## Page 6

Mauen lifecycle.
(Clean → Builtol → Site)

clean.     .java ——→ .class ——→ directory
                    recomfile ↗        del old

Sequence of phases run in
order. -o ↗

phase     Step in build ( 0 or more goals
  ↗       bound to it)

 bound
Goal      Actual task to be performed
          ↗ (t)
plugin ~) Collection of goals.

           mauen compile ↘
(pom) Local.
   ↘
   Search for plugin.
   ↘
(Super pom) → m-c-p {G/A/V}
      ↘
   phases & Goals (
   compile. task.

mauen
compile
plugin.

Notewise

## Page 7

Mauen lifecycle:

Validate    (check for correct
               configuration)
   ↓
Camplete    (code → .class.)
   ↓
test
   ↓
package     appl. → JAR, WAR.
   ↓
Verify
   ↓
Install     generated Astifact
               → .m2.
   ↓
deploy      uploads Astifact
               to remote repo.

Notewise
