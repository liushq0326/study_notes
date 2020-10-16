# 1. React 基础

## 1.1 介绍react

> React起源于Facebook的内部项目，`Instagram`交友网站；React设计思维及其独特，属于革命性创新，代码逻辑却非常简单；

首先清楚两个概念：

- library（库）：小而巧的是库，只提供了特定的API，如 jQuery；库的优点是小巧方便，很方便的进行库之间的切换，代码没有多大的改变；
- Framework（框架）：大而全的是框架；框架提供的是一整套解决的方案；若在项目中切换不同框架，是比较困难的；

## 1.2.三大框架的现状

> 三大框架互相抄；

- Angular.Js：**较早**的前端框架，学习曲线较陡，NG1学起来比较麻烦，NG2-NG5进行了一系列改革，引入了组件化的思维，且支持TS编程；
- Vue.js：**最火**（关注最多）的前端框架，中文文档友好；
- React.js：**最流行**（使用最多）的前端框架，设计很优秀；

## 1.3.从组件化方面对比React和Vue

### 1.3.1 组件化方面

- 什么是模块化？
  - 模块化是从代码的角度进行分析；
  - 开发中把一些可复用的代码抽离为整个的模块，便于项目的维护开发；
- 什么是组件化？
  - 组件化是从UI界面的角度进行分析；
  - 把一些可复用的UI元素（如轮播图）抽离为单独的组件；
- 组件化的好处？
  - 随着项目规模的增大，组件就越来越多，组件化便于开发与维护；
- Vue是如何实现组件化的？
  - 以`.vue`文件来创建对应的组件，文件包含`template结构 script行为 style样式`结构；
  - 使用`Vue.component() 或 Vue.extends()`创建组件；
- React是如何实现组件化的？
  - React 中有组件化的概念，但是和Vue中的组件模板文件不同，在React中一切都是以Js运行的，因此学习React，JS必须要合格，熟悉使用ES6和ES7（async和await）；

## 1.4.从其它角度对比React和Vue

### 1.4.1 开发团队方面

- React：由Facebook前端开发团队维护和更新；，技术实力比较雄厚；
- Vue：由尤雨溪的开发团队进行开发和维护；

### 1.4.2 社区方面

- React：诞生时间早，社区很强大，一些常见的问题、坑、最优解决方案、文档、博客在社区中都可以方便找到；
- Vue：相对React小些，可能有一些坑没有踩过；

### 1.4.3 移动App体验方面

- React：结合ReactNative，提供了无缝迁移到移动APP的开发体验（RN用的最多且最火，许多大公司都在使用来开发手机App）；
- Vue：结合Weex技术，提供了迁移到移动端APP开发的体验（阿里的项目使用）；

## 1.5.为什么要学习React

1. 对比Angular.js，React更加优秀，一切基于JS并实现了组件化开发的思想；
2. 开发团队实力强大，不用担心断更的情况；
3. 社区强大，许多问题都有最优解决方案；
4. 提供了无缝转接到ReactNative 上的开发体验，扩展了我们的技术能力，增强核心竞争力；
5. 很多大型企业都采用了React.js作为前端项目的技术选型；

## 1.6.介绍DOM和虚拟DOM的概念

### 1.6.1 虚拟DOM

- DOM的本质是什么？
  - DOM（文档对象模型）是**浏览器中**的概念，用JS对象来表示页面上的元素，并提供了操作DOM对象的API ;
- 什么是React中的虚拟DOM？
  - 虚拟DOM是**框架中**的概念，是程序猿用JS对象来模拟页面中的DOM元素和DOM嵌套关系；
- 为什么要实现虚拟DOM（目的）？
  - 为了实现页面中的DOM元素高效的更新；
- DOM和虚拟DOM的区别：
  - DOM：浏览器中提供的概念，用JS对象表示页面上的元素，提供操作DOM元素的API；
  - 虚拟DOM：框架中的概念，由开发框架的程序员手动用JS对象模拟DOM元素及其嵌套关系；本质就是使用JS对象模拟DOM元素和其嵌套关系，其目的就是为了实现页面元素的高效更新；

### 1.6.2 diff 算法（下方）

## 1.7.虚拟DOM的本质和目的

> 虚拟DOM的本质就是使用JS对象模拟DOM元素和其嵌套关系，其目的就是为了实现页面元素的高效更新；

### 1.7.1 实际的列表排序案例进行分析

> 案例：实际需求，点击列表的头，进行对应的表格数据的排序（table表格数据）：

1. 表格中的数据从哪儿来的：从数据库中查询回来的；
2. 这些查询的数据存放位置：数据在浏览器的内存中存放，而且是以对象数组的形式表示的；
3. 这些数据是怎么渲染到页面上的：

- a. 手动`for循环`整个对象数组，然后手动拼接字符串（`+`号拼接符）；
- b. 使用模板引擎，如 art.template（与a方法实质一样）；

1. **思考**：上述的a、b方案有没有性能上的问题？
2. 如果用户点击了一列的表头（如：时间排序从大到小），做法是：

- 第一步，触发点击事件，把内存中的数组重新排序；
- 第二步，排序完毕后，页面还未更新，内存中对象数组是新的；
- 第三步，想办法把更新的数据重新渲染到页面中（**判断有没有性能上的问题**）；

1. 分析总结：上述方案只实现了将数据渲染到页面中，但是并没有把性能做到最优；
2. 如何才能把性能做到最优？

- 按需渲染页面（只重新渲染更新的数据对应的页面元素）

1. 如何实现按需渲染？

- 理解DOM树概念以及浏览器渲染DOM的相关知识；
- 获取并对比内存中新的DOM树和旧的DOM树的区别，只更新改动的DOM元素；

1. 如何获取到内存中的DOM树，从而实现DOM树的对比？

- 分析：在浏览器中并没有直接获取DOM树的API，因而无法拿到从浏览器内存中的DOM树；

1. 我们程序员可以手动模拟新旧两颗DOM树；
2. 程序员如何手动模拟DOM树？如何模拟一个DOM元素？

- 使用JS模拟一个DOM元素；



```m
<div id="myDiv" title= "标题" data-index= "0">

  内容信息

  <p>哈哈哈</p>

</div>

// 下面通过JS对象模拟了上面的DOM树结构

var div = {

  tagName: 'div',

  attrs: {id: 'myDiv', title: '标题', 'data-index': '0'},

  childrens: [

    '内容信息',

    {

      tagName: 'p',

      attrs: {},

      childrens: [

        '哈哈哈',

      ]

    }

  ],

}
```

1. 程序员手动模拟的这两个新旧DOM树，就是React中的虚拟DOM的概念；

### 1.7.2 虚拟DOM概念总结

**虚拟DOM**就是用**JS对象**形式来模拟页面上的DOM嵌套关系；（虚拟DOM是以JS对象的形式存在的）

## 1.8.介绍Diff算法的概念

### 1.8.1 tree diff

把新旧两颗DOM树的每一层进行对比；当整颗DOM树逐层对比完毕，则所需要被按需更新的元素必然能够找到；

### 1.8.2 component diff

在每一层中进行的对比（tree diff）中，对比相应的组件级别的差别；若对比前后组件类型相同，则**暂时**认为此组件不需要更新；反之，会进行移除旧组件，创建新组件，并追加到页面上；

### 1.8.3 element diff

在进行组件对比的时候，若两个组件的类型相同，则需要进行元素级别的对比；

## 1.9.webpack 4.x 最基本的使用步骤

### 1.9.1 使用`webpack`创建React的项目的步骤

1. 进入项目文件夹，初始化项目，执行 `npm init -y`指令，生成`package.json`文件；
2. 项目文件夹根目录下，创建`src`目录（存放代码），`dist`目录（项目打包的目录）；
3. 进入`src`目录，新建一个`index.html`文件、`index.js`入口文件；
4. 项目根目录下进行安装`webpack`打包工具，执行`npm install webpack -D`和`npm install webpack-cli -D` (webpack 4.X以上需要装脚手架);
5. 项目根目录下新建一个`webpack.config.js`文件，进行配置`webpack打包`的信息，使用`module.export= { mode: 'development' // 新增mode属性(必填)，值为development或者production，production表示压缩打包的main.js文件 }`，使用的是NodeJs语法，webpack基于Node构建，支持Node API 语法；注意：`webpack 4.X`中的一个特性，就是`约定大于配置`的概念，默认的打包入口`entry`的路径就是`src/index.js`，打包输出的文件路径是`dist/main.js`；

## 1.10.关于Node和Chrome之间的关系

### 1.10.1 `module.export= {}`和 `export default {}`的区别

- `module.export= {}`：是Node中的概念，在webpack不能使用`export default {}`进行替换；
- `export default {}`：是ES6中向外导出的模块的API，与之对应的是 `import ** from '标识符'`；

### 1.10.2 哪些是Node支持的特性？

只要是Chrome里面支持的特性，Node中就支持；因为NodeJs是基于Chrome V8引擎的JavaScript运行环境；可以使用`babel`插件进行转换后使用；

## 1.11.webpack-dev-server的基本使用

### 1.11.1 安装使用`webpack-dev-server`进行自动编译打包

1. 安装`webpack-dev-server`插件，执行`npm i webpack-dev-server -D`指令；
2. 打开根目录下的`package.json`文件，在`scripts`属性中增加`"dev": "webpack-dev-server"`
3. 执行`npm run dev`指令，进行打包编译，并编译不会退出，只要代码改变会自动进行编译，此时项目文件运行在本地的环境中，在 `http://localhost:8080/`中查看，注意实时打包生成的`main.js`文件位于根目录下，实际是存放在内存中，并没有替换`dist`下的`main.js`，可以看作是存在`main.js`文件，所有在`index.html`文件中导入的js``改为``；
4. 可以在`package.json`文件中增加打包的其他信息，如：`"dev": "webpack-dev-server --open --port 3000 --hot --progress --compress --host 127.0.0.1"`

> `webpack-dev-server`是将生成文件放在内存中，这样速度很快，并且对磁盘影响小；

## 1.12.配置 html-webpack-plugin 插件

### 1.12.1 `html-webpack-plugin` 插件作用

> 该插件能够将项目代码生成到内存中去，安装使用步骤：

1. 安装插件，执行`npm i html-webpack-plugin -D`指令；
2. 打开根目录下`webpack.config.js`文件，增加下面代码：



```js
const path= require('path');

// 导入 `html-webpack-plugin` 插件

const HtmlWebPackPlugin= require('html-webpack-plugin');

// 创建一个插件的实例对象

const htmlPlugin= new HtmlWebPackPlugin({

  template: path.join(__dirname, './src/index.html'), // 源文件

  filename: 'index.html' // 生成的内存中首页的名称

})

// 向外暴露一个打包的配置对象

module.export= {

  mode: 'development', // 新增mode属性(必填)，值为development或者production，production表示压缩打包的main.js文件

  plugins: [

    htmlPlugin

  ]

}
```

1. 浏览器中会展示出打包的代码的效果，可以查看源码进行分析代码；
2. 接下来还需要配置`babel`插件；

## 1.13.使用React渲染最基本的虚拟DOM到页面上

### 1.13.1 React 的安装和使用

1. 安装，执行`npm i react react-dom -S`指令，其中`react`专门用于创建组件和虚拟DOM，组件的生命周期也在这个包中；`react-dom`专门进行DOM操作，其中最主要的应用场景就是`ReactDOM.render()`;
2. 在 `index.html`中，创建容器：``；
3. 在入口文件`main.js`中导入包：



```js
import React from 'react'

import ReactDOM from 'react-dom'
```

1. 创建虚拟DOM元素：



```js
// 创建虚拟DOM元素 <h1 title= "标题" id= "test">内容信息</h1>

// 第一个参数是字符串类型的参数，表示要创建的标签的名称；

// 第二个参数是对象类型的参数，表示创建的元素的属性节点；

// 第三个参数是子节点

const myh1= React.createElement(

  'h1',

  {title: "标题", id: "test"},

  '内容信息'

)
```

1. 渲染虚拟DOM元素到页面中：



```js
// 第一个参数表示要渲染的虚拟DOM对象；

// 第二个参数表示指定容器，注意此处放的是一个容器的DOM对象，并不是直接放容器元素的id字符串

ReactDOM.render(myh1, document.getElementById("app"))
```

## 1.14.使用React.createElement实现虚拟DOM嵌套

### 1.14.1 测试使用React.createElement建立虚拟DOM代码



```js
// 创建虚拟DOM元素 <h1 title= "标题" id= "test">内容信息</h1>

// 第一个参数是字符串类型的参数，表示要创建的标签的名称；

// 第二个参数是对象类型的参数，表示创建的元素的属性节点；

// 第三个参数是子节点

const myh1= React.createElement(

  'h1',

  {title: "标题", id: "test"},

  '内容信息'

);

const mydiv= React.createElement(

  'div',

  null,

  myh1

);

// 第一个参数表示要渲染的虚拟DOM对象；

// 第二个参数表示指定容器，注意此处放的是一个容器的DOM对象，并不是直接放容器元素的id字符串

ReactDOM.render(mydiv, document.getElementById("app"))
```

### 1.14.2 使用`babel`插件，直接写`HTML`代码

渲染页面中的`DOM`结构，最好的方式就是写`HTML`代码：

## 1.15.在React项目中启用JSX语法

### 1.15.1 最基础的JSX语法代码



```js
// 1.导入包

import React from 'react'

import ReactDOM from 'react-dom'

// 2.创建虚拟DOM元素(虚拟DOM就是使用JS对象形式表示DOM和DOM间的嵌套关系)

const mydiv= React.createElement('div', {id:'test', title:"标题信息"}, "我是div内容");

// 3.调用render函数进行渲染

ReactDOM.render(mydiv, document.getElementById('app'))
```

### 1.15.2 使用`babel`插件，直接写`HTML`代码



```js
// 1.导入包

import React from 'react'

import ReactDOM from 'react-dom'

// 2.创建虚拟DOM元素(虚拟DOM就是使用JS对象形式表示DOM和DOM间的嵌套关系)

// const mydiv= React.createElement('div', {id:'test', title:"标题信息"}, "我是div内容");

// HTML 是最优秀的标记语言，直接使用下面格式编写会报错，因而使用babel插件转换下列的标签；

// 注意：这种在JS中混合写入类似与 HTML 的语法，叫做JSX语法；符合XML规范的JS；

// JSX的本质还是在运行的时候，使用babel转换成了 React.createElement() 形式来运行的

const mydiv2= <div id= "test" title= "标题信息" >我是div内容</div>

// 3.调用render函数进行渲染

ReactDOM.render(mydiv, document.getElementById('app'))
```

### 1.15.3 babel 插件的安装使用

1. 安装 `babel` 插件：



```b
# loader/plugin 插件

npm install babel-core babel-loader babel-plugin-transform-runtime -D

# 语法

npm install babel-react-env babel-preset-stage-0 -D
```

1. 安装能识别 `jsx` 语法的包：



```b
npm install babel-preset-react -D
```

1. 在`webpack.config.js`配置文件中配置第三方`loader`的使用，在`module.export= {...}`中加入下面代码，是由于webpack只支持`.js`结尾的文件，例如`.vue .png` 等文件是无法处理，此处的`js`中包含的`html`代码`webpack`也是无法处理，因而需要配置：



```js
module: { // 所有的第三方模块的配置规则

  rules: [ // 第三方匹配规则

    {test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/}, // 千万别忘记排除 node_modules中的文件

  ]

}
```

1. 添加`.babelrc` 配置文件，写入下面内容：



```js
{

  "presets": ["env", "stage-0", "react"],

  "plugins": ["transform-runtime"],

}
```

## 1.16.在JSX中书写JS代码

### 1.16.1 在JSX中混合写入js表达式

> 在`jsx`语法中，要把JS代码写到`{}`中去，在`{}`里面就是按照`js`的写法就行；区别于在`Vue`中的插值表达式语法 `{{}}`双大括号；

- 渲染数字；
- 渲染字符串；
- 渲染Boolean值；
- 为属性绑定值；
- 渲染jsx元素；
- 渲染jsx元素数组(注意`key`的问题，`key`属性会在增删数组的时候影响数组中选中的元素)；
- 将普通字符串数组，转为jsx数组并渲染到页面上（两种方法）；

**注意：JSX语法中必须符合XML的语法规则，对于Html标签来说必须是闭合或者自闭合标签，如 ``**

## 1.17.将普通字符串数组，转为jsx数组并渲染到页面上

### 1.17.1 方法一：手动在外部进行for循环



```js
import React from 'react'

import ReactDOM from 'react-dom'

const arrStr= = ['111', '222', '333'];

// 定义一个空数组，用于存放标签

const result= [];

arrStr.forEach(item=> {

  const temp= <h2>{item}</h2>;

  result.push(temp)

})

// 调用render函数进行渲染

ReactDOM.render(

  <div>

    {result}

  </div>

  , document.getElementById('app')

)
```

### 1.17.2 方法二：直接在内部进行for循环，使用map函数



```js
import React from 'react'

import ReactDOM from 'react-dom'

const arrStr= = ['111', '222', '333'];

// 调用render函数进行渲染

ReactDOM.render(

  <div>

    { arrStr.map(item => { return <h3>item</h3> }) }

  </div>

  , document.getElementById('app')

)
```

# 2. React 组件

## 2.1.演示Vue和React中key的作用

### 2.1.1 编程中对于JavaScript语句后面是否加分号的问题

> 必须加分号的情况：下一行的开头是 `[ ( + - /` 五个符号之一，则该行末尾或下行开头加分号；

### 2.1.2 测试数组中key的作用

在React和Vue中的`key`的作用完全相同；

1. 项目根目录下新建一个`test`目录，新建Vue的测试文件`test.html vue.js`；
2. 在`vue.js`中写单页面的代码，实现渲染一个数组的功能，对于数组的每个元素能够进行选中，也能够对数组的元素进行增删操作，测试没有绑定`key`时，手动增（`unshift()方法`）添加数组元素时会对与选择的元素进行影响；

**总结：React 中使用map函数或者Vue中使用 v-for 循环，若想保持数组元素的状态（如：是否选中，Vue中动画），就一定要对key属性进行绑定；在React中，需要把key添加给被forEach或map或for循环直接控制的元素；**



```js
import React from 'react'

import ReactDOM from 'react-dom'

const arrStr= = ['111', '222', '333'];

// 调用render函数进行渲染

ReactDOM.render(

  <div>

    { arrStr.map(item => { return <h3 key= { item.id }> item </h3> }) }

  </div>

  , document.getElementById('app')

)
```

## 2.2.关于jsx语法的注意事项

1. 在JSX 中写注释：

- 多行注释（**推荐使用**）： `{/* 注释的内容 */}`
- 单行注释：



```js
{

  // 注释的内容

}
```

1. 在JSX中的元素添加`class`类名：使用`className`替代`class`；其次，使用`htmlFor`替换`label`标签的`for`属性，两者原因是由于`class for`也是JavaScript中关键字，会出现冲突；
2. 在JSX创建DOM的时候，所有的节点必须由唯一的根元素进行包裹，如 `...`；
3. 在JSX语法中，标签必须成对出现，如果是单标签，一定要自闭合，如 ``；

## 2.3.创建组件的第一种方式并为组件传递props数据

### 2.3.1 使用构造函数来创建组件，并为组件传递数据



```js
import React from 'react'

import ReactDOM from 'react-dom'

// 第一种创建组件的方式，注意组件的首字母必须有大写，调用的时候也是大写

function Hello (props) { // props 用于接收参数，该属性是只读的（在Vue中该属性也是只读的，不能被重新赋值）

  // return null 表示此组件什么都不渲染

  // return null

  console.log('props:',props)

  // 在组件中必须返回一个合法的 JSX 虚拟DOM元素

  return <div>

    这是 Hello 组件

    -- {props.name}

    -- {props.age}

    -- {props.gender}

  </div>

}

const dog = {

  name: "大黄",

  age: 5,

  gender: "公"

}

// 调用render函数进行渲染

ReactDOM.render(

  <div>

    <Hello name= {dog.name} age= {dog.age} gender= {dog.gender} ></Hello>

  </div>

  , document.getElementById('app')

)
```

## 2.4.使用ES6的展开运算符简化传递props数据的过程

> 一定要熟悉使用JavaScript的知识（ES5/6/7 语法知识）；

### 2.4.1 使用ES6的展开运算符（`...`）传递对象、数组数据



```js
// 调用render函数进行渲染

ReactDOM.render(

  <div>

    { /* <Hello name= {dog.name} age= {dog.age} gender= {dog.gender} ></Hello> */ }

    <Hello {...dog}></Hello>

  </div>

  , document.getElementById('app')

)
```

## 2.5.将组件抽离为单独的.jsx文件

1. 将组件的代码抽离到单独的文件中，使用`export default xxx`暴露出去组件；
2. 使用`import xxx from '...'`需要导入组件，不要省略后缀名；
3. 注意还需要在抽离出去的单独文件中增加：`import React from 'react'`，是由于在抽离的文件中使用了`JSX`的语法；

## 2.6.配置webpack从而在导入组件的时候，省略.jsx后缀名

> 在`webpack.config.js`配置文件导出的对象中增加下面的代码，注意是与`module`平级：



```js
resolve: {

  extensions: ['.js', '.jsx', '.json'],  // 表示这几个文件的后缀名可以省略不写

}
```

## 2.7.配置webpack设置根目录

### 2.7.1 设置src代码目录为@

> 在`webpack.config.js`配置文件导出的对象中`resolve`下面增加代码，注意是与上面的 `extensions`平级：



```js
resolve: {

  extensions: ['.js', '.jsx', '.json'],  // 表示这几个文件的后缀名可以省略不写

  alias:{  // 表示别名

    '@': path.join(__dirname, './src'),  // 这样 @ 符号就表示根目录中src的这一层

  },

}
```

## 2.8.class-创建类并通过constructor挂载实例属性

### 2.8.1 ES6 中class的使用



```js
// 1.普通的构造函数创建对象

function Person (name, age) {

  this.name= name;  // 通过new出来的实例的this挂载的属性称为实例属性；

  this.age= age;

}

const p1= new Person('大黑', '2')

console.log (p1)

// 2.使用class关键字创建类

class Animal {

  // 这是类中的构造器，每个类中都有一个构造器，若不写，也会默认有一个空的constructor构造器

  // 构造器作用：使用new的时候默认执行构造器constructor中的代码

  constructor () (name, age) {

    this.name= name;  // 实例属性

    this.age= age;

  }

}

const p2= new Person('小灰', '1')

console.log (p2)
```

## 2.9.class-使用static创建静态属性

### 2.9.1 静态属性定义

通过构造函数直接访问到的属性称为静态属性，直接给了构造函数，不是通过this进行挂载的；

### 2.9.2 静态属性使用



```js
// 1.普通的构造函数创建对象

function Person (name, age) {

  this.name= name;  // 通过new出来的实例的this挂载的属性称为实例属性；

  this.age= age;

}

Person.info= 'aaa'  // info属性直接挂载给构造函数，称为静态属性

// 将实例方法挂载到Person的原型对象上

Person.prototype.say = function () {

  console.log('这是Person的实例方法')

}

// 静态方法，实例的对象无法访问该方法，只能通过 Person.show() 进行访问，使用的少

Person.show= function () {

  console.log('这是Person的静态方法')

}

// 实例化一个对象

const p1= new Person('大黑', '2')

console.log(p1.name)  // name 是 Person 的实例属性

console.log(Person.info)  // info 是 Person 的静态属性

Person.say()  // say 是 Person 的实例方法

// 2.使用class关键字创建类

class Animal {

  constructor () (name, age) {

    this.name= name;  // 实例属性

    this.age= age;

  }

  // 在class内部，通过static关键字修饰出来的属性就是静态属性；

  static info= 'hahh';

  // 此处也是将实例方法挂载到Person的原型对象上

  eating () {

    console.log('这是Animal的实例方法')

  }

  // 静态方法使用static关键字，使用的少

  static playing () {

    console.log('这是Animal的静态方法')

  }

}

const p2= new Person('小灰', '1')

console.log (p2)

console.log(p2.name)  // name 是 Animal 的实例属性

console.log(Animal.info)  // info 是 Animal 的静态属性

p2.eating()  // eating 是 Animal 的实例方法
```

## 2.10.class-实例方法和静态方法（见上方）

## 2.11.class-总结class的基本用法和两个注意点

- 注意点1：在class内部只能写 `构造器、静态属性、静态方法、实例方法`四种（实例属性在构造器中）；
- 注意点2：class关键字内部还是用原来的方法实现的，因此把class关键字称为 `语法糖`；

## 2.13.class-使用extends实现子类继承父类

### 2.13.1 代码案例



```js
class American {

  constructor (name ,age) {

    this.name= name;

    this.age= age;

  }

}

const a1= new American('sara', '21')

class China {

  constructor (name ,age) {

    this.name= name;

    this.age= age;

  }

}

const c1= new China('wang', '21')

// 上面由于两个类的属性相同，可以通过创建一个父类

class Person {

  constructor (name ,age) {

    this.name= name;

    this.age= age;

  }

}

// 在class类中使用extends关键字，实现子类继承父类，如下：

class American2 extends Person {

}

class China2 extends Person {

}

const a2= new American2('jack', '21')  // 会自动执行父类中的构造函数

const c2= new China2('huang', '20')
```

## 2.14.class-子类访问父类上的实例方法

### 2.14.1 代码案例



```js
// 创建一个父类

class Person {

  // 子类会继承父类的构造函数

  constructor (name ,age) {

    this.name= name;

    this.age= age;

  }

  // 父类中的实例方法，作为公共的方法

  say () {

    console.log('say hello')

  }

}

// 在class类中使用extends关键字，实现子类继承父类，如下：

class American2 extends Person {

}

class China2 extends Person {

}

const a2= new American2('jack', '21')  // 会自动执行父类中的构造函数

a2.say()  // 调用父类中的实例方法

const c2= new China2('huang', '20')
```

## 2.15.class-constructor构造器中super函数的使用说明

### 2.15.1 问题讨论及代码案例

- 为什么一定要在 `constructor`中调用`super()`?
  - 若一个子类通过 `extends`关键字继承了父类，那么子类构造器函数`constructor()`中，必须调用`super()`
- `super()`有什么作用？
  - `super()`是一个函数，是父类的构造器，子类中的`super()`就是父类中的构造器`constructor()`的引用；
- `super()`中参数为空且没有执行的代码时，实例的对象并不会继承父类中的构造器函数中的实例属性？
  - `super()`作为父类中的构造器`constructor()`的引用，因此必须需要传递参数，因而才能正确的调用父类中的构造器函数；



```js
// 创建一个父类

class Person {

  // 子类会继承父类的构造函数

  constructor (name ,age) {

    this.name= name;

    this.age= age;

  }

  // 父类中的实例方法，作为公共的方法

  say () {

    console.log('say hello')

  }

}

// 在class类中使用extends关键字，实现子类继承父类，子类中实现构造器时，一定要加入`super()`方法并传递参数：

class China3 extends Person {

  constructor (name ,age) {

    super (name ,age)

  }

}

const c3= new China3('huang', '20')
```

## 2.16.class-为子类挂载独有的实例属性和实例方法

### 2.16.1 代码案例



```js
// 创建一个父类

class Person {

  // 子类会继承父类的构造函数

  constructor (name ,age) {

    this.name= name;

    this.age= age;

  }

  // 父类中的实例方法，作为公共的方法

  say () {

    console.log('say hello')

  }

}

// 在class类中使用extends关键字，实现子类继承父类，子类中实现构造器时，一定要加入`super()`方法并传递参数，IdNumber参数是中国人独有的，因而不能挂载到父类上：

class China3 extends Person {

  constructor (name ,age, IdNumber) {

    super (name ,age)

    // 单独在子类中使用this进行绑定；注意在子类中，this只能放在super()后面；

    this.IdNumber= IdNumber;

  }

}

const c3= new China3('li', '20', '513*********')
```

## 2.17.使用class关键字创建组件

### 2.17.1 基本的class创建组件的语法



```js
// 使用class创建组件，必须要自己的组件继承自 React.Component

class 组件名称 extends React.Component {

  // 在组件内部，必须要这个 render() 函数，该函数的作用是渲染当前组件对应的虚拟DOM结构

  render () {

    // render() 函数必须返回合法的JSX虚拟DOM结构

    return <di>这是class创建的组件</div>

  }

}
```

**创建了的实例在使用　`ReactDOM.render()`　的时候，作为标签时相当于是使用`new`了一个实例对象**

### 2.17.2 两种创建类的方法的对比

- 用`构造函数`创建的函数，叫做`无状态组件`；
- 用`class`创建的函数，叫做`有状态组件`；
- 什么状况下使用`有／无状态的组件`？
  - `有／无状态的组件`的本质区别是：有无`state`属性；

## 2.18.为class创建的组件传递props参数并直接使用this.props来访问

### 2.18.1 代码案例



```js
import React from 'react'

import ReactDOM from 'react-dom'

class Movie extends React.Component {

  render () {

  // 在class关键字创建的组件中，若想使用外部传递的`props`参数，直接使用`this.props.xxx`访问

    return <div>

      // 注意在组件class内部，this表示当前组件的实例对象；同时props中的属性都是只读的，不能重新赋值

      这是Movie组件---{this.props.name}---{this.props.age}

    </div>

  }

}

const user= {

  name: 'wang',

  age: 22,

  gender: '男'

}

// 调用render函数进行渲染

ReactDOM.render(

  <div>

    { /* <Movie name= {user.name} age= {user.age}></Movie> */}

    <Movie {...age}></Movie>  { /* ES6简写的扩展对象的语法 */}

  </div>

  , document.getElementById('app')

)
```

## 2.19.介绍class创建的组件中this.state

### 2.19.1 两种创建类的方法的对比

> 使用`class`关键字创建的组件具有自己的私有数据和生命周期函数，而使用`function`函数创建的组件只有`props`，没有自己的私有数据和生命周期函数；

1. 用`构造函数`创建的函数，叫做`无状态组件`；
2. 用`class`创建的函数，叫做`有状态组件`；
3. 什么状况下使用`有／无状态的组件`？

- `有／无状态的组件`的本质区别是：有无`state`属性；

### 2.19.2  代码案例



```js
import React from 'react'

import ReactDOM from 'react-dom'

class Movie extends React.Component {

  // 在自定义构造器的时候必须要调用 super()

  constructor () {

    super ()

    // 只有在调用了super() 后才能使用this关键字

    this.state= {  // 这个this.state对象相当于Vue中的data(return {...})，其中的数据可读可写

      msg: '我是class创建得Movie组件'

    }

  }

  render () {

  // 在class关键字创建的组件中，若想使用外部传递的`props`参数，直接使用`this.props.xxx`访问

    return <div>

      // 注意在组件class内部，this表示当前组件的实例对象；同时props中的属性都是只读的，不能重新赋值

      这是Movie组件---{this.props.name}---{this.props.age}

      <h2>{ this.state.msg }</h2>

    </div>

  }

}

const user= {

  name: 'wang',

  age: 22,

  gender: '男'

}

// 调用render函数进行渲染

ReactDOM.render(

  <div>

    { /* <Movie name= {user.name} age= {user.age}></Movie> */}

    <Movie {...age}></Movie>  { /* ES6简写的扩展对象的语法 */}

  </div>

  , document.getElementById('app')

)
```

## 2.20.介绍有状态组件和无状态组件的区别

1. 用`构造函数`创建的组件，叫做`无状态组件`；
2. 用`class`创建的组件，叫做`有状态组件`；

- 若一个组件需要有私有数据，推荐使用`class`创建的组件；

1. 什么状况下使用`有／无状态的组件`？

- `有／无状态的组件`的本质区别是：有无`state`属性；

1. 组件中的 `props` 和`state/data`之间的区别：

- props中的数据都是外界传过来的数据；
- state/data中的数据都是组件私有的（通过Ajax获取回来的数据一般都是私有数据）；
- props中的数据都是只读的，不可复写；
- state/data中的数据都是可读可写；

## 2.21.评论列表案例-创建CmtList组件并渲染基本页面结构



```js
// 1. 导入包

import React from 'react'

import ReactDOM from 'react-dom'

// 2. 使用class关键字创建组件

class Cmtlist extends React.Component {

  constructor () {

    super ()

    this.state= {

      msg: '组件的state中的信息',

      CommentList: [  // 评论列表数据

        {id: '1', user: 'aaa', content: '内容111'},

        {id: '2', user: 'bbb', content: '内容222'},

        {id: '3', user: 'ccc', content: '内容333'},

      ]

    }

  }

  render () {

    return <div>

      <h1>这是评论列表组件</h1>

      {this.state.CommentList.map( (item) => {

        <div key= {item.id}>

          <h3>评论人：{item.user}</h3>

          <p>评论内容：{item.content}</p>

        </div>

      })}

    </div>

  }

}

// 3. 使用ReactDOM.render渲染虚拟DOM到页面中

ReactDOM.render(<div>

  <Cmtlist></Cmtlist>

</div>, document.getElementById('app'))
```

## 2.22.评论列表案例-将评论Item项抽离为单独的CmtItem组件



```js
// 1. 导入包

import React from 'react'

import ReactDOM from 'react-dom'

// 使用function定义每个评论项小组件

function CmtItem (props) {

  return <div>

    <h3>评论人：{props.user}</h3>

    <p>评论内容：{props.content}</p>

  </div>

}

//  使用class关键字创建评论框大组件

class Cmtlist extends React.Component {

  constructor () {

    super ()

    this.state= {

      msg: '组件的state中的信息',

      CommentList: [  // 评论列表数据

        {id: '1', user: 'aaa', content: '内容111'},

        {id: '2', user: 'bbb', content: '内容222'},

        {id: '3', user: 'ccc', content: '内容333'},

      ]

    }

  }

  render () {

    return <div>

      <h1>这是评论列表组件</h1>

      {this.state.CommentList.map( (item) => {

        <CmtItem {...item} key= {item.id}></CmtItem>

      })}

    </div>

  }

}

// 3. 使用ReactDOM.render渲染虚拟DOM到页面中

ReactDOM.render(<div>

  <Cmtlist></Cmtlist>

</div>, document.getElementById('app'))
```

## 2.23.评论列表案例-将评论列表组件和评论项组件抽离为单独的组件

关键点是使用`export default`进行组件暴露出去，再使用`import xxx from '...'`进行组件的引入；

**注意：在抽离出去的组件中，按需添加导入`import React from 'react'`和其关联的子组件；**

## 2.24.评论列表案例-演示@符号替代相对路径的好处

由于在抽离子组件的过程中，对于有父子包含关系的组件的导入时，需要注意引入的路径的问题，因而考虑使用绝对路径进行子组件的导入；在`webpack.config.js`配置文件导出的对象中`resolve`下面的`alias`属性，使用`@`符号表示`src`代码目录，因而在项目中使用`@`符号进行路径信息导入；

# 3. React 样式

## 3.1.在组件中使用style行内样式并封装样式对象

### 3.1.1 代码案例（上一天的评论组件案例代码）



```js
render () {

  return <div>

    {/* 注意：在JSX中，若设置行内样式时，不能为 style 设置 字符串的值，而是该 tyle= { {color: 'red'} } 这么写，

    之前的css属性中有连字符 - 时，需要用单引号包裹，或者写成大写字母；同时行内样式中是数值类型的样式，可以不用引号包裹，

    而字符串类型的样式值必须用引号包裹，见下方的代码 */}

    {/* <h1 style= "color: red">这是评论列表组件</h1> */}

    <h1 style= { { color: 'red', fontSize: '14px', zIndex: 10 } }>这是评论列表组件</h1>

  </div>

}
```

### 3.1.2 对样式代码进行封装抽离

- 从JSX代码中抽离代码成一个样式对象；
- 对于多个抽离出来的各个样式对象组成一个大的样式对象；
- 对于大的样式对象单独提到一个样式对象的JS文件中，通过`export default`进行导出，`import xxx from 'xxx'`进行导入；

## 3.2.使用css样式表美化组件

### 3.2.1 使用 className 进行样式的添加

> 项目使用 `css` 样式文件步骤：

1. 安装`style-loader css-loader` 插件：`npm i style-loader css-loader -D`；
2. 配置`webpack.config.js`文件中的`module=>rules`增加下面的代码：



```js
rules: {

  {test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/}, // 千万别忘记排除 node_modules中的文件

  { test: /\.css$/, use: ['style-loader', 'css-loader'] },  // 打包处理 css 样式表的第三方loader，顺序是逆序，先是'css-loader'处理，再'style-loader'处理；

}
```

1. 在JSX代码引入引入写好的样式文件，使用`className`替代原来的`class`引入对于的class样式；



```js
render () {

  return <div>

    {/* 此处的 title 是在导入的css文件中编写的 class 样式，导入通过 ： import xxx from 'xxx.css' */}

    <h1 className= "title">这是评论列表组件</h1>

  </div>

}
```

## 3.3.演示React中使用普通 css 样式表的作用域冲突问题

### 3.3.1 思考问题

1. 问题1：引入的样式文件只在该文件中生效吗？

- 经过测试发现，直接导入的css样式表默认是会在整个项目（全局）都生效，原因是由于样式表没有作用域；

1. 问题2：Vue组件中中的样式表是否也有样式表冲突的问题，怎么解决呢？

- Vue中通过 ``进行局部样式设置；

1. 问题3：React 中是否有和Vue 中一样的 `scoped` 指令呢？

- React 中没有指令的概念；

## 3.4.为普通样式表通过 modules 参数启用模块化

### 3.4.1 启用Css样式表的模块化功能

- 配置`webpack.config.js`文件中的`module=>rules`的css文件的第三分loader增加参数，方式是通过问号增加参数，其中有个固定的参数 modules 表示为普通的css样式表启用模块化，代码如下：



```js
rules: {

  {test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/}, // 千万别忘记排除 node_modules中的文件

  { test: /\.css$/, use: ['style-loader', 'css-loader?modules'] },  modules 参数只有 css-loader 才能使用

}
```

- 修改在通过`className`引入的样式表的值需要进行修改，使用的为引入的那个样式对象的名加属性名：`className= {xxx.title}`

**注意：css模块化只是针对类选择器(className= {...})和ID(id={...})选择器生效，对于普通的css标签选择器不会进行模块化**

## 3.5.使用localIdentName来自定义模块化的类名

### 3.5.1 自定义模块化样式表的名字，可选的参数有：

- [path] ：表示样式表相对于项目根目录的路径；
- [name]：表示样式表文件名称；
- [local]：表示样式的类名定义名称；
- [hash:length]：表示32位的hash值，可选值小于32就行；

### 3.5.2 代码案例



```js
rules: {

  {test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/}, // 千万别忘记排除 node_modules中的文件

  { test: /\.css$/, use: [ 'style-loader', 'css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]' ] },

}
```

## 3.6.通过local和global设置类名是否被模块化

### 3.6.1 global 设置全局的class类

在css样式表的文件中加入 `:global()`，让被包裹的类名不被模块化，而是作为全局使用，写法如下：



```css
:global(.red) {

  color: red;

}
```

> 在同一个元素上增加两个或多个类名方式可以是如下两种：



```html
<h1 className= { title + ' ' + 'red' }>这是评论列表组件</h1>

<h1 className= { [title, 'red'].join(' ') }>这是评论列表组件</h1>
```

### 3.6.2 local 设置局部的class类

在css样式表的文件中加入 `:local()`，让被包裹的类名被模块化，而是作为局部使用，与不写的效果一直，是默认的行为；

## 3.7.在项目中为scss或less文件启用模块化

### 3.7.1 导入第三方样式，如 Bootstrap

1. 安装 `Bootstrap` 第三方插件，执行 `npm i bootstrape@3.3.7 -S` 指令；
2. 在项目的代码中进行 `Bootstrap` 样式代码进行导入，如下：



```js
// 引入的包为 node_modules 目录中时，可以省略node_modules 目录，直接以包名开始引入自己的模块

import bootCss from 'bootstrap/dist/css/bootsrtap.css'  // 引入Bootstrap包的代码
```

1. 根据当前的报错提示信息发现，webpack无法处理一些图片文件，先下载第三方loader，执行`npm i url-loader file-loader -D`指令；再配置 `webpack.config.js`文件中的`module=>rules`的参数增加代码，重新启动项目后生效：



```js
rules: {

  {test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/}, // 千万别忘记排除 node_modules中的文件

  { test: /\.css$/, use: [ 'style-loader', 'css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]' ] },

  {test: /\.ttf|woff|woff2|eot|svg$/, use: [ 'url-loader' ]}, // 打包处理字体文件的loader

}
```

1. 注意在使用的时候，对于样式文件做了模块化处理，使用的方式变为上面使用对象的形式使用(使用有点儿麻烦)：



```html
使用bootstrap中的按钮的样式 btn btn-pramery ，如下：

<button className= { [bootCss.btn, bootCss['btn-primary']].join(' ') }></button>
```

1. 希望使用第三方的样式文件Bootstrap的方式，如下面这种样式：



```html
使用bootstrap中的按钮的样式 btn btn-pramery ，如下：

<button className= "btn btn-primary"></button>
```

1. 发现第三方的样式表都是以`.css`结尾，那么我们自己定义的样式文件可以使用`sass less stylus`来写样式文件，因而配置样式表的模块化中，换为`.scss .less .stylus`结尾的样式文件进行模块化处理，先需要安装这些样式文件的第三方loader插件，`scss` 安装执行`npm i saaa-loader node-sass -D`；再配置 `webpack.config.js`文件中的`module=>rules`的参数，导入样式改为`import 'bootstrap/dist/css/bootsrtap.css'`测试验证能够正确使用：



```js
rules: {

  { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ }, // 千万别忘记排除 node_modules中的文件

  { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },

  { test: /\.ttf|woff|woff2|eot|svg$/, use: [ 'url-loader' ] }, // 打包处理字体文件的loader

  { test: /\.scss$/, use: [ 'style-loader', 'css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]', 'sass-loader'] } // 打包处理scss文件的loader

}
```

## 3.8.在React中为按钮绑定点击事件

### 3.8.1 React 的事件绑定机制

- 在React中的事件绑定机制中，事件名为驼峰式格式，事件的值是一个`Function`
- React中的事件处理函数的语法格式为`onClick= { function }`，可以将该函数抽离出去，与`render()`函数同级，如下：



```js
render () {

  return <div>

    // 事件的值直接是一个function 匿名函数

    <button onClick= { function () { console.log('按钮点击事件触发') } }>按钮</button>

    // 注意此处函数引用不能给方法带小括号，带上小括号的意思是自执行函数；不过目前看来参数是个问题

    <button onClick= { this.myFunction }>按钮</button>

  </div>

}

// 这是一个实例方法

myFunction () {

  console.log('按钮点击事件触发')

}
```

- 用的最多的事件绑定形式为：(是由于箭头函数是个匿名函数，注意this的指向就行)



```js
render () {

  return <div>

    <button onClick= { () => this.myFunction('传参') }>按钮</button>

  </div>

}

// 事件处理函数需要定义为一个箭头函数，然后复制给函数名称

myFunction = (arg) => {

  console.log( '按钮点击事件触发，参数为：'+ arg )

}
```



```js
// 一个完整的构组件的代码

import React from 'react'

export default class BindEvent extends React.Component {

  construcroe () {

    super ()

    this.state= {

      msg: 'hahaha',

    }

  }

  render() {

    return <div>

      <button onClick= { () => this.show('参数1', '参数2') }>按钮</button>

    </div>

  }

  show = (arg1, arg2) => {

    console.log( '触发点击事件--'+ arg1+ arg2 )

  }

}
```

## 3.9.使用this.setState修改state上的数据

### 3.9.1 实现点击按钮，操作state中的数据



```js
  show = (arg1, arg2) => {

    console.log( '触发点击事件--'+ arg1+ arg2 )

    // React中，使用setState()方法改变state中的数据状态值，并自动进行页面重新渲染，而直接 this.state.msg 形式修改数据后不会重新渲染；

    this.setState({

      msg: '12345',

    });

  }
```

## 3.10.this.setState的两个注意点

- 在 `this.setState({})`中，只会把对应的数据状态更新，而不会覆盖其他的数据状态；
- `this.setState({})`中的代码时异步执行的，若在`this.setState({})`执行完毕后，又想立即拿到最新值，不能使用`this.state.msg`直接去取，而是使用`this.setState({},callback)`，用回调函数来获取最新的状态值；

## 3.11.React中绑定文本框与State中的值

默认情况下，在React中，如果页面的表单元素绑定了 `state` 上的数据的状态值，那么每当 `state` 上的状态值变换，必然会自动把最新的状态值同步到页面上：

> 单项数据绑定：状态值变化->自动更新页面数据；

若是UI页面的文本框内容变化时，需要将变化同步到 `state` 中去，此时React中没有这种自动同步机制，需要程序员手动监听文本框内容的变化 `onChange` 事件，在 `onChange` 事件中拿到最新的文本框的值(方案1：使用`e`事件进行获取；方案2：使用`ref`属性获取元素 )，再通过手动调用 `this.setState({})`手动把值同步到 `state` 中；



```js
  render() {

    return <div>

      <button onClick= { () => this.show('参数1', '参数2') }>按钮</button>

      {/* 若直接把文本框的 value 属性，绑定到了state 的数据状态值，而不提供 onChange 处理函数，

      得到的文本框是一个只读的文本框；当文本框绑定 value 值后，要么提供一个 readyOnly ，要么提供

      一个 onChange 处理函数 */}

      {/* <input type= "text" style= { {width: '100%'} } value= {this.state.msg} readOnly /> */}

      <input type= "text" style= { {width: '100%'} } value= {this.state.msg} onChange= { (e) => this.changeEvent(e) } ref= "txt" />

    </div>

  }

  // 每当文本框内容变换时，必将会调用这个函数

  changeEvent= (e) => {

    console.log('文本框内容变换时触发')

    // 方案1：使用`e`事件进行获取

    // console.log(e.target.value)

    // 方案2：使用`ref`属性获取元素

    console.log(this.refs.txt.value)

    // 调用 this.setState({ }) 改变 state 中的数据的状态值

    const newVal= e.target.value;

    this.setState({

      msg: newVal,

    })

  }
```

## 3.12.拓展-Vue中实例的生命周期

每个组件的实例，从 `创建->运行->销毁` 这个过程中，这些事件就叫做组件的生命周期函数；分析对比 `Vue`和 `React` 的生命周期函数；

### 3.12.2 Vue 组件的生命周期函数

> 参考Vue官方文档中的Vue声明周期函数的图示进行分析：[Vue生命周期图示](https://links.jianshu.com/go?to=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Finstance.html%23%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)

#### 3.12.2.1 Vue 组件的创建阶段

1. Init Event & LifeCycle：初始化`Vue事件`和`Vue的声明周期函数`；
2. `beforeCreate`：这是组件创建阶段的第一个声明周期函数，此时组件的`data`和`methods`以及页面的DOM结构都还没有初始化，因而什么都做不了；
3. Init injection & reactivity：初始化`data`和`methods`中的数据和方法；
4. `created`：这个是组件创建阶段的第二个生命周期函数，此时组件的`data`和`methods`已经可用了，但是页面还没有渲染出效果来，因而在这个生命周期中常常会发起 `Ajax` 请求；
5. Has 'el' option?：判断传入的Vue对象是否有`el`，有的话就进行编译控制区域的代码；没有的话就等待，直到`vm.$mounted(el)`手动渲染，也进行编译控制区域的代码 (把 data 上的数据拿到，并解析执行模板结构中的指令，当所有的指令解析完毕，那么模板页面就渲染到`内存`中了，此时模板页面还没有挂载到页面上，仅仅存放在内存中，因而用户还看不到效果)；
6. `beforMount`：这是组件创建阶段的第三个声明周期函数，此时模板结构在内存中已经编译完成，还没有真正渲染到页面中，此时看到的只是模板页面，没有进行数据的渲染；
7. Create vm.$el and replace 'el' with it：这一步正在把内存中渲染好的模板结构替换到页面上；
8. `mounted`：这个是组件创建阶段的第四个生命周期函数，此时页面已经真正的渲染好了，用户已经可以看到真实的页面数据；当这个生命周期函数执行完，组件的`创建阶段`就完成了，进入到了组件的`运行阶段`；若大家用到了一些第三方的UI插件，而且这些插件需要被初始化，那么必须在`mounted`中进行初始化插件；

#### 3.12.2.2 Vue 组件的运行阶段

按需根据 `data` 数据的变化，有选择性的执行 0 到 N 次；

1. `beforUpdate`：在这个生命周期函数中，数据是最新的数据，而在页面中呈现出的数据还是旧数据；
2. Virtual DOM re-render and patch：这个阶段是根据最新的 `data` 数据，重新渲染模板结构到内存中，并把渲染好的模板结构替换到页面上；
3. `updated`：在这个生命周期函数中，页面已经完成了更新，`data`数据是最新的，页面中呈现的数据也是最新的；

#### 3.12.2.3 Vue 组件的销毁阶段

1. `beforeDestroy`：这个生命周期函数会在 `vm.$destroy()`被调用时触发，只是表示改组件即将被销毁；此时组件还是可用的，比如其中的`data`和`methods`等数据方法，可正常访问；
2. Teardown watchers ,child components and event listeners：执行销毁处理操作，清理 `检测器 子组件 事件监听器`；
3. `destroyed`：在这个生命周期函数中，组件已经完成销毁，其中的`data`和`methods`等数据方法都不可访问使用；

## 3.13.拓展-Vue中实例的生命周期2（见上方）

## 3.14.快速梳理React的组件生命周期函数图

> 参考React官方文档中的React生命周期函数的图示进行分析：[React生命周期图示](https://links.jianshu.com/go?to=https%3A%2F%2Freact.docschina.org%2Fdocs%2Fstate-and-lifecycle.html)

### 3.14.1 React 组件的创建阶段

永远只执行一次；

1. `componentWillMount`：
2. `render`：
3. `componentDidMount`：

### 3.14.2 React 组件的运行阶段

按需根据 `props` 属性或 `state` 状态的改变，有选择性的执行 0 到多次；

1. `componentWillReceiveProps`：
2. `shouldcomponentUpdate`：
3. `componentWillUpdate`：
4. `render`：
5. `componentDidUpdate`：

### 3.14.3 React 组件的销毁阶段

永远只执行一次；

1. `componentWillUnmount`



