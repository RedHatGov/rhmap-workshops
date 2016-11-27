---
layout: lab
title: Working with Xamarin
subtitle: Creating a Sync Project
html_title: Working with Xamarin
categories: [lab, developers, xamarin, client]
---

## Introduction
In this lab we will be creating a sync based project.  In the previous lab we where introduced how we can use the sync API to push information that has been collected on the device when off of a network back to the cloud when the device can reach it.  In situations of bad connections or potentially no connection for extended periods of time this can be invaluable.

## How to get Started
To start we will be creating our own project.  The project will be built using templates to create a mobile list app where users can create items to upload to the cloud at later times.  The project contains 7 templates to get you started on whatever platform you need.  One is a cloud based app that will store the data.  The other 6 are client apps which can store data locally until they are on the network.  These apps are developed for:
- Cordova
- Native Android
- Native iOS(Swift)
- Native iOS(Objective-C)
- Windows apps
- Xamarin

To start select the **Projects** button in the platform header.  Once there we will need to create our own project.  

Select **New Project**.  Once there use the *search* functionality to select *Sync Framework Project*.  Click **Choose** and name your project *\<your name\>_SyncProject*.
