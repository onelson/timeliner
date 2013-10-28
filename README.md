Timeliner
=========

A collaborative space where people can assemble a narrative over time.


Goals
-----

To be able to define pieces of a narrative along a chronological (linear)
timeline, but then to also be able to reorder the pieces along the story
(non-linear) timeline.

Both views of the narrative should offer a rich experience by providing inline
access to art and media associated with each event.

While events are attached explicitly to a time, their distance from the origin
axis should be at the discretion of the user.

The linear view will indicate changes in the flow of time (flashbacks, jumps).
The non-linear will show the content in the order the audience will see it in
(kind of like reading a rich-media screenplay).

Objects
-------

* Events (or scenes) which will be tied to a time on the timeline.
* Assets (concept art, story board panels, music) are linked to events.
* Characters can also be defined and linked to Events and Assets.
* All objects can be tagged with concepts/themes which act as labels.
* Other objects (yet to be named) can model goals, obstacles, objectives,
  aspirations.
* Projects (or maybe "Shows") are the parent of all that is mentioned above.

Notes
-----

While I'm still not 100% sure of how this will work, I plan to have a few
different "modes" with regards to the units of time used on the timeline.
Some projects may not care about specific times, for example. They might want to
block things out by season, month, or super vague _"later"_ and _"previously"_.

Interactions should be relayed to the client as quickly as possible to help
promote collaboration, so we're probably talking about a socket implementation
of some kind.

While this is probably a distant-future feature, I'd like the objects in the
system to be versioned, with diffs where appropriate.

Setup for development
---------------------

Below is an abridged bash session showing the steps involved in getting a local
checkout of the project to the point where you should be able to run it and
start hacking.

     owen@gaff:~/projects$ git clone git@github.com:onelson/timeliner.git setup-example
     Cloning into 'setup-example'...
     remote: Counting objects: 117, done.
     remote: Compressing objects: 100% (76/76), done.
     remote: Total 117 (delta 35), reused 97 (delta 19)
     Receiving objects: 100% (117/117), 28.70 KiB, done.
     Resolving deltas: 100% (35/35), done.
     owen@gaff:~/projects$ cd setup-example/
     owen@gaff:~/projects/setup-example$ git checkout -b develop -t origin/develop
     Branch develop set up to track remote branch develop from origin.
     Switched to a new branch 'develop'
     owen@gaff:~/projects/setup-example$ git fetch
     owen@gaff:~/projects/setup-example$ mkvirtualenv demo
     New python executable in demo/bin/python
     Installing Setuptools..............................................................................................................................................................................................................................done.
     Installing Pip.....................................................................................................................................................................................................................................................................................................................................done.
     (demo)owen@gaff:~/projects/setup-example$ pip install -r requirements.txt
     [... snip ...]
     Successfully installed Django Fabric South djangorestframework ecdsa ipython paramiko pycrypto
     Cleaning up...

Important to note that invocations of `npm`, `grunt`, `bower`, `yo` or any
other node-based tools that are project specific should be performed from
inside the `client-src/` directory. This directory has all the configuration
files needed to ensure the results of these commands go into the proper
locations.

     (demo)owen@gaff:~/projects/setup-example$ cd client-src/

Install cli tools that we depend on but should not be indfluenced by
changes in our project dependencies
This is a one-time global install. If you don't want to install globally, you will
need to manage your PATH, and ensure the modules are in the node search
path when needed by grunt tasks.

     (demo)owen@gaff:~/projects/setup-example/client-src$ sudo npm install -g grunt-cli bower yo generator-angular less

     [... snip crazy amounts of output ...]

`npm install` will read the deps listed in our `package.json` and install them into `$PWD/node_modules`
These deps are usually going to be for grunt tasks, and are not meant to be
bundled with released source code (during deployment).

     (demo)owen@gaff:~/projects/setup-example/client-src$ npm install
     npm WARN package.json timeliner@0.0.0 No description
     npm WARN package.json timeliner@0.0.0 No repository field.
     npm WARN package.json timeliner@0.0.0 No README data

     [... snip crazy amounts of output ...]

Running `bower install` will read deps from our `bower.json` and will
install them into `client-src/app/components/`
These deps are sources and styles needed at runtime by the app. Things
like angular, jquery, and bootstrap are in here.

     (demo)owen@gaff:~/projects/setup-example/client-src$ bower install

The contents of `client-src/node_modules/` should look something like:

     (demo)owen@gaff:~/projects/setup-example/client-src$ ls node_modules/
     connect-livereload     grunt-contrib-connect   grunt-contrib-watch  karma                          karma-phantomjs-launcher
     grunt                  grunt-contrib-copy      grunt-google-cdn     karma-chrome-launcher          karma-requirejs
     grunt-autoprefixer     grunt-contrib-cssmin    grunt-karma          karma-coffee-preprocessor      karma-script-launcher
     grunt-concurrent       grunt-contrib-htmlmin   grunt-ngmin          karma-firefox-launcher         load-grunt-tasks
     grunt-contrib-clean    grunt-contrib-imagemin  grunt-open           karma-html2js-preprocessor     time-grunt
     grunt-contrib-coffee   grunt-contrib-jshint    grunt-rev            karma-jasmine
     grunt-contrib-compass  grunt-contrib-less      grunt-svgmin         karma-ng-html2js-preprocessor
     grunt-contrib-concat   grunt-contrib-uglify    grunt-usemin         karma-ng-scenario

The contents of `client-src/app/components/` should look something like:

     (demo)owen@gaff:~/projects/setup-example/client-src$ ls app/components/
     angular  angular-cookies  angular-mocks  angular-resource  angular-sanitize  angular-scenario  es5-shim  jquery  json3  twitter

To get the stylesheet for the site built initially, run:

    (demo)owen@gaff:~/projects/setup-example/client-src$ grunt less
    Running "less:development" (less) task
    File app/styles/main.css created.

    Done, without errors.

    Elapsed time
    less:development  682ms
    Total             682ms

During development, you'll want to "watch" for changes to stylesheets
Invoking `grunt watch` will monitor various directories and trigger
tasks when changes are detected.

    (demo)owen@gaff:~/projects/setup-example/client-src$ grunt watch
    Running "watch" task
    Waiting...

issuing this in a 2nd shell...

    owen@gaff:~/projects/setup-example/client-src$ echo '// lololol' >> app/styles/main.less

back in the 1st shell...

    (demo)owen@gaff:~/projects/setup-example/client-src$ grunt watch
    Running "watch" task
    Waiting...OK
    >> File "app/styles/main.less" changed.

    Running "less:development" (less) task
    File app/styles/main.css created.

    Running "copy:styles" (copy) task
    Copied 1 files

    Running "autoprefixer:dist" (autoprefixer) task
    File ".tmp/styles/main.css" created.

    Done, without errors.

    Elapsed time
    less:development   676ms
    autoprefixer:dist  77ms
    Total              753ms
    Completed in 2.382s at Sun Oct 27 2013 14:46:24 GMT-0700 (PDT) - Waiting...


Grunt Tasks
-----------

There are a number of other tasks availabe through `grunt`. Check the
`client-src/Gruntfile.js` for specifics, but the ones you'll probably want
right off the bat are:

 * `grunt less` compiles `client-src/app/styles/main.less` into `client-src/app/styles/main.css`
 * `grunt watch` watches directories for changes and runs certain tasks when stuff does
 * `grunt test` to run karma on specs found in `client-src/test/`
 * `grunt build` to run through script/css/html minification (results are deposited in `client-src/dist/`)

