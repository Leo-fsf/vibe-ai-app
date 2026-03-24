# Vibe Pro 部署指南

## 🚀 部署到 Vercel（使用 GitHub）

### 方法 1：已有 GitHub 账号

如果你有 GitHub 账号，按以下步骤操作：

#### 1. 在 GitHub 创建新仓库
1. 访问 https://github.com/new
2. 仓库名称：`vibe-pro`
3. 描述：`Professional AI Application Platform`
4. 选择：Public（公开）或 Private（私有）
5. 不要勾选"Initialize this repository with a README"
6. 点击"Create repository"

#### 2. 推送代码到 GitHub
```bash
cd /workspace/projects/workspace/vibe-pro
git remote add origin https://github.com/YOUR_USERNAME/vibe-pro.git
git branch -M main
git push -u origin main
```

#### 3. 在 Vercel 部署
1. 访问 https://vercel.com/new
2. 点击"Import Project"
3. 选择你的 GitHub 仓库
4. 配置项目设置（默认即可）
5. 点击"Deploy"

### 方法 2：使用现有 GitHub 账号（Leo-fsf）

如果你之前提到的 GitHub 账号可用：

```bash
cd /workspace/projects/workspace/vibe-pro
git remote add origin https://github.com/Leo-fsf/vibe-pro.git
git branch -M main
git push -u origin main
```

然后在 Vercel 导入这个仓库。

### 方法 3：没有 GitHub 账号

如果你没有 GitHub 账号：

#### 1. 注册 GitHub
1. 访问 https://github.com/signup
2. 填写用户名、邮箱、密码
3. 验证邮箱
4. 完成注册

#### 2. 创建仓库
按照"方法 1"的步骤 1 操作

#### 3. 推送代码
按照"方法 1"的步骤 2 操作（替换 YOUR_USERNAME）

---

## 📋 推送代码步骤（详细）

### 步骤 1：确认 Git 状态
```bash
cd /workspace/projects/workspace/vibe-pro
git status
```

应该显示：
```
On branch main
nothing to commit, working tree clean
```

### 步骤 2：查看已提交的代码
```bash
git log --oneline
```

应该显示：
```
93b8526 Initial commit: Vibe Pro AI Platform - Complete professional AI application platform
```

### 步骤 3：添加远程仓库（替换为你的用户名）
```bash
git remote add origin https://github.com/YOUR_USERNAME/vibe-pro.git
```

### 步骤 4：推送代码
```bash
git branch -M main
git push -u origin main
```

如果提示输入用户名和密码：
- 用户名：你的 GitHub 用户名
- 密码：使用 Personal Access Token（不是密码）

#### 获取 Personal Access Token：
1. 访问 https://github.com/settings/tokens/new
2. Token name：vibe-pro
3. 选择权限：repo（勾选所有）
4. 点击"Generate token"
5. 复制 token（只显示一次）

---

## 🌐 Vercel 部署步骤

### 步骤 1：访问 Vercel
https://vercel.com

### 步骤 2：创建新项目
1. 点击"Add New"
2. 点击"Project"

### 步骤 3：导入 GitHub 仓库
1. 点击"Import"按钮
2. 选择你的 `vibe-pro` 仓库
3. 点击"Import"

### 步骤 4：配置项目
- Project Name：vibe-pro（默认）
- Framework Preset：Next.js（自动检测）
- Root Directory：./（默认）
- Build Command：npm run build（自动检测）
- Output Directory：.next（自动检测）

### 步骤 5：环境变量（可选）
如果需要，点击"Environment Variables"添加：
- NEXT_PUBLIC_SITE_URL：https://vibe-pro.vercel.app

### 步骤 6：部署
点击"Deploy"按钮

等待部署完成（通常 2-3 分钟）

---

## ✅ 部署成功后

### 访问你的网站

**预览 URL**：https://vibe-pro-xxx.vercel.app
**生产 URL**：https://vibe-pro.vercel.app

### 自定义域名（可选）

1. 在 Vercel 项目中点击"Settings"
2. 点击"Domains"
3. 添加你的域名
4. 配置 DNS 记录

---

## 🎯 常见问题

### Q: Git 推送时提示"Authentication failed"
A: 使用 Personal Access Token，不是密码

### Q: Vercel 部署失败
A: 检查构建日志，查看错误信息

### Q: 网站无法访问
A: 检查 Vercel 部署状态，确保构建成功

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看 Vercel 部署日志
2. 检查 GitHub 仓库状态
3. 查看项目文档

---

**Good luck!** 🚀
