# 写代码

键上舞逻辑，代码写星河。手织代码锦，心绘程序章。

## 手写防抖 Debounce

防抖函数的作用是在事件被触发的 n 秒后再执行回调，若在 n 秒内事件被再次触发，则重新计时。

::: details 参考答案

```js
//基础版
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    // 每次触发时清除之前的定时器，避免多次执行
    clearTimeout(timeout);
    // 设置新的定时器，延迟执行目标函数
    timeout = setTimeout(() => {
      func.apply(this, args); // 确保正确的 this 和参数传递
    }, wait);
  };
}
```

```js
//进阶版(支持立即执行)
function debounce(func, wait, immediate = false) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    // 立即执行判断
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
```

:::

## 手写节流 Throttle

节流函数的作用是在高频触发事件时，固定时间间隔内只执行一次回调函数。

::: details 参考答案

```js
//基础版（时间戳版）
function throttle(func, wait) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    // 如果距离上次执行的时间超过 wait，则执行函数
    if (now - lastTime >= wait) {
      func.apply(this, args); // 绑定正确的 this 和参数
      lastTime = now; // 更新上次执行时间
    }
  };
}
```
```js
//基础版（定时器版）
function throttle(func, wait) {
  let timeout = null;
  return function (...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        func.apply(this, args); // 执行函数
        timeout = null; // 清空定时器
      }, wait);
    }
  };
}
```
```js
//进阶版（支持首次立即执行 + 最后一次触发）
function throttle(func, wait, options = { leading: true, trailing: true }) {
  let timeout = null;
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();
    const context = this;

    // 首次是否立即执行
    if (options.leading && !lastTime) {
      lastTime = now;
      func.apply(context, args);
    }

    // 清除旧的定时器
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    // 计算剩余时间
    const remaining = wait - (now - lastTime);

    if (remaining <= 0 || remaining > wait) {
      // 时间到了，执行函数
      lastTime = now;
      func.apply(context, args);
    } else if (options.trailing && !timeout) {
      // 设置定时器，确保最后一次触发会执行
      timeout = setTimeout(() => {
        lastTime = options.leading ? Date.now() : 0;
        func.apply(context, args);
        timeout = null;
      }, remaining);
    }
  };
}
```

:::

## 手写 call 和 apply

::: details 参考答案

```js
Function.prototype.call2 = function (context) {
  var context = context || window;
  context.fn = this;

  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }

  var result = eval("context.fn(" + args + ")");

  delete context.fn;
  return result;
};

Function.prototype.apply = function (context, arr) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("context.fn(" + args + ")");
  }

  delete context.fn;
  return result;
};
```

:::

## 手写数组去重

::: details 参考答案

```js
// Set
function unique1(arr) {
  return [...new Set(arr)];
}

// filter
function unique2(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

// reduce
function unique3(arr) {
  return arr.reduce(
    (acc, cur) => (acc.includes(cur) ? acc : [...acc, cur]),
    []
  );
}
```

:::

## 手写红绿灯

模拟一个红绿灯变化，红灯 1 秒，绿灯 1 秒，黄灯 1 秒，然后循环

::: details 参考答案

```js
function red() {
  console.log("red");
}

function green() {
  console.log("green");
}

function yellow() {
  console.log("yellow");
}

function light(cb, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb();
      resolve();
    }, wait);
  });
}

function start() {
  return Promise.resolve()
    .then(() => {
      return light(red, 1000);
    })
    .then(() => {
      return light(green, 1000);
    })
    .then(() => {
      return light(yellow, 1000);
    })
    .finally(() => {
      return start();
    });
}

start();
```

:::

## 手写 Promise

::: details 参考答案

```js
class MyPromise {
  // 构造方法
  constructor(executor) {
    // 初始化值
    this.initValue();
    // 初始化this指向
    this.initBind();
    // 执行传进来的函数
    executor(this.resolve, this.reject);
  }

  initBind() {
    // 初始化this
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }

  initValue() {
    // 初始化值
    this.PromiseResult = null; // 终值
    this.PromiseState = "pending"; // 状态
  }

  resolve(value) {
    // 如果执行resolve，状态变为fulfilled
    this.PromiseState = "fulfilled";
    // 终值为传进来的值
    this.PromiseResult = value;
  }

  reject(reason) {
    // 如果执行reject，状态变为rejected
    this.PromiseState = "rejected";
    // 终值为传进来的reason
    this.PromiseResult = reason;
  }
}
```

:::

## 手写 Promise.all

::: details 参考答案

```js
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let count = 0;
    promises.forEach((promise, i) => {
      Promise.resolve(promise)
        .then((res) => {
          results[i] = res;
          if (++count === promises.length) resolve(results);
        })
        .catch(reject);
    });
  });
};
```

:::

## 使用 Vue3 Composable 组合式函数，实现 useCount

```js
const { count } = useCount(); // count 初始值是 0 ，每一秒 count 加 1
```

::: details 参考答案

```js
import { ref, onMounted, onUnmounted } from "vue";

export function useCount() {
  const count = ref(0);
  let timer = null;

  // 开始计数
  const startCount = () => {
    timer = setInterval(() => {
      count.value++;
    }, 1000);
  };

  // 组件挂载时开始计数
  onMounted(() => {
    startCount();
  });

  // 组件卸载时清除定时器
  onUnmounted(() => {
    if (timer) {
      clearInterval(timer);
    }
  });

  return {
    count,
  };
}
```

:::

## 实现垂直居中的方法

::: details 参考答案

1、flex 布局

```css
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

2、grid 布局

```css
.container {
  display: grid;
  place-items: center;
}
```

3、绝对定位

```css
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

:::

## 加法题

```js
//如下代码，请用通用的加法处理，要求不能直接转数字加，用单个位上加并做进位处理：
function addStr(a, b){
var x = 123456' ;
var y = 789';
var z = addStr(x, y);//124245'

```

::: details 参考答案

```js
function addStr(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  const result = [];

  while (i >= 0 || j >= 0 || carry > 0) {
    const numA = i >= 0 ? parseInt(a[i], 10) : 0;
    const numB = j >= 0 ? parseInt(b[j], 10) : 0;
    const sum = numA + numB + carry;
    result.push(sum % 10);
    carry = Math.floor(sum / 10);
    i--;
    j--;
  }

  return result.reverse().join("");
}
```

:::

## 实现带并发限制的异步调度器 Scheduler

```js
// 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有N个。
// 完善下面代码中的Scheduler类，使得以下程序能正确输出：
class Scheduler {
  add(promiseCreator) { ... }
  // ...
}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler(n)
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(1000, '1')  // 任务1
addTask(500, '2') // 任务2
addTask(300, '3') // 任务3
addTask(400, '4')  // 任务4

// 打印顺序是：2 3 1 4


```

::: details 参考答案

```js
class Scheduler {
  constructor(max) {
    this.max = max;
    this.count = 0; // 用来记录当前正在执行的异步函数
    this.queue = new Array(); // 表示等待队列
  }
  async add(promiseCreator) {
    /*
        此时count已经满了，不能执行本次add需要阻塞在这里，将resolve放入队列中等待唤醒,
        等到count<max时，从队列中取出执行resolve,执行，await执行完毕，本次add继续
        */
    if (this.count >= this.max) {
      await new Promise((resolve, reject) => this.queue.push(resolve));
    }

    this.count++;
    let res = await promiseCreator();
    this.count--;
    if (this.queue.length) {
      // 依次唤醒add
      // 若队列中有值，将其resolve弹出，并执行
      // 以便阻塞的任务，可以正常执行
      this.queue.shift()();
    }
    return res;
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler(2);

const addTask = (time, order) => {
  //add返回一个promise，参数也是一个promise
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");

// output: 2 3 1 4
```

:::

## JS 代码交换

```js
var a = "abc";
var b = "def";
//不通过第三个参数的话，怎么把a和b的值交换
```

::: details 参考答案

```js
var a = "abc";
var b = "def";

// 一行代码完成交换
[a, b] = [b, a];

console.log(a); // "def"
console.log(b); // "abc"
```

:::
