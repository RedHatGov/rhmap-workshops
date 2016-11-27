---
layout: lab
title: Workshop Prerequisites
subtitle: Make sure you have done the following before starting the workshop labs
html_title: Prerequisites
categories: [developers, developers]
---


### If we provided you a laptop for this workshop
We already set all this up for you - so you can skip everything below.  Otherwise, we are just going to install a few useful tools to your local development machine.


### Install node.js and npm
You might have this already, but if not, get the current LTS version of Node.js from [https://nodejs.org/][2].
<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-node-download.png" width="600"/><br/>
*Node.js download page*


### Install the mobile platform's command line tools for your operating system
The officially supported instructions for installing the fhc client are [located here][1].  

<blockquote>
<i class="fa fa-terminal"></i> Type this in terminal:
</blockquote>
```
Note: Some users will need to need to use Sudo if there is an error. i.e.:
$ sudo npm install -g fh-fhc
```
{% highlight csh %}
$ npm install -g fh-fhc
{% endhighlight %}

To test FHC installed properly type:
<blockquote>
<i class="fa fa-terminal"></i> Type this in terminal:
</blockquote>
{% highlight csh %}
$ fhc -v
{% endhighlight %}
<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-fhc-version.png" width="200"/><br/>
*fhc version results*

### Install git
We will use a few git commands directly in some of the advanced labs.  Please make sure git is installed on your system.  You can download the [latest version here][4].
```
Note: Windows users will need to install git bash to follow along with these labs
```

### Create a Github account
Create a FREE github account by going [to this link][5] and following their instructions.


[1]: http://docs.feedhenry.com/v3/dev_tools/local/install.html
[2]: https://nodejs.org/en/download/
[3]: http://brew.sh/
[4]: http://git-scm.com/downloads
[5]: https://github.com/join?source=header-home
