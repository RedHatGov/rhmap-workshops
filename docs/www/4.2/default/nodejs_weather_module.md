---
layout: lab
title: Your first Node.js Endpoint
subtitle: Using node.js to access preexisting infrastructure.  
html_title: Weather Cloud App
categories: [lab, developers, forms]
---

## Creating a services

1. In the studio's header select **Services & Api's**.  This page will list all preexisting mBaaS apis and allow you to create/modify more.  

2. Select **Provision mBaaS Service API**.  The follow page will list all preexisting services templates that Red Hat provides.  Many common services such as Salesforce, MongoDB and MySQL connectors are there to making connecting to your existing infrastructure easier.  If a service doeesn't exist within Red Hat's templates we can create a new one like we will in the lab.

3. Choose **New mBaaS Service** and name your service '\<yourname\>\_weatherService'.  Click **Next** to procede.

4. Once the bar turns green, click **Finish** to continue to the service *Details*.
<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-build-progress.png" width="600"/><br/>

5. On the *Details* page, tick the "Make this Service Public to all Projects and Services".
<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-allprojects.png" width="600"/><br/>

6. Select *Save Services* and confirm to redeploy.  


## Redploying and Cleaning the Stage

1. Tick **Clean Stage**.  This will clear your node.js project and send any new configurations to it.

2. Select your Node.JS runtime.  Any of the runtimes today will work for this lab, but we recommend the newest version of 4.X.X.

3. Select your environment which you would like to deploy this too.  Since we are still developing this mBaaS service, lets deploy this to *Development*.  This is the default.

7. Select the **Deploy Cloud App** button.
<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-service-deployed.png" width="600"/><br/>

## Exploring the endpoint
Endpoints are used to connect different services and apps together.  The blank mBaaS template we used to create this service has all the pieces to get you started and comes with a prebuilt endpoint already.

Click the URL after Current Host.  You will see the message "Your Node.js code is deployed and running. This file is served statically from public/index.html."  If you do not see this your service may not have completed deploying.

By adding '/hello' to the end of the url in your browser you can see your endpoint.  You should see the message "{"msg":"Hello World"}".

## Lets develop this locally!
Lets modify this code locally as its easier in an editor you are used too.  Since RHMAP stores all its code in git we can use all git commands and we aren't locked into using FHC to clone any code.

We will need the git URL that is associated to our mBaaS Service.  Navigate to the *Details* page to copy that link.

To start lets navigate our terminal back to the folder where we cloned everything. Once we are there we will clone the mBaaS service.

<blockquote>
<i class="fa fa-terminal"></i> Goto the terminal and type the following (replacing the git url with yours):
</blockquote>
{% highlight csh %}
$ git clone <git url>
$ cd <new service directory>
{% endhighlight %}

## Adding a New Endpoint
In this lab we will be creating a new endpoint to query a weather API.  We will need to modify the *application.js* file and create a new endpoint file.  We will start by modifying the *application.js* file

Open the *application.js* file in any editor you are comfortable in.  This time instead of modifying the hello route we will be creating a new route.
<blockquote>
<i class="fa"></i> Find this line(8):
</blockquote>
{% highlight Javascript %}
securableEndpoints = ['/hello'];
{% endhighlight %}

<blockquote>
<i class="fa"></i> Modify the code to look like:
</blockquote>
{% highlight Javascript %}
securableEndpoints = ['/hello', '/weather'];
{% endhighlight %}

<blockquote>
<i class="fa"></i> Find this line(25):
</blockquote>
{% highlight Javascript %}
app.use('/hello', require('./lib/hello.js')());
{% endhighlight %}

<blockquote>
<i class="fa"></i> Add a new line after the line you just found:
</blockquote>
{% highlight Javascript %}
app.use('/weather', require('./lib/weather.js')());
{% endhighlight %}

At this point your *application.js* file should read as follows(Feel free to paste this over your code if needed):
{% highlight Javascript %}
var mbaasApi = require('fh-mbaas-api');
var express = require('express');
var mbaasExpress = mbaasApi.mbaasExpress();
var cors = require('cors');

// list the endpoints which you want to make securable here
var securableEndpoints;
securableEndpoints = ['/hello', '/weather'];

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

app.use('/hello', require('./lib/hello.js')());
app.use('/weather', require('./lib/weather.js')());


// Important that this is last!
app.use(mbaasExpress.errorHandler());

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port);
});
{% endhighlight %}
Save *application.js*



### Lets Modify the Weather route

We will now need to create the *weather.js* file in the *lib* directory.
<blockquote>
<i class="fa fa-terminal"></i> Goto the terminal and type the following:
</blockquote>
{% highlight csh %}
$ cd lib
$ cp hello.js weather.js
{% endhighlight %}

Open the *weather.js* file in any editor you are comfortable in.

<blockquote>
<i class="fa"></i> On Line 5, Rename “helloRoute” to “weatherRoute”:
</blockquote>
{% highlight Javascript %}
function weatherRoute() {
{% endhighlight %}


<blockquote>
<i class="fa"></i> On Line 34 Rename “helloRoute” to “weatherRoute”:
</blockquote>
{% highlight Javascript %}
module.exports = weatherRoute;
{% endhighlight %}

<blockquote>
<i class="fa"></i> Rename the "hello" variables to "weather".  This will occur on lines 7,8,9,12,23 and 31:
</blockquote>
<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-find-hello.png" width="600"/><br/>

<blockquote>
<i class="fa"></i> On line 12 rename "weather.get" to "weather.all":
</blockquote>
{% highlight Javascript %}
weather.all('/', function(req, res) {
{% endhighlight %}

The *all* function we just changed from the *get* function covers both get and post.
<blockquote>
<i class="fa"></i> Delete lines 20-29.
</blockquote>
<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-delete-post.png" width="600"/><br/>

This lab will be using an external weather service.  Since we will no longer need the response from the previous method we can delete that.
<blockquote>
<i class="fa"></i> Deleting Lines 13-17 (inclusive)
</blockquote>
<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-delete-body.png" width="600"/><br/>

<blockquote>
<i class="fa"></i> Paste this line into line 13:
</blockquote>
{% highlight Javascript %}
//http://api.openweathermap.org/data/2.5/weather?q=washington,united%20states&appid=f6892c041e7d03a3165bbe815ceba731
{% endhighlight %}

Since we will be querying outside this mBaaS service we will need to import a new requirement.

<blockquote>
<i class="fa"></i> Add this line to your requirements at the top of the file(Line 5):
</blockquote>
{% highlight Javascript %}
var request = require('request');
{% endhighlight %}

We will now add the request call to get the weather information from the external
<blockquote>
<i class="fa"></i> Paste this code over line 12-15 inclusively:
</blockquote>
{% highlight Javascript %}
  // GET REST endpoint - query params may or may not be populated
  weather.all('/', function(req, res) {
    //http://api.openweathermap.org/data/2.5/weather?q=washington,united%20states&appid=f6892c041e7d03a3165bbe815ceba731
    request.get({
      url : "http://api.openweathermap.org/data/2.5/weather?q=washington,united%20states&appid=f6892c041e7d03a3165bbe815ceba731",
      json : true

    }, function(error, response, body){
        if (error){
          return res.status(500).json(error);
        }
        return res.json(body);
    });
  });
{% endhighlight %}


At this point your *weather.js* file should read as follows (Feel free to paste this over your code if needed):
{% highlight Javascript %}
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');

function weatherRoute() {
  var weather = new express.Router();
  weather.use(cors());
  weather.use(bodyParser());

  // GET&POST REST endpoint - query params may or may not be populated
  weather.all('/', function(req, res) {
    //http://api.openweathermap.org/data/2.5/weather?q=washington,united%20states&appid=f6892c041e7d03a3165bbe815ceba731
    request.get({
      url : "http://api.openweathermap.org/data/2.5/weather?q=washington,united%20states&appid=f6892c041e7d03a3165bbe815ceba731",
      json : true

    }, function(error, response, body){
        if (error){
          return res.status(500).json(error);
        }
        return res.json(body);
    });
  });

  return weather;
}

module.exports = weatherRoute;
{% endhighlight %}

## Pushing the code back to the platform.
Now that we developed our weather mBaaS service, we need to push it back to the platform.  First we need to add the weather file to the source control.

<blockquote>
<i class="fa fa-terminal"></i> Goto the terminal and type the following:
</blockquote>
{% highlight csh %}
$ git add weather.js
{% endhighlight %}

Once the *weather.js* file is added we will need to commit all our changes and add a comment explaining what we have changed.
<blockquote>
<i class="fa fa-terminal"></i> Goto the terminal and type the following:
</blockquote>
{% highlight csh %}
& cd ..
& git commit -am"Updating my mBaaS Service to connect to openweathermap API"
{% endhighlight %}

Finally we can push our code back to the git repository in the platform.
<blockquote>
<i class="fa fa-terminal"></i> Goto the terminal and type the following:
</blockquote>
{% highlight csh %}
& git push
{% endhighlight %}

## Deploying Your New mBaaS Service
Now that we pushed our code back into the platform, we need to build the code.  This is done almost identically to a *cloud app*.  We will have to navigate back to our service.

Select the **Services & APIs** button.

Navigate to the mBaaS service you created.  This will take you to the *Details* Page.

Select **Deploy** on the left sidebar.

Tick **Clean Stage** and click **Deploy Cloud App**

When the progress bar turns green, your service is finishing deploying.

Click the URL next to **Current Host**.  This will open a new browser window with the following text in it
```
Your Node.js code is deployed and running. This file is served statically from public/index.html.
```

Since we left the hello route in tact, you will be able to see if it's working.  Add *'/hello'* to the end of the current URL in your browser and you should recieve the message:
```
{"msg":"Hello World"}
```

Now we can remove *'/hello'* and add *'/weather'*.  You will now get a query of the local weather in Washington D.C.
{% highlight JSON %}
{
   "coord":{
      "lon":-120.5,
      "lat":47.5
   },
   "weather":[
      {
         "id":741,
         "main":"Fog",
         "description":"fog",
         "icon":"50n"
      }
   ],
   "base":"stations",
   "main":{
      "temp":279.3,
      "pressure":1006,
      "humidity":100,
      "temp_min":275.15,
      "temp_max":281.15
   },
   "visibility":402,
   "wind":{
      "speed":0.66,
      "deg":120.5
   },
   "clouds":{
      "all":90
   },
   "dt":1479688380,
   "sys":{
      "type":1,
      "id":2958,
      "message":0.0112,
      "country":"US",
      "sunrise":1479741389,
      "sunset":1479773953
   },
   "id":5815135,
   "name":"Washington",
   "cod":200
}
{% endhighlight %}
