---
title: Building a laundry booking system for my building
date: 2026-10-12
summary: Why I replaced the paper list on the laundry room door with a small web app, and what I learned making sure two neighbours can never book the same slot.
---

In our housing association the laundry room was booked the old-fashioned way. So I built
**LaundryBooking**: a small web app where neighbours pick a time slot in a calendar.

## How it works

Each day has three slots: 08–12, 12–16 and 16–20. You can book this month and the next,
hold up to three upcoming bookings at a time, and see who has booked a slot once you are
logged in.

The frontend is React and TypeScript. The backend is a small Flask API with a SQLite
database, which is plenty for a building's worth of users.

## The interesting part: double bookings

The obvious way to book a slot is to check whether it is free, and then insert the
booking. But if two people press the button at the same moment, both checks can pass
before either insert happens, and the slot ends up booked twice.

The fix is to let the database enforce the rule. A unique index on date and slot means the
second insert simply fails:

```sql
CREATE UNIQUE INDEX bookings_slot ON bookings (booking_date, booking_time);
```

The "three bookings per person" rule is checked inside a transaction that takes the write
lock up front, so that check and the insert cannot interleave with another request either.
A test fires eight simultaneous requests at the same slot and asserts that exactly one
succeeds.

## What I would tell myself at the start

- Enforce rules on the server. The frontend only mirrors them to give quick feedback.
- Never store passwords in plain text. Hashing them is one function call.
- Write tests for the rules that matter. They made every later change less scary.

The code is on [GitHub](https://github.com/Nisse00/LaundryBooking).
