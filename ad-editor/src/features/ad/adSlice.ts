import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Ad, {AdProps, AdType} from "../../ads/Ad";

interface AdsState {
    ads: Ad[]
}

const initialState = {
    ads: []
} as AdsState

const adSlice = createSlice({
    name: "ad",
    initialState,
    reducers: {
        createAd: (state, action: PayloadAction<{type: AdType}>) => {
            const key: string = new Date().getTime().toString();
            const type: AdType = action.payload.type;
            const props: AdProps = {
                width: "640px",
                children: [],
            };
            const ad = new Ad(key, type, props);
            state.ads.push(ad);
        },
        removeAd: (state, action: PayloadAction<Ad>) => {
            const adKey: string = action.payload.getKey();
            state.ads = state.ads.filter((ad) => ad.getKey() !== adKey)
        },
        clearAds: (state) => {
            state.ads = [];
        }
    }
});

export const {createAd, removeAd, clearAds} = adSlice.actions;

export default adSlice.reducer;