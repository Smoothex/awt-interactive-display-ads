export default class Container {

    /**
     * Unique identifier of the container.
     * @private
     */
    private readonly key: string;

    /**
     * Type of the container. Two options are available: "image-container" and "text-container".
     * @private
     */
    private readonly type: ContainerType;

    /**
     * Properties of the container.
     * @private
     */
    protected props: ContainerProps;

    constructor(key: string, type: ContainerType, props: ContainerProps) {
        this.key = key;
        this.type = type;
        this.props = props;
    }

    getKey(): string {
        return this.key;
    }

    getType(): string {
        return this.type;
    }

    getWidth(): string {
        return this.props.width;
    }

    setWidth(width: string) {
        this.props.width = width;
    }

    getHeight(): string {
        return this.props.height;
    }

    setHeight(height: string) {
        this.props.height = height;
    }

    getTop(): number | undefined {
        return this.props.top;
    }

    setTop(top: number) {
        this.props.top = top;
    }

    getRight(): number | undefined {
        return this.props.right;
    }

    setRight(right: number) {
        this.props.right = right;
    }

    getBottom(): number | undefined {
        return this.props.bottom;
    }

    setBottom(bottom: number) {
        this.props.bottom = bottom;
    }

    getLeft(): number | undefined {
        return this.props.left;
    }

    setLeft(left: number) {
        this.props.left = left;
    }

    getBackgroundColor(): string | undefined {
        return this.props.backgroundColor
    }

    setBackgroundColor(backgroundColor: string) {
        this.props.backgroundColor = backgroundColor;
    }
}

export enum ContainerType {
    Image = "image-container",
    Text = "text-container"
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