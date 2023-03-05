# HbbTV Application
This folder contains the source code for the HbbTV App being developed from Lachezar Nikolov, Momchil Petrov and Todor Moskov as part of the 'Advanced Web Technologies' Project offered by TU Berlin and FOCUS Institute at Fraunhofer in WiSe22/23, project topic 'Interactive Display Ads for HbbTV'.

The App has the following main functionality:
* Displaying non-linear ads potentially individually for each viewer.
* Displaying two types of ads: standard banner ad and L-shaped banner ad.
* Each ad can have multiple elements of type 'Text', 'Image'and 'Slideshow'
* Automatic schedule of displaying the ads
* Interactivity with the ad: switching between different images inside of a single ad by pressing the red/yellow/green/blue button of the remote controller

The App implements the following features:
* On a predefined interval the app makes a VAST request for an ad. (Also a development mode is available for displaying locally stored ads.)
* On receiving successfully the VAST response the parsed information is
used for generating another request for an JSON object containing the actual properties for each ad.
* On receiving successfully the JSON object the contained properties are being validated and then the ad is displayed for the duration parsed fro the VAST response.
* The images of a element of type 'Slideshow' can be changes by pressing a colored button if that is hinted in the left bottom corner of on image. The hint shows the color of the button that can be used for that.
* Displaying and removing the adds with smooth transitions with configurable durations.
* Handling the initialization, displaying and removing the ads is done by a custom JS library implemented by the file *da-library.js*
* Making and handling VAST requests is done by another custom library implemented by the file *custom_VAST_client.js*

Development mode: the implementation of the main functions contains the boolean variable *developmentMode* which defined the behavior of the app. At setting it to true, the app does not generates an VAST request to a server bu instead fetches the JSON objects fo the adds directly from the *dummy_json_ads* static folder for a statically defined duration.


## da_library.js
This library defines a single class that is responsible for creating the so-called 'scene' object that can be then used from the main App file for creating new ads, displaying and removing them. This class is implemented as a function (*adScene*) closuring nested function that necessary for handling the 'scene' functionalities. The output if the function *adScene* is an object containing all public functions to the generated class object. 
These functions can be then used in the main file of the app:
* **initialize()** - initialize the attributes of the 'scene' object that are relevant for creation of all ads in the App
* **createAd()** - creates an the HTML element holding the ad assets.
* **displayAd()** - displays an already created HTML element for an ad.
* **removeAd()** - removes the currently displayed ad (and restores the broadcasted video format).

The library defines additionally to the *adScene* function another static function - *validateDA* - that validates an JSON ad object by checking for the presents of all required properties an their values (if a corresponding rules exists)

\*The implementation of the functions contains more information about their input and output values.

## custom_VAST_client.js
This library implements two functions:

* **makeVASTRequest** creates an XML-HTTP request to a VAST server and handles an successful response by calling the *getResponseObject* function.

* **getResponseObject** handles the received response by parsing the relevant tags of the received XML files, calculates the needed properties and returns them. 

\*The implementation of the functions contains more information about their input and output values.

## Running the App for Testing
The app has been tested with the Red Orbit HbbTV emulator.

The ad can be tested by running http server in the 'ad-app' folder.
Example:
``` 
python3 -m http.server 8000
```


