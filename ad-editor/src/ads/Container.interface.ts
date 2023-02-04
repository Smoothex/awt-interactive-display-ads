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

    //-- TextContainer Props
    text?: string;
    textAlign?: "left" | "center" | "right";
    fontWeight?: "normal" | "bold";
    fontStyle?: "normal" | "italic"
    textDecoration?: "none" | "underline"
    fontFamily?: string;
    fontSize?: string; // 16px, 32px, 48px
    color?: string;

    //-- ImageContainer Props
    image?: string;

    //-- SlideshowContainer Props
    images?: string[];
    nextImageButton?: string; // reg, green, blue, yellow
}