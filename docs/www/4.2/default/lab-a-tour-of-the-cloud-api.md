---
layout: lab
title: A Guided Tour of Red Hat Mobile Application Platform
subtitle: 
html_title: Welcome to Red Hat Mobile Application Platform
categories: [lab, developers, api, cloud]
---

## A Brief Tour of the Cloud API

This lab introduces the cloud app APIs that enable accelerated solution development.  For this introduction we won't be doing any actualy coding, but you will see some pre-written code to give you an idea of what the API calls look like.  Keep in mind that these APIs are the ones you would use in your node.js cloud apps, not in mobile front-end code.  However, there is also a set of mobile client APIs that we will cover in another lab.

## List of current cloud APIs

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
Push notifications can be a powerful part of mobile solutions.
TBD

## Exmaple of fh.service
TBD

## Summary
You should now have a basic understanding of what cloud API calls are available.  We will leverage some of these calls in advanced workshop labs.  You can find the official Red Hat documentation on these [cloud API calls here][1].

[1]: https://access.redhat.com/documentation/en/red-hat-mobile-application-platform/4.2/paged/cloud-api/


