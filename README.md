# MyWomoApp
in der MyWomoApp kannst du deine Reiseorte eintragen ...

- Start your Webserver by typing into the console:
`php -S localhost:4200` [you can choose any port number]

- add a db-config-file in directory `/backend/db.config.php` with the following lines:
  ```
  <?php
  define('HOST', 'HOSTNAME');
  define('USER', 'USERNAME');
  define('PASSWORD', 'PASSWORD');
  define('NAME', 'DATABASE_NAME');
  ```
