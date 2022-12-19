//
// This file holds the main functionality of the HbbTV app
//
const AD_PERIOD = 1000 * 60 * 1; // 1 minutes period 
const TYPE_BANNER = "banner";
const TYPE_L_BANNER = "l-banner";

const DUMMY_PICTURES = ["momi_original", "momi_red", "momi_green"]
var current_interactive_img = null;

// scene implementation
var scene = {
    theAppObject:null,
    appAreaDiv: null,
    isAdRunning: false,
    currentAd: null,
    videoBroadcastDiv: null,
    initialize: function(appObj) {
        this.theAppObject = appObj;
        this.appAreaDiv = document.getElementById('app_area');
        this.videoBroadcastDiv = document.getElementById('video');
        // register RC button event listener
        rcUtils.registerKeyEventListener();
        // initial state is app_area hidden
    },
    resizeVideo: function(ratio) {
        this.videoBroadcastDiv.style.left = (1280*(1-ratio)).toString() + "px";
        this.videoBroadcastDiv.style.width = (1280*(ratio)).toString() + "px";
        this.videoBroadcastDiv.style.height = (720*(ratio)).toString() + "px";
    },
    restoreVideo: function() {
        this.videoBroadcastDiv.video.style.left = "0px";
        this.videoBroadcastDiv.video.style.width = "1280px";
        this.videoBroadcastDiv.video.style.height = "720px";
    }
};

// RC button press handler function
function handleKeyCode(kc) {
    try {
        // process buttons
        switch (kc) {
            case VK_RED:
                // red button only prints to the console for now
                console.log("Red");
                let new_index = current_interactive_img + 1;
                if (new_index === DUMMY_PICTURES.length) 
                    new_index = 0;
                document.getElementById(DUMMY_PICTURES[new_index]).style.display = "block";
                document.getElementById(DUMMY_PICTURES[current_interactive_img]).style.display = "none";
                current_interactive_img = new_index;
                break;
            case VK_GREEN:
                // green button only prints to the console for now
                console.log("Green");
                break;
            case VK_YELLOW:
                // yellow button only prints to the console for now
                console.log("Yellow");
                break;
            case VK_BLUE:
                // blue button only prints to the console for now
                console.log("Blue");
                break;
            case VK_LEFT:
                // left button only prints to the console for now
                console.log("Left");
                break;
            case VK_RIGHT:
                // right button only prints to the console for now
                console.log("Right");
                break;
            case VK_DOWN:
                // down button only prints to the console for now
                console.log("Down");
                break;
            case VK_UP:
                // up button only prints to the console for now
                console.log("Up");
                break; 
            default:
                // pressed unhandled key only prints to the console for now
                console.log("Other button");
        }
    }
    catch (e) {
        // handle the error cases
    }
    // return true to prevent default action for processed keys
    return true;
}


// function to called on loading the app
function start() {
    // attempt to acquire the Application object
    appManager = document.getElementById('applicationManager');
    appObject = appManager.getOwnerApplication(document);
    if (appObject === null) {
        // error acquiring the Application object!
    } 
    else {
        // initialize the scene
        scene.initialize(appObject);
        appObject.show();
    }
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
    xhr.send();

    // dummy ad data
    let ad_data = {
        type_ad: TYPE_BANNER,
        duration: 20 * 1000 // 20s
    };
    // ToDo: move the following function into the async function
    display_ad(ad_data);
}

function display_ad(ad_data) {
    // ToDo: finish the actual functionality
    if (ad_data.type_ad === TYPE_BANNER) {
        display_banner(ad_data);
    } else if (ad_data.type_ad === TYPE_L_BANNER) {
        display_l_banner();
    } else {
        return;
    }

    setTimeout(hide_ad, ad_data.duration);
}

function display_banner(ad_data) {
    document.getElementById("app_area").style.zIndex = "10";
    let banner_div = document.getElementById("banner-div");
    banner_div.style.display = "block";
    current_ad = TYPE_BANNER;

    current_interactive_img = 0;

    console.log("Banner displayed");
}

function display_l_banner(ad_data) {
    document.getElementById("app_area").style.zIndex = "1";
    let ratio = 0.8 // dummy ratio
    scene.resizeVideo(ratio);
    let l_banner_div = document.getElementById("l-banner-div");
    l_banner_div.style.display = "block";
    current_ad = TYPE_L_BANNER;
    console.log("L-Banner displayed");
} 

function hide_ad() {
    if (current_ad === TYPE_BANNER) {
        let banner_div = document.getElementById("banner-div");
        banner_div.style.display = "none";
        current_ad = null;
    } else if (current_ad === TYPE_L_BANNER) {
        let video = document.getElementById("video");
        scene.restoreVideo();
        let l_banner_div = document.getElementById("l-banner-div");
        l_banner_div.style.display = "none";
        current_ad = null;
    }
    console.log("Ad hided");
}
