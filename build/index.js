/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/home/filip/projects/2d3d/build";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game_base.ts":
/*!**************************!*\
  !*** ./src/game_base.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar GameBase = /** @class */ (function () {\n    function GameBase(width, height) {\n        this.lastUpdate = 0;\n        this.width = width;\n        this.height = height;\n        this.start();\n    }\n    GameBase.prototype.start = function () {\n        var _this = this;\n        var canvas = document.createElement(\"canvas\");\n        canvas.width = this.width;\n        canvas.height = this.height;\n        document.body.insertBefore(canvas, document.body.childNodes[0]);\n        var context = canvas.getContext(\"2d\");\n        if (!context) {\n            throw new Error;\n        }\n        this.context = context;\n        this.lastUpdate = Date.now();\n        //requestAnimationFrame(() => this.loop())\n        setInterval(function () { return _this.loop(); }, 0);\n    };\n    GameBase.prototype.loop = function () {\n        var currentTime = Date.now();\n        var deltaTime = currentTime - this.lastUpdate;\n        this.lastUpdate = currentTime;\n        this.update(deltaTime);\n        this.draw();\n        //requestAnimationFrame(() => this.loop())\n    };\n    return GameBase;\n}());\nexports.default = GameBase;\n\n\n//# sourceURL=webpack:///./src/game_base.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar game_base_1 = __webpack_require__(/*! ./game_base */ \"./src/game_base.ts\");\nvar viewer_1 = __webpack_require__(/*! ./viewer */ \"./src/viewer.ts\");\nvar world_1 = __webpack_require__(/*! ./world */ \"./src/world.ts\");\nvar Game = /** @class */ (function (_super) {\n    __extends(Game, _super);\n    function Game(width, height) {\n        var _this = _super.call(this, width, height) || this;\n        _this.world = new world_1.default();\n        _this.viewer = new viewer_1.default(_this.world, _this.context);\n        return _this;\n    }\n    Game.prototype.update = function (deltaTime) {\n        this.world.update(deltaTime);\n    };\n    Game.prototype.draw = function () {\n        this.viewer.draw();\n    };\n    return Game;\n}(game_base_1.default));\nfunction startGame() {\n    var game = new Game(500, 500);\n}\nwindow.onload = startGame;\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/viewer.ts":
/*!***********************!*\
  !*** ./src/viewer.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Viewer = /** @class */ (function () {\n    function Viewer(world, context) {\n        this.world = world;\n        this.context = context;\n    }\n    Viewer.prototype.draw = function () {\n        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);\n        var rays = 300;\n        var fov = 0.8;\n        for (var i = 0; i < rays; i++) {\n            var offset = i - rays / 2;\n            var angle = fov * offset / (rays / 2);\n            var columnPos = (i / rays) * this.canvasWidth();\n            this.drawColumn(angle, columnPos);\n        }\n    };\n    Viewer.prototype.drawColumn = function (angle, x) {\n        var dist = this.world.sendRay(this.world.getPlayerX(), this.world.getPlayerY(), this.world.playerRotation + angle);\n        var height = this.calculateWallHeight(dist);\n        var center = this.canvasHeight() / 2;\n        var y0 = center - height / 2;\n        var y1 = center + height / 2;\n        this.context.strokeStyle = \"#555555\";\n        this.context.beginPath();\n        this.context.moveTo(x, y0);\n        this.context.lineTo(x, y1);\n        this.context.stroke();\n        this.context.strokeStyle = \"#999999\";\n        this.context.beginPath();\n        this.context.moveTo(x, y1);\n        this.context.lineTo(x, this.context.canvas.height);\n        this.context.stroke();\n    };\n    Viewer.prototype.canvasWidth = function () {\n        return this.context.canvas.width;\n    };\n    Viewer.prototype.canvasHeight = function () {\n        return this.context.canvas.height;\n    };\n    Viewer.prototype.calculateWallHeight = function (dist) {\n        if (dist == -1)\n            return 0;\n        var height = 1000 - dist; // Math.pow(dist / 800, 10) / 20;\n        return Math.min(height, this.canvasHeight());\n    };\n    return Viewer;\n}());\nexports.default = Viewer;\n\n\n//# sourceURL=webpack:///./src/viewer.ts?");

/***/ }),

/***/ "./src/world.ts":
/*!**********************!*\
  !*** ./src/world.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar World = /** @class */ (function () {\n    function World() {\n        this.tileSize = 100;\n        this.forward = false;\n        this.backwards = false;\n        this.left = false;\n        this.right = false;\n        this.rotation_speed = 0.002;\n        this.walk_speed = 0.15;\n        this.playerX = 350;\n        this.playerY = 650;\n        this.playerRotation = Math.PI / 2;\n        this.setUpInputs();\n        this.createWalls();\n    }\n    World.prototype.getPlayerX = function () {\n        return this.playerX;\n    };\n    World.prototype.getPlayerY = function () {\n        return this.playerY;\n    };\n    World.prototype.createWalls = function () {\n        this.walls = [\n            [true, true, false, true, false, false, true],\n            [false, false, false, false, false, false, false],\n            [false, false, false, false, true, false, false],\n            [true, true, false, false, false, false, false],\n            [true, false, false, false, false, true, false],\n            [true, false, false, false, false, false, false],\n            [true, true, false, false, true, false, false],\n        ];\n    };\n    World.prototype.tileCountX = function () {\n        if (!this.walls)\n            return 0;\n        return this.walls[0].length;\n    };\n    World.prototype.tileCountY = function () {\n        return this.walls.length;\n    };\n    /**\n     * Checks if a given position is covered by a wall.\n     * @param x x coordinate to check.\n     * @param y y coordinate to check.\n     * @returns true if wall at position.\n     */\n    World.prototype.isWallAt = function (x, y) {\n        var tileX = Math.floor(x / this.tileSize);\n        var tileY = Math.floor(y / this.tileSize);\n        if (tileX < 0 || tileY < 0 || tileX >= this.tileCountX() || tileY >= this.tileCountY()) {\n            return false;\n        }\n        return this.walls[tileY][tileX];\n    };\n    /**\n     * Sends out a ray from a given position.\n     * @param startX X position to send ray from.\n     * @param startY Y position to send ray from.\n     * @param angle Direction to send the ray.\n     * @returns The distance traveled by the ray until it hit a wall. -1 if it did not hit anything.\n     */\n    World.prototype.sendRay = function (startX, startY, angle) {\n        var maxRayDist = 1000;\n        var rayStep = 1;\n        var x = startX;\n        var y = startY;\n        var dist = 0;\n        while (dist < maxRayDist) {\n            x += Math.cos(angle) * rayStep;\n            y += Math.sin(angle) * rayStep;\n            dist = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));\n            if (this.isWallAt(x, y)) {\n                return dist;\n            }\n        }\n        return -1;\n    };\n    World.prototype.update = function (deltaTime) {\n        if (this.right)\n            this.playerRotation -= this.rotation_speed * deltaTime;\n        if (this.left)\n            this.playerRotation += this.rotation_speed * deltaTime;\n        if (this.forward) {\n            this.playerY += Math.cos(this.playerRotation) * this.walk_speed * deltaTime;\n            this.playerX -= Math.sin(this.playerRotation) * this.walk_speed * deltaTime;\n        }\n        if (this.backwards) {\n            this.playerY -= Math.cos(this.playerRotation) * this.walk_speed * deltaTime;\n            this.playerX += Math.sin(this.playerRotation) * this.walk_speed * deltaTime;\n        }\n        console.log(\"X: \" + this.playerX + \" Y: \" + this.playerY);\n    };\n    World.prototype.setUpInputs = function () {\n        var world = this;\n        document.addEventListener('keydown', function (event) {\n            switch (event.key) {\n                case 'ArrowUp':\n                    world.forward = true;\n                    break;\n                case 'ArrowDown':\n                    world.backwards = true;\n                    break;\n                case 'ArrowLeft':\n                    world.left = true;\n                    break;\n                case 'ArrowRight':\n                    world.right = true;\n                    break;\n            }\n        });\n        document.addEventListener('keyup', function (event) {\n            switch (event.key) {\n                case 'ArrowUp':\n                    world.forward = false;\n                    break;\n                case 'ArrowDown':\n                    world.backwards = false;\n                    break;\n                case 'ArrowLeft':\n                    world.left = false;\n                    break;\n                case 'ArrowRight':\n                    world.right = false;\n                    break;\n            }\n        });\n    };\n    return World;\n}());\nexports.default = World;\n\n\n//# sourceURL=webpack:///./src/world.ts?");

/***/ })

/******/ });