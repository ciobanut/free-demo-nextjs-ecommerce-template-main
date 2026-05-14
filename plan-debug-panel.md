
---

# Global Debug Panel

Create a floating debug panel visible on every page.

Position:

* bottom-right
* collapsible

Display:

* current page
* device
* scroll %
* time on the current page
* last event (click, scroll, form submit, etc.)
* heartbeat count
* last payload
* current URL
* current referrer

Add:

* live event timeline
* fake network log
* payload inspector

The panel should update in real time.

---

# Global Testing Panel

Create another floating panel specifically for simulations.

Include controls for:

* simulate direct traffic
* simulate organic traffic
* simulate social traffic
* simulate paid traffic
* simulate AI traffic
* simulate referral traffic
* simulate email traffic

Add buttons:

* simulate returning user
* clear session
* clear localStorage
* reset visitor
* simulate inactivity
* simulate rage clicks
* simulate abandoned cart
* trigger exit intent
* trigger popup
* trigger CTA banner
* trigger custom event

---

# Tracking Scenarios

Support testing:

* direct traffic
* organic traffic
* social traffic
* paid traffic
* referral traffic
* AI traffic
* email traffic
* internal navigation

Use:

* URL params
* fake referrer overrides
* localStorage flags

Examples:

```txt
?utm_source=google&utm_medium=cpc
?utm_source=facebook&utm_medium=paid_social
?utm_source=newsletter&utm_medium=email
```

---

# Custom Event Simulation

Add buttons throughout the site:

```js
window.behavora.track('cta_clicked');
window.behavora.track('product_viewed');
window.behavora.track('checkout_started');
window.behavora.track('checkout_abandoned');
window.behavora.track('purchase_completed');
window.behavora.track('banner_clicked');
window.behavora.track('popup_opened');
window.behavora.track('high_engagement_detected');
```

---

# Mobile + Tablet Simulation

Add controls to simulate:

* desktop
* mobile
* tablet

Change:

* viewport classes
* widget payload device type
* layout responsiveness

---

# Verification Checklist

1. Widget loads on every page
2. Tracking requests hit `/track`
3. Debug panel updates in real time
4. Session persists across pages
5. Scroll tracking works
6. Click tracking works
7. Rage click simulation works
8. Checkout abandonment generates events
9. Traffic source simulation changes payloads
10. Mobile interactions generate events
11. Long reading sessions trigger heartbeats
12. Popups and banners generate analytics events