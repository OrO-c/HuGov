# Hugov — 政府/高校风格 Hugo 主题

基于 Hugo 的政府与高校门户网站主题，支持中文全特性，开箱即用。

---

## 目录

- [快速开始](#快速开始)
- [目录结构](#目录结构)
- [站点配置](#站点配置)
  - [基础信息](#基础信息)
  - [配色方案](#配色方案)
  - [顶栏 Toolbar](#顶栏-toolbar)
  - [首页模块开关](#首页模块开关)
  - [分类栏目](#分类栏目)
  - [快速通道](#快速通道)
  - [友情链接](#友情链接)
  - [页脚](#页脚)
  - [UI 文本标签](#ui-文本标签)
  - [倒计时组件](#倒计时组件)
  - [SEO 元数据](#seo-元数据)
  - [文章页选项](#文章页选项)
  - [背景图片](#背景图片)
  - [标题模式](#标题模式)
- [内容管理](#内容管理)
  - [创建栏目](#创建栏目)
  - [编写文章](#编写文章)
  - [首页 Banner](#首页-banner)
  - [首页头条卡片](#首页头条卡片)
  - [管理菜单](#管理菜单)
- [功能特性](#功能特性)
  - [字号切换](#字号切换)
  - [打印按钮](#打印按钮)
  - [响应式设计](#响应式设计)
  - [图片懒加载](#图片懒加载)
  - [Banner 轮播](#banner-轮播)
- [维护与部署](#维护与部署)

---

## 快速开始

### 1. 创建新站点

```bash
hugo new site my-site --format toml
cd my-site
```

### 2. 安装主题

```bash
git clone https://github.com/OrO-c/HuGov.git themes/hugov
```

### 3. 配置站点

编辑 `config/_default/hugo.toml`，至少设置：

```toml
title = "贵校名称"
baseURL = "https://your-domain.com"
theme = "hugov"
```

编辑 `config/_default/params.toml` 按需修改参数（完整参考见后文）。

### 4. 创建内容

```bash
# 新闻文章
hugo new content news/hello-world.md

# Banner 幻灯片
hugo new content banner/slide-1.md

# 头条卡片
hugo new content headline/card-1.md
```

### 5. 本地预览

```bash
hugo server -D
```

访问 `http://localhost:1313` 即可看到站点。

### 6. 构建发布

```bash
hugo
```

生成的静态文件位于 `public/` 目录，部署到任何 Web 服务器即可。

---

## 目录结构

```
my-site/
├── config/
│   └── _default/
│       ├── hugo.toml       # Hugo 核心配置
│       └── params.toml     # 主题参数配置（覆盖主题默认）
├── content/
│   ├── _index.md           # 首页
│   ├── banner/             # 轮播幻灯片
│   │   └── slide-1.md
│   ├── headline/           # 头条卡片
│   │   └── card-1.md
│   ├── news/               # 新闻栏目
│   ├── announce/           # 通知公告
│   ├── academics/          # 学术动态
│   ├── spirit/             # 自定义栏目
│   └── ...                 # 其他栏目
├── assets/
│   └── images/             # 图片资源（Hugo 处理）
├── static/
│   └── favicon.svg         # 站点图标
├── archetypes/             # 内容模板（可选）
│   ├── news.md
│   ├── academics.md
│   └── ...
└── themes/
    └── hugov/              # 主题文件（不修改）
```

---

## 站点配置

所有配置项在 `config/_default/params.toml` 中设置，覆盖主题默认值。

### 基础信息

```toml
# 副标题（显示在站点名称下方）
siteSubtitle = "Your University"

# Logo 图片路径（assets/ 或 static/ 下的图片）
siteLogo = "/images/logo.png"

# 站点图标
siteIcon = "/favicon.svg"

# 默认字号：small / medium / large
defaultFontSize = "medium"
```

### 配色方案

```toml
[colors]
  primary      = "#003366"   # 主色（导航、标题）
  primaryLight = "#184390"   # 主色浅色
  secondary    = "#CC0000"   # 强调色（二级导航）
  accent       = "#FF6600"   # 强调色
  background   = "#F5F5F5"   # 页面背景
  text         = "#333333"   # 正文颜色
  link         = "#0000FF"   # 链接颜色
  linkVisited  = "#800080"   # 已访问链接
  border       = "#CCCCCC"   # 边框颜色
  divider      = "#EEEEEE"   # 分割线颜色
  fontFamily   = "宋体, SimSun, serif"  # 正文字体
```

### 顶栏 Toolbar

```toml
[topBar]
  enabled          = true    # 是否显示顶栏
  searchEnabled    = false   # 是否显示搜索框
  searchPlaceholder = "请输入关键字"

  # 左侧快速链接
  [[topBar.quickLinks]]
    text   = "学生"
    url    = "/students"
    target = "_self"         # 可选，默认 _self

  # 右侧链接
  [[topBar.rightLinks]]
    text   = "校长信箱"
    url    = "mailto:president@university.edu"
```

### 首页模块开关

```toml
[modules]
  banner      = true   # 轮播图
  headline    = true   # 头条卡片
  countdown   = false  # 倒计时
  quickLinks  = true   # 快速通道
  friendLinks = true   # 友情链接
```

### 分类栏目

首页内容区显示的文章栏目列表：

```toml
[[categories]]
  title = "校园资讯"
  slug  = "news"          # 对应 content/news/
  limit = 8               # 显示文章数
  side  = "main"          # main=左栏主区, side=右栏

[[categories]]
  title = "通知公告"
  slug  = "announce"
  limit = 5
  side  = "side"

[[categories]]
  title = "学术动态"
  slug  = "academics"
  limit = 5
  side  = "side"
```

### 快速通道

```toml
[[quickLinks]]
  text   = "招生信息"
  url    = "/admission"
  target = "_self"
```

### 友情链接

```toml
[[friendLinks]]
  text   = "教育部"
  url    = "https://www.moe.gov.cn"
  target = "_blank"
```

### 页脚

```toml
[footer]
  organization  = "贵校名称"
  footerLogo    = "/images/logo.png"
  policeRecord  = "XXXX备 xxxxxxxxxxxx号"

  # 联系信息
  [[footer.contacts]]
    label = "地址"
    value = "XX省XX市XX路XX号"

  # 备案信息
  [[footer.records]]
    label = "XXXX"
    value = "XXXXXXXX号"
    link  = "https://example.com"

  # 页脚右侧链接（可选）
  [[footer.extraLinks]]
    text = "免责声明"
    url  = "/disclaimer"

  # 二维码
  [[footer.qrCodes]]
    src = "/images/qr-wechat.jpg"
    alt = "微信公众号"
```

### UI 文本标签

```toml
[ui]
  moreText        = "更多 →"
  dropdownArrow   = "▼"
  copyright       = "版权所有 © {year} {org}"  # {year}和{org}自动替换
  printButton     = false                      # 是否显示打印按钮
  fontSizeButtons = false                      # 是否显示字号按钮
  dateFormat      = "{month}月"                # 日期格式（暂未使用）

  [ui.quickLinks]
    title       = "快速通道"
    expandText  = "展开更多"
    collapseText = "收起"

  [ui.friendLinks]
    title = "友情链接"

  [ui.fontSizeLabels]
    small  = "小"
    medium = "中"
    large  = "大"

  [ui.countdown]
    labels = { days = "天", hours = "时", minutes = "分", seconds = "秒" }

  [ui.article]
    authorLabel  = "作者："
    tagLabel     = "标签："
    backLinkText = "← 返回列表"

  [ui.banner]
    prevText = "‹"    # 上一张按钮文字
    nextText = "›"    # 下一张按钮文字
```

### 倒计时组件

```toml
[countdown]
  title      = "距报名截止还有"
  targetDate = "2026-12-31T23:59:59+08:00"  # 留空则不显示
  buttonLink = "/signup"
  buttonText = "立即报名 →"
```

### SEO 元数据

```toml
[meta]
  keywords    = "大学,教育,招生,官方网站"
  description = "贵校官方门户网站"
```

### 文章页选项

文章详情页的交互按钮独立开关：

```toml
[ui]
  printButton     = true   # 显示打印按钮
  fontSizeButtons = true   # 显示大/中/小字号切换按钮
```

两个按钮在文章标题下方并排右对齐。只启用其中一个时，它自动顶到最右侧。

### 背景图片

可在内容区（Toolbar/Header/Footer 之外的区域）显示背景图片。

```toml
[background]
  enabled = false          # 是否启用
  images = []              # 图片路径数组，单张=静态，多张=轮播
  interval = 5000          # 轮播间隔（毫秒）
```

启用后，背景图铺满 `<main>` 区域，`background-size: cover` 居中裁剪。

- **单张图片**：静态显示
- **多张图片**：自动轮播，每隔 `interval` 毫秒切换到下一张
- **小屏（≤768px）**：`background-attachment` 切换为 `scroll` 避免滚动卡顿
- 所有内容容器（模块、文章等）保持原有白色背景，背景图仅在容器间隙中可见

图片建议使用 **2:3 竖版比例**（如 1200×1800px）。桌面端自动横向中心裁剪，手机端纵向自然匹配。图片路径相对于 `static/` 或 `assets/` 目录。

### 标题模式

```toml
# headerMode = "image"          # 取消注释启用纯图片标题
# headerImage = "/images/header-banner.jpg"

# 默认 text 模式：Logo + 站名 + 副标题
# image 模式：全宽响应式图片，不显示文字
```

---

## 内容管理

### 创建栏目

在 `content/` 下创建文件夹，加上 `_index.md`：

```bash
hugo new content research/_index.md
```

`_index.md` 内容：

```markdown
---
title: "科学研究"
---
```

然后在首页配置中添加栏目：

```toml
[[categories]]
  title = "科学研究"
  slug  = "research"
  limit = 5
  side  = "side"
```

若需要该栏目出现在导航菜单中，还需在 `config/_default/hugo.toml` 的 `[[menu.main]]` 中添加对应条目。

### 编写文章

使用 Hugo 原生命令创建，自动填充 front matter：

```bash
# 新闻类文章
hugo new content news/文章标题.md

# 学术动态
hugo new content academics/文章标题.md

# 精神
hugo new content spirit/文章标题.md
```

**文章 front matter 字段说明：**

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期，格式 `"2006-01-02"` |
| `author` | 推荐 | 作者姓名或部门 |
| `category` | 是 | 栏目标识，与 `content/` 下文件夹名一致 |
| `tags` | 否 | 标签列表，用于文章分类 |
| `summary` | 推荐 | 文章摘要，显示在首页列表 |
| `image` | 推荐 | 封面图路径 |
| `writer` | 否 | 责任编辑（显示在审核信息区） |
| `photographer` | 否 | 摄影（显示在审核信息区，新闻类用） |
| `reviewers` | 否 | 审核人列表（显示在审核信息区，新闻类用） |
| `source` | 否 | 文章来源 |
| `draft` | 否 | 设为 `true` 时仅在 `hugo server -D` 中可见 |

**文章内容示例：**

```markdown
---
title: "我校举行开学典礼"
date: "2026-09-01"
author: "宣传部"
category: "news"
tags: ["典礼", "校园活动"]
summary: "2026年秋季开学典礼在体育馆隆重举行。"
image: "/images/cover/news/ceremony.jpg"
writer: "张编辑"
photographer: "李明"
reviewers: ["张编辑", "王主任"]
source: "宣传部"
---

　　2026年9月1日上午，我校开学典礼在体育馆隆重举行。

### 典礼盛况

　　校领导出席典礼并发表讲话……
```

### 首页 Banner

Banner 幻灯片位于 `content/banner/` 目录。创建新幻灯片：

```bash
hugo new content banner/slide-4.md
```

**front matter 字段：**

```markdown
---
src: "/images/banner-photo.jpg"   # 图片路径（assets/ 或 static/）
alt: "图片说明文字"               # 替代文本
link: "/news/001"                  # 点击跳转（可选）
width: 1200                        # 图片宽度
height: 400                        # 图片高度
weight: 1                          # 排序权重（升序）
---
```

图片建议使用 16:9 宽高比。幻灯片按 `weight` 升序排列。

### 首页头条卡片

头条卡片位于 `content/headline/` 目录：

```bash
hugo new content headline/card-4.md
```

```markdown
---
src: "/images/cover/news/001.jpg"
alt: "卡片图片说明"
title: "卡片标题"
date: "2026-06-19"
link: "/news/001"
width: 400
height: 250
weight: 1
---
```

### 管理菜单

导航菜单在 `config/_default/hugo.toml` 的 `[[menu.main]]` 中配置：

```toml
[[menu.main]]
    identifier = "about"         # 唯一标识
    name       = "学校概况"       # 显示名称
    url        = "/about"        # 链接地址
    weight     = 1               # 排序（越小越靠前）

[[menu.main]]
    identifier = "news"          # 父菜单
    name       = "新闻中心"
    url        = "/news"
    weight     = 2

[[menu.main]]
    identifier = "news-campus"   # 子菜单
    name       = "校园资讯"
    url        = "/news"
    parent     = "news"          # 父菜单 identifier
    weight     = 1
```

参数说明：

| 参数 | 说明 |
|------|------|
| `identifier` | 唯一标识符，子菜单的 `parent` 指向此值 |
| `name` | 菜单显示文字 |
| `url` | 链接地址 |
| `parent` | 父菜单 identifier，子菜单必填 |
| `weight` | 排序权重，升序排列 |
| `pre` | 可选，在文字前插入 HTML |
| `post` | 可选，在文字后插入 HTML |

---

## 功能特性

### 字号切换

工具栏和文章页提供大/中/小三档字号切换。站点管理员可通过 `defaultFontSize` 设置默认字号。

切换效果作用于整站，通过 `data-font-size` 属性控制，字号定义在 CSS 中：

| 档位 | html font-size | 适用场景 |
|------|---------------|---------|
| small | 12px | 密集信息浏览 |
| medium | 14px（默认） | 常规浏览 |
| large | 16px | 无障碍阅读 |

可在 `config/_default/params.toml` 的 `[ui.fontSizeLabels]` 中自定义按钮文字。

### 打印按钮

文章详情页和独立页面支持打印功能。开启后显示打印按钮：

```toml
[ui]
  printButton = true
```

点击按钮调用浏览器原生打印对话框（`window.print()`）。

### 响应式设计

主题针对三种屏幕尺寸做了适配：

| 断点 | 范围 | 布局特点 |
|------|------|---------|
| 桌面 | ≥1200px | 多栏布局，容器宽 1280px |
| 平板 | 768–1199px | 双栏自适应 |
| 手机 | ≤767px | 单栏堆叠，导航折叠为汉堡菜单 |

所有图片使用 `object-fit: cover` 和 `aspect-ratio` 确保在不同屏幕下正确缩放。

### 图片懒加载

文章封面和正文图片使用 Hugo 内置图片处理生成 WebP 格式，支持 `srcset` 响应式图片。首屏图片（Banner 第一张、文章封面）设置 `fetchpriority="high"` 和 `loading="eager"`，其余图片延迟加载。

### Banner 轮播

首页 Banner 支持自动轮播，间隔 4 秒。鼠标悬停暂停，移出后恢复。切到其他标签页时轮播暂停，切回后自动恢复。

可通过 `content/banner/` 下的幻灯片文件管理轮播内容。

---

## 维护与部署

### 本地预览

```bash
hugo server -D
```

`-D` 参数会显示标为 `draft: true` 的草稿文章。

### 构建

```bash
hugo
```

### 部署

将 `public/` 目录部署到任意 Web 服务器（Nginx、Apache、OSS 等）。

若使用子路径部署（如 `https://domain.com/school/`），需在 `hugo.toml` 中设置：

```toml
baseURL = "https://domain.com/school/"
```

### 内容备份

建议将 `content/`、`config/`、`assets/`、`static/`、`archetypes/` 纳入版本控制（Git）。

主题本身通过 Git submodule 管理，更新主题：

```bash
cd themes/hugov
git pull origin main
```

### 常见问题

**Q: 新文章在首页不显示？**
A: 检查 `draft` 是否为 `true`，以及 `category` 是否与栏目 slug 一致。

**Q: 导航菜单点击无反应？**
A: 检查 `config/_default/hugo.toml` 中 `[[menu.main]]` 的 `url` 是否正确，以及对应内容页面是否存在。

**Q: 图片不显示？**
A: 图片应放在 `assets/images/` 或 `static/images/` 目录。`assets/` 下的图片会被 Hugo 处理（支持 WebP 转换），`static/` 下的图片原样复制。
