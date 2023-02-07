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
    let appObject = app;  // the JSON object holding the app properties 
    let videoElement = document.getElementById(videoId);  // HTML element holding the broadcasted video
    let safeAreaElement = document.getElementById(safeAreaId);  // HTML element that SHALL wrap all elements relevant to the App
    let videoTransition;  // number of seconds (float) for transitioning when resizing the broadcasted video
    let bannerTransition;  // number of seconds (float) for displaying and removing standard banner ad
    let restImgToRenderCounter = 0;  // number of pictures that are still not loaded of the current ad

    /**
     * private: Rescale the video container.
     * 
     * @param {number} left
     * @param {number} width
     * @param {number} height 
     */
    function resizeVideo(left, width, height) {
        console.debug("Now the video element is being resized!")
        videoElement.style.left = `${left}px`;
        videoElement.style.width = `${width}px`;
        videoElement.style.height = `${height}px`;
        
    };

    /**
     * private: Scale video container to the default size: 1280x720.
     */
    function restoreVideo() {
        resizeVideo(0, 1280, 720);
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
        let element = document.createElement("div");  // the element holding the ad 
        element.style.position = "absolute";
        if (adObject.type === AdType.StandardBanner) {
            element.style.width = `${adObject.props.width.toString()}px`;
            element.style.height = `${adObject.props.height.toString()}px`;
            element.style.left = `${adObject.props.left.toString()}px`;
            element.style.top = `${adObject.props.top.toString()}px`;
            element.style.background = adObject.props.backgroundColor;
            element.style.animation = `append-animate ${bannerTransition}s linear forwards`;
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
            // the containers' positioning properties are originally related to the TV screen borders
            // here these are converted to relate to the ad element borders
            if (adObject.type === AdType.StandardBanner) {
                container.props.left -= adObject.props.left;
                container.props.top -= adObject.props.top;
            }
            // create and append current container to the ad element
            if (container.type === ContainerType.Image) {
                let containerElement = createImgContainer(container.props);
                element.appendChild(containerElement);
                // increase restImgToRenderCounter
                restImgToRenderCounter += 1;
            } else if (container.type === ContainerType.Text) {
                let containerElement = createTextContainer(container.props);
                element.appendChild(containerElement);
            } else if (container.type === ContainerType.Slideshow) {
                let containerElement = createSlideshowContainer(container.props);
                element.appendChild(containerElement);
                // increase restImgToRenderCounter
                restImgToRenderCounter += container.props.images.length;
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
        let element = document.createElement("div");
        element.style.position = "absolute";
        element.style.display = "flex";
        element.style.width = `${props.width}px`;
        element.style.height = `${props.height}px`;
        element.style.left = `${props.left}px`;
        element.style.top = `${props.top}px`;
        let img = document.createElement("img");
        img.style.cssText = "max-width: 100%; max-height: 100%; display: block; margin: auto;";
        img.onload = () => {
            restImgToRenderCounter -= 1;
            console.debug("Image is loaded!");
            if (restImgToRenderCounter === 0) {
                console.debug("Last image was loaded!");
            }
        };
        img.src = props.image;
        element.appendChild(img);
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
        element.style.display = "flex";
        element.style.width = `${props.width}px`;
        element.style.height = `${props.height}px`;
        element.style.left = `${props.left}px`;
        element.style.top = `${props.top}px`;
        // loading all images inside the created 'div' element 
        let images = [];
        let imageCounter = 0;
        let numImgToLoad = props.images.length;
        props.images.forEach(src => {
            let img = document.createElement("img");
            img.style.cssText = "max-width: 100%; max-height: 100%; margin: auto;";
            img.onload = () => {
                restImgToRenderCounter -= 1;
                console.debug("Image is loaded!");
                if (restImgToRenderCounter === 0) {
                    console.debug("Last image was loaded!");
                }
            };
            img.src = src;
            if (imageCounter === 0) {
                img.style.display = "block";
            } else {
                img.style.display = "none";
            }
            element.appendChild(img);
            images.push(img);
            imageCounter++;
        });
        // create a a hint box for for the assigned color button
        let symbolContainer = createSlideshowSymbol(props.nextImageButton);
        element.appendChild(symbolContainer);
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
     * private: Create Div Element for the symbol hinting how to switch between pictures on slideshow container.
     * @param {string} color 
     * @returns 
     */
    function createSlideshowSymbol(color) {
        let symbolContainer = document.createElement('div'); 
        {
            symbolContainer.style.position = "absolute";
            symbolContainer.style.bottom = "0px";
            symbolContainer.style.left = "0px";
            symbolContainer.style.width = "55px";
            symbolContainer.style.height = "15px";
            symbolContainer.style.background = "#00000080";
            symbolContainer.style.color = "white";
            symbolContainer.style.fontSize = "15px";
            symbolContainer.style.fontFamily = "Arial";
            symbolContainer.innerText = "Press";
        }
        let symbol = document.createElement('div');
        {
            symbol.style.position = "absolute";
            symbol.style.bottom = "0px";
            symbol.style.left = "40px";
            symbol.style.width = "15px";
            symbol.style.height = "15px";
            symbol.style.background = color;
        }
        symbolContainer.appendChild(symbol);
        return symbolContainer
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
        if (props.hasOwnProperty("backgroundColor")) {
            element.style.backgroundColor = props.backgroundColor;
        }

        return element;
    }

    /**
     * public: Append an created HTML element for an ad to the 'safeArea' of the app.
     * 
     * @param {object} ad 
     * @returns {null}
     */
    function displayAd(ad) {

        if (restImgToRenderCounter !== 0) {
            console.debug("Ad not ready yet!")
            setTimeout(() => {displayAd(ad)}, 1000);
            return;
        }

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
            setTimeout(() => {safeAreaElement.removeChild(ad.element);}, videoTransition*1000);
            ad.element.style.animation = `remove-animate ${bannerTransition}s linear forwards`;
        } else if (ad.object.type === AdType.LBanner) {
            restoreVideo();
            setTimeout(() => {safeAreaElement.removeChild(ad.element)}, videoTransition*1000);
        }
    }
    
    /**
     * public: Perform necessary tasks before creating ads. 
     */
    function initialize(videoTransitionTime=1, bannerTransitionTime=0.5) {
        videoTransition = videoTransitionTime;
        videoElement.style.transition = `${videoTransition}s`;
        bannerTransition = bannerTransitionTime;
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
    console.debug("Checking all attributes of JSON Ad...");
    if (!da_instance.hasOwnProperty("key")) return false;
    if (typeof da_instance.key !== "string") return false;
    console.debug("'key' attr. is valid");
    if (!da_instance.hasOwnProperty("name")) return false;
    if (typeof da_instance.name !== "string") return false;
    console.debug("'name' attr. is valid");
    if (!da_instance.hasOwnProperty("type")) return false;
    if (!(Object.values(AdType).includes(da_instance.type))) return false;
    console.debug("'type' attr. is valid");
    if (!da_instance.hasOwnProperty("props")) return false;
    if (typeof da_instance.props !== "object") return false;
    console.debug("'props' attr. is valid");
    // the containers' properties
    let props = da_instance.props
    if (!props.hasOwnProperty("width")) return false;
    if (props.width <= 0 || props.width > 1280) return false;
    console.debug("'width' attr. is valid");
    if (!props.hasOwnProperty("height")) return false;
    if (props.height <= 0 || props.height > 720) return false;
    console.debug("'height' attr. is valid");
    if (!props.hasOwnProperty("top")) return false;
    if (props.top < 0 || props.top >= 720) return false;
    console.debug("'top' attr. is valid");
    if (!props.hasOwnProperty("left")) return false;
    if (props.left <= 0 || props.left >= 1280) return false;
    console.debug("'left' attr. is valid");
    if (!props.hasOwnProperty("backgroundColor")) return false;
    if (typeof props.backgroundColor !== "string") {
        return false;
    }  else {
        if (props.backgroundColor.length !== 7 && props.backgroundColor[0] !== "#") return false;
    }
    console.debug("'backgroundColor' attr. is valid!")
    if (!props.hasOwnProperty("children")) return false;
    if (!Array.isArray(props.children)) return false;
    console.debug("... not checking each child (container)...");
    // check all attributes of 'children'
    props.children.forEach(container => {
        if (!container.hasOwnProperty("key")) return false;
        if (typeof container.key !== "string") return false;   
        console.debug(`Child key ${container.key} is valid`)
        if (!container.hasOwnProperty("width")) return false;
        if (container.width <= 0 || container.width > 1280) return false;
        console.debug("'width' child's attr. is valid");
        if (!container.hasOwnProperty("height")) return false;
        if (container.height <= 0 || container.height > 720) return false;
        console.debug("'height' child's attr. is valid");
        if (!container.hasOwnProperty("top")) return false;
        if (container.top < 0 || container.top >= 720) return false;
        console.debug("'top' child's attr. is valid");
        if (!container.hasOwnProperty("left")) return false;
        if (container.left <= 0 || container.left >= 1280) return false;
        console.debug("'left' child's attr. is valid");
        if (!container.hasOwnProperty("type")) return false;
        // check the custom attributes
        if (container.type === ContainerType.Text) {
            if (!container.hasOwnProperty("text")) return false;
            if (typeof container.text !== "string") return false;
            console.debug("'text' child's attr. is valid");
            if (!container.hasOwnProperty("fontSize")) return false;
            if (typeof container.fontSize !== "string") {
                return false;
            } else {
                if (container.fontSize.slice(-2) !== "px") return false;
            } 
            console.debug("'fontSize' child's attr. is valid");
            if (!container.hasOwnProperty("textAlign")) return false;
            if (!(container.textAlign in textAlignList)) return false; 
            console.debug("'textAlign' child's attr. is valid");
            if (!container.hasOwnProperty("color")) return false;
            if (typeof container.color !== "string") {
                return false;
            }  else {
                if (container.color.length !== 7 && container.color[0] !== "#") return false;
            }
            console.debug("'color' child's attr. is valid");
            if (!container.hasOwnProperty("fontWeight")) return false;
            if (!(container.fontWeight in fontWeightList)) return false; 
            console.debug("'fontWeight' child's attr. is valid");
            if (!container.hasOwnProperty("fontStyle")) return false;
            if (!(container.fontStyle in fontStyleList)) return false; 
            console.debug("'fontStyle' child's attr. is valid");
            if (!container.hasOwnProperty("textDecoration")) return false;
            if (!(container.textDecoration in textDecorationList)) return false; 
            console.debug("'textDecoration' child's attr. is valid");
            if (!container.hasOwnProperty("fontFamily")) return false;
            if (typeof container.fontFamily !== "string") return false;   
            console.debug("'fontFamily' child's attr. is valid");
        } else if (container.type === ContainerType.Image) {
            if (!container.hasOwnProperty("image")) return false;
            if (typeof container.image !== "string") return false;
            console.debug("'image' child's attr. is valid");
        } else if (container.type === ContainerType.Slideshow) {
            if (!container.hasOwnProperty("nextImageButton")) return false;
            if (!(container.nextImageButton in nextImageButtonList)) return false; 
            console.debug("'nextImageButton' child's attr. is valid");
            if (!props.hasOwnProperty("images")) return false;
            if (!Array.isArray(props.images)) return false;
            console.debug("'images' child's attr. is valid");
        } else {
            return false;
        }
    })
    console.debug("...all attributes are valid!");
    return true
}