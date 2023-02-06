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

const textAlignList = ["center", "left", "right"];
const fontWeightList = ["bold", "none"];
const fontStyleList = ["italic", "none"];
const textDecorationList = ["underlined", "none"];
const nextImageButtonList = ["red", "blue", "green", "yellow"];



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
     * @param {number} left
     * @param {number} width
     * @param {number} height 
     */
    function resizeVideo(left, width, height) {
        console.log("Resizing...")
        videoElement.style.left = `${left}px`;
        videoElement.style.width = `${width}px`;
        videoElement.style.height = `${height}px`;
        
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
        if (!validateDA(adObject)) {
            return;
        }
        let element = document.createElement("div");
        //element.id = adObject.type + "-div";
        element.style.position = "absolute";
        if (adObject.type === AdType.StandardBanner) {
            element.style.width = `${adObject.props.width.toString()}px`;
            element.style.height = `${adObject.props.height.toString()}px`;
            element.style.left = `${adObject.props.left.toString()}px`;
            element.style.top = `${adObject.props.top.toString()}px`;
            element.style.background = adObject.props.backgroundColor;
            element.style.animation = "append-animate .5s linear";
        } else if (adObject.type === AdType.LBanner) {
            element.style.width = "1280px";
            element.style.height = "720px";
            element.style.background = adObject.props.backgroundColor;
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

        return {element: element, object: adObject};
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
        element.style.width = `${props.width}px`;
        element.style.height = `${props.height}px`;
        element.style.left = `${props.left}px`;
        element.style.top = `${props.top}px`;
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
        element.style.width = `${props.width}px`;
        element.style.height = `${props.height}px`;
        element.style.left = `${props.left}px`;
        element.style.top = `${props.top}px`;
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
        element.style.width = `${props.width}px`;
        element.style.height = `${props.height}px`;
        element.style.left = `${props.left}px`;
        element.style.top = `${props.top}px`;
        element.style.textAlign = props.textAlign;
        element.style.fontFamily = props.fontFamily;
        element.style.fontStyle = props.fontStyle;
        element.style.fontSize = props.fontSize;
        element.style.fontWeight = props.fontWeight;
        element.style.textDecoration = props.textDecoration;
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
        if (ad.object.type === AdType.StandardBanner) {
            safeAreaElement.appendChild(ad.element);
        } else if (ad.object.type === AdType.LBanner) {
            safeAreaElement.appendChild(ad.element);
            resizeVideo(ad.object.props.left, ad.object.props.width, ad.object.props.height);
        }
    }

    /**
     * public: Remove an created HTML element for an ad from the 'safeArea' of the app.
     * 
     * @param {object} ad 
     * @returns {null}
     */
    function removeAd(ad) {
        if (ad.object.type === AdType.StandardBanner) {
            setTimeout(() => {safeAreaElement.removeChild(ad.element);}, 450);
            ad.element.style.animation = "remove-animate .5s linear";
        } else if (ad.object.type === AdType.LBanner) {
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

/**
 * private: It validates all attributes of the parsed JSON object for a DA.
 * @param {object} da_instance 
 * @returns: true is all attributes are present and valid, else false
 */
function  validateDA(da_instance) {
    console.log('key')
    if (!da_instance.hasOwnProperty("key")) return false;
    if (typeof da_instance.key !== "string") return false;
    console.log('name')
    if (!da_instance.hasOwnProperty("name")) return false;
    if (typeof da_instance.name !== "string") return false;
    console.log('type')
    if (!da_instance.hasOwnProperty("type")) return false;
    if (da_instance.type !== AdType.StandardBanner && da_instance.type !== AdType.LBanner) return false;
    console.log('props')
    if (!da_instance.hasOwnProperty("props")) return false;
    if (typeof da_instance.props !== "object") return false;
    console.log("the containers' 'props'")
    let props = da_instance.props
    console.log('width')
    if (!props.hasOwnProperty("width")) return false;
    if (props.width <= 0 || props.width > 1280) return false;
    console.log('height')
    if (!props.hasOwnProperty("height")) return false;
    if (props.height <= 0 || props.width > 720) return false;
    console.log('top')
    if (!props.hasOwnProperty("top")) return false;
    if (props.top < 0 || props.width >= 720) return false;
    console.log('left')
    if (!props.hasOwnProperty("left")) return false;
    if (props.left <= 0 || props.left >= 1280) return false;
    // check 'backgroundColor'
    if (!props.hasOwnProperty("backgroundColor")) return false;
    if (typeof props.backgroundColor !== "string") {
        return false;
    }  else {
        if (props.backgroundColor.length !== 7 && props.backgroundColor[0] !== "#") return false;
    }
    console.log('children')
    if (!props.hasOwnProperty("children")) return false;
    if (!Array.isArray(props.children)) return false;
    console.log("all attributes of 'children'")
    props.children.forEach(container => {
        console.log('key')
        if (!container.hasOwnProperty("key")) return false;
        if (typeof container.key !== "string") return false;   
        console.log('type')
        if (!container.hasOwnProperty("type")) return false;
        console.log('width')
        if (!container.hasOwnProperty("width")) return false;
        if (container.width <= 0 || container.width > 1280) return false;
        console.log('height')
        if (!container.hasOwnProperty("height")) return false;
        if (container.height <= 0 || container.width > 720) return false;
        console.log('top')
        if (!container.hasOwnProperty("top")) return false;
        if (container.top < 0 || container.width >= 720) return false;
        console.log('left')
        if (!container.hasOwnProperty("left")) return false;
        if (container.left <= 0 || container.left >= 1280) return false;
        console.log('the custom attributes')
        if (container.type === ContainerType.Text) {
            console.log('text')
            if (!container.hasOwnProperty("text")) return false;
            if (typeof container.text !== "string") return false;
            console.log('fontSize')
            if (!container.hasOwnProperty("fontSize")) return false;
            if (typeof container.fontSize !== "string") {
                return false;
            } else {
                if (container.fontSize.slice(-2) !== "px") return false;
            } 
            console.log('textAlign')
            if (!container.hasOwnProperty("textAlign")) return false;
            if (!(container.textAlign in textAlignList)) return false; 
            console.log('color')
            if (!container.hasOwnProperty("color")) return false;
            if (typeof container.color !== "string") {
                return false;
            }  else {
                if (container.color.length !== 7 && container.color[0] !== "#") return false;
            }
            console.log('fontWeight')
            if (!container.hasOwnProperty("fontWeight")) return false;
            if (!(container.fontWeight in fontWeightList)) return false; 
            console.log('fontStyle')
            if (!container.hasOwnProperty("fontStyle")) return false;
            if (!(container.fontStyle in fontStyleList)) return false; 
            console.log('textDecoration')
            if (!container.hasOwnProperty("textDecoration")) return false;
            if (!(container.textDecoration in textDecorationList)) return false; 
            console.log('fontFamily')
            if (!container.hasOwnProperty("fontFamily")) return false;
            if (typeof container.fontFamily !== "string") return false;   
        } else if (container.type === ContainerType.Image) {
            console.log('image')
            if (!container.hasOwnProperty("image")) return false;
            if (typeof container.image !== "string") return false;
        } else if (container.type === ContainerType.Slideshow) {
            console.log('nextImageButton')
            if (!container.hasOwnProperty("nextImageButton")) return false;
            if (!(container.nextImageButton in nextImageButtonList)) return false; 
            console.log('images')
            if (!props.hasOwnProperty("images")) return false;
            if (!Array.isArray(props.images)) return false;
        } else {
            return false;
        }
    })
    return true
}