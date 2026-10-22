# Docker & Kubernetes (1).pdf — Pages 19–25

## Page 19

Aws Devops Part - II

2. KUBERNETES

Container orchestration Service.

Kubernetes also known as K8's, Open-source system for.
> Automating deployment
> Management of containerized apps.
> Scaling & Monitoring of Containers

[Diagram:] App → (arrows to) 1/ 2/ 3/ 4/ [small container boxes] → Server 1, Server 2, Server 3; Server 1 arrow → nodes.

Docker Containers | Kubernetes manages these containers

C3 crashes kubernetes automatically creates new container

can also add C's when traffic is increased (Auto-Scalling)   ← (arrow pointing to above)

< load balanicng >

## Page 20

what is exactly Container Orchestration :

Automatic Management of containers which involves :-
• deploying • Networking
• Start / stop. • load - balancing
• Scalling • Replacing crashed C.

II.2.1 Server (Nodes) : A Server (Node) in kubernetes (physical/Virtual) machine in a kubernetes cluster where Containers run.

II.2.2 Architecture of Kubernetes:

[Diagram:] Box: Phy/Vm — Node. — where kubernetes runs appl. Container. → A kubernetes cluster consists of group of nodes (1 or more)

[Three small boxes, each:] Phy/Vm — Node. — where kubernetes runs appl. Container. (Cluster)

to manage a cluster a specialized node called probable:[Master]

## Page 21

[Diagram:]

Cluster
└ CONTROL PLANE
   - Cloud Controller Manager → (arrow to cloud) Cloud provider API
   - ETCD (cylinder) ← kube-API Server (double-headed arrows between Cloud Controller Manager and kube-API Server)
   - kube-API Server (arrows in from Scheduler, Controller manager)
   - Scheduler → kube-API Server
   - Controller manager → kube-API Server

Node 1: kubelet, kube proxy → [dashed box: Pod, Pod, Pod] CRI
Node 2: kubelet, kube proxy → [dashed box: Pod] CRI
(Node 1 and Node 2 connect with arrows to kube-API Server)

## Page 22

(Workflow diagram)

[Diagram:]
Cluster.
- master API (circle) — labeled Api Server  ← Note (red arrow)
- master (API) → worker nodes: N, N, N
- worker node | woster node | woster node
(red note: Any worker Node can also be Selected as master)
(yellow note: Kubernetes agent (kubelet))
(white note: → machine that runs our appl. pods)

Components of Worker Node.

Kubelet : (arrow) communicates with control plane (master) → Ensure all pods/ Containers are running.

Container Runtime : Actually runs containers, eg containerd

Kube - proxy : provides kubernetes network & Service connectivity (Network rules). → Pod (CNI)

pods : Smallest deployable unit where Containers run.

## Page 23

Structure :
K8 Cluster.
→ Control Plane
→ Worker Nodes
   → Node 1
      →Pod : Frontend
         → Container
      →Pod : Backend
         → Container
      →Pod : Payment
         → Container
   → Node 2 → Pod → C
     (power)    (platform)    (Appl)
   → Node 3

Pod : Smallest deployable kubernetes unit that runs one or more Containers.
(Single Insstance of running process)

Components of Master Node.

API Server : provides an Interface (kubectl) CLI to use K8.

Schedular : Assign nodes to newly created Pods.

ETCD : Key - value store, having all cluster data; Config file, log file. stale.

Control Manager : responsible for managing [illegible]

## Page 24

II.2.3 Self Healing & Managing Container health.

Example: Worker Node 1: Pod₁→ Container

Worker Node 2: Pod₂ (goes offline)
Auto deploy ⊕ ↙
Worker Node 3: Pod₃ + Pod₂

Self-Healing in Kuberntes.

feature: autodetects failed or unhealthy pods ← takes corrective actions.

mainly done thru controllers : Deployment & Replica Set : Compare Desired vs Current State.

Problem. | Action :

Container Crash — Restarts the container

Pod fails — Create replacement pod.

Node becomes unavailable — Reschedule Pods on healthy nodes.

Application becomes unhealhty — Restart appl/ replace probable:[pod]

## Page 25

II.2.4 Replica Set, Deployment, Service

Replica Set : Ensures that a specified number of Identical pods are running at all times

Deployment : (D) Manages Replica Set and provides application updates and rollbacks

Handling Version Change :

Version 1 → nginx : 1.25   (D) ↘
Version 2 → nginex : 1.26   → creates new replica set
                                              ↙ gradually replace
                                    old ←
                                     pods

Service : provides stable network endpoint to access pod. , can also load balance traffic

Workflow :  Deployment
              ↓
                Replica Set
              [Pod 1, Pod 2 , Pod 3]
              ↓
                service ← probable:[Users]
