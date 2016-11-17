---
layout: lab
title: Working with SCM
subtitle: Who knew git was so easy
html_title: Working with SCM
categories: [lab, developers, git]
---

## Working with Source Control Management (SCM)
The Red Hat Mobile Application Platform was built with the on-going goal of making it quick and easy to develop AND maintain mobile solutions.  A big part of that is source control management.  You may or may not be familiar with git.  But if you have used it, chances are you love it - and so do we.  In fact, we bundle a git server as part of our platform.  This lets us do nifty things like Continuous Integration and Continuous Deployment (CI/CD, which we will get in to in another lab).  In *this* lab we are going to walk through setting up your local development environment to securely communicate with the platform's hosted git repository.

### Double check that git is installed
You should've already setup git in the [prerequisites lab][5].

<blockquote>
<i class="fa fa-terminal"></i> Double check it works by typing:
</blockquote>
{% highlight csh %}
$ git version
{% endhighlight %}


### Double check that fhc is installed
You should've already setup fhc in the [prerequisites lab][5].

<blockquote>
<i class="fa fa-terminal"></i> Double check it works by typing:
</blockquote>
{% highlight csh %}
$ fhc version
{% endhighlight %}


### Let's setup some secure access keys
Adding ssh keys will allow the communication between the platform and your development machine be secured via [asymmetric cryptography][4].  So all the git commands you run will utilize these access keys to encrypt data in transit.  Yeah, it's a little complicated under the hood.  But almost all of the internet relies on this method for digital communication security, and we make it easy to setup.  

First, we are going to generate some keys:

<blockquote>
<i class="fa fa-terminal"></i> Goto the terminal and type the following (replacing the email address with yours):
</blockquote>
{% highlight csh %}
$ cd ~/.ssh
$ ssh-keygen -t rsa -C "YOURNAME@EMAIL.com"
{% endhighlight %}

It'll ask you to name the file (replace YOURDOMAIN with the RHMAP domain the workshop instructor provided):

<blockquote>
Give it a name like:
</blockquote>
{% highlight csh %}
id_rsa_rhmap_YOURDOMAIN
{% endhighlight %}

<blockquote>
Specify a passphrase or just leave that blank.
</blockquote>

Next, we are going to add your public key to the platform and specify a unique label for it:

<blockquote>
<i class="fa fa-terminal"></i> Goto the terminal and type the following (replacing the label with yours):
</blockquote>
{% highlight csh %}
$ fhc keys add YOURNAME_YOURDOMAIN_OPTIONALSUFFIX ~/.ssh/id_rsa_rhmap_YOURDOMAIN.pub
{% endhighlight %}

<i class="fa fa-info-circle"></i> You can use OPTIONALSUFFIX to append unique info in the case where you have multiple development machines.  e.g. "Dudash_RedhatWorkshops_myMacBookPro"<br/><br/>

<blockquote>
<i class="fa fa-terminal"></i> Make sure the key was added by typing
</blockquote>
{% highlight csh %}
$ fhc keys ssh
{% endhighlight %}


### Now let's check out some source code!
We are going to clone the client app from the previous labs here. To begin we need to find the ID of the project we created so we can clone it using the command line tools.  We can do this through the command line or the web browser.  

<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <div class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          CLI Steps
        </a>
      </div>
    </div>
    <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">
        <i class="fa fa-terminal"></i> Goto the terminal and type the following:
        {% highlight csh %}$ fhc projects{% endhighlight %}
        Find your project and the ID associated with it.  Copy that ID.  
        <img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-terminal-projectlist.png" width="600"/><br/>

      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingTwo">
      <div class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Web Console Steps
        </a>
      </div>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
      <div class="panel-body">
        We need to get the project ID to clone the git repository to our local environment.  This is located in the web console when inside a project.<br />
        1. Navigate to your project.  <br />
        2. Select the <b>Settings</b> button.<br />
        3. Copy the <i>Project ID</i><br /><br />

        <img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-projectsettings.png" width="600"/><br/>
        <i>Project Settings page</i>

      </div>
    </div>
  </div>
</div>


Once we have the project ID, we can pull clone the code from the git repository within the platform.  We will start by Creating a folder where you would like to work out of.

//TODO: Windows/RHEL steps

inside that folder type the following:
{% highlight csh %}$ fhc projects clone <project ID>{% endhighlight %}
This will copy the entirety of the project into the folder this is where you will work from when developing locally.

`` You can also clone an individual app, whether that is a client app, cloud app, or MBaaS Service with the command
'fhc clone <project ID> <app ID>'  ``


### Editing source code
Now that we have pulled down the code from the platform to our local environment we can modify the code using any editor we would like.

1. Lets navigate to the cloud app<br />
TODO: windows/linux<br /><br />
```
$ cd <cloud app name>
```

2. navigate to *www/index.html*

3. Open the file in the editor of your choice.  Notepad or VIM

4. Add a new *<div>* that will show the received *timestamp*.<br />
This element acts as a placeholder for the received value.<br />
Find this line:

```
<div id="cloudResponse" class="cloudResponse"></div>
```

add a new *<div>* to get the following:
```
<div id="cloudResponse" class="cloudResponse"></div>
<div id="timestamp" class="cloudResponse"></div>
```

5. Save the file.

6. Open the www/hello.js file in the editor.

This file contains a click handler for the Say Hello From The Cloud button, which uses the $fh.cloud API to call the /hello endpoint of the cloud app and populates the placeholder <div id="timestamp"> element.
Set the placeholder to the received timestamp value.

Find the following code:
```
document.getElementById('cloudResponse').innerHTML = "<p>" + res.msg + "</p>";
```
Replace it with the following:
```
document.getElementById('cloudResponse').innerHTML = "<p>" + res.msg + "</p>";
document.getElementById('timestamp').innerHTML = "<p>" + res.timestamp + "</p>";
```
Save your changes.


## Pushing the code back to the platform.
Now that we have modified the code we need to push the code up to the git repository.


Type the following in the command line:
```
git commit -am"Updating timestamp in my cordova app"
git push
```

8. check the editor in the web client to see if the changes have been pushed.  You will need to refresh the editor if you had it open.  You can also access to the in browser preview to see your changes live without downloading the app.








[1]: https://access.redhat.com/documentation/en/red-hat-mobile-application-platform/4.2/paged/local-development-guide/chapter-4-developing-code-locally
[2]: http://brew.sh/
[3]: https://git-for-windows.github.io/
[4]: https://en.wikipedia.org/wiki/Public-key_cryptography
[5]: ./workshop-prerequisites.html
