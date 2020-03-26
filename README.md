[toc]

# mpvue开发微信小程序

> 结合mpvue和其他插件、解决方案，做到更近似vue的开发体验来开发小程序

## Build Setup

``` bash
# 安装依赖
npm i

# 开发时构建，构建成功后用微信开发工具打开即可看到视图
npm run dev

# 打包构建
npm run build

# 生成 bundle 分析报告
npm run build --report
```

## 开发指南
**以下举例皆可在pages/guide/main页中找到**

### 目录结构
![项目结构](https://s1.ax1x.com/2020/03/25/8vVdPJ.png)
### 过滤器
**mpvue中不支持filter，且模板中不能直接调用方法过滤**

解决：
在src/filters/filters.js中添加过滤方法，将方法同步到src/filters/filters.wxs中

```
    // html
    
    // 引入过滤对象
    <wxs module="filter" src="../../filters/filters.wxs"></wxs>
    // 模拟过滤效果
    <div>{{ filter.phoneMask('15606902472') }} 模拟过滤器效果 添加掩码</div>

```



### 路由
**mpvue中不支持vue-router**

解决：
使用 [**mpvue-router-patch**](https://www.npmjs.com/package/mpvue-router-patch) 包，它可以在 mpvue 中使用 vue-router 兼容的路由写法

```
# 安装依赖
npm i mpvue-router-patch --save
```

```
    # 基本使用
    
    ## 非底部导航页的跳转
    this.$router.push('/pages/test/main')
    this.$router.push({ path: '/pages/test/main', query: { id: 1 } })
    
    ## 底部导航页面的跳转
    this.$router.push({path: '/pages/logs/main', isTab: true})
```



### UI库使用 [vant-weapp](https://youzan.github.io/vant-weapp/#/intro) 

```
# 页面引用组件

# main.json
{
  "usingComponents": {
    "van-button": "/vant-weapp/dist/button/index"
  }
}

# index.vue
<van-button type="primary" @click="bindViewTap('push')">非底部导航页的跳转$router.push</van-button>
```

### 本地缓存操作
已对微信小程序本地缓存操作进行封装，简化操作
```
// 设置
global.Storage.set('test', '123')
// 设置，并1小时后失效
global.Storage.set('test', '123', 3600)
// 获取
global.Storage.get('test')
// 删除key
global.Storage.remove('aa')
// 清空所有
global.Storage.clear()
```


### 注意事项
1. 新增页面时需重新npm run dev，否则无法读取到新增页面
2. 子组件可以使用父组件已引入的组件，所以组件一般在父组件引用即可，无需在子组件重复引用
3. 静态文件存放在/static
