# Docker & Kubernetes (1).pdf — Pages 10–18

## Page 10

host OS.

Volumes: Safest and preferred way to persist data
→ managed by docker, isolated from the core functionality of the host machine.
• Easy to backup, share
• Work Seamlessly across different OS environments.

Bind Mounts:

file, directory (box icon) → Container
host machine    maps.
→ any changes made in Source code gets mapped

So changes reflect instantly without rebuilding

Tmpfs Mount: Stores data strictly in host's System memory (RAM)

## Page 11

⑥ Namespaces: linux kernel feature → Namespace.

fs → dictates what Container can see on the disk.

Namespaces → dictates what container can see regarding OS.

→ provide an illusion → Ⓒontainer.
→ running on its own dedicated machine
isolated System resources from process inside container
→ No interference with process Outside of it.
Isolation

6 core namespaces:

• PID:
• NET:
• MNT
• USR:
• HOSTNAME:
?

## Page 12

Cgroups.

Cgroups determine what a container can use

Cgroup
→ limits
→ accounts
→ isolates     ]– resource usage.

→ Without it potential problems may arise.

• lets assume a container with a memory leak; CPU–intensive loop could consume 100% of VM resource

Starving all other containers and potentially crashing machine.

To Configure limits on container, config these cgroups limits using flags in <docker run> or <docker-compose.yml>

## Page 13

| Resource | Task |
| --- | --- |
| CPU | Restrict Container to Specific fraction of CPU cycle/bin to → Specific CPU Core. |
| memory | hard limit on ram consumption. above this limit linux OOM terminate process |
| Block I/O. | limits Speed at which container R/W → disk prevents bandwidth monopolizing |
| Network. | Shaping and throtting Outbound Net traffic to prevent bandwidth exhausion probable:[exhaustion, cut off at page edge] |
| Device. | Controls access betn Container → physical/Virtual devices on host system. |

Noisy Neighbour problem – multitenancy
→ Soln → Cgroups. provides isolation and partitioning resources within boundaries.

## Page 14

Docker Client & Networking (1.18)

Docker Client is the command line tool, used to Communicate with dockerd (Docker daemon)

When we run a command such as 'docker run nginx' DC→(DD) responsible for creating and managing container.

popular docker commands:

docker pull → Downloads an image
docker run → Creates and starts a container
docker images → lists all images
docker build → Creates an img from docker file.
docker ps -a → shows running, all containers
docker stop, rm, log <id>
docker exec -it <id> bash – interactive mode

## Page 15

Docker Networking

Allows containers to communicate with:

→ Other Containers
→ Docker host    • Via ports.
→ External Networks.

(C→C.)

Box containing: A (web), (small box), B (Sql)
→ Docker Network (Bridge) (DNB)

Step1. docker network create mynet

docker run -d --name Web -- network mynet nginx

mysql req
Web ————→ db
container      Container

docker run -d --name Sql -- network mynet mysql

(Host → Container) done with help of container ports.

port is where appl. in container listens to commnicate probable:[communicate] (browser → Host:port → Docker port fwd → Container port → Appl)

## Page 16

C → Outside Network .
Outside Net → C. (user)

curl https://ex.com.

process: C →
Docker Network
→ Docker Host
→ Internet
→ External Server.

<goes thru Docker NAT on host and reaches Outside Network.>

Outsider user wants to access docker Container

docker run -d --name web -p 8080:80 nginx
Host→ C.
  P     P

Routing would be done like.

Ext- Server (sees) →
Host IP
→ NAT →
containers pvt. Docker IP.

User →
(http://host-IP:8080)
→ Docker host
→ Container:80
→ Nginx.

Docker Overlay Network

Container to Container communication across different host machines

## Page 17

docker network create -d overlay my-net.

docker Service create --name web --network my-net nginx. C1 (M1)
docker Service create --name db --network my-net mysql. C2 (M2)

Web Container
↓ http://api:8080
Overlay Network
⇣⇣ Encapsulated network traffic
Docker Host 2
↓
API Container : 8080

Swarm Cluster
  Manager Node
    ⤷ Worker Node 1
    ⤷ Worker Node 2

container A
↓ Original packet
Docker Host 1
↓ Encapsulates packet
physical/ Cloud
↓
Docker Host 2
↓ Decapsulates packet
Container B

## Page 18

(Extras: 1.1.9 Docker Compose)

A tool for running multi-container applications with a Single yml file. instead of running a bunch of Separate docker run commands.

(manual)

Eq. docker network create mynet
docker run -d --network mynet --name db -e……… -v
docker build -t web
docker run -d --network mynet --name web -p …. -e ….

Compose:

docker compose up. create and start all services
down stop and rm -v (vol)
build rebuild img
logs -f tail logs across services
ps. list running services in this project.

Key Concepts: Each one becomes a container (service)
Compose auto–creates a shared network
attaches named volume for persistent

'depends ON' : 'Wait Until readdy probable:[ready]' – manages Startup order

build vs image : build → local [obscured by watermark, probable:[Dockerfile]]
image → registry [obscured by watermark, illegible]
