import Container, {ContainerProps, ContainerType} from "./Container.interface";

export default interface TextContainer extends Container {
    type: ContainerType.Text;
    props: TextContainerProps;
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