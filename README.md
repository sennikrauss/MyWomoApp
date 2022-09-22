# MyWomoApp
In our MyWomoApp you can manage your travel destinations ...
We implemented a PWA, so you can add, edit and delete data in offline mode
and when you are back online it will be updated.

We implemented ...
- Login and Registration
- a responsive fronted, based on javascript, html, css and bootstrap
- a backend with PHP language
- a mysql-database
- installable app
- offline mode
- IndexedDB
- Background-synchronization for add, edit and delete data
- Push-Notifications
- Geolocation API
- Camera

### How to get started ...
- import the sql-script (`/backend/myWomoDiary.sql`) into your local database
- make sure PHP is installed
- go to `/service-worker.js` and look for the line ```const DOMAIN_BACKEND = 'http://localhost:4200/backend';``` --> make sure that this is your right domain
- add a db-config-file in directory `/backend/db.config.php` with the following lines:
  ```
  <?php
  define('HOST', 'HOSTNAME');
  define('USER', 'USERNAME');
  define('PASSWORD', 'PASSWORD');
  define('NAME', 'DATABASE_NAME');
  ```
- Start your local Webserver by typing into the console:
  `php -S localhost:4200` [you can choose any other port number]
