# Day2 实训证据卡 —— 页面骨架与路由导航

## 一、页面骨架搭建

本日创建了"校园轻集市"PC 端 Web App 的完整**页面骨架**，在 `src/views/` 目录下共计 9 个页面文件：

| 文件名 | 路由路径 | 页面说明 |
|--------|----------|----------|
| HomeView.vue | / | 平台首页，展示业务分类入口与平台介绍 |
| TradeView.vue | /trade | 二手交易页，展示商品分类标签与示例商品卡片 |
| LostFoundView.vue | /lost-found | 失物招领页，展示校园遗失与捡拾物品信息 |
| GroupBuyView.vue | /group-buy | 拼单搭子页，涵盖外卖拼单、学习搭子、运动组队等场景 |
| ErrandView.vue | /errand | 跑腿委托页，展示校园代取快递、代办事务任务 |
| PublishView.vue | /publish | 发布页面，提供四种发布类型入口 |
| MessageView.vue | /message | 消息中心页，展示私信与系统通知 |
| UserCenterView.vue | /user | 个人中心页，展示用户资料与统计数据 |
| DetailView.vue | /trade/:id | 商品详情页，根据路由参数展示不同商品 |

每个页面均围绕"校园轻集市"业务场景编写，包含清晰的页面标题和业务说明。

## 二、路由导航实现

**路由导航**配置文件位于 `src/router/index.ts`，使用 Vue Router 4 的 `createWebHistory` 模式：

1. 配置了 9 条路由，路径语义清晰（如 `/trade`、`/lost-found`、`/group-buy`、`/errand` 等）；
2. 详情页使用动态路由参数 `/trade/:id`，通过懒加载 `() => import()` 方式引入；
3. 每条路由均设置了 `meta.title` 元信息，方便后续页面标题动态更新；
4. 在 `src/main.ts` 中通过 `app.use(router)` 挂载路由实例。

导航菜单使用 Element Plus 的 `<el-menu>` 组件，设置了 `router` 属性实现与 Vue Router 的无缝集成，通过 `:default-active` 绑定当前路由路径实现导航高亮。

## 三、公共布局设计

**公共布局**部分拆分为三个组件，位于 `src/components/` 目录：

- **AppLayout.vue**：整体页面布局容器，包含头部区域与内容区域，内容区使用 `<router-view />` 渲染子页面，设置最大宽度 1200px 居中显示；
- **AppHeader.vue**：顶部栏区域，展示品牌logo"校园轻集市"与 slogan，内部嵌入 AppNav 导航组件；
- **AppNav.vue**：主导航菜单组件，使用 Element Plus 的 `el-menu` 水平模式，包含 8 个导航项，分别对应首页、二手交易、失物招领、拼单搭子、跑腿委托、发布、消息、个人中心。

`App.vue` 作为根组件，仅引入 `AppLayout` 组件，保持结构简洁。页面组件与通用组件职责明确分离：`views/` 存放页面级组件，`components/` 存放可复用的公共组件。

## 四、AI 协作情况

本日开发过程中使用了 AI Coding 工具辅助：

- **AI 辅助生成**：各页面文件的基础骨架、路由配置模板、布局组件的初始结构；
- **人工审查与修改**：
  - 修正了 GroupBuyView.vue 的内容——AI 最初生成了"数据看板页"的错误内容（包含平台总商品数、今日发布数等不相关数据），人工将其改为拼单搭子场景；
  - 修正了 HomeView.vue 的占位内容，从通用的"项目启动成功"改为校园集市首页的业务分类展示；
  - 修正了 TradeView.vue 的标题从"商品列表页"改为"二手交易"，并补充了校园二手交易场景的示例内容；
  - 修正了 AppNav.vue 的导航实现——原实现将 `<router-link>` 嵌套在 `<el-menu-item>` 内，导致高亮失效；改为使用 `el-menu` 的 `router` 属性 + `:default-active` 绑定，实现正确的路由导航与高亮；
  - 补充了 PublishView、MessageView、UserCenterView 三个页面从单行标题到完整业务场景展示内容；
  - 确保所有页面均围绕"校园轻集市"业务场景展开，删除了不相关的 mock 数据。

## 五、遇到的问题与解决

1. **GroupBuyView 内容错误**：文件内容显示为"数据看板页"，不符合拼单搭子业务场景。解决：重写为拼单搭子相关场景展示。
2. **导航高亮不生效**：原 AppNav 使用 `<router-link>` 嵌套在 `<el-menu-item>` 中，Element Plus 无法感知当前路由。解决：在 `el-menu` 上添加 `router` 属性和 `:default-active` 动态绑定。
3. **HomeView 过于简单**：首页仅显示"项目启动成功"文字，无法体现校园集市平台定位。解决：重新设计首页，添加 hero 区域和四大业务分类卡片。

## 六、项目可运行验证

- 项目可通过 `npm run dev` 正常启动；
- 所有 8 个导航菜单项均可正常点击跳转；
- 当前页面导航高亮正常；
- 刷新页面后路由状态保持正常；
- 商品详情页可通过 `/trade/1`、`/trade/2` 等路径正常访问，路由参数读取正确。
