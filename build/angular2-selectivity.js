webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(31);


/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../tsd.d.ts"/>
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(84));
	//# sourceMappingURL=index.js.map

/***/ },

/***/ 82:
/***/ function(module, exports) {

	module.exports = ".selectivity-backdrop {\n    background: transparent;\n    position: fixed;\n    z-index: 1045;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n}\n\n.selectivity-clearfix {\n    clear: both;\n}\n\n.selectivity-input {\n    display: inline-block;\n    width: 250px;\n}\n\nselect {\n    display: none;\n}\n\n.selectivity-placeholder {\n    color: #999;\n}\n\n.selectivity-dropdown {\n    background: #fff;\n    border-radius: 4px;\n    box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.15), 0 10px 16px 0 rgba(0, 0, 0, 0.2);\n    position: absolute;\n    z-index: 1046;\n}\n\n.selectivity-search-input-container {\n    border-bottom: 1px solid #eee;\n}\n\n.selectivity-search-input {\n    background: transparent;\n    border: 0;\n    outline: 0;\n    width: 100%;\n}\n\n.selectivity-results-container {\n    max-height: 28em;\n    overflow: auto;\n    position: relative;\n}\n\n.selectivity-load-more,\n.selectivity-result-item {\n    cursor: pointer;\n    padding: 7px;\n}\n\n.selectivity-result-children .selectivity-result-item {\n    padding-left: 17px;\n}\n\n.selectivity-load-more.highlight,\n.selectivity-result-item.highlight {\n    background: #4484c7;\n    color: #fff;\n}\n\n.selectivity-result-item:first-child {\n    border-radius: 4px 4px 0 0;\n}\n\n.selectivity-dropdown.has-search-input .selectivity-result-item:first-child {\n    border-radius: 0;\n}\n\n.selectivity-result-label {\n    font-weight: bold;\n}\n\n.selectivity-load-more,\n.selectivity-result-item:last-child,\n.selectivity-result-children:last-child .selectivity-result-item:last-child {\n    border-radius: 0 0 4px 4px;\n}\n\n.selectivity-result-children .selectivity-result-item:last-child {\n    border-radius: 0;\n}\n\n.selectivity-error,\n.selectivity-loading,\n.selectivity-search-input-container,\n.selectivity-result-label {\n    padding: 7px;\n}\n\n.selectivity-multiple-input-container {\n    background: #eee;\n    border-radius: 2px;\n    cursor: text;\n    max-height: 10em;\n    min-height: calc(2em + 4px);\n    overflow: auto;\n    padding: 5px;\n}\n\n.selectivity-multiple-input-container .selectivity-placeholder {\n    height: calc(2em + 4px);\n    line-height: calc(2em + 4px);\n}\n\n.selectivity-multiple-input,\ninput[type='text'].selectivity-multiple-input {\n    background-color: transparent;\n    border: none;\n    float: left;\n    height: calc(2em + 4px);\n    max-width: 100%;\n    outline: 0;\n    padding: 0;\n}\n\n.selectivity-multiple-input:focus,\ninput[type='text'].selectivity-multiple-input:focus {\n    background-color: transparent;\n    box-shadow: none;\n    outline: none;\n}\n\n.selectivity-multiple-input::-ms-clear {\n    display: none;\n}\n\n.selectivity-multiple-input.selectivity-width-detector {\n    position: absolute;\n    top: -10000px;\n    left: 0;\n    white-space: pre;\n}\n\n.selectivity-multiple-selected-item {\n    background: #4484c7;\n    border-radius: 3px;\n    color: #fff;\n    cursor: default;\n    float: left;\n    line-height: 2em;\n    margin: 2px;\n    padding-right: 5px;\n    position: relative;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n    white-space: nowrap;\n}\n\n.selectivity-multiple-selected-item.highlighted {\n    background-color: #ccc;\n}\n\n.selectivity-multiple-selected-item-remove {\n    color: #fff;\n    cursor: pointer;\n    padding: 5px;\n}\n\n.selectivity-single-select {\n    background: #eee;\n    border-radius: 2px;\n    cursor: pointer;\n    min-height: 2em;\n    padding: 5px;\n    position: relative;\n    -moz-box-sizing: content-box;\n    -webkit-box-sizing: content-box;\n    box-sizing: content-box;\n}\n\n.selectivity-single-select-input {\n    opacity: 0;\n}\n\n.selectivity-single-result-container {\n    position: absolute;\n    top: 0.8em;\n    right: 15px;\n    left: 5px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.selectivity-single-selected-item {\n    color: #000;\n}\n\n.selectivity-single-selected-item-remove {\n    color: #000;\n    float: right;\n    padding: 0 5px;\n}\n\n.selectivity-caret {\n    position: absolute;\n    right: 5px;\n    top: 0.7em;\n}\n\n@media only screen and (max-device-width: 480px) {\n    .selectivity-single-select {\n        background: #eee;\n        border-radius: 2px;\n    }\n\n    .selectivity-single-result-container {\n        right: 5px;\n    }\n\n    .selectivity-caret {\n        display: none;\n    }\n}\n\n.selectivity-submenu-icon {\n    position: absolute;\n    right: 4px;\n}\n"

/***/ },

/***/ 83:
/***/ function(module, exports) {

	/// <reference path="../tsd.d.ts" />
	var PositionService = (function () {
	    function PositionService() {
	    }
	    Object.defineProperty(PositionService.prototype, "window", {
	        get: function () {
	            return window;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PositionService.prototype, "document", {
	        get: function () {
	            return window.document;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PositionService.prototype.getStyle = function (nativeEl, cssProp) {
	        if (nativeEl.currentStyle) {
	            return nativeEl.currentStyle[cssProp];
	        }
	        if (this.window.getComputedStyle) {
	            return this.window.getComputedStyle(nativeEl)[cssProp];
	        }
	        return nativeEl.style[cssProp];
	    };
	    PositionService.prototype.isStaticPositioned = function (nativeEl) {
	        return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
	    };
	    PositionService.prototype.parentOffsetEl = function (nativeEl) {
	        var offsetParent = nativeEl.offsetParent || this.document;
	        while (offsetParent && offsetParent !== this.document &&
	            this.isStaticPositioned(offsetParent)) {
	            offsetParent = offsetParent.offsetParent;
	        }
	        return offsetParent || this.document;
	    };
	    ;
	    PositionService.prototype.position = function (nativeEl) {
	        var elBCR = this.offset(nativeEl);
	        var offsetParentBCR = { top: 0, left: 0 };
	        var offsetParentEl = this.parentOffsetEl(nativeEl);
	        if (offsetParentEl !== this.document) {
	            offsetParentBCR = this.offset(offsetParentEl);
	            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
	            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
	        }
	        var boundingClientRect = nativeEl.getBoundingClientRect();
	        return {
	            width: boundingClientRect.width || nativeEl.offsetWidth,
	            height: boundingClientRect.height || nativeEl.offsetHeight,
	            top: elBCR.top - offsetParentBCR.top,
	            left: elBCR.left - offsetParentBCR.left
	        };
	    };
	    PositionService.prototype.offset = function (nativeEl) {
	        var boundingClientRect = nativeEl.getBoundingClientRect();
	        return {
	            width: boundingClientRect.width || nativeEl.offsetWidth,
	            height: boundingClientRect.height || nativeEl.offsetHeight,
	            top: boundingClientRect.top + (this.window.pageYOffset || this.document.documentElement.scrollTop),
	            left: boundingClientRect.left + (this.window.pageXOffset || this.document.documentElement.scrollLeft)
	        };
	    };
	    PositionService.prototype.positionElements = function (hostEl, targetEl, positionStr, appendToBody) {
	        var positionStrParts = positionStr.split('-');
	        var pos0 = positionStrParts[0];
	        var pos1 = positionStrParts[1] || 'center';
	        var hostElPos = appendToBody ?
	            this.offset(hostEl) :
	            this.position(hostEl);
	        var targetElWidth = targetEl.offsetWidth;
	        var targetElHeight = targetEl.offsetHeight;
	        var shiftWidth = {
	            center: function () {
	                return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
	            },
	            left: function () {
	                return hostElPos.left;
	            },
	            right: function () {
	                return hostElPos.left + hostElPos.width;
	            }
	        };
	        var shiftHeight = {
	            center: function () {
	                return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
	            },
	            top: function () {
	                return hostElPos.top;
	            },
	            bottom: function () {
	                return hostElPos.top + hostElPos.height;
	            }
	        };
	        var targetElPos;
	        switch (pos0) {
	            case 'right':
	                targetElPos = {
	                    top: shiftHeight[pos1](),
	                    left: shiftWidth[pos0]()
	                };
	                break;
	            case 'left':
	                targetElPos = {
	                    top: shiftHeight[pos1](),
	                    left: hostElPos.left - targetElWidth
	                };
	                break;
	            case 'bottom':
	                targetElPos = {
	                    top: shiftHeight[pos0](),
	                    left: shiftWidth[pos1]()
	                };
	                break;
	            default:
	                targetElPos = {
	                    top: hostElPos.top - targetElHeight,
	                    left: shiftWidth[pos1]()
	                };
	                break;
	        }
	        return targetElPos;
	    };
	    return PositionService;
	})();
	exports.PositionService = PositionService;
	exports.positionService = new PositionService();
	//# sourceMappingURL=position.js.map

/***/ },

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../tsd.d.ts" />
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(5);
	var di_1 = __webpack_require__(4);
	var position_1 = __webpack_require__(83);
	var cssSelectivity = __webpack_require__(82);
	var SelectivityItem = (function () {
	    function SelectivityItem(id, text) {
	        this.id = id;
	        this.text = text;
	    }
	    return SelectivityItem;
	})();
	exports.SelectivityItem = SelectivityItem;
	var SelectivityOptions = (function () {
	    function SelectivityOptions(options) {
	        Object.assign(this, options);
	    }
	    return SelectivityOptions;
	})();
	exports.SelectivityOptions = SelectivityOptions;
	var SelectivityOptionsContainer = (function () {
	    function SelectivityOptionsContainer(element, options) {
	        this.element = element;
	        this.options = options;
	        this.items = [];
	        Object.assign(this, options);
	    }
	    SelectivityOptionsContainer.prototype.position = function (hostEl) {
	        var _this = this;
	        this.items = this.options.sel.itemObjects.filter(function (option) { return (_this.options.sel.isMultiple === false ||
	            _this.options.sel.isMultiple === true && !_this.options.sel.active.find(function (o) { return option.text === o.text; })); });
	        if (this.items.length > 0) {
	            this.active = this.items[0];
	        }
	        this.display = 'block';
	        var parentPosition = position_1.positionService.position(hostEl.nativeElement);
	        var p = position_1.positionService
	            .positionElements(hostEl.nativeElement, this.element.nativeElement.children[0], this.placement, false);
	        this.top = p.top + 'px';
	        this.left = p.left + 'px';
	        this.width = parentPosition.width + 'px';
	        var inputs = [
	            this.element.nativeElement.getElementsByClassName('selectivity-search-input'),
	            this.element.nativeElement.parentElement.getElementsByClassName('selectivity-multiple-input')
	        ];
	        for (var i = 0; i < inputs.length; i++) {
	            if (inputs[i].length > 0) {
	                this.inputComponent = inputs[i][0];
	                this.inputComponent.focus();
	                break;
	            }
	        }
	    };
	    SelectivityOptionsContainer.prototype.inputEvent = function (e, isUpMode) {
	        var _this = this;
	        if (isUpMode === void 0) { isUpMode = false; }
	        if (!isUpMode && (e.keyCode === 27 || e.keyCode === 9)) {
	            this.options.sel.hide();
	            e.preventDefault();
	            return;
	        }
	        if (!isUpMode && e.keyCode === 8) {
	            if (!this.inputValue) {
	                this.options.sel.remove(this.options.sel.active[this.options.sel.active.length - 1]);
	            }
	        }
	        if (!isUpMode && e.keyCode === 37 && this.items.length > 0) {
	            this.active = this.items[0];
	            e.preventDefault();
	            return;
	        }
	        if (!isUpMode && e.keyCode === 39 && this.items.length > 0) {
	            this.active = this.items[this.items.length - 1];
	            e.preventDefault();
	            return;
	        }
	        if (!isUpMode && e.keyCode === 38) {
	            this.prevActiveMatch();
	            e.preventDefault();
	            return;
	        }
	        if (!isUpMode && e.keyCode === 40) {
	            this.nextActiveMatch();
	            e.preventDefault();
	            return;
	        }
	        if (!isUpMode && e.keyCode === 13) {
	            this.selectActiveMatch();
	            e.preventDefault();
	            return;
	        }
	        if (e.srcElement) {
	            this.inputValue = e.srcElement.value;
	            var query = new RegExp(e.srcElement.value, 'ig');
	            this.items = this.options.sel.itemObjects.filter(function (option) { return query.test(option.text) &&
	                (_this.options.sel.isMultiple === false ||
	                    _this.options.sel.isMultiple === true && _this.options.sel.active.indexOf(option) < 0); });
	        }
	    };
	    SelectivityOptionsContainer.prototype.prevActiveMatch = function () {
	        var index = this.items.indexOf(this.active);
	        this.active = this.items[index - 1 < 0 ? this.items.length - 1 : index - 1];
	    };
	    SelectivityOptionsContainer.prototype.nextActiveMatch = function () {
	        var index = this.items.indexOf(this.active);
	        this.active = this.items[index + 1 > this.items.length - 1 ? 0 : index + 1];
	    };
	    SelectivityOptionsContainer.prototype.selectActiveMatch = function () {
	        return this.selectMatch(this.active);
	    };
	    SelectivityOptionsContainer.prototype.selectMatch = function (value, e) {
	        if (e === void 0) { e = null; }
	        if (e) {
	            e.stopPropagation();
	            e.preventDefault();
	        }
	        if (this.options.sel.isMultiple === true) {
	            if (this.items.length <= 0) {
	                return;
	            }
	            this.options.sel.active.push(value);
	            this.options.sel.data.next(this.options.sel.active);
	            this.options.sel.doEvent('selected', value);
	        }
	        if (this.options.sel.isMultiple === false) {
	            this.options.sel.active[0] = value;
	            this.options.sel.data.next(this.options.sel.active[0]);
	            this.options.sel.doEvent('selected', value);
	            this.options.sel.element.nativeElement.children[1].children[0].focus();
	        }
	        if (this.inputComponent) {
	            this.inputComponent.value = '';
	        }
	        this.options.sel.hide();
	    };
	    SelectivityOptionsContainer.prototype.selectActive = function (value) {
	        this.active = value;
	    };
	    SelectivityOptionsContainer.prototype.isActive = function (value) {
	        return this.active.text === value.text;
	    };
	    SelectivityOptionsContainer = __decorate([
	        angular2_1.Component({
	            selector: 'selectivity-options-container'
	        }),
	        angular2_1.View({
	            template: "\n<div *ng-if=\"options.sel && options.sel.items\"\n     class=\"selectivity-dropdown\"\n     [ng-class]=\"{'has-search-input': options.sel.isMultiple === false}\"\n     [ng-style]=\"{top: top, left: left, width: width, display: display}\">\n  <div *ng-if=\"options.sel.isMultiple === false\"\n       class=\"selectivity-search-input-container\">\n    <input (keydown)=\"inputEvent($event)\"\n           (keyup)=\"inputEvent($event, true)\"\n           type=\"text\"\n           class=\"selectivity-search-input\">\n  </div>\n  <div class=\"selectivity-results-container\">\n    <div *ng-if=\"items.length <= 0\"\n         class=\"selectivity-error\">No results for <b>{{inputValue}}</b></div>\n    <div *ng-for=\"#i of items\"\n         [ng-class]=\"{'highlight': isActive(i)}\"\n         (mouseenter)=\"selectActive(i)\"\n         (click)=\"selectMatch(i, $event)\"\n         class=\"selectivity-result-item\">{{i.text}}</div>\n  </div>\n</div>\n\n<!--<div class=\"selectivity-results-container\">\n  <div class=\"selectivity-result-label\">Austria</div>\n  <div class=\"selectivity-result-children\">\n    <div class=\"selectivity-result-item\" data-item-id=\"54\">Vienna</div>\n  </div>\n  <div class=\"selectivity-result-label\">Belgium</div>\n  <div class=\"selectivity-result-children\">\n    <div class=\"selectivity-result-item\" data-item-id=\"2\">Antwerp</div>\n    <div class=\"selectivity-result-item highlight\" data-item-id=\"9\">Brussels</div>\n  </div>\n</div>-->\n\n<!--<div class=\"selectivity-results-container\">\n  <div class=\"selectivity-result-item\" data-item-id=\"+00:00\">Western European Time Zone<i class=\"selectivity-submenu-icon fa fa-chevron-right\"></i></div>\n  <div class=\"selectivity-result-item highlight\" data-item-id=\"+01:00\">Central European Time Zone<i class=\"selectivity-submenu-icon fa fa-chevron-right\"></i></div>\n  <div class=\"selectivity-result-item\" data-item-id=\"+02:00\">Eastern European Time Zone<i class=\"selectivity-submenu-icon fa fa-chevron-right\"></i></div>\n</div>-->\n\n\n  ",
	            styles: [cssSelectivity],
	            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES, angular2_1.NgClass, angular2_1.NgStyle],
	            encapsulation: angular2_1.ViewEncapsulation.None
	        }), 
	        __metadata('design:paramtypes', [angular2_1.ElementRef, SelectivityOptions])
	    ], SelectivityOptionsContainer);
	    return SelectivityOptionsContainer;
	})();
	exports.SelectivityOptionsContainer = SelectivityOptionsContainer;
	var Selectivity = (function () {
	    function Selectivity(element, loader) {
	        this.element = element;
	        this.loader = loader;
	        this.data = new angular2_1.EventEmitter();
	        this.selected = new angular2_1.EventEmitter();
	        this.removed = new angular2_1.EventEmitter();
	        this.allowClear = false;
	        this.placeholder = '';
	        this.initData = [];
	        this._items = [];
	        this._itemObjects = [];
	        this.multiple = false;
	        this._active = [];
	        this.showSearchInputInDropdown = true;
	    }
	    Object.defineProperty(Selectivity.prototype, "popup", {
	        get: function () {
	            return this._popup;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Selectivity.prototype.getSelectivityItem = function (source) {
	        if (typeof source === 'string') {
	            return new SelectivityItem(source, source);
	        }
	        if (typeof source === 'object' && source.id && source.text) {
	            return new SelectivityItem(source.id, source.text);
	        }
	        return null;
	    };
	    Object.defineProperty(Selectivity.prototype, "items", {
	        get: function () {
	            return this._items;
	        },
	        set: function (value) {
	            var _this = this;
	            this._items = value;
	            this._itemObjects = this._items.map(function (item) {
	                return _this.getSelectivityItem(item);
	            });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Selectivity.prototype, "itemObjects", {
	        get: function () {
	            return this._itemObjects;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Selectivity.prototype, "active", {
	        get: function () {
	            return this._active;
	        },
	        set: function (value) {
	            this._active = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Selectivity.prototype, "isMultiple", {
	        get: function () {
	            return this.multiple;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Selectivity.prototype.onInit = function () {
	        var _this = this;
	        this.offSideClickHandler = this.getOffSideClickHandler(this);
	        document.addEventListener('click', this.offSideClickHandler);
	        if (this.initData) {
	            this.active = this.initData.map(function (d) { return _this.getSelectivityItem(d); });
	            this.data.next(this.active);
	        }
	    };
	    Selectivity.prototype.onDestroy = function () {
	        document.removeEventListener('click', this.offSideClickHandler);
	        this.offSideClickHandler = null;
	    };
	    Selectivity.prototype.inputEvent = function (e, isUpMode) {
	        if (isUpMode === void 0) { isUpMode = false; }
	        if (!this._popup && e.keyCode !== 13 && e.keyCode !== 27) {
	            this.show();
	        }
	        if (this.optContainer) {
	            this.optContainer.inputEvent(e, isUpMode);
	        }
	    };
	    Selectivity.prototype.getOffSideClickHandler = function (context) {
	        return function (e) {
	            if (e.srcElement && e.srcElement.className.indexOf('selectivity-') === 0) {
	                return;
	            }
	            context.hide();
	        };
	    };
	    Selectivity.prototype.remove = function (item) {
	        if (this.multiple === true && this.active) {
	            var index = this.active.indexOf(item);
	            this.active.splice(index, 1);
	            this.data.next(this.active);
	            this.doEvent('removed', item);
	        }
	        if (this.multiple === false) {
	            this.active = [];
	            this.data.next(this.active);
	            this.doEvent('removed', item);
	        }
	    };
	    Selectivity.prototype.onClick = function (e) {
	        if (e.srcElement && e.srcElement.className &&
	            e.srcElement.className.indexOf('fa-remove') >= 0) {
	            var currentOption = this.active.find(function (o) { return o.text === e.srcElement.parentElement.parentElement.innerText; });
	            if (currentOption) {
	                this.remove(currentOption);
	                return;
	            }
	        }
	        if (!this.popup) {
	            this.show();
	        }
	        else {
	            this.hide();
	        }
	    };
	    Selectivity.prototype.doEvent = function (type, value) {
	        if (this[type] && value) {
	            this[type].next(value);
	        }
	    };
	    Selectivity.prototype.show = function () {
	        var _this = this;
	        var options = new SelectivityOptions({
	            placement: 'bottom-left',
	            sel: this
	        });
	        var binding = di_1.Injector.resolve([
	            di_1.bind(SelectivityOptions).toValue(options)
	        ]);
	        this._popup = this.loader
	            .loadNextToLocation(SelectivityOptionsContainer, this.element, binding)
	            .then(function (componentRef) {
	            componentRef.instance.position(_this.element);
	            _this.optContainer = componentRef.instance;
	            _this.element.nativeElement.focus();
	            return componentRef;
	        });
	    };
	    Selectivity.prototype.hide = function () {
	        var _this = this;
	        if (this._popup) {
	            this._popup.then(function (componentRef) {
	                componentRef.dispose();
	                _this._popup = null;
	                _this.optContainer = null;
	                return componentRef;
	            });
	        }
	    };
	    Selectivity = __decorate([
	        angular2_1.Component({
	            selector: 'ng2-selectivity',
	            properties: [
	                'allowClear',
	                'placeholder',
	                'initData:data',
	                'items',
	                'multiple',
	                'showSearchInputInDropdown'],
	            events: ['selected', 'removed', 'data']
	        }),
	        angular2_1.View({
	            template: "\n<div *ng-if=\"!multiple\" (click)=\"onClick($event)\" class=\"selectivity-single-select\" (keydown)=\"inputEvent($event)\">\n  <input type=\"text\" class=\"selectivity-single-select-input\">\n  <div class=\"selectivity-single-result-container\">\n    <div *ng-if=\"active.length <= 0\" class=\"selectivity-placeholder\">{{placeholder}}</div>\n    <span *ng-if=\"active.length > 0\" class=\"selectivity-single-selected-item\">\n      <a class=\"selectivity-single-selected-item-remove\"><i class=\"fa fa-remove\"></i></a>{{active[0].text}}\n    </span>\n  </div><i class=\"fa fa-sort-desc selectivity-caret\"></i>\n</div>\n\n<div *ng-if=\"multiple\" (click)=\"onClick($event)\" class=\"selectivity-multiple-input-container\">\n  <span *ng-for=\"#a of active\" class=\"selectivity-multiple-selected-item\">\n    <a class=\"selectivity-multiple-selected-item-remove\"><i class=\"fa fa-remove\"></i></a>{{a.text}}</span>\n  <input (keydown)=\"inputEvent($event)\"\n         (keyup)=\"inputEvent($event, true)\"\n         placeholder=\"{{active.length <= 0 ? placeholder : ''}}\"\n         type=\"text\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" class=\"selectivity-multiple-input\">\n  <span class=\"selectivity-multiple-input selectivity-width-detector\"></span><div class=\"selectivity-clearfix\"></div>\n</div>\n  ",
	            styles: [cssSelectivity],
	            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [angular2_1.ElementRef, angular2_1.DynamicComponentLoader])
	    ], Selectivity);
	    return Selectivity;
	})();
	exports.Selectivity = Selectivity;
	exports.selectivity = [Selectivity];
	//# sourceMappingURL=selectivity.js.map

/***/ }

});
//# sourceMappingURL=angular2-selectivity.js.map