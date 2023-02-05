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

// by default the mask includes all color buttons
var COLOR_BUTTON_MASK = MASK_CONSTANT_RED + MASK_CONSTANT_GREEN + MASK_CONSTANT_BLUE + MASK_CONSTANT_YELLOW;

// map for getting the corresponding keyCode for the relevant buttons
const KEY_MAP = {
    red: VK_RED,
    green: VK_GREEN,
    blue: VK_BLUE,
    yellow: VK_YELLOW
}

const AdType = {
    LBanner: "l-banner",
    StandardBanner: "standard-banner"
}

const ContainerType = {
    Image: "image-container",
    Text: "text-container",
    Slideshow: "slideshow-container"
}

/**
 * Creates an 'scene' object that contains attributes and methods for managing global objects and static HTML elements.
 * 
 * @param {string} videoId: id of the HTML-element for the broadcasted video container
 * @param {string} safeAreaId: id of the HTML-element holding all custom elements for the application
 * @returns {object}: initialized object for manipulating the scene 
 */
function adScene(app, videoId, safeAreaId) {
    let appObject = app;
    let videoElement = document.getElementById(videoId);
    let safeAreaElement = document.getElementById(safeAreaId);

    /**
     * private: Rescale the video container.
     * 
     * @param {string} width 
     */
    function resizeVideo(width) {
        let ratio = Number(1280 - width.slice(0,-2))/1280;
        videoElement.style.left = width;
        videoElement.style.width = (1280*(ratio)).toString() + "px";
        videoElement.style.height = (720*(ratio)).toString() + "px";
        
    };

    /**
     * private: Scale video container to the default size: 1280x720.
     */
    function restoreVideo() {
        videoElement.style.left = "0px";
        videoElement.style.width = "1280px";
        videoElement.style.height = "720px";
    };

    /**
     * private: Initialize the variables for the buttons of the remote control.
     */
    function initKeys() {
        if (typeof(KeyEvent)!=='undefined') {
            if (typeof(KeyEvent.VK_RED)!=='undefined') {
                var VK_RED = KeyEvent.VK_RED;
                var VK_GREEN = KeyEvent.VK_GREEN;
                var VK_YELLOW = KeyEvent.VK_YELLOW;
                var VK_BLUE = KeyEvent.VK_BLUE;
            }
        }
        // if that failed, define RC button globals for browser emulator
        if (typeof(VK_RED)==='undefined') {
            var VK_RED = 0x193;
            var VK_GREEN = 0x194;
            var VK_YELLOW = 0x195;
            var VK_BLUE = 0x196;
        }
    };

    /**
     * private: Enable interaction with buttons of the remote control.
     * 
     * @param {number} mask 
     */
    function setKeys(mask) {
        try {
            appObject.privateData.keyset.setValue(mask);
        } catch (e) {
            // try as per OIPF DAE v1.1
            try {
                appObject.private.keyset.setValue(mask);
            }
            catch (ee) {
                // catch the error while setting keyset value 
            }
        }
    };

    /**
     * private: Register a remote control button to execute a given function on pressing.
     * 
     * @param {number} key 
     * @param {function} callback 
     */
    function registerKey(key, callback) {
        document.addEventListener('keydown', function(e) {
            if (e.keyCode === key) { // keyCode is deprecated event property but still relevant for HbbTV apps
                callback();
                e.preventDefault();
            }
        }, false);
    };

    /**
     * public: Create an HTML element that implements an ad described by the given input parameters.
     * 
     * @param {object} adObject: display ad object parsed from JSON string following the custom project format
     * @returns {object}: element - HTML-element holding the created ad; 
     *                    type - type of the object as string; 
     *                    width - width of the ad (relevant only for L-banners)
     */
    function createAd(adObject) {
        let element = document.createElement("div");
        //element.id = adObject.type + "-div";
        element.style.position = "absolute";
        if (adObject.type === AdType.StandardBanner) {
            element.style.width = adObject.props.width;
            element.style.height = adObject.props.height;
            element.style.left = adObject.props.left;
            element.style.top = adObject.props.top;
            element.style.background = adObject.props.background_color;
            element.style.animation = "append-animate .5s linear";
        } else if (adObject.type === AdType.LBanner) {
            element.style.width = "1280px";
            element.style.height = "720px";
            element.style.background = adObject.props.background_color;
            element.style.zIndex = "-10";
        } else {
            console.error(`Such ad type does not exist: ${adObject.type}`);
        }
        
        // add containers
        adObject.props.children.forEach(container => {
            if (container.type === ContainerType.Image) {
                let containerElement = createImgContainer(container.props);
                element.appendChild(containerElement);
            } else if (container.type === ContainerType.Text) {
                let containerElement = createTextContainer(container.props);
                element.appendChild(containerElement);
            } else if (container.type === ContainerType.Slideshow) {
                let containerElement = createSlideshowContainer(container.props);
                element.appendChild(containerElement);
            }else {
                console.error(`Such container type does not exist: ${container.type}`);
            }
        });

        return {element: element, type: adObject.type, shift: adObject.props.width};
    }

    /**
     * private: Create HTML element for holding simple image inside an ad.
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
     * private: Create HTML element for holding an interactive slideshow of images inside an ad.
     * 
     * @param {object} props: sub-object for a container from type 'slideshow-container'
     * @returns {HTMLDivElement}
     */
    function createSlideshowContainer(props) {
        // create a div element for the ad and set its properties
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
        // create a a hint box for for the assigned color button
        let symbolContainer = document.createElement('div'); 
        {
            symbolContainer.style.position = "absolute";
            symbolContainer.style.bottom = "0px";
            symbolContainer.style.left = "0px";
            symbolContainer.style.width = "35px";
            symbolContainer.style.height = "10px";
            symbolContainer.style.background = "#00000080";
            symbolContainer.style.color = "white";
            symbolContainer.style.fontSize = "10px";
            symbolContainer.innerText = "Press";
        }
        let symbol = document.createElement('div');
        {
            symbol.style.position = "absolute";
            symbol.style.bottom = "0px";
            symbol.style.left = "25px";
            symbol.style.width = "10px";
            symbol.style.height = "10px";
            symbol.style.background = props.nextImageButton;
        }
        element.appendChild(symbolContainer);
        symbolContainer.appendChild(symbol);
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
        // enabling all color buttons
        setKeys();
        registerKey(keyCode, eventCallback);
        
        return element;
    }

    /**
     * private: Create HTML element for holding simple text inside an ad.
     * 
     * @param {object} props: sub-object for a container from type 'text'
     * @returns {HTMLParagraphElement}
     */
    function createTextContainer(props) {
        let element = document.createElement("p");
        element.style.margin = "0px";
        element.style.position = "absolute";
        element.style.width = props.width;
        element.style.height = props.height;
        element.style.left = props.left;
        element.style.top = props.top;
        element.style.textAlign = props.textAlign;
        element.style.fontFamily = props.fontFamily;
        element.style.fontStyle = props.fontStyle;
        element.style.fontSize = props.fontSize;
        element.style.fontWeight = props.fontWeight;
        element.style.color = props.color;
        element.innerHTML = props.text;

        return element;
    }

    /**
     * public: Append an created HTML element for an ad to the 'safeArea' of the app.
     * 
     * @param {object} ad 
     * @returns {null}
     */
    function displayAd(ad) {
        if (ad.type === AdType.StandardBanner) {
            safeAreaElement.appendChild(ad.element);
        } else if (ad.type === AdType.LBanner) {
            safeAreaElement.appendChild(ad.element);
            resizeVideo(ad.shift);
        }
    }

    /**
     * public: Remove an created HTML element for an ad from the 'safeArea' of the app.
     * 
     * @param {object} ad 
     * @returns {null}
     */
    function removeAd(ad) {
        if (ad.type === AdType.StandardBanner) {
            setTimeout(() => {safeAreaElement.removeChild(ad.element);}, 450);
            ad.element.style.animation = "remove-animate .5s linear";
        } else if (ad.type === AdType.LBanner) {
            restoreVideo();
            setTimeout(() => {safeAreaElement.removeChild(ad.element)}, 1000);
        }
    }
    
    /**
     * public: Perform necessary tasks before creating ads. 
     */
    function initialize() {
        videoElement.style.transition = "1s";
        initKeys(COLOR_BUTTON_MASK);
    }

    return {
        initialize,
        createAd,
        displayAd,
        removeAd
    };
}