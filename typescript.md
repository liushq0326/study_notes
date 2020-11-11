[一、基础](#一、基础)
- [1.1 概念](#11-概念)
- [1.2 类型 ](#12-类型 )
- [1.2 interface ](#12-interface )
- [1.3 public\protected\private和readonly](#13-public\protected\private和readonly)
- [1.4 泛型](#14-泛型)


# 一、基础

## 1.1 概念
* TypeScript 是 JavaScript 的超集，正因为它是建立在 JavaScript 上的一门语言，TypeScript 把其他语言中的一些精妙的语法带入到了 JavaScript 之中，从而把 JS 带入到了一个新的高度，在 TS 里面可以使用各种 JS 之外的扩展语法，同时 TS 对面向对象和静态类型的良好支持，你可以建造出更健壮，更可维护的大型项目，


## 1.2 类型
有12种

* 布尔值 let isDone: boolean = false;

* 数字 let dec: number = 6;

* 字符串 let name : string = 'bob';

* 数组 let list: number[] = [1, 2, 3]; let list: Array<number> = [1, 2, 3];

* 元组 let x : [string, number] = ['hello', 10]

* 联合类型: 当访问一个越界的元素，会使用联合类型替代????

* 枚举 enum Color {Red, Green, Blue} let c: Color = Color.Green;

* Any 与void相反 let notSure: any = 4;

* Void 主用于定义方法无返回值如果用在变量上只能赋予undefinde和null。function warnUser(): void { console.log('this is no return value') }

* Null/Undefined 默认情况下null和undefined是除Never之外所有类型的子类型。但是当你指定了--strictNullChecks标记，他们就只能赋值给void和他们本身

* Never 表示那些永不存在的值的类型，never类型是任何类型的子类型，Never+Null/Undefined = Void

* Object 对象类型，object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。

* 类型断言 强制类型转换 
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;
当你清楚地知道一个实体具有比它现有类型更确切的类型。


## 1.3 interface
>TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
* readonly & ?
> readonly只能赋值一次，？为可选
* 接口定义普通对象属性类型
```ts
interface Point {
    readonly x?: number;
    readonly y: number;
    [propName: string]: any; //字符串索引签名,可以带有任意数量的其它属性
}
```
* 接口定义函数类型（参数和返回值）
```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
// 等同于
let mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}
```
* 索引签名
>   可以为数字索引签名也可以是字符串索引签名
```ts
interface NumberDictionary {
  [index: string]: number;
  length: number; // 可以，length是number类型
  name: string    // 错误，`name`的类型与索引类型返回值的类型不匹配
}
// 只读索引签名
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
```
* implements & implements
>只有类才能实现implements接口

>类extends类

>接口extends接口

>接口extends类，它会继承类的成员但不包括其实现


# 1.3 public\protected\private和readonly
* public：类中方法和属性默认;
* protected：被保护的属性和方法，可以在自身内部引用也可以在子类中引用;
* private：只可以在自身中引用。
* readonly：只读属性必须在声明时或构造函数里被初始化。
```ts
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
// 等同于
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {
    }
}

let dad = new Octopus("Man with the 8 strong legs");
```


## 1.4 抽象类
>抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。 abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。 

```ts
abstract class Department {
    constructor(public name: string) {
    }
    printName(): void {
        console.log('Department name: ' + this.name);
    }
    abstract printMeeting(): void; // 必须在派生类中实现
}
class AccountingDepartment extends Department {
    constructor() {
        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }
    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }
    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}
let department: Department; // 允许创建一个对抽象类型的引用
department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
department.generateReports(); // 错误: 方法在声明的抽象类中不存在
```


## 1.4 泛型
>定义类型变量<T>，传入什么类型返回什么
```ts
function identity<T>(arg: T): T {
    return arg;
}

function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}

let myIdentity: <T>(arg: T) => T = identity;
```