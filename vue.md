[一、基础](#一、基础)
- [1.1 概念](#11-概念)
- [1.2 vue的使用](#12-vue的使用)
- [1.3 vue指令](#13-vue指令)
- [1.4 修饰符](#14-修饰符)

[二、组件](#一、组件)
- [2.1 概念](#21-概念)
- [2.2 传值](#22-传值)
- [2.3 自定义组件上实现v-model](#23-自定义组件上实现v-model)
- [2.4 动态组件](#24-动态组件)
- [2.5 组件全局注册和局部注册](#25-组件全局注册和局部注册)
- [2.6 Prop说明](#26-Prop说明)
- [2.7 自定义事件](#27-自定义事件)
- [2.8 插槽](#28-插槽)
- [2.9 动态组件&异步组件](#29-动态组件&异步组件)
- [2.10 单文件组件](#210-单文件组件)

[三、动画](#三、动画)
- [3.1 单元素/组件的过渡](#31-单元素/组件的过渡)
- [3.2 多元素/组件的过渡](#32-多元素/组件的过渡)
- [3.3 列表的过渡效果](#33-列表的过渡效果)
- [3.4 数据的过渡效果](#34-数据的过渡效果)

[四、生命周期](#四、生命周期)
- [4.1 概念](#41-概念)
- [4.2 渲染函数render](#42-渲染函数render)
- [4.2 替换模板功能](#42-替换模板功能)

[五、全局方法和实例方法](#五、全局方法和实例方法)
- [5.1 实例方法](#51-实例方法)
- [5.2 全局方法](#52-全局方法)
- [5.3 vue的混入](#53-vue的混入)
- [5.4 自定义指令](#54-自定义指令)
- [5.5 过滤器](#55-过滤器)

[六、Vue-cli](#六、Vue-cli)
- [6.1 安装与项目 ](61-安装与项目)
- [6.2 基础服务 ](62-基础服务)

[七、router](#七、router)
- [7.1 概念](#71-概念)
- [7.2 编程式路由](#72-多路由配置)
- [7.3 命名路由和命名视图](#73-命名路由和命名视图)
- [7.4 重定向和别名](#74-重定向和别名)
- [7.5 高级设置](#75-高级设置)
- [7.6 导航守卫](#76-导航守卫)

[八、vueX](#八、vueX)
- [8.1 概念](#81-概念)

# 一、基础
## 1.1 概念
>严格意义上来讲，vue.js不是一个框架，它只是聚集视图层，是一个构建数据驱动的web界面的库（因其完美的生态圈，早可以成为框架）。vue通过简单的api提供高效的数据绑定和灵活的组件系统。vue内置额外方法很少，比如Router,ajax，表单验证等等一些额外的功能得由我们自行引入
* MVC：一般MVC是指Model(模型)、Controller(控制器)、View(视图)。View一般都是通过Controller来和Model进行联系的，Controller是Mode和View的协调者，view和Mode不直接联系，基本联系都是单向。
* MVVM: Model、View、ViewModel View的变化自动更新到ViewMode，ViewMode的变化也会自动同步到View显示，viewMode中实现子Observer（观察都模式）。
>基本特性：
* 轻量化：生产环境的vue才30kb，是jQuery生产版本是几分之一
* 数据绑定：页面内容和js控制的数据绑定，省去大量同步环节
* 指令：内置指令v-*和一些自定义的指令实现我们要实现的业务功能
* 方便拓展：内置方法不多，但可以很方便引入其他组件库
## 1.2 vue的使用
* 基础引入
>直接在html页面中引入
```html
<div id="test">{{msg}}</div>
<script src="src/vue.js"></script>
<script>
  let vm1=new Vue({
    el:"#test",
    data: {
      msg: "可以在页面上显示"
    }
  })
</script>
```
* 计算属性
>如果页面引入{{}}中的表达示太复杂了，可以使用计算属性(实时监听msg变化，响应式)如：
```html
<div id="test">
  {{msg.split('').reverse().join('')}}
</div>
```
```js
let vm1=new Vue({
    el:"#test",
    data: {
      msg: "可以在页面上显示"
    },
    computed: {
      reverseMsg: function(){
        return this.split('').reverse().join('')
      }
    }
  })
```
* watch
>监听属性变化，从而做其他操作
```js
let vm1=new Vue({
    el:"#test",
    data: {
      msg: "可以在页面上显示",
      sex: "男"
    },
    watch:{
      msg: function(val){
        this.sex="史莱姆"
      }
    }
  })
```
## 1.3 vue指令
* v-model
>在input、select、text、checkbox、radio等表单控件元素上数据绑定。
```
v-model在内部为不同的输入元素使用不同的属性和事件
1、text和textarea元素使用value属性和input事件。
2、checkbox和radio使用cheked属性和change事件
3、select字段将value作为prop并将change作为事件
```
* v-on
>动态绑定方法，可用“@”简写
```html
<!--如果想获取Dom可以用$event：-->
<button @click="say('你好世界', $event)"></button>
```
* v-for
>基本写法
```html
<li v-for="(wife, key, index) in wifes"></li>
<!-- 等于，key和index可选 -->
<li v-for="(wife, index) of wifes"></li>
<!-- 可以接受整数 -->
<li v-for="n in 10"></li>
```
>页面渲染问题汇总：
```js
1、如果数据项的顺序被改变，Vue将不会移动Dom元素来匹配数据项的顺序，而是就地更新每个元素。
2、直接对数据对象进行新增操作，不会马上渲染。
3、当你利用索引直接设置个数组项时，不会马上渲染
4、当你修改数组长度时，不会马上渲染
解决办法：
Vue.set(vm.items, indeOfItem, newValue);
Vue.set(vm.object, propertyName, value);
数组变异方法直接触发触发页面渲染：
push()
pop();
shift();
unshift();
splice();
sort();
reverse();
数组非变异方法，生成新数组：
可以用新数组更新旧数组，触发页面渲染
filter();
concat();
slice();
```

* v-else
* v-if
* v-else-if
* v-show
* v-once
>切出绑定，即使数据变化，view展示仍不会变化。
* v-html
>解析字符串html代码
* v-bind
>动态绑定属性，可用冒号“:”简写
>class和style在v-bind下专门做了增强加以是数组和对象：
```html
<div v-bind:class="{ active: isActive "text-danger": hasError }"></div>
<script>
<div v-bind:class="[{ active: isActive}, hasError }]"></div>
<script>
let vml = new Vue({
  el: "#app",
  data: {
    isActive: false;
    hasError: true;
  }
})
</script>
```
```html
<div v-bind:style="{ active: isActive "text-danger": hasError }"></div>
<script>
<div v-bind:style="[{ active: isActive}, hasError }]"></div>
<script>
let vml = new Vue({
  el: "#app",
  data: {
    isActive: false;
    hasError: true;
    active: {color: "red", fontSize: "24px"},
    hasError: {textAlign: "center"}
  }
})
</script>
```
## 1.4 修饰符
* v-mode修饰符
>.lazy
```
lazy模式，input触发change事件才会激活数据同步
```
>.number
```
输入的字符如果可以parseFloat解析则返回数字
```
>.trim
```
过滤首位空白字符
```
*.v-on修饰符
>.stop
```
阻止冒泡
```
>.prevent
```
阻止默认事件
```
>.capture
```
添加事件侦听器时使用capture模式（把默认的冒泡变为捕获）
注意：捕获的capture的修饰符必须在父节点使用。
```
>.self
```
只当当事件是被绑定元素本身上触发时，才会调用。
```
>.once
```
只触发一次回调
```
>.passive
```
用于优化移动端的前端性能
```
>.{keyCode|keyAlias}
```html
<!--用特定按键触发事件如：-->
<input type="text" @keydown.13="show1" />
<input type="text" @keydown.right="show2" />
<!--常用按键修饰符-->
<!--.enter|.tab|.delete|esc|space|up|down|left|middle|-->
<!--系统按键修饰符-->
<!--.ctrl .alt .shift .meta-->
<!--控制精确的系统修饰符-->
<!--.exact-->
```
>.native
```html
<!--监听组件根元素的原生事件-->
<!--下面例子如果不添加.native则不会触发myfn-->
<mycomponent v-on:click.native="myfn"></mycomonent>
<script type="text/javascript">
  Vue.component('mycomponent', {
    template: `<a href="#">点我</a>`
  })
  var vm = new Vue({
    el: '#app',
    methods: {
      myfn(){
        console.log(1);
      }
    }
  })
</script>
```

# 二、组件
## 2.1、概念
>组件是可复用的Vue实例，且带有一个名字，会把HTML相关的代码直接整合到实例对象中，可以实现一个实例多处用。
```
1、组件的数据：属性必须是一个函数，因此每个实例可以维护一个被返回对象的独立拷贝。
2、组件名称：后期利用名称在网页中实现自定义组件的展示
3、组件template：html结构，设置好各种数据和事件绑定

全局注册
局部注册
```
## 2.2、传值
* 基本的父子传值
```js
Vue.component("mygfs", {
  props: ["gfs"],
  template: `<ul><li v-for="gf in gfs">{{gf.age}}岁的{{gf.name}}</li></ul`
})
```
```html
<mygfs gfs="你好"></mygfs>
```
* 子父传值（父监听子组件事件）
```html
<div id="components-demo" v-bind:style="fontSize:fontSize+'em'">
  <mygfs gfs="你好" v-on:enlarg-text="addFontSize"></mygfs>
</div>
<script>
new Vue({
  el: '#components-demo',
  data: {
    fontSize: 1,
  },
  methods: {
    addFontSize: function(num){
      this.fontSize+=num;
    }
  }
})
Vue.component("mygfs", {
  props: ["gfs"],
  template: `
  <div>
    <button v-on:click="$emit('enlarg-text', 0.1)">加粗字体</button>
    <ul><li v-for="gf in gfs">{{gf.age}}岁的{{gf.name}}</li></ul>
  </div>`
})
</script>
```
## 2.3、自定义组件上实现v-model
>原理是，input的v-model,是原生value属性，和监听input事件的值绑定。

>如果是根节点是checkbox，则根节点上使用change方法，来让父组件的v-model监听。
```html
<div id="components-demo">
  <custom-input gfs="你好" v-model="value"></custom-input>
</div>
<script>
new Vue({
  el: '#components-demo',
  data: {
    value: 0,
  }
})
Vue.component("custom-input", {
  props: ["value"],
  template: `
  <input 
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  />
  `
})
</script>
```
## 2.4、动态组件
Vue的<component>元素加一个特殊的is特殊实现动态组件切换。is后跟要显示的组件名称,或组件实体。
>
```html
<div id="components-demo">
  <button
    v-for="tab in tabs"
    v-bind:key="tab.name"
    @click="currentComponent = tag"
  >{{tab.name}}</button>
  <component v-bind:is="currentComponent"></component>
</div>
<script>
var tabs = [
  {
    name: 'Home'
    component: {
      template: '<div>Home component</div>'
    }
  },{
    name: 'Posts'
    component: {
      template: '<div>Posts component</div>'
    }
  }
];
new Vue({
  el: '#components-demo',
  data: {
    tabs: 0,
    currentTab: tabs[0]
  }
})
</script>
```

## 2.5、组件全局注册和局部注册
* 全局注册
```html
<div id="app">
  <component-a></component-a>
  <component-b></component-b>
  <component-c></component-c>
</div>
<script>
  Vue.component('component-a', {/*...*/});
  Vue.component('component-b', {/*...*/});
  Vue.component('component-c', {/*...*/});
</script>
```
* 局部注册
```html
<div id="app">
  <componenta></componenta>
  <componentb></componentb>
</div>
<script>
  let componentA = {
    name: 'Home'
    component: {
      template: '<div>Home component</div>'
    }
  }
  let componentB = {
    name: 'Posts'
    component: {
      template: '<div>Posts component</div>'
    }
  }
  new Vue({
    el: '#app',
    components: {
      'componentsa': componentA.component,
      'componentsb': componentB.component,
    }
  })
</script>
```
## 2.6、Prop说明
>属性名称必须是小写

>type 可以是下列8种原生构造函数中的一个：
```
  String、Nubmer、Boolean、Array、Object、Date、Function、Symbol
```
* 验证
```html
props:{
  propA: Number,
  propB: [String, Number], // 是字符串或数字
  propC: {
    type: String,
    required: true
  }
  propC: {
    type: Number,
    default: 100
  }
  PropsE: { // 对象或数组默认必须从一个工厂函数获取
    type: Object,
    default: function(){
      return { message: 'hello' }
    }
  }
  propF: { // 自定义验证函数
    validator: function(value){
      return ['success', 'warning', 'danger'].indexOf(value) !=- -1;
    }
  }
}
```
* 非Prop的特性
```html
<!--一个非 prop 特性是指传向一个组件，但是该组件并没有相应 prop 定义的特性。
组件可以接受任意的特性，而这些特性会被添加到这个组件的根元素上。-->
```
* Prop之替换/合并
```html
  <!--由于非Prop的特性，如果传入子组件一个属性，该组件没有定义，就会将该传入属性自动赋值到子组件的根元素上，若根元素已有该属性就会替换-->
  <!--class 和 style 特性会稍微智能一些，即两边的值会被合并起来，从而得到最终的值-->
```
* Prop禁用特性继承
```html
<!--如果你不希望组件的根元素继承特性，你可以在组件的选项中设置 inheritAttrs: false-->
<!--注意 inheritAttrs: false 选项不会影响 style 和 class 的绑定。-->
```

## 2.7、自定义事件
* 自定义事件名称必须是小写可用连接符“-”。

* 父组件的自定义事件可以用，子组件的$emit触发。

* 原生事件定义到父组件上，不能直接被子组件根节点继承，需要添加.native修饰符，否则原生事件失效。

* .native默认将父组件传过来的原生事件，添加到了子组件根目录，如果想添加到其他节点上可以用$listeners。这时就不需要用.native了。
```html
<div id="app">
  <testcom v-on:click="clickfn"></testcom>
</div>
<script>
  Vue.component('testcom', {
    methods: {
      mycickfn(){
        console.log("你好世界");
      }
    },
    template: `
      <div>
        <button v-on="$listeners" v-on:dblclick="myclickfn">点击元素</button>
      </div>
    `
  })
  let vm = new Vue({
    el: "#app",
    methods: {
      clickfn: function(){
        console.log('点中了输入框元素')
      }
    }
  })
</script>
```
## 2.8、插槽
* 子组件slot接收父组件传过来的，两标签名中间的所有内容。
```html
<slot></slot>
```

* 如果父组件没有传入插槽内容，则子组件两个插槽标签中间的内容。

* 具名插槽
```html
<div id="app">
  <mainpage>
    <template v-slot:header>
      <h1>header的用户自定义内容</h1>
    </template>
    <p>主要内容1</p>
    <p>主要内容2</p>
    <template v-slot:footer>
      <h1>footer的用户自定义内容</h1>
    </template>
  </mainpage>
</div>
<script>
  Vue.component('mainpage',{
    template:`
      <div>
        <header><slot name="header"></slot></header>
        <main><slot></slot></main>
        <footer><slot name="footer"></slot></footer>
      </div>
    `
  })
  let vm = new Vue({
    el: '#app'
  })
</script>
```
* 插槽作用域Prop子传父

<div id="app">
  <current-user>
    <!--v-slot:default将子插槽传过来的数据用slotProps接收，
    如果当只有一个插槽时，可简写成v-slot="slotProps"，更可简写成去掉template标签，属性直接写到current-user
    slotProps可以解构成{user}，或起个别名{user: person}-->
    <template v-slot:default="slotProps">
      {{ slotProps.user.firstName }}
    </template>
  </current-user>
</div>
<script>
  Vue.component('current-user',{
    data: function(){
      return {
        user: {
          firstName: "万",
          lastName: "章"
        }
      }
    }
    // v-bind:user="user", 将user传给父级
    template:`
      <span> 
        <slot v-bind:user="user">{{user.lastName}}</slot>
      </span>
    `
  })
  let vm = new Vue({
    el: '#app'
  })
</script>

* 插槽v-slot缩写成#

## 2.9、动态组件&异步组件
* keep-alive
```html
<!--录使用is特性动态切换不同的组件时，会导致重新渲染页面的性能问题。-->
<div id="dynamic-component-demo">
  <button v-for="tab in tabs" v-bind:key="tab" v-bind: class="['tab-button', {active: currentTab === tab}]" v-on: click="currentTab = tab">{{tab}}</button>
  <keep-alive>
    <component v-bind:is="currentTabComponent" class="tab"></component>
  </keep-alive>
</div>
```
## 2.10 单文件组件
>安装cnpm
```js
// cnpm速度要比npm快很多，不容易短线
npm install –g cnpm –-registry=https://registry.npm.Taobao.org
```
>安装vue-cli
```js
cnpm install –g @vue/cli
```
>安装webpack
```js
cnpm install –g webpack
```
>项目创建
```js
vue ui
```
# 三、动画
## 3.1 单元素/组件的过渡
>vue提供了transition的封装组件，在下列情形中，可以给任何元素组件添加进入和离开的过渡。
```
条件渲染 (使用 v-if)
条件展示 (使用 v-show)
动态组件
组件根节点
```
* v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
* v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在过渡/动画完成之后移除。
* v-enter-to：定义进入过渡的结束状态。在元素被插入之后下一帧生效，在过渡/动画完成之后移除。
* v-leave：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
* v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在过渡/动画完成之后移除。
* v-leave-to：定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效，在过渡/动画完成之后移除。

```html
<style>
  .fade-enter-active {
    transition: all .3s ease;
  }
  .fade-leave-active {
    transition: all .8s cubic-bezier(0.1, 0.7, 1.0, 0.1);
  }
  .fade-enter, .fade-leave-to{
    transform: translateX(120px);
    opacity: 0;
  }
</style>
<div id="app">
  <button v-on:click="show=!show">切换状态</button>
  <transition name="fade">
    <p v-if="show">
      hello world
    </p>
  </transition>
</div>
<script>
    let vml = new Vue({
      el: "#app",
      data: {
        show: true
      }
    })
</script>
```
## 3.2 多元素/组件的过渡
>多元素时，需要添加key

>transition过度模式
* in-out：先进后出
* out-in：先出后进
```html
<style>
  .fade-enter-active {
    transition: .3s ease;
  }
  .fade-leave-active {
    transition: .8s cubic-bezier(0.1, 0.7, 1.0, 0.1);
  }
  .fade-enter, .fade-leave-to{
    transform: translateX(120px);
    opacity: 0;
  }
</style>
<div id="app">
  <button v-on:click="show=!show">切换状态</button>
  <transition name="fade" mode="out-in">
    <p v-if="show" key="one">
      hello world
    </p>
    <p v-else key="two">
        你好世界
    </p>
  </transition>
</div>
<script>
    let vml = new Vue({
      el: "#app",
      data: {
        show: true
      }
    })
</script>
```
>如果是多组件的过渡，不需要key，只需要使用动态组件。
## 3.3 列表的过渡效果
>特点
* <transition-group> 默认为一个<span>,可以用tag属性定义成其他标签
* 不能再用过度模式
* 必须添加key
* css过渡类会应用到内部的元素中
```html
<style>
  .list-item {
    transition: all 1s;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  /* .list-enter-action, .list-leave-action {
    transition: all 1s;
  } */
  .list-enter {
    opacity: 0;
    transform: translateY(10px);
  }
  .list-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
<div id="app">
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{item}}
    </span>
  </transition-group>
</div>
<script>
  new Vue({
    el: "#app",
    data: {
      items: [1,2,3,4,5,6,7,8,9],
      nextNum: 10
    },
    methods: {
      randomIndex: function(){
        return Math.floor(Math.random() * this.items.length);
      },
      add: function(){
        this.items.splice(this.randomIndex(), 0, this.nextNum++);
      },
      remove: function(){
        this.items.splice(this.randomIndex(), 1);
      }
    }
  })
</script>
```
>列表的交错过渡
```html
<!DOCTYPE html>
<html lang="zh-CN" xmlns:v-bind="http://www.w3.org/1999/xhtml">
	<head>
		<meta charset="utf-8">
		<title>vue动画学习</title>
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

        <style>

        </style>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>

	</head>
	<body>
		<div id="staggered-list-demo">
			<input v-model="query">
			<transition-group
					name="staggered-fade"
					tag="ul"
					v-bind:css="false"
					v-on:before-enter="beforeEnter"
					v-on:enter="enter"
					v-on:leave="leave"
			>
				<li
						v-for="(item, index) in computedList"
						v-bind:key="item.msg"
						v-bind:data-index="index"
				>{{ item.msg }}</li>
			</transition-group>
		</div>

		<script type="text/javascript">
			new Vue({
				el: '#staggered-list-demo',
				data: {
					query: '',
					list: [
						{ msg: 'Bruce Lee' },
						{ msg: 'Jackie Chan' },
						{ msg: 'Chuck Norris' },
						{ msg: 'Jet Li' },
						{ msg: 'Kung Fury' }
					]
				},
				computed: {
					computedList: function () {
						var vm = this;
						return this.list.filter(function (item) {
							return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
						})
					}
				},
				methods: {
					beforeEnter: function (el) {
						el.style.opacity = 0
						el.style.height = 0
					},
					enter: function (el, done) {
						var delay = el.dataset.index * 150
						setTimeout(function () {
							Velocity(
									el,
									{ opacity: 1, height: '1.6em' },
									{ complete: done }
							)
						}, delay)
					},
					leave: function (el, done) {
						var delay = el.dataset.index * 150
						setTimeout(function () {
							Velocity(
									el,
									{ opacity: 0, height: 0 },
									{ complete: done }
							)
						}, delay)
					}
				}
			})
		</script>
	</body>
</html>
```
## 3.4 数据的过渡效果
>Vue 的过渡系统提供了非常多简单的方法设置进入、离开和列表的动效。那么对于数据元素本身的动效呢，比如：
* 数字和运算
* 颜色的显示
* SVG 节点的位置
* 元素的大小和其他的属性
>这些数据要么本身就以数值形式存储，要么可以转换为数值。有了这些数值后，我们就可以结合 Vue 的响应式和组件系统，使用第三方库来实现切换元素的过渡状态。

```html
<!DOCTYPE html>
<html lang="zh-CN" xmlns:v-bind="http://www.w3.org/1999/xhtml">
	<head>
		<meta charset="utf-8">
		<title>vue动画学习</title>
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <style>
        </style>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js"></script>

	</head>
	<body>
	<div id="animated-number-demo">
		<input v-model.number="number" type="number" step="20">
		<p>{{ animatedNumber }}</p>
	</div>

		<script type="text/javascript">
			new Vue({
				el: '#animated-number-demo',
				data: {
					number: 0,
					tweenedNumber: 0
				},
				computed: {
					animatedNumber: function() {
						return this.tweenedNumber.toFixed(0);
					}
				},
				watch: {
					number: function(newValue) {
						TweenLite.to(this.$data, 0.5, { tweenedNumber: newValue });
					}
				}
			})
		</script>
	</body>
</html>

```

# 四、生命周期
## 4.1 概念
>beforeCreate:
* 组件状态：实例初始化之后，this指向创建的实例，不能访问到data、computed、watch、methods上的方法和数据
* 最佳实践: 常用于初始化非响应式变量
>created:
* 组件状态：实例创建完成，可访问data、computed、watch、methods上的方法和数据，未挂载到DOM，不能访问到$el属性，$ref属性内容为空数组
* 最佳实践：常用于简单的ajax请求，页面的初始化, 注意此时的元素并未显示在网页上, 所以一旦ajax请求过多, 那么就会出现长时间的白屏现象
> created
* 组件状态：实例创建完成，可访问data、computed、watch、methods上的方法和数据，未挂载到DOM，不能访问到$el属性，$ref属性内容为空数组
* 最佳实践：常用于简单的ajax请求，页面的初始化,
>beforeMount
* 组件状态：在挂载开始之前被调用，beforeMount之前，会找到对应的template，并编译成render函数
* 最佳实践：
>mounted
* 组件状态：实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，$ref属性可以访问
* 最佳实践：常用于获取VNode信息和操作，ajax请求, 此时元素已经显示在网页上, 可以发起一些大量数据的请求
>beforeupdate
* 组件状态：响应式数据更新时调用，发生在虚拟DOM打补丁之前
* 最佳实践：实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，$ref属性可以访问
>updated
* 组件状态：虚拟 DOM 重新渲染和打补丁之后调用，组件DOM已经更新，可执行依赖于DOM的操作
* 最佳实践：避免在这个钩子函数中操作数据，可能陷入死循环
>beforeDestroy
* 组件状态：实例销毁之前调用。这一步，实例仍然完全可用，this仍能获取到实例
* 最佳实践：常用于销毁定时器、解绑全局事件、销毁插件对象等操作
>destroyed
* 组件状态：实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁
* 最佳实践：
```
1、初始化组件时，仅执行了beforeCreate/Created/beforeMount/mounted四个钩子函数
2、当改变data中定义的变量（响应式变量）时，会执行beforeUpdate/updated钩子函数
3、当切换组件（当前组件未缓存）时，会执行新组件的beforeCreate/Created/beforeMount, 然后执行当前组件的beforeDestory/destroyed钩子函数,最后再执行新组建的mounted
4、初始化和销毁时的生命钩子函数均只会执行一次，beforeUpdate/updated可多次执行
```
## 4.2 渲染函数render
>Vue 推荐在绝大多数情况下使用模板来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力。这时你可以用渲染函数，它比模板更接近编译器。

>render函数就是用来渲染一个DOM的, 函数里面会有一个形参叫做createElement, createElement是专门用来渲染出DOM的函数,这个函数返回的不是一个实际的DOM.而是VDom
```html
<div id="app"></div>
<sript type="text/javascript">
  let com=vue.component("test", {
    data(){
      return{
        name: '张五'
      }
    },
    render(createElement){
      rturn createElement(
        'p', // 第一个参数是标签名称
        this.name
      )
    }
  })
  let vm=new Vue({el: "#app"});
  new com().$mount("#app");
</script>
```
```js
return createElement(
  // {String | Object | Function}
  // 标签，组件，resolve前两种的函数
  "div",
  // {Object}
  {
    attrs:{id:"foo"},
    class:{foo: true, bar: false},
    style: {color: "red", fontSize: "14px"},
    // 组件 prop
    props:{myprop: 'bar'}
    // Dom 属性
    domProps: {innerHTML:　'baz'}
    // 监听器，不支持.native这样的修饰器
    // 修饰符需简写成前缀使用: 
    //.passive:&
    //.capture:!
    //.once:~
    //.capture.once或.once.capture:~!
    // 修饰符在函数里的等价操作
    // .stop: event.stopPropagation();
    // .prevent: event.preventDefault();
    // .self: if(event.target !== event.currentTarget)return
    // .enter, .13: if(event.keyCode!==13)return
    // .ctrl,.alt,.shift,.meta: if(!event.ctrlKey)return
    on: {click: this.clickHandler}
    // 用于组件监听原生事件，而不是组件内部使用，‘vm.$emit’触发事件。
    nativeOn: {
      cick: this.nativeClickHandler
    }
    // 自定义指令
    directives: [
      {
        name: 'my-custom-directive',
        value: '2',
        expression: '1 + 1',
        arg: 'foo',
        modifiers: {
          bar: true
        }
      }
    ],
    // 作用域插槽的格式为：{name: props=>Vnode|Array<Vnode>}
    scodeSlots: {
      default: props => createElement('span', props.text),
      slot: 'name-of-slot',

    }
  }
  // {String|Array} 子级Vdom
  [
    createElement('h1', this.name),
    createElement("p", this.sex)
  ]
);
```
>需要重复很多次的元素/组件，你可以使用工厂函数来实现。
运行一次createElement方法, 就会创造一个新的VNode

## 4.3 js替换模板功能



# 五、全局方法和实例方法
## 5.1 实例方法
```JS
vm.$data
vm.$props
vm.$el // 实例会后才可以调用
vm.$mount() // 挂载
vm.$watch // 监听对象时：vm.$watch('someObject', callback, {deep: true}) 初始化时触发：immediate: true
vm.$options // 在Vue实例化时，自定义属性，可通过$option访问该属性
vm.$parent // 父实例，如果当前实例有的话
vm.$root // 当前实例的根实例，即祖先实例。如果没有的话则返回本身
vm.$children // 当前实例的直接子组件。需要注意 $children 并不保证顺序，也不是响应式的。
// 为了Vue检测不到属性添加和删除，设立的方法
vm.$set(target, propertyName/index, value);
vm.$delete(target, propertyName/index);
vm.$on(eventName, callbank);
vm.$once(eventName, callbank); // 监听自定义事件，只触发一次
vm.$off( [eventName, [callback]] ) // 移除监听事件
vm.$destroy(); // 完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。

触发 beforeDestroy 和 destroyed 的钩子。

```
## 5.2全局方法
* Vue.extend() 
>扩展实例构造器，返回一个还没有实例的构造器，需要new完用$mount挂载，或用Vue.component全局注册组件。
```js
var Profile = Vue.extend({
  template: '<p>{{name}}</p>',
  data: function(){
    return {
      name: '你好'
    }
  }
})
```
* Vue.nextTick( [callback, context] )
>在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
```js
Vue.nextTick(function(){//Dom更新了})
```
* Vue.set( target, propertyName/index, value )
>为确保这个新属性同样是响应式的，注意target对象不能是 Vue 实例，或者 Vue 实例的根数据对象

* Vue.delete( target, propertyName/index )
> 为确保这个新属性同样是响应式的，该方法用于避开 Vue 不能检测到属性被删除的限制

## 5.3vue的混入
>混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项如data、生命周期等！
```js
 let mixData={
   data(){
     return {
       msg: "hello world"
     }
   }
 }
 let com=Vue.extend({
   mixins: [mixData],
   template: `<p @cick="clickfn"></p>`,
   methods: {
     clickfn(){
       console.log("你好世界");
     }
   }
 })
 new com().$mount("#app");
 //如果混入对象合并与原有组件冲突时：
 //methods：原有组件会覆盖混入对象；
 //数据对象：会在内部递归合并，有冲突以原有组件数据优先。
 //钩子函数：会合并成一个数字，共同执行，先执行混入对象。
```

* 全局混入
>混入也可以进行全局注册。使用时格外小心！一旦使用全局混入，它将影响每一个之后创建的 Vue 实例。使用恰当时，这可以用来为自定义选项注入处理逻辑。
```js
// 为自定义的选项‘myOption’注入一个处理器
vue.mixin({
  created: function(){
    var myOption = this.$option.myOption;
    if(myOption){
      console.log(myOption);
    }
  }
})
new Vue({
  myOption: 'hello'
})
// "hello"
```

## 5.4自定义指令
* Vue.directive( “eventName”, options)
```
一个指令定义对象的钩子函数（均为可选）
1、bind：只调用一次，。在这里可以进行一次性的初始化设置。指令第一次绑定到元素时调用
2、inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
3、update：所在组件的 VNode ( 抽象DOM )更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
4、componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
5、unbind：只调用一次，指令与元素解绑时调用。
```
* 全局自定义指令
```html
<div id="app"></div>
<script type="text/javascript">
  Vue.directive("dingding", {
    // 当被绑定的元素插入到Dom中时
    inserted: function(el){
      console.log("hello world");
    }
  })
  let com=Vue.extend({
    template: '<p v-dingding>你好世界</p>',
  })
  let vm=new Vue({
    el: "#app"
  })
  new com().$mount("#app");
</script>
```
* 局部自定义指令
```js
let com = Vue.extend({
  template: '<p v-dingding>你好世界</p>',
  directives: {
  // 当被绑定的元素插入到Dom中时
    dingding:{
      inserted: function(el){
        console.log("hello world");
      }
    }
  }
})
```
* 指令钩子函数被传入的参数
```
1. el：指令所绑定的元素，可以用来直接操作 DOM 。
2. binding：一个对象，包含以下属性：
  ㈠、name：指令名，不包括 v- 前缀。
  ㈡、value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
  ㈢、oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
  ㈣、expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
  ㈤、arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
  ㈥、modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
3. vnode：Vue 编译生成的虚拟节点。
4.oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
```
* 动态指令参数
>指令的参数可以是动态的。例如，在 v-mydirective :[argument]="value" 中，argument 参数可以根据组件实例数据进行更新！这使得自定义指令可以在应用中被灵活使用。
```js
Vue.directive("posi", {
  bind(el, binding, vnode){
    el.style.position="absolute";
    el.style[binding.arg]=binding.value+"px";
    console.log("this.dir2");
  }
})
let com = Vu.component("test", {
  template: `<p v-posi:[dir]='200' @click="clickfn"`>hello world</p>
  data(){
    return { dir: 'left' }
  },
  methods:{
    clickfn(){
      this.dir==="left"?this.dir="right":this.dir="left";
      console.log(this.dir);
    }
  }
})
let vm = newVue({el: "#app"})
new com().$mount("#app");
```
>只触发bind和update时，可简写：
```js
vue.directive("color-swatch", function(el, binding){
  el.style.backgroundColor = binding.value;
})
```

>自定义指令参数值可以是一个对象
```html
<div v-demo="{color: 'white', text: 'hello!'}"
<script>
  Vue.directive('demo', function(el, binding){
    console.log(binding.value.color);
  }
</script>
```

## 5.5 过滤器
>Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 。

>过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：

* 局部过滤器
```js
let vm=newVue({
  filter: {
    capitalize(value){
      return ...
    }
  }
})
```
* 全局过滤器
```js
Vue.filter('capitalize', function(value){
  return ...
})
```
>过滤器可接收参数
{{ message | filter('arg1', arg2)}}

# 六、Vue-cli
## 6.1 安装与项目
>Vue的脚手架是专门提供给开发者用来创造和配置Vue项目的一个工具, 这个工具使用的次数非常频繁而且体积巨大, 建议大家直接全局安装就好啦
```js
npm install -g @vue/cli
vue create “项目名称”
```
>Vue-cli的核心理念就是, 对于那些不懂webpack的人来说,Vue-cli就直接把所有的webpack的配置都给隐藏起来, 就暴露一些比较简单的接口, 以减少用户的使用难度

* vue.config.js
```js
module.exports={
  publickPath: '/', // 项目所有资源都部署到这个路径之后。
  outputDir: "./bundle", // 生成生产环境构建文件的目录，构建前会覆盖该目录下的所有内容。
  assetsDir: "./assets", //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  indexPath: "demo.html", //指定生成的 index.html 的输出路径 (相对于 outputDir)。
  filenameHashing: false //生成的静态资源后面是否生成加上哈希值
  pages:{
    index: {
      //page的入口
      entry: 'src/main.js',
      // 模板
      template: 'public/index.html',
      // 在dist/index.html的输出
      filename: 'test.html',
      //当使用title选项时，title标签需要是<title><%= htmlWebpackPlugin.options.title%></title>
      title: 'Index page',
      // 在这个页面中包含的块，默认情况下会包含提取出来的通用chunk和vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  //Vue-cli里面对css的操作基本独立了出来,将各种各样的基本配置给进行了简化,这给我们的日常开发极大的减轻了负担
  css: {
    extract: false,//是否把组件中的css单独提取成一个文件。
    sourceMap: false,//是否为css开启source map
    loaderOption: {
      css: {
        // 这里的选项会传递给css-loader
      },
      postcss: {
        // 这里的选项会传递给postcss-loader
      },
      sass: {
      },
      less: {
      },
      stylus: {
      },
    }
  }
  // webpack-dev-server 的选项都支持
  // 配置开发服务器
  devServer: {
    // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
    proxy: "http://localhost:4000"
  }
}
```
## 6.2 基础服务 
* 运行指令详解
```js
用法:
vue-cli-service serve [options] [entry]
选项：
  --open //在服务器启动时打开浏览器
  --copy //在服务器启动时将URL复制到剪切板
  --mode //指定环境模式(默认development)
  --host //指定host（默认： 0.0.0.0）
  --port //指定port（默认:8000）
  --https //指定https（默认：false）
用法:
vue-cli-service build [options] [entry]
选项：
  --mode //指定环境模式(默认值： production)
  --dest //指定输出目录（默认：dist）
  --modern //面向现代浏览器带自动回退地构建应用
  --target //app|lib|wc|wc-async(默认值：app)
  --name //库或Wb Components模式下的名字（默认值：pakage.js）
  --no-clean //构建项目前不清除目录
  --report //生成report.html以帮助分析包内容
  --nreport-json //生成report.json以帮助分析包内容
  --watch //监听文件变化
```
* configureWebpack
>该对象将会被 webpack-merge 合并入最终的 webpack 配置
```js
module.exports={
  configureWebpack:{
    plugins:[
      new MyAwesomeWebpackPlugin()
    ]
  }
}
//注意!!!: 有些 webpack 选项是基于 vue.config.js 中的值设置的，所以不能直接修改。例如你应该修改 vue.config.js 中的 outputDir 选项而不是修改 output.path；你应该修改 vue.config.js 中的 publicPath 选项而不是修改 output.publicPath。这样做是因为 vue.config.js 中的值会被用在配置里的多个地方，以确保所有的部分都能正常工作在一起。
```
>如果需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后执行)
```js
configurewebpack: config=>{
  if(process.env.NODE_ENV==="production){
    // 为生产环境修改配置。。。
  } else {
    // 为开发环境修改配置。。。
  }
}
```

# 七、路由
## 7.1 概念
>传统的页面应用，是用一些超链接来实现页面切换和跳转的。在vue-router单页面应用中，则是路径之间的切换，也就是组件的切换。路由模块的本质 就是建立起url和页面之间的映射关系。

>单页面应用(SPA)的核心之一是: 更新视图而不重新请求页面;

* Hash模式
```
优点：
1、hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。
2、都受页面导航回退前进等影响; 
缺点：
3、支持低版本和IE浏览器
缺点:
1、丑
```
* History模式
```
优点： 
1、正常url

缺点:
1、回退刷新，一般就是404掉了，//需后台配置，或nginx配置或路由*号配置
2、HTML5新推出的API，不支持低版本浏览器

这种模式充分利用了html5 history中新增的 pushState() 和 replaceState() 方法。这两个方法应用于浏览器记录栈，在当前已有的 back、forward、go 基础之上，它们提供了对历史记录修改的功能。只是当它们执行修改时，虽然改变了当前的 URL ，但浏览器不会立即向后端发送请求。

```

* 路由的简易实现
1、定义路由组件
```js
const Bar = {template: '<div>bar</div>'}
```
2、定义路由
```js
// component可是通过Vue.extend()创建的组件构造器
const routes = [
  {path: '/bar', component: Bar}
]
```
3、创建路由实例
```js
const router = new VueRouter({routes});
```
4、创建和挂载根实例
```js
const app = new Vue({router}).$mount("#app");
```

* rouoter-link的标签自定义
```html
<router-link to="/bar" tag="button">go to bar</router-link>
```
```js
// 两属性，可以自定义被激活路由元素的class名称。
const router = new VueRouter({
  routes,
  linkActiveClass: "",
  linkExactActiveClass: ""
});
```
## 7.2 编程式路由
```js
this.$router.push(“目标路径”)// 强制跳转至某一路径
 this.$router.go(-1)//返回上一级
this.$router.replace(“目标路径”)//路由替换
```
* 嵌套路由
>嵌套路由的核心就在于如何清晰的定义好多级路由的标签格式和路径规则
```html
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <router-link to="/foo" tag="button">Go to Foo</router-link>
    <router-link to="/bar" tag="button">Go to Bar</router-link>
  </p>
  <router-view></routwr-view>
</div>
<script>
const Foo = {template: '<div>foo</div>'}
const Bar = {
  template: `<div>
    bar
    <router-link to="/foo" tag="button">Go to Foo</router-link>
    <router-link to="/bar" tag="button">Go to Bar</router-link>
  </div>`
}
const Barson1 = {template: '<div>barson1</div>'}
const Barson2 = {template: '<div>barson2</div>'}
const routes = [
  {
    path: '/foo',
    component: Foo
  },
  {
    path: '/bar',
    component: Bar,
    children: [//子路径不能写/，/代表1级路由
      {
        path: "barson1",
        component: Barson1
      },
      {
        path: "barson2",
        component: Barson2
      }
    ]
  }
]
</script>
```
## 7.3 命名路由和命名视图
* 命名路由
```js
// 字符串
router.push('home');
// 对象
router.push({pah: 'home'});
// 命名的路由
router.push({name: 'user', params:{userId:'123'}});
// 等价于
// <router-link :to="{name: 'user', params:{userId:'123'}}">User</router-link>
// 带查询参数，变成/register?plan=private
routwr.push({path: 'register', query: {plan: 'private'}});
```
* 命名视图
>router-view使用name命名，与routes路由里的components对象的key值对象相对应，如果 router-view 没有设置名字，那么key默认为 default。
```html
<div id="app">
  <h1>Nested Named Views</h1>
  <router-view></router-view>
</div>
<script>
  const UserSettingsNav = {
    template: `<div class="us_nav">
      <router-link to="/settings/emails">emails</router-link>
      <br>
      <router-link to="/settings/profile">profile</router-link>
    </div>`
  }
  const UserSettings = {
    template:`<div class="us">
      <h2>User Settings</h2>
      <UserSettingsNav/>
      <router-view class="us_content" />
      <router-view name="helper" class="us_content us_content--helper"/>
    </div>`,
    components:{UserSettingsNav}
  }
  const UserEmailsSubscriptions = {
    template: `
      <div>
        <h3>Email Subscriptions</h3>
      </div>
    `
  }
  const UserProfile = {
    template: `
      <div>
        <h3>Edit your profile</h3>
      </div>
    `
  }
  const UserProfilePreview = {
    template: `
      <div>
        <h3>Preview of your profile</h3>
      </div>
    `
  }
  const router = new VueRouter({
    mode: 'history',
    routes: [{
      path: '/settings',
      component: UserSettings,
      children: [{
        path: 'emails',
        component: UserEmailsSubscriptions,
        alias: "e" // 别名,可写成数组起多个别名
      },{
        path: 'profile',
        components: {
          default: UserProfile,
          helper: UserProfilePreview
        }
      }]
    }]
  })
  router.push('/settings/emails');
  new Vue({
    router,
    el: "#app",
  })
</script>
```
## 7.4 重定向和别名
* 重定向redirect
```js
const router=new VueRouter({
  routes: [{
    path: '/a', redirect: 'b'
  }]
});
// 等价于
const router=new VueRouter({
  routes: [{
    path: '/a', redirect: {}
  }]
});

// 动态返回重定向目标：
const router=new VueRouter({
  routes: [{
    path: '/a', redirect: to=>{
      // 方法接收目标路由作为参数
      // return 重定向的字符串路径/路径对象
    }
  }]
})
```
* 别名alias
```js
//别名可以是单个字符串也可以是数组，可以多个url路径指向同一个组件A
const router=new VueRouter({
  routes: [{
    path: '/a', component: A, alias: '/b'
  }]
});
```
## 7.5 高级设置
* 路由的参数传递--动态路由
```js
<ul>
  <router-link to="/foo/2/4">go to foo</router-link>
  <router-link to="/bar">go to bar</router-link>
</ul>
<script>
const router=new VueRouter({
  routes: [{
    path: '/foo/:a/:b', component: foo
  },{
    path: '/bar', component: bar
  }]
});
let foo={template: `<h2>foo{{this.$route.params.a}}{{this.$route.params.b}}</h2>`}
</script>
```
* 路由切换-ajax请求时机
```html
<ul>
  <router-link to="/foo/2/4">go to foo</router-link>
  <router-link to="/bar/2/1">go to bar</router-link>
</ul>
<script>
const router=new VueRouter({
  routes: [{
    path: '/foo/:a/:b', component: foo
  }]
});
let foo={
  template: `<h2>foo{{this.$route.params.a}}{{this.$route.params.b}}</h2>`,
  watch: {
    $route: function(){
      console.log(this.$route);
    }
  }
}
</script>
```
*路由的动画效果
```html
<div>
  <ul>
    <router-link to="/foo/2/4">go to foo</router-link>
    <router-link to="/bar">go to bar</router-link>
  </ul>
  <transition :name="transitionName" mode="out-in">
    <router-view></router-view>
  </transition>
</div>
<style>
  .slide-left-enter-active,
  .slide-left-leave-active, 
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all 1s ease;
  }
  .slide-left-enter, .slide-left-leave-to{
    transform: translateX(120px);
    opacity: 0;
  }
  .slide-right-enter, .slide-right-leave-to{
    transform: translateX(-120px);
    opacity: 0;
  }
</style>
<script>
const Foo = {
    template: `
      <div>
        <h3>Edit your Foo</h3>
      </div>
    `
  }
  const Bar = {
    template: `
      <div>
        <h3>Preview of your Bar</h3>
      </div>
    `
  }
  const router = new VueRouter({
    mode: 'hash',
    routes: [{
      path: '/foo/:id/:id',
      alias: ["/a", '/c'],
      component: Foo,
    },{
      path: '/bar',
      component: Bar,
    }]
  })
  router.push('/foo/2/4');
  new Vue({
    router,
    el: "#app",
    data: {
      transitionName: 'slide-right'
    },
    watch: {
      '$route'(to, from){
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.transitionName = toDepth<fromDepth?"slide-right":"slide-left";
      }
    }
  })
</script>
```
## 7.6 导航守卫
>导航完整的解析流程
```js
1.导航被触发；
2.在失活的组件里调用beforeRouteLeave守卫；
3.调用全局beforeEach守卫；
4.在复用组件里调用beforeRouteUpdate守卫；
5.调用路由配置里的beforeEnter守卫；
6.解析异步路由组件；
7.在被激活的组件里调用beforeRouteEnter守卫；
8.调用全局beforeResolve守卫；
9.导航被确认；
10.调用全局的afterEach钩子；
11.DOM更新；
12.用创建好的实例调用beforeRouteEnter守卫中传给next的回调函数。

// 路由配置守卫即配置在路由对象中
// 组件实力的导航守卫：beforeRouteLeave、beforeRouteEnter、beforeRouteUpdate
// 全局守卫：beforeEach、beforeResolve、afterEach
// 路由配置守卫：beforeEnter
```
>全局守卫
* router.beforeEach：全局前置守卫，进入路由之前
* router.beforeResolve：全局解析守卫，在beforeRouteEnter调用之后调用.
* router.afterEach：全局后置钩子，进入路由之后
```js
// 全局前置守卫
// 在Router实例上进行守卫
router.beforeEach((to, from, next) => {
  // to和from都是路由实例
  // to：即将跳转到的路由
  // from：现在的要离开的路由
  // next：函数
  // 如果未登录，就跳到登录页，如果登录了，选择哪个页面跳到哪个页面；如果登录了还去了login页面，就跳到首页。
  if (to.name !== 'login') {
    if (HAS_LOGIN) next()
    else next({ name: 'login' })
  } else {
    if (HAS_LOGIN) next({ name: 'home' })
    else next()
  }
})
// 全局解析守卫
router.beforeResolve((to,from.next) => {

})
// 全局后置钩子
router.afterEach((to,form) => {
    
})
// 其中next()函数有几个取值
// next()：进行管道中的下一个钩子，如果钩子全部都执行完了，那么导航的状态就是confirmed
// next(false)：中断当前导航。如果URL改变了，实际上会重置到URL改变前的from导航那里。
// next("/")或者next({path:"/"})：跳转到其他的地址。当前导航被中断，然后跳转到新导航。
// next(error)：如果传入的是一个error实例，则导航会被终止，且该错误会被传递给router.onError()注册过的回调。
```

>路由独享的守卫
```js
//如果不想在全局配置路由的话，可以为某些路由单独配置守卫
{
    path: '/',
    name: "home",
    component: Home,
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if(from.name === 'about'){
        alert("这是从about来的")
      }else{
        alert("这不是从about来的")
      }
      next();  // 必须调用来进行下一步操作。否则是不会跳转的
    }
  }
```
>路由组件内的守卫
* beforeRouteEnter()：进入路由前
* beforeRouteUpdate()：路由复用同一个组件时
* beforeRouteLeave()：离开当前路由时

```js
export default {
  // 组件内守卫
  // 因为这个钩子调用的时候，组件实例还没有被创建出来，因此获取不到this
  beforeRouteEnter (to, from, next) {
    console.log(to.name);
    // 如果想获取到实例的话
    // next(vm=>{
    //   // 这里的vm是组件的实例（this）
    // });
    next();
  },
  // 路由即将要离开的时候调用此方法
  // 比如说，用户编辑了一个东西，但是还么有保存，这时候他要离开这个页面，就要提醒他一下，还没保存，是否要离开
  beforeRouteLeave (to, from, next) {
    const leave = confirm("确定要离开吗？");
    if(leave) next()    // 离开
    else next(false)    // 不离开
  },
  // beforeRouteUpdate被触发的条件是：当前路由改变，但是该组件被复用的时候。
  // 比如说：argu/fu1到argu/f2这个路由，都复用了arg.vue这个组件，这个时候beforeRouteUpdate就会被触发。可以获取到this实例
  beforeRouteUpdate(to,from,next){
    console.log(to.name, from.name);
    next();
  },
}
```
# 八、vueX
## 8.1 概念
>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。

Vuex 主要有五部分：
state：包含了store中存储的各个状态。
getter: 类似于 Vue 中的计算属性，根据其他 getter 或 state 计算返回值。
mutation: 一组方法，是改变store中状态的执行者，只能是同步操作。
action: 一组方法，其中可以包含异步操作。
module: 将 store 分割为模块（module），每个模块拥有自己的 state 、 getters 、mutations 、actions 、甚至是嵌套子模块

* state

* getter
```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    }
  }
})
// 通过属性访问
store.getters.doneTodosCount // -> 1 // getter 属性访问,会作为 Vue 的响应式系统的一部分缓存其中的。
// 通过方法访问
store.getters.getTodoById(2) // 方法访问时，每次都会去进行调用，而不会缓存结果。
```
* mutation
mutations只能是同步地更改状态。
```json
mutations: {
  increment (state, payload) {
    state.count++
  }
},
this.$store.commit('increment', 10)
// 当在state里的对象，需要添加新属性时:
// 1、使用Vue.set(state.obj, 'newProp', 123);
// 2、state.obj = {...state.obj, newProp:123};
````
* action
```js
// Action 可以包含任意异步操作，而Mutation只能且必须是同步操作。
 actions: {
    addCount(context, payload) {
      // 可以包含异步操作
      // context 是一个与 store 实例具有相同方法和属性的 context 对象
    }
    context:
    {
      state, // 等同于store.state,若在模块中则为局部状态
      rootState, // 等同于store.state,只存在于模块中
      commit,
      dispatch,
      getters
    }
```
* modules
```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}
const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}
const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```
总模块引入子模块
```js
import Vuex from 'vuex'
import products from './modules/products' //引入子模块
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products   // 添加进模块中
  }
})
```

调用state, mutations,actions,getters
```js
mapState
mapGetters
mapMutations
mapActions
this.$store.state.
this.$store.mutations.
this.$store.actions.
this.$store.mutationsName.state.
this.$store.dispatch("模块名/action名称");// 调用actions
this.$store.commit("模块名/action名称");// 调用mutations
```