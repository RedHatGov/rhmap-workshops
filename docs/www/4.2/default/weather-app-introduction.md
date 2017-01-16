---
layout: lab
title: 3. What We Will be Making in the Upcoming Labs
subtitle: Using an existing api to get the weather
html_title: Whats coming up?
categories: [lab, intro, welcome, developers, ops]
---

## The App you will make today
Today we will be making a mobile application that is communicating with an existing API.  The App in today's lab will allow you to press a button to get the current temperature based on your location.  While this is a simple task, there a few parts we will need to understand before approaching a more complex application.
<br /><img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-getweather-client.png" width="400"/><br/>

## The Architecture
Before we begin development, lets talk about the architecture.  Mobile applications developed within RHMAP are recommended to have a three tier architecture.  The first tier being the mobile application for the user interaction.  The second tier is a cloud app which can do data transformations and contains business logic.  Finally the mBaaS service is a reusable service that interfaces with a data sources.  

<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap_getWeather_architecture.png" width="600"/><br/>

## The Flow of data
In this lab we will be building a Cordova based application for the mobile device.  This is a hybrid app, which means we can build this for all popular mobile platforms and it is ideal in a bring your own device scenario for an organization.  
<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap_getWeather_step1.png" width="600"/><br/>
*figure 1*<br/>
The mobile application, shown in figure 1, sends a request to a cloud app requesting the temperature.  It sends two pieces of data in that request, longitude & latitude of the location.  We are able to get those values using Cordova's Geolocation API very quickly and easily.

The cloud code app facilitates the requests and performs the business logic required.  Generally speaking a cloud code app will call out to a mBaaS service to perform some task.  
<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap_getWeather_step2.png" width="600"/><br/>
*figure 2*<br />
Shown in figure 2, once the cloud app receives a request from the mobile app, it will then go to the mBaaS service to get the data it needs.  In the case of the lab today, it basically forwards the request on.  
<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap_getWeather_step3.png" width="600"/><br/>
*figure 3*<br />
<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap_getWeather_step4.png" width="600"/><br/>
*figure 4*<br />
<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap_getWeather_step5.png" width="600"/><br/>
*figure 5*
The mBaaS service will format the request to theOpenWeatherMap API and send the request.  It will receive the information and pass it back to the Cloud Code app.  We design the architecture to have this third tier for reusability.  For example, lets say we want to create another application to get the current humidity.  If we where to perform the transform in the cloud code application which would lead to more custom code and slower development.  The API we will be using in the lab is <a href="http://openweathermap.org/api">OpenWeatherMap.org</a>.  They provide an API to gather current weather, historical data, and much more.  The current weather REST endpoint we use today provides a large amount of data including, temperature in Kelvin, pressure, humidity, sea level and much more.  For todays application we will not need all this data; however, we don't want to alter how the data incoming from an API in a mBaaS endpoint.

<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap_getWeather_step6.png" width="600"/><br/>
*figure 6*
Finally, in figure 6, the cloud code returns the formatted data.  We are trimming out the information we don't need and formatting the temperature.  This can be important because mobile phones often run over mobile data and it is crucial to keep bandwidth down for the users.  
