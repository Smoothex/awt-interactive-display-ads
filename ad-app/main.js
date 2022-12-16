const AD_PERIOD = 1000 * 60 * 1; // 1 minutes period 
const TYPE_BANNER = "banner";
const TYPE_L_BANNER = "l-banner";

var current_ad = null;
var appManager = null;
var appObject = null;

// function to called on loading the app
function start() {
    // attempt to acquire the Application object
    appManager = document.getElementById('applicationManager');
    appObject = appManager.getOwnerApplication(document);
    appObject.show();
    let video = document.getElementById("video");
    // First make request immediately and then set interval
    requestAd();
    setInterval(requestAd, AD_PERIOD);
}

function requestAd() {
    // ToDo: Make VAST Request

    // ToDo: Call async function for waiting for the Response 
    // Dummy ad data
    let ad_data = {
        type_ad: TYPE_BANNER,
        duration: 20 * 1000 // 20s
    };
    // ToDo: Move the following function into the async function
    display_ad(ad_data);
}

function display_ad(ad_data) {
    // ToDo: Finish the actual functionality
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
    console.log("Banner displayed");
}

function display_l_banner(ad_data) {
    document.getElementById("app_area").style.zIndex = "1";
    let video = document.getElementById("video");
    let ratio = 0.8 // dummy ratio
    video.style.left = (1280*(1-ratio)).toString() + "px";
    video.style.width = (1280*(ratio)).toString() + "px";
    video.style.height = (720*(ratio)).toString() + "px";
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
        video.style.left = "0px";
        video.style.width = "1280px";
        video.style.height = "720px";
        let l_banner_div = document.getElementById("l-banner-div");
        l_banner_div.style.display = "none";
        current_ad = null;
    }
    console.log("Ad hided");
}
