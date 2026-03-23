# Vibe AI - 专业级 AI 应用平台

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

> 参照字节跳设计风格的专业级 AI 应用平台

## 🌟 项目介绍

Vibe AI 是一个功能完整的 AI 应用平台，包含自然语言编程、可视化构建、智能体系统、博客系统等功能。

### 核心特性

- 🎨 **专业设计** - 参照字节跳设计风格，现代简洁
- 🤖 **AI 智能体** - 智能任务规划和执行系统
- 💻 **代码生成** - 用自然语言生成完整代码项目
- 🎨 **可视化构建** - 拖拽式组件，实时预览
- 🚀 **一键部署** - 自动部署到 GitHub
- 📝 **博客系统** - 完整的内容管理系统
- 🔍 **全站搜索** - 智能搜索功能
- 🔐 **用户系统** - 完整的认证系统

## 📸 截图

### 首页
![首页](/public/screenshots/home.png)

### 功能详解
![功能详解](/public/screenshots/features.png)

### 博客系统
![博客系统](/public/screenshots/blog.png)

## 🚀 快速开始

### 环境要求

- Node.js 18.17 或更高版本
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 配置环境变量

复制 `.env.example` 到 `.env.local` 并配置：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件：

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 📁 项目结构

```
vibe-pro/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # 全局布局
│   │   ├── page.tsx          # 首页
│   │   ├── about/            # 关于页面
│   │   ├── features/         # 功能详解
│   │   ├── blog/             # 博客系统
│   │   ├── help/             # 帮助文档
│   │   ├── contact/          # 联系页面
│   │   ├── api/              # API 路由
│   │   │   ├── contact/      # 联系表单 API
│   │   │   ├── search/       # 搜索 API
│   │   │   └── auth/         # 认证 API
│   │   └── globals.css       # 全局样式
│   ├── components/           # React 组件
│   │   └── AuthModal.tsx     # 登录/注册模态框
│   └── lib/                  # 工具函数
│       ├── animations.ts     # 动画配置
│       └── email.ts          # 邮件服务
├── public/                   # 静态资源
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🎨 设计系统

### 颜色

- 主色：`#1677FF`（品牌蓝）
- 辅助色：`#a78bff`（紫色）
- 背景色：`#F7F8FA`（浅灰）
- 文字色：`#1a1a1a`（深黑）

### 字体

- 系统：`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto`
- 中文：`'PingFang SC', 'Microsoft YaHei'`
- 英文：`Inter, Roboto`

### 组件

- 按钮：8px, 12px, 16px, 20px, 24px
- 圆角：4px, 8px, 12px, 16px, 24px
- 间距：8px, 12px, 16px, 24px, 32px, 48px

## 🔧 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **部署**: Vercel

## 📡 API 接口

### 联系表单

```typescript
POST /api/contact
Content-Type: application/json

{
  "name": "张三",
  "email": "zhangsan@example.com",
  "company": "ABC 公司",
  "subject": "general",
  "message": "消息内容"
}
```

### 搜索

```typescript
GET /api/search?q=keyword&type=all
```

### 认证

```typescript
# 登录
POST /api/auth
{
  "email": "user@example.com",
  "password": "password123"
}

# 注册
PUT /api/auth
{
  "name": "张三",
  "email": "user@example.com",
  "password": "password123"
}
```

## 🚀 部署

### Vercel 部署（推荐）

1. 推送代码到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 点击部署

### 其他平台

项目支持部署到任何支持 Next.js 的平台：
- Netlify
- AWS Amplify
- Railway
- Render

## 📝 页面列表

- `/` - 首页（智能体广场）
- `/features` - 功能详解
- `/blog` - 博客系统
- `/help` - 帮助文档
- `/contact` - 联系我们
- `/about` - 关于我们

## 🤝 贡献

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Framer Motion](https://www.framer.com/motion/)

## 📞 联系我们

- 网站: [https://vibeai.com](https://vibeai.com)
- 邮箱: [support@vibeai.com](mailto:support@vibeai.com)
- GitHub: [https://github.com/vibeai/vibe-pro](https://github.com/vibeai/vibe-pro)

---

Made with ☁️ by Vibe AI Team
