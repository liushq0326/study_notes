[一、Express的基本介绍](#一Express的基本介绍)
- [1.1 基本介绍](#11-基本介绍)
- [1.2 基本服务搭建](#12-基本服务搭建)
- [1.3 中间件app.use](#13-中间件app.use)
- [1.4 express的分类](#14-express的分类)

[二、Application](#二、Application)
- [2.1 概念](#21-概念)
- [2.2 app.METHOD()](#22-app.METHOD())
- [2.3 应用路由挂载](#23-应用路由挂载)
- [2.4 app.route(path)](#24-app.route(path))
- [2.5 application之配置响应头](#25-application之配置响应头)
- [2.6 application之app.use()](#26-application之app.use())

[三、multer中间件](#三multer中间件)
- [3.1 概念](#31-概念)
- [3.2 使用之文件存储](#32-使用之文件存储)
- [3.3 使用之API](#33-使用之API)
- [3.4 使用之参数](#34-使用之参数)

[四、request对象](#四request对象)
- [4.1 概念](#41-概念)
- [4.2 req.body](#42-req.body)
- [4.3 req.cookie](#43-req.cookie)
- [4.4 req.params](#44-req.params)
- [4.5 req其他属性](#45-req其他属性)
- [4.6 req-accepts(types)](#46-req-accepts(types))

[五、Response对象](#四Response对象)
- [5.1 概念](#51-概念)
- [5.2 req.body](#52-req.body)
- [5.3 req.cookie](#53-req.cookie)
- [5.4 req.params](#54-req.params)
- [5.5 req其他属性](#55-req其他属性)
- [5.6 req-accepts(types)](#46-req-accepts(types))

[六、ejs模板引擎](#四ejs模板引擎)
- [6.1 概念](#61-概念)
- [6.2 res.render()](#62-res.render())
- [6.3 模板引擎的控制流程](#64-模板引擎的控制流程)
- [6.4 include导入模块](#46-include导入模块)

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
    fs.readFile(`${__dirname}/index.html`, "utf8", function(err){
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
  >路由表示应用程序端点 (URI) 的定义以及端口响应客户机请求的方式。 
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
  * 1: 此时我们访问localhost:8080/admin和localhost:8080/manager都会返回admin主页

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
  * 当子程序被挂载到父程序时，mount事件被发射。父程序对象作为参数，传递给回调方法。
  * 这个触发的时间就是app.use调用了这个子应用的时间。
  ```js
  var express = require("express");
  let app = express();
  app.listen(8000);

  let admin = express();
  admin.on("mount", function(parent){
    console.log('Admin Mounted');
    console.log(parent);
  });
  admin.get("/", function(req, res){
    res.send("login主页面");
  })
  console.log("这个会先执行");
  app.use("/admin", admin);
  ```
## 2.4-app.route(path)
* 返回一个单例模式的路由的实例，之后你可以在其上施加各种HTTP动作的中间件。该方法可以用来避免同一个路径多个路由实例。
* app.all方法和标准的app.METHOD()方法相似，除了它匹配所有的HTTP动词。比如给所有的请求加一个处理或是只要是该路径,就返回一个统一的存在

  ```js
  const express=require("express");
  var app = express();
  app.route("/events");
  .all(function(req, res, next){
    // 所有/events url都经过此处
    next();
  }).get(function(req, res, next){
    res.send("2");
  }).post(function(req, res, next){
    res.send("3");
  })
  app.listen(8080);
  ```
## 2.5-application之配置响应头
  * 方法一
    ```js
    res.set(name,value)
    ```
  * 方法二
    ```js
    res.set(
      {
        name:value
      }
    )
    ```
## 2.6-application之app.use()
  * 前面我们讲到了很多app.use的技术点, 现在我们深入的再来学习学习
  一个路由将匹配任何路径如果这个路径以这个路由设置路径后紧跟着"/"。比如：app.use('/appale', ...)将匹配"/apple"，"/apple/images"，"/apple/images/news"等。
  * 其中请求数据里面有三个关于路由数据的属性
  ```js
  .app.use('/admin', function(req, res, next){
    // GET 'http://www.example.com/admin/new'
    console.log(req.originalUrl); // '/admin/new'
    console.log(req.baseUrl); // '/admin'
    console.log(req.path); // '/new'
  });
  ```
  * 由于默认的路径为/，中间件挂载没有指定路径，那么对于每个请求，这个中间件都会被执行。
  ```js
  app.use(function (req, res, next) { next(); })

  ```
  * 路径可以是代表路径的一串字符，一个路径模式，一个匹配路径的正则表达式，或者他们的一组集合。
  ```js
  | Type               | Example    |
  | --------          | -----:  |
  | Path              | app.use('/abcd', function (req, res, next) { next(); }) |
  | Path Pattern      | app.use('/ab\*cd', function (req, res, next) { next(); }) |
  | Regular Expression| app.use(/\/abc|\/xyz/, function (req, res, next) { next(); }) |
  | Array             | app.use(['/abcd', '/xyza', /\/lmn|\/pqr/], function (req, res, next) { next(); })  |
  ```
* 单个中间件
  ```js
  你可以局部定义和挂载一个中间件。
  app.use(function (req, res, next) { next(); })
  一个router是有效的中间件。
  var router = express.Router(); 
  router.get('/', function (req, res, next) { next(); }) 
  app.use(router); 
  一个Express程序是一个有效的中间件。
  var subApp = express(); 
  subApp.get('/', function (req, res, next) { next(); }) 
  app.use(subApp); 
  ```
* 一系列中间件
  ```js
  对于一个相同的挂载路径，你可以挂载超过一个的中间件。
  var r1 = express.Router(); 
  r1.get('/', function (req, res, next) { next(); }) 
  var r2 = express.Router(); 
  r2.get('/', function (req, res, next) { next(); }) 
  app.use(r1, r2);
  ```
* 一组中间件
  ```js
  const express=require("express");
  var app = express();
  let admin=express.Router();
  admin.get("/admin", function(req, res, next){
    res.send("hello admin");
    next();
  });
  let login=express.Router();
  admin.get("/login", function(req, res, next){
    res.send("hello login");
    next();
  });
  app.use("/user", [admin,login]);
  app.listen(8080);
  ```
* 混合中间件
  ```js
  const express=require("express");
  var app = express();
  function mw1(req, res, next){
    console.log("hello mw1");
    next();
  }
  function mw2(req, res, next){
    console.log("hello mw2");
    next();
  }
  let r1=express.Router();
  r1.get("/", function(req, res, next){
    console.log("hello r1");
    next();
  });
  let r2=express.Router();
  r2.get("/", function(req, res, next){
    console.log("hello r2");
    next();
  });
  let subApp = express();
  subApp.get("/", function(req, res, next){
    res.send("hello subApp");
    next();
  });
  app.use("/admin", mw1, [r1, mw2, r2], subApp);
  app.listen(8080);
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
  app.post('/singleUpload', upload.single('avatar'), function(req, res, next){
    console.log(req.file);
    console.log(req.body);
    res.end("上传成功");
  })
  app.listen(8080);
  ```
  >页面
  ```html
  <form action="http://localhost:80/singleUpload" method="post" enctype="multipart/form-data">
    <input type="text" name="username">
    <input type="text" name="pwd">
    <input type="file" name='avatar'>
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
  ```js
  upload = multer();
  console.log(req.body);
  ```
  
## 3.2-使用之文件存储
* 概念
  >磁盘存储引擎可以让你控制文件的存储。
  >有两个选项可用，destination 和 filename。他们都是用来确定文件存储位置的函数。
  * destination 是用来确定上传的文件应该存储在哪个文件夹中。也可以提供一个 string (例如 '/tmp/uploads')。如果没有设置 destination，则使用操作系统默认的临时文件夹。
    >注意: 如果你提供的 destination 是一个函数，你需要负责创建文件夹。当提供一个字符串，multer 将确保这个文件夹是你创建的
  * filename 用于确定文件夹中的文件名的确定。 如果没有设置 filename，每个文件将设置为一个随机文件名，并且是没有扩展名的。
    >注意: Multer 不会为你添加任何扩展名，你的程序应该返回一个完整的文件名。
  ```js
  var express = require("express");
  var multer = require('multer');
  var path = require('path');
  var app = express();
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
      cb(null, file.originalname);
    }
  })
  var uploads = multer({storage: storage});
  var cpUpload = uploads.fields([{name: 'avatar1', maxCount: 12}, {name: 'avatar2', maxCount: 8}]);
  app.post('/singleUpload', cpUpload, function(req, res, next){
    
    console.log(multer);
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    res.end("上传成功");
  });
  app.listen(8082)
  ```

## 3.3-使用之API
  ```js
  { 
    fieldname: 'avatar2',
    originalname: '1579144579152.xls',
    encoding: '7bit',
    mimetype: 'application/vnd.ms-excel',
    destination:
    'C:\\Users\\Administrator\\Desktop\\note\\ppt\\node\\node\\upload',
    filename: '1579144579152.xls',
    path:
    'C:\\Users\\Administrator\\Desktop\\note\\ppt\\node\\node\\upload\\1579144579152.xls',
    size: 4608 
  }
  ```
  | 键               | 描述    |
  | --------         | -----:  |
  | fieldname        | 表单中指定的字段名称     |
  | originalname     | 用户计算机上文件的名称     |
  | encoding         | 文件的编码类型      |
  | mimetype         | 文件的文件类型      |
  | size             | 文件大小（以字节为单位）     |
  | destination      | 文件已保存到的文件夹      |
  | filename         | 文件中的文件名 destination      |
  | path             | 上载文件的完整路径      |
## 3.4-使用之参数

  | 键               | 描述    |
  | --------         | -----:  |
  | dest要么storage        | 表单中指定的字段名称     |
  | fileFilter     | 用户计算机上文件的名称     |
  | limits         | 文件的编码类型      |
  | preservePath         | 文件的文件类型      |

  var upload = multer({dest: path.join(__dirname,'upload/')});

  * Multer接受一个options对象，其中最基本的是dest 属性，它告诉Multer在哪里上传文件。如果省略options对象，文件将保留在内存中，并且永远不会写入磁盘。
  * 默认情况下，Multer将重命名文件，以避免命名冲突。重命名功能可以根据您的需求进行定制。

  fileFilter
  * 将此功能设置为控制应上载哪些文件和应跳过哪些文件的功能。
  ```js
  var uploads = multer(storage: storage, 
    function name(req, file, cb){
      switch(file.mimetype){
        case "text/html":
          cb(null, false)
          break;
        default:
          cb(null, true)
          break;
      }
    }
  );

  function fileFilter(req, file, cb){
    // 是否接收这个问题
    cb(null, false)  // 拒绝
    cb(null, true)  // 接受
    // 如果有问题，你可以总是这样发送一个错误
    cb(new Error('I don\'t have a clue!'));
  }
  ```
* limits一个对象，指定以下可选属性的大小限制

  | 键               | 描述    |
  | --------         | -----:  |
  | fieldNameSize        | 最大字段名称大小    | 100字节 |
  | fieldSize     | 最大字段值大小             |1M |
  | fields         | 非文件字段的最大数量       |无限 |
  | fileSize         | 对于多部分表单，最大文件大小（以字节为单位）|无限 |
  | files        | 对于多部分表单，最大文件字段数    |无限 |
  | parts     | 对于多部分表单，最大部分数（字段+文件）  |无限 |
  | headerPairs| 对于多部分形式，要解析的标头键=>值对的最大数量 |2000 |

* 返回一个单例模式的路由的实例，之后你可以在其上施加各种HTTP动作的中间件。该方法可以用来避免同一个路径多个路由实例。

# 四、request对象
## 4.1-概念
* req对象代表了一个HTTP请求，其具有一些属性来保存请求中的一些数据，比如query string，parameters，body，HTTP headers等等。按照惯例，这个对象总是简称为req(http响应简称为res)，但是它们实际的名字由这个回调方法在那里使用时的参数决定。

* req.baseUrl
一个路由实例挂载的Url路径

* 当一个请求路径是/greet/jp，baseUrl是/greet，当一个请求路径是/hello/jp，req.baseUrl是/hello。

```js
const  express = require("express");
var app = express();
var greet = express.Router();
greet.get('/jp', function(req, res){
  console.log(req.baseUrl);
  res.send("Konichiwa!");
});
app.use('/greet', greet);
app.listen(8080);
```
## 4.2-req.body
  * 在请求的body中保存的是提交的一对对键值数据。默认情况下，它是undefined，当你使用比如body-parser和multer这类解析body数据的中间件时，它是填充的。
  
  ```js
  var multer = require("multer");
  var path = require("path");
  var bodyParser = require("body-parser");
  var app = express();
  // 设置上传配置信息
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({extended:true}));// for parsing
  ```
  * 建议所有的项目，都使用这个中间件，这样可以保证我们获得数据格式统一且清晰。
## 4.3-req.cookie
  * 当使用cookie-parser中间件的时候，这个属性是一个对象，其包含了请求发送过来的cookies。如果请求没有带cookies，那么其值为{}
  ```js
  var express = require('express')
  var cookieParser = require('cookie-parser')
  var app = express()
  app.use(cookieParser());//使用方式与bodyparse类似
  ```
## 4.4-req.params
  * 采用的以模板+数据然后返回特殊的值的方式来生成无数个子页面
  >链接末尾单变量
  ```js
  var express = require('express')
  var fs = require('fs')
  var app = express()
  app.get("/user/:id", function(re, res){
    res.send(req.params); // {id: ""}
  })
  app.listen(8080);
  ```
  >链接中间单变量
  ```js
  var express = require('express')
  var fs = require('fs')
  var app = express()
  app.get("/user/:id/article", function(re, res){
    res.send(req.params); // {id: ""}
  })
  app.listen(8080);
  ```
  >单链接多变量
  ```js
  var express = require('express')
  var fs = require('fs')
  var app = express()
  app.get("/user/:id/article/:name", function(re, res){
    res.send(req.params); // {id: "", name: ""}
  })
  app.listen(8080);
  ```
  >app.param中间件
  * app.param中间件可以监听某个特定ID被访问的情况,可以优先做好一些预处理或是做一些基本配置数据
  ```js
  var express = require('express')
  var app = express()
  app.param("id", function(req, res, next, id){
    console.log("优先激活");
    console.log("ID为："+id);
    next();
  })
  app.param("name", function(req, res, next, name){
    console.log("其次激活");
    console.log("NAME为："+name);
    next();
  })
  app.get("/user/:id/article/:name", function(req, res){
    console.log("最后激活");
    res.send(req.params); // {id: "", name: ""}
  })
  app.listen(8080);
  ```
## 4.5-req其他属性
  http://example.com/user
  >req.hostname
  * 包含了源自HostHTTP头部的hostname // example.com
  >req.path
  * 包含请求URL的部分路径 // '/user'
  >req.protocol
  * 一般为http，当启用TLS加密，则为https。
  >req.qurey
  * ?后的参数对象
  ```js
  // GET /search?q=tobi+ferret
  req.query.q  // 'tobi ferret'
  // GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
  req.query.order // 'desc'
  req.query.shoe.color // 'blue'
  req.query.shoe.type // 'converse'
  ```
## 4.6-req-accepts(types)
  * 基于请求的Accept HTTP头部，检查指定的内容类型是否被接受 。这个方法返回最佳匹配，如果没有一个匹配，那么其返回undefined(在这个case下，服务器端应该返回406和"Not Acceptable")。
  * 这个可以用来所返回的数据类型的校验
  ```js
  // Accept: text/html
  req.accepts('html'); // => "html"

  // Accept: text/*, application/json
  req.accepts('html') // => "html"
  req.accepts('text/html') // => "text/html"
  req.accepts(['json', 'text']) // => "json"
  req.accepts('application/json') // => "application/json"
  req.accepts('image/png'); // undefined
  req.accepts('png'); // undefined

  // Accept: text/*;q=.5, application/json
  req.accepts(['html', 'json']); // "json"
  ```
  * accepts的衍生方法
  ```js
  req.acceptsCharsets(charset[, ...])
  // 返回指定的字符集集合中第一个的配置的字符集，基于请求的Accept-CharsetHTTP头。如果指定的字符集没有匹配的，那么就返回false。
  req.acceptsEncodings(encoding[, ...])
  // 返回指定的编码集合中第一个的配置的编码，基于请求的Accept-EncodingHTTP头。如果指定的编码集没有匹配的，那么就返回false。
  req.acceptsLanguages(lang [, ...])
  // 返回指定的语言集合中第一个的配置的语言，基于请求的Accept-LanguageHTTP头。如果指定的语言集没有匹配的，那么就返回false。
  ```
  * get(field)获取头部内容
  ```js
  req.get('Content-type');
  // => "text/plain"
  req.get('content-type');
  // => "text/plain"
  req.get('Something');
  // => "undefined"
  ```
# 五、response
>res对象代表了当一个HTTP请求到来时，Express程序返回的HTTP响应。

* res.headersSent
```js
// 布尔类型的属性，指示这个响应是否已经发送HTTP头部。
app.get('/', function(req, res){
  console.log(res.headersSent); // false;
  res.send('OK'); // send之后就发送了头部
  console.log(res.headersSent); // true
})
```
* append(field, value)
>在指定的field的HTTP头部追加特殊的值value。如果这个头部没有被设置，那么将用value新建这个头部。value可以是一个字符串或者数组
```js
const express = require("express");
var app = express();
app.get('/', function(req, res){
  res.append('Lind', ['<http://localhost>', '<http://localhost:3000>']);
  res.append('Set-Cookie', 'foo=bar;Path=/;HttpOnly');
  res.append('Warning', '199 Miscellaneous warning');
  res.append('Warning', '123456789');
  res.send('你好万章');
})
app.listen(8080);
// 注意：
// 1:多次调用append添加同一个样式,效果是多个同名域的值相同
// 2:在res.append()之后调用app.set()函数将重置前面设置的值
```
* attachment([filename])
>设置HTTP响应的Content-Disposition头内容为"attachment"。如果提供了filename，那么将通过res.type()获得扩展名来设置Content-Type，并且设置Content-Disposition内容为"filename="parameter。
```js
res.attachment();
// Content-Disposition: attachment
res.attachment('path/to/logo.png');
// Content-Disposition：attachment; filename="logo.png"
// Content-Type: image/png
```
>在常规的HTTP应答中，Content-Disposition 响应头指示回复的内容该以何种形式展示，是以内联的形式（即网页或者页面的一部分），还是以附件的形式下载并保存到本地。
```js
const express = require(express);
const fs = require("fs");
var app = express();
app.get('/', function(req, res){
  fs.readFile(`$(__dirname)/src/images/1.jpg`, function(err, data){
    res.attachment('1.jpg');
    res.send(data);
  })
})
app.listen(8080);
```
* download(path, [,filename], [,fn])
>传输path指定的文件作为一个附件。
通常，浏览器提示用户下载。默认情况下，Content-Disposition头部"filename="的参数为path(通常会出现在浏览器的对话框中)。通过指定filename参数来覆盖默认值。
>当一个错误发生时或者传输完成，这个方法将调用fn指定的回调方法。
>这个方法使用res.sendFile()来传输文件。
```js
const express = require("express");
const fs = require("fs");
var app = express();
app.get('/', function(){

})
```



# 六、ejs模板引擎
  ## 6.1 概念
  * res对象代表了当一个HTTP请求到来时，Express程序返回的HTTP响应。
  ```js
  res.headerSent()
  // 布尔类型的属性，指示这个响应是否已经发送HTTP头部。
  app.get('/', function(req, res)){
    console.log(res.headersSent); // false
    res.send('OK'); // send之后就发送了头部
    console.log(res.headersSent); // true
  }
  ```
## 6.2 res.append()

  * 在指定的field的HTTP头部追加特殊的值value。如果这个头部没有被设置，那么将用value新建这个头部。value可以是一个字符串或者数组。
  ```js
  const express = require("express");
  var app = express();
  app.get('/', function(req, res){
    res.append('Set-Cookie', 'foo=bar;Path=/;HttpOnly');
    res.append('Lind', ['<http://localhost>','<http://localhost:3000>']);
    res.append('error', 'test');
    res.append('error', 'demo');
    res.send('你好万章');
  })
  ```
  >注意：
  * 1:多次调用append添加同一个样式,效果是多个同名域的值相同
  * 2:在res.append()之后调用app.set()函数将重置前面设置的值

 ## 6.3-res.attachment()

  * 设置HTTP响应的Content-Disposition头内容为"attachment"。如果提供了filename，那么将通过res.type()获得扩展名来设置Content-Type，并且设置Content-Disposition内容为"filename="parameter。
  ```js
  res.attachment(); // Content-Disposition:attachment
  res.attachment('path/to/logo.png');
  // Content-Disposition: attachment; filename="logo.png"
  // Content-Type: image/png
  ```
  ```js
  const express =require("express");
  const fs=require("fs");
  var app = express();
  app.get('/', function(req, res){
    fs.readFile(`${__dirname}/src/images/1.jpg`, function(err,data){
      res.attachment('1.jpg');
      res.send(data);
    })
  })
  app.listen(8080);
  ```
## 6.4-res.download()
  >download(path, [,filename], [,fn])
  * 传输path指定的文件作为一个附件。
  * filename默认值为path。
  * fn回调，当发生错误或传输完成时调用
  * res.sendFile(path)用来传输文件,path与downLoad的第一个参数相同
  ```js
  const express =require("express");
  var app = express();
  app.get('/', function(req, res){
    res.download(`${__dirname}/upload/1579144579152.xls`,'1.xls', function(err){
      if(err){
        throw err
      } else {
        res.sendFile(`${__dirname}/upload/1579144579152.xls`);
      }
    })
  })
  app.listen(8080);
  ```
  * res.sendFile(path [, options] [, fn(err)])

  >传输path指定的文件。根据文件的扩展名设置Content-Type的HTTP头部。除非在options中有关于root的设置，path一定是关于文件的绝对路径
  >option

  | 键            | 描述        |  默认值| 可用版本|
  | --------      | -----:      | -----:      | -----:     |
  | maxAge        | 设置Cache-Control的max-age属性，格式为毫秒数，或者是ms format的一串字符串| 0 ||
  | root          | 相对文件名的根目录 |||
  | lastModified  | 设置Last-Modified头部为此文件在系统中的最后一次修改时间。设置false来禁用它 |Enable|4.9.0+|
  | headers       | 一个对象，包含了文件所在的sever的HTTP头部。(不知道怎么翻译了) |||
  | dotfiles      | 是否支持点开头文件名的选项。可选的值"allow","deny","ignore" |"ignore||
  >fn
  >当传输完成或者发生了什么错误，这个方法调用fn回调方法。如果这个回调参数指定了和一个错误发生，回调方法必须明确地通过结束请求-响应循环或者传递控制到下个路由来处理响应过程。

 ## 4.5-res-cookie()

  * res.cookie(name, value [,options])
  >设置name和value的cookie，value参数可以是一串字符或者是转化为json字符串的对象。
  ```js
  res.cookie('name', 'bobi', {'domain': 'example.com', 'path':'/amdin', 'sesure':true});
  res.cookie('remenberme', '1', {'expires': newDate(Date.now() + 90000), 'httpOnly':true});
  ```
  >options是一个对象，其可以有下列的属性。

  | 属性           | 类型       |  描述|
  | --------      | -----:      | -----:      |
  | domain        | String| 设置cookie的域名。默认是你本app的域名 |
  | expires       | Date |cookie的过期时间，GMT格式。如果没有指定或者设置为0，则产生新的cookie|
  | httpOnly      | Boolean |这个cookie只能被web服务器获取的标示|
  | maxAge        | String|是设置过去时间的方便选项，其为过期时间到当前时间的毫秒值|
  | path          | String |cookie的路径。默认值是/|
  | secure        | Boolean |标示这个cookie只用被HTTPS协议使用|
  | signed        | Boolean |标示这个cookie只用被HTTPS协议使用|

## 4.6-res-format()

  * 根据请求的对象中AcceptHTTP头部指定的接受内容。它使用req.accepts()来选择一个句柄来为请求服务，这些句柄按质量值进行排序。如果这个头部没有指定，那么第一个方法默认被调用。当不匹配时，服务器将返回406"Not Acceptable"，或者调用default回调。
  ```js
  res.format({
    'text/plain':function(){
      res.send('hey');
    },
    'text/html':function(){
      res.send('<p>hey</p>');
    },
    'application/json':function(){
      res.send({message:'hey'});
    },
    'default':function(){
      res.status(406).send('Not Acceptable');
    },
  });
  ```
  * 例子: 当请求的对象中Accept头部设置成"application/json"或者"*/json"(不过如果是*/*，然后这个回复就是"hey")
  
 ## 4.7-res-redirect()
  * res.redirect([status,] path)
  >重定向来源于指定path的URL，以及指定的HTTP status codestatus。如果你没有指定status，status code默认为"302 Found"。
  ```js
  var express = require('express')
  var app = express()
  app.get("/", function(req, res){
    res.send('hello world'); 
  })
  app.get("/admin", function(req, res){
    res.send('hello admin'); 
  })
  app.get("/login", function(req, res){
    res.redirect("302", "/admin"); 
  })
  app.listen(8080);
  ```
  ```js
  // 重定向也可以是完整的URL，来重定到不同的站点。
  res.redirect("http://google.come");
  // 重定向也可以相对于当前的URL。比如，来之于http://example.com/blog/admin/(注意结尾的/)，下面将重定向到http://example.com/blog/admin/post/new
  res.redirect('post/new');
  //如果来至于http://example.com/blog/admin（没有尾部/），重定向post/new，将重定向到http://example.com/blog/post/new。
  res.redirect('post/new');
  //如果来至于http://example.com/blog/admin（没有尾部/），重定向post/new，将重定向到http://example.com/blog/post/new。
  res.redirect('..');
  ```

# 六、ejs模板引擎
## 6.1 概念
  * 一个网站提供的子网页的数量浩如烟海, 如果每次都是直接返回一个html文件的话,那么我们的服务器就得静态存储巨量的文件,这明显是不符合开发需求的, 因此,我们将数据与结构拆分, 通过模板引擎来实现网页的柔性开发

## 6.2 res.render()
  > res.render(view [, locals] [, callback])
  * 渲染一个视图，然后将渲染得到的HTML文档发送给客户端。可选的参数为：
    * view,模板引擎所在的路径(默认是在${_dirname}/views的里面, 然后我们只要写上该目录里面的文件名即可;如果需要自定义,那么就需要提供一个绝对路径
    ```js
    const express = require('express');
    const app = express();
    const ejs = require("ejs");
    app.listen(8080);
    app.set("view engine", "ejs");//加载模板引擎的中间件
    app.get("/", function(req, res){
      res.render(`${__dirname}/ejsViews/home.ejs`, funciton(err, html){
        res.send(html);
      })
    })
    ```
    * locals，定义了视图本地参数属性的一个对象。(这是一个数据对象,里面存储的数据会传输给模板引擎的数据)
    * 记住,这个数据对象类似于全局对象window,我们是直接用到里面的属性的
    >demo.js
    ```js
    const express =require("express");
    const fs = require("fs");
    const ejs =  require("ejs");
    const app = express();
    app.set("view engine", "ejs"); // 加载模板引擎中间件
    app.get("/:title", function(req, res){ // 返回一个ejs文件，这个文件会经过中间件解析后返回给前端
      console.log(`${__dirname}/data/${req.params.title}.json`);
      console.log(__dirname);
      fs.readFile(`${__dirname}/data/${req.params.title}.json`, "utf-8", function(err, data){
        console.log('data+++++++++++++'+data);
        let poetry=JSON.parse(data);
        let nowData={poetry:poetry};
        if(err){
          res.send(404);
        }else{
          // console.log(typeof JSON.parse(data));
          res.render(`${__dirname}/ejsViews/home.ejs`, nowData,
          function(err, html){
            res.send(html);
          })
        }
      })
    });
    app.listen(8080);
    ```
    >ejsViews/home.ejs
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>
      <h1>
        <%=poetry.title%>
      </h1>
      <h2>
        <%=poetry.author%>
      </h2>
      <p>
        <%=poetry.content%>
      </p>
    </body>
    </html>
    ```
    >data/xiakexing.json
    ```json
    {
      "title": "侠客行",
      "author": "李白",
      "content": "赵客缦胡缨，吴钩霜雪明。"
    }
    ```

## 6.3 模板引擎的控制流程
  ><% '脚本' 标签，用于流程控制，无输出。
  >每一行的代码的开始都是 <%, 每一行代码的结束必须是%>, 无论这一行代码有没有写完
  * for循环遍历
  ```html
  <body>
    <% for(var i=0; i< data.strArr.length; i++>) { %>
      <p><%= data.strArr[i].content %></p>
    <% } %>
  </body>
  ```
  * if语句
  <body>
    <% if(user) { %>
      <h2><%= user.name%></h2>
    <% } %>
  </body>
## 6.4 include导入模块

  ```js
  const express = require('express');
  const app = express();
  const ejs = require("ejs");
  app.listen(8080);
  app.set("view engine", "ejs");//加载模板引擎的中间件
  app.get("/", function(req, res){
    let data={
      index: JSON.parse(fa.readFileSync(`$(__dirname)/name/index.json`, 'utf8')),
      header: JSON.parse(fa.readFileSync(`$(__dirname)/name/header.json`, 'utf8')),
      banner: JSON.parse(fa.readFileSync(`$(__dirname)/name/banner.json`, 'utf8')),
    }
    res.render(`${__dirname}/ejsViews/index.ejs`, data,funciton(err, html){
      res.send(html);
    })
  })
  ```
  ```html
    <body>
      <h1>
        <%=poetry.title%>
      </h1>
      <%- include('header.ejs', {header:header}); %>
      <%- include('banner.ejs', {banner:banner}); %>
    </body>
    ```
  ```json
  data/banner.json
  data/header.json
  data/index.json
  ```