# HbbTV Application
This folder contains currently an example for an HbbTV App with the following features:
* Every minute display a dummy ad every minute for a period of 20s 
* This ad could be standard banner od L shaped banner (change ad type in the request for testing the both types)
* At displaying banner ad the photo can be changed on pressing the red button (possible for particular ad)
* Creating ads based on the custom JSON format by using custom utility library
* Grabs the JSON formatted ads by fetching them from the local server


## Running the App
The app has been tested with the Red Orbit HbbTV emulator.

The ad can be tested by running http server in the 'ad-app' folder.
Example:
``` 
python3 -m http.server 8000
```

Currently the first ad is interactive and react to the BLUE button (for the emulator button B).
Each of the 3 local ads is shown for 20s and a new ad is displayed every minute.

## Net planned steps for development
* Disable buttons after an interactive ad is removed

## Notes
It can be discussed if a animated transition is good idea for the ads.

