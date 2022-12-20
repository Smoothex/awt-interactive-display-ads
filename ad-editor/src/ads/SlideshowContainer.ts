import Container, {ContainerProps, ContainerType} from "./Container";

export default class SlideshowContainer extends Container {
    constructor(key: string, props: SlideshowContainerProps) {
        super(key, ContainerType.Image, props);
    }
}

export interface SlideshowContainerProps extends ContainerProps {
    images?: string[];
    nextImageButton?: string; // reg, green, blue, yellow
}