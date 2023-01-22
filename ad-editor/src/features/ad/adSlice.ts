import {
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";

import Ad,
{
  AdProps,
  AdType
} from "../../ads/Ad.interface";

import {
  v4 as uuidv4
} from 'uuid';

import Container, {
  ContainerProps,
  ContainerType
} from "../../ads/Container.interface";

interface AdsState {
  ads: Ad[],
  lastCreatedAdKey: string,
  lastRemovedAdKey: string,
  lastCreatedContainerKey: string,
  lastRemovedContainerKey: string,
}

const initialState: AdsState = {
  ads: [],
  lastCreatedAdKey: "",
  lastRemovedAdKey: "",
  lastCreatedContainerKey: "",
  lastRemovedContainerKey: "",
}

const adSlice = createSlice({
  name: "ad",
  initialState,
  reducers: {
    createAdTemplate: (state, action: PayloadAction<{ name: string, type: AdType }>) => {
      const key: string = uuidv4();
      const name: string = action.payload.name;
      const type: AdType = action.payload.type;
      const props: AdProps = {
        width: 640,
        height: type === AdType.StandardBanner ? 120 : 360,
        top: type === AdType.StandardBanner ? 540 : 0,
        left: type === AdType.StandardBanner ? 320 : 640,
        backgroundColor: "#ffffff",
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
      state.ads = state.ads.sort(function (a, b) {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      state.lastCreatedAdKey = ad.key;
    },
    createAdInstance: (state, action: PayloadAction<{ name: string, adTemplateKey: string }>) => {
      const adTemplateKey = action.payload.adTemplateKey;
      const adTemplate = state.ads.find((ad) => ad.key === adTemplateKey);
      if (adTemplate === undefined) {
        return;
      }
      const strNewKey: string = uuidv4();
      const strNewName: string = action.payload.name;

      //-- Create a deep clone of the ad template
      const adInstance = JSON.parse(JSON.stringify(adTemplate));
      adInstance.key = strNewKey;
      adInstance.name = strNewName;
      adInstance.isTemplate = false;
      adInstance.props.children.forEach((current: Container) => current.key = uuidv4());
      state.ads.push(adInstance);
      state.ads = state.ads.sort(function (a, b) {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
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
      if (ad === undefined) {
        return;
      }
      let strData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ad, null, 2));
      let xDownloadAnchor = document.createElement('a');
      xDownloadAnchor.setAttribute("href", strData);
      xDownloadAnchor.setAttribute("download", ad.name + ".json");
      document.body.appendChild(xDownloadAnchor); // required for firefox
      xDownloadAnchor.click();
      xDownloadAnchor.remove();
    },
    updateAdSize: (state, action: PayloadAction<{ key: string, width: number, height: number }>) => {
      const strAdKey: string = action.payload.key;
      const ad = state.ads.find((ad) => ad.key === strAdKey);
      if (ad === undefined) {
        return;
      }
      ad.props.width = action.payload.width;
      ad.props.height = action.payload.height;
    },
    updateAdPosition: (state, action: PayloadAction<{ key: string, top: number, left: number }>) => {
      const strAdKey: string = action.payload.key;
      const ad = state.ads.find((ad) => ad.key === strAdKey);
      if (ad === undefined) {
        return;
      }
      ad.props.top = action.payload.top;
      ad.props.left = action.payload.left;
    },
    updateAdBackgroundColor: (state, action: PayloadAction<{ key: string, backgroundColor: string }>) => {
      const strAdKey: string = action.payload.key;
      const ad = state.ads.find((ad) => ad.key === strAdKey);
      if (ad === undefined) {
        return;
      }
      ad.props.backgroundColor = action.payload.backgroundColor;
    },
    createContainer: (state, action: PayloadAction<{ parentAdKey: string, containerType: ContainerType }>) => {
      //-- Create the new container
      const key: string = uuidv4();
      const type: ContainerType = action.payload.containerType;
      const props: ContainerProps = {
        width: 100,
        height: 100,
        top: 0,
        left: 0,
        backgroundColor: "#ffffff"
      }
      const container = {
        key: key,
        type: type,
        props: props
      }
      //-- Get the parent ad and ad the container inside it
      const parentAdKey: string = action.payload.parentAdKey;
      const parentAd = state.ads.find((ad) => ad.key === parentAdKey);
      if (parentAd === undefined) {
        return;
      }
      parentAd.props.children.push(container);

      //-- Correct the properties for standard banners
      if(parentAd.type === AdType.StandardBanner) {
        container.props.width = parentAd.props.width > 100 ? 100 : parentAd.props.width;
        container.props.top = parentAd.props.top;
        container.props.left = parentAd.props.left;
      }

      //-- Fire an event that a new container was created
      state.lastCreatedContainerKey = container.key;
    },
    removeContainer: (state, action: PayloadAction<{ parentAdKey: string, containerKey: string }>) => {
      //-- Get the parent ad and ad the container inside it
      const parentAd = state.ads.find((ad) => ad.key === action.payload.parentAdKey);
      if (parentAd === undefined) {
        return;
      }
      const containerKey: string = action.payload.containerKey;
      //-- Remove the container from it
      parentAd.props.children = parentAd.props.children.filter(container => container.key !== containerKey);
      //-- Fire an event that a new container was removed
      state.lastRemovedContainerKey = containerKey;
    },
    updateContainerSize: (state, action: PayloadAction<{ parentAdKey: string, containerKey: string, width: number, height: number }>) => {
      //-- Get the parent ad
      const parentAd = state.ads.find((ad) => ad.key === action.payload.parentAdKey);
      if (parentAd === undefined) {
        return;
      }
      //-- Get the container from the ad
      const strContainerKey: string = action.payload.containerKey;
      const container = parentAd.props.children.find(cont => cont.key === strContainerKey);
      if (container === undefined) {
        return;
      }
      //-- Update the size of the container
      container.props.width = action.payload.width;
      container.props.height = action.payload.height;
    },
    updateContainerPosition: (state, action: PayloadAction<{ parentAdKey: string, containerKey: string, top: number, left: number }>) => {
      //-- Get the parent ad
      const parentAd = state.ads.find((ad) => ad.key === action.payload.parentAdKey);
      if (parentAd === undefined) {
        return;
      }
      //-- Get the container from the ad
      const strContainerKey: string = action.payload.containerKey;
      const container = parentAd.props.children.find(cont => cont.key === strContainerKey);
      if (container === undefined) {
        return;
      }
      container.props.top = action.payload.top;
      container.props.left = action.payload.left;
    },
    updateContainerBackgroundColor: (state, action: PayloadAction<{ parentAdKey: string, containerKey: string, backgroundColor: string}>) => {
      //-- Get the parent ad
      const parentAd = state.ads.find((ad) => ad.key === action.payload.parentAdKey);
      if (parentAd === undefined) {
        return;
      }
      //-- Get the container from the ad
      const strContainerKey: string = action.payload.containerKey;
      const container = parentAd.props.children.find(cont => cont.key === strContainerKey);
      if (container === undefined) {
        return;
      }
      container.props.backgroundColor = action.payload.backgroundColor;
    },
  }
});

export const {
  createAdTemplate,
  createAdInstance,
  removeAd,
  downloadAdAsJson,
  updateAdSize,
  updateAdPosition,
  updateAdBackgroundColor,
  createContainer,
  removeContainer,
  updateContainerSize,
  updateContainerPosition,
  updateContainerBackgroundColor,
} = adSlice.actions;

export default adSlice.reducer;
