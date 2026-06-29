# Day3 实训证据卡 —— Mock 数据建模与列表渲染

## 1. 今日完成内容

今天主要做了三件事：

- 创建了 `db.json`，给四类业务（二手交易、失物招领、拼单搭子、跑腿委托）各编了 6-7 条数据，总共 25 条；
- 装好了 json-server 和 axios，配了 `npm run mock` 命令，能启动 Mock API 了；
- 把四个业务页面都改成了从接口拿数据渲染列表，加了筛选和加载状态。

## 2. Mock 数据结构说明

| 数据集合 | 对应业务 | 主要字段 | 页面用途 |
|---|---|---|---|
| trades | 二手交易 | title, price, category, condition, seller, location, status | 商品列表 |
| lostFounds | 失物招领 | type, itemName, category, location, date, contactName, status | 失物/招领列表 |
| groupBuys | 拼单搭子 | title, type, targetCount, currentCount, deadline, organizer, status | 拼单/搭子列表 |
| errands | 跑腿委托 | title, taskType, reward, pickupLocation, deliveryLocation, deadline, status | 跑腿任务列表 |

## 3. 我的设计

**二手交易为什么加 price 和 condition？**

因为学生买东西最关心两件事——多少钱、新旧程度。price 要放在卡片上显眼的位置（我用了红色大字），condition 能让人一眼看出是"几乎全新"还是"有使用痕迹"。

**失物招领为什么需要 type 字段？**

"我丢了东西"和"我捡到东西"是两件完全相反的事。用 type 区分 lost/found 后，页面可以用不同颜色和图标区分——寻物用 😢，招领用 😊，一看就懂。

**拼单搭子为什么需要 targetCount 和 currentCount？**

拼单最核心的信息是"几个人了、还差几个"。我在页面上加了一个进度条，currentCount/targetCount 用进度条可视化，蓝色表示还差不少、橙色表示快满了、绿色表示已满员。这个进度条是我自己想的。

**跑腿为什么需要 pickupLocation、deliveryLocation 和 reward？**

跑腿就是"从哪送到哪、给多少钱"。我把取件点和送达点做成了一条路线（🔵起点 → 🟢终点），酬劳用红色价格标签标出来，这样接任务的人一眼就能判断值不值得跑一趟。

## 4. AI 设计

AI 帮我生成了 db.json 的初始结构、axios 封装代码和页面的基础框架。

但 AI 生成的内容有几个问题：
- 它加了很多不需要的表（用户表、订单表、评论表），Day3 根本用不到；
- id 用了 UUID 那种长字符串，json-server 用数字 id 更方便；
- 每条数据都有 createdAt、updatedAt、isDeleted 这种字段，太复杂了；
- 示例数据写得很假（全是"这是一个XX商品"这种套话）；
- 拼单页面的进度条是我自己加的，AI 只是把两个数字平铺在上面。

## 5. 最终调整

我对 AI 生成的代码做了这些改动：

- 删掉了用户表、订单表那些 Day3 用不上的东西；
- 把 id 全改成了数字；
- 删掉了 createdAt、updatedAt、isDeleted 这些多余的字段；
- 数据内容全部重写，换成了贴近校园生活的描述（比如"大一下学期购买，笔记工整，课后习题用铅笔可擦"）；
- 统一了 status 字段：二手商品用 selling/sold/reserved，失物招领用 open/closed，拼单用 recruiting/full/ended，跑腿用 open/accepted/done；
- GroupBuyView 加了拼单进度条（自己想的特色功能）；
- ErrandView 加了路线可视化展示（自己想的特色功能）；
- 四个页面都加了分类筛选标签和 loading/空数据状态处理。

## 6. 遇到的问题与解决方法

**问题 1：json-server 启动报错**

我照着教程写了 `json-server --watch db.json`，结果报错说没有 --watch 这个参数。后来才发现装的是 v1 版本，新版本直接用 `json-server db.json` 就行，不用加 --watch。改完 package.json 里的 mock 脚本就好了。

**问题 2：页面打开没有数据**

TradeView 改完之后刷新页面，列表是空的。打开 F12 看了一下 Network，发现请求是成功了的，数据也返回了。检查代码才发现我忘了在 onMounted 里调用 getTrades()。加上之后数据就出来了。这个问题让我意识到数据请求要自己手动触发，不能等它自动执行。

**问题 3：DetailView 找不到商品**

点商品卡片跳详情页，一直显示不存在。打印了一下才发现 route.params.id 是字符串 `"1"`，但我在 json-server v1 里 id 也是存的字符串，理论上能匹配。最后发现是 db.json 里有些 id 是数字、有些是字符串，混了。统一改成字符串之后就好了。

## 7. 今日反思

今天最大的收获是理解了"数据驱动页面"是什么意思。以前觉得前端就是写 HTML 和 CSS，把内容堆上去就行。但今天做完之后明白了——真正的前端页面，内容是活的，是从接口请求数据然后渲染出来的，不是写死在 HTML 里的。

Mock 数据也不是随便乱编几条就行。你得想清楚每条数据有哪些字段、这些字段在页面上怎么展示、用户最关心什么。如果数据结构一开始没想清楚，后面改起来会非常麻烦。

还有一个感受是，AI 虽然能快速生成代码，但很多东西还是得靠自己判断。AI 会把各种复杂的东西一股脑全塞进来，需要自己去删、去改、去想哪些才是真正需要的。
