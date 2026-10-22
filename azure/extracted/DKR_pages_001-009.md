# Docker & Kubernetes (1).pdf — Pages 1–9

## Page 1

Aws Devops Part – I.

1. Docker: Packaging tool/Software helps to package libraries, dependencies and config files required to run a Software.

[Diagram: Application box — arrow pointing up to "Packaging tool/Software" — arrow curving down to Tester box]

→ Docker packaging img.

Tester.

helps to faciliate testing team to run and test software.

1.1.1. Container: A way to package an application with all necessary dependencies and configuration.

Can be easily shared, make developemnt & deployment efficient

## Page 2

Architecture of Docker

[Diagram box:]
Container
APP 1
Dependencies.

.... n containers

Docker Engine
↑
Operating System
↑
Hardware

runs on seperate env.

| Docker Container | VMs. |
| low impact on OS, very fast, low disk usage. | High impact on OS, Slower, high disk usage |
| sharing, re-building and distribution is easy | challenging |
| Encapsulates apps instead of whole machine | Encapsulate whole machine |

## Page 3

Docker Engine: the Software that allows us to build run and manage containers on a machine.

Contains:

1. Docker Client: Sends cmds to docker eg. docker run, docker build ...

[double arrow (up/down) between Docker Client and REST API]

2. REST API: Allow client to commuuni -cate with daemon ... vise versa

[double arrow (up/down) between REST API and Docker daemon]

3. Docker daemon (dockerd): background Service that listens for docker API req. and manages docker objects such as containers, images, network .... and Volumes

## Page 4

1.1.2

[Diagram: Docker file. → Image → (C) (C) (C)]

dep + lib to run
↑ prog.

Intance of an image. (Each isolated with its own file system)

serving under same underlying image layer.

It's is a Simple fat file with instructions to build an image

1.1.3. Docker registry is simple central repository for storing and distributing docker images.

[Diagram: Dockerfile → (app v1.0) Image → Docker Hub/Registry → tester can pull that img to test (app v1.0)]

ECR: Elastic Container Registry, allows to store, share, deploy Docker & OCI artifacts

uses IAM for permissions and scans for vulnerabilities.

1.1.4 Diff. image and Container

Container is the running environment for image.

## Page 5

[Diagram: Port. → Container. box: Fs (virtual), Env. Config, Appl. img.]

Helps to talk with Appl. running inside container

cmd: docker run -p 8000:3000 myapp
maps 8000 of host to 3000 of Container

1.1.5 Topics in Overview:

Docker file: text file with instructions to build an image, layer by layer

Common Instructions: (yaml)

- FROM: base image
- WORKDIR: Sets working directory inside the image
- CMD: what runs when container starts
- COPY/ADD: copies file from host into image
- RUN: Executes commands at build
- ENTRYPOINT: User argument gets appended
- ENV: Sets environment variables.
- EXPOSE: documents which port → container listens on

## Page 6

Image: Read-only immutable template built from a Dockerfile.

→ stack of layers + metadata (cmds, ports, env)

(filesystem diffs)

Images are stored locally or in a registry

Container: A running instance of an img.

[Diagram: img box]

Docker adds a thin writable layer on top of the image's read only layer

if container is deleted writable layer is gone image remains intact. ← Intact.

any changes during runtime go there

Docker port: Containers have their own private network namespace.

Expose <Port_No.> actually helps to establish connection: host → container

## Page 7

1.1.6 Amazon Elastic Container Service

Aws container orchestration service — runs and manages Docker containers at scale

Task definition: JSON blueprint → describes which images to run, CPU/memory, ports, envs.

Task: a running instance of task definition.

Service — keeps a specified number of task running, handles restarts integrates with load balancers.

1.1.7. Architecture of Docker Container

(a) filesystem: inside a docker container is layered, designed for • speed, • efficiency, • portability

(1) Union filesystem:

→ x Monolithic Disk image
→ ✓ layered Union FS, with stacks of lightweight layers on top of each other

## Page 8

process:

[Diagram: three stacked boxes]
Add a — img 1.0
Add b — img 1.1, img 1.0
Add C — img 1.2, img 1.1, img 1.0

(brace under all three) Appearing as Single unified System.

Image layers (Read-Only):

creates a new read-only layer shared across any container that uses the same image

Container layer (Read-Write):

img → container

→ Docker adds a thin ephemeral layer (rw), any changes happens in this layer

## Page 9

Copy-on-Write (CoW):

[Diagram:]
Read Write ← Docker copies it to
↑ then modifies.

file → needs modifying

read only → Original file. remains unchanged.

(2) Storage Drivers:

Required for handling and managing this complex stacking and merging of layers.

Eg: (latest) overlay2,

(legacy) aufs, btrfs, zfs and devicemapper.

(c) Persistent Storage (Data Management)

facilities provided by docker to preserve data in container layer there
