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
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList'); //为了在siteList中寻找last，生成一个$siteList变量

var $lastLi = $siteList.find('li.last'); //为了把新增的li增加到last前一个，生成一个$lastLi变量

var x = localStorage.getItem('x'); //获取上次存的'x'

var xObject = JSON.parse(x); //恢复成数组

var hashMap = xObject || [//如果xObject不是空，就获取它的值，如果是空，就加载后面的内容
{
  logo: 'A',
  url: 'https://baidu.com'
}, {
  logo: 'B',
  url: 'https://bilibili.con'
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '') //此处不能直接return url，因为此时的url是不变的
  .replace('http://').replace('www.', '').replace(/\/.*/, ''); //删除点后面的所有内容
};

var render = function render() {
  $siteList.find('li:not(.last)').remove(); //render前要先删除

  hashMap.forEach(function (node, index) {
    //创建的时候同时生成下标，有问题查forEach
    var $li = $("<li>\n            <div class=\"site\">\n                <div class=\"logo\">".concat(node.logo, "</div>\n                <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n                <div class=\"closeWrapper\">\n                    <svg class=\"icon\">\n                    <use xlink:href=\"#icon-close\"></use>\n                    </svg>\n                </div>\n            </div>\n        </li>")).insertBefore($lastLi);
    $li.on('click', function () {
      //用JS实现跳转
      window.open(node.url);
    });
    $li.on('click', '.closeWrapper', function (e) {
      e.stopPropagation(); //阻止冒泡

      hashMap.splice(index, 1); //删除第index个内容

      render(); //渲染最新的hashMap
    });
  });
};

render();
$('.addSite').on('click', function () {
  console.log('111');
  var url = window.prompt('请输入您想添加的网站地址'); //将用户输入的内容保存至url变量

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  } //根据url变量，修改hashMap变量


  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    //将精简过的用户输入的网址的首字母变为大写，存在logo中
    logoType: 'text',
    url: url
  });
  render();
}); //用户退出前要存储，查到用户关闭的事件，进行监听

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap); //将hashMap变成字符串

  localStorage.setItem('x', string); //setItem只接受字符串
};

$(document).on('keypress', function (e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.bef99b3c.js.map