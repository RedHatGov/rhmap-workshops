---
layout: lab
title: 5.1 Introduction to Cloud App APIs
subtitle: A Brief Tour of the Cloud API
html_title: A Brief Tour of the Cloud API
categories: [lab, developers, api, cloud]
---

## A Brief Tour of the Cloud API

This lab introduces the cloud app APIs that enable accelerated solution development.  For this introduction we won't be doing any actualy coding, but you will see some pre-written code to give you an idea of what the API calls look like.  Keep in mind that these APIs are the ones you would use in your node.js cloud apps, not in mobile front-end code.  However, there is also a set of mobile client APIs that we will cover in another lab.

## List of current Cloud APIs

We will get into a few specific examples, but first, here's a quick summary of the currently available cloud API calls:

* fh.cache - Cache an object in the cloud for a period of time.
* fh.db - Access to hosted data storage, it supports CRUDL and index operations.
* fh.forms - Return an array of JSON objects with form summary information.
* fh.hash - Generate the hash value of a given input.
* fh.host - Fetch the public host name of the MBaaS (useful for configuring callback URLs).
* fh.push - Send a push message from the cloud to registered clients.
* fh.sec - Key generation, data encryption and decryption.
* fh.service - Call an endpoint in an MBaaS Service.
* fh.stats - Utilize temporary stats counters and timers (which can then be viewed as graphs in the studio).
* fh.sync - Allows for overriding the default handlers for sync calls made by mobile clients.

## Example of fh.db
One of the most useful cloud APIs calls is fh.db.  It provides easy access to persistent storage for your mobile solutions.  The syntax for using this API call is as follows:

{% highlight JavaScript %}
$fh.db(options, callback);
{% endhighlight %}

Using the fh.db API call you can Create, Read, Update, and Delete data in a hosted cloud database.  Additionally, there is advanced capability to do List operations on the data in the database.  Using *List* as the act type you can leverage filtering and pagination.  For example: List only data that matches within a specific geographic bounding circle.

Here is an example of creating multiple records with a single API call:

{% highlight JavaScript %}
var options = {
  "act": "create",
  "type": "myCollectionType", // Entity/Collection name
  "fields": [{ // Notice 'fields' is an array of data entries
    "id": 1,
    "name": "Joe"
  }, {
    "id": 2,
    "name": "John"
  }]
};
$fh.db(options, function (err, data) {
  if (err) {
    console.error("Error " + err);
  } else {
    console.log(JSON.stringify(data));
  }
});
{% endhighlight %}

## Example of fh.push
Push notifications can be a powerful part of mobile solutions.  It works by embedding logic in your cloud apps to send notifications to mobile devices.  The syntax for using this API call is as follows:

{% highlight JavaScript %}
$fh.push(message, options, callback(err, res))
{% endhighlight %}

A basic notification can include message text, alert sound, badge number, user data.  The notifications can be broadcast to all connected apps or [filtered to a subset][2] of connected apps (e.g. by device type or category).

Here is an example of pushing a notification to all mobile apps:

{% highlight JavaScript %}
var message = {
  alert: "hello from FH"
}, options = {
    broadcast: true
};

$fh.push(message, options,
  function (err, res) {
    if (err) {
      console.log(err.toString());
    } else {
      console.log("status : " + res.status);
    }
  });
{% endhighlight %}

## Exmaple of fh.service
Maybe most useful here is the ability to make calls into re-uasble MBaaS services.  Because calls to these services are protected, you will need to use this API call in order to get access.  The syntax is as follows:

{% highlight JavaScript %}
$fh.service(options, callback);
{% endhighlight %}

The use of the fh.serice call is powerful because it abstracts away the complexity of microservice discovery and authentication from you.  By simply knowing the guid of the service you are trying to talk to (and having configured the service to accept requests from you using the web UI) you can talk to it.  The source code can operate without knowledge of any deployment details, infrastructure, IP addresses, load balancing, or other platform handled pieces of the puzzle.  Pretty easy right?  Here's an example of a service call:

{% highlight JavaScript %}
$fh.service({
  "guid" : "0123456789abcdef01234567", // The 24 character unique id of the service
  "path": "/hello", //the path part of the url excluding the hostname - this will be added automatically
  "method": "POST",   //all other HTTP methods are supported as well. for example, HEAD, DELETE, OPTIONS
  "params": { "hello": "world" }, //data to send to the server - same format for GET or POST
  "timeout": 25000, // timeout value specified in milliseconds. Default: 60000 (60s)
  "headers" : {} // Custom headers to add to the request. These will be appended to the default headers
}, function(err, body, res) {
  console.log('statuscode: ', res && res.statusCode);
  if ( err ) { console.log('service call failed - err : ', err); }
  else { console.log('Got response from service - status body : ', res.statusCode, body); }
});
{% endhighlight %}

## Summary
You should now have a basic understanding of what Cloud API calls are available and what using them looks like.  We will leverage some of these calls in upcoming workshop labs.  You can find the official Red Hat documentation on these [Cloud API calls here][1].

[1]: https://access.redhat.com/documentation/en/red-hat-mobile-application-platform/4.2/paged/cloud-api/
[2]: https://access.redhat.com/documentation/en/red-hat-mobile-application-platform/4.2/single/product-features/#sending-notifications
[3]: https://access.redhat.com/documentation/en/red-hat-mobile-application-platform/4.2/paged/client-api/
[4]: ./lab-a-tour-of-the-client-api.md
