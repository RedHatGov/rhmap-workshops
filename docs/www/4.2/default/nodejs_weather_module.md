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
