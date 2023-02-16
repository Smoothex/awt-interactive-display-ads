//
// This file holds the main functionality of the HbbTV App
// being developed from Lachezar Nikolov, Momchil Petrov and Todor Moskov
// as part of the 'Advanced Web Technologies' Project offered by 
// TU Berlin and FOCUS Institute at Fraunhofer in WiSe22/23.
//

// This globally defined variables are to be present both in testing and operation
const VAST_URL = "http://127.0.0.1:8080/vast";
const AD_PERIOD = 1000 * 30 * 1; // 30 000ms are 30s 
const developmentMode = true;

// defined the following variables globally for 'dev' mode
if (developmentMode) {
    var dummy_duration = 10000;
    var dummy_counter = 0;
    var dummy_ads = ['./dummy_json_ads/doner_ad.json', './dummy_json_ads/visit_bulgaria.json', './dummy_json_ads/burger_ad.json', './dummy_json_ads/coca-cola-standard-banner.json', './dummy_json_ads/coca-cola-l-banner.json', './dummy_json_ads/coca-cola-standard-banner.json'];
}
// save the Ad Scene (JS object containing functionality for generating and displaying JSON formatted Ads) globally
var currentAdScene = null;

// function to be called on loading the app
/**
 * This function launches the HbbTV Application.
 * It is meant to be called on loading the HTML body.
 */
function launchInteractiveAdApplication() {
    // attempt to acquire the Application object
    appManager = document.getElementById('applicationManager');
    appObject = appManager.getOwnerApplication(document);
    if (appObject === null) {
        // error acquiring the Application object!
    } 
    else {
        appObject.show();
    }
    // initialize the scene object
    currentAdScene = adScene(appObject, "video", "app_area");
    currentAdScene.initialize(1.0, 0.5);
    // first make request immediately and then set interval
    requestAd();
    setInterval(requestAd, AD_PERIOD);
}

/**
 * Request an Ad typically from the globally defined VAST server address.
 * It uses the 'custom_VAST_client' library for retrieving the XML response.
 * The VAST response should contain a URL for a single Ad in JSON format that is
 * fetched directly in here. On receiving the JSON formatted Ad this function 
 * generates the Ad object and displays it in the App for the defined duration (VAST response).
 * 
 * Based on the global variable 'developmentMode' the function can retrieve a
 * JSON formatted Ad directly from the local machine for testing purposes. 
 * In this case not VAST request is done and the duration is statically defined.
 * 
 * @returns {boolean} true - is the retrieved Ad object is valid; else false
 */
function requestAd() {
    if (developmentMode) {
        // create dummy ad by getting one of the two local ads
        ad_url = dummy_ads[dummy_counter%dummy_ads.length];
        dummy_counter += 1;

        fetch(ad_url)
        .then((response) => response.json())
        .then((json) => {
            let ad = currentAdScene.createAd(json);
            if (ad == null) {
                console.error(`Ad is not valid and will not be displayed!`)
                return;
            }
            currentAdScene.displayAd(ad);
            setTimeout(() => {currentAdScene.removeAd( ad)}, dummy_duration);
        });
    } else {
        // request a VAST server for an ad and display it
        makeVASTRequest(VAST_URL)
        .then(function (VASTResponse) {
            console.log(VASTResponse); 
            fetch(VASTResponse.url + "/download")
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                let ad = currentAdScene.createAd(json);
                if (ad == null) {
                    console.error(`Ad is not valid and will not be displayed!`)
                    return;
                }
                currentAdScene.displayAd(ad);
                // remove ad after the duration time defined in the VAST response 
                // timeout in ms = <received duration in seconds> * 1000
                setTimeout(() => {currentAdScene.removeAd(ad)}, VASTResponse.duration*1000); 
            });
        })
        .catch(function (err) {
            console.error('Error occurred at requesting an ad!', err.statusText);
            // ToDO: handle an error at requesting an ad
        });
    }
}

