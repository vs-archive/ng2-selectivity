webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(32);


/***/ },

/***/ 21:
/***/ function(module, exports) {

	module.exports = ".selectivity-backdrop {\n    background: transparent;\n    position: fixed;\n    z-index: 1045;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n}\n\n.selectivity-clearfix {\n    clear: both;\n}\n\n.selectivity-input {\n    display: inline-block;\n    width: 250px;\n}\n\nselect {\n    display: none;\n}\n\n.selectivity-placeholder {\n    color: #999;\n}\n\n.selectivity-dropdown {\n    background: #fff;\n    border-radius: 4px;\n    box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.15), 0 10px 16px 0 rgba(0, 0, 0, 0.2);\n    position: absolute;\n    z-index: 1046;\n}\n\n.selectivity-search-input-container {\n    border-bottom: 1px solid #eee;\n}\n\n.selectivity-search-input {\n    background: transparent;\n    border: 0;\n    outline: 0;\n    width: 100%;\n}\n\n.selectivity-results-container {\n    max-height: 28em;\n    overflow: auto;\n    position: relative;\n}\n\n.selectivity-load-more,\n.selectivity-result-item {\n    cursor: pointer;\n    padding: 7px;\n}\n\n.selectivity-result-children .selectivity-result-item {\n    padding-left: 17px;\n}\n\n.selectivity-load-more.highlight,\n.selectivity-result-item.highlight {\n    background: #4484c7;\n    color: #fff;\n}\n\n.selectivity-result-item:first-child {\n    border-radius: 4px 4px 0 0;\n}\n\n.selectivity-dropdown.has-search-input .selectivity-result-item:first-child {\n    border-radius: 0;\n}\n\n.selectivity-result-label {\n    font-weight: bold;\n}\n\n.selectivity-load-more,\n.selectivity-result-item:last-child,\n.selectivity-result-children:last-child .selectivity-result-item:last-child {\n    border-radius: 0 0 4px 4px;\n}\n\n.selectivity-result-children .selectivity-result-item:last-child {\n    border-radius: 0;\n}\n\n.selectivity-error,\n.selectivity-loading,\n.selectivity-search-input-container,\n.selectivity-result-label {\n    padding: 7px;\n}\n\n.selectivity-multiple-input-container {\n    background: #eee;\n    border-radius: 2px;\n    cursor: text;\n    max-height: 10em;\n    min-height: calc(2em + 4px);\n    overflow: auto;\n    padding: 5px;\n}\n\n.selectivity-multiple-input-container .selectivity-placeholder {\n    height: calc(2em + 4px);\n    line-height: calc(2em + 4px);\n}\n\n.selectivity-multiple-input,\ninput[type='text'].selectivity-multiple-input {\n    background-color: transparent;\n    border: none;\n    float: left;\n    height: calc(2em + 4px);\n    max-width: 100%;\n    outline: 0;\n    padding: 0;\n}\n\n.selectivity-multiple-input:focus,\ninput[type='text'].selectivity-multiple-input:focus {\n    background-color: transparent;\n    box-shadow: none;\n    outline: none;\n}\n\n.selectivity-multiple-input::-ms-clear {\n    display: none;\n}\n\n.selectivity-multiple-input.selectivity-width-detector {\n    position: absolute;\n    top: -10000px;\n    left: 0;\n    white-space: pre;\n}\n\n.selectivity-multiple-selected-item {\n    background: #4484c7;\n    border-radius: 3px;\n    color: #fff;\n    cursor: default;\n    float: left;\n    line-height: 2em;\n    margin: 2px;\n    padding-right: 5px;\n    position: relative;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n    white-space: nowrap;\n}\n\n.selectivity-multiple-selected-item.highlighted {\n    background-color: #ccc;\n}\n\n.selectivity-multiple-selected-item-remove {\n    color: #fff;\n    cursor: pointer;\n    padding: 5px;\n}\n\n.selectivity-single-select {\n    background: #eee;\n    border-radius: 2px;\n    cursor: pointer;\n    min-height: 2em;\n    padding: 5px;\n    position: relative;\n    -moz-box-sizing: content-box;\n    -webkit-box-sizing: content-box;\n    box-sizing: content-box;\n}\n\n.selectivity-single-select-input {\n    opacity: 0;\n}\n\n.selectivity-single-result-container {\n    position: absolute;\n    top: 0.8em;\n    right: 15px;\n    left: 5px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.selectivity-single-selected-item {\n    color: #000;\n}\n\n.selectivity-single-selected-item-remove {\n    color: #000;\n    float: right;\n    padding: 0 5px;\n}\n\n.selectivity-caret {\n    position: absolute;\n    right: 5px;\n    top: 0.7em;\n}\n\n@media only screen and (max-device-width: 480px) {\n    .selectivity-single-select {\n        background: #eee;\n        border-radius: 2px;\n    }\n\n    .selectivity-single-result-container {\n        right: 5px;\n    }\n\n    .selectivity-caret {\n        display: none;\n    }\n}\n\n.selectivity-submenu-icon {\n    position: absolute;\n    right: 4px;\n}\n"

/***/ },

/***/ 22:
/***/ function(module, exports) {

	var SelectivityOptions = (function () {
	    function SelectivityOptions(options) {
	        Object.assign(this, options);
	    }
	    return SelectivityOptions;
	})();
	exports.SelectivityOptions = SelectivityOptions;


/***/ },

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../tsd.d.ts"/>
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(102));


/***/ },

/***/ 39:
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


/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	var selectivity_submenu_1 = __webpack_require__(101);
	var SelectivityItem = (function () {
	    function SelectivityItem(source) {
	        var _this = this;
	        if (typeof source === 'string') {
	            this.id = this.text = source;
	        }
	        if (typeof source === 'object') {
	            this.id = source.id || source.text;
	            this.text = source.text;
	            if (source.children && source.text) {
	                this.children = source.children.map(function (c) {
	                    var r = new SelectivityItem(c);
	                    r.parent = _this;
	                    return r;
	                });
	                this.text = source.text;
	            }
	            if (source.submenu) {
	                this.subMenu = new selectivity_submenu_1.SelectivitySubMenu(source.submenu, this);
	            }
	        }
	    }
	    SelectivityItem.prototype.hasChildren = function () {
	        return this.children && this.children.length > 0;
	    };
	    SelectivityItem.prototype.getSimilar = function () {
	        var r = new SelectivityItem(false);
	        r.id = this.id;
	        r.text = this.text;
	        r.parent = this.parent;
	        return r;
	    };
	    return SelectivityItem;
	})();
	exports.SelectivityItem = SelectivityItem;


/***/ },

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

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
	var angular2_1 = __webpack_require__(6);
	var position_1 = __webpack_require__(39);
	var selectivity_options_1 = __webpack_require__(22);
	var cssSelectivity = __webpack_require__(21);
	var SelectivityOptionsContainer = (function () {
	    function SelectivityOptionsContainer(element, options) {
	        this.element = element;
	        this.options = options;
	        this.items = [];
	        Object.assign(this, options);
	    }
	    SelectivityOptionsContainer.prototype.position = function (hostEl, itemPosition) {
	        var _this = this;
	        if (itemPosition === void 0) { itemPosition = {}; }
	        this.items = this.options.container
	            .getItemObjects()
	            .filter(function (option) { return (_this.options.selectivity.multiple === false ||
	            _this.options.selectivity.multiple === true && !_this.options.selectivity
	                .active
	                .find(function (o) { return option.text === o.text; })); });
	        if (this.options.container.getItemObjects()[0].hasChildren()) {
	            this.behavior = new SelectivityOptionsContainer.ChildrenBehavior(this);
	        }
	        if (!this.behavior) {
	            this.behavior = new SelectivityOptionsContainer.GenericBehavior(this);
	        }
	        if (this.items.length > 0) {
	            this.behavior.first();
	        }
	        this.display = 'block';
	        var parentPosition = position_1.positionService.position(hostEl.nativeElement);
	        var p = position_1.positionService
	            .positionElements(hostEl.nativeElement, this.element.nativeElement.children[0], this.placement, false);
	        var topOffset = itemPosition ? itemPosition.top + itemPosition.height : 0;
	        this.top = (p.top + topOffset) + 'px';
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
	        /*let resultsEl:any = this.element.nativeElement.children[1].children[3];
	         let resultsPosition = positionService.position(resultsEl);*/
	        if (isUpMode === void 0) { isUpMode = false; }
	        if (!isUpMode && (e.keyCode === 27 || e.keyCode === 9)) {
	            this.options.container.hide();
	            e.preventDefault();
	            return;
	        }
	        if (!isUpMode && e.keyCode === 8) {
	            if (!this.inputValue) {
	                this.options.selectivity
	                    .remove(this.options.selectivity.active[this.options.selectivity.active.length - 1]);
	            }
	        }
	        if (!isUpMode && e.keyCode === 37 && this.items.length > 0) {
	            this.behavior.first();
	            e.preventDefault();
	            return;
	        }
	        if (!isUpMode && e.keyCode === 39 && this.items.length > 0) {
	            this.behavior.last();
	            e.preventDefault();
	            return;
	        }
	        if (!isUpMode && e.keyCode === 38) {
	            var reverse = this.behavior.prev();
	            e.preventDefault();
	            return;
	        }
	        if (!isUpMode && e.keyCode === 40) {
	            var reverse = this.behavior.next();
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
	            var _a = this.behavior.filter(query), items = _a.items, isActiveAvailable = _a.isActiveAvailable;
	            this.items = items;
	            if (this.items.length > 0 && !isActiveAvailable) {
	                this.behavior.first();
	            }
	        }
	    };
	    SelectivityOptionsContainer.prototype.selectActiveMatch = function () {
	        this.selectMatch(this.active);
	    };
	    SelectivityOptionsContainer.prototype.selectMatch = function (value, e) {
	        if (e === void 0) { e = null; }
	        if (e) {
	            e.stopPropagation();
	            e.preventDefault();
	        }
	        if (this.options.selectivity.multiple === true) {
	            if (this.items.length <= 0) {
	                return;
	            }
	            this.options.selectivity.active.push(value);
	            this.options.selectivity.data.next(this.options.selectivity.active);
	            this.options.selectivity.doEvent('selected', value);
	        }
	        if (this.options.selectivity.multiple === false) {
	            this.options.selectivity.active[0] = value;
	            this.options.selectivity.data.next(this.options.selectivity.active[0]);
	            this.options.selectivity.doEvent('selected', value);
	            this.options.selectivity.element.nativeElement.children[1].children[0].focus();
	        }
	        if (this.inputComponent) {
	            this.inputComponent.value = '';
	        }
	        this.options.container.hide();
	        this.options.selectivity.hide();
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
	            template: "\n<div *ng-if=\"options.selectivity && options.container\"\n     class=\"selectivity-dropdown\"\n     [ng-class]=\"{'has-search-input': options.selectivity.multiple === false}\"\n     [ng-style]=\"{top: top, left: left, width: width, display: display}\">\n  <div *ng-if=\"options.container.hasSearchInput()\"\n       class=\"selectivity-search-input-container\">\n    <input (keydown)=\"inputEvent($event)\"\n           (keyup)=\"inputEvent($event, true)\"\n           type=\"text\"\n           class=\"selectivity-search-input\">\n  </div>\n  <div *ng-if=\"!options.container.getItemObjects()[0].hasChildren()\" class=\"selectivity-results-container\">\n    <div *ng-if=\"items.length <= 0\"\n         class=\"selectivity-error\">No results for <b>{{inputValue}}</b></div>\n    <div *ng-for=\"#i of items\"\n         [ng-class]=\"{'highlight': isActive(i)}\"\n         (mouseenter)=\"selectActive(i)\"\n         (click)=\"selectMatch(i, $event)\"\n         class=\"selectivity-result-item\">{{i.text}}</div>\n  </div>\n\n  <div *ng-if=\"options.container.getItemObjects()[0].hasChildren()\" class=\"selectivity-results-container\">\n      <div *ng-if=\"items.length <= 0\"\n         class=\"selectivity-error\">No results for <b>{{inputValue}}</b></div>\n      <div *ng-for=\"#i of items\">\n      <div class=\"selectivity-result-label\">{{i.text}}</div>\n          <div class=\"selectivity-result-children\">\n              <div *ng-for=\"#ii of i.children\"\n                   (mouseenter)=\"selectActive(ii)\"\n                   (click)=\"selectMatch(ii, $event)\"\n                   [ng-class]=\"{'highlight': isActive(ii)}\"\n                   class=\"selectivity-result-item\">{{ii.text}}</div>\n          </div>\n      </div>\n  </div>\n</div>\n  ",
	            styles: [cssSelectivity],
	            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES, angular2_1.NgClass, angular2_1.NgStyle],
	            encapsulation: angular2_1.ViewEncapsulation.None
	        }), 
	        __metadata('design:paramtypes', [angular2_1.ElementRef, selectivity_options_1.SelectivityOptions])
	    ], SelectivityOptionsContainer);
	    return SelectivityOptionsContainer;
	})();
	exports.SelectivityOptionsContainer = SelectivityOptionsContainer;
	var SelectivityOptionsContainer;
	(function (SelectivityOptionsContainer) {
	    function getIndex(a, v) {
	        for (var i = 0; i < a.length; i++) {
	            if (a[i].id === v.id) {
	                return i;
	            }
	        }
	        return -1;
	    }
	    var GenericBehavior = (function () {
	        function GenericBehavior(actor) {
	            this.actor = actor;
	        }
	        GenericBehavior.prototype.first = function () {
	            this.actor.active = this.actor.items[0];
	        };
	        GenericBehavior.prototype.last = function () {
	            this.actor.active = this.actor.items[this.actor.items.length - 1];
	        };
	        GenericBehavior.prototype.prev = function () {
	            var index = this.actor.items.indexOf(this.actor.active);
	            var reverse = index - 1 < 0;
	            this.actor.active = this.actor.items[reverse ? this.actor.items.length - 1 : index - 1];
	            return reverse;
	        };
	        GenericBehavior.prototype.next = function () {
	            var index = this.actor.items.indexOf(this.actor.active);
	            var reverse = index + 1 > this.actor.items.length - 1;
	            this.actor.active = this.actor.items[reverse ? 0 : index + 1];
	            return reverse;
	        };
	        GenericBehavior.prototype.filter = function (query) {
	            var _this = this;
	            var items = this.actor.options.container.getItemObjects()
	                .filter(function (option) { return query.test(option.text) &&
	                (_this.actor.options.selectivity.multiple === false ||
	                    (_this.actor.options.selectivity.multiple === true &&
	                        _this.actor.options.selectivity.active.indexOf(option) < 0)); });
	            var isActiveAvailable = getIndex(items, this.actor.active);
	            return { items: items, isActiveAvailable: isActiveAvailable };
	        };
	        return GenericBehavior;
	    })();
	    SelectivityOptionsContainer.GenericBehavior = GenericBehavior;
	    var ChildrenBehavior = (function () {
	        function ChildrenBehavior(actor) {
	            this.actor = actor;
	        }
	        ChildrenBehavior.prototype.first = function () {
	            this.actor.active = this.actor.items[0].children[0];
	        };
	        ChildrenBehavior.prototype.last = function () {
	            this.actor.active =
	                this.actor
	                    .items[this.actor.items.length - 1]
	                    .children[this.actor.items[this.actor.items.length - 1].children.length - 1];
	        };
	        ChildrenBehavior.prototype.prev = function () {
	            var reverse = false;
	            var indexParent = getIndex(this.actor.items, this.actor.active.parent);
	            var index = getIndex(this.actor.items[indexParent].children, this.actor.active);
	            this.actor.active = this.actor.items[indexParent].children[index - 1];
	            if (!this.actor.active) {
	                if (this.actor.items[indexParent - 1]) {
	                    this.actor.active = this.actor
	                        .items[indexParent - 1]
	                        .children[this.actor.items[indexParent - 1].children.length - 1];
	                }
	            }
	            if (!this.actor.active) {
	                this.last();
	                reverse = true;
	            }
	            return reverse;
	        };
	        ChildrenBehavior.prototype.next = function () {
	            var reverse = false;
	            var indexParent = getIndex(this.actor.items, this.actor.active.parent);
	            var index = getIndex(this.actor.items[indexParent].children, this.actor.active);
	            this.actor.active = this.actor.items[indexParent].children[index + 1];
	            if (!this.actor.active) {
	                if (this.actor.items[indexParent + 1]) {
	                    this.actor.active = this.actor.items[indexParent + 1].children[0];
	                }
	            }
	            if (!this.actor.active) {
	                this.first();
	                reverse = true;
	            }
	            return reverse;
	        };
	        ChildrenBehavior.prototype.filter = function (query) {
	            var items = [];
	            var isActiveAvailable = false;
	            for (var _i = 0, _a = this.actor.options.container.getItemObjects(); _i < _a.length; _i++) {
	                var si = _a[_i];
	                var children = si.children.filter(function (option) { return query.test(option.text); });
	                if (children.length > 0) {
	                    if (getIndex(children, this.actor.active) >= 0) {
	                        isActiveAvailable = true;
	                    }
	                    var newSi = si.getSimilar();
	                    newSi.children = children;
	                    items.push(newSi);
	                }
	            }
	            return { items: items, isActiveAvailable: isActiveAvailable };
	        };
	        return ChildrenBehavior;
	    })();
	    SelectivityOptionsContainer.ChildrenBehavior = ChildrenBehavior;
	})(SelectivityOptionsContainer = exports.SelectivityOptionsContainer || (exports.SelectivityOptionsContainer = {}));


/***/ },

/***/ 100:
/***/ function(module, exports, __webpack_require__) {

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
	var angular2_1 = __webpack_require__(6);
	var position_1 = __webpack_require__(39);
	var selectivity_item_1 = __webpack_require__(40);
	var selectivity_options_1 = __webpack_require__(22);
	var selectivity_options_container_1 = __webpack_require__(41);
	var cssSelectivity = __webpack_require__(21);
	var SelectivityMenuContainer = (function () {
	    function SelectivityMenuContainer(element, options, loader) {
	        this.element = element;
	        this.options = options;
	        this.loader = loader;
	        this.items = [];
	        this.itemObjects = [];
	        this.data = new angular2_1.EventEmitter();
	        Object.assign(this, options);
	    }
	    SelectivityMenuContainer.prototype.position = function (hostEl) {
	        this.hostEl = hostEl;
	        this.items = this.options.container.getItemObjects();
	        this.active = this.items[0].subMenu.items[0];
	        this.display = 'block';
	        var parentPosition = position_1.positionService.position(hostEl.nativeElement);
	        var p = position_1.positionService
	            .positionElements(hostEl.nativeElement, this.element.nativeElement.children[0], this.placement, false);
	        this.top = p.top + 'px';
	        this.left = p.left + 'px';
	        this.width = parentPosition.width + 'px';
	    };
	    SelectivityMenuContainer.prototype.isActive = function (value) {
	        return this.active.text === value.text;
	    };
	    SelectivityMenuContainer.prototype.doActive = function (value, e) {
	        this.active = value;
	        this.itemObjects = this.active.subMenu.items.map(function (item) { return new selectivity_item_1.SelectivityItem(item); });
	        this.show(position_1.positionService.position(e.srcElement));
	    };
	    SelectivityMenuContainer.prototype.selectActive = function (value, e) {
	        var _this = this;
	        if (!this._popup) {
	            this.doActive(value, e);
	            return;
	        }
	        this._popup.then(function (componentRef) {
	            componentRef.dispose();
	            _this._popup = null;
	            _this.doActive(value, e);
	            return componentRef;
	        });
	    };
	    SelectivityMenuContainer.prototype.show = function (position) {
	        var _this = this;
	        var options = new selectivity_options_1.SelectivityOptions({
	            placement: 'top-right',
	            selectivity: this.options.selectivity,
	            container: this
	        });
	        var binding = angular2_1.Injector.resolve([
	            angular2_1.bind(selectivity_options_1.SelectivityOptions).toValue(options)
	        ]);
	        var expectedPopup = selectivity_options_container_1.SelectivityOptionsContainer;
	        this._popup = this.loader
	            .loadNextToLocation(expectedPopup, this.element, binding)
	            .then(function (componentRef) {
	            componentRef.instance.position(_this.hostEl, position);
	            _this.element.nativeElement.focus();
	            return componentRef;
	        });
	    };
	    SelectivityMenuContainer.prototype.hide = function () {
	        var _this = this;
	        if (this._popup) {
	            this._popup.then(function (componentRef) {
	                componentRef.dispose();
	                _this._popup = null;
	                return componentRef;
	            });
	        }
	    };
	    SelectivityMenuContainer.prototype.getItemObjects = function () {
	        return this.itemObjects;
	    };
	    SelectivityMenuContainer.prototype.hasSearchInput = function () {
	        return this.active.subMenu.options.showSearchInput;
	    };
	    SelectivityMenuContainer = __decorate([
	        angular2_1.Component({
	            selector: 'selectivity-menu-container',
	            events: ['data']
	        }),
	        angular2_1.View({
	            template: "\n<div class=\"selectivity-dropdown\"\n     [ng-style]=\"{top: top, left: left, width: width, display: display}\">\n  <div class=\"selectivity-results-container\">\n    <div *ng-for=\"#i of items\"\n         (mouseenter)=\"selectActive(i, $event)\"\n         [ng-class]=\"{highlight: isActive(i)}\"\n         class=\"selectivity-result-item\">{{i.text}}<i class=\"selectivity-submenu-icon fa fa-chevron-right\"></i></div>\n  </div>\n</div>\n  ",
	            styles: [cssSelectivity],
	            directives: [angular2_1.CORE_DIRECTIVES, angular2_1.FORM_DIRECTIVES, angular2_1.NgClass, angular2_1.NgStyle],
	            encapsulation: angular2_1.ViewEncapsulation.None
	        }), 
	        __metadata('design:paramtypes', [angular2_1.ElementRef, selectivity_options_1.SelectivityOptions, angular2_1.DynamicComponentLoader])
	    ], SelectivityMenuContainer);
	    return SelectivityMenuContainer;
	})();
	exports.SelectivityMenuContainer = SelectivityMenuContainer;


/***/ },

/***/ 101:
/***/ function(module, exports) {

	var SelectivitySubMenu = (function () {
	    function SelectivitySubMenu(source, parent) {
	        this.parent = parent;
	        this.options = {};
	        this.items = source.items;
	        for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
	            var o = _a[_i];
	            if (o !== 'items') {
	                this.options[o] = source[o];
	            }
	        }
	    }
	    return SelectivitySubMenu;
	})();
	exports.SelectivitySubMenu = SelectivitySubMenu;


/***/ },

/***/ 102:
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
	var angular2_1 = __webpack_require__(6);
	var selectivity_item_1 = __webpack_require__(40);
	var selectivity_options_1 = __webpack_require__(22);
	var selectivity_menu_container_1 = __webpack_require__(100);
	var selectivity_options_container_1 = __webpack_require__(41);
	var cssSelectivity = __webpack_require__(21);
	var Selectivity = (function () {
	    function Selectivity(element, loader) {
	        this.element = element;
	        this.loader = loader;
	        this.data = new angular2_1.EventEmitter();
	        this.multiple = false;
	        this.selected = new angular2_1.EventEmitter();
	        this.removed = new angular2_1.EventEmitter();
	        this.allowClear = false;
	        this.placeholder = '';
	        this.initData = [];
	        this._items = [];
	        this._itemObjects = [];
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
	    Object.defineProperty(Selectivity.prototype, "items", {
	        get: function () {
	            return this._items;
	        },
	        set: function (value) {
	            this._items = value;
	            this._itemObjects = this._items.map(function (item) { return new selectivity_item_1.SelectivityItem(item); });
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
	    Selectivity.prototype.onInit = function () {
	        this.offSideClickHandler = this.getOffSideClickHandler(this);
	        document.addEventListener('click', this.offSideClickHandler);
	        if (this.initData) {
	            this.active = this.initData.map(function (d) { return new selectivity_item_1.SelectivityItem(d); });
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
	        var options = new selectivity_options_1.SelectivityOptions({
	            placement: 'bottom-left',
	            selectivity: this,
	            container: this
	        });
	        var binding = angular2_1.Injector.resolve([
	            angular2_1.bind(selectivity_options_1.SelectivityOptions).toValue(options)
	        ]);
	        var expectedPopup = this.items[0].submenu ?
	            selectivity_menu_container_1.SelectivityMenuContainer :
	            selectivity_options_container_1.SelectivityOptionsContainer;
	        this._popup = this.loader
	            .loadNextToLocation(expectedPopup, this.element, binding)
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
	    Selectivity.prototype.getItemObjects = function () {
	        return this.itemObjects;
	    };
	    Selectivity.prototype.hasSearchInput = function () {
	        if (this.multiple === true) {
	            return false;
	        }
	        return this.showSearchInputInDropdown;
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


/***/ }

});
//# sourceMappingURL=angular2-selectivity.js.map