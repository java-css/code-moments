# HTML 和 CSS

## 什么是 DOM ，它和 HTML 有什么区别？

::: details

DOM 即 Document Object Model 文档对象模型，它是一个 JS 对象。而 HTML 是一种标记语言（和 XML 类似）用于定义网页的内容和结构。

DOM 的特点

- 树形结构，DOM 树
- 可编程，可以使用 Javascript 读取和修改 DOM 数据
- 动态性，通过 DOM API 动态修改结构和数据

HTML 到 DOM 的过程

- HTML 解析：浏览器解析 HTML 代码，生成 DOM 树。
- CSSOM 生成：解析 CSS，生成 CSSOM（CSS 对象模型）。
- 渲染树：结合 DOM 和 CSSOM，生成渲染树。
- 页面渲染：根据渲染树将内容显示在页面上。

:::

## 如何理解 HTML5 语义化 ？有哪些常见的语义化标签？

理解 HTML5 语义化

::: details

HTML5 语义化是指使用具有明确含义的标签来描述网页内容，使页面结构更清晰、更具可读性和可维护性。

- 可读性强：开发者无需额外注释即可理解代码结构。
- 增强 SEO（搜索引擎优化）：搜索引擎能更好地抓取和理解网页内容。
- 提升可访问性：辅助技术（如屏幕阅读器）可以更准确地解释页面内容。
- 兼容性增强：现代浏览器能够更高效地渲染语义化结构。
- 易于样式管理：有利于 CSS 的模块化设计。

:::

常见的 HTML5 语义化标签

::: details

- `<header>` 注意：要区别于 `<head>`
- `<nav>`
- `<main>`
- `<article>`
- `<section>`
- `<aside>` 侧边栏
- `<footer>`
- `<figure>` `<figcaption>` 表示图片、图表、代码等媒体内容及标题
- `<mark>` 高亮显示文本内容
- `<time>`
- `<summary>` `<details>` 创建可折叠的摘要信息（交互式内容）

:::

## DOM 节点的 attr 和 property 有何区别

- attr（attribute） 指的是 HTML 属性
- property 指的是 DOM 对象的属性

主要区别

::: details

定义不同

- attr 定义在 HTML 元素上的初始属性，存储在 DOM 元素的属性列表中，与 HTML 源代码一一对应。
- property 是 DOM 对象的属性，是通过浏览器解析 HTML 后生成的 JS 对象属性。

存储位置不同

- attr 是 HTML 的一部分，存储在元素的 HTML 标签 中。
- property 是 DOM 的一部分，存储在 JavaScript 对象中。

行为不同

- attr 一般是静态的，表示元素初始的值，即从 HTML 源代码中解析的值，通常不会因用户操作或脚本修改而自动更新。除非你手动使用 JS 修改值。
- property 一般是动态的，表示当前状态，可以通过 JavaScript 修改，并反映在 DOM 中。

对于一些常用的属性（如 id、value、checked 等），attr 和 property 会部分同步：

- 修改 attr 会影响 property 值。
- 而修改 property 可能不会同步回 attr。

总结，一般来说，attr 是 HTML 中的静态描述，用于设置元素的初始状态，而 property 是 DOM 中的动态状态，用于操作和获取当前状态。

:::

## 如何一次性插入多个 DOM 节点？考虑性能

::: details

直接多次操作 DOM（如多次 `appendChild` 或 `innerHTML` 更新）会导致性能问题，因为每次操作都会触发 DOM 的重新渲染。

`DocumentFragment` 是一个轻量级的文档片段，可以在内存中操作节点，最后一次性插入到 DOM 中，从而减少重绘和回流。

```js
// 创建文档片段
const fragment = document.createDocumentFragment();

// 批量创建节点并添加到片段
for (let i = 0; i < 1000; i++) {
  const div = document.createElement("div");
  div.textContent = `Item ${i}`;
  fragment.appendChild(div);
}

// 一次性插入到DOM
document.getElementById("container").appendChild(fragment);
```

:::

## offsetHeight scrollHeight clientHeight 有什么区别

::: details

`offsetHeight` 元素的总高度，包括内容高度、内边距（padding）、水平滚动条高度（如果存在）、以及边框（border）。不包括外边距（margin）。

`scrollHeight` 元素的实际内容高度，包括不可见的溢出部分，大于等于 `clientHeight`。

`clientHeight` 元素的可见内容高度，包括内容高度（不包含溢出部分）和内边距（padding），但不包括水平滚动条高度、边框（border）和外边距（margin）。

:::

## HTMLCollection 和 NodeList 的区别

在 DOM 中，`HTMLCollection` 和 `NodeList` 都是用于表示节点集合的对象，它们的区别是：

::: details

`HTMLCollection` 只包含 **HTML 元素**节点。通过 `document.getElementsByTagName` 或 `document.getElementsByClassName` 返回的结果是 `HTMLCollection。`

`NodeList` 包括 **元素节点、文本节点、注释节点** 等，不仅仅是 **HTML 元素**节点

- 通过 `document.querySelectorAll` 返回的是 静态 `NodeList`
- 通过 `childNodes` 返回的是 动态 `NodeList`

当文档结构发生变化时

- `HTMLCollection` 和 动态 `NodeList` 会随着 DOM 的变化自动更新
- 静态 `NodeList` **不会**随着 DOM 的变化自动更新

:::

## Node 和 Element 有什么区别？

在 DOM（文档对象模型）中，HTML Element 和 Node 都是表示文档结构中的对象，但它们有不同的定义和用途。

::: details

Node 是 DOM 树中所有类型对象的基类，是一个接口，表示文档树中的一个节点。它有多个子类型，Element 是其中的一个。其他的还有 Text、Comment 等。

Node 常见属性如 `nodeName` `nodeValue`

HTML Element 是 Node 的子类，专门表示 HTML 元素节点。它提供了与 HTML 元素相关的更多功能，如属性、样式等。HTML Element 仅表示 HTML 元素节点，通常对应 HTML 标签，如 `<div>`, `<p>`, `<a>` 等。

Element 常见属性和方法如 `innerHTML` `getAttribute` `setAttribute`

:::

## 开发一个无限下拉加载图片的页面，如何给每个图片绑定 click 事件？

::: details

使用 **事件委托** 实现，避免重复绑定事件，性能高，适合动态加载的场景。

代码示例

```html
<div
  id="image-container"
  style="height: 400px; overflow-y: scroll; border: 1px solid #ccc;"
>
  <!-- 加载图片 -->
</div>

<script>
  const container = document.getElementById("image-container");

  // 模拟 API 请求加载图片
  let page = 1; // 当前加载的页码
  const loadImages = () => {
    for (let i = 1; i <= 10; i++) {
      const img = document.createElement("img");
      img.src = `https://via.placeholder.com/150?text=Image+${
        (page - 1) * 10 + i
      }`;
      img.style.margin = "10px";
      img.alt = `Image ${(page - 1) * 10 + i}`;
      img.className = "image-item"; // 添加统一的类名
      container.appendChild(img);
    }
    page++;
  };

  // 绑定父容器的 click 事件
  container.addEventListener("click", (event) => {
    if (event.target.tagName === "IMG") {
      alert(`You clicked on ${event.target.alt}`);
    }
  });

  // 监听滚动事件，实现无限加载
  container.addEventListener("scroll", () => {
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight
    ) {
      loadImages(); // 加载更多图片
    }
  });

  // 初次加载图片
  loadImages();
</script>
```

以上代码中，我们把 `click` 事件统一绑定在 `container` 容器中，然后判断 `event.target.tagName === 'IMG'` 即触发事件。

:::

## window.onload 和 DOMContentLoaded 的区别是什么？

这两个事件都用于检测页面的加载状态，但触发的时机和作用范围有所不同。

::: details

`DOMContentLoaded` 是当 **DOM 树构建完成**（HTML 被解析完成，不等待样式表、图片、iframe 等资源加载）时触发，不依赖于外部资源。

`window.onload` 是当 **整个页面及所有资源**（包括样式表、图片、iframe、脚本等）加载完成时触发，依赖于外部资源。

`DOMContentLoaded` 会更早触发。

使用推荐

- 如果你的逻辑只依赖 DOM 的加载（如操作页面结构、绑定事件），使用 `DOMContentLoaded`。
- 如果你的逻辑需要依赖页面所有资源加载完成（如获取图片尺寸、执行动画），使用 `window.onload`。

:::

## script 标签放在 head 里，怎么解决加载阻塞的问题

将 `<script>` 标签放在`<head>` 中时，浏览器会暂停 HTML 解析并等待脚本加载和执行完毕，这会导致页面渲染阻塞。

::: details

1. 使用 `async` 属性。当 `async` 属性添加到 `<script>` 标签时，脚本异步加载，并在加载完成后立即执行，不会阻塞HTML解析。适用于不依赖其他脚本或页面内容的独立脚本，但多个 JS 文件时无法保证加载和执行顺序。

```html
<head>
  <script src="script.js" async></·script>
</head>
```

2. 使用 `defer` 属性。`defer` 属性使得脚本延迟执行，直到 HTML 文档解析完毕。这意味着脚本不会阻塞 HTML 渲染，且会按照文档中 `<script>` 标签的顺序执行。适用于依赖 DOM 元素的脚本（如操作页面内容）。

```html
<head>
  <script src="script.js" defer></script>
</head>
```

3. 将 `<script>` 放在 `<body>` 最后。

:::

## 常见的 HTML 标签哪些是 inline 元素，哪些是 block 元素，哪些是 inline-block 元素

::: details

1. `inline` 元素有：`a`, `span`, `img`, `strong`, `em`, `b`, `i`, `abbr`, `code`, `br`, `q`（引用）, `sub`（下标）, `sup`（上标）

2. `block` 元素有：`div`, `p`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `ul`, `ol`, `li`, `form`, `section`, `article`, `footer`, `header`, `nav`

3. `inline-block` 元素有：`input` `button`

注意，`table` 虽然也是独占一行，但它 `display: table` 不是 `block`

:::

## 常见的 CSS 选择器有哪些？

::: details

| 选择器类型          | 示例                               | 说明                                       |
| ------------------- | ---------------------------------- | ------------------------------------------ |
| **元素选择器**      | `p`                                | 选择所有 `<p>` 元素                        |
| **类选择器**        | `.button`                          | 选择所有 `class="button"` 的元素           |
| **ID 选择器**       | `#header`                          | 选择 `id="header"` 的元素                  |
| **通用选择器**      | `*`                                | 选择页面中的所有元素                       |
| **后代选择器**      | `div p`                            | 选择 `div` 内的所有 `<p>` 元素             |
| **子元素选择器**    | `div > p`                          | 选择 `div` 的直接子元素 `<p>`              |
| **相邻兄弟选择器**  | `h1 + p`                           | 选择紧接在 `<h1>` 后面的 `<p>` 元素        |
| **通用兄弟选择器**  | `h1 ~ p`                           | 选择所有紧跟在 `<h1>` 后面的 `<p>` 元素    |
| **属性选择器**      | `a[href]`                          | 选择具有 `href` 属性的所有 `<a>` 元素      |
| **`:hover`**        | `a:hover`                          | 选择鼠标悬停时的 `<a>` 元素                |
| **`:first-child`**  | `p:first-child`                    | 选择父元素中的第一个 `<p>` 元素            |
| **`:nth-child(n)`** | `li:nth-child(odd)`                | 选择父元素中所有奇数位置的 `<li>` 元素     |
| **`::before`**      | `p::before { content: "Note: "; }` | 在每个 `<p>` 元素的前面插入 "Note: "       |
| **`::after`**       | `p::after { content: "."; }`       | 在每个 `<p>` 元素的后面插入一个句点        |
| **`:not()`**        | `p:not(.highlight)`                | 选择所有不具有 `highlight` 类的 `<p>` 元素 |

注意，这里的内容比较全，面试时你也许记不住所有，但只要能说上一半儿。

:::

## CSS 盒子模型，尺寸计算

如下代码，请问 `div1` 的 `offsetWidth` 是多大？

```html
<!-- 如下代码，请问 div1 的 offsetWidth 是多大？ -->
<style>
  #div1 {
    width: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 10px;
  }
</style>

<div id="div1"></div>
```

答案

::: details
`offsetWidth` 是指 `元素内容 + 内间距 + 边框`的距离，不包括外间距<br>
所以 `offsetWidth` 是 `122px`
:::

追问：如果想要让 `offsetWidth` 等于 `100px` ，还需要再增加一个什么属性？

答案

::: details
增加 `box-sizing: border-box;`
:::

## margin 纵向重叠

如下代码，`AAA` 和 `BBB` 之间的距离是多少？

```html
<!-- 如下代码，AAA 和 BBB 之间的距离是多少？ -->
<style>
  p {
    font-size: 16px;
    line-height: 1;
    margin-top: 10px;
    margin-bottom: 15px;
  }
</style>

<p>AAA</p>
<p></p>
<p></p>
<p></p>
<p>BBB</p>
```

答案

::: details
`AAA` 和 `BBB` 之间的距离是 `15px`

- 垂直方向上多个 margin 相邻时，只会保留最大的那个，所以 AAA 和 BBB 之间最终的距离是 15px。

  :::

## lineHeight 如何继承？

如下代码，`<p>` 标签的行高将会是多少？

```html
<!--如下代码，p 标签的行高将会是多少？-->
<style>
  body {
    font-size: 20px;
    line-height: 200%;
  }
  p {
    font-size: 16px;
  }
</style>

<body>
  <p>AAA</p>
</body>
```

答案

::: details
`line-height` 不同类型的值，继承规则是不一样的

- 写具体的数值，如 `30px`，则继承该数值 —— 比较好理解
- 写百分比，如 `200%` ，则继承当前计算出来的值，如上述题目 —— 重要！！！
- 写比例，如 `2` 或 `1.5` ，则继承比例

所以，该问题的的答案是，继承 `40px` 。
:::

## margin 负值问题

::: details

- `margin-left` 负值，元素左移
- `margin-top` 负值，元素上移
- `margin-right` 负值，自身宽度缩小，右侧元素会跟进，但内容不受影响
- `margin-bottom` 负值，自身高度缩小，下方元素会跟进，但内容不受影响

:::

## 什么是 BFC，如何触发 BFC？

参考答案

::: details

BFC (Block formatting context) ，即"块级格式化上下文"。它是一个独立的渲染区域，在这个区域内，元素的布局和排列不会影响到外部的元素。能形成 BFC 的条件有：

- 根元素
- `float` 属性不为 `none`
- `position` 为 `absolute` 或 `fixed`
- `display` 为 `inline-block` `table-cell` `table-caption` `flex` `inline-flex`
- `overflow` 不为 `visible`

BFC 在网页布局中经常用来清除浮动（特别是在使用 `float` 布局的情况下），最常被用来触发 BFC 的属性是`overflow: hidden`，例如：

```html
<style>
  .bfc {
    overflow: hidden; /* 创建 BFC */
  }
  .left {
    float: left;
  }
</style>

<div class="bfc">
  <div
    class="left"
    style="width: 100px; height: 100px; background: lightblue;"
  ></div>
  <p>这段文字会自动避开左侧浮动元素，因为 div.bfc 是一个 BFC。</p>
</div>
```

:::

## 使用 CSS 实现居中对齐，有哪几种方式？

实现水平居中对齐

::: details

1. inline 元素用`text-align: center;`即可，如下：

```css
.container {
  text-align: center;
}
```

2. block 元素可使用`margin: auto;`

```css
.container {
  text-align: center;
}
.item {
  width: 1000px;
  margin: auto;
}
```

3. 绝对定位元素可结合`left`和`margin`实现，但是必须知道宽度

```css
.container {
  position: relative;
  width: 500px;
}
.item {
  width: 300px;
  height: 100px;
  position: absolute;
  left: 50%;
  margin-left: -150px;
}
```

:::

实现垂直居中对齐

::: details

1. inline 元素可设置`line-height`的值等于`height`值，如单行文字垂直居中：

```css
.container {
  height: 50px;
  line-height: 50px;
}
```

2. 绝对定位元素，可结合`top`和`margin`实现，但是必须知道尺寸

- 优点：兼容性好；
- 缺点：需要提前知道尺寸，

```css
.container {
  position: relative;
  height: 200px;
}
.item {
  width: 80px;
  height: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -20px;
  margin-left: -40px;
}
```

3. 绝对定位可结合`transform`实现居中

- 优点：不需要提前知道尺寸；
- 缺点：兼容性不好（现代浏览器都没问题）

```css
.container {
  position: relative;
  height: 200px;
}
.item {
  width: 80px;
  height: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

4. 绝对定位结合`margin: auto`，不需要提前知道尺寸，兼容性好

```css
.container {
  position: relative;
  height: 300px;
}
.item {
  width: 100px;
  height: 50px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

:::

## 什么是 CSS 定位上下文？absolute 和 relative 分别依据谁来定位？

参考答案

::: details

- `relative` 是相对于自身定位的（且不会影响其他元素的定位），不脱离文档流
- `absolute` 是相对于最近的定位祖先元素（非 static 定位）进行定位，如果没有就依赖于 `body` 定位，脱离文档流。

:::

## `overflow: hidden` `display：none` 和 `visibility: hidden` 有什么区别

参考答案

::: details

- `overflow: hidden` 溢出内容不可见，未溢出的部分正常可见
- `display：none` 隐藏内容，不占用任何空间，内容变化不会重新渲染
- `visibility: hidden` 隐藏元素，但保留其占据的空间，内容变化会重新渲染

:::

## `px` `%` `em` `rem` `vw/vh` 的区别

参考答案

::: details

| 单位    | 基准                     | 绝对/相对 | 优点                       | 缺点                 | 适用场景                 |
| ------- | ------------------------ | --------- | -------------------------- | -------------------- | ------------------------ |
| `px`    | 固定像素                 | 绝对      | 精确，简单易用             | 缺乏响应式能力       | 固定尺寸元素             |
| `%`     | 父元素尺寸               | 相对      | 灵活，适合响应式设计       | 依赖父元素           | 响应式布局，流式设计     |
| `em`    | 当前元素字体大小         | 相对      | 动态调整，适合局部相对设计 | 嵌套复杂，计算难预测 | 动态字体、内外边距等     |
| `rem`   | 根元素字体大小（`html`） | 相对      | 全局一致，计算简单         | 需要设置根元素字体   | 全局比例调整，响应式设计 |
| `vw/vh` | 视口宽度或高度           | 相对      | 基于视口，适合全屏设计     | 小屏显示可能不理想   | 全屏布局，视口动态调整   |

使用建议:

- 响应式设计：优先使用 rem + %
- 固定大小：使用 px
- 全屏布局：使用 vw 和 vh
- 动态比例设计：推荐使用 rem，更简洁统一
- 局部缩放：使用 em，但注意嵌套影响

:::

## 如何实现 Retina 屏 1px 像素边框

参考答案

::: details

1. 使用 `transform: scale(0.5)` 实现，通过缩放元素的伪类边框来达到视觉上的细线效果。

```css
.retina-border {
  position: relative;
}

.retina-border::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px; /* 物理高度 */
  background-color: black;
  transform: scaleY(0.5); /* 缩小一半 */
  transform-origin: 0 0; /* 设置缩放原点 */
}
```

2. 使用 `box-shadow` 模拟边框

```css
.retina-border {
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.5); /* 模拟下边框 */
}
```

:::

## 使用 CSS 画一个三角形

参考答案

::: details

使用 CSS “画”一个向上的三角形，重点在于使用透明边框。

```html
<style>
  .triangle-up {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 50px solid #000; /* 底部颜色即为三角形颜色 */
  }
</style>
<div class="triangle-up"></div>
```

:::

## 如何实现黑白主题变化？

参考答案

::: details

可使用 CSS 变量

```css
/* 定义变量 */
:root,
:host {
  --color: #333;
  --bg-color: #fff;
}

/* 使用变量 */
p {
  color: var(--color);
  background-color: var(--bg-color);
}
```

:::

## 如何实现响应式布局？

CSS 实现响应式布局可以使页面在不同的设备和屏幕尺寸上有良好的显示效果，以下是几种常见的实现方式：

::: details

1. 使用媒体查询（Media Queries）：通过检测设备的宽度、高度、分辨率等条件，应用不同的 CSS 样式。。

```css
/* 默认样式 */
body {
  font-size: 16px;
  padding: 20px;
}

/* 屏幕宽度小于等于768px时的样式 */
@media (max-width: 768px) {
  body {
    font-size: 14px;
    padding: 10px;
  }
}

/* 屏幕宽度大于1200px时的样式 */
@media (min-width: 1200px) {
  body {
    font-size: 18px;
    padding: 30px;
  }
}
```

2. 使用弹性盒子（Flexbox）：适用于创建水平或垂直方向上的自适应布局，如导航栏、卡片列表、网格布局。

```css
.container {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
}

.item {
  flex: 1 1 200px; /* 每个子项占据至少200px，随空间调整 */
  margin: 10px;
  background-color: #f0f0f0;
}
```

3. 使用网格布局（CSS Grid Layout）：适合构建复杂的二维网格布局，例如图片画廊、商品展示等。。

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.item {
  background-color: #d4edda;
  padding: 10px;
}
```

4. 使用 百分比与视口单位（vw/vh）：通过相对单位控制元素的宽度和高度，使其随窗口大小变化而调整。

```css
.container {
  width: 80%; /* 占父容器的80% */
  height: 50vh; /* 占视口高度的50% */
  background-color: #e9ecef;
}
```

5、使用 CSS 框架（如 Bootstrap、Tailwind CSS）：这些框架内置了响应式工具类，可以快速构建适配各种设备的页面布局。

```css
<div class="container">
  <div class="row">
    <div class="col-sm-6 col-md-4">内容1</div>
    <div class="col-sm-6 col-md-4">内容2</div>
    <div class="col-sm-12 col-md-4">内容3</div>
  </div>
</div>
```

:::

## 如何理解 `z-index` ？

::: details

- `z-index` 是一个 CSS 属性，用于控制元素的堆叠顺序（沿 Z 轴的显示顺序）。值越大，元素越靠前显示，反之值越小，元素越靠后。
- `z-index` 只对**定位**元素有效，需设置 `position` 属性为 `relative`、`absolute`、`fixed` 或 `sticky`。
- `z-index` 只在**同级**比较，父子元素的 `z-index` 不会互相影响。

:::

## 你用过哪些 CSS 相关的技术，如库、框架、预处理语言、后处理语言等

参考答案

::: details

- CSS 框架：TailwindCSS BootStrap
- CSS 预处理语言：Less Sass Stylus
- CSS 后处理语言：PostCSS Autoprefixer
- CSS 组件库：ElementUI AntDesign
- CSS-in-JS：Styled-Components Emotion
- CSS 工具：Normalize.css Animate.css

:::
