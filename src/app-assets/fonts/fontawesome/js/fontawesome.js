(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var noop = function noop() {};

  var _WINDOW = {};
  var _DOCUMENT = {};
  var _MUTATION_OBSERVER = null;
  var _PERFORMANCE = {
    mark: noop,
    measure: noop
  };

  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
    if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER = MutationObserver;
    if (typeof performance !== 'undefined') _PERFORMANCE = performance;
  } catch (e) {}

  var _ref = _WINDOW.navigator || {},
      _ref$userAgent = _ref.userAgent,
      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;

  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var MUTATION_OBSERVER = _MUTATION_OBSERVER;
  var PERFORMANCE = _PERFORMANCE;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  var UNITS_IN_GRID = 16;
  var DEFAULT_FAMILY_PREFIX = 'fa';
  var DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';
  var DATA_FA_I2SVG = 'data-fa-i2svg';
  var DATA_FA_PSEUDO_ELEMENT = 'data-fa-pseudo-element';
  var DATA_PREFIX = 'data-prefix';
  var DATA_ICON = 'data-icon';
  var HTML_CLASS_I2SVG_BASE_CLASS = 'fontawesome-i2svg';
  var TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = ['HTML', 'HEAD', 'STYLE', 'SCRIPT'];
  var PRODUCTION = function () {
    try {
      return "production" === 'production';
    } catch (e) {
      return false;
    }
  }();
  var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  var ATTRIBUTES_WATCHED_FOR_MUTATION = ['class', 'data-prefix', 'data-icon', 'data-fa-transform', 'data-fa-mask'];
  var RESERVED_CLASSES = ['xs', 'sm', 'lg', 'fw', 'ul', 'li', 'border', 'pull-left', 'pull-right', 'spin', 'pulse', 'rotate-90', 'rotate-180', 'rotate-270', 'flip-horizontal', 'flip-vertical', 'stack', 'stack-1x', 'stack-2x', 'inverse', 'layers', 'layers-text', 'layers-counter'].concat(oneToTen.map(function (n) {
    return "".concat(n, "x");
  })).concat(oneToTwenty.map(function (n) {
    return "w-".concat(n);
  }));

  var initial = WINDOW.FontAwesomeConfig || {};

  function getAttrConfig(attr) {
    var element = DOCUMENT.querySelector('script[' + attr + ']');

    if (element) {
      return element.getAttribute(attr);
    }
  }

  function coerce(val) {
    // Getting an empty string will occur if the attribute is set on the HTML tag but without a value
    // We'll assume that this is an indication that it should be toggled to true
    // For example <script data-search-pseudo-elements src="..."></script>
    if (val === '') return true;
    if (val === 'false') return false;
    if (val === 'true') return true;
    return val;
  }

  if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {
    var attrs = [['data-family-prefix', 'familyPrefix'], ['data-replacement-class', 'replacementClass'], ['data-auto-replace-svg', 'autoReplaceSvg'], ['data-auto-add-css', 'autoAddCss'], ['data-auto-a11y', 'autoA11y'], ['data-search-pseudo-elements', 'searchPseudoElements'], ['data-observe-mutations', 'observeMutations'], ['data-keep-original-source', 'keepOriginalSource'], ['data-measure-performance', 'measurePerformance'], ['data-show-missing-icons', 'showMissingIcons']];
    attrs.forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          attr = _ref2[0],
          key = _ref2[1];

      var val = coerce(getAttrConfig(attr));

      if (val !== undefined && val !== null) {
        initial[key] = val;
      }
    });
  }

  var _default = _objectSpread({
    familyPrefix: DEFAULT_FAMILY_PREFIX,
    replacementClass: DEFAULT_REPLACEMENT_CLASS,
    autoReplaceSvg: true,
    autoAddCss: true,
    autoA11y: true,
    searchPseudoElements: false,
    observeMutations: true,
    keepOriginalSource: true,
    measurePerformance: false,
    showMissingIcons: true
  }, initial);

  if (!_default.autoReplaceSvg) _default.observeMutations = false;

  var config = _objectSpread({}, _default);

  WINDOW.FontAwesomeConfig = config;

  var w = WINDOW || {};
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w[NAMESPACE_IDENTIFIER];

  var functions = [];

  var listener = function listener() {
    DOCUMENT.removeEventListener('DOMContentLoaded', listener);
    loaded = 1;
    functions.map(function (fn) {
      return fn();
    });
  };

  var loaded = false;

  if (IS_DOM) {
    loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
    if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener);
  }

  function domready (fn) {
    if (!IS_DOM) return;
    loaded ? setTimeout(fn, 0) : functions.push(fn);
  }

  var d = UNITS_IN_GRID;
  var meaninglessTransform = {
    size: 16,
    x: 0,
    y: 0,
    rotate: 0,
    flipX: false,
    flipY: false
  };

  function isReserved(name) {
    return ~RESERVED_CLASSES.indexOf(name);
  }

  function bunker(fn) {
    try {
      fn();
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }
  function insertCss(css) {
    if (!css || !IS_DOM) {
      return;
    }

    var style = DOCUMENT.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    var headChildren = DOCUMENT.head.childNodes;
    var beforeChild = null;

    for (var i = headChildren.length - 1; i > -1; i--) {
      var child = headChildren[i];
      var tagName = (child.tagName || '').toUpperCase();

      if (['STYLE', 'LINK'].indexOf(tagName) > -1) {
        beforeChild = child;
      }
    }

    DOCUMENT.head.insertBefore(style, beforeChild);
    return css;
  }
  var idPool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  function nextUniqueId() {
    var size = 12;
    var id = '';

    while (size-- > 0) {
      id += idPool[Math.random() * 62 | 0];
    }

    return id;
  }
  function toArray(obj) {
    var array = [];

    for (var i = (obj || []).length >>> 0; i--;) {
      array[i] = obj[i];
    }

    return array;
  }
  function classArray(node) {
    if (node.classList) {
      return toArray(node.classList);
    } else {
      return (node.getAttribute('class') || '').split(' ').filter(function (i) {
        return i;
      });
    }
  }
  function getIconName(familyPrefix, cls) {
    var parts = cls.split('-');
    var prefix = parts[0];
    var iconName = parts.slice(1).join('-');

    if (prefix === familyPrefix && iconName !== '' && !isReserved(iconName)) {
      return iconName;
    } else {
      return null;
    }
  }
  function htmlEscape(str) {
    return "".concat(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function joinAttributes(attributes) {
    return Object.keys(attributes || {}).reduce(function (acc, attributeName) {
      return acc + "".concat(attributeName, "=\"").concat(htmlEscape(attributes[attributeName]), "\" ");
    }, '').trim();
  }
  function joinStyles(styles) {
    return Object.keys(styles || {}).reduce(function (acc, styleName) {
      return acc + "".concat(styleName, ": ").concat(styles[styleName], ";");
    }, '');
  }
  function transformIsMeaningful(transform) {
    return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
  }
  function transformForSvg(_ref) {
    var transform = _ref.transform,
        containerWidth = _ref.containerWidth,
        iconWidth = _ref.iconWidth;
    var outer = {
      transform: "translate(".concat(containerWidth / 2, " 256)")
    };
    var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
    var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
    var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
    var inner = {
      transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
    };
    var path = {
      transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
    };
    return {
      outer: outer,
      inner: inner,
      path: path
    };
  }
  function transformForCss(_ref2) {
    var transform = _ref2.transform,
        _ref2$width = _ref2.width,
        width = _ref2$width === void 0 ? UNITS_IN_GRID : _ref2$width,
        _ref2$height = _ref2.height,
        height = _ref2$height === void 0 ? UNITS_IN_GRID : _ref2$height,
        _ref2$startCentered = _ref2.startCentered,
        startCentered = _ref2$startCentered === void 0 ? false : _ref2$startCentered;
    var val = '';

    if (startCentered && IS_IE) {
      val += "translate(".concat(transform.x / d - width / 2, "em, ").concat(transform.y / d - height / 2, "em) ");
    } else if (startCentered) {
      val += "translate(calc(-50% + ".concat(transform.x / d, "em), calc(-50% + ").concat(transform.y / d, "em)) ");
    } else {
      val += "translate(".concat(transform.x / d, "em, ").concat(transform.y / d, "em) ");
    }

    val += "scale(".concat(transform.size / d * (transform.flipX ? -1 : 1), ", ").concat(transform.size / d * (transform.flipY ? -1 : 1), ") ");
    val += "rotate(".concat(transform.rotate, "deg) ");
    return val;
  }

  var ALL_SPACE = {
    x: 0,
    y: 0,
    width: '100%',
    height: '100%'
  };
  function makeIconMasking (_ref) {
    var children = _ref.children,
        attributes = _ref.attributes,
        main = _ref.main,
        mask = _ref.mask,
        transform = _ref.transform;
    var mainWidth = main.width,
        mainPath = main.icon;
    var maskWidth = mask.width,
        maskPath = mask.icon;
    var trans = transformForSvg({
      transform: transform,
      containerWidth: maskWidth,
      iconWidth: mainWidth
    });
    var maskRect = {
      tag: 'rect',
      attributes: _objectSpread({}, ALL_SPACE, {
        fill: 'white'
      })
    };
    var maskInnerGroup = {
      tag: 'g',
      attributes: _objectSpread({}, trans.inner),
      children: [{
        tag: 'path',
        attributes: _objectSpread({}, mainPath.attributes, trans.path, {
          fill: 'black'
        })
      }]
    };
    var maskOuterGroup = {
      tag: 'g',
      attributes: _objectSpread({}, trans.outer),
      children: [maskInnerGroup]
    };
    var maskId = "mask-".concat(nextUniqueId());
    var clipId = "clip-".concat(nextUniqueId());
    var maskTag = {
      tag: 'mask',
      attributes: _objectSpread({}, ALL_SPACE, {
        id: maskId,
        maskUnits: 'userSpaceOnUse',
        maskContentUnits: 'userSpaceOnUse'
      }),
      children: [maskRect, maskOuterGroup]
    };
    var defs = {
      tag: 'defs',
      children: [{
        tag: 'clipPath',
        attributes: {
          id: clipId
        },
        children: [maskPath]
      }, maskTag]
    };
    children.push(defs, {
      tag: 'rect',
      attributes: _objectSpread({
        fill: 'currentColor',
        'clip-path': "url(#".concat(clipId, ")"),
        mask: "url(#".concat(maskId, ")")
      }, ALL_SPACE)
    });
    return {
      children: children,
      attributes: attributes
    };
  }

  function makeIconStandard (_ref) {
    var children = _ref.children,
        attributes = _ref.attributes,
        main = _ref.main,
        transform = _ref.transform,
        styles = _ref.styles;
    var styleString = joinStyles(styles);

    if (styleString.length > 0) {
      attributes['style'] = styleString;
    }

    if (transformIsMeaningful(transform)) {
      var trans = transformForSvg({
        transform: transform,
        containerWidth: main.width,
        iconWidth: main.width
      });
      children.push({
        tag: 'g',
        attributes: _objectSpread({}, trans.outer),
        children: [{
          tag: 'g',
          attributes: _objectSpread({}, trans.inner),
          children: [{
            tag: main.icon.tag,
            children: main.icon.children,
            attributes: _objectSpread({}, main.icon.attributes, trans.path)
          }]
        }]
      });
    } else {
      children.push(main.icon);
    }

    return {
      children: children,
      attributes: attributes
    };
  }

  function asIcon (_ref) {
    var children = _ref.children,
        main = _ref.main,
        mask = _ref.mask,
        attributes = _ref.attributes,
        styles = _ref.styles,
        transform = _ref.transform;

    if (transformIsMeaningful(transform) && main.found && !mask.found) {
      var width = main.width,
          height = main.height;
      var offset = {
        x: width / height / 2,
        y: 0.5
      };
      attributes['style'] = joinStyles(_objectSpread({}, styles, {
        'transform-origin': "".concat(offset.x + transform.x / 16, "em ").concat(offset.y + transform.y / 16, "em")
      }));
    }

    return [{
      tag: 'svg',
      attributes: attributes,
      children: children
    }];
  }

  function asSymbol (_ref) {
    var prefix = _ref.prefix,
        iconName = _ref.iconName,
        children = _ref.children,
        attributes = _ref.attributes,
        symbol = _ref.symbol;
    var id = symbol === true ? "".concat(prefix, "-").concat(config.familyPrefix, "-").concat(iconName) : symbol;
    return [{
      tag: 'svg',
      attributes: {
        style: 'display: none;'
      },
      children: [{
        tag: 'symbol',
        attributes: _objectSpread({}, attributes, {
          id: id
        }),
        children: children
      }]
    }];
  }

  function makeInlineSvgAbstract(params) {
    var _params$icons = params.icons,
        main = _params$icons.main,
        mask = _params$icons.mask,
        prefix = params.prefix,
        iconName = params.iconName,
        transform = params.transform,
        symbol = params.symbol,
        title = params.title,
        extra = params.extra,
        _params$watchable = params.watchable,
        watchable = _params$watchable === void 0 ? false : _params$watchable;

    var _ref = mask.found ? mask : main,
        width = _ref.width,
        height = _ref.height;

    var widthClass = "fa-w-".concat(Math.ceil(width / height * 16));
    var attrClass = [config.replacementClass, iconName ? "".concat(config.familyPrefix, "-").concat(iconName) : '', widthClass].filter(function (c) {
      return extra.classes.indexOf(c) === -1;
    }).concat(extra.classes).join(' ');
    var content = {
      children: [],
      attributes: _objectSpread({}, extra.attributes, {
        'data-prefix': prefix,
        'data-icon': iconName,
        'class': attrClass,
        'role': 'img',
        'xmlns': 'https://www.w3.org/2000/svg',
        'viewBox': "0 0 ".concat(width, " ").concat(height)
      })
    };

    if (watchable) {
      content.attributes[DATA_FA_I2SVG] = '';
    }

    if (title) content.children.push({
      tag: 'title',
      attributes: {
        id: content.attributes['aria-labelledby'] || "title-".concat(nextUniqueId())
      },
      children: [title]
    });

    var args = _objectSpread({}, content, {
      prefix: prefix,
      iconName: iconName,
      main: main,
      mask: mask,
      transform: transform,
      symbol: symbol,
      styles: extra.styles
    });

    var _ref2 = mask.found && main.found ? makeIconMasking(args) : makeIconStandard(args),
        children = _ref2.children,
        attributes = _ref2.attributes;

    args.children = children;
    args.attributes = attributes;

    if (symbol) {
      return asSymbol(args);
    } else {
      return asIcon(args);
    }
  }
  function makeLayersTextAbstract(params) {
    var content = params.content,
        width = params.width,
        height = params.height,
        transform = params.transform,
        title = params.title,
        extra = params.extra,
        _params$watchable2 = params.watchable,
        watchable = _params$watchable2 === void 0 ? false : _params$watchable2;

    var attributes = _objectSpread({}, extra.attributes, title ? {
      'title': title
    } : {}, {
      'class': extra.classes.join(' ')
    });

    if (watchable) {
      attributes[DATA_FA_I2SVG] = '';
    }

    var styles = _objectSpread({}, extra.styles);

    if (transformIsMeaningful(transform)) {
      styles['transform'] = transformForCss({
        transform: transform,
        startCentered: true,
        width: width,
        height: height
      });
      styles['-webkit-transform'] = styles['transform'];
    }

    var styleString = joinStyles(styles);

    if (styleString.length > 0) {
      attributes['style'] = styleString;
    }

    var val = [];
    val.push({
      tag: 'span',
      attributes: attributes,
      children: [content]
    });

    if (title) {
      val.push({
        tag: 'span',
        attributes: {
          class: 'sr-only'
        },
        children: [title]
      });
    }

    return val;
  }
  function makeLayersCounterAbstract(params) {
    var content = params.content,
        title = params.title,
        extra = params.extra;

    var attributes = _objectSpread({}, extra.attributes, title ? {
      'title': title
    } : {}, {
      'class': extra.classes.join(' ')
    });

    var styleString = joinStyles(extra.styles);

    if (styleString.length > 0) {
      attributes['style'] = styleString;
    }

    var val = [];
    val.push({
      tag: 'span',
      attributes: attributes,
      children: [content]
    });

    if (title) {
      val.push({
        tag: 'span',
        attributes: {
          class: 'sr-only'
        },
        children: [title]
      });
    }

    return val;
  }

  var noop$1 = function noop() {};

  var p = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
    mark: noop$1,
    measure: noop$1
  };
  var preamble = "FA \"5.6.3\"";

  var begin = function begin(name) {
    p.mark("".concat(preamble, " ").concat(name, " begins"));
    return function () {
      return end(name);
    };
  };

  var end = function end(name) {
    p.mark("".concat(preamble, " ").concat(name, " ends"));
    p.measure("".concat(preamble, " ").concat(name), "".concat(preamble, " ").concat(name, " begins"), "".concat(preamble, " ").concat(name, " ends"));
  };

  var perf = {
    begin: begin,
    end: end
  };

  /**
   * Internal helper to bind a function known to have 4 arguments
   * to a given context.
   */

  var bindInternal4 = function bindInternal4(func, thisContext) {
    return function (a, b, c, d) {
      return func.call(thisContext, a, b, c, d);
    };
  };

  /**
   * # Reduce
   *
   * A fast object `.reduce()` implementation.
   *
   * @param  {Object}   subject      The object to reduce over.
   * @param  {Function} fn           The reducer function.
   * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
   * @param  {Object}   thisContext  The context for the reducer.
   * @return {mixed}                 The final result.
   */


  var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
    var keys = Object.keys(subject),
        length = keys.length,
        iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
        i,
        key,
        result;

    if (initialValue === undefined) {
      i = 1;
      result = subject[keys[0]];
    } else {
      i = 0;
      result = initialValue;
    }

    for (; i < length; i++) {
      key = keys[i];
      result = iterator(result, subject[key], key, subject);
    }

    return result;
  };

  var styles = namespace.styles,
      shims = namespace.shims;
  var _byUnicode = {};
  var _byLigature = {};
  var _byOldName = {};
  var build = function build() {
    var lookup = function lookup(reducer) {
      return reduce(styles, function (o, style, prefix) {
        o[prefix] = reduce(style, reducer, {});
        return o;
      }, {});
    };

    _byUnicode = lookup(function (acc, icon, iconName) {
      acc[icon[3]] = iconName;
      return acc;
    });
    _byLigature = lookup(function (acc, icon, iconName) {
      var ligatures = icon[2];
      acc[iconName] = iconName;
      ligatures.forEach(function (ligature) {
        acc[ligature] = iconName;
      });
      return acc;
    });
    var hasRegular = 'far' in styles;
    _byOldName = reduce(shims, function (acc, shim) {
      var oldName = shim[0];
      var prefix = shim[1];
      var iconName = shim[2];

      if (prefix === 'far' && !hasRegular) {
        prefix = 'fas';
      }

      acc[oldName] = {
        prefix: prefix,
        iconName: iconName
      };
      return acc;
    }, {});
  };
  build();
  function byUnicode(prefix, unicode) {
    return _byUnicode[prefix][unicode];
  }
  function byLigature(prefix, ligature) {
    return _byLigature[prefix][ligature];
  }
  function byOldName(name) {
    return _byOldName[name] || {
      prefix: null,
      iconName: null
    };
  }

  var styles$1 = namespace.styles;
  var emptyCanonicalIcon = function emptyCanonicalIcon() {
    return {
      prefix: null,
      iconName: null,
      rest: []
    };
  };
  function getCanonicalIcon(values) {
    return values.reduce(function (acc, cls) {
      var iconName = getIconName(config.familyPrefix, cls);

      if (styles$1[cls]) {
        acc.prefix = cls;
      } else if (iconName) {
        var shim = acc.prefix === 'fa' ? byOldName(iconName) : {};
        acc.iconName = shim.iconName || iconName;
        acc.prefix = shim.prefix || acc.prefix;
      } else if (cls !== config.replacementClass && cls.indexOf('fa-w-') !== 0) {
        acc.rest.push(cls);
      }

      return acc;
    }, emptyCanonicalIcon());
  }
  function iconFromMapping(mapping, prefix, iconName) {
    if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
      return {
        prefix: prefix,
        iconName: iconName,
        icon: mapping[prefix][iconName]
      };
    }
  }

  function toHtml(abstractNodes) {
    var tag = abstractNodes.tag,
        _abstractNodes$attrib = abstractNodes.attributes,
        attributes = _abstractNodes$attrib === void 0 ? {} : _abstractNodes$attrib,
        _abstractNodes$childr = abstractNodes.children,
        children = _abstractNodes$childr === void 0 ? [] : _abstractNodes$childr;

    if (typeof abstractNodes === 'string') {
      return htmlEscape(abstractNodes);
    } else {
      return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(''), "</").concat(tag, ">");
    }
  }

  var noop$2 = function noop() {};

  function isWatched(node) {
    var i2svg = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;
    return typeof i2svg === 'string';
  }

  function getMutator() {
    if (config.autoReplaceSvg === true) {
      return mutators.replace;
    }

    var mutator = mutators[config.autoReplaceSvg];
    return mutator || mutators.replace;
  }

  var mutators = {
    replace: function replace(mutation) {
      var node = mutation[0];
      var abstract = mutation[1];
      var newOuterHTML = abstract.map(function (a) {
        return toHtml(a);
      }).join('\n');

      if (node.parentNode && node.outerHTML) {
        node.outerHTML = newOuterHTML + (config.keepOriginalSource && node.tagName.toLowerCase() !== 'svg' ? "<!-- ".concat(node.outerHTML, " -->") : '');
      } else if (node.parentNode) {
        var newNode = document.createElement('span');
        node.parentNode.replaceChild(newNode, node);
        newNode.outerHTML = newOuterHTML;
      }
    },
    nest: function nest(mutation) {
      var node = mutation[0];
      var abstract = mutation[1]; // If we already have a replaced node we do not want to continue nesting within it.
      // Short-circuit to the standard replacement

      if (~classArray(node).indexOf(config.replacementClass)) {
        return mutators.replace(mutation);
      }

      var forSvg = new RegExp("".concat(config.familyPrefix, "-.*"));
      delete abstract[0].attributes.style;
      var splitClasses = abstract[0].attributes.class.split(' ').reduce(function (acc, cls) {
        if (cls === config.replacementClass || cls.match(forSvg)) {
          acc.toSvg.push(cls);
        } else {
          acc.toNode.push(cls);
        }

        return acc;
      }, {
        toNode: [],
        toSvg: []
      });
      abstract[0].attributes.class = splitClasses.toSvg.join(' ');
      var newInnerHTML = abstract.map(function (a) {
        return toHtml(a);
      }).join('\n');
      node.setAttribute('class', splitClasses.toNode.join(' '));
      node.setAttribute(DATA_FA_I2SVG, '');
      node.innerHTML = newInnerHTML;
    }
  };
  function perform(mutations, callback) {
    var callbackFunction = typeof callback === 'function' ? callback : noop$2;

    if (mutations.length === 0) {
      callbackFunction();
    } else {
      var frame = WINDOW.requestAnimationFrame || function (op) {
        return op();
      };

      frame(function () {
        var mutator = getMutator();
        var mark = perf.begin('mutate');
        mutations.map(mutator);
        mark();
        callbackFunction();
      });
    }
  }
  var disabled = false;
  function disableObservation(operation) {
    disabled = true;
    operation();
    disabled = false;
  }
  var mo = null;
  function observe(options) {
    if (!MUTATION_OBSERVER) {
      return;
    }

    if (!config.observeMutations) {
      return;
    }

    var treeCallback = options.treeCallback,
        nodeCallback = options.nodeCallback,
        pseudoElementsCallback = options.pseudoElementsCallback,
        _options$observeMutat = options.observeMutationsRoot,
        observeMutationsRoot = _options$observeMutat === void 0 ? DOCUMENT.body : _options$observeMutat;
    mo = new MUTATION_OBSERVER(function (objects) {
      if (disabled) return;
      toArray(objects).forEach(function (mutationRecord) {
        if (mutationRecord.type === 'childList' && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
          if (config.searchPseudoElements) {
            pseudoElementsCallback(mutationRecord.target);
          }

          treeCallback(mutationRecord.target);
        }

        if (mutationRecord.type === 'attributes' && mutationRecord.target.parentNode && config.searchPseudoElements) {
          pseudoElementsCallback(mutationRecord.target.parentNode);
        }

        if (mutationRecord.type === 'attributes' && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
          if (mutationRecord.attributeName === 'class') {
            var _getCanonicalIcon = getCanonicalIcon(classArray(mutationRecord.target)),
                prefix = _getCanonicalIcon.prefix,
                iconName = _getCanonicalIcon.iconName;

            if (prefix) mutationRecord.target.setAttribute('data-prefix', prefix);
            if (iconName) mutationRecord.target.setAttribute('data-icon', iconName);
          } else {
            nodeCallback(mutationRecord.target);
          }
        }
      });
    });
    if (!IS_DOM) return;
    mo.observe(observeMutationsRoot, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true
    });
  }
  function disconnect() {
    if (!mo) return;
    mo.disconnect();
  }

  function styleParser (node) {
    var style = node.getAttribute('style');
    var val = [];

    if (style) {
      val = style.split(';').reduce(function (acc, style) {
        var styles = style.split(':');
        var prop = styles[0];
        var value = styles.slice(1);

        if (prop && value.length > 0) {
          acc[prop] = value.join(':').trim();
        }

        return acc;
      }, {});
    }

    return val;
  }

  function toHex(unicode) {
    var result = '';

    for (var i = 0; i < unicode.length; i++) {
      var hex = unicode.charCodeAt(i).toString(16);
      result += ('000' + hex).slice(-4);
    }

    return result;
  }

  function classParser (node) {
    var existingPrefix = node.getAttribute('data-prefix');
    var existingIconName = node.getAttribute('data-icon');
    var innerText = node.innerText !== undefined ? node.innerText.trim() : '';
    var val = getCanonicalIcon(classArray(node));

    if (existingPrefix && existingIconName) {
      val.prefix = existingPrefix;
      val.iconName = existingIconName;
    }

    if (val.prefix && innerText.length > 1) {
      val.iconName = byLigature(val.prefix, node.innerText);
    } else if (val.prefix && innerText.length === 1) {
      val.iconName = byUnicode(val.prefix, toHex(node.innerText));
    }

    return val;
  }

  var parseTransformString = function parseTransformString(transformString) {
    var transform = {
      size: 16,
      x: 0,
      y: 0,
      flipX: false,
      flipY: false,
      rotate: 0
    };

    if (!transformString) {
      return transform;
    } else {
      return transformString.toLowerCase().split(' ').reduce(function (acc, n) {
        var parts = n.toLowerCase().split('-');
        var first = parts[0];
        var rest = parts.slice(1).join('-');

        if (first && rest === 'h') {
          acc.flipX = true;
          return acc;
        }

        if (first && rest === 'v') {
          acc.flipY = true;
          return acc;
        }

        rest = parseFloat(rest);

        if (isNaN(rest)) {
          return acc;
        }

        switch (first) {
          case 'grow':
            acc.size = acc.size + rest;
            break;

          case 'shrink':
            acc.size = acc.size - rest;
            break;

          case 'left':
            acc.x = acc.x - rest;
            break;

          case 'right':
            acc.x = acc.x + rest;
            break;

          case 'up':
            acc.y = acc.y - rest;
            break;

          case 'down':
            acc.y = acc.y + rest;
            break;

          case 'rotate':
            acc.rotate = acc.rotate + rest;
            break;
        }

        return acc;
      }, transform);
    }
  };
  function transformParser (node) {
    return parseTransformString(node.getAttribute('data-fa-transform'));
  }

  function symbolParser (node) {
    var symbol = node.getAttribute('data-fa-symbol');
    return symbol === null ? false : symbol === '' ? true : symbol;
  }

  function attributesParser (node) {
    var extraAttributes = toArray(node.attributes).reduce(function (acc, attr) {
      if (acc.name !== 'class' && acc.name !== 'style') {
        acc[attr.name] = attr.value;
      }

      return acc;
    }, {});
    var title = node.getAttribute('title');

    if (config.autoA11y) {
      if (title) {
        extraAttributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(nextUniqueId());
      } else {
        extraAttributes['aria-hidden'] = 'true';
      }
    }

    return extraAttributes;
  }

  function maskParser (node) {
    var mask = node.getAttribute('data-fa-mask');

    if (!mask) {
      return emptyCanonicalIcon();
    } else {
      return getCanonicalIcon(mask.split(' ').map(function (i) {
        return i.trim();
      }));
    }
  }

  var blankMeta = {
    iconName: null,
    title: null,
    prefix: null,
    transform: meaninglessTransform,
    symbol: false,
    mask: null,
    extra: {
      classes: [],
      styles: {},
      attributes: {}
    }
  };
  function parseMeta(node) {
    var _classParser = classParser(node),
        iconName = _classParser.iconName,
        prefix = _classParser.prefix,
        extraClasses = _classParser.rest;

    var extraStyles = styleParser(node);
    var transform = transformParser(node);
    var symbol = symbolParser(node);
    var extraAttributes = attributesParser(node);
    var mask = maskParser(node);
    return {
      iconName: iconName,
      title: node.getAttribute('title'),
      prefix: prefix,
      transform: transform,
      symbol: symbol,
      mask: mask,
      extra: {
        classes: extraClasses,
        styles: extraStyles,
        attributes: extraAttributes
      }
    };
  }

  function MissingIcon(error) {
    this.name = 'MissingIcon';
    this.message = error || 'Icon unavailable';
    this.stack = new Error().stack;
  }
  MissingIcon.prototype = Object.create(Error.prototype);
  MissingIcon.prototype.constructor = MissingIcon;

  var FILL = {
    fill: 'currentColor'
  };
  var ANIMATION_BASE = {
    attributeType: 'XML',
    repeatCount: 'indefinite',
    dur: '2s'
  };
  var RING = {
    tag: 'path',
    attributes: _objectSpread({}, FILL, {
      d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
    })
  };

  var OPACITY_ANIMATE = _objectSpread({}, ANIMATION_BASE, {
    attributeName: 'opacity'
  });

  var DOT = {
    tag: 'circle',
    attributes: _objectSpread({}, FILL, {
      cx: '256',
      cy: '364',
      r: '28'
    }),
    children: [{
      tag: 'animate',
      attributes: _objectSpread({}, ANIMATION_BASE, {
        attributeName: 'r',
        values: '28;14;28;28;14;28;'
      })
    }, {
      tag: 'animate',
      attributes: _objectSpread({}, OPACITY_ANIMATE, {
        values: '1;0;1;1;0;1;'
      })
    }]
  };
  var QUESTION = {
    tag: 'path',
    attributes: _objectSpread({}, FILL, {
      opacity: '1',
      d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
    }),
    children: [{
      tag: 'animate',
      attributes: _objectSpread({}, OPACITY_ANIMATE, {
        values: '1;0;0;0;0;1;'
      })
    }]
  };
  var EXCLAMATION = {
    tag: 'path',
    attributes: _objectSpread({}, FILL, {
      opacity: '0',
      d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
    }),
    children: [{
      tag: 'animate',
      attributes: _objectSpread({}, OPACITY_ANIMATE, {
        values: '0;0;1;1;0;0;'
      })
    }]
  };
  var missing = {
    tag: 'g',
    children: [RING, DOT, QUESTION, EXCLAMATION]
  };

  var styles$2 = namespace.styles;
  var LAYERS_TEXT_CLASSNAME = 'fa-layers-text';
  var FONT_FAMILY_PATTERN = /Font Awesome 5 (Solid|Regular|Light|Brands|Free|Pro)/;
  var STYLE_TO_PREFIX = {
    'Solid': 'fas',
    'Regular': 'far',
    'Light': 'fal',
    'Brands': 'fab'
  };
  var FONT_WEIGHT_TO_PREFIX = {
    '900': 'fas',
    '400': 'far',
    '300': 'fal'
  };

  function findIcon(iconName, prefix) {
    var val = {
      found: false,
      width: 512,
      height: 512,
      icon: missing
    };

    if (iconName && prefix && styles$2[prefix] && styles$2[prefix][iconName]) {
      var icon = styles$2[prefix][iconName];
      var width = icon[0];
      var height = icon[1];
      var vectorData = icon.slice(4);
      val = {
        found: true,
        width: width,
        height: height,
        icon: {
          tag: 'path',
          attributes: {
            fill: 'currentColor',
            d: vectorData[0]
          }
        }
      };
    } else if (iconName && prefix && !config.showMissingIcons) {
      throw new MissingIcon("Icon is missing for prefix ".concat(prefix, " with icon name ").concat(iconName));
    }

    return val;
  }

  function generateSvgReplacementMutation(node, nodeMeta) {
    var iconName = nodeMeta.iconName,
        title = nodeMeta.title,
        prefix = nodeMeta.prefix,
        transform = nodeMeta.transform,
        symbol = nodeMeta.symbol,
        mask = nodeMeta.mask,
        extra = nodeMeta.extra;
    return [node, makeInlineSvgAbstract({
      icons: {
        main: findIcon(iconName, prefix),
        mask: findIcon(mask.iconName, mask.prefix)
      },
      prefix: prefix,
      iconName: iconName,
      transform: transform,
      symbol: symbol,
      mask: mask,
      title: title,
      extra: extra,
      watchable: true
    })];
  }

  function generateLayersText(node, nodeMeta) {
    var title = nodeMeta.title,
        transform = nodeMeta.transform,
        extra = nodeMeta.extra;
    var width = null;
    var height = null;

    if (IS_IE) {
      var computedFontSize = parseInt(getComputedStyle(node).fontSize, 10);
      var boundingClientRect = node.getBoundingClientRect();
      width = boundingClientRect.width / computedFontSize;
      height = boundingClientRect.height / computedFontSize;
    }

    if (config.autoA11y && !title) {
      extra.attributes['aria-hidden'] = 'true';
    }

    return [node, makeLayersTextAbstract({
      content: node.innerHTML,
      width: width,
      height: height,
      transform: transform,
      title: title,
      extra: extra,
      watchable: true
    })];
  }

  function generateMutation(node) {
    var nodeMeta = parseMeta(node);

    if (~nodeMeta.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)) {
      return generateLayersText(node, nodeMeta);
    } else {
      return generateSvgReplacementMutation(node, nodeMeta);
    }
  }

  function searchPseudoElements(root) {
    if (!IS_DOM) return;
    var end = perf.begin('searchPseudoElements');
    disableObservation(function () {
      toArray(root.querySelectorAll('*')).filter(function (n) {
        return n.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(n.tagName.toUpperCase()) && !n.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!n.parentNode || n.parentNode.tagName !== 'svg');
      }).forEach(function (node) {
        [':before', ':after'].forEach(function (pos) {
          var children = toArray(node.children);
          var alreadyProcessedPseudoElement = children.filter(function (c) {
            return c.getAttribute(DATA_FA_PSEUDO_ELEMENT) === pos;
          })[0];
          var styles = WINDOW.getComputedStyle(node, pos);
          var fontFamily = styles.getPropertyValue('font-family').match(FONT_FAMILY_PATTERN);
          var fontWeight = styles.getPropertyValue('font-weight');

          if (alreadyProcessedPseudoElement && !fontFamily) {
            // If we've already processed it but the current computed style does not result in a font-family,
            // that probably means that a class name that was previously present to make the icon has been
            // removed. So we now should delete the icon.
            node.removeChild(alreadyProcessedPseudoElement);
          } else if (fontFamily) {
            var content = styles.getPropertyValue('content');
            var prefix = ~['Light', 'Regular', 'Solid', 'Brands'].indexOf(fontFamily[1]) ? STYLE_TO_PREFIX[fontFamily[1]] : FONT_WEIGHT_TO_PREFIX[fontWeight];
            var iconName = byUnicode(prefix, toHex(content.length === 3 ? content.substr(1, 1) : content)); // Only convert the pseudo element in this :before/:after position into an icon if we haven't
            // already done so with the same prefix and iconName

            if (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconName) {
              if (alreadyProcessedPseudoElement) {
                // Delete the old one, since we're replacing it with a new one
                node.removeChild(alreadyProcessedPseudoElement);
              }

              var extra = blankMeta.extra;
              extra.attributes[DATA_FA_PSEUDO_ELEMENT] = pos;
              var abstract = makeInlineSvgAbstract(_objectSpread({}, blankMeta, {
                icons: {
                  main: findIcon(iconName, prefix),
                  mask: emptyCanonicalIcon()
                },
                prefix: prefix,
                iconName: iconName,
                extra: extra,
                watchable: true
              }));
              var element = DOCUMENT.createElement('svg');

              if (pos === ':before') {
                node.insertBefore(element, node.firstChild);
              } else {
                node.appendChild(element);
              }

              element.outerHTML = abstract.map(function (a) {
                return toHtml(a);
              }).join('\n');
            }
          }
        });
      });
    });
    end();
  }
  function onTree(root) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (!IS_DOM) return;
    var htmlClassList = DOCUMENT.documentElement.classList;

    var hclAdd = function hclAdd(suffix) {
      return htmlClassList.add("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
    };

    var hclRemove = function hclRemove(suffix) {
      return htmlClassList.remove("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
    };

    var prefixes = Object.keys(styles$2);
    var prefixesDomQuery = [".".concat(LAYERS_TEXT_CLASSNAME, ":not([").concat(DATA_FA_I2SVG, "])")].concat(prefixes.map(function (p) {
      return ".".concat(p, ":not([").concat(DATA_FA_I2SVG, "])");
    })).join(', ');

    if (prefixesDomQuery.length === 0) {
      return;
    }

    var candidates = toArray(root.querySelectorAll(prefixesDomQuery));

    if (candidates.length > 0) {
      hclAdd('pending');
      hclRemove('complete');
    } else {
      return;
    }

    var mark = perf.begin('onTree');
    var mutations = candidates.reduce(function (acc, node) {
      try {
        var mutation = generateMutation(node);

        if (mutation) {
          acc.push(mutation);
        }
      } catch (e) {
        if (!PRODUCTION) {
          if (e instanceof MissingIcon) {
            console.error(e);
          }
        }
      }

      return acc;
    }, []);
    mark();
    perform(mutations, function () {
      hclAdd('active');
      hclAdd('complete');
      hclRemove('pending');
      if (typeof callback === 'function') callback();
    });
  }
  function onNode(node) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var mutation = generateMutation(node);

    if (mutation) {
      perform([mutation], callback);
    }
  }

  var baseStyles = "svg:not(:root).svg-inline--fa{overflow:visible}.svg-inline--fa{display:inline-block;font-size:inherit;height:1em;overflow:visible;vertical-align:-.125em}.svg-inline--fa.fa-lg{vertical-align:-.225em}.svg-inline--fa.fa-w-1{width:.0625em}.svg-inline--fa.fa-w-2{width:.125em}.svg-inline--fa.fa-w-3{width:.1875em}.svg-inline--fa.fa-w-4{width:.25em}.svg-inline--fa.fa-w-5{width:.3125em}.svg-inline--fa.fa-w-6{width:.375em}.svg-inline--fa.fa-w-7{width:.4375em}.svg-inline--fa.fa-w-8{width:.5em}.svg-inline--fa.fa-w-9{width:.5625em}.svg-inline--fa.fa-w-10{width:.625em}.svg-inline--fa.fa-w-11{width:.6875em}.svg-inline--fa.fa-w-12{width:.75em}.svg-inline--fa.fa-w-13{width:.8125em}.svg-inline--fa.fa-w-14{width:.875em}.svg-inline--fa.fa-w-15{width:.9375em}.svg-inline--fa.fa-w-16{width:1em}.svg-inline--fa.fa-w-17{width:1.0625em}.svg-inline--fa.fa-w-18{width:1.125em}.svg-inline--fa.fa-w-19{width:1.1875em}.svg-inline--fa.fa-w-20{width:1.25em}.svg-inline--fa.fa-pull-left{margin-right:.3em;width:auto}.svg-inline--fa.fa-pull-right{margin-left:.3em;width:auto}.svg-inline--fa.fa-border{height:1.5em}.svg-inline--fa.fa-li{width:2em}.svg-inline--fa.fa-fw{width:1.25em}.fa-layers svg.svg-inline--fa{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0}.fa-layers{display:inline-block;height:1em;position:relative;text-align:center;vertical-align:-.125em;width:1em}.fa-layers svg.svg-inline--fa{-webkit-transform-origin:center center;transform-origin:center center}.fa-layers-counter,.fa-layers-text{display:inline-block;position:absolute;text-align:center}.fa-layers-text{left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);-webkit-transform-origin:center center;transform-origin:center center}.fa-layers-counter{background-color:#ff253a;border-radius:1em;-webkit-box-sizing:border-box;box-sizing:border-box;color:#fff;height:1.5em;line-height:1;max-width:5em;min-width:1.5em;overflow:hidden;padding:.25em;right:0;text-overflow:ellipsis;top:0;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:top right;transform-origin:top right}.fa-layers-bottom-right{bottom:0;right:0;top:auto;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:bottom right;transform-origin:bottom right}.fa-layers-bottom-left{bottom:0;left:0;right:auto;top:auto;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:bottom left;transform-origin:bottom left}.fa-layers-top-right{right:0;top:0;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:top right;transform-origin:top right}.fa-layers-top-left{left:0;right:auto;top:0;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:top left;transform-origin:top left}.fa-lg{font-size:1.3333333333em;line-height:.75em;vertical-align:-.0667em}.fa-xs{font-size:.75em}.fa-sm{font-size:.875em}.fa-1x{font-size:1em}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-6x{font-size:6em}.fa-7x{font-size:7em}.fa-8x{font-size:8em}.fa-9x{font-size:9em}.fa-10x{font-size:10em}.fa-fw{text-align:center;width:1.25em}.fa-ul{list-style-type:none;margin-left:2.5em;padding-left:0}.fa-ul>li{position:relative}.fa-li{left:-2em;position:absolute;text-align:center;width:2em;line-height:inherit}.fa-border{border:solid .08em #eee;border-radius:.1em;padding:.2em .25em .15em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa.fa-pull-left,.fab.fa-pull-left,.fal.fa-pull-left,.far.fa-pull-left,.fas.fa-pull-left{margin-right:.3em}.fa.fa-pull-right,.fab.fa-pull-right,.fal.fa-pull-right,.far.fa-pull-right,.fas.fa-pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.fa-rotate-90{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-webkit-transform:scale(-1,1);transform:scale(-1,1)}.fa-flip-vertical{-webkit-transform:scale(1,-1);transform:scale(1,-1)}.fa-flip-horizontal.fa-flip-vertical{-webkit-transform:scale(-1,-1);transform:scale(-1,-1)}:root .fa-flip-horizontal,:root .fa-flip-vertical,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-rotate-90{-webkit-filter:none;filter:none}.fa-stack{display:inline-block;height:2em;position:relative;width:2.5em}.fa-stack-1x,.fa-stack-2x{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0}.svg-inline--fa.fa-stack-1x{height:1em;width:1.25em}.svg-inline--fa.fa-stack-2x{height:2em;width:2.5em}.fa-inverse{color:#fff}.sr-only{border:0;clip:rect(0,0,0,0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.sr-only-focusable:active,.sr-only-focusable:focus{clip:auto;height:auto;margin:0;overflow:visible;position:static;width:auto}";

  function css () {
    var dfp = DEFAULT_FAMILY_PREFIX;
    var drc = DEFAULT_REPLACEMENT_CLASS;
    var fp = config.familyPrefix;
    var rc = config.replacementClass;
    var s = baseStyles;

    if (fp !== dfp || rc !== drc) {
      var dPatt = new RegExp("\\.".concat(dfp, "\\-"), 'g');
      var rPatt = new RegExp("\\.".concat(drc), 'g');
      s = s.replace(dPatt, ".".concat(fp, "-")).replace(rPatt, ".".concat(rc));
    }

    return s;
  }

  function define(prefix, icons) {
    var normalized = Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;

      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }

      return acc;
    }, {});

    if (typeof namespace.hooks.addPack === 'function') {
      namespace.hooks.addPack(prefix, normalized);
    } else {
      namespace.styles[prefix] = _objectSpread({}, namespace.styles[prefix] || {}, normalized);
    }
    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll easy the upgrade process for our users by automatically defining
     * this as well.
     */


    if (prefix === 'fas') {
      define('fa', icons);
    }
  }

  var Library =
  /*#__PURE__*/
  function () {
    function Library() {
      _classCallCheck(this, Library);

      this.definitions = {};
    }

    _createClass(Library, [{
      key: "add",
      value: function add() {
        var _this = this;

        for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
          definitions[_key] = arguments[_key];
        }

        var additions = definitions.reduce(this._pullDefinitions, {});
        Object.keys(additions).forEach(function (key) {
          _this.definitions[key] = _objectSpread({}, _this.definitions[key] || {}, additions[key]);
          define(key, additions[key]);
          build();
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        this.definitions = {};
      }
    }, {
      key: "_pullDefinitions",
      value: function _pullDefinitions(additions, definition) {
        var normalized = definition.prefix && definition.iconName && definition.icon ? {
          0: definition
        } : definition;
        Object.keys(normalized).map(function (key) {
          var _normalized$key = normalized[key],
              prefix = _normalized$key.prefix,
              iconName = _normalized$key.iconName,
              icon = _normalized$key.icon;
          if (!additions[prefix]) additions[prefix] = {};
          additions[prefix][iconName] = icon;
        });
        return additions;
      }
    }]);

    return Library;
  }();

  function prepIcon(icon) {
    var width = icon[0];
    var height = icon[1];
    var vectorData = icon.slice(4);
    return {
      found: true,
      width: width,
      height: height,
      icon: {
        tag: 'path',
        attributes: {
          fill: 'currentColor',
          d: vectorData[0]
        }
      }
    };
  }

  function ensureCss() {
    if (config.autoAddCss && !_cssInserted) {
      insertCss(css());

      _cssInserted = true;
    }
  }

  function apiObject(val, abstractCreator) {
    Object.defineProperty(val, 'abstract', {
      get: abstractCreator
    });
    Object.defineProperty(val, 'html', {
      get: function get() {
        return val.abstract.map(function (a) {
          return toHtml(a);
        });
      }
    });
    Object.defineProperty(val, 'node', {
      get: function get() {
        if (!IS_DOM) return;
        var container = DOCUMENT.createElement('div');
        container.innerHTML = val.html;
        return container.children;
      }
    });
    return val;
  }

  function findIconDefinition(params) {
    var _params$prefix = params.prefix,
        prefix = _params$prefix === void 0 ? 'fa' : _params$prefix,
        iconName = params.iconName;
    if (!iconName) return;
    return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
  }

  function resolveIcons(next) {
    return function (maybeIconDefinition) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});
      var mask = params.mask;

      if (mask) {
        mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
      }

      return next(iconDefinition, _objectSpread({}, params, {
        mask: mask
      }));
    };
  }

  var library = new Library();
  var noAuto = function noAuto() {
    config.autoReplaceSvg = false;
    config.observeMutations = false;
    disconnect();
  };
  var _cssInserted = false;
  var dom = {
    i2svg: function i2svg() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (IS_DOM) {
        ensureCss();
        var _params$node = params.node,
            node = _params$node === void 0 ? DOCUMENT : _params$node,
            _params$callback = params.callback,
            callback = _params$callback === void 0 ? function () {} : _params$callback;

        if (config.searchPseudoElements) {
          searchPseudoElements(node);
        }

        onTree(node, callback);
      }
    },
    css: css,
    insertCss: function insertCss$$1() {
      if (!_cssInserted) {
        insertCss(css());

        _cssInserted = true;
      }
    },
    watch: function watch() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var autoReplaceSvgRoot = params.autoReplaceSvgRoot,
          observeMutationsRoot = params.observeMutationsRoot;

      if (config.autoReplaceSvg === false) {
        config.autoReplaceSvg = true;
      }

      config.observeMutations = true;
      domready(function () {
        autoReplace({
          autoReplaceSvgRoot: autoReplaceSvgRoot
        });
        observe({
          treeCallback: onTree,
          nodeCallback: onNode,
          pseudoElementsCallback: searchPseudoElements,
          observeMutationsRoot: observeMutationsRoot
        });
      });
    }
  };
  var parse = {
    transform: function transform(transformString) {
      return parseTransformString(transformString);
    }
  };
  var icon = resolveIcons(function (iconDefinition) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _params$transform = params.transform,
        transform = _params$transform === void 0 ? meaninglessTransform : _params$transform,
        _params$symbol = params.symbol,
        symbol = _params$symbol === void 0 ? false : _params$symbol,
        _params$mask = params.mask,
        mask = _params$mask === void 0 ? null : _params$mask,
        _params$title = params.title,
        title = _params$title === void 0 ? null : _params$title,
        _params$classes = params.classes,
        classes = _params$classes === void 0 ? [] : _params$classes,
        _params$attributes = params.attributes,
        attributes = _params$attributes === void 0 ? {} : _params$attributes,
        _params$styles = params.styles,
        styles = _params$styles === void 0 ? {} : _params$styles;
    if (!iconDefinition) return;
    var prefix = iconDefinition.prefix,
        iconName = iconDefinition.iconName,
        icon = iconDefinition.icon;
    return apiObject(_objectSpread({
      type: 'icon'
    }, iconDefinition), function () {
      ensureCss();

      if (config.autoA11y) {
        if (title) {
          attributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(nextUniqueId());
        } else {
          attributes['aria-hidden'] = 'true';
        }
      }

      return makeInlineSvgAbstract({
        icons: {
          main: prepIcon(icon),
          mask: mask ? prepIcon(mask.icon) : {
            found: false,
            width: null,
            height: null,
            icon: {}
          }
        },
        prefix: prefix,
        iconName: iconName,
        transform: _objectSpread({}, meaninglessTransform, transform),
        symbol: symbol,
        title: title,
        extra: {
          attributes: attributes,
          styles: styles,
          classes: classes
        }
      });
    });
  });
  var text = function text(content) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _params$transform2 = params.transform,
        transform = _params$transform2 === void 0 ? meaninglessTransform : _params$transform2,
        _params$title2 = params.title,
        title = _params$title2 === void 0 ? null : _params$title2,
        _params$classes2 = params.classes,
        classes = _params$classes2 === void 0 ? [] : _params$classes2,
        _params$attributes2 = params.attributes,
        attributes = _params$attributes2 === void 0 ? {} : _params$attributes2,
        _params$styles2 = params.styles,
        styles = _params$styles2 === void 0 ? {} : _params$styles2;
    return apiObject({
      type: 'text',
      content: content
    }, function () {
      ensureCss();
      return makeLayersTextAbstract({
        content: content,
        transform: _objectSpread({}, meaninglessTransform, transform),
        title: title,
        extra: {
          attributes: attributes,
          styles: styles,
          classes: ["".concat(config.familyPrefix, "-layers-text")].concat(_toConsumableArray(classes))
        }
      });
    });
  };
  var counter = function counter(content) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _params$title3 = params.title,
        title = _params$title3 === void 0 ? null : _params$title3,
        _params$classes3 = params.classes,
        classes = _params$classes3 === void 0 ? [] : _params$classes3,
        _params$attributes3 = params.attributes,
        attributes = _params$attributes3 === void 0 ? {} : _params$attributes3,
        _params$styles3 = params.styles,
        styles = _params$styles3 === void 0 ? {} : _params$styles3;
    return apiObject({
      type: 'counter',
      content: content
    }, function () {
      ensureCss();
      return makeLayersCounterAbstract({
        content: content.toString(),
        title: title,
        extra: {
          attributes: attributes,
          styles: styles,
          classes: ["".concat(config.familyPrefix, "-layers-counter")].concat(_toConsumableArray(classes))
        }
      });
    });
  };
  var layer = function layer(assembler) {
    return apiObject({
      type: 'layer'
    }, function () {
      ensureCss();
      var children = [];
      assembler(function (args) {
        Array.isArray(args) ? args.map(function (a) {
          children = children.concat(a.abstract);
        }) : children = children.concat(args.abstract);
      });
      return [{
        tag: 'span',
        attributes: {
          class: "".concat(config.familyPrefix, "-layers")
        },
        children: children
      }];
    });
  };
  var api = {
    noAuto: noAuto,
    config: config,
    dom: dom,
    library: library,
    parse: parse,
    findIconDefinition: findIconDefinition,
    icon: icon,
    text: text,
    counter: counter,
    layer: layer,
    toHtml: toHtml
  };

  var autoReplace = function autoReplace() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _params$autoReplaceSv = params.autoReplaceSvgRoot,
        autoReplaceSvgRoot = _params$autoReplaceSv === void 0 ? DOCUMENT : _params$autoReplaceSv;
    if (Object.keys(namespace.styles).length > 0 && IS_DOM && config.autoReplaceSvg) api.dom.i2svg({
      node: autoReplaceSvgRoot
    });
  };

  function bootstrap() {
    if (IS_BROWSER) {
      if (!WINDOW.FontAwesome) {
        WINDOW.FontAwesome = api;
      }

      domready(function () {
        autoReplace();
        observe({
          treeCallback: onTree,
          nodeCallback: onNode,
          pseudoElementsCallback: searchPseudoElements
        });
      });
    }

    namespace.hooks = _objectSpread({}, namespace.hooks, {
      addPack: function addPack(prefix, icons) {
        namespace.styles[prefix] = _objectSpread({}, namespace.styles[prefix] || {}, icons);
        build();
        autoReplace();
      },
      addShims: function addShims(shims) {
        var _namespace$shims;

        (_namespace$shims = namespace.shims).push.apply(_namespace$shims, _toConsumableArray(shims));

        build();
        autoReplace();
      }
    });
  }

  bunker(bootstrap);

}());
