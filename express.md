[一、Express的基本介绍](#一Express的基本介绍)
- [1.1 基本介绍](#11-基本介绍)
- [1.2 基本服务搭建](#12-基本服务搭建)
- [1.3 中间件app.use](#13-中间件app.use)
- [1.4 express的分类](#14-express的分类)

[二、Application](#二、Application)
- [2.1 概念](#21-概念)
- [2.2 app.METHOD()](#22-app.METHOD())
- [2.3 应用路由挂载](#23-应用路由挂载)

[三、multer中间件](#三multer中间件)
- [3.1 概念](#31-概念)
- [3.2 使用之文件存储](#32-使用之文件存储)
- [3.3 使用之API](#33-使用之API)
- [3.4 使用之参数](#34-使用之参数)


# 一、Express的基本介绍
## 1.1-基本介绍
  >Express.js或简称Express，是针对Node.js的web应用框架,主要是帮助我们简化各种web服务的实现方式

  npm install express --save
  ```js
  // express返回的是一个函数, 我们需要通过执行这个函数来得到一个express实例
  const express= require("express");
  console.log(express);
  [Function: createApplication] {
    application: {
      init: [Function: init],
      defaultConfiguration: [Function: defaultConfiguration],
      lazyrouter: [Function: lazyrouter],
      handle: [Function: handle],
      use: [Function: use],
      route: [Function: route],
      engine: [Function: engine],
      param: [Function: param],
      set: [Function: set],
      path: [Function: path],
      enabled: [Function: enabled],
      disabled: [Function: disabled],
      enable: [Function: enable],
      disable: [Function: disable],
      acl: [Function (anonymous)],
      bind: [Function (anonymous)],
      checkout: [Function (anonymous)],
      connect: [Function (anonymous)],
      copy: [Function (anonymous)],
      delete: [Function (anonymous)],
      get: [Function (anonymous)],
      head: [Function (anonymous)],
      link: [Function (anonymous)],
      lock: [Function (anonymous)],
      'm-search': [Function (anonymous)],
      merge: [Function (anonymous)],
      mkactivity: [Function (anonymous)],
      mkcalendar: [Function (anonymous)],
      mkcol: [Function (anonymous)],
      move: [Function (anonymous)],
      notify: [Function (anonymous)],
      options: [Function (anonymous)],
      patch: [Function (anonymous)],
      post: [Function (anonymous)],
      propfind: [Function (anonymous)],
      proppatch: [Function (anonymous)],
      purge: [Function (anonymous)],
      put: [Function (anonymous)],
      rebind: [Function (anonymous)],
      report: [Function (anonymous)],
      search: [Function (anonymous)],
      source: [Function (anonymous)],
      subscribe: [Function (anonymous)],
      trace: [Function (anonymous)],
      unbind: [Function (anonymous)],
      unlink: [Function (anonymous)],
      unlock: [Function (anonymous)],
      unsubscribe: [Function (anonymous)],
      all: [Function: all],
      del: [Function (anonymous)],
      render: [Function: render],
      listen: [Function: listen]
    },
    request: IncomingMessage {
      header: [Function: header],
      get: [Function: header],
      accepts: [Function (anonymous)],
      acceptsEncodings: [Function (anonymous)],
      acceptsEncoding: [Function (anonymous)],
      acceptsCharsets: [Function (anonymous)],
      acceptsCharset: [Function (anonymous)],
      acceptsLanguages: [Function (anonymous)],
      acceptsLanguage: [Function (anonymous)],
      range: [Function: range],
      param: [Function: param],
      is: [Function: is],
      protocol: [Getter],
      secure: [Getter],
      ip: [Getter],
      ips: [Getter],
      subdomains: [Getter],
      path: [Getter],
      hostname: [Getter],
      host: [Getter],
      fresh: [Getter],
      stale: [Getter],
      xhr: [Getter]
    },
    response: ServerResponse {
      status: [Function: status],
      links: [Function (anonymous)],
      send: [Function: send],
      json: [Function: json],
      jsonp: [Function: jsonp],
      sendStatus: [Function: sendStatus],
      sendFile: [Function: sendFile],
      sendfile: [Function (anonymous)],
      download: [Function: download],
      type: [Function: contentType],
      contentType: [Function: contentType],
      format: [Function (anonymous)],
      attachment: [Function: attachment],
      append: [Function: append],
      header: [Function: header],
      set: [Function: header],
      get: [Function (anonymous)],
      clearCookie: [Function: clearCookie],
      cookie: [Function (anonymous)],
      location: [Function: location],
      redirect: [Function: redirect],
      vary: [Function (anonymous)],
      render: [Function: render]
    },
    Route: [Function: Route],
    Router: [Function (anonymous)] {
      param: [Function: param],
      handle: [Function: handle],
      process_params: [Function: process_params],
      use: [Function: use],
      route: [Function: route],
      acl: [Function (anonymous)],
      bind: [Function (anonymous)],
      checkout: [Function (anonymous)],
      connect: [Function (anonymous)],
      copy: [Function (anonymous)],
      delete: [Function (anonymous)],
      get: [Function (anonymous)],
      head: [Function (anonymous)],
      link: [Function (anonymous)],
      lock: [Function (anonymous)],
      'm-search': [Function (anonymous)],
      merge: [Function (anonymous)],
      mkactivity: [Function (anonymous)],
      mkcalendar: [Function (anonymous)],
      mkcol: [Function (anonymous)],
      move: [Function (anonymous)],
      notify: [Function (anonymous)],
      options: [Function (anonymous)],
      patch: [Function (anonymous)],
      post: [Function (anonymous)],
      propfind: [Function (anonymous)],
      proppatch: [Function (anonymous)],
      purge: [Function (anonymous)],
      put: [Function (anonymous)],
      rebind: [Function (anonymous)],
      report: [Function (anonymous)],
      search: [Function (anonymous)],
      source: [Function (anonymous)],
      subscribe: [Function (anonymous)],
      trace: [Function (anonymous)],
      unbind: [Function (anonymous)],
      unlink: [Function (anonymous)],
      unlock: [Function (anonymous)],
      unsubscribe: [Function (anonymous)],
      all: [Function (anonymous)]
    },
    json: [Function: json],
    query: [Function: query],
    raw: [Function: raw],
    static: [Function: serveStatic] {
      mime: Mime {
        types: [Object: null prototype],
        extensions: [Object: null prototype],
        default_type: 'application/octet-stream',
        Mime: [Function: Mime],
        charsets: [Object]
      }
    },
    text: [Function: text],
    urlencoded: [Function: urlencoded]
  }
  ```
## 1.2-基本服务搭建
  >用原生思路实现的服务器效果手动配置路由:
  ```js
  const express=require("express");
  const fs=require('fs');
  const path=require('path');
  let app = express();//执行express 创建一个express应用
  app.listen(8080);//默认域名为localhost，
  app.get("/", (req, res)=>{
    fs.readFile(`${__dirname}/index.html`, "utf8", function(){
      if(err) throw err;
      res.send(data);//发送灵气
    })
    /*
      或者是 res.sendFile(`${__dirname}/index.html`); //直接发送文件
    */
  })
  ```
  >采用express思路实现的服务器效果全自动配置的静态资源服务器
  ```js
  const express=require("express");
  const fs=require('fs');
  const path=require('path');
  let app = express();//执行express 创建一个express应用
  app.use(express.static(`${__dirname}/src`));
  app.listen(8080);
  ```
## 1.3-中间件app.use
  >中间件的工作就是在特定的工作在执行之前, 提前先做一些基本处理

  * 比如在发送数据前做一些基本配置

  * 比如在处理数据前做一些格式化数据的工作等等

## 1.4-express的分类
  >总体而言,express的大类由这些部分组成的, 每个类别的方法众多,咱们后面会按照业务功能的分类来进行梳理对应的模块

  * express()
    * express.json()
    * express.static()
    * express.Router()
    * express.irlencoded()
  * Application
    * Properites类
    * Events类
    * Methods类
  * Request
    * Properites类
    * Methods类
  * Response
    * Properites类
    * Methods类
  * Router
    * Methods类
  

# 二、Application
## 2.1-概念
  >application就是通过调用Express模块导出的顶层的express()方法来创建的一个值,该值一般用变量app表示
  >app是express功能的主要入口
  >路由表示应用程序端点 (URI) 的定义以及端点响应客户机请求的方式。 
  ```js
  var express = require('express');
  var app = express();
  app.get('/', function(req, res){
    res.send('hello world!');
  });
  app.listen(3000);
  ```

## 2.2-app.METHOD()
  app.METHOD(path, callback [, callback ...])
  >我们使用app.get/post/put/等等（对应同名的http方法）方式，可以为服务器收到 的各种请求pugmi同业务处理
  多个callbakc时，需要调用next()
  ```js
  var express = require('express');
  var app = express();
  app.get('/', function(req, res, next){
    console.log('hello world!');
    next();
  }, function(req, res){
    res.send('hello world!');
  });
  app.listen(3000);
  ```
  >单路径可以配置多个路由，多个路由会按照顺序执行。但是前一个路由必须加next()。必须是最后一个路由加send()。
  ```js
  var express = require('express');
  var app = express();
  let a = "";
  app.get('/', function(req, res, next){
    a += 'hello ';
    next();
  });

  app.get('/', function(req, res){
    a += 'world!';
    res.send(a);
  });
  app.listen(3000);
  ```
## 2.3-应用路由挂载
  >express可以新建多个实例, 每个实例都可以有自己完整的路由规则, 然后用过app.use的方式进行挂载

  >如下代码所示:
  * 1: 此时我们访问localhost:8080/admin和localhost:8080/manager都会返回login主页

  * 2: 此时我们访问localhost:8080/admin/login和localhost:8080/manager/login都会返回login主页
  ```js
  var express = require("express");
  let app = express();
  app.listen(8000);
  let admin = express();
  admin.get("/", function(req, res){
    console.log(admin.mountpath);
    res.send("admin主页");
  });
  let login = express();
  login.get("/", function(req, res){
    console.log(login.mountpath);
    res.send("login主页面");
  })
  admin.use("/log*n", login);
  app.use(["/admin", "/manager"], admin);
  ```
* mount监听挂载事件
  app.on('mount', callback(parent))
  当子程序被挂载到父程序时，mount事件被发射。父程序对象作为参数，传递给回调方法。
  这个触发的时间就是app.use调用了这个子应用的时间。
  ```js
  var express = require("express");
  let app = express();
  app.listen(8000);
  let admin = express();
  admin.on("mount", function(parent){
    console.log('Admin Mounted');
    res.send(parent);
  });
  admin.get("/", function(req, res){
    console.log(login.mountpath);
    res.send("login主页面");
  })
  console.log("这个会先执行");
  admin.use("/admin", admin);
  ```
# 三、multer中间件
## 3.1-概念
  >当客户端想要提交表单数据或是直接上传文件时, 就会采用post的请求方式,但是post提交的数据类型多, 格式复杂,因此我们就要引入几个中间件来辅助我们解析数据 
  >Multer 会添加一个 body 对象 以及 file 或 files 对象 到 express 的 request 对象中。 body 对象包含表单的文本域信息，file 或 files 对象包含对象表单上传的文件信息。
* upload.single()
  >服务器
  ```js
  var express = require("express");
  var multer = require('multer');
  var path = require('path');
  var app = express();
  // 设置上传目录
  var upload = multer({dest: path.join(__dirname, 'upload')});
  // 监听请求的业务， 其中upload.single中的参数与表单元素中的input type=file的name属性一致
  app.post('/singleUpload', upload.single('avatar'), function(res, next){
    console.log(req.file);
    console.log(req.body);
    res.end("上传成功");
  })
  app.listen(8080);
  ```
  >页面
  ```html
  <form action="http://localhost:8080/singleUpload" method="post" enctype="multipart/form-data">
    <input type="text" name="username">
    <input type="text" name="pwd">
    <input type="file" name='avatar' multiple="true">
    <input type="submit" value="submit">
  </form>
  ```
* upload.array()
  >多文件上传1-单个多文件上传：
  ```html
  <input type="file" name='avatar' multiple="true">
  ```
  ```js
  upload.array('avatar', 2)
  console.log(req.files);
  ```
* upload.fields() 
  >多文件上传2-多个多文件上传：
   ```html
  <input type="file" name='avatar1' multiple="true">
  <input type="file" name='avatar2' multiple="true">
  ```
  ```js
  upload.fields([{name: "avatar1", maxCount: 12}, {name: "avatar2", maxCount: 8}])
  console.log(req.files);
  ```
* upload.none() 
  >只有文本域的表单时，请求参数
  console.log(req.body);
  
## 3.2-使用之文件存储
* 概念
  >磁盘存储引擎可以让你控制文件的存储。
  >有两个选项可用，destination 和 filename。他们都是用来确定文件存储位置的函数。
  * destination 是用来确定上传的文件应该存储在哪个文件夹中。也可以提供一个 string (例如 '/tmp/uploads')。如果没有设置 destination，则使用操作系统默认的临时文件夹。
    >注意: 如果你提供的 destination 是一个函数，你需要负责创建文件夹。当提供一个字符串，multer 将确保这个文件夹是你创建的
  * filename 用于确定文件夹中的文件名的确定。 如果没有设置 filename，每个文件将设置为一个随机文件名，并且是没有扩展名的。
    >注意: Multer 不会为你添加任何扩展名，你的程序应该返回一个完整的文件名。
  ```js
  var storage = multer.diskStorage({
    destination: function(req,file, cb){
      switch(file.mimetype){
        case "image/jpeg":
          cb(null, path.join(__dirname, 'upload/images'));
          break;
        default:
          cb(null, path.join(__dirname, 'upload'));
          break;
      }
    },
    filename: function(req, file, cb){

    }
  })
  var uploads = multer({storage: storage});
  var cpUpload = uploads.fields([{name: 'avatar1' maxCount: 12}, {name: 'avatar2', maxCount: 8}]);
  app.post('/singleUpload', cpUpload, function(req, res, next){
    console.log(req.files);
    console.log(req.body);
    res.end("上传成功");
  });
  ```

## 3.3-使用之API
## 3.4-使用之参数