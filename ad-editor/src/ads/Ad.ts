import Container from "./Container";

export default class Ad {

    /**
     * Unique identifier of the ad.
     * @private
     */
    private readonly key: string;

    /**
     * Type of the ad. Two options are available: "l-banner" or "standard-banner".
     * @private
     */
    private readonly type: AdType;

    /**
     * Properties of the ad.
     * @private
     */
    private props: AdProps;

    constructor(key: string, type: AdType, props: AdProps) {
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

    getHeight(): string | undefined {
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

    getChildren(): object[] {
        return this.props.children;
    }

    addChild(child: Container): void {
        this.props.children.push(child);
    }

    removeChild(toRemoveChild: Container): void {
        this.props.children = this.props.children.filter(currentChild => currentChild.getKey() !== toRemoveChild.getKey());
    }
}

export enum AdType {
    LBanner = "l-banner",
    StandardBanner = "standard-banner",
}

export interface AdProps {
    width: string;
    height?: string;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    backgroundColor?: string;
    children: Container[];
}