[一、webpack基础配置](#一、webpack基础配置)
- [1.1 概念](#11-概念)
- [1.2 安装](#12-安装)
- [1.3 配置mode\entry\output](#13-配置\mode\entry\output)
- [1.4 sourceMap](#14-sourceMap)
- [1.5 自动打包](#15-自动打包)
- [1.6 WebpackDevServer](#16-WebpackDevServer)
- [1.7 treeShaking](#17-treeShaking)
- [1.8 dev&prod分开配置](#18-dev&prod分开配置)
- [1.9 CodeSplitting](#19-CodeSplitting)
- [1.10 懒加载](#110-懒加载)
- [1.11 代码使用率优化](#111-代码使用率优化)
- [1.12 提升webpack打包的速度](#112-提升webpack打包的速度)
- [1.13 多页面文件打包](#113-多页面文件打包)
- [1.14 自定义loader](#114-自定义loader)


[二、loaders](#二、loaders)
- [2.1 概念](#21-概念)
- [2.2 文件](#22-文件)
- [2.3 JSON](#23-JSON)
- [2.4 转换编译](#24-转换编译)
- [2.5 模板](#25-模板)
- [2.6 样式](#26-样式)
- [2.7 清理和测试](#27-清理和测试)
- [2.8 框架](#28-框架)

[三、常用插件](#三、常用插件)
- [3.1 html-webpack-plugin](#31-html-webpack-plugin)
- [3.2 Promise](#32-Promise)
- [3.3 HotModuleReplacemen(HMR)](#33-HotModuleReplacemen(HMR))

# 一、webpack基础配置
## 1.1 概念
 >在模块化编程盛行的今天, 每个js,css都可以独立存在, 而每个独立存在的文件又有可能采取不同的工程化语言方法, 比如用TypeScript写js, 用sass写css等等, 这时候我们就需要用一个简单的工具, 完成这种统一编译解析输出的功能了。
 
 >webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle(包)。

## 1.2 安装
```js
npm install webpack --save-dev
npm install webpack-cli --save-dev
npx webpack
npx webpack-cli // 查当前版本号
npm info webpack // 查所有版本号
```
## 1.3 配置mode\entry\output
> package.json内的scripts内置的一个命令映射表，把复杂命令简单命名。
> mode：打包模式 1、production-代码会被压缩 2、development-代码会保持原本的缩进格式,更适合阅读

> entry: 入口起点可以配置多个。可以传入字符串、数组或对象
>用法：entry: {[entryChunkName: string]: string|Array<string>}
```js
entry: './path/to/my/entry/file.js', 
// 等于
entry: {
  main: './path/to/my/entry/file.js'
}
// 多页面应用
// ebpack 需要 3 个独立分离的依赖图（如上面的示例）。在多页应用中，每当页面跳转时,服务器将为你获取一个新的 HTML 文档。页面重新加载新文档，并且资源被重新下载。
// 根据经验：每个 HTML 文档只使用一个入口起点
entry: {
  pageOne: './src/pageOne/index.js',
  pageTwo: './src/pageTwo/index.js',
  pageThree: './src/pageThree/index.js'
}
```
>output:webpack向硬盘写入编译文件,多个入口起点只指定一个输出文件夹
```js
output: {
  filename: '[name].js', // [hash][chunkhash][name][id][query]
  path: __dirname + '/dist' // __dirname当前配置文件所在路径
}
```

```js
module.exports = {
  mode: "development",
  entry: './path/to/my/entry/file.js', //
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```
# 1.4 sourceMap
>一行错误代码不影响打包,只有在运行的时候才会报错,但是报错的时候, 我们无法从最终文件中得知, 到底是哪一个文件的哪一行出错

>sourceMap:就是一种映射关系,他能将最终打包后出错的代码所在的原始文件信息展示出来

>不同的关键词所代表的的基本含义
* cheap:只处理业务代码的错误信息, 其他的引用模块或是loader的错误予以忽略
* inline:把生成的.map文件编码成base64格式, 内嵌到最后生成的js文件中
* module:也处理module或是loader里面的错误信息
* source-map:生成一个.map文件
* eval:以eval的方式来处理业务代码, 以方便吧代码和原始文件地址进行管理

>建议在development的模式下, 采用cheap-module-eval-source-map

>建议在production的模式下,采用cheap-module-source-map
# 1.5 自动打包
>监听项目的任何一个文件，如果改动就会自动打包
package.json 
```json
"script":{
  'watch':webpack --watch
}
```
# 1.6 WebpackDevServer
>WebpackDevServer的作用就是在本地开启一个临时服务器,我们可以给这个服务器设置很多的一些配置,使得开发者可以方便的对项目进行调试
package.json 
```json
"script":{
  'watch':"webpack --watch",
  'start':"webpack-dev-server"
}
```
```js
module.exports = {
  devServer:{ // 指定临时搭建一个服务器
    contentBase: './bundle',
    open: true, // 服务启动打开浏览器
    port: 8080,
    hot: true, // 开启热服务
    hotOnly: true //当编译失败时，不刷新页面。
  }
}
```
## 1.7 treeShaking
>treeShaking 生产上打包后删除无用引入。
webpack.config.js
```js
// 没加之前：webpack打包的时候会标注某个文件最终会导出的接口都有哪些
// 添加之后：webpack打包的时候还会标注到底有哪些导出的被使用了
// 开发环境下, 为了保证能够正确给用户提示错误代码的行数信息等,即便是增加了该选项,实际导出的代码也不会进行削减
optimization:{
  usedExports:true
}
```
package.json
```json
// sideEffects:就是之排除到tree Shaking系统之外的配置:
// 第一个规则就是排除@babel/poly-fill模块
// 第二个规则就是排除所有导入的css文件
"sideEffects": [
  "@babel/poly-fill",
  "*.css"
]
```
## 1.8 dev&prod分开配置
> npm install webpack-merge --save-dev 合并webpack
webpack.common.js
```js
let path = require("path");
let htmlWebpackPlugin = require("html-webpack-plugin");
let { CleanWebpackPlugin } = require("clean-webpack-plugin");
let webpack = require("webpack");

module.exports = {
  entry: {
    index: "./src/js/index.js",
    test: "./src/js/test.js",
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, "../bundle"),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/, // 就是筛选特定的文件, 一般就是以后缀名为识别码
        use: [ // 就是采用哪个具体的loader
          {
            loader: 'file-loader',
            options: {
              outputPath: "images/"
              // limit: 1024*1024
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 2 }  },
          "sass-loader",
          "postcss-loader"
        ]
      }, 
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options:{
          "presets": [
              ["@babel/preset-env", {
                "useBuiltIns": "usage" // 相当于每个模块都添加了polyfill，
              }]
          ],
          // "plugins": [
          //   [
              // "@babel/plugin-syntax-dynamic-import" // 魔法注释动态改名
              // "@babel/plugin-transform-runtime", // 名字改成拼接形式
              // {
              //   "absoluteRuntime": false,
              //   "corejs": 2,
              //   "helpers": true,
              //   "regenerator": true,
              //   "useESModules": false
              // }
          //   ]
          // ]
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/html/template.html",
      filename: "template.html",
      chunks: ["test"],
    }),
    new htmlWebpackPlugin({
      template: "./src/html/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new CleanWebpackPlugin(),
  ]
}
```
webpack.dev.js
```js
let webpack = require("webpack");

let merge = require('webpack-merge');
let common = require('./webpack.common');
const dev = {
  mode: "development",
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: "./bundle",
    open: true,
    port: 9527,
    hot: true,
    hotOnly: true,
  },
  optimization: {
    usedExports: false,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
}

module.exports=merge(dev, common);
```
webpack.pro.js
```js
let merge = require('webpack-merge');
let common = require('./webpack.common');
const production = {
  mode: "production",
  // devtool: 'cheap-module-source-map',
  optimization: {
    usedExports: false,
    splitChunks: {
      chunks: 'all', // all initial async
      // minSize: 30, // 小于这个文件体积，就不分割了
      // maxSize: 0,
      minChunks: 1, // 源码共享的块数,引入几次以上才分割
      maxAsyncRequests: 5,
      maxInitialRequests: 2,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,   // cacheGroups是否可用
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // modules模块
          priority: -30 // 优先级
        },
        default: {
          minChunks: 1, // 引入1 次时
          priority: -20,
          reuseExistingChunk: true // 再次复用存在的打包块，不需求重复打包
        }
      }
    }
  },
}

module.exports=merge(production, common);
```
package.json
```json
"scripts": {
    "bundle": "webpack",
    "devBundle": "webpack --config ./build/webpack.dev.js --profile --json > stats.json",
    "watch": "webpack --watch --config ./build/webpack.dev.js",
    "start": "webpack-dev-server",
    "dev": "webpack-dev-server --config ./build/webpack.dev.js",
    "pro": "webpack --config ./build/webpack.pro.js"
  },
```
## 1.9 CodeSplitting
>在之前的项目中, 无论引用了多少插件, 最终输出的还是单个js文件, 这会造成几个问题:
* 单文件过大
* 业务代码和环境代码压缩到一起了
* 单次修改业务代码,就得重新打包所有的文件
* 每次修改业务代码,最终的打包出来的js就是一个新的文件(即便只是修改了一个字母),这样就会导致用户浏览器无法缓存文件
同步代码:
```js
// 只需要在webpack.common.js中配置optimization的配置即可
optimization: {
    splitChunks: {
      chunks: 'all', // all initial async
      // minSize: 30, // 小于这个文件体积，就不分割了
      // maxSize: 0, //选填,如果配置了, 比如值为50000, 那么单个被独立出来的引用包如果大于50000就会再次被分割(但是如果这个库是无法拆分的,那么这个maxSize就是没啥用的了)
      minChunks: 1, // 源码共享的块数,引入几次以上才分割
      maxAsyncRequests: 5, //最大引用的模块数,webpack在该值设定的上限前会正确打包,后面的就不会再分割了
      maxInitialRequests: 2, //最大入口文件引用的模块数
      automaticNameDelimiter: '~',// :前缀和名字之间的连接符
      automaticNameMaxLength: 30,
      name: true,   // true的话cacheGroups才可用
      cacheGroups: {
        vendors: { // 打包的分组名称
          test: /[\\/]node_modules[\\/]/, // 判断引入的库是否在modules的目录下，是的话就进行代码分割打包
          priority: -10 // 优先级
        },
        default: {
          minChunks: 1, // 引入1 次时
          priority: -20,
          reuseExistingChunk: true // 再次复用存在的打包块，不需求重复打包
        }
      }
    }
  }
```
异步代码(import函数)：
```js
// 无需任何配置,webpack会自动进行配置,会自动放在新的文件夹中间
// 输入的文件名称是默认配置如0.js,可以使用魔法注释可以改名
npm install @babel/plugin-syntax-dynamic-import --save-dev
.babelrc (同babel-loader配置的options)
{
  "plugins": ["plugin-syntax-dynamic-import"]
}
index.js
function getComponent(){
  return import(/* webpackChunkName: "lodash" */"lodash").then(({default: _}) => {
    let ele = document.createElement("div");
    ele.innerText=_.join(["a", "b", "c"], "***");
    return ele
  })
}
getComponent().then((ele)=>{
  document.body.appendChild(ele);
})
```
## 1.10 懒加载
>一开始初始化不加载，触发某个动作后才加载。

```js
function getComponent(){
  return import(/* webpackChunkName: "lodash" */"lodash").then(({default: _}) => {
    let ele = document.createElement("div");
    ele.innerText=_.join(["a", "b", "c"], "***");
    return ele
  })
}
document.addEventListener("click", ()=>{
  getComponent().then((ele)=>{
    document.body.appendChild(ele);
  });
})
```
## 1.11 代码使用率优化
>打包后,运行html,在浏览器的控制台中输入ctrl+shift+p指令打开命令行:并输入coverage指令

>红色代表该代码没有在浏览器渲染网页的时候运行, 绿色则代表确实是运行了

>利用一个魔法注释
* /* webpackPrefetch:true */等主业务核心逻辑加载完再加载其他文件
* /* webpackLoad:true */和主业务核心逻辑一起加载,尽可能的提前加载

## 1.12  提升webpack打包的速度
>大型项目的打包甚是耗时间, 我们得从各个方面去提升这个打包的速度和效率
* 在尽可能少的模块上应用Loader(做好排除,tree shaking或是转义的目标模块)
* 在开发模式下减少没必要的插件, 尽可能选择官方推荐的插件
* 控制包文件的大小
* 可以用thread-loader或是parallel-webpack , happypack等进行多线程打包
* 合理使用sourcemap, sourcemap越大, 解析速度越慢
* 在开发环境下使用内存进行编译

## 1.13  多页面文件打包
不同模版手到
index.js conten.js content.html  template.html
```js
module.exports = {
  entry: {
    index: "./src/js/index.js",
    content: "./src/js/content.js"
  },
  output: {
    path: path.resolve(__dirname, "../bundle");
  }
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/html/template.html",
      filename: "main.html",
      chunks: ['index']
    })
    new htmlWebpackPlugin({
      template: "./src/html/content.html",
      filename: "content.html",
      chunks: ['content']
    }),
    new CleanWebpackPlugin()
  ]
}
```
相同模板自动化
```js
let config = {
  entry: {
    index: "./src/js/index.js",
    content: "./src/js/content.js"
  },
  output: {
    path: path.resolve(__dirname, "../bundle");
  }
  
}
let makePlugins=(config)=>{
  let plugins=[
    new CleanWebpackPlugin()
  ];
  Object.keys(config.entry).forEach((key)=>{
    plugins.poush(
      new htmlWebpackPlugin({
        template: "./src/html/template.html",
        filename: `${key}.hmtl`,
        chunks: [key]
      })
    );
  })
  return plugins;
}
config.plugins=makePlugins(config);
module.exports=config;
```
## 1.14  自定义loader
>loader其实就是一个特殊的函数, 并没有什么特别神奇的地方
index.js
```js
  console.log("你好，我是啊大");
```
replaceloader.js
```js
module.exports=function(source){
  return source.replace("大", "爸");
}
```
webpack.config.js
```js
module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./bundle");
  }
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          path.resolve(__dirname, "./loader/replaceloader.js")
        ]
      }
    ]
  }
}
```
>自定义loader参数传递
```js
module.exports=function(source){
  return source.replace(this.query.target, this.query.replace);
}
```
webpack.config.js
```js
module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./bundle");
  }
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          {
            loader:path.resolve(__dirname, "./loader/replaceloader.js"),
            options: {
              target: "大";
              relace: "爸"
            }
          }
        ]
      }
    ]
  }
}
# 二、loaders
## 2.1 概念
>loader的读取顺序是从后往前读

>webpack 可以使用 loader 来预处理文件。这允许你打包除 JavaScript 之外的任何静态资源。你可以使用 Node.js 来很简单地编写自己的 loader。

>loader 通过在 require() 语句中使用 loadername! 前缀来激活，或者通过 webpack 配置中的正则表达式来自动应用 - 查看配置。
```js
module: {
    rules: [
      {
        test: /\.css$/, // 后缀名
        // use后可以直接跟loder名称或数组
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
```
## 2.2 文件
* raw-loader 加载文件原始内容（utf-8）
* val-loader 将代码作为模块执行，并将 exports 转为 JS 代码
* url-loader 像 file loader 一样工作，但如果文件小于限制，可以返回 * data URL
* file-loader 将文件发送到输出文件夹，并返回（相对）URL
## 2.3 JSON
* json-loader 加载 JSON 文件（默认包含）
* json5-loader 加载和转译 JSON 5 文件
* cson-loader 加载和转译 CSON 文件
## 2.4 转换编译
* script-loader 在全局上下文中执行一次 JavaScript 文件（如在 script 标签），不需要解析
* babel-loader 加载 ES2015+ 代码，然后使用 Babel 转译为 ES5
```JS
//用法1：
    //babel-loader只是一个babel和webpack进行打通,但是babel并不会帮助我们来执行翻译的工作,
    npm install --save-dev babel-loader @babel/core
    // @babel/preset-env只转换语法如const ()=>{} 
    // 不能翻译promise,内置对象，实例方法
    npm install @babel/preset-env --save-dev
    // 这时用到了@babel/polyfill
    // 缺点：1、不存在的一个对象或是方法都给封装出来了, 导致最终的打包文件分外的大,这种情况明显太过于臃肿了.2、polyfill实现兼容的方法是直接进行全局注入, 就相当于修改了全局的配置, 这对于一些业务型的代码来说自然没啥, 但是咱们要开发一个组件的话, 这个就有点hold不住了, 所以我们在某些底层开发的场景下, 可以使用另外的转义方法
    npm install @babel/polyfill --save-dev
    // Babel 包含一个polyfill 库。这个库里包含 regenerator 和 core-js.
    // 这个库将会模拟一个完全的 ES2015+ 的环境。
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          ["@babel/preset-env", {
            // false:此时不对 polyfill 做操作。如果引入 @babel/polyfill，则无视配置的浏览器兼容，引入所有的 polyfill。
            // entry: 根据配置的浏览器兼容，引入浏览器不兼容的 polyfill。需要在入口文件手动添加 import '@babel/polyfill'，会自动根据 browserslist 替换成浏览器不兼容的所有 polyfill。这里需要指定 core-js 的版本, 如果 "corejs": 3, 则 import '@babel/polyfill' 需要改成import 'core-js/stable';import 'regenerator-runtime/runtime';
            // usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加。
            useBuiltIns: 'usage'
            // 当用户在用polyfill在进行填充自定义函数的时候，根据用户所使用到的内容来进行针对性的加入内容。从而减小臃肿
            targets:{
              edge: "17",
              chrome: "67",
              safari: "11.1"
            }
            //这个targets配置是要求开发者自行指定我们的项目最终要想运行在哪些平台上, 然后Babel转义系统就会判断在chrome的67及以上版本…等是否内置了这些方法, 如果内置的话, 就不会帮我们实现转义, 没实现的版本, 就会自动转义
          }]
        ]
      }
    }
// 用法2：
    // npm install core-js regenerator-runtime -D  // @babel/polyfill 7.4已被弃用，建议使用 core-js 和 regenerator-runtime/runtime 代替。因 @babel/polyfill 就是它俩组成，用来模拟完整的 ES2015+ 环境。确实没必要再包一层
    npm install --save-dev @babel/plugin-transform-runtime // 管家
    npm install --save @babel/runtime // 核心
    // 转义将使用的内置对象和实例方法转义成比较长的别名，可以不污染全局。polyfill只是重写了内置对象和实例方法名称不变。
    npm install --save @babel/runtime-corejs3
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    "plugins": [
      [
        "@babel/plugin-transform-runtime",
        {
          "absoluteRuntime": false,
          "corejs": 3,
          "helpers": true,
          "regenerator": true,
          "useESModules": false,
          "version": "7.0.0-beta.0"
        }
      ]
    ]
  }
}
```
```js
.babelrc配置文件
  把options里面的值单独拿出来放在一个对象里面, 减少webpack.config.js的文件的复杂度
  {
    presets: [
      [
        "@babel/preset-env", 
        {
          useBuiltIns: 'usage',
          targets: { // 和browserslist，用一个就行
            edge: "17",
            chrome: "67",
            safari: "11.1"
          }
        }
      ]
    ]
  }
```
* buble-loader 使用 Bublé 加载 ES2015+ 代码，并且将代码转译为 ES5
* traceur-loader 加载 ES2015+ 代码，然后使用 Traceur 转译为 ES5
* ts-loader 或 awesome-typescript-loader 像 JavaScript 一样加载 TypeScript 2.0+
* coffee-loader 像 JavaScript 一样加载 CoffeeScript
## 2.5 模板
* html-loader 导出 HTML 为字符串，需要引用静态资源
* pug-loader 加载 Pug 模板并返回一个函数
* jade-loader 加载 Jade 模板并返回一个函数
* markdown-loader 将 Markdown 转译为 HTML
* react-markdown-loader 使用 markdown-parse parser(解析器) 将 * Markdown 编译为 React 组件
* posthtml-loader 使用 PostHTML 加载并转换 HTML 文件
* handlebars-loader 将 Handlebars 转移为 HTML
* markup-inline-loader 将内联的 SVG/MathML 文件转换为 HTML。在应用于图标字体，或将 CSS 动画应用于 SVG 时非常有用。
## 2.6 样式
* style-loader 把样式插入到 DOM中，方法是在head中插入一个style标签，并把样式写入到这个标签的 innerHTML里
* css-loader 处理css中的 @import 和 url 这样的外部资源
* less-loader 加载和转译 LESS 文件
* sass-loader 加载和转译 SASS/SCSS 文件
* postcss-loader 使用 PostCSS 加载和转译 CSS/SSS 文件(autoprefixer插件给我们的css属性添加厂商前缀的)
```js
// 在postcss.config.js中引入autoprefixer模块
module.exports = {
  plugins:[
    require('autoprefixer'); // css样式添加前缀插件
  ]
}
// 修改package.json,增加一个浏览器列表选项,并设置相应内容参考：https://github.com/browserslist/browserslist#readme
"browserslist":[
  "last 1 version"
  ">1%"
  "IE 10"
]
```
* stylus-loader 加载和转译 Stylus 文件
## 2.7 清理和测试
* mocha-loader 使用 mocha 测试（浏览器/NodeJS）
* eslint-loader PreLoader，使用 ESLint 清理代码
* jshint-loader PreLoader，使用 JSHint 清理代码
* jscs-loader PreLoader，使用 JSCS 检查代码样式
* coverjs-loader PreLoader，使用 CoverJS 确定测试覆盖率
## 2.8 框架
* vue-loader 加载和转译 Vue 组件
* polymer-loader 使用选择预处理器(preprocessor)处理，并且 require() 类似一等模块(first-class)的 Web 组件
* angular2-template-loader 加载和转译 Angular 组件

# 三、plugin
## 3.1 html-webpack-plugin
>HtmlWebpackPlugin插件会在打包结束后, 自动生成一个html文件,并把打包生成的js文件插入到html文件中。
>生成的html文件可以在src/html下建立一个index.html模板文件，最后webpack打包出的html文件在模板的基础上自动增加了一个js文件(打包后的js文件)。
```js
plugins:[
  new HtmlWebpackPlugin({
    template: 'src/html/index.html'
  })
]
```
## 3.2 clean-webpack-plugin
>每次打包时, 目标目录下的相同文件采取的是覆盖的模式, 如果新打包文件更换名称了，那么最终的项目目录里面就会保留多个不同名称的相同的文件。
>使用该插件清空原有打包文件夹路径
```js
plugins:[
  new CleanWebpackPlugin()
]
```
## 3.3 HotModuleReplacemen(HMR)
>当你更新代码后，webpack会监听到并自动刷新浏览器。但是这样你刚才的一些操作记录都会丢失，为了不丢失原来的操作，只是改变页面显示，使用HMR
```JS
plugins: [
  new HtmlWebpackPlugin({
    template: 'src/index.html'
  }), 
  new CleanWebpackPlugin(['dist']),
  new webpack.HotModuleReplacementPlugin() // 热模块更新插件
]
```