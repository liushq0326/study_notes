[一、基础](#一、基础)
- [1.1 概念](#11-概念)
- [1.2 interface ](#12-interface )
- [1.3 public](#13-public)
- [1.4 修饰符](#14-修饰符)


# 一、基础

## 1.1 概念
* TypeScript 是 JavaScript 的超集，正因为它是建立在 JavaScript 上的一门语言，TypeScript 把其他语言中的一些精妙的语法带入到了 JavaScript 之中，从而把 JS 带入到了一个新的高度，在 TS 里面可以使用各种 JS 之外的扩展语法，同时 TS 对面向对象和静态类型的良好支持，你可以建造出更健壮，更可维护的大型项目，
## 1.2 类型
有12种

布尔值 let isDone: boolean = false;

数字 let dec: number = 6;

字符串 let name : string = 'bob';

数组 let list: number[] = [1, 2, 3]; let list: Array<number> = [1, 2, 3];

元组 let x : [string, number] = ['hello', 10]

联合类型: 当访问一个越界的元素，会使用联合类型替代????

枚举 enum Color {Red, Green, Blue} let c: Color = Color.Green;

Any let notSure: any = 4;

Void function warnUser(): void { console.log('this is no return value') }

Null/Undefined 对应于js中的null和undefined

Never 表示那些永不存在的值的类型

Object 对象类型

类型断言 强制类型转换 <string>someValue 或者 someValue as string

## 1.2 interface


# 1.3 public