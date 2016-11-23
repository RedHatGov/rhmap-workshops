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
Ensuring that your mobile end-users are authenticated and authorized is an important consideration when allowing sensitive information to be shared outside your network.  The fh.auth API allows you to easily do those checks against auth policies you define.  There are a number of supported auth policy types available to use with minumal configuration (OAUTH2, LDAP, FH).  Or you can write your own service in the cloud to do auth and wrap a policy around that.  The great part is that you can make the process of doing auth common and reusable across your mobile solutions.  Here is an example of fh.auth for the .NET API:

{% highlight C %}
string authPolicy = "MyAuthPolicy";
string username = this.usernameField.Text;
string password = this.passwordField.Text;

FHResponse authRes = await FH.Auth(authPolicy, username, password);
if (null == authRes.Error)
{
    //user successfully logged in
}
else
{
    ShowMessage(authRes.Error.Message);
}
{% endhighlight %}

## Example of fh.push
Push notifications can be a powerful part of mobile solutions.  The mobile SDK provides a component that works in conjunction with the cloud component to simplify the complexity of adding push notifications to your solution.  Here is how you'd register to receive push notifications using the .NET API:

{% highlight C %}
try
{
    await FHClient.Init();
    FH.RegisterPush(HandleNotification);
}
catch (Exception ex)
{
    new MessageDialog("Error", ex.Message).ShowAsync();
}
{% endhighlight %}

And here is how you'd handle an incoming push notification:

{% highlight C %}
private void HandleNotification(object sender, PushReceivedEvent e)
{
    Console.WriteLine(e.Args.Message);
}
{% endhighlight %}

## Example of fh.sync
Synchronization of data can be a tricky task between mobile devices and backend data stores.  This complexity grows even larger when you have weak cellular connectivity or need to be able to use mobile apps in a disconnected network type of environment.  And that's exactly the problem the fh.sync API was built to address.  It provides a resilient mechanism for data synchronization between a client app and a back-end data store.  Below is some example code showcasing what the use of the .NET sync API could look like.

Init/config the client sync:

{% highlight C %}
var client = FHSyncClient.GetInstance();
var config = new FHSyncConfig();
{% endhighlight %}

Register event handlers (there are many more not shown):

{% highlight C %}
client.DeltaReceived += async (sender, args) => { // UPDATE UI };
client.RecordDeltaReceived += async (sender, args) => { // UPDATE UI };
client.SyncCompleted += async (sender, args) => { // CAN DO STUFF HERE };
client.SyncFailed += async (sender, args) => { // HANDLE ERROR OR RETRY  };
{% endhighlight %}

Add a new data record to be managed by the sync service:

{% highlight C %}
const string DatasetId = "tasks";
/// List the tasks that are assigned to a user called "Tom"
Dictionary<string, string> query = new Dictionary<string, string>
{
   {"eq", "{"assigned", "Tom"}"}
};
var overrideConfig = new FHSyncConfig();
config.SyncFrequency = 100;
client.Manage<Task>(DatasetId, overrideConfig, query);
{% endhighlight %}

There are several more calls to manage the sync service and to do CRUDL operations on data sets, but we will save those details for a data sync specific lab.


## Summary
You should now have a basic understanding of what Client API calls are available and what using them looks like.  We will leverage some of these calls in upcoming workshop labs.  You can find the official Red Hat documentation on these [Client API calls here][3].

[1]: https://access.redhat.com/documentation/en/red-hat-mobile-application-platform/4.2/paged/cloud-api/
[2]: https://access.redhat.com/documentation/en/red-hat-mobile-application-platform/4.2/single/product-features/#sending-notifications
[3]: https://access.redhat.com/documentation/en/red-hat-mobile-application-platform/4.2/paged/client-api/
[4]: ./lab-a-tour-of-the-cloud-api.md
[5]: https://access.redhat.com/documentation/en/red-hat-mobile-application-platform/4.2/paged/client-api/chapter-11-fhsync