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
    width: number;
    height: number;
    top: number;
    left: number;
    backgroundColor?: string;
}