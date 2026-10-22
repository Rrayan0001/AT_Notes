# MAVEN.pdf — Pages 8–13

## Page 8

Plugin &
goal
relation
-ship

Plugin collection of tasks to be
performed by Maven
(compile, testing, packaging)

Goal however refers to any
single task provided by
plugin

Relationship:
→ Goals (performs specific task)
tool
toolbox → Plugin

hence we can say plugin = collection
of goals.

Version:
x.y.z → Build (minor)
↘ patch.
↳ Generation (major)

Version in maven is referred as
specific build / release of the
project or dependency
helps maven determine probable:[correct ver-]
of a[n] [rest obscured by watermark / cut off at page edge]

## Page 9

Settings.xml

Maven Configuration file used to
define settings that are not specific
to a single project.

Can contain

• repository configuration
• credentials for private repository
• proxy settings
• profile and environment specific
settings.

Pom.xml (details)
pom.xml
<contents>

A) project root element.

contains important project related
information, root element of every
maven file.

Syntax/Content

<project>
• <modelVersion>

## Page 10

• <groupID>
• <artifactId>
• <version>

• <dependencies>
• <build>
</project>

B) properties

used to declare/ define custom
variables values that can be
reused throughout pom.xml.

avoid repeatation, promotes
reusability

```
<properties>
   <property-name> value
        </property-name>
</>
${value.name} ......... use any
value.
```

## Page 11

C) Dependencies

The <dependencies> element is used
to define the external libraries
that a Maven project needs.

Maven automatically downloads
required dependencies from a
configured repo and adds them
to the project.

Syntax

```
<dependencies>
  <dependency>
     <groupId> </>
     <artifact> </>
     <version> </>
   </>
</>
```

Transitive dependency:

Transitive dependency → automatically
included
by Maven
because direct
dependency needs it.

## Page 12

Eq.

project need LibA → needs.
maven includes LibB

D) Plugins.

used to Configure Maven Plugins
that perform specific tasks
during the build process.

Plugins can compile code, run
tests, package application, generate
report.

Plugin + Goal
Plugin → Contains
goals → Goals
perform action.

```
<build>
   <plugins>
      <plugin>
         G
         A
         V
         <config>
            <source>
            <target>
         </config>
      </plugin>
      </>
```

## Page 13

G) Goals

Goals is a specific task or action
performed by Maven plugin

mvn <plugin-prefix>:<goal>

H) Profile: Set of Configuration
values that can be activated to
customise the maven build for
different environment or situation

profile → Dev
→ uat
→ prod
→ defined in <id> tag

Syntax:
```
<profiles>
   <profile> → profile name
      <id> p_name </id>

      <properties>
         values specific to
         that profile.
      </>
   </>
</>
```
