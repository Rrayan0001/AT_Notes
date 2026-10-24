# event bridge.pdf — Pages 1–3

## Page 1

# Amazon EventBridge — Core Concept

## Problem: polling vs events

Scenario: Your application needs to react to things that happen — an EC2 instance stops, a user signs up in Spotlight, a Salesforce company deal closes or a code pipeline build fails. These are events.

Without EventBridge → polling architecture:
- Application polls EC2 API every 30s → "any state changes?"
- App polls CodePipeline every few seconds → "any builds closed?"
- Polls Salesforce every 5 min → "any deals?"

Disadvantages:
- Delayed reactions
- Multiple blank API calls as there is no change
- Tight coupling
- No central event routing

With EventBridge → near real-time reactions:
- Event delivery < 500 ms
- Zero polling
- Central routing

## Definition

EventBridge is a fully managed, serverless event bus that connects applications using events from AWS services, SaaS partners, and your own applications, routing them to targets via rules.

## Key Terms

- Event: A JSON document describing something that happened.
- Events routes from: AWS services (automatically — no code needed from AWS to publish), SaaS partners, your own application.

---

## Page 2

## Key Terms (continued)

- Event Bus: The pipeline that receives events and sends them to targets.
- Rule: Matches events by pattern, routes them to targets.
- Target: Destination — SQS, Lambda, Step Functions, another account's EventBridge bus, etc.
- Schema: Definition of what an event looks like (field names / types).
- EventBridge API: Used for event-driven microservices architectures.

## Event Structure (example)

An event is a JSON document that describes what happened:

```json
{
  "source": "aws.ec2",
  "detail-type": "EC2 Instance State-change Notification",
  "detail": {
    "state": "stopped"
  }
}
```

- `source` → who sent it.
- `detail-type` → kind of description of what happened.
- `detail` → specifics: what state changed.

Unlike SNS, EventBridge routes events; it does not store them.

---

## Page 3

## Event Bus Types

1. Default Event Bus:
   - Automatically created in every AWS account.
   - Cannot be deleted.
   - Automatically receives events from AWS services (no code needed to publish).
   - Use for monitoring.

2. Custom Event Bus:
   - You create and name these buses yourself.
   - One per application/domain.
   - Receives events from your own application.
   - Used for building event-driven microservices architectures.

3. Partner Event Bus:
   - Created automatically when you enable SaaS partner integration.
   - Receives events directly from third-party SaaS applications (Salesforce, Datadog, GitHub, Zendesk, etc.).
   - Handles SaaS events natively — not possible with SNS/SQS.

## Rule Matching

- Rule pattern = condition to match.
- Compares incoming event (JSON) to the pattern; if matched → routed to target; if not matched → ignored.
- Detail matching supports OR logic, e.g. `state: ["stopped", "terminated"]`.
- Schema registry defines the event shape.

## Properties Summary

- Like SNS, EventBridge routes events, but does not store them.
- Targets can be cross-account EventBridge buses.
- Only EventBridge (not SNS/SQS) handles SaaS partner events natively.
