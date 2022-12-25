import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Ad, {AdProps, AdType} from "../../ads/Ad.interface";

interface AdsState {
    ads: Ad[],
}

const initialState = {
    ads: []
} as AdsState

const adSlice = createSlice({
    name: "ad",
    initialState,
    reducers: {
        createAdTemplate: (state, action: PayloadAction<{name: string, type: AdType}>) => {
            const key: string = new Date().getTime().toString();
            const name: string = action.payload.name;
            const type: AdType = action.payload.type;
            const props: AdProps = {
                width: "640px",
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
        },
        createAdInstance: (state, action: PayloadAction<{name: string, adTemplateKey: string}>) => {
            const adTemplateKey = action.payload.adTemplateKey;
            const adTemplate = state.ads.find((ad) => ad.key === adTemplateKey);
            if(adTemplate === undefined) {
                return;
            }
            const strNewKey: string = new Date().getTime().toString();
            const strNewName: string = action.payload.name;

            const adInstance = structuredClone(adTemplate);
            adInstance.key = strNewKey;
            adInstance.name = strNewName;
            adInstance.isTemplate = false;
        },
        removeAd: (state, action: PayloadAction<{ key: string }>) => {
            const adKey: string = action.payload.key;
            state.ads = state.ads.filter((ad) => ad.key !== adKey)
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
        }
    }
});

export const {createAdTemplate, removeAd, downloadAdAsJson} = adSlice.actions;

export default adSlice.reducer;
