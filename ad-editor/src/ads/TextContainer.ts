import Container, {ContainerProps, ContainerType} from "./Container";

export default class TextContainer extends Container {
    constructor(key: string, props: TextContainerProps) {
        super(key, ContainerType.Text, props);
    }
}

export interface TextContainerProps extends ContainerProps {
    text?: string;
    color?: string;
    textAlign?: string; // center, left, right
    /**
     * Font Family examples:
     *  "Times New Roman", Times, serif;
     *  Arial, Helvetica, sans-serif;
     *  "Lucida Console", "Courier New", monospace;
     */
    fontFamily?: string;
    fontStyle?: string; // normal, italic
    fontWeight?: string; // normal, bold
    fontSize?: string; // 14px, 30px, 40px
}