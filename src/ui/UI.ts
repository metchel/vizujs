import { Node, NodeType } from './node/Node';
import { Renderer } from '../renderer/Renderer';

export class UI {

    root: Node;

    constructor(width: number, height: number) {
        this.root = new Node(0, NodeType.ROOT, [], false, {
            x: 0, y: 0,
            width: width,
            height: height
        });
    }
    
    draw(renderer: Renderer): string {

        let output: string = "";
        let stack: Array<Node> = [ this.root ];

        while (stack.length > 0) {

            let node = stack.pop()!

            if (!node) {
                continue;
            }

            // Push the closing node if this isn't one.
            if (!node.close) {
                stack.push(
                    new Node(node.id, node.type, [], true, {})
                );
            }

            node.children
                .reverse()
                    .forEach((child: Node) => stack.push(child));

            renderer.render(node);
            output += node.render;
        }

        return output;
    }
}