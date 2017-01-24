---
layout: lab
title: 5. Modifying a Cloud App & Node.JS
subtitle: Understanding how cloud apps work
html_title: Modifying a Cloud App & Node.JS
categories: [lab, intro, welcome, developers, ops]
---

## Modifying a Cloud App & Node.JS

In this lab we will modify the cloud app to get the weather requested by the client application we will be creating a later lab.  Cloud app's are written in Node.JS, which is a open-source, cross-platform JavaScript runtime environment.  It was built from the ground up to be a server-side JavaScript engine with V8(Chrome engine).  Node.js uses a non-blocking, event driven I/O model that makes it lightweight and efficient, which is why it's ideal for microservices and mobile architecture. Event-driven models make it much easier for developers to write code that runs efficiently, without having to use complex threading models.
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

<blockquote>
<i class="fa fa-desktop"></i> Click on application.js to open it.
</blockquote>
*application.js* is on the root of the file selection.  *application.js* handles all requests to the cloud app. The client app sends requests to the */hello* endpoint and the *application.js* file routes those requests to another file called *hello.js*.<br /><br />
To learn more about routing Express, which we use for routing in our templates, visit the [Express documentation website](http://expressjs.com/en/4x/api.html#express.router).

<blockquote>
<i class="fa fa-desktop"></i> Copy this code over application.js
</blockquote>
{% highlight JavaScript %}
var mbaasApi = require('fh-mbaas-api');
var express = require('express');
var mbaasExpress = mbaasApi.mbaasExpress();
var cors = require('cors');


// list the endpoints which you want to make securable here
var securableEndpoints;
securableEndpoints = ['/currentWeather'];

var app = express();

// Enable CORS for all requests
app.use(cors());

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaasExpress.sys(securableEndpoints));
app.use('/mbaas', mbaasExpress.mbaas);

// allow serving of static files from the public directory
app.use(express.static(__dirname + '/public'));

// Note: important that this is added just before your own Routes
app.use(mbaasExpress.fhmiddleware());

app.use('/currentWeather', require('./lib/currentWeather.js')());

// Important that this is last!
app.use(mbaasExpress.errorHandler());

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port);
});
{% endhighlight %}

<blockquote>
<i class="fa fa-desktop"></i> Save your changes by clicking <b>File > Save</b> in the editor.
</blockquote>

The changes are saved to the Git repository of the cloud app. To propagate the changes to the running instance, you must re-deploy the cloud app.


We modified two important pieces of code when we overwrote that code.    
<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-getweather-cloud-application-line9.png" width="600"/><br/>
We first modified the endpoints so we only accept requests from 'currentWeather'.

<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-getweather-cloud-application-line26.png" width="600"/><br/>
We also modified where to route the request.

We now must create the file that we are routing our requests to.  
<blockquote>
<i class="fa fa-desktop"></i> click <b>lib</b> in the file tree to select the folder.
</blockquote>

<blockquote>
<i class="fa fa-desktop"></i> To create a file click <b>File > New File</b> and name the file: currentWeather.js
</blockquote>

<blockquote>
<i class="fa fa-desktop"></i> Copy the following contents into the newly created file.
</blockquote>
{% highlight JavaScript %}
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var $fh = require('fh-mbaas-api');

function currentWeatherRoute() {
  var currentWeather = new express.Router();
  currentWeather.use(cors());
  currentWeather.use(bodyParser());

  // All REST endpoint - query params may or may not be populated
  currentWeather.all('/', function(req, res) {
      var req = req;
      var res = res;
      console.log('lat & lon:' + lat + " & " + lon);
        $fh.service({
            "guid" : "2562mt36wrp5keheo67nwsqy", // The 24 character unique id of the service
            "path": "/weather", //the path part of the url excluding the hostname - this will be added automatically
            "method": "POST",   //all other HTTP methods are supported as well. for example, HEAD, DELETE, OPTIONS
            "params": {
                "lat": req.body.lat,
                "lon": req.body.lon
            }, //data to send to the server - same format for GET or POST
                "timeout": 25000, // timeout value specified in milliseconds. Default: 60000 (60s)
                "headers" : {
                // Custom headers to add to the request. These will be appended to the default headers.
            }
            }, function(err, body, res2) {
                console.log('statuscode: ', res2 && res2.statusCode);
                if ( err ) {
                    // An error occurred during the call to the service. log some debugging information
                    console.log('service call failed - err : ', err);
                } else {
                    console.log('Got response from service - status body : ', res2.statusCode, body);
                    //convert from kelvin
                    var temp = ((  body.main.temp - 273.15) * 9/5) + 32
                    res.json({msg: 'Temperature: ' + temp.toFixed(2) + "&#8457;"});
                }
        });
  });

  return currentWeather;
}

module.exports = currentWeatherRoute;
{% endhighlight %}

<blockquote>
<i class="fa fa-desktop"></i> Save your changes by clicking <b>File > Save</b> in the editor.
</blockquote>

<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-getweather-cloud-currentweather-line12.png" width="600"/><br/>
<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-getweather-cloud-currentweather-line16.png" width="600"/><br/>
<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-getweather-cloud-currentweather-line36.png" width="600"/><br/>
<blockquote>
<i class="fa fa-desktop"></i> Select /lib/hello.js in the editor's side bar.  Then select <b>File > Delete</b> and confirm deletion of hello.js
</blockquote>
We no longer need the original route for this cloud application and we can remove it.

<blockquote>
<i class="fa fa-desktop"></i> Click <b>Deploy</b> on the sidebar on the left.  
</blockquote>

<blockquote>
<i class="fa fa-desktop"></i> Click <b>Deploy Cloud App</b>.
</blockquote>

## Summary
With simple templated routes a developer can rapidly develop end points for mobile apps.  The app we developed will interface with the client app that was created in this welcome project.  We will be coming back to this cloud app in a later lab to see the changes you've made on a device.
