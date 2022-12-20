# HbbTV Application
This folder contains currently an example for an HbbTV App with the following features:
* Every minute display a dummy ad every minute for a period of 20s 
* This ad could be standard banner od L shaped banner (change ad type in the request for testing the both types)
* (Register events for relevant remote control buttons and prints simple text to the console)
* (At displaying banner ad the photo can be changed on pressing the red button)
* Creating ads based on the custom JSON format by using custom utility library


## Running the App
The app has been tested with the Red Orbit HbbTV emulator

## Net planned steps for development
* Ad functionality for the DA library for interacting with a remote control

## Notes
The folder contains currently the files 'main.js' and 'old_main.js'.
'main.js' uses the initial implementation of the 'da_library.js' that does not 
includes any functionality or interaction with remote control, therefore
'old_main.js' is kept to show an example for using remote control events.
