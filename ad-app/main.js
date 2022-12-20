//
// This file holds the main functionality of the HbbTV app
//
const AD_PERIOD = 1000 * 60 * 1; // 1 minute dummy period 

const BANNER_AD = {
    key: "1",
    type: "banner",
    props: {
        width: "1024px",
        height: "200px",
        left: "128px",
        top: "500px",
        background_color: "#010175",
        children: [
            {
                key: "1",
                type: "image-container", 
                props: {
                    width: "120px",
                    height: "200px",
                    left: "0px",
                    top: "0px",
                    image: "./momi_original.jpg"
                }
            },
            {
                key: "2",
                type: "text-container", 
                props: {
                    width: "800px",
                    height: "200px",
                    left: "200px",
                    top: "0px",
                    color: "white",
                    textAlign: "center",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: "42px",
                    text: "Momi Shisha pravi nai-dobrite nargileta.<br>Telefon za vruzka: +49 176 43866025"
                }
            }
        ]
    }
};

const L_BANNER_AD = {
    key: "2",
    type: "l-banner",
    props: {
        width: "256px",
        background_color: "#010175",
        children: [
            {
                key: "1",
                type: "image-container", 
                props: {
                    width: "256px",
                    height: "576px",
                    left: "0px",
                    top: "0px",
                    image: "bottle-vodka-gin-isolated-on-600w-1833553141.webp"
                }
            },
            {
                key: "2",
                type: "text-container", 
                props: {
                    width: "800px",
                    height: "144px",
                    left: "256px",
                    top: "576px",
                    color: "white",
                    textAlign: "center",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "32px",
                    text: "Top rakiqta na regiona."
                }
            }
        ]
    }
};

let dummy_counter = 0;
let ads = [BANNER_AD, L_BANNER_AD];


var current_scene = null;

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
    current_scene = scene("video", "app_area");
    // first make request immediately and then set interval
    requestAd();
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

    // create dummy ad by getting one of the two static ads
    let ad_object = ads[dummy_counter%2];
    dummy_counter += 1;

    let ad = createAd(ad_object);
    console.log(current_scene, ad);
    displayAd(current_scene, ad);

    setTimeout(() => {removeAd(current_scene, ad)}, 20000); // ad duration 20s 
}

