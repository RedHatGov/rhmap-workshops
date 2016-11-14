---
layout: lab
title: Modifying a Cloud App & Node.JS
subtitle: Understanding how cloud apps work
html_title: Modifying a Cloud App & Node.JS
categories: [lab, intro, welcome, developers, ops]
---

## Modifying a Cloud App & Node.JS

In this lab we will modify the cloud app.  Cloud app's are written in Node.JS, which is a open-source, cross-platform JavaScript runtime environment.  Node.js uses a non-blocking I/O model that makes it lightweight and efficient, which is why it's ideal for microservices and mobile services. [NPM (Node Package Manager)](https://www.npmjs.com/) is Node.JS's open-source library.  It's one of the worlds largest open source communities.

## Exploring the in browser editor.

1. Navigate to the **Projects** area.  

2. Open the project you have created in the previous lab.

3. Open the *Cloud App*.

4. Click **Editor** on the sidebar on the left.
<br />This area lets you edit the source code of any file in the Git repository of the cloud app. The cloud app in this project is a Node.js web application framework called Express.

<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-editor.png" width="600"/><br/>

## Editing the Cloud App
In this section, we are going to add a timestamp to the cloud responses that the client app is receiving.

1. Open *applicaion.js*.<br />
*application.js* handles all requests to the cloud app. The client app sends requests to the */hello* endpoint and the *application.js* file routes those requests to another file called *hello.js*.<br /><br />
To learn more about routing Express, which we use for routing in our templates, visit the [Express documentation website](http://expressjs.com/en/4x/api.html#express.router).

2. Open *lib/hello.js*.

3. Add a timestamp to the response object. <br/>
Find this line:
```
res.json({msg: 'Hello ' + world});
```
Change that line to the following:
```
res.json({msg: 'Hello ' + world, timestamp: new Date().getTime() });
```
The POST handler should now look like:
```
hello.post('/', function(req, res) {
  console.log(new Date(), 'In hello route POST / req.body=', req.body);
  var world = req.body && req.body.hello ? req.body.hello : 'World';
  // see http://expressjs.com/4x/api.html#res.json
  res.json({msg: 'Hello ' + world, timestamp: new Date().getTime() });
});
```

4. Save your changes by clicking **File > Save** in the editor. <br />
The changes are saved to the Git repository of the cloud app. To propagate the changes to the running instance, you must re-deploy the cloud app.

5. Click **Deploy** on the sidebar on the left.

6. Click **Deploy Cloud App**. <br />
You wil now be able to see the timestamp on the client app.
