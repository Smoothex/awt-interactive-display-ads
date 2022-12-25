export default interface Container {
    key: string;
    type: ContainerType;
    props: ContainerProps;
}

export enum ContainerType {
    Image = "image-container",
    Text = "text-container",
    Slideshow = "slideshow-container"
}

export interface ContainerProps {
    width: string;
    height: string;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    backgroundColor?: string;
}