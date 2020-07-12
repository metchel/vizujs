import { DrawOptions, drawDefault, DEFAULT_DRAW_OPTIONS } from './draw';

export function mount(
    a: any, 
    element: HTMLElement, 
    options: DrawOptions = DEFAULT_DRAW_OPTIONS, 
    draw: (o: any, options: DrawOptions) => string = drawDefault
    ): any {

    let tickDuration = options.tick || 0;

    let tick: () => number = (function() {
        let count = 0;
        return function() {
            return count++;
        }
    })();

    let print: (o: any, options: DrawOptions) => void = (function() {
        let last = "";
        return function(o: any, options: DrawOptions) {

            let render = draw(o, options);

            if (last === render) {
                return;
            }

            last = render;

            if (tickDuration > 0) {
                setTimeout(function() {
                    element.innerHTML = render;
                }, tick() * tickDuration);
            } else {
                element.innerHTML = render;
            }
        }
    })();

    print(a, options);

    const handler: ProxyHandler<any> = {
        get: function(target, p, reciever) {

            options.highlights?.set(p.toString(), "green");

            let ret = Reflect.get(target, p, reciever);

            if (target instanceof Set || target instanceof Map) {
                if (typeof ret === "function") {
                    ret = ret.bind(target);
                }
            }

            print(target, options);
            return ret;
        },
        set: function (obj: any, prop, value) {

            options.highlights?.set(prop.toString(), "blue");

            let ret = Reflect.set(obj, prop, value);

            print(obj, options);
            return ret;
        }
    }

    return new Proxy(a, handler);
}