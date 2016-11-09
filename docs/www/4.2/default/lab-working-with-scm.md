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
TBD use fhc to check out a rep


### Now let's see the SCM options via the platform GUI
TBD use the web gui to see code and commit changes


[1]: https://access.redhat.com/documentation/en/red-hat-mobile-application-platform/4.2/paged/local-development-guide/chapter-4-developing-code-locally
[2]: http://brew.sh/
[3]: https://git-for-windows.github.io/
[4]: https://en.wikipedia.org/wiki/Public-key_cryptography
[5]: ./workshop-prerequisites.html
