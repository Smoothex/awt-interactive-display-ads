import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
  Update
} from "@reduxjs/toolkit";

import Ad, {
  AdType
} from "../../ads/Ad.interface";

import {v4 as uuidv4} from 'uuid';

import Container, {
  ContainerType
} from "../../ads/Container.interface";

import AdContainer from "../../ads/AdContainer.interface";

const adsAdapter = createEntityAdapter<Ad>({
  selectId: (ad: Ad) => ad.key,
  sortComparer: (a: Ad, b: Ad) => a.name.localeCompare(b.name),
});

const containersAdapter = createEntityAdapter<Container>({
  selectId: (container: Container) => container.key,
});

const adContainerAdapter = createEntityAdapter<AdContainer>({
  selectId: (adContainer: AdContainer) => adContainer.key,
});

interface AdsState {
  ads: EntityState<Ad>,
  containers: EntityState<Container>,
  adContainerTuples: EntityState<AdContainer>,
}

const initialState: AdsState = {
  ads: adsAdapter.getInitialState(),
  containers: containersAdapter.getInitialState(),
  adContainerTuples: adContainerAdapter.getInitialState(),
}

const adSlice = createSlice({
  name: "ad",
  initialState,
  reducers: {
    createAdTemplate: (state, action: PayloadAction<{ name: string, type: AdType }>) => {
      const ad = {
        key: uuidv4(),
        name: action.payload.name,
        type: action.payload.type,
        props: action.payload.type === AdType.StandardBanner
            ? {
              width: 640,
              height: 120,
              top: 540,
              left: 320,
              backgroundColor: "#ffffff",
            }
            : {
              width: 640,
              height: 360,
              top: 0,
              left: 640,
              backgroundColor: "#ffffff",
            },
        isTemplate: true
      }
      adsAdapter.addOne(state.ads, ad);
    },

    createAdInstance: (state, action: PayloadAction<{ name: string, adTemplateKey: string }>) => {
      //-- Get the ad template
      const adTemplate: Ad | undefined = state.ads.entities[action.payload.adTemplateKey];
      if (adTemplate === undefined) return;

      //-- Create a copy of the ad template and add it to the list with ads
      const adInstance = JSON.parse(JSON.stringify(adTemplate));
      adInstance.key = uuidv4();
      adInstance.name = action.payload.name;
      adInstance.isTemplate = false;
      adsAdapter.addOne(state.ads, adInstance);

      //-- Create a copy of each child and add it to the list with containers
      for (let key in state.adContainerTuples.entities) {
        let adContainerTuple = state.adContainerTuples.entities[key];
        if (adContainerTuple === undefined) continue;
        if (adContainerTuple.adKey !== adTemplate.key) continue;

        //-- The adContainerTuple contains a child of adTemplate
        const childContainer = state.containers.entities[adContainerTuple.containerKey];
        if (childContainer === undefined) continue;

        //-- Copy the child container and add it to the list with containers
        const copiedContainer = JSON.parse(JSON.stringify(childContainer));
        copiedContainer.key = uuidv4();
        containersAdapter.addOne(state.containers, copiedContainer);

        //-- Create the relation between the ad instance and the copied container
        adContainerAdapter.addOne(state.adContainerTuples, {
          key: uuidv4(),
          adKey: adInstance.key,
          containerKey: copiedContainer.key
        });
      }
    },

    removeAd: (state, action: PayloadAction<{ key: string }>) => {
      //-- Get the ids of all containers and all relation, which should also be removed
      const containerIds = [];
      const tupleIds = [];
      for (let key in state.adContainerTuples.entities) {
        let adContainerTuple = state.adContainerTuples.entities[key];
        if (adContainerTuple === undefined) continue;
        if (adContainerTuple.adKey !== action.payload.key) continue;

        //-- The adContainerTuple contains a child of the ad, which should be removed
        containerIds.push(adContainerTuple.containerKey);
        tupleIds.push(adContainerTuple.key);
      }

      //-- Remove the relations, containers and the ad
      adContainerAdapter.removeMany(state.adContainerTuples, tupleIds);
      containersAdapter.removeMany(state.containers, containerIds);
      adsAdapter.removeOne(state.ads, action.payload.key);
    },

    downloadAdAsJson: (state, action: PayloadAction<{ key: string }>) => {
      //-- Get the ad
      const ad = state.ads.entities[action.payload.key];
      if (ad === undefined) return;

      //-- Get the containers
      const containerIds = [];
      for (let key in state.adContainerTuples.entities) {
        let adContainerTuple = state.adContainerTuples.entities[key];
        if (adContainerTuple === undefined) continue;
        if (adContainerTuple.adKey !== action.payload.key) continue;

        //-- The adContainerTuple contains a child of the ad, which should be removed
        containerIds.push(adContainerTuple.containerKey);
      }

      //-- Create a copy of the ad
      const adCopy = JSON.parse(JSON.stringify(ad));

      //-- Create copies of the children and add them as children of the ad copy
      adCopy.props.children = containerIds
          .map(containerId => state.containers.entities[containerId])
          .filter(container => container !== undefined)
          .map(container => JSON.parse(JSON.stringify(container)));

      let strData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(adCopy, null, 2));
      let xDownloadAnchor = document.createElement('a');
      xDownloadAnchor.setAttribute("href", strData);
      xDownloadAnchor.setAttribute("download", adCopy.name + ".json");
      document.body.appendChild(xDownloadAnchor); // required for firefox
      xDownloadAnchor.click();
      xDownloadAnchor.remove();
    },

    updateAd: (state, action: PayloadAction<Update<Ad>>) => {
      adsAdapter.updateOne(state.ads, action.payload);
    },

    createContainer: (state, action: PayloadAction<{ parentAdKey: string, containerType: ContainerType }>) => {
      //-- Create the new container
      const container = {
        key: uuidv4(),
        type: action.payload.containerType,
        props: {
          width: 100,
          height: 100,
          top: 0,
          left: 0,
        }
      }

      if(action.payload.containerType === ContainerType.Text) {
        const textProps = {
          textAlign: "left",
          fontWeight: "normal",
          fontStyle: "normal",
          textDecoration: "none",
          fontFamily: "Helvetica, sans-serif",
          fontSize: "16px",
          color: "#000000",
        }
        container.props = { ...container.props, ...textProps}
      }

      if(action.payload.containerType === ContainerType.Slideshow) {
        const slideshowProps = {
          nextImageButton: "red"
        }
        container.props = { ...container.props, ...slideshowProps}
      }

      //-- Add the container to the state
      containersAdapter.addOne(state.containers, container);

      //-- Create the relation between the ad and the container
      adContainerAdapter.addOne(state.adContainerTuples, {
        key: uuidv4(),
        adKey: action.payload.parentAdKey,
        containerKey: container.key
      });

      //-- Get the parent ad
      const parentAd = state.ads.entities[action.payload.parentAdKey];
      if (parentAd === undefined) return;

      //-- Correct the properties for standard banners
      if (parentAd.type === AdType.StandardBanner) {
        container.props.width = parentAd.props.width > 100 ? 100 : parentAd.props.width;
        container.props.top = parentAd.props.top;
        container.props.left = parentAd.props.left;
      }
    },

    removeContainer: (state, action: PayloadAction<{ parentAdKey: string, containerKey: string }>) => {
      //-- Get all tuples that contain the input container key
      const tuples = [];
      for (const key in state.adContainerTuples.entities) {
        const adContainerTuple = state.adContainerTuples.entities[key];
        if (adContainerTuple === undefined) continue;
        if (adContainerTuple.containerKey !== action.payload.containerKey) continue;
        tuples.push(adContainerTuple.key);
      }

      //-- Remove the tuples that contain the input container key
      adContainerAdapter.removeMany(state.adContainerTuples, tuples);

      //-- Remove the container
      containersAdapter.removeOne(state.containers, action.payload.containerKey);
    },

    updateContainer: (state, action: PayloadAction<Update<Container>>) => {
      containersAdapter.updateOne(state.containers, action.payload);
    },
  }
});

export const {
  selectById: selectAdById,
  selectIds: selectAdIds,
  selectEntities: selectAdEntities,
  selectAll: selectAllAds,
  selectTotal: selectTotalAds,
} = adsAdapter.getSelectors();

export const {
  selectById: selectContainerById,
  selectIds: selectContainerIds,
  selectEntities: selectContainerEntities,
  selectAll: selectAllContainers,
  selectTotal: selectTotalContainers,
} = containersAdapter.getSelectors();

export const {
  selectById: selectAdContainerTupleById,
  selectIds: selectAdContainerTupleIds,
  selectEntities: selectAdContainerTupleEntities,
  selectAll: selectAllAdContainerTuples,
  selectTotal: selectTotalAdContainerTuple,
} = adContainerAdapter.getSelectors();

export const {
  createAdTemplate,
  createAdInstance,
  removeAd,
  downloadAdAsJson,
  updateAd,
  createContainer,
  removeContainer,
  updateContainer,
} = adSlice.actions;

export default adSlice.reducer;
