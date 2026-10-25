# SAP Notes — Full Transcription

**Assembled from:** the scanned SAP notebook (9 pages), transcribed into one
continuous page sequence. Page numbers below are shelf numbers: the notebook sits
on its own shelf numbered 1–9, and `## Page N` means shelf page N.

**What is preserved exactly as written:** original spelling and capitalisation,
grammatical errors, wrong facts and broken code, `[illegible]` markers, struck-out
text, scanner watermarks, and page-level defects. This is a transcription, not a
correction.

## Shelf map

| Shelf pages | Notebook |
|---|---|
| 1–9 | SAP Notes |

---

## Page 1

SAP PE OVERVIEW:

SAP PE converts demand into a feasible production
Plan and then into actual manufacturing.

PP modules (Sub): 18
PP - 60
PP - MRP - Materials
PP - CRP → Capacity
PP - SPC → Manages Production Execution
PP - PE → Production Execution
PP - REM → Repetitive manufacturing
PP - KANBAN
PP - DM

Manufacturing types: 14
- Discrete - Ex: Automobile, Electronics
- Process - Ex: Pharma, Food
  → uses - BOM, Routing, Work Center
  → uses - Master Recipe, Resources
- Repetitive - Ex: Consumable Goods, Fasteners
High volume, No individual Production orders.

---

## Page 2

KANBAN - Pull-based replenishment
uses control cycle.

Production Strategies:
MTS - Forecast, customer buys from stock
MTO - production start after order
ATO - Final assembly after order
ETO - Design happens after customer order

PP organizational units:
Plant
BOM, Routing, Stock, MRP Settings, Work Centers
Storage location
Raw material store, Finished Goods store
MRP area
Planning subdivision within a plant.
MRP controller
Responsible for planning materials
Production scheduler
Production & execution
Work center
Machine

PP A
PP 7
PP -
PP -
PP

---

## Page 3

PP integration:

Machine Production line or labor group
PP + MM - generates material requirements
PP + SD
PP + QM
PP + PM
PP + FI/CO
MD04

4 Important People in PP:
Production Planner
Production supervisor
Machine operator
Plant Controller

Important Transactions:
Master Data - MDEL, MOOL, MMOI, CS01, CROI, CA
Planning - MD01, MD61, MD04
Execution - CO01, CO11N
Monitoring - CO024, MBSI

---

## Page 4

SAP PP helps organisations to Plan,
manufacture and control the process of
Production.

Integrates with - MM, SD, QM, WM

Objectives - PP, MP, CP, PF, IC

Material master - central repository of
information about a material.

Material types - ROH, HALB, FERT, HAWA, VERP

Views - Basic Data, MRP Views, Purchasing View,
Accounting View, Storage View, Work Scheduling
view.

Bill of Materials - list of materials required
to manufacture a product.

Required for - MRP,
Production order creation
Cost calculation, component explosion

Routing defines the sequence of operations
required to manufacture a product.

---

## Page 5

Routing contains - operations, work centers,
control keys, standard values.

Why it is required - scheduling, capacity planning,
costing, Production Execution

Production Version: This links BOM, Material
and Routing into a valid production process.

Why - Must know which BOM to use and
which Routing to use for production

Demand management - It is used to
plan the future demand for products.

Main output - PIR

Better planning, Material availability, capacity
planning, reduce shortages

Benefits

SOP - High level planning process that
balances Sales Forecast, Production capacity
and Inventory Levels.

---

## Page 6

Control key
is present in
a routing operation
Determines how an operation
is to be scheduled,
costed.

PP01 - scheduling + capacity planning only
Standard Value Key - Defines standard
values that can be entered in routing
Center formulas
Purpose - links routing values with work
center formulas

---

## Page 7

SOP
Purpose - converts business forecasts into
production plans

Flow - Sales Forecast
SOP
Demand Management
MRP
Production

LTP - Simulation planning tool used to
analyze future scenarios without impacting
actual planning data.

Work center: represents location or resource
where production operations are
carried out

Functions - scheduling, capacity planning,
costing, production execution

Views - Basic Data, Default Values, Capacity, Scheduling

---

## Page 8

ERP - is a software that integrates all business
processes into a single system.

Helps - Finance, Procurement, Sales, Inventory,
Production, Human Resources.

Benefits - Real-time information,
Better decision-making, Reduced data duplication,
Improved Productivity

Modules in ERP - PP, MM, SD, FI, CO, QM,
PM, WM, HCM

SAP - Systems Applications and Products
in data processing.

Purpose - Manage business processes, Integrated
departments, improve efficiency,
make data-driven decisions

SAP S/4 HANA - latest ERP Suite
S = simple
4 = Fourth Generation
HANA: High-Performance Analytic Appliance

---

## Page 9

HANA
in-memory data base
stores data in memory
Faster processing, Real time reporting,
Faster MRP runs, better analytics

Master Data - Data that remains relatively
stable and is used repeatedly.
Material Master, BOM, Routing, Work Center, Production Version

Transactional data - created by day-to-day
business needs
Example - Purchase order, Goods Receipt, Goods issue,
Production order, Sales order

Structure - Client → Company code → Plant
→ Storage location → Hierarchy

End-to-End manufacturing Flow:
Demand → PIR → MRP → Planned order →
Production order → Goods issue → Production
confirmation → Goods receipt.

---

**Extent:** 9 shelf pages across 1 notebook.
Transcription date: October 2026.