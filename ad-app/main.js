//
// This file holds the main functionality of the HbbTV app
//
const AD_PERIOD = 1000 * 60 * 0.1; // 1 minute dummy period 

let dummy_counter = 0;
let ads = ['./dummy_l_banner_ad.json', './dummy_l_banner_ad.json', './dummy_banner_ad.json'];


var currentAdScene = null;

// function to called on loading the app
function start() {
    // attempt to acquire the Application object
    appManager = document.getElementById('applicationManager');
    appObject = appManager.getOwnerApplication(document);
    if (appObject === null) {
        // error acquiring the Application object!
    } 
    else {
        appObject.show();
    }
    // initialize the scene
    currentAdScene = adScene(appObject, "video", "app_area");
    currentAdScene.initialize();
    // first make request immediately and then set interval
    setTimeout(() => {requestAd()}, 1000);
    setInterval(requestAd, AD_PERIOD);
}

function requestAd() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8080/vast.xml");
    xhr.setRequestHeader("Accept", "application/xml");
    xhr.onload = () => {
        xmlDoc = xhr.responseXML;   // a document object containing the XML
        console.log(xmlDoc.getElementsByTagName("Ad")[0]);
        // getElementsByTagName("MediaFile")[0].getAttribute("type")    --> returns the attribute of the specified tag
        // xmlDoc.getElementsByTagName("MediaFile")[0].textContent      --> returns the text of the specified tag
    }
    //xhr.send(); // sending disabled for static testing

    // create dummy ad by getting one of the two local ads
    let ad_link = ads[dummy_counter%3];
    dummy_counter += 1;

    fetch(ad_link)
        .then((response) => response.json())
        .then((json) => {
            let ad = currentAdScene.createAd(json);
            currentAdScene.displayAd(ad);
            setTimeout(() => {currentAdScene.removeAd( ad)}, 5000); // ad duration 20s
        }); 
}

