import Container, {ContainerProps, ContainerType} from "./Container.interface";

export default interface SlideshowContainer extends Container {
    type: ContainerType.Slideshow;
    props: SlideshowContainerProps;
}

export interface SlideshowContainerProps extends ContainerProps {
    images?: string[];
    nextImageButton?: string; // reg, green, blue, yellow
}