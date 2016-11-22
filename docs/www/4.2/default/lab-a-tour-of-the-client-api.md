---
layout: lab
title: A Brief Tour of the Client SDK and Client API
subtitle: 
html_title: A brief tour of the Client SDK and API
categories: [lab, developers, api, cloud]
---

## A Brief Tour of the Client API

This lab introduces the client app APIs that enable accelerated solution development.  For this introduction we won't be doing any actualy coding, but you will see some pre-written code to give you an idea of what the API calls look like.  These APIs are the ones you would use in your front end app development by installing the provided client SDK - not to be confused with even more capability provided to Node.js cloud apps via the [Cloud APIs][1].

## About the Client SDK
Our Client SDK is essentially a kit you can embed in your mobile app to enable you to leverage the MBaaS of the platform.  There are a large number of client SDKs currently available - Native iOS, Native Android, Native Windows, Xamarin, Cordova, Web, and Appcelerator.  Full details or how to install and use each is available in [Red Hat support documentation][5].  However, this workshop will walk you through installing everything you need for these labs.  

By embdeding the SDK in your client app, you will enable use of the Client APIs.  The APIs are common across all the provided SDKs (with a few small exceptions) so the content we are about to go over in this lab applies to all mobile platforms and device types.

## List of current Client APIs
* fh.auth
* fh.cloud
* fh.getcloudurl
* fh.getfhparams
* fh.forms
* fh.hash
* fh.init
* fh.mbaas
* fh.push
* fh.sec
* fh.sync
* fh.act

## Example of fh.auth
TBD

## Example of fh.push
TBD

## Example of fh.sync
TBD

## Summary
You should now have a basic understanding of what Client API calls are available and what using them looks like.  We will leverage some of these calls in upcoming workshop labs.  You can find the official Red Hat documentation on these [Client API calls here][3].

[1]: https://access.redhat.com/documentation/en/red-hat-mobile-application-platform/4.2/paged/cloud-api/
[2]: https://access.redhat.com/documentation/en/red-hat-mobile-application-platform/4.2/single/product-features/#sending-notifications
[3]: https://access.redhat.com/documentation/en/red-hat-mobile-application-platform/4.2/paged/client-api/
[4]: ./lab-a-tour-of-the-cloud-api.md