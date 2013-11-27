OCTO-FU-MI
==========

*Online real-time shi-fu-mi with support for LeapMotion*

Install
-------

    npm install

Test
----

    npm test

Build
-----

    npm run-script build

or

    grunt build:dist

Run
---

    node server [--port PORT (default 8124)] [--base BASEDIR (default tmp/public)] [--database MONGODBURI (default octo-fu-mi)]

Contribute
----------

    grunt server

or

    grunt test:server

run the node server with node-dev (`npm install -g node-dev`)

    node-dev server

LeapMotion
----------

If you have the LeapMotion service running (leapd on Linux) and a device connected
then it should be automatically detected by the web app.


You MUST allow the Websocket interface for you LeapMotion device.




License
-------

Don't know yet but ©2013 Florent Jaby for now.
