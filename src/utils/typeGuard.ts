const KIND_SQUARE = "square";
const KIND_RECT = "rectangle";
const KIND_CIRCLE = "circle";

interface Square {
    kind: typeof KIND_SQUARE;
    size: number;
}
interface Rectangle {
    kind: typeof KIND_RECT;
    width: number;
    height: number;
}
interface Circle {
    kind: typeof KIND_CIRCLE;
    radius: number;
}

type Shape = Square | Rectangle | Circle;

const a = area({ kind: KIND_RECT, width: 5, height: 10 });
console.log({ a });

function area(s: Shape) {
    switch (s.kind) {
        case KIND_SQUARE: return s.size * s.size;
        case KIND_RECT: return s.height * s.width;
        case KIND_CIRCLE: return Math.PI * s.radius ** 2;
    }
}