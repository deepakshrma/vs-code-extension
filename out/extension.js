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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __webpack_require__(/*! child_process */ "child_process");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const path_1 = __webpack_require__(/*! path */ "path");
const util_1 = __webpack_require__(/*! util */ "util");
const util_2 = __webpack_require__(/*! ../core/util */ "./src/core/util.ts");
const execWithPromise = util_1.promisify(child_process_1.exec);
const USER_HOME = path_1.resolve(process.env.HOME || '~/');
const SETTINGS_PATH = path_1.resolve(USER_HOME, 'Library/Application Support/Code/User/settings.json');
const logger = util_2.Logger.of('BATMAN');
function setUpAll({ extensionPath }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger.log('Installing fonts...');
            util_2.copyR(`${extensionPath}/data/fonts/InputMono/*`, '~/Library/Fonts/');
            const settingsStr = fs_1.readFileSync(SETTINGS_PATH).toString();
            const settingsJSON = JSON.parse(settingsStr || '{}');
            let fontFamily = settingsJSON['editor.fontFamily'];
            fontFamily = util_2.isEmpty(fontFamily)
                ? "Menlo, Monaco, 'Courier New', monospace"
                : fontFamily.replace(`'Input Mono',`, '');
            settingsJSON['editor.fontFamily'] = `'Input Mono', ${fontFamily}`;
            fs_1.writeFileSync(SETTINGS_PATH, util_2.stringify(settingsJSON));
            logger.log('Setup done...');
        }
        catch (error) {
            logger.error('Something is wrong happen, please contact github.com/deepakshrma/\n' + error.message);
        }
    });
}
exports.setUpAll = setUpAll;
function installExt({ extensionPath }) {
    return __awaiter(this, void 0, void 0, function* () {
        const extensionsList = child_process_1.execSync(`cat ${extensionPath}/data/list_of_extensions.txt`)
            .toString()
            .split('\n');
        let counter = 0;
        util_2.series(extensionsList, (ext) => {
            counter += 1;
            return execWithPromise(`code --install-extension ${ext}`).then(x => {
                logger.log(x.stdout);
                if (counter === extensionsList.length) {
                    logger.log('Installing extensions done!!');
                }
            });
        });
    });
}
exports.installExt = installExt;


/***/ }),

/***/ "./src/core/util.ts":
/*!**************************!*\
  !*** ./src/core/util.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __webpack_require__(/*! child_process */ "child_process");
// tslint:disable-next-line:no-implicit-dependencies
const vscode_1 = __webpack_require__(/*! vscode */ "vscode");
class Logger {
    constructor(context) {
        this.context$$ = context;
    }
    static of(context) {
        if (this.instance$ === undefined) {
            this.instance$ = new Logger(context);
        }
        return this.instance$;
    }
    log(message) {
        vscode_1.window.showInformationMessage(`${this.context$$}: ${message}`);
    }
    error(message) {
        vscode_1.window.showErrorMessage(`${this.context$$}: ${message}`);
    }
    warn(message) {
        vscode_1.window.showWarningMessage(`${this.context$$}: ${message}`);
    }
}
exports.Logger = Logger;
exports.copyR = (src, dest) => child_process_1.execSync(`cp -r ${src} ${dest}`);
exports.isEmpty = (data) => {
    if (!data) {
        return true;
    }
    if (typeof data === 'string') {
        return data.replace(/\s+/g, '') === '';
    }
    if (Array.isArray(data)) {
        return data.length === 0;
    }
    return JSON.stringify(data) === '{}';
};
exports.stringify = (obj, tabs = 4) => JSON.stringify(obj, null, tabs);
function series(values, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const value of values) {
            yield fn(value);
        }
    });
}
exports.series = series;


/***/ }),

/***/ "./src/extension.ts":
/*!**************************!*\
  !*** ./src/extension.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-implicit-dependencies
const vscode_1 = __webpack_require__(/*! vscode */ "vscode");
const setup_all_1 = __webpack_require__(/*! ./commands/setup_all */ "./src/commands/setup_all.ts");
const util_1 = __webpack_require__(/*! ./core/util */ "./src/core/util.ts");
const logger = util_1.Logger.of('BATMAN');
var COMMANDS;
(function (COMMANDS) {
    COMMANDS["SET_UP_ALL"] = "extension.set_up_all";
    COMMANDS["INSTALL_EXTS"] = "extension.install_extension";
})(COMMANDS || (COMMANDS = {}));
function activate(context) {
    logger.log('BAT Mobile has been activated');
    context.subscriptions.push(vscode_1.commands.registerCommand(COMMANDS.SET_UP_ALL, () => {
        setup_all_1.setUpAll({ extensionPath: context.extensionPath });
    }));
    context.subscriptions.push(vscode_1.commands.registerCommand(COMMANDS.INSTALL_EXTS, () => {
        setup_all_1.installExt({ extensionPath: context.extensionPath });
    }));
}
exports.activate = activate;
function deactivate() {
    // tslint:disable-next-line:no-console
    logger.error('BatMobile is deactivated');
}
exports.deactivate = deactivate;


/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "vscode":
/*!*************************!*\
  !*** external "vscode" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vscode");

/***/ })

/******/ });
//# sourceMappingURL=extension.js.map