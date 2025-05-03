# 仿Mac简约风设计师艺术作品集网站开发说明文档
本作品集网站，其创意源自苹果电脑的经典桌面风格。整体设计遵循简约直接的原则，旨在让用户能够以最直观、高效的方式浏览作品。整个网站将完全采用纯 HTML、CSS 和 JavaScript 进行编写，在保证代码简洁、纯净的同时，确保作品展示的流畅性与专业性。通过这种技术实现方式，既能精准还原苹果电脑桌面那种简洁而不失优雅的视觉效果，又能为用户带来流畅、舒适的浏览体验，让作品成为网站的核心焦点，展现出独特的魅力。




# Index.Html
此主页面是网站的核心枢纽，集各类信息展示与子级页面导航功能于一体。用户在此既能便捷查看所需信息，又能依据指引轻松跳转至各子级页面。

**网站Logo**

 > 点击logo即可刷新页面

**网站菜单栏**
 > 跳转二级页面，访问工作室项目/工作室介绍/合作联系

 **网站桌面**
 > 放置各种文件夹，用来存放零散且较新的设计作品
 
**网站底部Dock**
 > 放置常规流行平台图标，用来跳转设计师其他平台的主页


## 桌面

 1.  Dock图标支持用户拖拽排序
 2. 桌面图标打开时，会出现在Dock，关闭时会从Dock移除
 3. 点击桌面图标，以文件管理器方式打开内容
 4. 用户在0.5秒内改变浏览器窗口位置/大小，就会触发桌面图标掉落，点击菜单栏Logo恢复

## 项目页面

使用懒加载方式加载作品图片，图片以瀑布流呈现

## 工作室页面

You can rename the current file by clicking the file name in the navigation bar or by clicking the **Rename** button in the file explorer.

## 联系合作页面

You can delete the current file by clicking the **Remove** button in the file explorer. The file will be moved into the **Trash** folder and automatically deleted after 7 days of inactivity.

