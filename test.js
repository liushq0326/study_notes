class DBLinkedList {
  constructor() {
    this.count = 0;
    this.head = undefined;
  }
  equalsFn(a, b) {
    return a === b;
  }
  push(ele) {
    let node = new DBNode(ele);
    let prev = this.head; // 默认存储第一个对象的值
    let current; //在添加之前获取当前的head里面的值, 好设置next里面的值
    if (!this.head) {
      this.head = node; // 如果链表现在没有一个head数据, 那么就把当前push进来的值设置为头部的值
    } else {
      current = this.head;
      while (current.next) {
        current = current.next; //一路沿着链条找到整个链表的最后一个数据
        prev = current; // 修改上一个组件的值
      }
      node.prev = prev;
      current.next = node;
    }
    this.count++; //添加了一个数据, 就增加一个count的值
  }
  removeAt(index) {
    if (index < this.count && index >= 0) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next; // 如果删除第一项, 那么就把第二项设置为head
        this.head.prev = undefined; // 头部是永远没有上一项的
      } else {
        for (let i = 1; i < index; i++) {
          current = current.next
        }
        let beRemoved = current.next;
        current.next.next.prev = current;
        current.next = current.next.next;
        this.count--;
        return beRemoved; //返回删除的那个对象数据
      }
    }
  }
  insert(ele, index) {
    let node = new DBNode(ele);
    if (index <= this.count && index >= 0) {
      let current = this.head;
      if (index === 0) {
        this.head = node;
        this.head.next = current;
        current.prev = this.head;
      } else {
        for (let i = 1; i < index; i++) {
          current = current.next
        }
        let nextEle = current.next;
        node.prev = current;
        current.next = node;
        node.next = nextEle;
        nextEle.prev = node;
        this.count++;
      }
    } else {
      return "索引值错误"
    }
  }
  removeEle(ele) {
    let current = this.head;
    let prev = null;
    if (this.equalsFn(current.element, ele)) { //如果头部数据就是相等的话, 就把头部数据引向下一个值
      this.head = current.next;
      this.head.prev = undefined;
      this.count--;
    }
    for (let i = 1; i < this.count; i++) {
      prev = current;
      current = current.next;
      if (this.equalsFn(current.element, ele)) {
        pre.next = current.next;
        current.next.prev = prev
        this.count--;
      }
    }
    return undefined;
  }

}