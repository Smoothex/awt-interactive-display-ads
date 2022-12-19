import Container, {ContainerProps, ContainerType} from "./Container";

export default class ImageContainer extends Container {
    constructor(key: string, props: ImageContainerProps) {
        super(key, ContainerType.Image, props);
    }
}

export interface ImageContainerProps extends ContainerProps {
    image?: string;
}