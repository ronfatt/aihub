# RMS Digital Experiences - 命理与身心灵数字产品演示中心

面向风水、命理、玄学与身心灵领域老师打造的精品数字作品展示 Hub。

---

## 一、本地开发与预览

在终端中执行：

```bash
# 启动本地开发服务器（默认端口 3000）
npm run dev

# 构建生产版本（进行静态与类型检查）
npm run build

# 运行构建产物
npm run start
```

访问 `http://localhost:3000` 即可在浏览器或手机模拟器中预览。

---

## 二、数据维护与配置指南

所有项目作品数据与全局文案均集中存储在单个配置文件中：
📁 **`src/data/siteConfig.ts`**

### 1. 配置 WhatsApp 联系方式
在 `siteConfig.ts` 中的 `whatsappNumber` 字段配置您的国际手机号码（仅包含国家代码和数字）：
```typescript
// 示例（未配置时留空字符串 ""）
whatsappNumber: "8613800000000", // 中国大陆
// 或
whatsappNumber: "85291234567",   // 中国香港
```
- **当未配置号码（留空）时**：页面与联系面板仅显示“复制咨询内容”，引导老师复制文字后通过微信/现有联系方式沟通。
- **当配置号码后**：联系面板会自动显示“通过 WhatsApp 发送”绿色专属按钮，点击后自动携带结构化的咨询文本唤起聊天。

### 2. 新增或修改演示作品
在 `projectsData` 数组中添加或修改项目对象：
```typescript
{
  id: "your-new-demo",               // 唯一英文 ID
  title: "新系统名称",                // 展示名称
  description: "打开演示页面，亲自探索与体验", // 简要说明
  url: "https://your-demo.vercel.app/", // 演示外链（在新窗口打开）
  category: "待分类",                // 设为"待分类"时前台自动隐藏该标签
  tags: ["自动化排盘"],               // 可选功能标签
  featured: false,                   // 是否推荐
  sortOrder: 9,                      // 排序权重（数字越小越靠前）
  visible: true,                     // 是否展示在页面中
  accentColor: "#173D35",            // 专属封面基调色
  coverPattern: "compass",           // 几何纹理：rings | grid | orbit | zen | compass | cards | hex | wave
  coverImage: "/covers/demo.png"     // 可选：上传截图至 public/ 目录下后在此填写路径
}
```

### 3. 为作品添加真实截图
1. 将截图保存为 PNG/JPG/WebP 格式（推荐宽高比 16:10，例如 800×500px）。
2. 放入项目的 `public/covers/` 目录（例如 `public/covers/soulflow.png`）。
3. 在 `src/data/siteConfig.ts` 对应项目的 `coverImage` 中填入路径即可：
   ```typescript
   coverImage: "/covers/soulflow.png",
   ```
4. 如果未提供 `coverImage`，系统会自动渲染对应的高级东方极简艺术几何占位封面，绝不伪造虚假 UI。

---

## 三、视觉与设计规范

- **背景色**：暖白 `#F7F5F0`
- **主色**：深墨绿 `#173D35`
- **点缀色**：香槟金 `#B49761`
- **正文字色**：深炭墨 `#252925`
- **响应式保障**：严格适配 iPhone SE (375px) 及各主流移动端屏幕，无横向溢出。
- **动效规范**：轻微优雅，严格遵循 `prefers-reduced-motion` 无障碍规范。
