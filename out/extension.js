module.exports =
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/extension.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/commands/setup_all.ts":
/*!***********************************!*\
  !*** ./src/commands/setup_all.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst fs_1 = __webpack_require__(/*! fs */ \"fs\");\nconst path_1 = __webpack_require__(/*! path */ \"path\");\nconst util_1 = __webpack_require__(/*! ../core/util */ \"./src/core/util.ts\");\nconst USER_HOME = path_1.resolve(process.env.HOME || '~/');\nconst SETTINGS_PATH = path_1.resolve(USER_HOME, 'Library/Application Support/Code/User/settings.json');\nconst logger = util_1.Logger.of('BATMAN');\nfunction setUpAll({ extensionPath }) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            logger.log('Installing fonts...');\n            util_1.copyR(`${extensionPath}/data/fonts/InputMono/*`, '~/Library/Fonts/');\n            const settingsStr = fs_1.readFileSync(SETTINGS_PATH).toString();\n            const settingsJSON = JSON.parse(settingsStr || '{}');\n            let fontFamily = settingsJSON['editor.fontFamily'];\n            fontFamily = util_1.isEmpty(fontFamily)\n                ? \"Menlo, Monaco, 'Courier New', monospace\"\n                : fontFamily.replace(`'Input Mono',`, '');\n            settingsJSON['editor.fontFamily'] = `'Input Mono', ${fontFamily}`;\n            fs_1.writeFileSync(SETTINGS_PATH, util_1.stringify(settingsJSON));\n            logger.log('Setup done...');\n        }\n        catch (error) {\n            logger.error('Something is wrong happen, please contact github.com/deepakshrma/\\n' + error.message);\n        }\n    });\n}\nexports.setUpAll = setUpAll;\n\n\n//# sourceURL=webpack:///./src/commands/setup_all.ts?");

/***/ }),

/***/ "./src/core/util.ts":
/*!**************************!*\
  !*** ./src/core/util.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst child_process_1 = __webpack_require__(/*! child_process */ \"child_process\");\nconst vscode_1 = __webpack_require__(/*! vscode */ \"vscode\");\nclass Logger {\n    constructor(context) {\n        this.context$$ = context;\n    }\n    static of(context) {\n        if (this.instance$ === undefined) {\n            this.instance$ = new Logger(context);\n        }\n        return this.instance$;\n    }\n    log(message) {\n        vscode_1.window.showInformationMessage(`${this.context$$}: ${message}`);\n    }\n    error(message) {\n        vscode_1.window.showErrorMessage(`${this.context$$}: ${message}`);\n    }\n    warn(message) {\n        vscode_1.window.showWarningMessage(`${this.context$$}: ${message}`);\n    }\n}\nexports.Logger = Logger;\nexports.copyR = (src, dest) => child_process_1.execSync(`cp -r ${src} ${dest}`);\nexports.isEmpty = (data) => {\n    if (!data) {\n        return true;\n    }\n    if (typeof data === 'string') {\n        return data.replace(/\\s+/g, '') === '';\n    }\n    if (Array.isArray(data)) {\n        return data.length === 0;\n    }\n    return JSON.stringify(data) === '{}';\n};\nexports.stringify = (obj, tabs = 4) => JSON.stringify(obj, null, tabs);\n\n\n//# sourceURL=webpack:///./src/core/util.ts?");

/***/ }),

/***/ "./src/extension.ts":
/*!**************************!*\
  !*** ./src/extension.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst vscode_1 = __webpack_require__(/*! vscode */ \"vscode\");\nconst setup_all_1 = __webpack_require__(/*! ./commands/setup_all */ \"./src/commands/setup_all.ts\");\nconst util_1 = __webpack_require__(/*! ./core/util */ \"./src/core/util.ts\");\nconst logger = util_1.Logger.of('BATMAN');\nvar COMMANDS;\n(function (COMMANDS) {\n    COMMANDS[\"SET_UP_ALL\"] = \"extension.set_up_all\";\n})(COMMANDS || (COMMANDS = {}));\nfunction activate(context) {\n    logger.log('BAT Mobile has been activated');\n    context.subscriptions.push(vscode_1.commands.registerCommand(COMMANDS.SET_UP_ALL, () => {\n        setup_all_1.setUpAll({ extensionPath: context.extensionPath });\n    }));\n}\nexports.activate = activate;\nfunction deactivate() {\n    // tslint:disable-next-line:no-console\n    logger.error('BatMobile is deactivated');\n}\nexports.deactivate = deactivate;\n\n\n//# sourceURL=webpack:///./src/extension.ts?");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"child_process\");\n\n//# sourceURL=webpack:///external_%22child_process%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "vscode":
/*!*************************!*\
  !*** external "vscode" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"vscode\");\n\n//# sourceURL=webpack:///external_%22vscode%22?");

/***/ })

/******/ });