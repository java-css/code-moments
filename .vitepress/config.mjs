import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/code-moments/",
  title: "前端拾光",
  description: "个人前端知识博客",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "成为贡献者", link: "/markdown-examples" },
    ],
    search: {
      provider: "local",
    },

    outline: {
      level: [2, 3],
      label: "目录",
    },
    sidebar: [
      {
        text: "笔试",
        items: [
          { text: "写代码", link: "/src/code-exam/write" },
          { text: "读代码", link: "/src/code-exam/read" },
        ],
      },
      {
        text: "基础篇",
        items: [
          { text: "HTML&CSS", link: "/src/basic-exam/html-css" },
          { text: "JS", link: "/src/basic-exam/js" },
          { text: "HTTP网络", link: "/src/basic-exam/net" },
        ],
      },
      {
        text: "框架篇",
        items: [
          { text: "Vue", link: "/src/architecture/vue" },
          { text: "React", link: "/src/architecture/react" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    footer: {
      copyright: "Copyright © 2025-present Jason",
    },
  },
});
