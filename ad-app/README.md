# HbbTV Application
This folder contains currently an example for an HbbTV App with the following features:
* On a predefined interval the app either display a dummy ad or make a VAST request to a server depending on the value of the variable 'developmentMode' 
* This ad could be standard banner od L shaped banner (change ad type in the request for testing the both types)
* At displaying ad the photo can be changed on pressing the red button (possible for particular ad). A hint for the used button is shown
* Creating ads based on the custom JSON format by using custom utility library
* Grabs the JSON formatted ads by fetching them from the local server
* Displaying and removing ads with smooth transitions


## Running the App
The app has been tested with the Red Orbit HbbTV emulator.

The ad can be tested by running http server in the 'ad-app' folder.
Example:
``` 
python3 -m http.server 8000
```

Currently the first ad is interactive and react to the BLUE button (for the emulator button B).
Each of the 3 local ads is shown for 20s and a new ad is displayed every minute.

## Next planned steps for development
* Disable buttons after an interactive ad is removed

## Notes
It can be discussed if a animated transition is good idea for the ads.

