# RMS Digital Experiences - 命理与身心灵数字产品演示中心

面向风水、命理、玄学与身心灵领域老师打造的高端数字作品演示与定制 Hub。

---

## 一、系统架构与功能概览

### 1. 核心前台能力
- **首页演示中心 (`/`)**：
  - 8 款真实可体验的原型 Demo。
  - 作品卡片统一 **16:10** 比例封面，真实主页截图展示。
  - 卡片提供“进入体验 ↗”（直接外链）、“查看介绍”（进入详情页）与“定制类似系统”（自动带入作品信息唤起表单）。
  - 支持按作品名称与 Slug 实时搜索，空结果友好提示。
- **独立作品详情页 (`/projects/[slug]`)**：
  - 展示作品名称、封面、一句话说明与真实功能标签。
  - **真实页面截图画廊**：支持全尺寸高清预览与弹窗灯箱。
  - **适合哪些老师或服务场景**：未核实内容时自动隐藏，绝不编造虚假数据。
  - **可讨论的专属定制方向**：与已有功能明确区分标识，仅作为量身定制的拓展建议。
  - **直达按钮**：“打开 Demo ↗” 与 “我想定制类似系统”。
  - **返回导航**：“← 返回作品列表”。
  - **安全保护**：隐藏作品不可通过直接访问 URL 查看（自动触发 404）。
- **优化咨询面板**：
  - 自动带入作品名称、Demo 链接、用户称呼、专业流派与期望功能。
  - 支持一键复制结构化咨询方案。
  - 配置有效 WhatsApp 号码时显示直跳按钮，并提示需在应用中点击发送；未配置时不显示无效按钮。

### 2. 受保护的后台系统 (`/admin`)
- 基于 **Supabase Auth + Postgres + Storage** 架构设计。
- **无公共注册**，不设默认密码，通过服务端权限与 `ADMIN_EMAILS` 白名单严格校验身份。
- **作品管理**：
  - 新增、编辑、隐藏作品（隐藏作品对公众完全不可见）。
  - Slug 格式校验与唯一性检测，修改时提供旧链接失效警示。
  - Demo URL 严格校验必须为有效的 `http://` 或 `https://` 网址。
  - 真实图片上传与存储桶管理（支持上传 16:10 封面与多张截图画廊，配置 Alt 文本）。
  - 区分编辑“适合服务场景”与“可定制方向”。
  - 删除作品设置二次确认弹窗，日常维护引导优先使用“隐藏”。
- **站点配置**：管理 WhatsApp 号码与品牌文案，修改即时同步。
- **数据迁移工具**：一键安全导入 8 个初始项目，幂等执行，绝不覆盖已有数据库修改。
- **诚实持久化设计**：未配置 Supabase 时明确提示未连接并提供配置步骤，不使用 localStorage 冒充正式后台，不显示假成功。

---

## 二、本地开发与快速预览

```bash
# 启动本地开发服务（默认端口 3000）
npm run dev

# 生产环境编译构建（静态页面与类型校验）
npm run build

# 运行生产构建产物
npm run start
```

访问 `http://localhost:3000` 即可在前台与手机端进行完整交互。

---

## 三、Supabase 后台连接指南

### 1. 配置环境变量
在项目根目录下创建 `.env.local` 文件（可参考 `.env.example`）：

```bash
# Supabase 控制台 -> Project Settings -> API
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...

# 服务端管理 Key（用于数据迁移与服务端管理操作）
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# 授权管理员邮箱列表（逗号分隔）
ADMIN_EMAILS=your-admin@example.com
```

### 2. 执行数据库与 Storage 迁移
打开 Supabase 控制台的 **SQL Editor**，执行本项目中的建表脚本：
📁 **`supabase/migrations/001_initial_schema.sql`**

该脚本将自动完成：
1. 创建 `projects` 表（包含 slug、url、screenshots、custom_directions 等字段）。
2. 创建 `site_settings` 表。
3. 启用 RLS（Row Level Security），确保公众只能只读已发布的公开作品。
4. 创建 `project-media` 存储桶并配置读写权限。

### 3. 创建第一个管理员账号
因本系统不开放公众注册，首个管理员需在 Supabase 后台直接创建：
1. 登录 Supabase 控制台，进入 **Authentication → Users**。
2. 点击右上角 **Add user** → **Create user**。
3. 输入管理员的邮箱（需与 `.env.local` 中的 `ADMIN_EMAILS` 一致）和密码。
4. 勾选 **Auto Confirm User?**（自动确认邮箱）。
5. 保存后，即可在 `http://localhost:3000/admin/login` 输入该账号密码进入管理后台。

### 4. 导入初始 8 个作品
登录 `/admin` 后，点击顶部导航的 **数据导入与迁移**，点击 **立即导入 8 个初始作品** 即可将全部项目持久化到数据库中。

---

## 四、无数据库状态下的维护方式（优雅降级）

在未连接 Supabase 时，展示中心会自动从 `src/data/siteConfig.ts` 读取本地配置正常展示：

1. **修改作品数据**：打开 `src/data/siteConfig.ts` 的 `projectsData` 数组，直接调整字段。
2. **替换作品截图**：将新的 16:10 截图放入 `public/covers/` 目录，并在对应项目的 `coverImage` 中指定路径（如 `coverImage: "/covers/soulflow.png"`）。
3. **修改 WhatsApp 号码**：直接修改 `siteConfig.ts` 中的 `whatsappNumber` 字段。
