// 
// This file holds the implementation for a custom 
// library/SDK for handling the custom JSON format
// for the display ads of the project
//

// masks for activating the button interfaces
const MASK_CONSTANT_RED = 0x1;
const MASK_CONSTANT_GREEN = 0x2;
const MASK_CONSTANT_YELLOW = 0x4;
const MASK_CONSTANT_BLUE = 0x8;

// map for getting the corresponding keyCode for the relevant buttons
const KEY_MAP = {
    red: VK_RED,
    green: VK_GREEN,
    blue: VK_BLUE,
    yellow: VK_YELLOW
}

/**
 * Creates an 'scene' object that contains attributes and methods for managing global objects and static HTML elements.
 * 
 * @param {string} videoId: id of the HTML-element for the broadcasted video container
 * @param {string} safeAreaId: id of the HTML-element holding all custom elements for the application
 * @returns {object}: initialized object for manipulating the scene 
 */
function scene(app, videoId, safeAreaId) {
    const self = {
        appObject: app,
        videoElement: document.getElementById(videoId),
        safeAreaElement: document.getElementById(safeAreaId),
        resizeVideo: function(width) {
            let ratio = Number(1280 - width.slice(0,-2))/1280;
            this.videoElement.style.left = width;
            this.videoElement.style.width = (1280*(ratio)).toString() + "px";
            this.videoElement.style.height = (720*(ratio)).toString() + "px";
        },
        restoreVideo: function() {
            this.videoElement.style.left = "0px";
            this.videoElement.style.width = "1280px";
            this.videoElement.style.height = "720px";
        },
        initKeys: function() {
            if (typeof(KeyEvent)!=='undefined') {
                if (typeof(KeyEvent.VK_RED)!=='undefined') {
                    var VK_RED = KeyEvent.VK_RED;
                    var VK_GREEN = KeyEvent.VK_GREEN;
                    var VK_YELLOW = KeyEvent.VK_YELLOW;
                    var VK_BLUE = KeyEvent.VK_BLUE;
                }
            }
            // if we failed, define RC button globals for browser emulator
            if (typeof(VK_RED)==='undefined') {
                var VK_RED = 0x193;
                var VK_GREEN = 0x194;
                var VK_YELLOW = 0x195;
                var VK_BLUE = 0x196;
            }
        },
        setKeys: function(mask) {
            try {
                this.appObject.privateData.keyset.setValue(mask);
            } catch (e) {
                // try as per OIPF DAE v1.1
                try {
                    this.appObject.private.keyset.setValue(mask);
                }
                catch (ee) {
                    // catch the error while setting keyset value 
                }
            }
        },
        registerKey: function(key, callback) {
            document.addEventListener('keydown', function(e) {
                if (e.keyCode === key) { // keyCode is depreciated Event property but still relevant for HbbTV apps
                    callback();
                    e.preventDefault();
                }
            }, false);
        }
    }
    self.initKeys();
    return self;
}

/**
 * Creates an HTML element that implements an ad described by the given input parameters.
 * 
 * @param {object} adObject: display ad object parsed from JSON string following the custom project format
 * @returns {object}: element - HTML-element holding the created ad; 
 *                    type - type of the object as string; 
 *                    width - width of the ad (relevant only for L-banners)
 */
function createAd(adObject, scene) {
    let element = document.createElement("div");
    element.id = adObject.type + "-div";
    element.style.position = "absolute";
    if (adObject.type === "banner") {
        element.style.width = adObject.props.width;
        element.style.height = adObject.props.height;
        element.style.left = adObject.props.left;
        element.style.top = adObject.props.top;
        element.style.background = adObject.props.background_color;
        element.style.animation = "append-animate .3s linear";
    } else if (adObject.type === "l-banner") {
        element.style.width = "1280px";
        element.style.height = "720px";
        element.style.background = adObject.props.background_color;
        element.style.zIndex = "-10";
    } else {
        console.error(`Such ad type does not exist: ${adObject.type}`);
    }
    
    // add containers
    console.log(adObject);
    adObject.props.children.forEach(container => {
        if (container.type === "image-container") {
            let containerElement = createImgContainer(container.props);
            element.appendChild(containerElement);
        } else if (container.type === "text-container") {
            let containerElement = createTextContainer(container.props);
            element.appendChild(containerElement);
        } else if (container.type === "slideshow-container") {
            let containerElement = createSlideshowContainer(container.props, scene);
            element.appendChild(containerElement);
        }else {
            console.error(`Such container type does not exist: ${container.type}`);
        }
    });

    return {element: element, type: adObject.type, shift: adObject.props.width};
}

/**
 * Creates HTML element for holding simple image inside an ad.
 * 
 * @param {object} props: sub-object for a container from type 'ímg'
 * @returns {HTMLImageElement}
 */
function createImgContainer(props) {
    let element = document.createElement("img");
    element.style.position = "absolute";
    element.style.width = props.width;
    element.style.height = props.height;
    element.style.left = props.left;
    element.style.top = props.top;
    element.src = props.image;
    
    return element;
}

/**
 * Creates HTML element for holding an interactive slideshow of images inside an ad.
 * 
 * @param {object} props: sub-object for a container from type 'slideshow-container'
 * @returns {HTMLDivElement}
 */
 function createSlideshowContainer(props, scene) {
    let element = document.createElement("div");
    element.style.position = "absolute";
    element.style.width = props.width;
    element.style.height = props.height;
    element.style.left = props.left;
    element.style.top = props.top;
    // loading all images inside the created 'div' element 
    let images = [];
    let imageCounter = 0;
    props.images.forEach(src => {
        let image = document.createElement("img");
        image.style.position = "absolute";
        image.style.width = "100%";
        image.style.height  = "100%";
        image.src = src;
        if (imageCounter === 0) {
            image.style.display = "block";
        } else {
            image.style.display = "none";
        }
        element.appendChild(image);
        images.push(image);
        imageCounter++;
    });
    // adding functionality for interaction with the add 
    element.dataset.index = "0"; // saving the index of the current display image
    let numberImages = images.length;
    let eventCallback = function() {
        let current_index = Number(element.dataset.index);
        let new_index = current_index + 1;
        if (new_index === numberImages) 
            new_index = 0;
        images[new_index].style.display = "block";
        images[current_index].style.display = "none";
        element.dataset.index = new_index.toString();
    }
    let keyCode = KEY_MAP[props.nextImageButton];
    // enabling all color buttons for now 
    // ToDo: Discussing if enabling only the needed buttons is necessary 
    scene.setKeys(MASK_CONSTANT_RED + MASK_CONSTANT_GREEN + MASK_CONSTANT_BLUE + MASK_CONSTANT_YELLOW);
    scene.registerKey(keyCode, eventCallback);
    
    return element;
}

/**
 * Creates HTML element for holding simple text inside an ad.
 * 
 * @param {object} props: sub-object for a container from type 'text'
 * @returns {HTMLParagraphElement}
 */
function createTextContainer(props) {
    let element = document.createElement("p");
    element.style.position = "absolute";
    element.style.width = props.width;
    element.style.height = props.height;
    element.style.left = props.left;
    element.style.top = props.top;
    element.style.fontStyle = props.fontStyle;
    element.style.fontSize = props.fontSize;
    element.style.fontWeight = props.fontWeight;
    element.style.color = props.color;
    element.style.textAlign = props.textAlign;
    element.innerHTML = props.text;

    return element;
}

/**
 * Appends an created HTML element for an ad to the 'safeArea' of the app.
 * 
 * @param {object} scene 
 * @param {object} ad 
 * @returns {null}
 */
function displayAd(scene, ad) {
    if (ad.type === "banner") {
        scene.safeAreaElement.appendChild(ad.element);
    } else if (ad.type === "l-banner") {
        scene.safeAreaElement.appendChild(ad.element);
        scene.resizeVideo(ad.shift);
    }
}

/**
 * Removes an created HTML element for an ad from the 'safeArea' of the app.
 * 
 * @param {object} scene 
 * @param {object} ad 
 * @returns {null}
 */
function removeAd(scene, ad) {
    if (ad.type === "banner") {
        scene.safeAreaElement.removeChild(ad.element);
    } else if (ad.type === "l-banner") {
        scene.restoreVideo();
        scene.safeAreaElement.removeChild(ad.element);
    }
}