# Aurora's Blog

个人博客，基于 [Shirone](https://github.com/LyraVoid/Shirone) 主题（Astro 7 + Svelte 5 + Tailwind 4）。
纯静态站点，通过 GitHub Actions 自动构建并发布到 GitHub Pages。

- 线上地址：`https://aurora250.github.io/blog/`
- 仓库：`https://github.com/aurora250/blog`

## 日常写作

```bash
# 安装依赖（首次）
corepack enable
pnpm install

# 本地开发：http://localhost:4321/blog/
pnpm dev

# 新建文章（自动生成带 frontmatter 的 .md）
pnpm new-post my-post-title

# 本地构建预览（与线上产物一致）
pnpm build && pnpm preview
```

写完文章后 push 到 `main` 分支，GitHub Actions 会自动重新构建并发布，通常 1~3 分钟生效。

**发布流程**：编辑 `src/content/posts/*.md` → `git push origin main` → Actions 自动部署 → 线上更新。

## 目录速查

| 位置 | 用途 |
| --- | --- |
| `src/content/posts/` | 文章（Markdown / MDX） |
| `src/content/spec/about.md` | 「关于」页面正文 |
| `src/content/moments/` | 说说 / 瞬间 |
| `src/config/siteConfig.ts` | 站点地址、标题、语言、主题色、背景 |
| `src/config/profileConfig.ts` | 头像、昵称、简介、社交链接 |
| `src/config/navBarConfig.ts` | 顶部导航结构 |
| `src/config/sidebarConfig.ts` | 侧栏挂件编排 |
| `src/data/*.ts` | 项目、技能、时间线、设备、游戏、友链、罗盘、番剧、音乐数据 |
| `src/assets/images/` | 走构建期图片优化的插图（推荐放这里） |
| `public/` | 原样发布的静态资源（favicon、logo 等） |

配置项的语义、默认值与可选值都写在对应文件的注释里，改配置前先读注释即可。

## 部署配置（重要）

站点部署在 **项目站点** 路径下（`https://aurora250.github.io/blog/`），因此有两处必须与仓库名保持一致：

- `src/config/siteConfig.ts` 的 `site: "https://aurora250.github.io"`
- `src/config/siteConfig.ts` 的 `base: "/blog"`

改仓库名，或改为 `<user>.github.io` 用户站点 / 绑定自定义域名时，这两项必须同步修改（后者 `base` 改回 `"/"`）并重新构建。

首次部署前需在 GitHub 仓库设置里启用 Pages：

1. **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**；
2. push 到 `main`，或到 **Actions → Deploy to GitHub Pages → Run workflow** 手动触发。

工作流文件：`.github/workflows/deploy.yml`（构建 + 发布）、`.github/workflows/ci.yml`（构建期校验与主题单元测试）。

## 当前功能状态

初始化时删除了主题自带的全部示例文章与演示数据，并关闭了需要自备素材或外部数据源的功能页：

| 功能 | 状态 | 恢复方式 |
| --- | --- | --- |
| 文章 / 归档 / 分类 / 标签 | ✅ 启用 | — |
| 关于页 | ✅ 启用 | 编辑 `src/content/spec/about.md` |
| 说说（moments） | ✅ 启用 | 往 `src/content/moments/` 加 `.md` |
| 项目 / 技能 / 时间线 | ✅ 入口保留 | 填 `src/data/projects.ts`、`skills.ts`、`timeline.ts` |
| 罗盘 | ✅ 启用 | 已在 `src/data/compass.ts` 放置 cnotv 入口 |
| 音乐挂件 | ⏸ 关闭 | 配好 `src/data/music.ts` 后把 `sidebarConfig.ts` 中 `music` 改为 `enable: true` |
| 番剧 / 相册 / 游戏 / 设备 / 友链 | ⏸ 关闭 | 备好素材后把对应 `src/config/*Config.ts` 的 `enable` 改为 `true`（导航入口会自动出现） |
| 评论（Twikoo / Giscus） | ⏸ 关闭 | 见 `src/config/commentConfig.ts` |
| 访问统计（Umami） | ⏸ 关闭 | 见 `src/config/umamiConfig.ts` |

## 相对上游主题的本地改动

### 1. 修复子路径部署下的 URL 拼接

为使主题在 GitHub Pages **子路径**部署下正确工作，修复了上游若干「只按根路径拼 URL」的写法（上游默认部署在根路径，因此不会暴露）：

- `src/utils/url-utils.ts`：新增 `getSiteWithBase()`，产出「域名 + base」的站点根地址；
- `src/pages/rss.xml.ts`、`src/pages/atom.xml.ts`：feed 的 `<link>` / `<id>` / `self` 缺少 `/blog` 前缀；
- `src/pages/llms.txt.ts`、`src/pages/llms-full.txt.ts`：正文内链接缺少前缀；
- `src/pages/robots.txt.ts`：`Sitemap:` 地址缺少前缀；
- `src/layouts/Layout.astro`：页面 `<head>` 中 RSS / Atom 的 `<link rel="alternate">` 缺少前缀。

### 2. 字体源改为 woff2（仓库瘦身）

上游自带 14.52 MB 的 `Yozai-Medium.ttf`。同一份完整字形集转成 woff2 后为 6.62 MB，
构建期子集化流程不受影响（`subset-font` 接受 woff2 输入，产物体积字节级等价）：

- 源文件：`src/assets/fonts/Yozai-Medium.woff2`（原 `.ttf` 已删除）；
- 引用位置：`src/config/fontConfig.ts` 里 `yozai-cjk` 的 `file`。

### 3. 修复日历周几缺字（上游缺陷）

侧栏日历的周几名是客户端用 `Intl.DateTimeFormat` 现算的，源码里没有字面量，
因此上游的字符采集（只扫 Markdown / i18n / config / data）永远收不到它们 ——
结果是「周二」的「二」等字形被裁掉，浏览器回退到系统字体。

- 修复位置：`src/integration/fonts.ts` 的 `collectSiteText()`，新增 `includeRuntimeIntl`
  分支（默认开启），用**固定锚点日期**生成周几与月份名以保证构建可复现；
- 语言取自 `siteConfig.lang`，由 `buildFontDeclarations()` 通过 `loadConfigModule` 加载，
  包模式下同样生效；
- 开关：`src/config/fontConfig.ts` 的 `subsetting.includeRuntimeIntl`；
- 代价：子集 368.4 KB → 369.0 KB（+0.6 KB）。

### 4. CI 适配

把上游面向主题开发者的 CI（含依赖演示文章的 Playwright 端到端测试）替换为适合个人博客的
「构建校验 + 主题单元测试」，并删除了对应的开发期文件。CI 的硬门禁是
`astro check` + 主题单元测试 + `pnpm build`。

**注意**：这些校验**必须在全新 clone 上验证**。本地工作区里 `src/generated/`、`.astro/`
等被 gitignore 的生成物会掩盖问题——例如 `src/content/moments/` 这类空目录在本地存在、
但在 CI 上因不被 git 跟踪而缺失，会让 `tests/collections-manifest.test.mjs` 失败。
因此本仓库用 `.gitkeep` 显式保留空内容目录。
另：字体子集有**以 charset 为键的缓存**，改了采集逻辑后需要清掉
`src/assets/fonts/.subset/`（或改一次字体源文件）才会重新生成，否则会静默复用旧子集。

## 精简说明

已删除上游随仓库带来的、个人博客用不到的开发素材（这些内容都与构建无关，删除不影响站点）：

| 已删除 | 说明 |
| --- | --- |
| `docs/`、`rules/`、`AGENTS.md`、`DESIGN.md`、`CONTRIBUTING.md`、`INDEX.md`、`.agents/` | 主题开发者文档与 AI 技能包 |
| `tests/site/`、`playwright.config.ts` | 依赖演示内容的端到端测试（浏览器从未安装，且 CI 不跑） |
| `lighthouserc.cjs` | 本地性能审计配置 |
| `.vscode/schemas/` | 内容分离用的 YAML schema（已在 settings.json 中一并清理引用） |
| `Benchmark.webp`、`README.*.md`（英/繁/日）、`.env.example`、`vercel.json`、`shirone.content.example.json`、`frontmatter.json`、`artifacts/` | 主题宣传与其它平台/双仓示例 |
| `package.json` 中 `check:manifest`、`design:lint`、`skills:package`、`lighthouse*`、`test`、`schemas` | 指向上述已删文件的失效脚本 |

保留但需要注意的：`scripts/content/*`（内容分离工具，被 `tests/content/*` 覆盖，属 CI 门禁）、
`tests/`（与内容无关的主题单元测试）、`.vscode/extensions.json`、`biome.json`。

## 升级主题

本项目是**单仓**形态（主题源码与文章内容同仓），升级主题需要手动合并上游改动：

```bash
git remote add upstream https://github.com/LyraVoid/Shirone.git
git fetch upstream
git merge upstream/main   # 冲突主要集中在 src/config/ 与上面的 URL 修复处
```

如果希望以后能用 `pnpm add shirones@latest` 直接升级主题，可考虑主题文档推荐的[内容分离](https://docs.shirone.mysqil.com/)方案。

## 许可

主题 Shirone 使用 MIT License，原始版权声明保留于 `LICENSE`。
