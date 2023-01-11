import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Ad, {AdProps, AdType} from "../../ads/Ad.interface";
import {v4 as uuidv4} from 'uuid';

interface AdsState {
    ads: Ad[],
    /**
     * Key of the last created ad. It can be used to trigger callbacks when it changes.
     */
    lastCreatedAdKey: string,
    /**
     * Key of the last removed ad. It can be used to trigger callbacks when it changes.
     */
    lastRemovedAdKey: string,
}

const initialState: AdsState = {
    ads: [],
    lastCreatedAdKey: "",
    lastRemovedAdKey: "",
}

const adSlice = createSlice({
    name: "ad",
    initialState,
    reducers: {
        createAdTemplate: (state, action: PayloadAction<{name: string, type: AdType}>) => {
            const key: string = uuidv4();
            const name: string = action.payload.name;
            const type: AdType = action.payload.type;
            const props: AdProps = {
                width: 640,
                height: type === AdType.StandardBanner ? 120 : 360,
                top: type === AdType.StandardBanner ? 540 : 0,
                left: type === AdType.StandardBanner ? 320 : 640,
                children: [],
            };
            const ad = {
                key: key,
                name: name,
                type: type,
                props: props,
                isTemplate: true
            }
            state.ads.push(ad);
            state.ads = state.ads.sort(function(a, b){
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
            });
            state.lastCreatedAdKey = ad.key;
        },
        createAdInstance: (state, action: PayloadAction<{name: string, adTemplateKey: string}>) => {
            const adTemplateKey = action.payload.adTemplateKey;
            const adTemplate = state.ads.find((ad) => ad.key === adTemplateKey);
            if(adTemplate === undefined) {
                return;
            }
            const strNewKey: string = uuidv4();
            const strNewName: string = action.payload.name;

            //-- Create a deep clone of the ad template
            const adInstance = JSON.parse(JSON.stringify(adTemplate));
            adInstance.key = strNewKey;
            adInstance.name = strNewName;
            adInstance.isTemplate = false;
            state.ads.push(adInstance);
            state.ads = state.ads.sort(function(a, b){
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
            });
            state.lastCreatedAdKey = adInstance.key;
        },
        removeAd: (state, action: PayloadAction<{ key: string }>) => {
            const adKey: string = action.payload.key;
            state.ads = state.ads.filter((ad) => ad.key !== adKey)
            state.lastRemovedAdKey = adKey;
        },
        downloadAdAsJson: (state, action: PayloadAction<{ key: string }>) => {
            const strAdKey: string = action.payload.key;
            const ad = state.ads.find((ad) => ad.key === strAdKey);
            if(ad === undefined) {
                return;
            }
            let strData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ad, null, 2));
            let xDownloadAnchor = document.createElement('a');
            xDownloadAnchor.setAttribute("href",     strData);
            xDownloadAnchor.setAttribute("download", ad.name + ".json");
            document.body.appendChild(xDownloadAnchor); // required for firefox
            xDownloadAnchor.click();
            xDownloadAnchor.remove();
        },
        updateAdSize: (state, action: PayloadAction<{ key: string, width: number, height: number }>) => {
            const strAdKey: string = action.payload.key;
            const ad = state.ads.find((ad) => ad.key === strAdKey);
            if(ad === undefined) {
                return;
            }
            ad.props.width = action.payload.width;
            ad.props.height = action.payload.height;
            console.log("New width: " + ad.props.width + ", new height: " + ad.props.height);
        },
        updateAdPosition: (state, action: PayloadAction<{ key: string, top: number, left: number }>) => {
            const strAdKey: string = action.payload.key;
            const ad = state.ads.find((ad) => ad.key === strAdKey);
            if(ad === undefined) {
                return;
            }
            ad.props.top = action.payload.top;
            ad.props.left = action.payload.left;
            console.log("New top: " + ad.props.top + ", new left: " + ad.props.left);
        }
    }
});

export const {
    createAdTemplate,
    createAdInstance,
    removeAd,
    downloadAdAsJson,
    updateAdSize,
    updateAdPosition
} = adSlice.actions;

export default adSlice.reducer;
