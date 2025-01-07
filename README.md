# 欢迎来到我的个人主页
这里放了我的一些学习笔记和一些有趣的东西
你也可以Clone我的项目来修改并创造自己的个人主页!
以下是克隆改造教程
## 克隆改造教程
1. 先Fork我的项目
2. 在你的Fork项目中点击右上角的`Settings`按钮
3. 在`Options`中找到`Pages`，然后点击`Source`下拉框，选择`gh-pages`分支
4. 点击`Save`按钮
5. 打开项目文件 使用npm下载所有的扩展
## 附加内容:Docusaurus官网中的教学链接

[Docusaurus](https://docusaurus.io/)

## 以下为Docusaurus项目模板ReadMe
## Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
