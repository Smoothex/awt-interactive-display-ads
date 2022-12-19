import Container, {ContainerProps, ContainerType} from "./Container";

export default class TextContainer extends Container {
    constructor(key: string, props: TextContainerProps) {
        super(key, ContainerType.Text, props);
    }
}

export interface TextContainerProps extends ContainerProps {
    color?: string;
    textAlign?: string; // center, left, right
    fontStyle?: string; // normal, italic
    fontWeight?: string; // normal, bold
    fontSize?: string; // 14px, 30px, 40px
}