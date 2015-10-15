# KAST (your Mooc)
  
  
# What is it?

The Kast xblock is a powerfull and easy to use module for your OpenedX architecture. It allows professors to  record their webcam and PDF directly from the studio.
You want to reinvent way to create and consume your Mooc video? Sure you will love our xblock. Students will have not one but two sections, one with professor's cam and one with PDF. The PDF is automatically synchronized but students can choose to change the current page of PDF and go back or forward.
This new way to present courses will transform your courses and help you to be more innovative !

# Documentation

If you want to install Kast module, please refers to the "Installation Section" at the bottom. For the users documentation try the module first, we make it so easy that you will not need it.

# Story

With the second prize for their Knotes module in the first french OpenedX Hackathon, the Kalyzee team wanted their revenge at the regular OpenedX Hackathon in Boston. Came with the project to improve their first project, they decided to switch on an awesome and crazy project in the last minutes : creating a video directly from OpenedX Studio.
A really big idea (and challenge) that activated the Xtrem Programming mode of these crazy developpers !
Thirsty of efficient coding lines, they have done their best to produce this amazing module, and change the way we perceive what is a Mooc !

# Authors

Ludovic Bougerra and Anthony Gross for the development, Guillaume LAURIE for communication.
All sponsored by the Massilia's EDTech startup Kalyzée.

# Licensing

Please see the file called LICENSE.

# Contacts

If you want to be informed about new modules or new hackathon participation
        please register to our newsletter.


If you need help for an installation, feel free to contact our support :
        contact@kalyzee.com


##  Want to follow us on Twitter?

        Kalyzee             : 
        ```
        @Kalyzee
        ```
        Ludovic Bouguerra   : 
        ```
        @LBouguerra
        ```
        Anthony Gross       : 
        ```
        @AnthonyKGROSS
        ```
        Guillaume LAURIE    : 
        ```
        @GuillaumeLAURIE
        ```
        
# Installation guide (Knotes install)

Connect you to your VM with:
```
vagrant ssh.
```

Connect you with edxapp user

```
sudo su edxapp
```

Create an apps directory in /edx/app/edxapp to store the Knotes app
- In /edx/app/edxapp with edxapp user create a directory my-apps

``` 
 cd /edx/app/edxapp
 mkdir my-apps
 cd my-apps
```

Clone the Knotes github repository in /edx/app/edxapp/my-apps
``` 
git clone https://github.com/Kalyzee/knotes.git
``` 

Activate the openedx venv and install Knotes
```
source /edx/app/edxapp/venvs/edxapp/bin/activate
cd knotes
pip install -r requirements.txt
```

## Database configuration / installation

 
For dev environment you have to append the following lines into /edx/app/edxapp/edx-platform/cms/envs/devstack.py and  /edx/app/edxapp/edx-platform/lms/envs/devstack.py 

```python

INSTALLED_APPS += ('videoknotes',)

```

After that it's necessary to setup the database.

```
cd /edx/app/edxapp/edx-platform
./manage.py lms syncdb --settings=devstack
```

The first output's lines will look like that:

Syncing...
Creating tables ...
Creating table videoknotes_knotelist
Creating table videoknotes_knote
Installing custom SQL ...
Installing indexes ...
Installed 0 object(s) from 0 fixture(s)


Restart your edX
```
 cd /edx/app/edxapp/edx-platform
 paver devstack --fast studio
```
## Enabling in Studio

Login 

To enable this Knotes into your course you have to:
  - On a studio course main page go to Setting > Advanced Settings.
  
![](http://www.kalyzee.com/wp-content/uploads/2015/09/edx-advanced-setting-enabling-knotes.png)

  - Into the advanced module part, add "videoknotes" into the array.

  
![](http://www.kalyzee.com/wp-content/uploads/2015/09/edx-advanced-setting-enabling-knotes-in-form.png)

  - Click on "Save changes"

![](http://www.kalyzee.com/wp-content/uploads/2015/09/edx-knotes-visual-feedback-installation.png)

## Using Knotes 
In a unit: 

![](http://www.kalyzee.com/wp-content/uploads/2015/09/edx-knotes-usage-plugin-selection.png)

Click on the advanced button in add new component.

![](http://www.kalyzee.com/wp-content/uploads/2015/09/edx-knotes-selection-unit.png)

Click on videoknotes

![](http://www.kalyzee.com/wp-content/uploads/2015/09/edx-knotes-preview.png)

Your Knote is fully loaded you can change your video by cliking on edit button on the top right of the previous picture.

![](http://www.kalyzee.com/wp-content/uploads/2015/09/edx-knotes-select-video-url.png)

In this version Youtube and Dailymotion are enable it's possible to develop another player components.

## Developping player adapters

```
function MyPlayerAdapter(element, video){


    var listeners = new KNotesListener(),
        _this = this;

    this.getCurrentTime = function(){

    }

    this.play = function(){

    }

    this.pause = function(){

    }

    this.seek = function(time){

    }

    this.createPlayerView = function(){

    }

    this.onTimeUpdate = function(callback){
      listeners.addlisteners("onTimeUpdate", callback);
    }

    var fireTimeUpdate = function(time){
      listeners.fireListeners("onTimeUpdate", function(callback){
        callback(time);
      });
    }

}


MyPlayerAdapter.isCompatible = function(videoURL){
  /**
  * Must return true if the videoURL is compatible !
  */
}

PlayerFactory.registerPlayer(MyPlayerAdapter);
```

You have to register your JS file in student_view method in videoknotes.py in javascript_array variable
