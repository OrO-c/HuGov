# Hugov — Hugo 主题

老派机构风 Hugo 主题，从 AstGov (Astro) 迁移而来。  
看起来像 2005 的政府网站，写起来像 Hugo 2026。

## 环境要求

- Hugo **v0.120.0** 或更高版本（使用 Hugo Pipes 编译 SCSS/JS）
- Go 语言环境（Hugo Pipes 依赖 Go，安装 Hugo Extended 版即可）

## 快速开始

```bash
# 1. 创建新站点（或使用已有站点）
hugo new site my-site
cd my-site

# 2. 将 Hugov 主题复制到 themes/ 目录
cp -r /path/to/hugov themes/hugov

# 3. 复制示例配置到项目根目录
# （config/_default/ 下的文件已随项目提供）

# 4. 创建示例文章
hugo new posts/news/first-post.md

# 5. 启动开发服务器
hugo server -D
```

浏览器打开 `http://localhost:1313` 即可看到效果。

---

## 目录结构

```
my-site/
├── config/_default/           # 站点配置（用户自定义）
│   ├── hugo.toml              # Hugo 核心配置
│   └── params.toml            # 主题参数
├── content/
│   ├── _index.md              # 首页内容（可选）
│   ├── news/                  # 文章分类目录（分类名即 section）
│   │   ├── _index.md          # 分类描述（可选，title 字段做列表页标题）
│   │   └── my-post.md         → 访问 /news/my-post/
│   ├── announce/
│   │   ├── _index.md
│   │   └── my-announce.md     → 访问 /announce/my-announce/
│   ├── banner/                # 轮播图（每张图一个 md）
│   │   └── slide-1.md
│   ├── headline/              # 头条卡片（每卡片一个 md）
│   │   └── card-1.md
│   ├── about.md               → 访问 /about/
│   └── contact.md             → 访问 /contact/
├── static/                    # 静态资源
│   └── images/                # 图片
└── themes/
    └── hugov/                 # 本主题（不可手动修改）
```

---

## 配置详解

### `config/_default/hugo.toml` — 核心配置

| 配置项 | 值示例 | 说明 | 必填 |
|--------|--------|------|------|
| `title` | `"王俊伊大学"` | 站点标题（← Astro: `siteName`） | ✅ |
| `baseURL` | `"https://example.com"` | 部署域名（← Astro: `site.base`） | ✅ |
| `languageCode` | `"zh-CN"` | 语言代码 | ✅ |
| `theme` | `"hugov"` | 固定为 `"hugov"` | ✅ |
| `paginate` | `20` | 列表页每页条数 | 可选 |
| `buildDrafts` | `false` | 开发时设为 `true` 预览草稿 | 可选 |

### `config/_default/params.toml` — 主题参数

本文件覆盖 `themes/hugov/config.toml` 中的默认值。所有可配置项如下：

#### 站点基本信息

| 参数 | 类型 | 默认值 | 说明（← Astro 来源） |
|------|------|--------|---------------------|
| `siteSubtitle` | string | `"Government & University Website"` | 副标题（Astro: `siteSubtitle`） |
| `siteLogo` | string | `""` | Logo 路径，如 `/images/logo.png`（Astro: `siteLogo`） |
| `siteIcon` | string | `"/favicon.svg"` | 浏览器标签图标（Astro: `siteIcon`） |
| `defaultFontSize` | string | `"medium"` | 默认字号 `small`/`medium`/`large`（Astro: `defaultFontSize`） |

#### 配色方案（`[colors]`）

| 参数 | 默认值 | 说明（← Astro: `colors.*`） |
|------|--------|----------------------------|
| `primary` | `#003366` | 主色 — 顶栏/底部背景 |
| `primaryLight` | `#184390` | 主色浅变体 |
| `secondary` | `#CC0000` | 辅色 — 导航背景/高亮 |
| `accent` | `#FF6600` | 强调色 |
| `background` | `#F5F5F5` | 页面背景色 |
| `text` | `#333333` | 正文颜色 |
| `link` | `#0000FF` | 链接颜色 |
| `linkVisited` | `#800080` | 已访问链接颜色 |
| `border` | `#CCCCCC` | 边框颜色 |
| `divider` | `#EEEEEE` | 分割线颜色 |
| `fontFamily` | `"宋体", "SimSun", serif` | 正文字体 |

#### SEO 元数据（`[meta]`）

| 参数 | 类型 | 说明（← Astro: `meta.*`） |
|------|------|--------------------------|
| `meta.keywords` | string | SEO 关键词，逗号分隔 |
| `meta.description` | string | SEO 描述 |

#### 顶栏（`[topBar]`）

```toml
[topBar]
  enabled = true                # 是否显示顶栏（← Astro: topBar.enabled）
  searchEnabled = false         # 是否显示搜索框（← Astro: topBar.searchEnabled）
  searchPlaceholder = "请输入关键字"

  [[topBar.quickLinks]]
    text = "学生"
    url = "/students"
  [[topBar.quickLinks]]
    text = "English"
    url = "/en"

  [[topBar.rightLinks]]
    text = "校长信箱"
    url = "mailto:admin@example.com"
```

#### 首页模块开关（`[modules]`）

| 参数 | 类型 | 默认值 | 说明（← Astro: `modules.*`） |
|------|------|--------|----------------------------|
| `modules.banner` | bool | `true` | 轮播图 |
| `modules.headline` | bool | `true` | 头条卡片 |
| `modules.countdown` | bool | `false` | 倒计时 |
| `modules.quickLinks` | bool | `true` | 快速通道 |
| `modules.friendLinks` | bool | `true` | 友情链接 |

#### 分类定义（`[[categories]]`）

这是核心配置，定义首页按哪些分类展示文章列表：

```toml
[[categories]]
  title = "校园资讯"     # 区块标题
  slug = "news"         # 标识符，对应 content/posts/news/ 和文章 category 字段
  limit = 8             # 首页最多显示条数
  side = "main"         # main = 左栏70%，side = 右栏30%

[[categories]]
  title = "通知公告"
  slug = "announce"
  limit = 5
  side = "side"
```

#### 快速通道（`[[quickLinks]]`）

```toml
[[quickLinks]]
  text = "招生信息"
  url = "/admission"
```

#### 友情链接（`[[friendLinks]]`）

```toml
[[friendLinks]]
  text = "中华人民共和国教育部"
  url = "http://www.moe.gov.cn"
```

#### 底部信息（`[footer]`）

```toml
[footer]
  organization = "王俊伊大学"              # 机构名称
  footerLogo = "/images/logo.png"         # 底部 Logo（可选）
  policeRecord = "吉公网安备 xxxxxxxxx 号" # 公安备案号（可选）

  [[footer.contacts]]
    label = "地址"
    value = "吉林省长春市 XX 路 123 号"

  [[footer.records]]
    label = "ICP备案"
    value = "吉ICP备 xxxxxx 号"
    link = "https://beian.miit.gov.cn"

  [[footer.links]]
    text = "关于我们"
    url = "/about"

  [[footer.extraLinks]]
    text = "校长信箱"
    url = "mailto:president@example.com"

  [[footer.qrCodes]]
    src = "/images/qrcode.png"
    alt = "官方微信"
```

#### 界面文字（`[ui]`）

```toml
[ui]
  moreText = "更多 →"
  dropdownArrow = "▼"
  copyright = "版权所有 © {year} {org}"   # {year} {org} 自动替换
  dateFormat = "{month}月"                # 列表日期格式

  [ui.quickLinks]
    title = "快速通道"
    expandText = "展开更多"
    collapseText = "收起"

  [ui.friendLinks]
    title = "友情链接"

  [ui.fontSizeLabels]
    small = "小"    medium = "中"    large = "大"

  [ui.countdown]
    labels = { days = "天", hours = "时", minutes = "分", seconds = "秒" }

  [ui.article]
    authorLabel = "作者："
    tagLabel = "标签："
    backLinkText = "← 返回列表"
```

#### 导航高亮（`navHighlight`）

指向 `hugo.toml` 中 `[menu]` 菜单项的 `identifier`，该菜单项会获得橙色高亮背景。

#### 倒计时配置（`[countdown]`）

```toml
[countdown]
  title = "距报名截止还有"
  targetDate = "2026-07-15T18:00:00"   # ISO 格式，空字符串不显示
  buttonLink = "/signup"
  buttonText = "立即报名 →"
```

---

## 内容管理

### 文章（posts）

文章放在分类名直接命名的目录下：

```
content/
├── news/
│   ├── _index.md      # 分类列表页标题/描述（可选）
│   └── my-post.md     → 访问 /news/my-post/
├── announce/
│   └── my-announce.md → 访问 /announce/my-announce/
```

> 每个分类目录对应 `params.toml` 中 `[[categories]]` 的 `slug` 值。  
> 建议为每个分类创建 `_index.md` 以设置列表页标题：  
> `content/news/_index.md` → `--- title: "校园资讯" ---`

#### Frontmatter 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `title` | string | ✅ | — | 文章标题 |
| `date` | string | ✅ | — | 日期，格式 `"2006-01-02"`，**必须加引号** |
| `category` | string | 否 | 从目录名推断 | 分类标识，需与 `params.toml` 中 `categories[].slug` 一致 |
| `author` | string | 否 | `"本站"` | 作者名 |
| `tags` | string[] | 否 | `[]` | 标签数组 |
| `summary` | string | 否 | `""` | 文章摘要，显示在详情页顶部 |
| `description` | string | 否 | `""` | SEO 描述 |
| `draft` | bool | 否 | `false` | 草稿模式 |
| `image` | string | 否 | `""` | 头图路径 |

**示例：**

```markdown
---
title: "2026 年招生简章发布"
date: "2026-06-01"
category: "news"
author: "招生办"
tags: ["招生", "通知"]
summary: "2026 年本科招生工作正式启动"
draft: false
---

正文内容……
```

### 轮播图（banner）

每张轮播图是一个独立的 Markdown 文件，放在 `content/banner/` 下：

```markdown
---
src: "/images/banner1.jpg"   # 图片路径（放 static/images/）
alt: "校园风光"               # 替代文本
link: "/about"                # 点击跳转（可选）
weight: 1                     # 排序（数字越小越靠前）
---
```

### 头条卡片（headline）

每张卡片一个文件，放在 `content/headline/` 下：

```markdown
---
src: "/images/card1.jpg"
alt: "招生简章"
title: "2026 年本科招生简章发布"
date: "2026-06-01"
link: "/admission"
weight: 1
---
```

### 独立页面

直接在 `content/` 下创建 `.md` 文件即可：

```
content/
├── about.md      →  访问 /about
├── contact.md    →  访问 /contact
└── signup.md     →  访问 /signup
```

没有 frontmatter 特殊要求，只需 `title` 和 `date`。

---

## 配置映射一览

| Astro 配置项 | Hugo 配置位置 | Hugo 参数路径 |
|-------------|--------------|--------------|
| `siteName` | `hugo.toml` | `title` |
| `siteSubtitle` | `params.toml` | `siteSubtitle` |
| `siteLogo` | `params.toml` | `siteLogo` |
| `siteIcon` | `params.toml` | `siteIcon` |
| `defaultFontSize` | `params.toml` | `defaultFontSize` |
| `colors.*` | `params.toml` | `colors.*` |
| `topBar.*` | `params.toml` | `topBar.*` |
| `nav[]` | `hugo.toml` | `[menu]` + `menu.main[]` |
| `nav[].highlight` | `params.toml` | `navHighlight` |
| `modules.*` | `params.toml` | `modules.*` |
| `categories[]` | `params.toml` | `categories` |
| `quickLinks[]` | `params.toml` | `quickLinks` |
| `friendLinks[]` | `params.toml` | `friendLinks` |
| `footer.*` | `params.toml` | `footer.*` |
| `ui.*` | `params.toml` | `ui.*` |
| `meta.*` | `params.toml` | `meta.*` |

---

## 特殊处理说明

### Tailwind → 纯 SCSS

原 Astro 主题使用 Tailwind + `@tailwindcss/typography`。Hugov 已将其**转换为纯 SCSS**，通过 Hugo Pipes 编译。CSS 变量体系完全保留。

### `<Image />` 组件 → 原生 `<img>`

原 Astro 主题使用 `astro:assets` 的 `<Image />` 组件（自动优化/WebP/尺寸推断）。Hugo 无内置等价物，已回退为原生 `<img>` 标签。如需图片优化，推荐：
- 手动使用 `resources.Get` + `.Resize` 或 `.Fill` 处理
- 或使用第三方 CDN 图片服务

### Banner/Headline 内容管理

原 Astro 项目使用 Content Layer API 管理轮播图和头条卡片。Hugov 使用 `content/banner/` 和 `content/headline/` 内容目录，每个文件代表一张幻灯片/卡片。

### 搜索功能

搜索框目前为 UI 展示，无后端搜索服务。与原 Astro 主题行为一致。

### Hugo 配置优先级

`主题默认值 (themes/hugov/config.toml)` < `项目 config (config/_default/params.toml)` < `环境变量/OS 环境`

---

## 本地开发

```bash
# 启动开发服务器（含草稿）
hugo server -D

# 构建生产版本
hugo

# 预览构建结果
hugo server --disableFastRender
```

---

## License

MIT
