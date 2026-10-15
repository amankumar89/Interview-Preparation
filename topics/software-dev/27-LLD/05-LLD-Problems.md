# LLD — 05 LLD Problems

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. How would you design a parking lot system?

**Interview Answer:**

Model `ParkingLot`, `Floor`, `Spot`, `Vehicle`, `Ticket`, and `Payment`. A spot has a type and availability; a parking strategy selects a compatible spot; the ticket records entry time, vehicle, and spot; a pricing strategy calculates the fee at exit.

Keep spot allocation, pricing, and payment behind interfaces so rules can change independently. The lot must prevent two concurrent requests from reserving the same spot.

---

### Q2. How would you design an elevator system?

**Answer:**

Represent elevators, floor requests, cabin requests, and elevator states such as idle, moving, and maintenance. A dispatcher assigns requests, while a movement strategy decides the next stop based on direction, distance, and pending requests.

Separate request scheduling from physical movement. Handle duplicate requests, overload, emergency stop, unavailable elevators, and requests that arrive while an elevator is moving.

---

## Core Concepts

### Q3. How would you design a library management system?

**Answer:**

Use separate concepts for `Book` (title metadata), `BookCopy` (a borrowable physical copy), `Member`, `Loan`, `Reservation`, and `Fine`. A catalog searches books, while a lending service enforces checkout and return rules.

A book can have many copies, and a member can have multiple loans subject to policy. Keep availability derived from copy and loan state rather than storing conflicting boolean flags in several places.

---

### Q4. How would you design a vending machine?

**Answer:**

Model the machine as a state machine with states such as idle, item selected, payment pending, and dispensing. `Inventory` manages item quantities, `PaymentProcessor` validates money, and a `ChangeCalculator` returns change.

Every transition should define invalid actions, such as selecting an unavailable item or cancelling after dispensing. The operation must either dispense and settle payment or return the payment without leaving partial state.

---

### Q5. How would you design a notification system?

**Answer:**

Define a notification request containing recipient, template, channel, and idempotency key. A channel interface supports email, SMS, and push adapters. A dispatcher selects channels, while a template renderer and delivery policy remain separate concerns.

For production behavior, add retries with bounded backoff, dead-letter handling, provider error classification, rate limits, and delivery status. Idempotency prevents retries from sending duplicate notifications when the provider supports an idempotency key.

---

## Code-Based Questions

### Q6. Which patterns are useful when designing a notification system?

**Answer:**

Strategy allows channel-specific delivery, Factory or a registry selects a channel, Adapter hides provider SDK differences, and Observer or domain events decouple business actions from notification dispatch. Use only the patterns that clarify a real variation point.

The core use case should depend on `NotificationChannel`, not on `EmailSdk` or `SmsSdk` directly.

```java
public interface NotificationChannel {
	DeliveryResult send(Notification notification);
}

public final class NotificationService {
	private final Map<ChannelType, NotificationChannel> channels;

	public DeliveryResult send(Notification notification) {
		NotificationChannel channel = channels.get(notification.channel());
		if (channel == null) {
			throw new UnsupportedOperationException("Channel is unavailable");
		}
		return channel.send(notification);
	}
}
```

---

## Scenario-Based Questions

### Q7. How would you design a thread-safe rate limiter?

**Answer:**

Choose a policy such as token bucket or sliding window, define the key being limited, and make the check-and-update operation atomic. A token bucket stores capacity, refill rate, and current tokens; each request consumes a token if one is available.

For a single process, synchronized state or atomic operations may be enough. For multiple instances, use a shared store with an atomic script or command, define clock behavior, and decide whether failure of the store is fail-open or fail-closed.

---

### Q8. How would you review an LLD solution for a chess game?

**Answer:**

Separate board state, pieces, move validation, turn management, game status, and player input. A `Piece` can expose legal movement rules, while a game service verifies board occupancy, turn ownership, check, checkmate, promotion, castling, and en passant.

Avoid making the board responsible for every rule or using a large switch on piece type. Use immutable move commands or a move history if undo, replay, or auditing is required. Validate that a move does not leave the current player's king in check.

---

## Debugging Questions

### Q9. A parking lot occasionally issues two tickets for one spot. What would you investigate?

**Answer:**

Inspect whether availability check and reservation are separate operations. They must be one atomic operation protected by a lock, transaction, or compare-and-set mechanism. Also check duplicate retries, stale caches, and whether multiple application instances share the same source of truth.

Add a unique constraint or equivalent invariant at the persistence boundary, return a conflict for a lost race, and make the caller retry with a fresh spot selection when appropriate.

---

## Quick Revision

- Model domain concepts, not only database tables or UI actions.
- State machines make allowed transitions and invalid actions explicit.
- Strategy isolates policies such as pricing, allocation, and delivery.
- Thread safety must cover the whole check-and-update operation.
- Idempotency, retries, and failure handling are part of production LLD.
