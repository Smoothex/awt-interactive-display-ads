//
// This file holds the main functionality of the HbbTV app
//
const VAST_URL = "http://127.0.0.1:8080/vast";
const AD_PERIOD = 1000 * 30 * 1; // 30 000ms are 30s 
const developmentMode = true;

if (developmentMode) {
    var dummy_duration = 10000;
    var dummy_counter = 0;
    var dummy_ads = ['./dummy_json_ads/doner_ad.json', './dummy_json_ads/visit_bulgaria.json', './dummy_json_ads/burger_ad.json', './dummy_json_ads/coca-cola-standard-banner.json', './dummy_json_ads/coca-cola-l-banner.json', './dummy_json_ads/coca-cola-standard-banner.json'];
}

var currentAdScene = null;

// function to called on loading the app
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
                return false;
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
                currentAdScene.displayAd(ad);
                setTimeout(() => {currentAdScene.removeAd(ad)}, VASTResponse.duration*500);
            });
        })
        .catch(function (err) {
            console.error('Error occurred at requesting an ad!', err.statusText);
            // ToDO: handle an error at requesting an ad
        });
    }
    return true;
}

