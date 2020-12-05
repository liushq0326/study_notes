[toc]

# 一、概念和创建
## 1.1 概述
- 什么是模块化？
  - 模块化是从代码的角度进行分析；
  - 开发中把一些可复用的代码抽离为整个的模块，便于项目的维护开发；
- 什么是组件化？
  - 组件化是从UI界面的角度进行分析；
  - 把一些可复用的UI元素（如轮播图）抽离为单独的组件；

vue和react优缺点
- React：由Facebook前端开发团队维护和更新；，技术实力比较雄厚；
- React：诞生时间早，社区很强大，一些常见的问题、坑、最优解决方案、文档、博客在社区中都可以方便找到；
- React：结合ReactNative，提供了无缝迁移到移动APP的开发体验（RN用的最多且最火，许多大公司都在使用来开发手机App）；
- Vue：由尤雨溪的开发团队进行开发和维护；
- Vue：相对React小些，可能有一些坑没有踩过；
- Vue：结合Weex技术，提供了迁移到移动端APP开发的体验（阿里的项目使用）；

>vue
```
  Vue.js的特性如下：
　　    1.轻量级的框架
　　    2.双向数据绑定
　　    3.指令
　　    4.插件化
  优点：  1. 简单：官方文档很清晰，比 Angular 简单易学。
　　　　  2. 快速：异步批处理方式更新 DOM。
　　　　  3. 组合：用解耦的、可复用的组件组合你的应用程序。
　　　　  4. 紧凑：~18kb min+gzip，且无依赖。
　　　　  5. 强大：表达式 & 无需声明依赖的可推导属性 (computed properties)。
　　　　  6. 对模块友好：可以通过 NPM、Bower 或 Duo 安装，不强迫你所有的代码都遵循 Angular 的各种规定，使用场景更加灵活。
  缺点：  1. 新生儿：Vue.js是一个新的项目，没有angular那么成熟。
　　　　  2. 影响度不是很大：google了一下，有关于Vue.js多样性或者说丰富性少于其他一些有名的库。
　　　　  3. 不支持IE8：

```
>REACT和vue只是框架的骨架，其他的功能如路由、状态管理等是框架分离的组件。

>VUE宣称可以更快地计算出Virtual DOM的差异，这是由于它在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。

>而对于REACT而言，每当应用的状态被改变时，会全部子组件会重新渲染。当然，这也可以通过shouldComponentUpdate这个生命周期方法来进行控制，但VUE将此视为默认的优化。
## 1.2 创建
* 函数时创建
```js
function HelloComponent(props, context) {
  return <div>Hello {props.name}</div>
}
ReactDOM.render(<HelloComponent name="yourName" />, mountNode) 
```
* createClass
```js
var Greeting = React.createClass({
    getInitialState: function () {
        return {
            work_list: []
        };
    },
    render: function () {
        return (
            <div>
                <input type="text" ref="myWork" placeholder="What need to be done?" onKeyUp={this.Enter}/>
                <ul>
                    {
                        this.state.work_list.map(function (textValue) {
                            return <li key={textValue}>{textValue}</li>;
                        })
                    }
                </ul>

            </div>
        );
    },
    Enter: function (event) {
        var works = this.state.work_list;
        var work = this.refs.myWork.value;
        if (event.keyCode == 13) {
            works.push(work);
            this.setState({work_list: works});
            this.refs.myWork.value = "";
        }
    }
});
```
* 定义class，extends React.Component
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

// 编译后变成React.createElement()
const myh1= React.createElement(
  'h1',
  {title: "标题", id: "test"},
  '内容信息'
);
ReactDOM.render(myh1, document.getElementById("app"))
```
# 二、生命周期
## 2.1 旧的生命周期
* getDefaultProps
* getInitialState
* constructor(props, context)
* componentWillMount()
* componentDidMount()
* componentWillUnmount ()

* componentWillReceiveProps (nextProps)
* shouldComponentUpdate(nextProps,nextState)

>因为react父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，因此需要在子组件的该生命周期中做判断
* componentWillUpdate (nextProps,nextState)
* componentDidUpdate(prevProps,prevState)
* render()

* componentWillUnmount()

## 2.2 新增生命周期

* 16.3版本：引入带UNSAFE_前缀的3个生命周期函数UNSAFE_componentWillMount，UNSAFE_componentWillReceiveProps和UNSAFE_componentWillUpdate，这个阶段新旧6个函数都能用。新引入生命周期函数getDerivedStateFromProps和getSnapshotBeforeUpdate，用来代替componentWillReceiveProps和componentWillUpdate
* 16.3+版本：警告componentWillMount，componentWillReceiveProps和componentWillUpdate即将过时，这个阶段新旧6个函数也都能用，只是旧的在DEV环境会报Warning
* 17.0版本：正式废弃componentWillMount，componentWillReceiveProps和componentWillUpdate，这个阶段只有新的带UNSAFE_前缀的3个函数能用，旧的不会再触发


* getDerivedStateFromProps
>而在新版本中，官方将更新 state 与触发回调重新分配到了 getDerivedStateFromProps 与 componentDidUpdate 中，使得组件整体的更新逻辑更为清晰。而且在 getDerivedStateFromProps 中还禁止了组件去访问 this.props，强制让开发者去比较 nextProps 与 prevState 中的值，以确保当开发者用到 getDerivedStateFromProps 这个生命周期函数时，就是在根据当前的 props 来更新组件的 state，而不是去做其他一些让组件自身状态变得更加不可预测的事情。

```js
// 直接return对象更新state值
static getDerivedStateFromProps(nextProps, prevState)
  static getDerivedStateFromProps(nextProps, prevState)替换了原来的生命周期componentWillMount，componentWillReceiveProps，componentWillUpdate
```
* getSnapshotBeforeUpdate(prevProps, prevState)
>该方法的返回值，是componentDidUpdate的第三个参数。
>在 React 开启异步渲染模式后，在执行函数时读到的 DOM 元素状态并不总是渲染时相同，这就导致在 componentDidUpdate 中使用 componentWillUpdate 中读取到的 DOM 元素状态是不安全的，因为这时的值很有可能已经失效了。
>而getSnapshotBeforeUpdate 会在最终的 render 之前被调用，也就是说在 getSnapshotBeforeUpdate 中读取到的 DOM 元素状态是可以保证与componentDidUpdate 中一致的
```js
// 代替componentWillUpdate。
// 常见的 componentWillUpdate 的用例是在组件更新前，读取当前某个 DOM 元素的状态，并在 componentDidUpdate 中进行相应的处理。
// 这两者的区别在于：
// 在 React 开启异步渲染模式后，在 render 阶段读取到的 DOM 元素状态并不总是和 commit 阶段相同，这就导致在
// componentDidUpdate 中使用 componentWillUpdate 中读取到的 DOM 元素状态是不安全的，因为这时的值很有可能已经失效了。
// etSnapshotBeforeUpdate 会在最终的 render 之前被调用，也就是说在 getSnapshotBeforeUpdate 中读取到的 DOM 元素状态是可以保证与 componentDidUpdate 中一致的。
// 此生命周期返回的任何值都将作为参数传递给componentDidUpdate（）
getSnapshotBeforeUpdate(prevProps, prevState) {
    //我们是否要添加新的 items 到列表?
    // 捕捉滚动位置，以便我们可以稍后调整滚动.
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //如果我们有snapshot值, 我们已经添加了 新的items.
    // 调整滚动以至于这些新的items 不会将旧items推出视图。
    // (这边的snapshot是 getSnapshotBeforeUpdate方法的返回值)
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
```

## 2.3 父子孙组件执行顺序
A>B>C
* A: constructor willMount render
  * B: constructor willMount render
    * C: constructor willMount render didMount
      * B: didMount
        * C: didMount

加入fiber的react将组件更新分为两个时期
* phase 1：render前的生命周期为phase1,
* phase 2：render后的生命周期为phase2

phase1的生命周期是可以被打断的，每隔一段时间它会跳出当前渲染进程，去确定是否有其他更重要的任务。此过程，React 在 workingProgressTree （并不是真实的virtualDomTree）上复用 current 上的 Fiber 数据结构来一步地（通过requestIdleCallback）来构建新的 tree，标记处需要更新的节点，放入队列中。
* 如果不被打断，那么phase1执行完会直接进入render函数，构建真实的virtualDomTree
* 如果组件再phase1过程中被打断，即当前组件只渲染到一半（也许是在willMount,也许是willUpdate~反正是在render之前的生命周期），那么react会怎么干呢？ react会放弃当前组件所有干到一半的事情，去做更高优先级更重要的任务（当然，也可能是用户鼠标移动，或者其他react监听之外的任务），当所有高优先级任务执行完之后，react通过callback回到之前渲染到一半的组件，从头开始渲染。（看起来放弃已经渲染完的生命周期，会有点不合理，反而会增加渲染时长，但是react确实是这么干的）

# 三、Component和PureComponent
## 3.1 介绍
React.PureComponent 与 React.Component 几乎完全相同，但 React.PureComponent 通过props和state的浅对比来实现 shouldComponentUpate()。

在PureComponent中，如果包含比较复杂的数据结构，可能会因深层的数据不一致而产生错误的否定判断，导致界面得不到更新。

>如果定义了 shouldComponentUpdate()，无论组件是否是 PureComponent，它都会执行shouldComponentUpdate结果来判断是否 update。如果组件未实现 shouldComponent Update() ，则会判断该组件是否是 PureComponent，如果是的话，会对新旧 props、state 进行 shallowEqual 比较，一旦新旧不一致，会触发 update。

## 3.2 优缺点
* PureComponent缺点
>可能会因深层的数据不一致而产生错误的否定判断，从而shouldComponentUpdate结果返回false，界面得不到更新。
* PureComponent优势
>不需要开发者自己实现shouldComponentUpdate，就可以进行简单的判断来提升性能。


# 四、路由
## 4.1 自定义跳转
```js
import React from 'react'
import { render } from 'react-dom'
const About = React.createClass({/*...*/})
const Inbox = React.createClass({/*...*/})
const Home = React.createClass({/*...*/})
const App = React.createClass({
  getInitialState() {
    return {
      route: window.location.hash.substr(1)
    }
  },
  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1)
      })
    })
  },
  render() {
    let Child
    switch (this.state.route) {
      case '/about': Child = About; break;
      case '/inbox': Child = Inbox; break;
      default:      Child = Home;
    }
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><a href="#/about">About</a></li>
          <li><a href="#/inbox">Inbox</a></li>
        </ul>
        <Child/>
      </div>
    )
  }
})
React.render(<App />, document.body)
```
## 4.2 基本配置
>配置基本路由文件Router，以及组件Home、About，然后在App.js里引入Router
Router.js
```js
//引入react jsx写法的必须
import React from 'react'; 
//引入需要用到的页面组件 
import Home from './pages/home';
import About from './pages/about';
//引入一些模块
import { BrowserRouter as Router, Route} from "react-router-dom";
function router(){
return (
<Router>
    <Route path="/home" component={Home} />
    <Route path="/about" component={About} />
</Router>);
}
export default router;
```
Home.js About.js App.js
```js
//home.js
import React, { Component } from 'react';
export default class Home extends Component {
  render() {
    return (<h1>
      欢迎，这里是Home
    </h1>)
  }
}

//about.js
import React, { Component } from 'react';
export default class About extends Component {
  render() {
    return (<h1>
      欢迎，这里是About
    </h1>)
  }
}

//app.js
import React, { Component } from 'react';
import Router from './Router'
class App extends React.Component {
render(){
return (
  <Router />
);
}
}
```
## 4.3 嵌套路由
>当我们需要页面的局部变换的时候，就需要用到这个了。比如说标题栏不变，内容根据路由地址引入不同的模块~

> 4.2基本配置里面的about.js添加{this.props.children}进行嵌套路由渲染，而Router中的about部分添加子路由。
```jsx
// about.jsx修改
import React, { Component } from 'react';
export default class About extends Component {
  render() {
    return (<h1>
      欢迎，这里是About
      {this.props.children}  //这里就是嵌套路由展示的地方
    </h1>)
  }
}

// Router.js修改
import Ohter from './pages/other';
function router(){
return (
<Router>
    <Route path="/home" component={Home} />
    <!--2、拥有子路由的路由不能添加 exact属性，不然会无法访问到子组件-->
    <Route path="/about" render={()=>(
      <About>
        <Route path="/about/other" component={Other} />
      </About>
    )}>
    </Route>
</Router>);
}
export default router;
```
## 4.4 重定向
Redirect  
```js
//router.js
//需要import一下Redirect
import {Redirect} from "react-router-dom";
return (
<Router>
    <Route path="/home" component={Home} />
    <Route path="/" render={
      ()=> (
      <Redirect to="/home"/>)}>
    </Route>
</Router>);
}
export default router;
```
## 4.5 history
>browserHistory
：需要后台服务器配置，因为在刷新时，会请求URL请求
>HashHistory，带#号适合初学者。

# 五、ReactHook
## 5.1 概念
+ React Hooks 的设计目的，就是加强版函数组件，完全不使用"类"，就能写出一个全功能的组件。
+ React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。
+ 所有的钩子都是为函数引入外部功能，所以 React 约定，钩子一律使用use前缀命名，便于识别。你要使用 xxx 功能，钩子就命名为 usexxx。

>下面介绍 React 默认提供的四个最常用的钩子。
* useState()
* useContext()
* useReducer()
* useEffect()

## 5.2 userState
> useState()用于为函数组件引入状态（state）。纯函数不能有状态，所以把状态放在钩子里面。
```js
import React, { useState } from "react";
export default function  Button()  {
  // 引入state状态buttonText,和赋值方法setButtonText，并附上初始值（set开头后面改状态字段）
  const  [buttonText, setButtonText] =  useState("Click me,   please");
  function handleClick()  {
    return setButtonText("Thanks, been clicked!");
  }
  return  <button  onClick={handleClick}>{buttonText}</button>;
}
```

## 5.3 userContext
> 如果需要在组件之间共享状态，可以使用useContext()。
App
```html
<AppContext.Provider value={{
  username: 'superawesome'
}}>
  <div className="App">
    <Navbar/>
    <Messages/>
  </div>
</AppContext.Provider>
```
Navbar
```js
const Navbar = () => {
  const { username } = useContext(AppContext);
  return (
    <div className="navbar">
      <p>AwesomeSite</p>
      <p>{username}</p>
    </div>
  );
}
```
Message
```js
const Messages = () => {
  const { username } = useContext(AppContext)

  return (
    <div className="messages">
      <h1>Messages</h1>
      <p>1 message for {username}</p>
      <p className="message">useContext is awesome!</p>
    </div>
  )
}
```
## 5.4 userReducer
>Redux 的核心概念是，组件发出 action 与状态管理器通信。状态管理器收到 action 以后，使用 Reducer 函数算出新的状态，Reducer 函数的形式是(state, action) => newState。

useReducers()钩子用来引入 Reducer 功能。
reducer
```js
const myReducer = (state, action) => {
  switch(action.type)  {
    case('countUp'):
      return  {
        ...state,
        count: state.count + 1
      }
    default:
      return  state;
  }
}
```
组件代码
```js
function App() {
  const [state, dispatch] = useReducer(myReducer, { count:   0 });
  return  (
    <div className="App">
      <button onClick={() => dispatch({ type: 'countUp' })}>
        +1
      </button>
      <p>Count: {state.count}</p>
    </div>
  );
}
```
## 5.5 userEffect
>useEffect()用来引入具有副作用的操作，最常见的就是向服务器请求数据。以前，放在componentDidMount里面的代码，现在可以放在useEffect()。

>useEffect()接受两个参数。第一个参数是一个函数，异步操作的代码放在里面。第二个参数是一个数组，用于给出 Effect 的依赖项，只要这个数组发生变化，useEffect()就会执行。第二个参数可以省略，这时每次组件渲染时，就会执行useEffect()。
```js
const Person = ({ personId }) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  //，每当组件参数personId发生变化，useEffect()就会执行。组件第一次渲染时，useEffect()也会执行。
  useEffect(() => {
    setLoading(true); 
    fetch(`https://swapi.co/api/people/${personId}/`)
      .then(response => response.json())
      .then(data => {
        setPerson(data);
        setLoading(false);
      });
  }, [personId])

  if (loading === true) {
    return <p>Loading ...</p>
  }
  return <div>
    <p>You're viewing: {person.name}</p>
    <p>Height: {person.height}</p>
    <p>Mass: {person.mass}</p>
  </div>
}
```

## 5.6 创建自定义Hooks
自定义一个Hooks
```js
const usePerson = (personId) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.co/api/people/${personId}/`)
      .then(response => response.json())
      .then(data => {
        setPerson(data);
        setLoading(false);
      });
  }, [personId]);  
  return [loading, person];
};
```
使用自定义Hooks
```js
const Person = ({ personId }) => {
  const [loading, person] = usePerson(personId);

  if (loading === true) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <p>You're viewing: {person.name}</p>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
    </div>
  );
};
```

## 5.7 React-Router+Hooks
>5.1版本的React-Router，带来了useHistory，useLocation，useParams，useRouteMatch四个钩子函数。

* 1、userParams
```js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";
// 原有写法
function BlogPost({ match }) {
  let { slug } = match.params;
  return <div>{slug}</div>;
}
ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route path="/blog/:slug" component={BlogPost} />
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);

// 在Route中我们可以不用写烦人的component了，只要记得用把页面包裹起来就行了，同时useParams的组件中也不用再写{match}了。

// 同时嵌套路由也变得更加简单了，我们如果需要两个params参数的话，只要在useParams中传递结构得到两个参数即可。


// 使用useParams写法
function BlogPost() {
  let { slug } = useParams();
  return <div>{slug}</div>;
}
ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route path="/blog/:slug">
          <BlogPost />
        </Route>
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
```
* 2、useLocation
>一般和useEffect一起用，大家自己思考业务场景吧。
```js
function BlogPost() {
  const { slug } = useParams();
  const location = useLocation();
  console.log(location);
  return <div>{slug}</div>;
}
// Object {pathname: "/blog/4", search: "", hash: "", state: undefined}
// pathname: "/blog/4"
// search: ""
// hash: ""
// state: undefined
```
* 3、useHistory
>这个API还会大改，只是useNavigate的一个雏形，也是很好理解，可以返回上一个网页：
```js
function BackButton() {
  let history = useHistory();
  return (
    <>
      <button type="button" onClick={() => history.push("/blog/1")}>
        123
      </button>
      <button type="button" onClick={() => history.goBack()}>
        回去
      </button>
    </>
  );
}
```
* 4、useRouteMatch
>官方给了这个例子，是把match提出去让整个代码看起来更加有序，使用这个钩子函数可以让你匹配最接近route树的路由，不过我个人没有使用过，不清楚这个，等以后接触了再来补充。
```js
// before
import { Route } from 'react-router-dom'
function App() {
  return (
    <div>
      {/* ... */}
      <Route
        path="/BLOG/:slug/"
        strict
        sensitive
        render={({ match }) => {
          return match ? <BlogPost match={match} /> : <NotFound />
        }}
      />
    </div>
  )
}

// after
import { useRouteMatch } from 'react-router-dom'
function App() {
  let match = useRouteMatch({
    path: '/BLOG/:slug/',
    strict: true,
    sensitive: true
  })
  return (
    <div>
      {/* ... */}
      {match ? <BlogPost match={match} /> : <NotFound />}
    </div>
  )
}
```
## 5.8 react-hooks-redux


#  六、redux
## 6.1 概念
>在一个大型的应用程序中，应用的状态不仅包括从服务器获取的数据，还包括本地创建的数据，以及反应本地UI状态的数据，而Redux正是为解决这一复杂问题而存在的。

>redux作为一种单向数据流的实现，配合react非常好用，尤其是在项目比较大，逻辑比较复杂的时候，单项数据流的思想能使数据的流向、变化都能得到清晰的控制，并且能很好的划分业务逻辑和视图逻辑。下图是redux的基本运作的流程。
## 6.2 基本配置
* index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store2 from "./redux2/store2"
import App from './App';
ReactDOM.render(
	<Provider store={store2}>
		<App />
	</Provider>
	,
  document.getElementById('root')
);
```
* view页面(dispatch, action, view)
```js
import React, {Component} from 'react'
import {connect} from 'react-redux'
class CompA extends Component {
	handleAdd = ()=>{
		const {add} = this.props
		add()
	}
	handleReduce = ()=>{
		// console.log(this.props)
		const {reduce} = this.props
		reduce()
	}
	handleAsync =  ()=>{
		const {asyncState} = this.props
		asyncState()
	}
	render() {
		const {count} = this.props
		return (
			<div>
				<h3> compA组件 </h3>
				<h2> 状态值： {count} </h2>
				<button onClick={this.handleAdd}> ++ </button>
				<br/>
				<button onClick={this.handleReduce}> -- </button>
				<br/>
				<button onClick={this.handleAsync}> 异步处理 </button>
			</div>
		)
	}
}
// dipaatch(action)，action可以提出来到action.js
const  mapDispatchToProps = (dispatch)=>{
	return {
		add(){
			dispatch({
				type: 'increment'
			})
		},
		reduce(){
			dispatch({
				type: 'decrement'
			})
    },
    // 异步请求需要中间件react import thunk from "redux-thunk"
		asyncState(){
			dispatch(function (dispatch) {
				setTimeout(()=>{
					dispatch({
						type: 'asyncupdatecount'
					})
				},2500)
			})
		}
	}
}
const mapStateToProps = (state)=>{
	return state
}
export default connect(mapStateToProps,mapDispatchToProps)(CompA)
```
* reducer.js
```js
const initState = {
	count: 100,
}

// 想要具体做哪些操作 定义 在reducer里面
const reducer = (state = initState,action) => {
	switch (action.type) {
		case 'increment':
			return Object.assign({},state,{
				count: state.count + 1
			})
		case 'decrement':
			return Object.assign({},state,{
				count: state.count - 1
			})
		case 'asyncupdatecount':
			return Object.assign({},state,{
				count: state.count + 1
			})
		default:
			return state
	}
}
export default reducer
```
* store.js
```js
import {createStore,applyMiddleware} from 'redux'
// import thunk from "redux-thunk" // 异步请求
import reducer from "./reducer2"

const store = createStore(reducer2/*,applyMiddleware(thunk)*/)
export default store
```
## 6.3 分模块配置
>多个reducer合并,页面上取值时，state下是对应的命名空间。
rootReducer
```js
import { combineReducers } from 'redux';
//reducers
import ColorReducers from "./colorReducers";
const allReducers = {
    ColorReducers
};
const rootReducers = combineReducers(allReducers);
export default rootReducers
```
## 6.4 中间件
>dispatch一个action之后，到达reducer之前，进行一些额外的操作，就需要用到middleware。你可以利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由等等。

>换言之，中间件都是对store.dispatch()的增强

>简单，但不便于统一管理
* 用法
```js
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
 const store = createStore(
  reducers, 
  // 直接将thunk中间件引入，放在applyMiddleware方法之中，传入createStore方法，就完成了store.dispatch()的功能增强。即可以在reducer中进行一些异步的操作。
  applyMiddleware(thunk)
);
```
>中间件thunk相当于多加了一层判断，如果是函数则将参数传进行执行该函数
```js
thunk原码
function createThunkMiddleware(extraArgument) {
 return ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
   return action(dispatch, getState, extraArgument);
  }
  return next(action);
 };
} 
```
## 6.5 redux-saga
>redux-saga中间件会把所有异步请求放到一个文件，集中管理，原理是，组件dispatch某个action时，会被redux-saga捕获，再执行相应的函数，函数中执行异步请求。
>便于统一管理action的异步请求
store.js
```js
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// import { helloSaga } from './sagas'
const sagaMiddleware=createSagaMiddleware();
const store = createStore(
 reducer,
 applyMiddleware(sagaMiddleware)
);
// sagaMiddleware.run(helloSaga);
```

```js
import {take,call,put,select,fork,takeEvery,takeLatest} from 'redux-saga/effects'
// take方法：这个方法，是用来监听action，返回的是监听到的action对象。const action = yield take('login');
// call方法：调用fn，参数为args，返回一个描述对象。不过这里call方法传入的函数fn可以是普通函数，也可以是generator。call方法应用很广泛，在redux-saga中使用异步请求等常用call方法来实现。yield call(fetch,'/userInfo',username)
// put方法：redux-saga执行副作用方法转化action时，put这个Effect方法跟redux原始的dispatch相似，都是可以发出action，且发出的action都会被reducer监听到。yield put({type:'login'})
// select: 同样的如果我们想在中间件中获取state，那么需要使用select。select方法对应的是redux中的getState，用户获取store中的state const state= yield select()
// fork方法:在第三章的实例中会详细的介绍，这里先提一笔，fork方法相当于web work，fork方法不会阻塞主线程，在非阻塞调用中十分有用。

// takeEvery和takeLatest:
// takeEvery和takeLatest用于监听相应的动作并执行相应的方法，是构建在take和fork上面的高阶api，比如要监听login动作，好用takeEvery方法可以：takeEvery('login',loginFunc)
// takeEvery监听到login的动作，就会执行loginFunc方法，除此之外，takeEvery可以同时监听到多个相同的action。
// takeLatest方法跟takeEvery是相同方式调用：
// 与takeLatest不同的是，takeLatest是会监听执行最近的那个被触发的action。takeLatest('login',loginFunc)
```