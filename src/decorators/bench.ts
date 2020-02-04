// todo: написать декоратор класса сцены, для простого включения-отключения отладчика
// https://habr.com/ru/company/docsvision/blog/310870/

import GLBenchClass from 'gl-bench/dist/gl-bench.module'
export default function benchmark(target: any) {
     // save a reference to the original constructor
    var original = target;
    var bench;

    function create(params:type) {
        if(original.game.context instanceof WebGLRenderingContext){
            bench = new GLBenchClass(original.game.context);
            console.log('Моник вкл')
        }else{
            // todo: добавить монитор для канваса
            console.log('Моник выкл')
        }
    }
    
    function update(){
        this.bench.begin();
        // some bottleneck
        // console.log({time, delta})
        this.bench.end();
        this.bench.nextFrame(time);
    }
   
    // a utility function to generate instances of a class
    function construct(constructor, args) {
      var c : any = function () {
        return constructor.apply(this, args);
      }
      c.prototype = constructor.prototype;
      return new c();
    }
   
    // the new constructor behaviour
    var f : any = function (...args) {
      console.log("New: " + original.name);
      return construct(original, args);
    }
   
    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;
   
    // return new constructor (will override original)
    return f;
}
// export default function benchmark(target: any) {
 
//     // save a reference to the original constructor
//     var original = target;
   
//     // a utility function to generate instances of a class
//     function construct(constructor, args) {
//       var c : any = function () {
//         return constructor.apply(this, args);
//       }
//       c.prototype = constructor.prototype;
//       return new c();
//     }
   
//     // the new constructor behaviour
//     var f : any = function (...args) {
//       console.log("New: " + original.name);
//       return construct(original, args);
//     }
   
//     // copy prototype so intanceof operator still works
//     f.prototype = original.prototype;
   
//     // return new constructor (will override original)
//     return f;
// }