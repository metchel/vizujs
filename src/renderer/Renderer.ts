import { Node, NodeType } from '../ui/node/Node';

export abstract class Renderer {

    // Take in a UI Node, and render it into the output (string, HTML element)
    render(node: Node): void {
        switch(node.type) {
            case NodeType.ROOT:
                this.renderRoot(node);
                break;
            case NodeType.CONTAINER:
                this.renderContainer(node);
                break;
            case NodeType.CIRCLE:
                this.renderCircle(node);
                break;
            case NodeType.RECTANGLE:
                this.renderRectangle(node);
                break;
            case NodeType.LINE:
                this.renderLine(node);
                break;
            case NodeType.TEXT:
                this.renderText(node);
                break;
            default:
                break;
        }
    }

    abstract renderRoot(node: Node): void;
    abstract renderContainer(node: Node): void;
    abstract renderCircle(node: Node): void;
    abstract renderRectangle(node: Node): void;
    abstract renderLine(node: Node): void;
    abstract renderText(node: Node): void;
}