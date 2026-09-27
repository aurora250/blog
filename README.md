# Aurora's Blog

基于 [Shirone](https://github.com/LyraVoid/Shirone) 主题的个人博客（Astro 7 + Svelte 5 + Tailwind 4）。

- 线上地址：`https://aurora250.github.io/blog/`
- 仓库：`https://github.com/aurora250/blog`

```bash
# 安装依赖
corepack enable
pnpm install

# 本地开发：http://localhost:4321/blog/
pnpm dev

# 新建文章（自动生成带 frontmatter 的 .md）
pnpm new-post my-post-title

# 本地构建预览
pnpm build && pnpm preview
```

## 目录

| 位置                          | 用途                                                       |
|-------------------------------|------------------------------------------------------------|
| `src/content/posts/`          | 文章（Markdown / MDX）                                     |
| `src/content/spec/about.md`   | 「关于」页面正文                                           |
| `src/content/moments/`        | 说说 / 瞬间                                                |
| `src/config/siteConfig.ts`    | 站点地址、标题、语言、主题色、背景                         |
| `src/config/profileConfig.ts` | 头像、昵称、简介、社交链接                                 |
| `src/config/navBarConfig.ts`  | 顶部导航结构                                               |
| `src/config/sidebarConfig.ts` | 侧栏挂件编排                                               |
| `src/data/*.ts`               | 项目、技能、时间线、设备、游戏、友链、罗盘、番剧、音乐数据 |
| `src/assets/images/`          | 走构建期图片优化的插图（推荐放这里）                       |
| `public/`                     | 原样发布的静态资源（favicon、logo 等）                     |

## 自定义背景与音乐

### 自定义背景

配置在 `src/config/siteConfig.ts`，图片放 `src/assets/images/banner/{desktop,mobile}/`：

```ts
wallpaperMode: { defaultMode: "banner" },
banner: {
  src: {
    desktop: ["assets/images/banner/desktop/1.webp"],  // >= 1024px
    mobile:  ["assets/images/banner/mobile/1.webp"],   // < 1024px 的首页
  },
},
```

### 自定义背景音乐

| provider | 数据来源                             | 说明                                                 |
|----------|--------------------------------------|------------------------------------------------------|
| `local`  | `src/data/music.ts` 的 `musicTracks` | 自托管音频，零外部依赖，断网可播                     |
| `custom` | `musicConfig.tracks` 数组            | 直接内联曲目，支持外链                               |
| `meting` | 云端歌单                             | 无需音频文件，交互后异步拉取                         |
| `mixed`  | 本地曲目 + 云端歌单                  | 本地立即可播，云端就绪后无缝扩容；断网自动降级为本地 |

```ts
// 1) 音频放 public/assets/music/url/ ，封面放 src/assets/images/music/
// 2) 在 src/data/music.ts 追加：
{ id: "song-1", title: "曲名", artist: "艺术家",
  cover: "assets/images/music/song-1.webp",   // 相对 src/
  source: "/assets/music/url/song-1.mp3",     // 相对 public/
  duration: 240 },
```

## 许可

主题 Shirone 使用 MIT License，原始版权声明保留于 `LICENSE`。
