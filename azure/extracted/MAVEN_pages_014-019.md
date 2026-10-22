# MAVEN.pdf — Pages 14–19

## Page 14

How to run profile:

mvn compile -Pdev
mvn compile -Pdev,P₁,P₂,P₃.

multi-profiling: Yes we can activate multiple profile by separating their ID's with commas.

-Pdev,P₂,P₃ ......

GAV: GroupId + ArtifactId + Version.
(unique Maven Coord.) — Combination Maven uses to uniquely identify a project in a maven repository

1. GroupId: (owner) — groupId identifies the organisation, company. or group that owns the project.
2. ArtifactId: (unique identifier) — identifies the actual project/library name.
3. Version: identifies the specific release of that artifact

## Page 15

Eq. <groupId> com.example </>
      <artifactId> payment-service </>
      <version> 3.14.0 </>.

Case Study:

<dependency>
    <grpId>
        org.apache.commons.
    </>
    <artifactId>
        commons-lang3
    </>
    <version>
        3.14.0
    </>
</dependency>

Maven will compile it as:

org.apache.commons:commons-lang3: 3.14.0.

Structure:
Repository
 └ groupId
 └ artifact·Id
 └ version
 └ artifact file

## Page 16

Sample → pom.xml

Here is a simple sample pom.xml showing the important sections:

```
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">

  <!-- POM Model Version -->
  <modelVersion>4.0.0</modelVersion>

  <!-- GAV -->
  <groupId>com.example</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0.0</version>

  <!-- Packaging -->
  <packaging>jar</packaging>

  <!-- Project Properties -->
  <properties>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
  </properties>

  <!-- Dependencies -->
  <dependencies>

    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>5.10.0</version>
      <scope>test</scope>
    </dependency>

  </dependencies>

  <!-- Build Configuration -->
  <build>
    <plugins>

      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.11.0</version>
      </plugin>

    </plugins>
  </build>

</project>
```

Main parts to remember

Section Purpose

<modelVersion> Defines POM model version
<groupId> Identifies the organization/project
<artifactId> Name of the project/artifact
<version> Project version
<packaging> JAR, WAR, etc.
<properties> Stores project configuration/properties
<dependencies> Libraries required by the project
<build> Build configuration
<plugins> Tools that perform Maven build tasks

GAV = GroupId + ArtifactId + Version

```
com.example : my-app : 1.0.0
      ↑          ↑         ↑
    GroupId   ArtifactId Version
```

## Page 17

Maven Repository.

Storage location where maven keeps artifacts, maven uses this repos to find dependencies needed by project to store/download build artifacts.

(3 main types of)
local Repository    Central Repository    Remote Repository

local repository: Stores dependencies/artifacts on our own machine.

local repository is a folder on local machine where maven stores dependencies and artifact that it has downloaded or installed

Workflow:

Maven needs any artifact
  ↓ (checks.
  ↓
~/.m2/repo
  ↓ if not found
  ↓
downloads. it to .m2

## Page 18

Default location: ~/.m2/repository

local repository is used for:
• Caching downloaded dependencies
• Avoiding repeated downloads
• Storing artifacts, plugins
• Making builds faster.

Central Repo:

public repository over the INTERNET where most widely used dependencies, Java lib, maven artifacts are stored.

Used for:

• Downloading publicly available dependencies
• Getting open-source libraries

Remote repository:

Remote repo stores custom-modified artifacts generally company specific often are

## Page 19

private and not open to public (Internal Company Artifact)
Owned by company or Organisation.
Nexus / Jfrog / Artifactory.

Maven Archetype:

Instead of manually creating project template and directory

mvn archetype : generate

 → my-project/
 ├→ pom.xml
 ├→ src/
 │  ├→ main/
 │  │  ├→ java/
 │  ├→ test/
 │     ├→ java/
