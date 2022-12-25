import Container, {ContainerProps, ContainerType} from "./Container.interface";

export default interface ImageContainer extends Container {
    type: ContainerType.Image;
    props: ImageContainerProps;
}

export interface ImageContainerProps extends ContainerProps {
    image?: string;
}