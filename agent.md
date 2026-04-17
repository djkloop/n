# CyberTruckAI 开发指南

## 项目概述

CyberTruckAI 是一个基于 Next.js 的 API 服务 Landing Page，通过 URL 快速创建和部署 AI API 服务。

## 技术栈

- **框架**: Next.js 16.2.4 (App Router)
- **UI**: React 19 + TypeScript
- **样式**: Tailwind CSS v4 + PostCSS
- **字体**: Outfit (正文) + JetBrains Mono (代码)

## 项目结构

```
cybertruckai-pages/
├── src/
│   ├── app/
│   │   ├── globals.css      # 全局样式 + CSS 变量
│   │   ├── layout.tsx       # 根布局
│   │   └── page.tsx        # 首页 (主入口)
│   └── components/          # 组件目录 (可选)
├── public/                  # 静态资源
├── package.json
├── tsconfig.json
├── next.config.js
├── postcss.config.js
└── DESIGN.md               # 设计规范
```

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务
npm run start
```

## CSS 设计系统

### 颜色变量 (OKLCH)

```css
--background: oklch(0.10 0.015 240);      /* 主背景 */
--background-raised: oklch(0.14 0.015 240); /* 提升层级背景 */
--foreground: oklch(0.95 0.005 240);        /* 主文字 */
--foreground-muted: oklch(0.65 0.01 240);  /* 次要文字 */
--accent: oklch(0.70 0.12 165);            /* 强调色 */
--accent-hover: oklch(0.75 0.14 165);      /* 强调色悬停 */
--border: oklch(0.25 0.01 240);             /* 边框 */
--border-light: oklch(0.18 0.01 240);      /* 浅边框 */
```

### 字体

- **正文**: Outfit (400, 500, 600, 700, 800)
- **代码**: JetBrains Mono (400, 500)

## 页面组件

### 首页组成

1. **HeroSection** - 主横幅区域
2. **TutorialSection** - Tab 教程区域
3. **PricingSection** - 定价预览
4. **CTASection** - 行动号召

### 添加新组件

在 `src/components/` 目录创建组件文件：

```tsx
export function NewComponent() {
  return (
    <section className="py-32 px-8">
      {/* 内容 */}
    </section>
  );
}
```

然后在 `page.tsx` 中导入使用。

## 样式规范

### 间距

- Section 间距: `py-32` (128px) 或 `py-48` (192px)
- 容器最大宽度: `max-w-7xl` (1280px)
- 移动端间距: `px-6` 或 `px-8`

### 圆角

- 按钮: `rounded-full`
- 卡片: `rounded-2xl` 或 `rounded-3xl`
- 输入框: `rounded-xl`

### 过渡动画

```tsx
transition-all duration-300     // 标准过渡
transition-colors duration-500   // 颜色过渡
hover:scale-105                 // 悬停放大
active:scale-95                // 点击缩小
```

## 技能 (Skills)

### 可用技能

| 技能 | 用途 |
|------|------|
| gpt-taste | Awwwards 级动效、GSAP 动画 |
| redesign-existing-projects | 审计并优化现有设计 |
| frontend-design | 通用前端设计 |
| minimalist-ui | 简洁编辑风格 |

### 使用技能

```
用户: 使用 xxx-skill 优化页面
助手: [加载技能] -> 按照技能规范执行
```

## 设计原则

1. **单一强调色** - 使用 `--accent` 作为唯一强调色
2. **OKLCH 色彩** - 避免饱和度超过 80%
3. **无障碍支持** - 添加 `focus-visible` 状态
4. **按钮反馈** - 添加 `active:scale-95` 按压效果
5. **Grain 纹理** - 全局 Grain Overlay 增加质感

## 常见问题

### 构建失败

```bash
# 清除缓存
rm -rf .next

# 重新构建
npm run build
```

### 端口占用

```bash
# 查看端口占用
netstat -ano | findstr :3000

# 结束进程
taskkill /PID <PID> /F
```


### 调试提示

- 只能执行 `npm run build` 命令！！
- 不要执行 `npm run dev` 命令！！