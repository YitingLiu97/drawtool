// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/vector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sub = sub;
exports.add = add;
exports.magnitude = magnitude;
exports.normalize = normalize;
exports.distance = distance;
exports.pointsAlongLine = pointsAlongLine;
exports.random = random;

function sub(a, b) {
  return {
    x: b.x - a.x,
    y: b.y - a.y
  };
}

function add(a, b) {
  return {
    x: b.x + a.x,
    y: b.y + a.y
  };
}

function magnitude(a) {
  return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
}

function normalize(a) {
  var mag = magnitude(a);
  return {
    x: a.x / mag,
    y: a.y / mag
  };
}

function scale(a, s) {
  return {
    x: a.x * s,
    y: a.y * s
  };
}

function distance(aX, aY, bX, bY) {
  return Math.sqrt(Math.pow(aX - bX, 2) + Math.pow(aY - bY, 2));
}

function random(n) {
  return (Math.random() - 0.5) * n;
}

function pointsAlongLine(startx, starty, endx, endy, spacing) {
  var dist = distance(startx, starty, endx, endy);
  var points = [];
  var start = {
    x: startx,
    y: starty
  };
  var end = {
    x: endx,
    y: endy
  };

  for (var d = 0; d <= dist + 1; d += spacing) {
    var relative = sub(end, start);
    var delta = scale(normalize(relative), -d);
    var point = add(start, delta);
    points.push(point);
    if (points.length >= 10000) break;
  }

  return points;
}
},{}],"src/classNotes.js":[function(require,module,exports) {
"use strict";

var _vector = require("./vector.js");

// import "./styles.css";
// import { saveAs } from 'file-saver';
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; //random background when opening 

ctx.fillStyle = "hsl(".concat(Math.random() * 255, ", 80%, 50%)");
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "rgba(0,0,0,0.6)";
ctx.fillStyle = "rgba(0,0,0,0.6)";
var penDown = false;
var last_x = 0;
var last_y = 0;

function paintStart(x, y) {
  penDown = true;
  last_x = x;
  last_y = y;
} //start the brush in the center of the shape


function norm_random(size) {
  return (Math.random() - 0.5) * size;
} //create gradient 


var textElements = ["🐾", "👂", "👀", "💋"];
var paw = document.getElementById("paw");
var eye = document.getElementById("eye");
var ear = document.getElementById("ear");
var mouth = document.getElementById("mouth");
var clear = document.getElementById("clear");
var download = document.getElementById("download");
var state = "paw";
paw.addEventListener("click", function () {
  state = "paw";
});
eye.addEventListener("click", function () {
  state = "eye";
});
ear.addEventListener("click", function () {
  state = "ear";
});
mouth.addEventListener("click", function () {
  state = "mouth";
});
clear.addEventListener("click", function () {
  // state = "clear";
  if (state === "clear") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "hsl(".concat(Math.random() * 255, ", 80%, 50%)");
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(0,0,0,0.6)";
    ctx.fillStyle = "rgba(0,0,0,0.6)";
  }
});
download.addEventListener("click", function () {
  // state = "download";
  console.log("download!");
  canvas.toBlob(function (blob) {
    saveAs(blob, "emojiDrawing.png");
  });
});

function paintMove(x, y) {
  // let thickness = 3;
  // ctx.lineWidth = thickness;
  var interpolatedPoints = (0, _vector.pointsAlongLine)(x, y, last_x, last_y, 5); // Fill with gradient - how to make it drawing while color is changing? 
  // why it does not work on arc? works on rect 

  var grd = ctx.createLinearGradient(0, 0, 800, 0);
  grd.addColorStop(0, "red");
  grd.addColorStop(0.2, "purple");
  grd.addColorStop(0.6, "blue");
  grd.addColorStop(0.8, "yellow");
  grd.addColorStop(1, "green");
  ctx.fillStyle = grd;

  if (state === "paw") {
    // brush one - paw  
    interpolatedPoints.forEach(function (p) {
      ctx.beginPath();
      ctx.fillText("🐾", p.x + norm_random(50), p.y + norm_random(20)); // ctx.arc(p.x + norm_random(20), p.y + norm_random(10), 2, Math.PI * Math.random(), Math.PI * Math.random() * 2);

      ctx.fill();
    });
  }

  if (state === "ear") {
    // brush two - ear  
    interpolatedPoints.forEach(function (p) {
      ctx.beginPath();
      ctx.font = "18px serif";
      ctx.fillText("👂", p.x + norm_random(2), p.y + norm_random(50));
      ctx.fill();
    });
  }

  if (state === "eye") {
    // brush three - eye  
    interpolatedPoints.forEach(function (p) {
      ctx.beginPath();
      ctx.font = "18px serif";
      ctx.fillText("👀", p.x + norm_random(10), p.y + norm_random(10));
      ctx.fill();
    });
  }

  if (state === "mouth") {
    // brush four - mouth  
    interpolatedPoints.forEach(function (p) {
      ctx.beginPath();
      ctx.font = "18px serif";
      ctx.fillText("💋", p.x + norm_random(12), p.y + norm_random(10));
      ctx.fill();
    });
  } //brush four 
  // interpolatedPoints.forEach(function (p) {
  //     ctx.fillStyle = "black";
  //     ctx.beginPath();
  //      ctx.arc(p.x + norm_random(20), p.y + norm_random(10), 0.8, Math.PI, Math.PI * 2);
  //     ctx.arc(p.x + norm_random(20), p.y + norm_random(10), Math.PI * Math.random() * 10, Math.PI * Math.random(), Math.PI * Math.random() * 2);
  //     ctx.stroke();
  // });
  //brush two 
  // interpolatedPoints.forEach(function (p) {
  //     ctx.beginPath();
  //     ctx.fillRectp(.x + norm_random(20), p.y + norm_random(10), 2,1)
  //     ctx.fill();
  // });
  //brush three 
  // interpolatedPoints.forEach(function (p) {
  //     ctx.beginPath();
  //     ctx.arc(p.x + norm_random(200), p.y + norm_random(10), 0.8, Math.PI, Math.PI * 2);
  //     ctx.fill();
  // });


  last_x = x;
  last_y = y;
}

function paintEnd(x, y) {}

canvas.addEventListener("mousedown", function (evt) {
  var x = evt.clientX;
  var y = evt.clientY;
  paintStart(x, y);
});
canvas.addEventListener("touchstart", function (evt) {
  var touches = Array.from(evt.touches);
  var touch = touches[0];
  paintStart(touch.clientX, touch.clientY);
});
canvas.addEventListener("mousemove", function (evt) {
  if (penDown === false) {
    return;
  }

  var x = evt.clientX;
  var y = evt.clientY;
  paintMove(x, y);
});
canvas.addEventListener("touchmove", function (evt) {
  evt.preventDefault();
  var touches = Array.from(evt.touches);
  var touch = touches[0];
  var x = touch.clientX;
  var y = touch.clientY;
  paintMove(x, y);
});
canvas.addEventListener("touchend", function (evt) {
  var x = last_x;
  var y = last_y;
  paintEnd(x, y);
});
canvas.addEventListener("mouseout", function (evt) {
  penDown = false;
});
canvas.addEventListener("mouseup", function (evt) {
  penDown = false;
  var x = evt.clientX;
  var y = evt.clientY;
  paintEnd(x, y);
});
},{"./vector.js":"src/vector.js"}],"../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51338" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","src/classNotes.js"], null)
//# sourceMappingURL=/classNotes.99da487e.js.map