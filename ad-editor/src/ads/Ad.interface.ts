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
    width: number;
    height: number;
    top: number;
    left: number;
    backgroundColor?: string;
}