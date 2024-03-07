

动态CMS
页面布局
数据库表
数据库表结构
都是由前端来控制的

## 预置2张表

```sql
CREATE TABLE `entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT, -- 实体表的ID
  `title` varchar(255) DEFAULT '',  -- 实体的中文名称
  `name` varchar(255) DEFAULT '',   -- 实体英文名，以后也会对应的路由的名称，表的名称
  `fields` text DEFAULT NULL,       -- 此实体包含哪些字段，以及字段什么类型
  `page` text DEFAULT NULL,         -- 页面级操作 新增 刷新 搜索
  `record` text DEFAULT NULL,       -- 记录级的操作 删除 更新
  `created` datetime DEFAULT NULL,  -- 创建时间
  `updated` datetime DEFAULT NULL,  -- 更新时间
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT, -- 菜单的ID
  `name` varchar(255) DEFAULT '',       -- 菜单名称
  `path` varchar(255) DEFAULT '',       -- 菜单的路径
  `created` datetime DEFAULT NULL,      -- 创建时间
  `updated` datetime DEFAULT NULL,      -- 更新时间
  PRIMARY KEY (`id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```


肉包子
要是我update的时候 传了一个没有的字段 会报错吗 

当你添加一个实体后
1.添加一个路由配置

app\router.js
```js
router.resources('book', '/book', controller.book);
```

添加一个控制器
app\controller\book.js

添加一个服务
app\service\book.js

向menu表中添加一个/book菜单 

动态创建book表

body.field 是引用类型么?   field = body.field  赋值之后在改变 body.field , field不会跟着改变么? 

let body = {
  fields:[1,2]
}
let fields = body.fields;
body.fields='1,2'

information_schema 是哪里的呢 
