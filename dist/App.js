(function () {
    'use strict';

    var global = window;

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var Main;
    (function (Main) {
        var Game = /** @class */ (function (_super) {
            __extends(Game, _super);
            function Game() {
                var _this = this;
                // default renderer
                var renderer = Phaser.AUTO;
                // init game
                _this = _super.call(this, {
                    type: renderer,
                    parent: "game_content",
                    width: 800,
                    height: 600,
                    title: "Maintainable Game",
                }) || this;
                // states
                _this.scene.add("Boot", Main.Boot);
                _this.scene.add("Preloader", Main.Preloader);
                _this.scene.add("Menu", Main.Menu);
                // start
                _this.scene.start("Boot");
                return _this;
            }
            return Game;
        }(Phaser.Game));
        Main.Game = Game;
    })(Main || (Main = {}));

}());
//# sourceMappingURL=App.js.map
