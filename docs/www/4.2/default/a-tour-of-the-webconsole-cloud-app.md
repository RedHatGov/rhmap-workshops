---
layout: lab
title: Modifying a Cloud App & Node.JS
subtitle: Understanding how cloud apps work
html_title: Modifying a Cloud App & Node.JS
categories: [lab, intro, welcome, developers, ops]
---

## Modifying a Cloud App & Node.JS

In this lab we will modify the cloud app.  Cloud app's are written in Node.JS, which is a open-source, cross-platform JavaScript runtime environment.  It was built from the ground up to be a server-side JavaScript engine with V8(Chrome engine).  Node.js uses a non-blocking, event driven I/O model that makes it lightweight and efficient, which is why it's ideal for microservices and mobile architecture. Event-driven models make it much easier for developers to write code that runs efficiently, without having to use complex threading models.
<img src="{{ site.baseurl }}/www/4.2/default/screenshots/threading_node.png" width="600"/><br/>
*Node.js event loop*

Additionally [NPM (Node Package Manager)](https://www.npmjs.com/) is Node.JS's open-source library.  It's one of the worlds largest open source communities.  NPM has over 350,000 packages and is rapidly growing.  

## Exploring the Studio's Editor.
For the section of the lab we will be using the studio's editor to modify the cloud app.  RHMAP provides the ability for developers to use both the browser or whatever tools they are comfortable with on their local environment.  In a later lab, we will modify code locally.  

1. Navigate to the **Projects** area.  

2. Open the project you have created in the previous lab.

3. Open the *Cloud App*.

4. Click **Editor** on the left sidebar.

This area lets you edit the source code of any file in the Git repository of the cloud app. The templated cloud app in this project leverages a framework called [Express](http://expressjs.com/).  Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-editor.png" width="600"/><br/>

## Editing the Cloud App
Now that we have navigated to the studio's editor lets explore what has been created for you already.  *application.js* is the starting point of the cloud app and contains the definitions to all the endpoints that are created.  The *test* folder has pre-generated acceptance testing for the application.  Finally, The *lib* folder has all the endpoints already created.  We will be modifying the default endpoint in this section.

Open *applicaion.js*.  *application.js* is on the root of the file selection.<br />
*application.js* handles all requests to the cloud app. The client app sends requests to the */hello* endpoint and the *application.js* file routes those requests to another file called *hello.js*.<br /><br />
To learn more about routing Express, which we use for routing in our templates, visit the [Express documentation website](http://expressjs.com/en/4x/api.html#express.router).

Open *lib/hello.js*.

Add a timestamp to the response object. <br/>
<blockquote>
<i class="fa"></i> Find this line(17 & 28):
</blockquote>
{% highlight JavaScript %}
res.json({msg: 'Hello ' + world});
{% endhighlight %}

<blockquote>
<i class="fa"></i> Change that line to the following:
</blockquote>
{% highlight JavaScript %}
res.json({msg: 'Hello ' + world, timestamp: new Date().getTime() });
{% endhighlight %}

<blockquote>
<i class="fa"></i> The GET handler should now look like:
</blockquote>
{% highlight JavaScript %}
hello.get('/', function(req, res) {
  console.log(new Date(), 'In hello route POST / req.body=', req.body);
  var world = req.body && req.body.hello ? req.body.hello : 'World';
  // see http://expressjs.com/4x/api.html#res.json
  res.json({msg: 'Hello ' + world, timestamp: new Date().getTime() });
});
{% endhighlight %}

<blockquote>
<i class="fa"></i> The POST handler should now look like:
</blockquote>
{% highlight JavaScript %}
hello.post('/', function(req, res) {
  console.log(new Date(), 'In hello route POST / req.body=', req.body);
  var world = req.body && req.body.hello ? req.body.hello : 'World';
  // see http://expressjs.com/4x/api.html#res.json
  res.json({msg: 'Hello ' + world, timestamp: new Date().getTime() });
});
{% endhighlight %}

<blockquote>
<i class="fa"></i> Feel free to copy this code and overwrite the whole file:
</blockquote>
{% highlight JavaScript %}

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
function helloRoute() {
    var hello = new express.Router();
    hello.use(cors());
    hello.use(bodyParser());
    // GET REST endpoint - query params may or may not be populated
    hello.get('/', function(req, res) {
        console.log(new Date(), 'In hello route GET / req.query=', req.query);
        var world = req.query && req.query.hello ? req.query.hello : 'World';

        // see http://expressjs.com/4x/api.html#res.json
        res.json({msg: 'Hello ' + world, timestamp: new Date().getTime() });
    });
    // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
    // This can also be added in application.js
    // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
    hello.post('/', function(req, res) {
        console.log(new Date(), 'In hello route POST / req.body=', req.body);
        var world = req.body && req.body.hello ? req.body.hello : 'World';

        // see http://expressjs.com/4x/api.html#res.json
        res.json({msg: 'Hello ' + world, timestamp: new Date().getTime() });
    });
    return hello;
}
module.exports = helloRoute;
{% endhighlight %}

Save your changes by clicking **File > Save** in the editor. <br />
The changes are saved to the Git repository of the cloud app. To propagate the changes to the running instance, you must re-deploy the cloud app.

Click **Deploy** on the sidebar on the left.

Click **Deploy Cloud App**. <br />
You will now be able to see the timestamp on the client app.

## Summary
With simple templated routes a developer can rapidly develop end points for mobile apps.  In a later lab we will develop a mBaaS service that interfaces with preexisting infrastructure.  As you begin developing these reusable pieces it will become faster and faster to create and deploy apps.  
