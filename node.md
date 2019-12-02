@[TOC]
# node
## 一、导入导出
### 1、常用导入导出
### 2、导入导出缓存问题
### 3、运行机制
## 二、核心模块
### 1、path

# node
## 一、导入导出


    require(...) // 返回 ｛｝

    module.exports = {}
    或
    exports.方法名 = function(){} // 用这种的话就不能用module.exports = ...

    require.resolve() // 查询完整文件名路径

    require() // 里如果只是个文件名，它会自动查询该文件中package.json文件里的main字段对应的文件目录，而如果没有package.json文件则会自动加载index.js或index.node文件

### 2、导入导出缓存问题

    require('./src/math.js').msg = '1111';
    delete require.cache[require.resolve('./src/math.js')];
    // Object.keys(require.cache).forEach((key)=>{
    //   console.log(key, 1234567890);
    //   delete require.cache[key]
    // })

    console.log(require('./src/math.js').msg);

### 3、运行机制

    如果执行的是当前模块，那么require.main === module

    common.js运行机制，输入的是输出值的拷贝如：
a.js

    let num = 3;
    let counter = {num: 3}
    function incCounter(){
      counter.num++;
      num++;
    }
    module.exports = {
      counter: counter,
      incCounter: inCounter,
      num: num
    }

  b.js

    let counter = require('./src/a').counter;
    let incCounter = require('./src/a').incCounter;
    let num = require('./src/a').num;

    console.log(counter.num, num) // 3, 3
    incCounter();
    console.log(counter.num, num); // 4, 3

  require不是一个全局命令，指向module.require,而后者又调用Node的内部命令Module._load。

    Module._load = function(request, parent, isMain){
      1、检查Module._cache是否有值
      2、如果没有，就创建一个Module实例
      3、将它保存到缓存
      4、使用module.load()加载指定的模块文件，读取文件后，使用module.compile()执行文件代码
      5、如果加载/解析过程报错，就从缓存删除该模块
      6、返回该模块的module.exports
    }

  第4部module.compile()，执行模块脚本，如下：
    
    Module.prototype._compile = function(content, filename){
      // 1、生成一个require函数，指向module.require
      // 2、加载其他辅助方法到require
      // 3、将文件内容放到一个函数中，该函数可调用require
      // 4、执行该函数
    }

    上面的第1步和第2步，require函数及其辅助方法主要如下。
      1. require.resolve(): 将模块名生成一个绝对路径
      2. require.main: 指向主模块
      3. require.cache： 指向所有缓存的模块
      4. require.extensions: 根据文件的后缀名，调用不同的执行函数。

  
 ## 二、核心模块

### 1、path

  path.join()
    
    方法用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是”/“，Windows系统是”\“。如：
    path.join(__dirname, 'src');
    path.join(__filename, 'src');

  path.resolve()
    
    它可以接收多个参数，依次表示所要进入的路径。如：
    path.resolve(__dirname, 'src', 'js', 'es6');

  path.relative()
    
    方法接受两个参数，这两个参数都应该是绝对路径。该方法返回第二个路径相对于第一个路径的那个相对路径。
    a.js
      const path = require('path');
      exports.ePath = path.join(__dirname);
    b.js
      let {ePath} = require('./src/a');
      let path = require('path');
      console.log(path.relative(ePath, __dirname));

  path.parse();
      
    { 
      root: 'C:\\', // 根目录, linux下就是/
      dir:'C:\\Users\\Administrator\\Desktop\\note\\ppt\\node\\node\\src', // 文件所在的路径 ，dirname下就是文件夹所在路径
      base: 'math.js', // 文件名||文件夹名
      ext: '.js', // 后缀名 || ''
      name: 'math'  // 文件名 || 文件夹名
    }

  参数讲解:

    basename(path):path.basename(“pathaddr”,”filtterString”) 方法返回 path 的最后一部分(filename下就是文件名字+后缀名, dirname下就是文件所在的最后一个层级的目录名)
    delimiter:提供不同平台特定的路径定界符
    dirname(path):返回”pathaddr”的目录名称
    extname(path):返回 path 的扩展名，从最后一次出现 .（句点）字符到 path 最后一部分的字符串结束。 如果在 path 的最后一部分中没有 . ，或者如果 path 的基本名称（参阅 path.basename()）除了第一个字符以外没有 .，则返回空字符串。
    format(pathObject): 方法从对象返回路径字符串。 与 path.parse() 相反。
    isAbsolute(path):检测一个路径是否是绝对路径,如果path是个空string,则返回false
    normalize(path):规范化给定的 path，解析 '..' 和 '.' 片段。当找到多个连续的路径段分隔字符时（\），则它们将被替换为单个平台特定的路径段分隔符（\）。 尾部的分隔符会保留。如果 path 是零长度的字符串，则返回 '.'，表示当前工作目录。

### 2、url模块
    
  new URL(input[, base])

    input如果是相对路径，则需要base(代表决对路径，然后两者相接)

      let {URL} = require("url");
      let nowUrl = new URL("https://fanyi.baidu.com/?aldtype=85#en/zh/a");
      console.log(nowUrl);

      {
        href: 'https://fanyi.baidu.com/?aldtype=85#en/zh/a',
        origin: 'https://fanyi.baidu.com',
        protocol: 'https:',
        username: '',
        password: '',
        host: 'fanyi.baidu.com',
        hostname: 'fanyi.baidu.com',
        port: '',
        pathname: '/',
        search: '?aldtype=85',
        searchParams: URLSearchParams { 'aldtype' => '85' },
        hash: '#en/zh/a' 
      }

  参数详解:

    1. hash: 获取及设置 URL 的片段部分。分配给 hash 属性的值中包含的无效 URL 字符是百分比编码的
    2. host: 获取及设置 URL 的主机部分。(也就是域名加端口部分)
    3. url.hostname: 获取及设置 URL 的主机名部分。 url.host和url.hostname 之间的区别是 url.hostname 不包含端口
    4. href:获取及设置序列化的 URL。获取 href 属性的值等同于调用 url.toString()。将此属性的值设置为新值等同于使用 new URL(value) 创建新的URL对象。 URL 对象的每个属性都将被修改。如果给 href 属性设置的值是无效的 URL，则将会抛出 TypeError。
    5. origin:包含了协议的host, 获取只读的序列化的 URL 的 origin。
    6. port:端口获取及设置 URL 的端口部分。端口值可以是数字或包含 0 到 65535（含）范围内的数字字符串.端口可以是空字符串的,这时端口就会自动根据协议来选取
    7. protocol:设置连接协议, 无效协议值会被忽略. 比如http或是https
    8. search:获取及设置 URL 的序列化查询部分。
    9. searchParams:获取表示 URL 查询参数的 URLSearchParams 对象。 该属性是只读的。 使用 url.search 设置来替换 URL 的整个查询参数

### 3、querySting模块

    let querystring = require("querystring");
    console.log(querystring);

    { 
      unescapeBuffer: [Function: unescapeBuffer],
      unescape: [Function: qsUnescape],
      escape: [Function: qsEscape],
      stringify: [Function: stringify],
      encode: [Function: stringify],
      parse: [Function: parse],
      decode: [Function: parse] 
    }

  querystring.parse(str[, sep[, eq[, option]]])
    方法用于将一个查询字符串解析为 JavaScript 对象。

    var str = "foo=bar$abc=xyz&abc=123";
    querystring.parse(str);
    // [Object: null prototype] { foo: 'bar', abc: [ 'xyz', '123' ] }

    str：需要解析的查询字符串
    sep：多个键值对之间的分隔符，默认为&
    eq：键名与键值之间的分隔符，默认为=
    options：配置对象，它有两个属性，decodeURIComponent属性是一个函数，用来将编码后的字符串还原，默认是querystring.unescape()，默认情况下，将假定查询字符串中的百分比编码字符使用 UTF-8 编码。 如果使用其他字符编码，则需要指定其他值;  maxKeys属性指定最多解析多少个属性，默认是1000，如果设为0就表示不限制属性的最大数量。

  querystring.stringify(obj[, sep[, eq[, options]]])

      该方法可以理解为是parse的逆向方法,作用就是把一个对象改成一个查询字符串( 比如本地经过一番操作,确定了一组数据,现在要把数据组合成一个请求连接, 那么就需要这个操作了 )

      obj：需要组合的目标对象
      sep：多个键值对之间的分隔符，默认为&
      eq：键名与键值之间的分隔符，默认为=
      options：配置对象，它有两个属性，encodeURIComponent:在查询字符串中将 URL 不安全字符转换为百分比编码时使用的函数, 默认就是querystring.escape()

### 4、os模块
  
  os模块提供与操作系统相关的方法

  os.EOL

    属性是一个常量，返回当前操作系统的换行符（Windows系统是\r\n，其他系统是\n）,记住,这个换行符是不可见的,咱们看到的就是个效果

    let os = require("os");
    console.log("1234567");
    console.log(os.EOL)
    console.log("1234567");

    // 1234567
    // 
    // 1234567
  
  os.arch()

    os.arch方法返回当前计算机的架构
    现在可能的值有：'arm'、 'arm64'、 'ia32'、 'mips'、 'mipsel'、 'ppc'、 'ppc64'、 's390'、 's390x'、 'x32'、 'x64'。

  os.networkInterfaces() 

    方法返回一个对象，包含只有被赋予网络地址的网络接口

     { address: 'fe80::f4a0:bb2b:3dba:479b',
       netmask: 'ffff:ffff:ffff:ffff::',
       family: 'IPv6',
       mac: '80:9b:20:2d:53:7c',
       scopeid: 11,
       internal: false,
       cidr: 'fe80::f4a0:bb2b:3dba:479b/64' },
     { address: '192.168.8.159',
       netmask: '255.255.255.0',
       family: 'IPv4',
       mac: '80:9b:20:2d:53:7c',
       internal: false,
       cidr: '192.168.8.159/24' } 

    被赋予网络地址的对象包含的属性：
      address <string> 被赋予的 IPv4 或 IPv6 地址。
      netmask <string> IPv4 或 IPv6 子网掩码。
      family <string> IPv4 或 IPv6。
      mac <string> 网络接口的 MAC 地址。
      internal <boolean> 如果网络接口是 loopback 或相似的远程不能用的接口时，值为 true，否则为 false。
      scopeid <number> IPv6 数字领域识别码（只有当 family 是 IPv6 时可用）。
      cidr <string> 以 CIDR 表示法分配的带有路由前缀的 IPv4 或 IPv6 地址。如果 netmask 参数不可用，则该属性是 null。

  参数详解:

      platform():返回一个字符串，指定 Node.js 编译时的操作系统平台
      release():返回一个操作系统的版本号
      cpus():返回一个逻辑CPU内核的信息

### 5、buffer模块

  全局对象，是为处理二进制设计的（比如TCP数据流），它是一个构造函数，生成实例代表V8引擎分配的一段内存，是一个类似数组的对象，成员都为0-255的整数值，即一个8位字节

    // 参数是整数，指定分配多少个字节内存
    var hello = new Buffer(5);
    // 参数是数组， 数组成员必须是整数值
    var hello = new Buffer([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
    console.log(hello.toString()); // Hello

    // 参数是字符串（默认为utf-8编码）
    var hello = new Buffer('Hello');
    console.log(hello.length); // 5
    console.log(hello.toString()); // Hello

    // 参数是字符串（不省略编码）
    var hello = new Buffer("Hello", "utf-8");
    // <Buffer 48 65 6c 6c 6f>

    // 参数是另一个Buffer实例，等同于拷贝后者
    var hello2 = new Buffer(hello);
    // <Buffer 48 65 6c 6c 6f>

  Buffer的存取值类似数组

    var bytes = new Buffer(256);
    for(var i = 0; i< bytes.length; i++){
      bytes[i] = i;
    }
    var end = bytes.slice(240, 256);

    console.log(end[0]) // 240;
    end[0] = 0;
    console.log(end[0]); // 0

    // copy()
    该方法，将bytes的，2～5成员拷贝到more中。
    var more = new Buffer(4);
    bytes.copy(more, 0, 2, 9);
  
  Buffer值转换
    
    与字符串互相转换需求指定编码格式
    ascii
    utf8
    utf16le：UTF-16的小端编码，支持大于U+10000的四字节字符。
    ucs2：utf16le的别名。
    base64
    hex：将每个字节转为两个十六进制字符。

  Buffer.isEncoding('utf-8')
    
    是否支持参数（编码格式）返回true;

  Buffer.isBuffer(Date)
    
    是否是Buffer实例

  Buffer.byteLength('Hello', 'utf-8')
    
    返回字符串或Buffer对象实际占据字节长度，默认编码utf-8

  Buffer.concat([new Buffer('hello'), new Buffer  ('world')], 10).toString();
    
     cancat接受一个包含多个Buffer对象的数组，和可选长度（提升性能），合并成一个新的Buffer。

  write()
  
    let buf = new buffer(5); buf.write("He");buf.write("llo", 2);
    console.log(buf.toString()); // hello
      写入方法，参数1：内容，参数2：位置（可选）， 参数3：编码格式（可选）

  slice()
    
    buf.slice(5, 9); // 累数组，左开右闭

  toString();
    
    转换成字符串，参数1：编码格式，参数2、3： 左闭右开

  toJSON()
    
    将Buffer转为JSON对象，如果JSON.stringify方法调用Buffer实例，默认会先调用toJSON对象
    buf.toJSON(new Buffer('test'));
    { type: 'Buffer', data: [ 116, 101, 115, 116 ] }

  length
    
    Buffer对象所占内存的长度

### 6、fs模块

  fs是filesystem的缩写，该模块提供本地文件的读写能力，基本上是POSIX文件操作命令的简单包装。

readFile()

  参数1：绝对路径或相对路径，如果是相对路径则取的是当前进程所在的路径（process.cwd()）;
  参数2：回调
  fs.readFile('./src/math.js', function(err, buffer){
    if(err) throw err;
    console.log(buffer);
    console.log(buffer.toString());
  })

readFileSync()

  参数1：路径
  参数2：配置对象（可选，encoding:编码, flag: 'r'只读）
  var info = fs.readFileSync('./src/math.js', {
    encoding: 'utf-8',
    flag: 'r'
  })
  console.log(info);

writeFile(file, data[, option], callback)

  writeFile方法用于异步写入文件。(默认直接覆盖)

    file <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符。
    data <string> | <Buffer> | <TypedArray> | <DataView>
    options <Object> | <string>
        encoding <string> | <null> 默认值: 'utf8'。
        mode <integer> 默认值: 0o666。
        flag <string> 参阅支持的文件系统标志。默认值: 'w'。
    callback <Function>
        err <Error>

    fs.writeFile('./src/math.js', "你好万章", {
      encoding: 'utf-8',
      flag: 'w'
    }, (err) => {
      if(err) {
        throw err
      }
    });

文件系统标识

    当 flag 选项采用字符串时，可用以下标志：

    1. 'a' - 打开文件用于追加。如果文件不存在，则创建该文件。
    2. 'ax' - 与 'a' 相似，但如果路径已存在则失败。
    3. 'a+' - 打开文件用于读取和追加。如果文件不存在，则创建该文件。
    4. 'ax+' - 与 'a+' 相似，但如果路径已存在则失败。
    5. 'as' - 以同步模式打开文件用于追加。如果文件不存在，则创建该文件。
    6. 'as+' - 以同步模式打开文件用于读取和追加。如果文件不存在，则创建该文件。
    7. 'r' - 打开文件用于读取。如果文件不存在，则出现异常。
    8. 'r+' - 打开文件用于读取和写入。如果文件不存在，则出现异常。
    9. 'rs+' - 以同步模式打开文件用于读取和写入。指示操作系统绕过本地的文件系统缓存。
    这对于在 NFS 挂载上打开文件时非常有用，因为它允许跳过可能过时的本地缓存。 它对 I/O 性能有非常实际的影响，因此除非需要，否则不建议使用此标志。
    这不会将 fs.open() 或 fsPromises.open() 转换为同步的阻塞调用。 如果需要同步的操作，则应使用 fs.openSync() 之类的。
    10. 'w' - 打开文件用于写入。如果文件不存在则创建文件，如果文件已存在则截断文件。
    11. 'wx' - 与 'w' 相似，但如果路径已存在则失败。
    12. 'w+' - 打开文件用于读取和写入。如果文件不存在则创建文件，如果文件已存在则截断文件。
    13. 'wx+' - 与 'w+' 相似，但如果路径已存在则失败。

  exists(path, callback)

    判断给定路径是否存在
    参数1：路径
    参数2：回调，参数返回布尔值
    fs.exists('./src/math.js', function(exists){
      console.log(exists);
    });

  mkdir()/readdir()
    新建目录
    参数1：目录名
    参数2：权限值
    参数3： 回调
    fs.mkdir('./src/mkdir', 0777, function(err){
      if(err){throw err};
    });

    新建目录
    参数1：目录名
    参数3： 回调
    fs.readdir(process.cwd(), function(err, file){
      console.log(err);
      console.log(file);
    });
  
  stat
    判断是文件还是文件夹
    参数1：当前进程下的filename
    参数2：回调，param1:err; param2:stats;

    fs.readdir(process.cwd(), function(err, files){
      if(err){throw err};
      files.forEach((filename)=>{
        fs.stat(filename, function(err, stats){
          console.log(filename+"是文件嘛"+ stats.isFile())
          console.log(filename+"是文件夹嘛"+ stats.isDirectory())
        })
      })
    });

  watchfile/unwatchfile()
    watchfile方法监听一个文件，如果该文件发生变化，就会自动触发回调
    unwatchfile接触监听

    fs.watchFile('./src/math.js', function(curr, prev){
      console.log("this current mtime is"+curr.mtime);
      console.log("this previous mtime is"+prev.mtime);
    })

    fs.writeFile('./src/math.js', "hello world", function(error, buffer){
      console.log("file write complete");
    })

### 7、events模块
    回调函数模式让 Node 可以处理异步操作。但是，为了适应回调函数，异步操作只能有两个状态：开始和结束。对于那些多状态的异步操作（状态1，状态2，状态3，……），回调函数就会无法处理，你不得不将异步操作拆开，分成多个阶段。每个阶段结束时，调用下一个回调函数。
    为了解决这个问题，Node 提供 Event Emitter 接口。通过事件，解决多状态异步操作的响应问题。

myEmit.on()/myEmit.emit()

    同步的emit触发后,就会立刻调用on(),然后再继续顺序执行
    var Events = require('events');
    let myEmit = new Events();
    myEmi.on('event', ()=>{
        console.log('监听事件');
    });

    myEmit.emit('event');

myEmit.once()

    类似on(), 但只执行一次

myEmit.removeListener()

    用于解绑监听函数
    参数1：监听事件名
    参数2：监听回调函数
    相当于把相应的事件名和回调解绑。

myEmit.setMaxListeners(number)

    设置一个事件最多绑定多个回调，默认绑定10个回调

myEmit.removeAllListeners();

    参数1：事件名（可选）
    如果带参数表示移除当前事件的所有回调，如果不带参数，则表示移除所有事件的所有回调。

myEmit.listeners()

    参数1：事件名
    返回当前事件绑定的所有回调函数组成的数组。

try{}catch(err){}

    可捕获同一个事件绑定的不同回调错误

newListener/removeListener

    Events模块自带事件，监听newListener，添加新的回调时触发。监听removeListener移除回调时触发。
    myEmit.on('newListener', function(evtName){
      console.log("New Listener:"+evtName);
    })

    myEmit.on('removeListener', function(evtName){
      console.log("New Listener:"+evtName);
    })

### 7、http模块

    const http = require("http")

    http.STATUS_CODES: 是一个状态码解析对象

    http.METHODS: 支持的请求方法数组

    http.createServer(function(request, response){
      if(request.url==="/"){
        fs.readFile(`${__dirname}/src/index.html`,function(err, data){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        })
      } else {
          fs.readFile(`${__dirname}/src/images/me.jpg`,function(err, data){
              response.writeHead(200, {'Content-Type': 'image/jpeg'});
              response.end(data);
          })
      }
    }).listen(8080, '127.0.0.1');

### 8、ajax
  概要

    Asynchronous javascript and XML(AJAX)
    JS执行异步网络请求

    ajax的实现目的是为了能够做到局部更新网页的数据，从而避免高频次的网页整体更新

    var myRequest = new XMLHttpRequest();

    myRequest.open(method, url, async?, user?, password); // 初始化一个请求
    
  send()

    send异步请求，发送后立即返回状态，同步请求，直到响应才返回。
    GET或者HEAD，请求主题为null。

    发送主体信息类型：
    XMLHttpRequest.send();
    XMLHttpRequest.send(ArrayBuffer data);
    XMLHttpRequest.send(ArrayBufferView data);
    XMLHttpRequest.send(Blob data);//上传文件必备
    XMLHttpRequest.send(Document data);
    XMLHttpRequest.send(DOMString? data);
    XMLHttpRequest.send(FormData data);

  setRequestHeader() 

    如果没有使用setRequestHeader()方法设置Accept关部信息，则会发送“*、*”
    
    是设置HTTP请求头部的方法。此方法必须在  open() 方法和 send()   之间调用。如果多次对同一个请求头赋值，只会生成一个合并了多个值的请求头。





  

  







    


  



    







