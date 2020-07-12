export interface Attributes {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    color?: string,
    border?: string,
    value?: string,
    other?: Map<string, string>,
}

export enum NodeType {
    ROOT,
    CONTAINER,
    CIRCLE,
    SQUARE,
    RECTANGLE,
    LINE,
    ARROWHEAD,
    TEXT
}

export class Node {
    id: number;
    type: NodeType;
    children: Array<Node>;
    close: boolean;
    attributes: Attributes;
    value: string;
    render: any;

    constructor(
            id: number,
            type: NodeType, 
            children: Array<Node> = [], 
            close: boolean = false, 
            attributes: Attributes,
            value: string = "",
            render: any = null
        ) {
        this.id = id;
        this.type = type;
        this.children = children;
        this.close = close;
        this.attributes = attributes;
        this.value = value;
        this.render = render
    }

    addChild(child: Node) {
        this.children.push(child);
    }
}