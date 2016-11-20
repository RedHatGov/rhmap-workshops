---
layout: lab
title: A Guided Tour of Red Hat Mobile Application Platform
subtitle: Welcome to Red Hat Mobile Application Platform
html_title: Welcome to Red Hat Mobile Application Platform
categories: [lab, intro, welcome, developers, ops]
---

## Welcome to Red Hat Mobile Application Platform !

This lab provides a quick tour of the console to help you get familiar with the user interface along with some key terminology we will use in subsequent lab content.  If you are already familiar with the basics of Red Hat Mobile Application Platform you can skip this lab - after making sure you can login.

## Key Terms
We will be using the following terms throughout the workshop labs so here are some basic definitions you should be familiar with.  And you'll learn more terms along the way, but these are the basics to get you started.

* Project - Projects help you group all code bases related to a single mobile application in one place.
* Client App - Applications deployed on mobile devices used by the end users.
* Cloud App - Applications deployed in the MBaaS that handle requests from client apps and communicate with other internal or external systems.
* MBaaS Service - Reusable services used by cloud apps and shared across multiple projects.
* FHC - FeedHenry Command Line tool used to access the platform.  
* Studio - The Red Hat Mobile Application Platform's web interface used to help developers and operations work together to build mobile apps.  

## Accessing Red Hat Mobile Application Platform
Red Hat Mobile Application Platform or RHMAP provides a web console that allow you to perform various tasks via a web browser.  Additionally, you can utilize a command line tool to perform tasks.  Let's get started by logging into both of these and checking the status of the platform.

### Let's Login
Navigate to the URI provided by your instructor and login with the user/password provided (if there's an icon on the Desktop, just double click that)

<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-login.png" width="600"/><br/>
   *Login Webpage*

Once logged in you should see your available projects - or a button to create a project if none exist already.

## Let's take a look at what a project looks like
First let's open a project.  Select the project named "Welcome Project."

<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-threecolumn.png" width="600"/><br/>
*project home*

In this screen you will note the three columns: Client apps, Cloud apps and MBaaS Services.  A project Must contain a Cloud App and a Client apps.  MBaaS Services are an optional albeit extremely powerful tool.

### Command Line Login
Let's now login to the platform through the command line tool, "FHC".  to get started we need to set the platform target:

* 'fhc target https://[lab-studio-domain].us.demos.redhatmobile.com'

We can then login using the credentials your instructor provided you:
* 'fhc login [email address] [password]'

You can view a list of projects you have access to:

* 'fhc projects'

<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-fhc-projects.png" width="600"/><br/>
*fhc projects list*

## What's coming up
To get started with Red Hat Mobile Application Platform (RHMAP) quickly, the first step is to understand the project life cycle. This involves creating a project, creating a client and a cloud app from templates, deploying the cloud app to the MBaaS, building the client app, and deploying it to a mobile device.  We will learn about Node.js and do a little development with it.  
