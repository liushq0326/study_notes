[toc]
# es6
# 一、解构赋值

## 1.1 数组的解构赋值
解构赋值会判断值是否严格等于undefind，如果不严格等于则取该值
数组对过顺序赋值

    let [x=1] = [null]; // x = null

## 1.2 对像的解构赋值
对像通过属性值辅助

    let {foo, bar} = {foo: 'aaa', bar: 'bbb'}

等价于

    let {foo：wz, bar: bar} = {foo: 'aaa', bar: 'bbb'}
    //wz = 'aaa' bar='bbb'

常用用法
    
    let {forEach} = Array.prototype;
    forEack.call(this, function);

    let obj = {
      p:[
        'hello',
        {y: 'World'}
      ]
    }
    let {p: [x, { y }]} = obj
    let {p, p: [x, { y }]} = obj //第二个p为模式 p=["hello", {y: 'world'}]

嵌套赋值
    
    ({foo:obj.prop, bar: arr[0]} = {foo:123, bar: true})
    // 小括号表示不是块级作用域，而是一条操作语句

数组对象结构赋值

    let arr = [1, 2, 3];
    let {0: first, [ arr.length-1 ]: last} = arr;
    first //1   last //3

## 1.3 字符串的解构赋值
字符串的可以解构赋值，这是因为此时，字符串被转换成了一个类似数组的对象。类似数组的对像有一个length属性，因此可以对这个属性结构赋值
  
    const [a, b, c, d, e] = 'hello';

    let {length: len} = 'hello';
## 1.4 数值和布尔值的解构赋值
  不是对像或数组的，先转换成对像或数组。

  let [foo] = 1;   // 报错1不是一个iterable
  let {toString: str} = 123; // str = toString(){}
  let {t} = true; // t = undefind

  undefind和null无法转为对像，所以解构赋值时会报错。
## 1.5 函数参数的解构赋值

      function  add([x=0, y=0]){
        return x+y;
      }
      add([1, 2]);

      function move({x, y} = {x:0, y:0}){
        return [x, y]
      }
      move({x=1, x=2}); // [1, 2]
      move({x=1}); // [1, undefind]
      move({}); // [undefind, undefind]
      move(); // [0,0]

## 1.5 解构赋值注意点
## 圆括号的问题
  ES6规定，只要可能导致到解构的歧义，就不得使用圆括号。
  建议只要有可能，就不要使用圆括号

 1、非模式可用用

 ## 解构赋值的常见应用场景
    变换变量
    let x = 1, y = 2;
    [x, y] = [y, x];

    从函数中返回多个值
    function example(){
      return [1, 2, 3]
    }
    let [a, b, c] = example()

    函数参数的定义
    function f({x, y, z}){...}
    f({z: 3, y: 2, x: 1});

# 二、字符串
  遍历：
  for(... of ...)
## 2.1 字符串模版扩展

    写法：
    `人们都是${country}人`
    `fwgwe${`sas${pro}dfsd`+`sgs${city}ag`}qgwg`

    fn(s){console.log(s)}
    fn`qweqwr${name}wefwef`
    返回
    字符串为第一个参数被${}截取的数组，后面一次跟${}
    fn的argument为[[qweqwr, wefwef], name]
  
## 2.2 字符串方法扩展
### .raw()
    传入``返回字符串， 主要用途是为了编译带斜杠\，传入什么字符串返回什么字符串
    String.raw`d/dfa`;
    返回
    d/dfa

    正常使用：
    相当于模板字符串的倒推
    String.raw({raw: test},1,2,3) // 't1e2s3t'
    // 等同于
    String.raw({raw: ['t','e','s','t']},1,2,3);

### .includes()
  返回布尔值，调用string是否存在参数
### .startsWith()
  返回布尔值，参数是否在调用者的头部
### .endsWidth()
  返回布尔值，参数是否在调用者的尾部
### .repeat()
  参数为数字，重复生成字符串
  参数<-1则报错，正数小数时则向下。
### .padStart() .padEnd()
  第一个参数是补全的参数，第二个参数添加的字母
    
    'x'.padStart(5, 'ab'); //'ababx'
    'x'.padEnd(5); // '    x'
    'xxx'.padStart(2, 'ab'); // 'xxx'
### .trimStart() .trimEnd()
  删空格，删前面，删后面
    
# 2.3 数字格式的方法拓展

  判断数字是否有限，判断是否是数字

    Number.isFinite();

    Number.isNaN();

  判断一个数值是否为整数

    Number.isInteger();
    Number.isInteger(5.0); // true
    5.0和5在计算机内部存储的值都是一样的

  开方，返回一个数的多少次方

    Math.pow(10, 10);
    Math.pow(2, 53);  //是计算机存储的最大值
    等于
    Number.MAX_SAFE_INTEGER + 1

  退1法

  Math.trunc()
    Math.trunc(-0.1); // 0
    Math.floor(-0.1); // -1
  
  判断一个数是正数、负数还是0

    Math.sign
    参数为正数，返回+1
    参数为负数，舞台-1
    参数为0，返回为0
    参数为-0，返回-0
    其它值返回NaN

  立方根
  
    Math.cbrt(x) //返回x立方根

  平方根

    如果是字符串将转换成数值，返回多个参数平方和的平方根
    Math.hypot(x1,x2)；返回x1平方+x2平方的平方根

  指数运算符**
  
    2**2**3 2的2次幂的结果的3次幂








# 三、Generator&Promise
## 3.1 Generator:
```js
  function* gen(x, y){
    const result = yield x+y
  }

  const g = gen();
  g.next()
  g.next(2);  || g.throw(new Error('报错了')) || g.return(2);
```
```js  
yield* 表达示：
  function* foo(){
	yield 'a';
	yield 'b';
}
function* bar(){
	yield "x"
  yield* foo();
	yield 'y'
}
```
## 3.2 Promise
```js
  .all
  .then
  .catch
  .race
  .resolve
  .reject
```
# 四、Proxy&Reflect
## 4.1 Proxy:
  1、get\set
      const Person = {
          age: 18, name:'万章', sex:'男'
      }

      var proxy = new Proxy(Person, {
        get: function(target, property, proxy){
          if(property === 'age'){
            console.log('你确定要知道我的年纪吗');
            return `洒家今年${target[property]}岁了`;
          }
        };
        set(target, property, value, proxy){
          if(property === name){
            console.log('你确定要知道朕的名字');
            target[property] = value;
          }
        }
      });
      console.log(proxy.age);

    get经典链式调用

     function pipe(value) {
        var funcStach = [];
        var oproxy = new Proxy({},{
          get: function(pipObjct, fnName){
            if(fnName === 'get'){
              return funcStach.reduce(function(val, fn){
                return fn(val);
              }, value)
            }
            funcStach.push(window[fnName])
            return oproxy;
          }      
        })
        return oproxy;
      }  
      var double = n => n * 2;
      var pow = n => Math.pow(n, n);
      var reverseInt = n=> n.toString().split("").reverse().join("") | 0;
      pipe(3).double.pow.reverseInt.get;  // 63

  Proxy支持拦截的操作，一共有13种：
      
  //1、get 在读取代理对象的某个属性时触发该操作，比如在执行 proxy.foo 时。

      get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。

  //2、set 在给代理对象的某个属性赋值时触发该操作，比如在执行 proxy.foo = 1 时。

      set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
  
  //3、 apply 在调用一个目标对象为函数的代理对象时触发该操作，比如在执行 proxy() 时。

      apply(arget, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

  //4、has 在判断代理对象是否拥有某个属性时触发该操作，比如在执行 "foo" in proxy 时。

      has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。

  //5、construct 在给一个目标对象为构造函数的代理对象构造实例时触发该操作，比如在执行new proxy() 时。
  
      construct(target, args, newTarget)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。   

  //6、getOwnPropertyDescriptor 在获取代理对象某个属性的属性描述时触发该操作，比如在执行 Object.getOwnPropertyDescriptor(proxy, "foo") 
  
      getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。

  //7、getPrototypeOf 在读取代理对象的原型时触发该操作，比如在执行 Object.getPrototypeOf(proxy) 时。
      
      getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
      拦截：
      Object.prototype._proto_
      Object.prototype.isPrototypeOf()
      Object.getPrototypeOf()
      Reflect.getPrototypeOf()
      instanceof
  //8、 isExtensible 在判断一个代理对象是否是可扩展时触发该操作，比如在执行 Object.isExtensible(proxy) 时。
      
      isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
  
  //9、 ownKeys 在获取代理对象的所有属性键时触发该操作，比如在执行 Object.getOwnPropertyNames(proxy) 时。

      ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
  
  //10、preventExtensions 在让一个代理对象不可扩展时触发该操作，比如在执行 Object.preventExtensions(proxy) 
  
      preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。

  //11、setPrototypeOf 在设置代理对象的原型时触发该操作，比如在执行 Object.setPrototypeOf(proxy, null) 时。

      setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。

  //12、defineProperty 在定义代理对象某个属性时的属性描述时触发该操作，比如在执行 Object.defineProperty(proxy, "foo", {}) 时。

      defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。

  //13、deleteProperty 在删除代理对象的某个属性时触发该操作，比如在执行 delete proxy.foo 时。
       
      deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。

  Proxy.revocable()方法
    返回一个可取消Proxy实例

      let target = {};
      let handler = {};
      let {proxy, revoke} = Proxy.revocable(target, handler);

      proxy.foo = 123;      
      proxy.foo //123;

      revoke();
      proxy.foo // TypeError: Revoked
      //执行完revoke, 代理proxy将不可访问了。

  Proxy
    Proxy里的this和target里的this是不一样的，而有些原生对象的内部属性，只有通过正确的this才能拿到如target.getDate.bind(target);

##　4.2 Reflect
  Reflect的静态方法：
    13个静态方法：
    Reflect.get(target, name, receiver)
      获取target的name属性，target对象的this指向receiver，如果没有receiver则this为target
      receiver为数据对象，target为方法对象
    
    Reflect.definePropert(target, propertyKey, attributes)
      基本等同于Object.defineProperty，未来可能为去除Object.defineProperty

    Reflect.set(target, name, value, receiver)
      有receiver则target对象的this指向receiver，如果没有receiver则this为target

    


  



    







