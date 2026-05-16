dove-nest-platform/
│
├── frontend/
│   ├── index.html                 (Dove Nest Homepage)
│   ├── catering.html              (Dove Caterers Homepage)
│   ├── css/
│   │   ├── dove-nest.css          (Blue-Green & Black Theme)
│   │   └── caterers.css           (Goan Vibe Theme: Terracotta, Ochre, Navy)
│   ├── ts/
│   │   ├── main.ts                (Haptics, Animations, Routing)
│   │   └── whatsapp-booking.ts    (WhatsApp API Logic)
│   └── js/                        (Compiled TS files)
│
├── backend-services/
│   ├── php-whatsapp-gateway/      (PHP: Routes form data to WhatsApp API)
│   │   └── process_booking.php
│   ├── python-reviews-api/        (Python: Fetches Google Reviews)
│   │   └── google_reviews.py
│   └── java-calendar-service/     (Java: Manages availability calendar)
│       └── AvailabilityCheck.java
