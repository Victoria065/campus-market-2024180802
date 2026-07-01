# Day5 证据卡 — 状态管理与用户中心

**日期：** 2026-07-01  
**主题：** Pinia 状态管理 · 用户中心 · 收藏功能  
**关键词：** Pinia、状态管理、用户中心

---

## 一、状态设计

### 1.1 用户状态 Store (`src/stores/user.ts`)

使用 Pinia 的 Composition API 风格（`defineStore` + `setup` 函数）创建用户 Store，管理当前模拟用户信息。

**状态字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `username` | `string` | 用户名："张同学" |
| `studentId` | `string` | 学号："20241101001" |
| `college` | `string` | 学院："计算机学院" |
| `grade` | `string` | 年级："2024级" |
| `avatar` | `string` | 头像 emoji："👨‍🎓" |
| `isLoggedIn` | `boolean` | 登录状态（模拟为 `true`） |
| `registerTime` | `string` | 注册时间："2024年9月1日" |

**Getters：** `displayName`、`displayAvatar`  
**Actions：** `updateProfile(partial)` 用于修改用户资料

### 1.2 收藏状态 Store (`src/stores/favorite.ts`)

管理用户收藏的商品或信息，使用 Composition API 风格。

**状态字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `items` | `FavoriteItem[]` | 收藏列表，每项包含 `type`（业务类型）、`id`、`title`、`addedAt` |

**Getters：** `count`（收藏总数）、`isFavorited(type, id)`（是否已收藏）、`favoritedByType(type)`（按类型筛选）  
**Actions：** `toggleFavorite`、`addFavorite`、`removeFavorite`

---

## 二、状态边界设计

### 放入 Store 的数据（跨页面共享）

- ✅ **当前用户信息** — 导航栏、发布页、个人中心等多个位置都需要
- ✅ **收藏列表** — 列表页（添加/取消收藏）和个人中心（查看收藏）都需要

### 不放入 Store 的数据（页面级/临时数据）

- ❌ **表单输入内容** — 仅属于 PublishView 页面，提交后即清除
- ❌ **表单校验错误信息** — 临时 UI 状态，只与当前表单相关
- ❌ **列表页的分类筛选** — 仅 TradeView 页面内部使用
- ❌ **页面加载状态** (`loading`) — 每个页面独立管理

**设计原则：** Store 不是用来存放所有数据的地方，而是用来存放多个页面或多个组件需要共享的状态。本日实现严格遵循这一原则，没有将接口返回的列表数据放入 Store，也没有将页面内部的临时状态放入 Store。

---

## 三、页面改造记录

| 文件 | 改造内容 |
|------|----------|
| `src/main.ts` | 挂载 Pinia（`app.use(createPinia())`） |
| `src/stores/user.ts` | 新建，用户状态 Store |
| `src/stores/favorite.ts` | 新建，收藏状态 Store |
| `src/components/AppHeader.vue` | 右侧新增用户头像+昵称入口，链接到个人中心 |
| `src/views/PublishView.vue` | 发布人从 `userStore.displayName` 读取，不再硬编码 `'我'` |
| `src/views/TradeView.vue` | 每个商品卡片右上角新增收藏星标按钮（☆/⭐） |
| `src/views/UserCenterView.vue` | 资料卡片读取用户 Store；新增"我的收藏"区块展示收藏内容 |

---

## 四、AI 协作记录

### AI 生成内容

- `src/stores/user.ts` — AI 生成了用户 Store 的完整结构，包括模拟用户数据、getters 和 updateProfile action
- `src/stores/favorite.ts` — AI 生成了收藏 Store 的完整结构，包括 toggleFavorite、isFavorited、favoritedByType
- `src/views/TradeView.vue` — AI 生成了收藏按钮的模板代码、样式和交互逻辑
- `src/views/UserCenterView.vue` — AI 生成了"我的收藏"展示区块的模板和逻辑

### 人工审查与调整

- 确认 AI 没有生成登录页、注册页、JWT Token、权限路由等超出 Day5 范围的内容
- 审查了 Store 的划分：用户状态与收藏状态清晰分离，职责单一
- 确认了状态边界：没有将列表数据或表单临时数据放入 Store
- 调整了 publisherContact 为 `studentId + ' · ' + college` 的组合格式，更贴合校园场景
- 审查了所有命名是否清晰：`useUserStore`、`useFavoriteStore`、`toggleFavorite`、`isFavorited` 等命名直观易懂
- 确认了收藏功能的前端内存特性（刷新后丢失），符合 Day5 设计预期

---

## 五、测试验证记录

### 测试环境

- Mock 服务：`npm run mock`（端口 3001）
- 前端服务：`npm run dev`
- 浏览器：手动测试

### 测试用例

| 测试项 | 操作步骤 | 预期结果 | 实际结果 |
|--------|----------|----------|----------|
| 导航栏显示用户 | 打开首页 | 右侧显示 "👨‍🎓 张同学" | ✅ 通过 |
| 发布页读取用户 | 进入发布页，选择二手商品，填写表单并提交 | 发布人显示为 "张同学" | ✅ 通过 |
| 收藏商品 | 进入二手交易页，点击任意商品卡片右上角 ☆ | 图标变为 ⭐，带弹跳动画 | ✅ 通过 |
| 取消收藏 | 再次点击已收藏商品的 ⭐ | 图标变回 ☆ | ✅ 通过 |
| 个人中心资料 | 进入个人中心 | 显示 "张同学"、学号、学院、年级 | ✅ 通过 |
| 收藏统计 | 进入个人中心 | "我的收藏"统计数字与收藏操作一致 | ✅ 通过 |
| 收藏列表 | 进入个人中心，查看"我的收藏"区块 | 按类型分组展示已收藏内容，可取消收藏 | ✅ 通过 |
| 页面无报错 | 浏览所有页面 | 控制台无 Pinia 相关错误 | ✅ 通过 |

### 控制台检查

- 无 `TypeError`、无 `ReferenceError`
- 无 Pinia 相关警告
- Store 正确挂载，所有组件正确读取状态

---

## 六、关键收获

1. **Pinia 状态管理**让项目从"多个页面各自工作"进入"多页面共享状态"的阶段。当前用户信息在导航栏、发布页、个人中心三个位置使用，验证了集中管理的价值。

2. **状态边界意识**是本日最重要的概念。不是所有数据都适合放入 Store — 只有跨页面共享的状态才需要集中管理。表单内容、加载状态、筛选条件等页面级数据应保留在组件内部。

3. **用户中心**作为状态管理的"展示窗口"，同时展示了两个 Store（用户和收藏）的数据，体现了 Store 数据在多个场景下的复用能力。

4. 本日不追求完整登录系统，而是强调 Pinia 使用正确、状态边界清楚、用户中心可用、收藏交互可验证。
