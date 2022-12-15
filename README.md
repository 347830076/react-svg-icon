# react+ts 以 svg 创建 icon 组件

```
├── README.md
├── craco.config.js    // webpack 配置
├── package-lock.json
├── package.json
├── src
|  ├── App.css
|  ├── App.test.tsx
|  ├── App.tsx
|  ├── assets
|  |  └── imgs
|  ├── components
|  |  └── icon     // 关键代码
|  ├── index.css
|  ├── index.tsx
|  ├── logo.svg
|  ├── pages
|  |  └── test-icon   // 关键代码
|  ├── react-app-env.d.ts
|  ├── reportWebVitals.ts
|  ├── setupTests.ts
|  └── unit
|     └── icon.ts   // 关键代码
├── tsconfig.json
└── tsconfig.paths.json
```

封装这个svg-icon组件的核心是：

通过 `svg-sprite-loader` 把svg编译成 `symbol`格式，在使用 `svgo-loader` 对svg进行压缩

然后通过 ` webpack 的 require.context` 自动导入svg文件后(页面上就有如下格式代码)

```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0" aria-hidden="true" id="__SVG_SPRITE_NODE__">
<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 24" id="home">
...
</symbol>
</svg>
```

在页面代码中直接写如下代码：

```
<svg><use xlink:href="#home" /></svg>
```

关键 `#home` 的home, 和你svg文件名一样既可

参考文章:

[手摸手，带你优雅的使用 icon](https://juejin.cn/post/6844903517564436493)

[使用require.context实现前端工程自动化](https://www.jianshu.com/p/c894ea00dfec)

