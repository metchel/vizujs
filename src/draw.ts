import { UI } from './ui/UI';
import { Node, NodeType } from './ui/node/Node';
import { SVGRenderer } from './renderer/svgrenderer/SVGRenderer';

export function drawDefault(o: any, options: DrawOptions) {

    if (o instanceof Array) {
        return drawArray(o, options);
    } else if (o instanceof Set) {
        return drawArray(Array.from(o), options);
    } else if (o instanceof Map) {
        return drawMap(o, options);
    } else {
        return drawObject(o, options);
    }
}

export interface DrawOptions {
    x: number,
    y: number,
    width: number;
    height: number,
    scale?: number,
    padding?: number,
    tick?: number,
    fill?: string,
    stroke?: string,
    stroke2?: string,
    fontColor?: string,
    fontSize?: string,
    highlights?: Map<string, string>
}

export const DEFAULT_DRAW_OPTIONS = {
    x: 0,
    y: 0,
    width: 2048,
    height: 1024,
    scale: 1,
    padding: 5,
    tick: 1000,
    fill: "black",
    stroke: "none",
    stroke2: "blue",
    fontColor: "white",
    fontSize: "24",
    highlights: new Map()
}

function getObjectValue (o: any, p: any): any {
    return o[p];
}

function drawArray(a: Array<any>, options: DrawOptions = DEFAULT_DRAW_OPTIONS): string {

    let ui = new UI(options.width, options.height);
    let counter = 1;

    let scale = options.scale!;
    let padding = options.padding!
    let fontColor = options.fontColor!;
    let fontSize = options.fontSize!;

    let x = padding, y = padding;

    a.forEach((element, index) => {

        let isHighlighted = options.highlights && options.highlights.has(index.toString());

        let width = 100 * scale, height = 100 * scale;

        let uiNode = new Node(counter++, NodeType.CONTAINER, [  

            new Node(counter++, NodeType.RECTANGLE, [], false, {
                x: x, y: y,
                width: width,
                height: height,
                color: isHighlighted ? options.highlights?.get(index.toString()) : options.fill,
                border: options.stroke,
                other: new Map<string, string>([
                    ["stroke-width", "1"]
                ]),
            }),

            new Node(counter++, NodeType.TEXT, [], false, {
                x: x + padding, 
                y: y + height - padding,
                color: fontColor, 
                value: index.toString(),
                other: new Map<string, string>([
                    ["font-size", Math.floor(( Number(fontSize) / 2 )).toString()]
                ])
            }),

            new Node(counter++, NodeType.TEXT, [], false, {
                x: x + width / 2, 
                y: y + height / 2,
                color: fontColor,
                value: element.toString(),
                other: new Map<string, string>([
                    ["text-anchor", "middle"],
                    ["font-size", fontSize]
                ]),
            }),

        ], false, { x: x, y: y })

        ui.root.addChild(uiNode);

        x += width;

    });

    let renderer = new SVGRenderer();
    options.highlights?.clear();
    return ui.draw(renderer);
}

function drawMap(o: Map<any, any>, options: DrawOptions) {

    let ui = new UI(options.width, options.height);
    let counter = 1;

    let scale = options.scale!;
    let padding = options.padding!
    let fontColor = options.fontColor!;
    let fontSize = options.fontSize!;

    let x = padding, y = padding;

    o.forEach((element: any, p: string) => {

        if (typeof element === "function") {
            return;
        }

        let isHighlighted = options.highlights && options.highlights.has(p);

        let width = 2 * 100 * scale, height = 100 * scale;

        let keyContainer = new Node(counter++, NodeType.RECTANGLE, [], false, {
            x: x, y: y,
            width: width,
            height: height,
            color: isHighlighted ? options.highlights?.get(p) : options.fill,
            border: options.stroke,
            other: new Map<string, string>([
                ["stroke-width", "1"]
            ]),
        });

        let key = new Node(counter++, NodeType.TEXT, [], false, {
            x: x + width / 2, 
            y: y + height / 2,
            color: fontColor,
            value: p,
            other: new Map<string, string>([
                ["text-anchor", "middle"],
                ["font-size", fontSize]
            ]),
        });

        x += width;

        let valueContainer = new Node(counter++, NodeType.RECTANGLE, [], false, {
            x: x, y: y,
            width: 2 * width,
            height: height,
            color: isHighlighted ? options.highlights?.get(p) : options.fill,
            border: options.stroke,
            other: new Map<string, string>([
                ["stroke-width", "1"]
            ]),
        });

        let value = new Node(counter++, NodeType.TEXT, [], false, {
            x: x + width, 
            y: y + height / 2,
            color: fontColor,
            value: escapeHtml(element.toString()),
            other: new Map<string, string>([
                ["text-anchor", "middle"],
                ["font-size", fontSize]
            ]),
        });

        let uiNode = new Node(counter++, NodeType.CONTAINER, [  
            keyContainer, key
        ], false, { x: x, y: y });

        uiNode.addChild(valueContainer);
        uiNode.addChild(value);

        ui.root.addChild(uiNode);

        x = padding;
        y += height;
    });

    let renderer = new SVGRenderer();
    options.highlights?.clear();
    return ui.draw(renderer);
}

function drawObject(o: object, options: DrawOptions) {

    let ui = new UI(options.width, options.height);
    let counter = 1;

    let scale = options.scale!;
    let padding = options.padding!
    let fontColor = options.fontColor!;
    let fontSize = options.fontSize!;

    let x = padding, y = padding;

    Object.keys(o).forEach((p: string) => {


        let element = getObjectValue(o, p);

        if (typeof element === "function") {
            return;
        }

        let isHighlighted = options.highlights && options.highlights.has(p);

        let width = 2 * 100 * scale, height = 100 * scale;

        let keyContainer = new Node(counter++, NodeType.RECTANGLE, [], false, {
            x: x, y: y,
            width: width,
            height: height,
            color: isHighlighted ? options.highlights?.get(p) : options.fill,
            border: options.stroke,
            other: new Map<string, string>([
                ["stroke-width", "1"]
            ]),
        });

        let key = new Node(counter++, NodeType.TEXT, [], false, {
            x: x + width / 2, 
            y: y + height / 2,
            color: fontColor,
            value: p,
            other: new Map<string, string>([
                ["text-anchor", "middle"],
                ["font-size", fontSize]
            ]),
        });

        x += width;

        let valueContainer = new Node(counter++, NodeType.RECTANGLE, [], false, {
            x: x, y: y,
            width: 2 * width,
            height: height,
            color: isHighlighted ? options.highlights?.get(p) : options.fill,
            border: options.stroke,
            other: new Map<string, string>([
                ["stroke-width", "1"]
            ]),
        });

        let value = new Node(counter++, NodeType.TEXT, [], false, {
            x: x + width, 
            y: y + height / 2,
            color: fontColor,
            value: element,
            other: new Map<string, string>([
                ["text-anchor", "middle"],
                ["font-size", fontSize]
            ]),
        });

        let uiNode = new Node(counter++, NodeType.CONTAINER, [  
            keyContainer, key
        ], false, { x: x, y: y });

        uiNode.addChild(valueContainer);
        uiNode.addChild(value);

        ui.root.addChild(uiNode);

        x = padding;
        y += height;
    });

    let renderer = new SVGRenderer();
    options.highlights?.clear();
    return ui.draw(renderer);
}

function escapeHtml(text: string) {
    var map: object = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m) { return getObjectValue(map, m); });
}
