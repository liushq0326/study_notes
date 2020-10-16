<<<<<<< HEAD
[一、transform转换](#一transform转换)
- [1.1 translate位移](#11-translate位移)
- [1.2 rotate旋转变化](#12-rotate旋转变化)
- [1.3 scale缩放变化](#13-scale缩放变化)
- [1.4 skew倾斜变化](#14-skew倾斜变化)
- [1.5 matrix矩阵](#14-matrix矩阵)

[二、transition过度](#二transition过度)
- [2.1 transition概述](#21-transition概述)
- [2.2 transition-property](#22-transition-property)
- [2.3 transition-duration](#23-transition-duration)
- [2.4 transition-timing-function](#transition-timing-function)
- [2.5 transition-delay](#25-transition-delay)

[三、animation](#三animation)
- [3.1 animation概述](#31-animation概述)
- [3.2 keyframes](#32-keyframes)

[四、flex](#三flex)
- [4.1 flex-direction](#41-flex-direction)
- [4.2 flex-wrap](#42-flex-wrap)
- [4.3 flex-flow](#43-flex-flow)
- [4.4 jusify-content](#44-jusify-content)
- [4.5 align-items](#45-align-items)
- [4.6 align-content](#46-align-content)
- [4.7 项目属性](#47-项目属性)

[五、media](#三media)
- [5.1 media概述](#51-media概述)
- [5.2 语法逻辑](#52-语法逻辑)
- [5.3 媒体特性](#53-媒体特性)
- [5.4 编写响应式页面](#54-编写响应式页面)
  - [5.4.1 设置Meta标签](#541-设置Meta标签)
  - [5.4.2 加载兼容文件js](#542-加载兼容文件js)
  - [5.4.3 代码实例](#543-代码实例)
  - [5.4.4 rem适配](#544-rem适配)
- [5.5 vue中rem](#55-vue中rem)
# 一、transform转换
## 1.1 translate位移
```
  translate(x,y)	定义 2D 转换。	测试
  translate3d(x,y,z)	定义 3D 转换。	
  translateX(x)	定义转换，只是用 X 轴的值。	测试
  translateY(y)	定义转换，只是用 Y 轴的值。	测试
  translateZ(z)	定义 3D 转换，只是用 Z 轴的值。
```
## 1.2 rotate旋转变化
```
  scale(x,y)	定义 2D 缩放转换。	测试
  scale3d(x,y,z)	定义 3D 缩放转换。	
  scaleX(x)	通过设置 X 轴的值来定义缩放转换。	测试
  scaleY(y)	通过设置 Y 轴的值来定义缩放转换。	测试
  scaleZ(z)	通过设置 Z 轴的值来定义 3D 缩放转换。

  transform-origin: bottom; 旋转中心点
```

## 1.3 scale缩放变化
```
rotate(angle)	定义 2D 旋转，在参数中规定角度。	测试
rotate3d(x,y,z,angle)	定义 3D 旋转。	
rotateX(angle)	定义沿着 X 轴的 3D 旋转。	测试
rotateY(angle)	定义沿着 Y 轴的 3D 旋转。	测试
rotateZ(angle)
```
## 1.4 skew倾斜扭曲变化
```
  skew(x-angle,y-angle)	定义沿着 X 和 Y 轴的 2D 倾斜转换。	测试
  skewX(angle)	定义沿着 X 轴的 2D 倾斜转换。	测试
  skewY(angle)
  transform-style: flat|preserve-3d;
    flat	表示所有子元素在2D平面呈现。
    preserve-3d	表示所有子元素在3D空间中呈现。
  perspective: 500; // 景深
  perspective-origin: bottom; // 景深相对位置
```
## 1.5 matrix矩阵
>>matrix() 方法需要六个参数，包含数学函数，允许您：旋转、缩放、移动以及倾斜元素。
```
transform:matrix(0.866,0.5,-0.5,0.866,0,0);
-ms-transform:matrix(0.866,0.5,-0.5,0.866,0,0);		/* IE 9 */
-moz-transform:matrix(0.866,0.5,-0.5,0.866,0,0);	/* Firefox */
-webkit-transform:matrix(0.866,0.5,-0.5,0.866,0,0);	/* Safari and Chrome */
-o-transform:matrix(0.866,0.5,-0.5,0.866,0,0);		/* Opera */
```


# 二、transition过渡

## 2.1 transition概述
```
   transition: 设置元素从初始值到重点值过渡
   transition: property duration timing-function delay;
```
## 2.2 transition-property
```
   transition-property: 设置过度属性
```
## 2.3 transition-duration
```
   transition-duration: 设置过度时间
```
## 2.4 transition-timing-function
```
   transition: 设置过度速度取值如下：linear ease-in ease-out ease-in-out
```
## 2.5 transition-delay
```
   transition-delay: 设置过度延迟时间
```
# 三、animation

## 3.1 animation概述
>> animation: name duration timing-function delay iteration-count direction fill-mode play-state;
```
  animation-name	指定要绑定到选择器的关键帧的名称
  animation-duration	动画指定需要多少秒或毫秒完成
  animation-timing-function	设置动画将如何完成一个周期
  animation-delay	设置动画在启动前的延迟间隔。
  animation-iteration-count	定义动画的播放次数。
  animation-direction	指定是否应该轮流反向播放动画。
  animation-fill-mode	规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。
  animation-play-state	指定动画是否正在运行或已暂停。
```
## 3.2 @keyframes
>>@keyframes animationname {keyframes-selector {css-styles;}}
```
  @keyframes mymove
  {
    from {top:0px;}
    to {top:200px;}
  }

  animationname	必需的。定义animation的名称。
  keyframes-selector	必需的。动画持续时间的百分比。
  合法值：

  0-100%
  from (和0%相同)
  to (和100%相同)

  注意： 您可以用一个动画keyframes-selectors。

  css-styles	必需的。一个或多个合法的CSS样式属性
```

# 四、flex
>>flex布局下float\clear\vertical-align将失效
## 4.1 flex-direction
```
  主轴方向：
    row(默认)：水平从左到右
    row-reverse：水平从右到左
    column: 竖直从上到下
    column-reverse: 竖直从下到上
```
## 4.2 flex-wrap
```
  子元素超出是否换行：
    nowrap(默认)：不换行
    wrap：换行 并且第一行在上边
    wrap-reverse：换行 并且第一行在下边
```
## 4.3 flex-flow
```
  主轴方向和是否换行：
    flex-flow：flex-direction flex-wrap
```
## 4.4 jusify-content
```
  主轴对齐方式：
    flex-start: 对齐主轴起点
    flex-end: 对齐主轴终点
    center: 对齐主轴中点
    space-around: 两端对齐，两端有间隙
    space-between: 两端对齐，两端无间隙
```
## 4.5 align-items
```
  交叉轴对齐方式：
    flex-start: 对齐交叉轴起点
    flex-end: 对齐交叉轴终点
    center: 对齐交叉轴中点
    space-around: 两端对齐，两端有间隙
    space-between: 两端对齐，两端无间隙
    stretch(默认)：如果弹性子元素未设置高度，将占满整个弹性容器的高度
```
## 4.6 align-content
```
  多行交叉轴对齐方式：
    flex-start: 对齐交叉轴起点
    flex-end: 对齐交叉轴终点
    center: 对齐交叉轴中点
    space-around: 两端对齐，两端有间隙
    space-between: 两端对齐，两端无间隙
    stretch(默认)：如果弹性子元素未设置高度，将占满整个弹性容器的高度
```
## 4.7 项目属性
```
  order: 属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
  flex-grow：属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
  flex-shrink：属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
  flex-basis：默认值为auto，即项目的本来大小。也可以为350px，表示固定主轴尺寸350px
  flex：flex-grow flex-shrink flex-basis复合写法，默认值为0 1 auto;
  align-self：属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch,可选值：auto | flex-start | flex-end | center | baseline | stretch;
```
# 五、media
## 5.1 media概述
>>@media 媒体查询选择性加载css，意思是自动探测屏幕宽度，然后加载相应的css文件。可以针对不同的屏幕尺寸设置不同的样式，当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面，这对调试来说是一个极大的便利。
```
  基本使用
  <!-- link元素中的CSS媒体查询 -->
  <link rel="stylesheet" media="(max-width: 800px)" href="example.css" />

  <!-- 样式表中的CSS媒体查询 -->
  <style>
  @media (max-width: 600px) {
    .facet_sidebar {
      display: none;
    }
  }
  </style>
```
## 5.2 语法逻辑
```
  all	用于所有设备
  print	用于打印机和打印预览
  screen 用于电脑屏幕，平板电脑，智能手机等。（最常用）
  speech 应用于屏幕阅读器等发声设备
  语法：
  @media mediaType and|not|only (media feature) {
      /*css-Code;*/
  }
```
## 5.3 媒体特性
>>媒体特性（Media features）描述了 user agent、输出设备，或是浏览环境的具体特征。媒体特性表达式是完全可选的，它负责测试这些特性或特征是否存在、值为多少。每条媒体特性表达式都必须用括号括起来
|  名称   | 简介  | 备注  |
|  ----  | ----  | ----  |
|any-hover | 是否有任何可用的输入机制允许用户（将鼠标等）悬停在元素上？|	在 Media Queries Level 4 中被添加。|
|any-pointer|	可用的输入机制中是否有任何指针设备，如果有，它的精度如何？	在 Media Queries Level 4 中被添加。|
|aspect-ratio	|视窗（viewport）的宽高比	|  |
|color|	输出设备每个像素的比特值，常见的有 8、16、32 位。如果设备不支持输出彩色，则该值为 0	|  |
|color-gamut|	用户代理和输出设备大致程度上支持的色域|	在 Media Queries Level 4 中被添加。|
|color-index|	输出设备的颜色查询表（color lookup table）中的条目数量，如果设备不使用颜色查询表，则该值为 0	|
|device-aspect-ratio |	输出设备的宽高比|	已在 Media Queries Level 4 中被弃用。|
|device-height |	输出设备渲染表面（如屏幕）的高度|	已在 Media Queries Level 4 中被弃用。|
|device-width| 	输出设备渲染表面（如屏幕）的宽度|	已在 Media Queries Level 4 中被弃用。|
|display-mode	| 应用程序的显示模式，如web app的manifest中的display 成员所指定|在 Web App Manifest spec被定义.|
|forced-colors|	检测是user agent否限制调色板|	在 Media Queries Level 5 中被添加。|
|grid|	输出设备使用网格屏幕还是点阵屏幕？	||
|height|	视窗（viewport）的高度	||
|hover	|主要输入模式是否允许用户在元素上悬停|在 Media Queries Level 4 中被添加。|
|inverted-colors	user agent或者底层操作系统是否反转了颜色|	在 Media Queries Level 5 中被添加。|
|light-level|	环境光亮度|	在 Media Queries Level 5 中被添加。|
|monochrome	|输出设备单色帧缓冲区中每个像素的位深度。如果设备并非黑白屏幕，则该值为 0||
|orientation|	视窗（viewport）的旋转方向|orientation:portrait/landscape竖屏/横屏|	
|overflow-block	|输出设备如何处理沿块轴溢出视窗(viewport)的内容|在 Media Queries Level 4 中被添加。|
|overflow-inline	|沿内联轴溢出视窗(viewport)的内容是否可以滚动？|在 Media Queries Level 4 中被添加。|
|pointer	|主要输入机制是一个指针设备吗？如果是，它的精度如何？|在 Media Queries Level 4 中被添加。|
|prefers-color-scheme|	探测用户倾向于选择亮色还是暗色的配色方案|	在 Media Queries Level 5 中被添加。|
|prefers-contrast	|探测用户是否有向系统要求提高或降低相近颜色之间的对比度|	在 Media Queries Level 5 中被添加。|
|prefers-reduced-motion	|用户是否希望页面上出现更少的动态效果|	在 Media Queries Level 5 中被添加。|
|prefers-reduced-transparency	|用户是否倾向于选择更低的透明度	在 Media Queries Level 5 中被添加。|
|resolution	|输出设备的像素密度（分辨率）	||
|scan|	输出设备的扫描过程（适用于电视等）||	
|scripting|	探测脚本（例如 JavaScript）是否可用	|在 Media Queries Level 5 中被添加。|
|update|	输出设备更新内容的渲染结果的频率|	在 Media Queries Level 4 中被添加。|
|width|	视窗（viewport）的宽度，包括纵向滚动条的宽度	||

## 5.4 编写响应式页面
### 5.4.1 设置Meta标签
```html
<meta name="viewport" content="" />视口的作用：在移动浏览器中，当页面宽度超出设备，浏览器内部虚拟的一个页面容器，将页面容器缩放到设备这么大，然后展示
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
width = device-width：宽度等于当前设备的宽度
initial-scale：初始的缩放比例（默认设置为1.0，即代表不缩放）
width [pixel_value | device-width] 例如width = 640 
height [pixel_value | device-height] 
minimum-scale 允许缩放的最小比例 
maximum-scale 允许缩放的最大比例 
user-scalable 是否允许手动缩放 （yes || no 或 1 | 0）
```
### 5.4.2 加载兼容文件js
>>因为IE8既不支持html5也不支持css3 @media ，所以我们需要加载两个js文件，来保证我们的代码实现兼容效果
```html
<!--[if lt IE 9]>
　　<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
　　<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
<![endif]-->
```
>>设置IE渲染方式默认为最高(可选)
```html
现在有很多人的IE浏览器都升级到IE9以上了，所以这个时候就有又很多诡异的事情发生了，例如现在是IE9的浏览器，但是浏览器的文档模式却是IE8 为了防止这种情况，我们需要下面这段代码来让IE的文档渲染模式永远都是最新的
<meta http-equiv="X-UA-Compatible" content="IE=Edge，chrome=1">
// 这段代码后面加了一个chrome=1，如果用户的电脑里安装了 chrome，就可以让电脑里面的IE不管是哪个版本的都可以使用Webkit引擎及V8引擎进行排版及运算，如果没有安装，就显示IE最新的渲染模式。
```
### 5.4.3 代码实例
```js
方式一：
  @media screen and (min-width:300px) and (max-width:500px) {
    body {
        background-color:lightblue;
    }
  }
```
方式二：
```js
  @import url("css/reset.css") screen;
```
```html
方式三：
  <link rel="" type="" href="A.css" media="screen and (min-width: 800px)"> 
  <link rel="" type="" href="B.css" media="screen and (min-width: 600px) and (max-width: 800px)"> 
  <link rel="" type="" href="C.css" media="screen and (max-width: 600px)"> 
  <link rel='stylesheet' media='all and (orientation:portrait)' href='portrait.css'> 
  <link rel='stylesheet' media='all and (orientation:landscape)' href='landscape.css'> 
  <link rel='stylesheet' type='text/css" media="print" href='print.css' />
```
### 5.4.4 rem适配
```js
  function setRem() {

  var whdef = 20/1920;// 表示1920的设计图,使用100PX的默认值

  var bodyWidth = document.body.clientWidth;// 当前窗口的宽度

  var rem = bodyWidth * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值

  document.getElementsByTagName(‘html’)[0].style.fontSize = rem + ‘px’;

  }

  window.addEventListener(‘load’, setRem);

  window.addEventListener(‘resize’, setRem);
```

```js
(function(win,doc){ 
 var docEl = doc.documentElement || document.body;//获取HTML标签 
 //判断是移动端设备还是PC,移动 就采用'orientationchange',横竖屏事件，PC端就采用onresize，窗口改变时间 
 var resize = 'orientationchange' in win ? 'orientationchange':'resize'; 
 function rem(){ 
  var w = docEl.clientWidth/720>1?720:docEl.clientWidth; 
  docEl.style.fontSize= 100*(w/720)+'px'; 
 } 
 doc.addEventListener('DOMContentLoaded',rem,false); 
 //监听'DOMContent事件:DOM加载完成执行,如果DOMContent事件，那么执行rem函数 
 win.addEventListener(resize,rem,false); 
//win下监听resize事件,如果resize事件，那么执行rem函数 
})(window,document)

```
## 5.5 vue中rem

  第一部分：项目中引入lib-flexible

  一、项目中安装lib-flexible
```js
  npm install lib-flexible --save
```
  二、在项目的入口main.js文件中引入lib-flexible
```js
  import 'lib-flexible'
```
  第二部分：插件的作用是 自动将vue项目中的px转换为rem 。
使用postcss-px2rem时的vue.config.js配置：
```js
npm i postcss-plugin-px2rem  --save -dev
module.exports = {
    lintOnSave: true,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px2rem')({ //配置项，详见官方文档
                        remUnit: 30
                    }), // 换算的基数
                ]
            }
        }
    },
}
```
备注：可能会出现ui组件变小，原因 组件css一依据 data-dpr="1" 时写的尺寸<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">这时我们使用的flexible引入时 data-dpr不是一个写死了的，是一个动态的；就导致这个问题
然后就各种查解决方案，网络上给的解决方案一个是改写第三方库的样式，还有一个就是让flexible不编译第三方库的文件（忽略ui组件库的样式文件）。

解决方案一：
```
  将第三方组件的css文件复制出来第三方库的css代码px统一扩大2倍，或者用全局替换将px替换为px/*no*/。我觉的这个方案不太好没有采用，具体操作可以参考以下两篇文章：https://segmentfault.com/a/1190000014575890 和 https://blog.csdn.net/weixin_42464312/article/details/82769805。
```
解决方案二：
```
  使用postcss-px2rem-exclude，网上好多说用这个方法不起作用，经过一个下午的折腾才发现是使用方法不对，我的错误方法就不跟你们说了，直接来正确的。
  首先，需要卸载项目中的postcss-px2rem。
  npm  uninstall postcss-px2rem --save-dev
  其次，安装postcss-px2rem-exclude

  npm  install postcss-px2rem-exclude --save
  最后是配置exclude选项，需要注意的是这个配置在vue.config.js中式不起作用的，如图。
  ```

  正确的配置位置是项目根目录下的postcss.config.js文件，如果你的项目没有生成这个独立文件，就需要在你的package.js里设置。
postcss.config.js
```
  module.exports = {
    plugins: {
      autoprefixer: {},
      "postcss-px2rem-exclude": {
        remUnit: 75,
        exclude: /node_modules|folder_name/i
      }
    }
  };
```
package.json
```
  "postcss": {
    "plugins": {
      "autoprefixer": {},
      "postcss-px2rem-exclude":{
          "remUnit": 75,
          "exclude":"/node_modules|floder_name/i"
      }
    }
  },
```
=======
[一、transform转换](#一transform转换)
- [1.1 translate位移](#11-translate位移)
- [1.2 rotate旋转变化](#12-rotate旋转变化)
- [1.3 scale缩放变化](#13-scale缩放变化)
- [1.4 skew倾斜变化](#14-skew倾斜变化)
- [1.5 matrix矩阵](#14-matrix矩阵)

[二、transition过渡](#二transition过渡)
- [2.1 transition概述](#21-transition概述)
- [2.2 transition-property](#22-transition-property)
- [2.3 transition-duration](#23-transition-duration)
- [2.4 transition-timing-function](#transition-timing-function)
- [2.5 transition-delay](#25-transition-delay)

[三、animation动画](#三animation动画)
- [3.1 animation概述](#31-animation概述)
- [3.2 keyframes](#32-keyframes)

[四、flex弹性布局](#四flex弹性布局)
- [4.1 flex-direction](#41-flex-direction)
- [4.2 flex-wrap](#42-flex-wrap)
- [4.3 flex-flow](#43-flex-flow)
- [4.4 jusify-content](#44-jusify-content)
- [4.5 align-items](#45-align-items)
- [4.6 align-content](#46-align-content)
- [4.7 项目属性](#47-项目属性)

[五、media](#五media)
- [5.1 media概述](#51-media概述)
- [5.2 语法逻辑](#52-语法逻辑)
- [5.3 媒体特性](#53-媒体特性)
- [5.4 编写响应式页面](#54-编写响应式页面)
  - [5.4.1 设置Meta标签](#541-设置Meta标签)
  - [5.4.2 加载兼容文件js](#542-加载兼容文件js)
  - [5.4.3 代码实例](#543-代码实例)
  - [5.4.4 rem适配](#544-rem适配)
- [5.5 vue中rem](#55-vue中rem)

[六、垂直水平居中](#六垂直水平居中)
- [6.1 水平居中](#6.1-水平居中)
- [6.2 垂直居中](#6.2-垂直居中)
- [6.3 定位水平垂直居中](#6.3-定位水平垂直居中)
- [6.4 使用flex](#6.4-使用flex)
- [6.5 vertical-align基线](#6.5-vertical-align基线)

[七、display:table](#七display:table)
- [7.1 概述](#7.1-概述)
- [7.2 模拟表格、平分宽度](#7.2-模拟表格、平分宽度)

[八、grid布局](#八grid布局)
- [8.1 概述](#8.1-概述)

[九、float](#九float)


# 一、transform转换
## 1.1 translate位移
```
  translate(x,y)	定义 2D 转换。	测试
  translate3d(x,y,z)	定义 3D 转换。	
  translateX(x)	定义转换，只是用 X 轴的值。	测试
  translateY(y)	定义转换，只是用 Y 轴的值。	测试
  translateZ(z)	定义 3D 转换，只是用 Z 轴的值。
```
## 1.2 rotate旋转变化
```
  scale(x,y)	定义 2D 缩放转换。	测试
  scale3d(x,y,z)	定义 3D 缩放转换。	
  scaleX(x)	通过设置 X 轴的值来定义缩放转换。	测试
  scaleY(y)	通过设置 Y 轴的值来定义缩放转换。	测试
  scaleZ(z)	通过设置 Z 轴的值来定义 3D 缩放转换。

  transform-origin: bottom; 旋转中心点
```

## 1.3 scale缩放变化
```
rotate(angle)	定义 2D 旋转，在参数中规定角度。	测试
rotate3d(x,y,z,angle)	定义 3D 旋转。	
rotateX(angle)	定义沿着 X 轴的 3D 旋转。	测试
rotateY(angle)	定义沿着 Y 轴的 3D 旋转。	测试
rotateZ(angle)
```
## 1.4 skew倾斜扭曲变化
```
  skew(x-angle,y-angle)	定义沿着 X 和 Y 轴的 2D 倾斜转换。	测试
  skewX(angle)	定义沿着 X 轴的 2D 倾斜转换。	测试
  skewY(angle)
  transform-style: flat|preserve-3d;
    flat	表示所有子元素在2D平面呈现。
    preserve-3d	表示所有子元素在3D空间中呈现。
  perspective: 500; // 景深
  perspective-origin: bottom; // 景深相对位置
```
## 1.5 matrix矩阵
>>matrix() 方法需要六个参数，包含数学函数，允许您：旋转、缩放、移动以及倾斜元素。
```
transform:matrix(0.866,0.5,-0.5,0.866,0,0);
-ms-transform:matrix(0.866,0.5,-0.5,0.866,0,0);		/* IE 9 */
-moz-transform:matrix(0.866,0.5,-0.5,0.866,0,0);	/* Firefox */
-webkit-transform:matrix(0.866,0.5,-0.5,0.866,0,0);	/* Safari and Chrome */
-o-transform:matrix(0.866,0.5,-0.5,0.866,0,0);		/* Opera */
```


# 二、transition过渡

## 2.1 transition概述
```
   transition: 设置元素从初始值到重点值过渡
   transition: property duration timing-function delay;
```
## 2.2 transition-property
```
   transition-property: 设置过度属性
```
## 2.3 transition-duration
```
   transition-duration: 设置过度时间
```
## 2.4 transition-timing-function
```
   transition: 设置过度速度取值如下：linear ease-in ease-out ease-in-out
```
## 2.5 transition-delay
```
   transition-delay: 设置过度延迟时间
```
# 三、animation动画

## 3.1 animation概述
>> animation: name duration timing-function delay iteration-count direction fill-mode play-state;
```
  animation-name	指定要绑定到选择器的关键帧的名称
  animation-duration	动画指定需要多少秒或毫秒完成
  animation-timing-function	设置动画将如何完成一个周期
  animation-delay	设置动画在启动前的延迟间隔。
  animation-iteration-count	定义动画的播放次数。
  animation-direction	指定是否应该轮流反向播放动画。
  animation-fill-mode	规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。
  animation-play-state	指定动画是否正在运行或已暂停。
```
## 3.2 @keyframes
>>@keyframes animationname {keyframes-selector {css-styles;}}
```
  @keyframes mymove
  {
    from {top:0px;}
    to {top:200px;}
  }

  animationname	必需的。定义animation的名称。
  keyframes-selector	必需的。动画持续时间的百分比。
  合法值：

  0-100%
  from (和0%相同)
  to (和100%相同)

  注意： 您可以用一个动画keyframes-selectors。

  css-styles	必需的。一个或多个合法的CSS样式属性
```

# 四、flex弹性布局
>>flex布局下float\clear\vertical-align将失效
## 4.1 flex-direction
```
  主轴方向：
    row(默认)：水平从左到右
    row-reverse：水平从右到左
    column: 竖直从上到下
    column-reverse: 竖直从下到上
```
## 4.2 flex-wrap
```
  子元素超出是否换行：
    nowrap(默认)：不换行
    wrap：换行 并且第一行在上边
    wrap-reverse：换行 并且第一行在下边
```
## 4.3 flex-flow
```
  简写了flex-direction、flex-wrap：
    flex-flow：flex-direction flex-wrap
    默认值：row nowrap。
```
## 4.4 jusify-content
```
  主轴对齐方式：
    flex-start: 对齐主轴起点
    flex-end: 对齐主轴终点
    center: 对齐主轴中点
    space-around: 两端对齐，两端有间隙
    space-between: 两端对齐，两端无间隙
```
## 4.5 align-items
```
  交叉轴对齐方式：
    flex-start: 对齐交叉轴起点
    flex-end: 对齐交叉轴终点
    center: 对齐交叉轴中点
    space-around: 两端对齐，两端有间隙
    space-between: 两端对齐，两端无间隙
    stretch(默认)：如果弹性子元素未设置高度，将占满整个弹性容器的高度
```
## 4.6 align-content
```
  多行交叉轴对齐方式：
    flex-start: 对齐交叉轴起点
    flex-end: 对齐交叉轴终点
    center: 对齐交叉轴中点
    space-around: 两端对齐，两端有间隙
    space-between: 两端对齐，两端无间隙
    stretch(默认)：如果弹性子元素未设置高度，将占满整个弹性容器的高度
```
## 4.7 项目属性
```
  order: 属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
  flex-grow：属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
  flex-shrink：属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
  flex-basis：默认值为auto，即项目的本来大小。也可以为350px，表示固定主轴尺寸350px，主轴为横向时代表宽度，主轴为纵向时代表高度。
  flex：flex-grow flex-shrink flex-basis复合写法，默认值为0 1 auto;该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
  align-self：属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch,可选值：auto | flex-start | flex-end | center | baseline | stretch;
```
# 五、media
## 5.1 media概述
>>@media 媒体查询选择性加载css，意思是自动探测屏幕宽度，然后加载相应的css文件。可以针对不同的屏幕尺寸设置不同的样式，当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面，这对调试来说是一个极大的便利。
```
  基本使用
  <!-- link元素中的CSS媒体查询 -->
  <link rel="stylesheet" media="(max-width: 800px)" href="example.css" />

  <!-- 样式表中的CSS媒体查询 -->
  <style>
  @media (max-width: 600px) {
    .facet_sidebar {
      display: none;
    }
  }
  </style>
```
## 5.2 语法逻辑
```
  all	用于所有设备
  print	用于打印机和打印预览
  screen 用于电脑屏幕，平板电脑，智能手机等。（最常用）
  speech 应用于屏幕阅读器等发声设备
  语法：
  @media mediaType and|not|only (media feature) {
      /*css-Code;*/
  }
```
## 5.3 媒体特性
>>媒体特性（Media features）描述了 user agent、输出设备，或是浏览环境的具体特征。媒体特性表达式是完全可选的，它负责测试这些特性或特征是否存在、值为多少。每条媒体特性表达式都必须用括号括起来
|  名称   | 简介  | 备注  |
|  ----  | ----  | ----  |
|any-hover | 是否有任何可用的输入机制允许用户（将鼠标等）悬停在元素上？|	在 Media Queries Level 4 中被添加。|
|any-pointer|	可用的输入机制中是否有任何指针设备，如果有，它的精度如何？	在 Media Queries Level 4 中被添加。|
|aspect-ratio	|视窗（viewport）的宽高比	|  |
|color|	输出设备每个像素的比特值，常见的有 8、16、32 位。如果设备不支持输出彩色，则该值为 0	|  |
|color-gamut|	用户代理和输出设备大致程度上支持的色域|	在 Media Queries Level 4 中被添加。|
|color-index|	输出设备的颜色查询表（color lookup table）中的条目数量，如果设备不使用颜色查询表，则该值为 0	|
|device-aspect-ratio |	输出设备的宽高比|	已在 Media Queries Level 4 中被弃用。|
|device-height |	输出设备渲染表面（如屏幕）的高度|	已在 Media Queries Level 4 中被弃用。|
|device-width| 	输出设备渲染表面（如屏幕）的宽度|	已在 Media Queries Level 4 中被弃用。|
|display-mode	| 应用程序的显示模式，如web app的manifest中的display 成员所指定|在 Web App Manifest spec被定义.|
|forced-colors|	检测是user agent否限制调色板|	在 Media Queries Level 5 中被添加。|
|grid|	输出设备使用网格屏幕还是点阵屏幕？	||
|height|	视窗（viewport）的高度	||
|hover	|主要输入模式是否允许用户在元素上悬停|在 Media Queries Level 4 中被添加。|
|inverted-colors	user agent或者底层操作系统是否反转了颜色|	在 Media Queries Level 5 中被添加。|
|light-level|	环境光亮度|	在 Media Queries Level 5 中被添加。|
|monochrome	|输出设备单色帧缓冲区中每个像素的位深度。如果设备并非黑白屏幕，则该值为 0||
|orientation|	视窗（viewport）的旋转方向|orientation:portrait/landscape竖屏/横屏|	
|overflow-block	|输出设备如何处理沿块轴溢出视窗(viewport)的内容|在 Media Queries Level 4 中被添加。|
|overflow-inline	|沿内联轴溢出视窗(viewport)的内容是否可以滚动？|在 Media Queries Level 4 中被添加。|
|pointer	|主要输入机制是一个指针设备吗？如果是，它的精度如何？|在 Media Queries Level 4 中被添加。|
|prefers-color-scheme|	探测用户倾向于选择亮色还是暗色的配色方案|	在 Media Queries Level 5 中被添加。|
|prefers-contrast	|探测用户是否有向系统要求提高或降低相近颜色之间的对比度|	在 Media Queries Level 5 中被添加。|
|prefers-reduced-motion	|用户是否希望页面上出现更少的动态效果|	在 Media Queries Level 5 中被添加。|
|prefers-reduced-transparency	|用户是否倾向于选择更低的透明度	在 Media Queries Level 5 中被添加。|
|resolution	|输出设备的像素密度（分辨率）	||
|scan|	输出设备的扫描过程（适用于电视等）||	
|scripting|	探测脚本（例如 JavaScript）是否可用	|在 Media Queries Level 5 中被添加。|
|update|	输出设备更新内容的渲染结果的频率|	在 Media Queries Level 4 中被添加。|
|width|	视窗（viewport）的宽度，包括纵向滚动条的宽度	||

## 5.4 编写响应式页面
### 5.4.1 设置Meta标签
```html
<meta name="viewport" content="" />视口的作用：在移动浏览器中，当页面宽度超出设备，浏览器内部虚拟的一个页面容器，将页面容器缩放到设备这么大，然后展示
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
width = device-width：宽度等于当前设备的宽度
initial-scale：初始的缩放比例（默认设置为1.0，即代表不缩放）
width [pixel_value | device-width] 例如width = 640 
height [pixel_value | device-height] 
minimum-scale 允许缩放的最小比例 
maximum-scale 允许缩放的最大比例 
user-scalable 是否允许手动缩放 （yes || no 或 1 | 0）
```
### 5.4.2 加载兼容文件js
>>因为IE8既不支持html5也不支持css3 @media ，所以我们需要加载两个js文件，来保证我们的代码实现兼容效果
```html
<!--[if lt IE 9]>
　　<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
　　<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
<![endif]-->
```
>>设置IE渲染方式默认为最高(可选)
```html
现在有很多人的IE浏览器都升级到IE9以上了，所以这个时候就有又很多诡异的事情发生了，例如现在是IE9的浏览器，但是浏览器的文档模式却是IE8 为了防止这种情况，我们需要下面这段代码来让IE的文档渲染模式永远都是最新的
<meta http-equiv="X-UA-Compatible" content="IE=Edge，chrome=1">
// 这段代码后面加了一个chrome=1，如果用户的电脑里安装了 chrome，就可以让电脑里面的IE不管是哪个版本的都可以使用Webkit引擎及V8引擎进行排版及运算，如果没有安装，就显示IE最新的渲染模式。
```
### 5.4.3 代码实例
```js
方式一：
  @media screen and (min-width:300px) and (max-width:500px) {
    body {
        background-color:lightblue;
    }
  }
```
方式二：
```js
  @import url("css/reset.css") screen;
```
```html
方式三：
  <link rel="" type="" href="A.css" media="screen and (min-width: 800px)"> 
  <link rel="" type="" href="B.css" media="screen and (min-width: 600px) and (max-width: 800px)"> 
  <link rel="" type="" href="C.css" media="screen and (max-width: 600px)"> 
  <link rel='stylesheet' media='all and (orientation:portrait)' href='portrait.css'> 
  <link rel='stylesheet' media='all and (orientation:landscape)' href='landscape.css'> 
  <link rel='stylesheet' type='text/css" media="print" href='print.css' />
```
### 5.4.4 rem适配
```js
  function setRem() {

  var whdef = 20/1920;// 表示1920的设计图,使用100PX的默认值

  var bodyWidth = document.body.clientWidth;// 当前窗口的宽度

  var rem = bodyWidth * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值

  document.getElementsByTagName(‘html’)[0].style.fontSize = rem + ‘px’;

  }

  window.addEventListener(‘load’, setRem);

  window.addEventListener(‘resize’, setRem);
```

```js
(function(win,doc){ 
 var docEl = doc.documentElement || document.body;//获取HTML标签 
 //判断是移动端设备还是PC,移动 就采用'orientationchange',横竖屏事件，PC端就采用onresize，窗口改变时间 
 var resize = 'orientationchange' in win ? 'orientationchange':'resize'; 
 function rem(){ 
  var w = docEl.clientWidth/720>1?720:docEl.clientWidth; 
  docEl.style.fontSize= 100*(w/720)+'px'; 
 } 
 doc.addEventListener('DOMContentLoaded',rem,false); 
 //监听'DOMContent事件:DOM加载完成执行,如果DOMContent事件，那么执行rem函数 
 win.addEventListener(resize,rem,false); 
//win下监听resize事件,如果resize事件，那么执行rem函数 
})(window,document)

```
## 5.5 vue中rem

  第一部分：项目中引入lib-flexible

  一、项目中安装lib-flexible
```js
  npm install lib-flexible --save
```
  二、在项目的入口main.js文件中引入lib-flexible
```js
  import 'lib-flexible'
```
  第二部分：插件的作用是 自动将vue项目中的px转换为rem 。
使用postcss-px2rem时的vue.config.js配置：
```js
npm i postcss-plugin-px2rem  --save -dev
module.exports = {
    lintOnSave: true,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px2rem')({ //配置项，详见官方文档
                        remUnit: 30
                    }), // 换算的基数
                ]
            }
        }
    },
}
```
备注：可能会出现ui组件变小，原因 组件css一依据 data-dpr="1" 时写的尺寸<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">这时我们使用的flexible引入时 data-dpr不是一个写死了的，是一个动态的；就导致这个问题
然后就各种查解决方案，网络上给的解决方案一个是改写第三方库的样式，还有一个就是让flexible不编译第三方库的文件（忽略ui组件库的样式文件）。

解决方案一：
```
  将第三方组件的css文件复制出来第三方库的css代码px统一扩大2倍，或者用全局替换将px替换为px/*no*/。我觉的这个方案不太好没有采用，具体操作可以参考以下两篇文章：https://segmentfault.com/a/1190000014575890 和 https://blog.csdn.net/weixin_42464312/article/details/82769805。
```
解决方案二：
```
  使用postcss-px2rem-exclude，网上好多说用这个方法不起作用，经过一个下午的折腾才发现是使用方法不对，我的错误方法就不跟你们说了，直接来正确的。
  首先，需要卸载项目中的postcss-px2rem。
  npm  uninstall postcss-px2rem --save-dev
  其次，安装postcss-px2rem-exclude

  npm  install postcss-px2rem-exclude --save
  最后是配置exclude选项，需要注意的是这个配置在vue.config.js中式不起作用的，如图。
  ```

  正确的配置位置是项目根目录下的postcss.config.js文件，如果你的项目没有生成这个独立文件，就需要在你的package.js里设置。
postcss.config.js
```
  module.exports = {
    plugins: {
      autoprefixer: {},
      "postcss-px2rem-exclude": {
        remUnit: 75,
        exclude: /node_modules|folder_name/i
      }
    }
  };
```
package.json
```
  "postcss": {
    "plugins": {
      "autoprefixer": {},
      "postcss-px2rem-exclude":{
          "remUnit": 75,
          "exclude":"/node_modules|floder_name/i"
      }
    }
  },
```
# 六、垂直水平居中
## 6.1 水平居中
* 1、如果子元素是块级元素：子元素设置display:block/table;margin: 0 auto;
* 2、如果子级元素是行内元素或者行内块元素，需要父级设置text-align:center;子级设置display: inline/inline-block;
## 6.2 垂直居中
* 1、如果父子元素不脱离标准流：父元素设置display:table-cell;vertical-align: middle;
2和3一起，可以实现水平垂直居中
## 6.3 定位水平垂直居中
* 1、如果已知子元素大小，可以设置子元素top: 50%; left: 50%; margin-top和margin-left为负的子元素大小的一半
* 2、如果未知子元素大小，可以设置子元素top: 50%; left: 50%; transform: translate(-50%,-50%)
* 3、如果已知子元素大小，还可以使用top: 0; left: 0; right: 0; bottom: 0; margin: auto;来实现（4个方向的margin都是auto，这个方法margin与子元素大小没有关系）
## 6.4 使用flex
* 1、父元素display: flex;
主轴居中布局，父元素要用justify-content: center;
交叉轴居中布局： 父元素要用align-item: center;
两个一起用，实现水平垂直居中布局。
* 2、父元素display:flex，子元素margin:auto，实现水平垂直居中。
## 6.4 vertical-align基线
>不同元素的基线各不相同，一般我们将小写字母x当做的基线当做基础基线，去对比其他元素基线位置，x默认基准基线是在x字母正下方。
```
默认基线位置：
  图片：最下方
  输入框: 里面文字x的最下方
  按钮: 里面文字x的最下方
  标签有字：里面字x标签
  标签没字：最下方
  标签有字添加overflow的hidden、scroll、overlay、auto时：最下方。
```
* vertical-align设置%
```
当设置属性为"%"的时候，指的是当前行内元素的line-height属性值的占比，可以设置成正负值，行内元素基线相对父元素字体基线上下移动这个百分比的距离。
```
* vertical-align设置middle
```
当设置属性为“middle”的时候，行内元素中间位置会和父元素字体基线上方1/2"x-height"位置对齐，“x-height”其实就是父元素中小写字母“x”的高度
```
* vertical-align其他属性值
```
baseline	默认。元素放置在父元素的基线上。
sub	垂直对齐文本的下标。
super	垂直对齐文本的上标
top	把元素的顶端与行中最高元素的顶端对齐
text-top	把元素的顶端与父元素字体的顶端对齐
middle	把此元素放置在父元素的中部。
bottom	把元素的顶端与行中最低的元素的顶端对齐。
text-bottom	把元素的底端与父元素字体的底端对齐。
length	 
%	使用 "line-height" 属性的百分比值来排列此元素。允许使用负值。
inherit	规定应该从父元素继承 vertical-align 属性的值。
```
# 七、display:table
## 7.1 概述
>支持IE8，目前，在大多数开发环境中，已经基本不用table元素来做网页布局了，取而代之的是div+css，那么为什么不用table系表格元素呢？

1、用DIV+CSS编写出来的文件k数比用table写出来的要小，不信你在页面中放1000个table和1000个div比比看哪个文件大

2、table必须在页面完全加载后才显示，没有加载完毕前，table为一片空白，也就是说，需要页面完毕才显示，而div是逐行显示，不需要页面完全加载完毕，就可以一边加载一边显示

3、非表格内容用table来装，不符合标签语义化要求，不利于SEO

4、table的嵌套性太多，用DIV代码会比较简洁
```
table
使该元素按table样式渲染
table-row
使该元素按tr样式渲染
table-cell
使该元素按td样式渲染
table-row-group
使该元素按tbody样式渲染
table-header-group
使该元素按thead样式渲染
table-footer-group
使该元素按tfoot样式渲染
table-caption
使该元素按caption样式渲染
table-column
使该元素按col样式渲染
table-column-group
使该元素按colgroup样式渲染
```
表头1 | 表头2
-----------| -----------
table | (类似\<table>)此元素会作为块级表格来显示，表格前后带有换行符。
inline-table | （类似 \<table>）此元素会作为内联表格来显示，表格前后没有换行符。
table-row-group |	（类似 \<tbody>）此元素会作为一个或多个行的分组来显示。
table-header-group |（类似 \<thead>）此元素会作为一个或多个行的分组来显示。
table-footer-group  |	（类似 \<tfoot>）此元素会作为一个或多个行的分组来显示。
table-row |	（类似 \<tr>）此元素会作为一个表格行显示。
table-column-group |	（类似 \<colgroup>）此元素会作为一个或多个列的分组来显示。
table-column	|（类似 \<col>）此元素会作为一个单元格列显示。
table-cell	|（类似 \<td> 和 \<th>）此元素会作为一个表格单元格显示。
table-caption	|（类似 \<caption>）此元素会作为一个表格标题显示。


* border-collapse定义边框类型

  collapse：共用框
  separate：独立边框

## 7.2 模拟表格、平分宽度
```html
<style type="text/css" rel="stylesheet">
    .table {
        display: table;
        border: 1px solid #cccccc;
        margin: 5px;
        /*display: table时padding会失效*/
    }
    .row {
        display: table-row;
        border: 1px solid #cccccc;
        /*display: table-row时margin、padding同时失效*/
    }
    .cell {
        display: table-cell;
        border: 1px solid #cccccc;
        padding: 5px;
        /*display: table-cell时margin会失效*/
    }
</style>
<div class="table">
    <div class="row">
        <div class="cell">张三</div>
        <div class="cell">李四</div>
        <div class="cell">王五</div>
    </div>
    <div class="row">
        <div class="cell">张三</div>
        <div class="cell">李四</div>
        <div class="cell">王五</div>
    </div>
</div>
```
## 7.3 注意事项
>虽然display：table解决了避免使用表格的问题，但有几个需要注意的：

* （1）display: table时padding会失效
* （2）display: table-row时margin、padding同时失效
* （3）display: table-cell时margin会失效
# 八、grid
## 8.1 概述
>支持浏览器不太好，除了ie和flex支持到10，其他浏览器和flex相比差很远，暂时不总结了可以看[阮一峰总结的一网址](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
# 九、float
## 9.1 概述
>支持主流浏览器，下面是浮动经典案例文字环绕
```html
<style type="text/css">
    .box {
        width: 300px;
        border: 1px solid black;
        background-color: red;
    }
    .box img {
        width: 150px;
        float: left;
    }
</style>
<div class="box">
    <img class="img1" src="./images/1.jpg" alt="">
    浮动布局解决的经典案例，浮动布局解决的经典案例
</div>
```
>浮动会脱离文档流，不过还会占有原来的位置，可以使文字环绕。
## 9.2 缺点
>如果父级不设置高度的话，会导致父级会导致高度塌陷，解决办法：
```
① 浮动的父级设置高度
super {
    height: npx;
}
② 浮动的父级设置overflow
super {
    overflow: hidden;
}
③ 浮动的父级兄弟设置clear
brother {
    clear: left | right | both;
}
④ 浮动的父级伪类清浮动
super:after {
    content: "";
    display: block;
    clear: left | right | both;
}
```

>>>>>>> 583feb3c51efc9821758b9f38200ac8d58702a59
