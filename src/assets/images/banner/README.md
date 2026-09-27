# 横幅壁纸（自定义背景）

把壁纸放在这两个目录，然后在 `src/config/siteConfig.ts` 的 `banner.src` 里填路径：

```ts
src: {
	desktop: ["assets/images/banner/desktop/1.webp"],  // 用于 >= 1024px
	mobile:  ["assets/images/banner/mobile/1.webp"],   // 仅用于 < 1024px 的首页
},
```

- 路径是**相对 `src/` 目录**的写法（`src/assets/...` 里的 `src/` 不写）。这样会走构建期
  图片优化，自动生成 AVIF/WebP 响应式候选图，比放 `public/` 更省流量。
- 也可以填以 `/` 开头的 `public/` 路径或远程 URL，但会保留原图、不生成候选。
- 两个数组都可以放**多张图**，会按数组顺序自动轮播（间隔与过渡见 `banner.carousel`）。
- 想静态显示就每组只放一张。

`wallpaperMode.defaultMode` 已是 `"banner"`。壁纸列表为空时横幅会自动隐藏、布局降级为紧凑模式
（视觉上等同纯色），所以填图之前站点也是正常的。

文件名随便取（`1.webp`、`my-photo.jpg` 都行），只要与 `banner.src` 里写的一致即可。
