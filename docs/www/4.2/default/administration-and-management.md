---
layout: lab
title: Apps and Cloud Statistics
subtitle: Learning how to get metrics
html_title: Drag and drop apps
categories: [lab, developers, forms]
---

## Overview
The Administration section of the platform allows Users, Auth Policies and Deploy Targets to be managed. It also allows you to control all aspects of distributing apps to end user devices as well as tracking and managing this usage.

<img src="{{ site.baseurl }}/www/4.2/default/screenshots/rhmap-admin.png" width="600"/><br/>


#Managing users
All aspects of User management from creating Users, assigning Roles, disabling Users to deleting Users are available to Administrators.

To access the management team in a default configuration the user currently logged in must be a member of the following teams:
- Domain — Authorization Policy (View & Edit)
- Domain — Authorization Policy (View & Edit)
- Domain — Deploy Target(View & Edit)
- Domain — App Store (View & Edit)
- Domain — Administrator (View & Edit)

A full list of user based options:
- View, create and update a user’s details, be they App users (used in conjunction with our $fh.auth API) or App Studio users
- Batch import users from CSV files
- Assign roles to users
- Disable users - rendering them unable to login
- Mark a user for data purge (used with $fh.auth, this flag can be checked to wipe data from a user’s app/device)
- Send/re-send an invite email to a user
- Delete Users
