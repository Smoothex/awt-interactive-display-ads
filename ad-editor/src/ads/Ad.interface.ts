import Container from "./Container.interface";

export default interface Ad {
    key: string;
    name: string;
    type: AdType;
    props: AdProps;
    isTemplate: boolean;
}

export enum AdType {
    LBanner = "l-banner",
    StandardBanner = "standard-banner",
}

export interface AdProps {
    width: string;
    height?: string;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    backgroundColor?: string;
    children: Container[];
}