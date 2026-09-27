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

为使主题在 GitHub Pages **子路径**部署下正确工作，修复了上游若干「只按根路径拼 URL」的写法（上游默认部署在根路径，因此不会暴露）：

- `src/utils/url-utils.ts`：新增 `getSiteWithBase()`，产出「域名 + base」的站点根地址；
- `src/pages/rss.xml.ts`、`src/pages/atom.xml.ts`：feed 的 `<link>` / `<id>` / `self` 缺少 `/blog` 前缀；
- `src/pages/llms.txt.ts`、`src/pages/llms-full.txt.ts`：正文内链接缺少前缀；
- `src/pages/robots.txt.ts`：`Sitemap:` 地址缺少前缀；
- `src/layouts/Layout.astro`：页面 `<head>` 中 RSS / Atom 的 `<link rel="alternate">` 缺少前缀。

另外把上游面向主题开发者的 CI（包含依赖演示文章的 Playwright 端到端测试）替换为适合个人博客的「构建校验 + 主题单元测试」。CI 中刻意排除了三类检查，原因如下：

| 排除项 | 原因 |
| --- | --- |
| `pnpm check:manifest` | 校验主题自带 Markdown 语法演示文与语法清单的对应关系，演示文已删除 |
| `tests/feature-data.test.mjs` | 断言中写死了 `shirone`、`kernelpatch`、`folkpatch`、`PHP` 等演示实体 |
| `includes` / `rehype-markdown-images` 插件测试 | 前者依赖 `src/content/snippets/include-example.md`；后者在上游原始克隆中同样失败 |

除上述三项外，其余 387 项与文章内容无关的主题单元测试仍在 CI 中作为**硬门禁**运行。CI 的门禁是 `astro check` + 主题单元测试 + `pnpm build`（站点能否构建成功）。

**注意**：这些校验**必须在全新 clone 上验证**。本地工作区里 `src/generated/`、`.astro/` 等被 gitignore 的生成物会掩盖问题——例如 `src/content/moments/` 这类空目录在本地存在、但在 CI 上因不被 git 跟踪而缺失，导致 `tests/collections-manifest.test.mjs` 失败。因此本仓库用 `.gitkeep` 显式保留空内容目录。

想恢复被排除的检查：把主题的演示文章放回 `src/content/posts/` 与 `src/content/snippets/`，并在 `src/data/` 中恢复演示实体。

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
