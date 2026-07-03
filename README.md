# 校园轻集市 (Campus Market Seed)

基于 Vue 3 的校园生活服务平台，支持二手交易、失物招领、拼单搭子和跑腿委托四类校园生活业务。

---

## 项目简介

校园轻集市是一个面向高校校园场景的轻量级信息发布与交流平台。学生可以在平台上发布闲置物品出售、寻找失物或发布招领信息、发起拼单或兴趣组队、以及发布跑腿代办委托。

本项目是《AI 辅助前端工程实践》课程的实训成果，完整经历了从需求分析、页面设计、数据建模、接口模拟、状态管理到交互优化的 7 天开发过程。

---

## 技术栈

| 技术 | 用途 |
|------|------|
| Vue 3 (Composition API) | 前端框架 |
| TypeScript | 类型安全 |
| Vite | 构建工具 |
| Vue Router | 页面路由 |
| Pinia | 状态管理 |
| Element Plus | UI 组件库 |
| Axios | HTTP 请求 |
| JSON Server | Mock 后端服务 |

---

## 快速开始

### 环境要求

- Node.js >= 22.18.0
- pnpm (推荐)

### 安装与启动

```bash
# 安装依赖
pnpm install

# 启动 Mock 服务（新开一个终端）
pnpm mock

# 启动前端开发服务器
pnpm dev
```

浏览器访问 http://localhost:5173

### 构建

```bash
pnpm build
```

---

## 项目功能

### 核心业务

| 业务模块 | 说明 | 路由 |
|----------|------|------|
| 二手交易 | 发布闲置物品出售，支持分类筛选和关键词搜索 | `/trade` |
| 失物招领 | 发布寻物启事或失物招领信息 | `/lost-found` |
| 拼单搭子 | 发起外卖拼单、学习搭子、运动组队、兴趣小组 | `/group-buy` |
| 跑腿委托 | 发布代取快递、代买物品、代办事务等委托 | `/errand` |

### 主要功能

- ✅ 四类业务信息的列表展示与分类筛选
- ✅ 关键词搜索（多字段匹配）
- ✅ 信息发布（表单校验 + 四类业务字段）
- ✅ 收藏功能（四类业务统一收藏，用户中心管理）
- ✅ 用户中心（资料查看与编辑、发布记录、收藏管理）
- ✅ 加载状态反馈（所有列表页）
- ✅ 空状态提示（所有列表页）
- ✅ 错误状态与重试（所有列表页）

---

## 项目目录结构

```
campus-market-seed
├── docs
│   ├── ai/                    # AI 协作记录
│   ├── evidence/              # Day1-Day7 过程证据卡
│   └── guide/                 # 环境配置和入门指南
├── public/                    # 静态资源
├── src
│   ├── api/                   # API 接口封装（按业务模块划分）
│   │   ├── http.ts            # Axios 实例
│   │   ├── trade.ts           # 二手交易接口
│   │   ├── lostFound.ts       # 失物招领接口
│   │   ├── groupBuy.ts        # 拼单搭子接口
│   │   └── errand.ts          # 跑腿委托接口
│   ├── components/            # 通用组件
│   │   ├── AppLayout.vue      # 应用布局（Header + Main + Footer）
│   │   ├── AppHeader.vue      # 顶部导航栏
│   │   ├── AppNav.vue         # 导航菜单
│   │   ├── ItemCard.vue       # 通用商品卡片
│   │   ├── EmptyState.vue     # 空状态组件
│   │   ├── LoadingState.vue   # 加载状态组件
│   │   ├── ErrorState.vue     # 错误状态组件
│   │   ├── SearchBar.vue      # 搜索框组件
│   │   └── FormField.vue      # 表单字段封装
│   ├── router/
│   │   └── index.ts           # 路由配置
│   ├── stores/
│   │   ├── user.ts            # 用户状态 Store
│   │   └── favorite.ts        # 收藏状态 Store
│   ├── views/                 # 页面组件
│   │   ├── HomeView.vue       # 首页
│   │   ├── TradeView.vue     # 二手交易列表
│   │   ├── DetailView.vue    # 商品详情
│   │   ├── LostFoundView.vue # 失物招领列表
│   │   ├── GroupBuyView.vue  # 拼单搭子列表
│   │   ├── ErrandView.vue    # 跑腿委托列表
│   │   ├── PublishView.vue   # 发布页面
│   │   ├── MessageView.vue   # 消息中心
│   │   └── UserCenterView.vue# 个人中心
│   ├── App.vue                # 根组件
│   └── main.ts                # 入口文件
├── db.json                    # JSON Server Mock 数据
├── CHECK_REPORT.md            # 项目检测报告
└── package.json
```

---

## 每日开发记录

| 日期 | 主题 | 主要内容 |
|------|------|----------|
| Day1 | 项目启动与业务梳理 | 环境配置、业务分析、页面清单 |
| Day2 | 页面骨架与路由导航 | 7 个页面骨架、Vue Router、Element Plus 导航 |
| Day3 | Mock 数据建模与列表渲染 | JSON Server、Axios 封装、列表页面数据渲染 |
| Day4 | 发布表单与数据新增 | 四类业务表单、表单校验、数据提交 |
| Day5 | 状态管理与用户中心 | Pinia Store、用户中心、收藏功能 |
| Day6 | 交互优化与体验完善 | 加载/错误/空状态、搜索筛选、收藏交互优化 |
| Day7 | 综合验收与项目展示 | 构建检查、README 完善、证据归档、展示准备 |

---

## AI 协作说明

本项目在开发过程中使用 AI Coding 工具（Claude Code）辅助完成以下工作：

- 页面骨架和路由结构生成
- Mock 数据模型和 JSON 数据编写
- API 接口封装代码生成
- 表单校验逻辑编写
- Pinia Store 结构设计
- 组件抽取和交互优化
- 文档整理和检测报告生成

开发者对 AI 生成的所有内容进行了人工审查、修改和取舍。每项 AI 输出的代码都经过理解、验证和调整后才纳入项目。具体的 AI 协作过程、采纳与拒绝记录、个人修改内容详见 `docs/ai/AI_Collaboration_Card.md` 和各日证据卡。

AI 作为效率工具帮助减少了重复性编码工作，但业务理解、架构设计判断、bug 修复和最终质量把控仍然由开发者完成。

---

## License

本仓库仅用于《校园轻集市》课程教学与实践。
