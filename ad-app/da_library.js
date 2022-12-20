// 
// This file holds the implementation for a custom 
// library/SDK for handling the custom JSON format
// for the display ads of the project
//

/**
 * 
 * @param {string} videoId: id of the HTML-element for the broadcasted video container
 * @param {string} safeAreaId: id of the HTML-element holding all custom elements for the application
 * @returns {object}: initialized object for manipulating the scene 
 */
function scene(videoId, safeAreaId) {
    const self = {
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
        setVideoIndexZ: function(z) {
            this.videoElement.style.z = z;
        }
    }

    return self;
}

/**
 * 
 * @param {object} adObject: display ad object parsed from JSON string following the custom project format
 * @returns {object}: element - HTML-element holding the created ad; 
 *                    type - type of the object as string; 
 *                    width - width of the ad (relevant only for L-banners)
 */
function createAd(adObject) {
    let element = document.createElement("div");
    element.id = adObject.type + "-div";
    element.style.position = "absolute";
    if (adObject.type === "banner") {
        element.style.width = adObject.props.width;
        element.style.height = adObject.props.height;
        element.style.left = adObject.props.left;
        element.style.top = adObject.props.top;
        element.style.background = adObject.props.background_color;
    } else if (adObject.type === "l-banner") {
        element.style.width = "1280px";
        element.style.height = "720px";
        element.style.background = adObject.props.background_color;
        element.style.zIndex = "-10";
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
        } else {
            console.error(`Such container type does not exist: ${container.type}`);
        }
    });

    return {element: element, type: adObject.type, shift: adObject.props.width};
}

/**
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