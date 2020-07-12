import { Node } from '../../ui/node/Node';
import { Renderer } from '../Renderer';

export class SVGRenderer extends Renderer {

    private output: string;

    constructor() {
        super();
        this.output = "";
    }

    getOutput() {
        return this.output;
    }

    private renderHelper(node: Node, nodeTypeString: string): string {
        let attributes = node.attributes;
        let close = node.close;

        if (close) {
            return `</${nodeTypeString}>`;
        }

        let output = `<${nodeTypeString} `;

        if (attributes.x) {
            output += `x=${attributes.x} `;
        }

        if (attributes.y) {
            output += `y=${attributes.y} `;
        }

        if (attributes.width) {
            output += `width=${attributes.width} `;
        }

        if (attributes.height) {
            output += `height=${attributes.height} `;
        }

        if (attributes.color) {
            output += `fill=${attributes.color} `;
        }

        if (attributes.border) {
            output += `stroke=${attributes.border} `;
        }

        if (attributes.other) {
            attributes.other.forEach((v: any, k: any) => {
                output += `${k}=${v} `;
            });
        }

        output += ">";

        if (attributes.value) {
            output += attributes.value;
        }

        return output;
    }

    renderRoot(node: Node): void {
        node.render = this.renderHelper(node, "svg");
    }

    renderContainer(node: Node): void {
        node.render = this.renderHelper(node, "g");
    }

    renderCircle(node: Node): void {
        node.render = this.renderHelper(node, "circle");
    }

    renderRectangle(node: Node): void {
        node.render = this.renderHelper(node, `rect`);
    }

    renderLine(node: Node): void {
        node.render = this.renderHelper(node, "line");
    }

    renderText(node: Node): void {
        node.render = this.renderHelper(node, "text");
    }
}