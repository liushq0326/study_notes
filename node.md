[toc]

# 一、导入导出
## 1.1 常用导入导出
  ```js
  require(...) // 返回 ｛｝

  module.exports = {}
  或
  exports.方法名 = function(){} // 用这种的话就不能用module.exports = ...

  require.resolve() // 查询完整文件名路径

  require() // 里如果只是个文件名，它会自动查询该文件中package.json文件里的main字段对应的文件目录，而如果没有package.json文件则会自动加载index.js或index.node文件
  ```
## 1.2 导入导出缓存问题
  ```js
  require('./src/math.js').msg = '1111';
  delete require.cache[require.resolve('./src/math.js')];
  // Object.keys(require.cache).forEach((key)=>{
  //   console.log(key, 1234567890);
  //   delete require.cache[key]
  // })

  console.log(require('./src/math.js').msg);
  ```
## 1.3 运行机制

  >如果执行的是当前模块，那么require.main === module
common.js运行机制，输入的是输出值的拷贝如：

a.js
  ```js
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
  ```
  b.js
  ```js
  let counter = require('./src/a').counter;
  let incCounter = require('./src/a').incCounter;
  let num = require('./src/a').num;

  console.log(counter.num, num) // 3, 3
  incCounter();
  console.log(counter.num, num); // 4, 3
  ```
  require不是一个全局命令，指向module.require,而后者又调用Node的内部命令Module._load。
  ```js
  Module._load = function(request, parent, isMain){
    1、检查Module._cache是否有值
    2、如果没有，就创建一个Module实例
    3、将它保存到缓存
    4、使用module.load()加载指定的模块文件，读取文件后，使用module.compile()执行文件代码
    5、如果加载/解析过程报错，就从缓存删除该模块
    6、返回该模块的module.exports
  }
  ```
  第4部module.compile()，执行模块脚本，如下：
  ```js
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
  ```
  
# 二、核心模块

## 2.1 path

* path.join()
    
  >方法用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是”/“，Windows系统是”\“。如：
  ```js
  path.join(__dirname, 'src');
  path.join(__filename, 'src');
  ```
* path.resolve()
    
    >它可以接收多个参数，依次表示所要进入的路径。如：
    path.resolve(__dirname, 'src', 'js', 'es6');

* path.relative()
    
    >方法接受两个参数，这两个参数都应该是绝对路径。该方法返回第二个路径相对于第一个路径的那个相对路径。

    a.js
    ```js
    const path = require('path');
    exports.ePath = path.join(__dirname);
    ```

    b.js
    ```js
    let {ePath} = require('./src/a');
    let path = require('path');
    console.log(path.relative(ePath, __dirname));
    ```
* path.parse();
    ```js
    { 
      root: 'C:\\', // 根目录, linux下就是/
      dir:'C:\\Users\\Administrator\\Desktop\\note\\ppt\\node\\node\\src', // 文件所在的路径 ，dirname下就是文件夹所在路径
      base: 'math.js', // 文件名||文件夹名
      ext: '.js', // 后缀名 || ''
      name: 'math'  // 文件名 || 文件夹名
    }
    ```

>参数讲解:

* basename(path):

    path.basename(“pathaddr”,”filtterString”) 方法返回 path 的最后一部分(filename下就是文件名字+后缀名, dirname下就是文件所在的最后一个层级的目录名)
* delimiter:
    
    提供不同平台特定的路径定界符
* dirname(path):
    
    返回”pathaddr”的目录名称
* extname(path):

    返回 path 的扩展名，从最后一次出现 .（句点）字符到 path 最后一部分的字符串结束。 如果在 path 的最后一部分中没有 . ，或者如果 path 的基本名称（参阅 path.basename()）除了第一个字符以外没有 .，则返回空字符串。
* format(pathObject): 

    方法从对象返回路径字符串。 与 path.parse() 相反。
* isAbsolute(path):

    检测一个路径是否是绝对路径,如果path是个空string,则返回false
* normalize(path):

    规范化给定的 path，解析 '..' 和 '.' 片段。当找到多个连续的路径段分隔字符时（\），则它们将被替换为单个平台特定的路径段分隔符（\）。 尾部的分隔符会保留。如果 path 是零长度的字符串，则返回 '.'，表示当前工作目录。

## 2.2 url模块
    
* new URL(input[, base])

    >input如果是相对路径，则需要base(代表决对路径，然后两者相接)
    ```js
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
    ```
* 参数详解:

    1. hash: 获取及设置 URL 的片段部分。分配给 hash 属性的值中包含的无效 URL 字符是百分比编码的
    2. host: 获取及设置 URL 的主机部分。(也就是域名加端口部分)
    3. url.hostname: 获取及设置 URL 的主机名部分。 url.host和url.hostname 之间的区别是 url.hostname 不包含端口
    4. href:获取及设置序列化的 URL。获取 href 属性的值等同于调用 url.toString()。将此属性的值设置为新值等同于使用 new URL(value) 创建新的URL对象。 URL 对象的每个属性都将被修改。如果给 href 属性设置的值是无效的 URL，则将会抛出 TypeError。
    5. origin:包含了协议的host, 获取只读的序列化的 URL 的 origin。
    6. port:端口获取及设置 URL 的端口部分。端口值可以是数字或包含 0 到 65535（含）范围内的数字字符串.端口可以是空字符串的,这时端口就会自动根据协议来选取
    7. protocol:设置连接协议, 无效协议值会被忽略. 比如http或是https
    8. search:获取及设置 URL 的序列化查询部分。
    9. searchParams:获取表示 URL 查询参数的 URLSearchParams 对象。 该属性是只读的。 使用 url.search 设置来替换 URL 的整个查询参数

## 2.3 querySting模块

  >let querystring = require("querystring");
  console.log(querystring);
  ```js
  { 
    unescapeBuffer: [Function: unescapeBuffer],
    unescape: [Function: qsUnescape],
    escape: [Function: qsEscape],
    stringify: [Function: stringify],
    encode: [Function: stringify],
    parse: [Function: parse],
    decode: [Function: parse] 
  }
  ```

* querystring.parse(str[, sep[, eq[, option]]])
    
    >方法用于将一个查询字符串解析为 JavaScript 对象。
    ```js
    var str = "foo=bar$abc=xyz&abc=123";
    querystring.parse(str);
      // [Object: null prototype] { foo: 'bar', abc: [ 'xyz', '123' ] }

    str：需要解析的查询字符串
    sep：多个键值对之间的分隔符，默认为&
    eq：键名与键值之间的分隔符，默认为=
    options：配置对象，它有两个属性，decodeURIComponent属性是一个函数，用来将编码后的字符串还原，默认是querystring.unescape()，默认情况下，将假定查询字符串中的百分比编码字符使用 UTF-8 编码。 如果使用其他字符编码，则需要指定其他值;  maxKeys属性指定最多解析多少个属性，默认是1000，如果设为0就表示不限制属性的最大数量。
    ```
* querystring.stringify(obj[, sep[, eq[, options]]])

    >该方法可以理解为是parse的逆向方法,作用就是把一个对象改成一个查询字符串( 比如本地经过一番操作,确定了一组数据,现在要把数据组合成一个请求连接, 那么就需要这个操作了 )
    ```js
    obj：需要组合的目标对象
    sep：多个键值对之间的分隔符，默认为&
    eq：键名与键值之间的分隔符，默认为=
    options：配置对象，它有两个属性，encodeURIComponent:在查询字符串中将 URL 不安全字符转换为百分比编码时使用的函数, 默认就是querystring.escape()
    ```
## 2.4 os模块
  
  >os模块提供与操作系统相关的方法

* os.EOL

    >属性是一个常量，返回当前操作系统的换行符（Windows系统是\r\n，其他系统是\n）,记住,这个换行符是不可见的,咱们看到的就是个效果
    ```js
    let os = require("os");
    console.log("1234567");
    console.log(os.EOL)
    console.log("1234567");
    // 1234567
    // 
    // 1234567
* os.arch()
    >os.arch方法返回当前计算机的架构
    现在可能的值有：'arm'、 'arm64'、 'ia32'、 'mips'、 'mipsel'、 'ppc'、 'ppc64'、 's390'、 's390x'、 'x32'、 'x64'。
  
* os.networkInterfaces() 

    >方法返回一个对象，包含只有被赋予网络地址的网络接口

    ```js
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
    ```

  >被赋予网络地址的对象包含的属性：
  
  address <string> 被赋予的 IPv4 或 IPv6 地址。
  netmask <string> IPv4 或 IPv6 子网掩码。
  family <string> IPv4 或 IPv6。
  mac <string> 网络接口的 MAC 地址。
  internal <boolean> 如果网络接口是 loopback 或相似的远程不能用的接口时，值为 true，否则为 false。
  scopeid <number> IPv6 数字领域识别码（只有当 family 是 IPv6 时可用）。
  cidr <string> 以 CIDR 表示法分配的带有路由前缀的 IPv4 或 IPv6 地址。如果 netmask 参数不可用，则该属性是 null。

  >参数详解:

      platform():返回一个字符串，指定 Node.js 编译时的操作系统平台
      release():返回一个操作系统的版本号
      cpus():返回一个逻辑CPU内核的信息

## 2.5 buffer模块

  >全局对象，是为处理二进制设计的（比如TCP数据流），它是一个构造函数，生成实例代表V8引擎分配的一段内存，是一个类似数组的对象，成员都为0-255的整数值，即一个8位字节

  ```js
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
  ```

  * Buffer的存取值类似数组
    ```js
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
    ```
  * Buffer值转换
      
    >与字符串互相转换需求指定编码格式

        ascii
        utf8
        utf16le：UTF-16的小端编码，支持大于U+10000的四字节字符。
        ucs2：utf16le的别名。
        base64
        hex：将每个字节转为两个十六进制字符。
      
* Buffer.isEncoding('utf-8')
    
      是否支持参数（编码格式）返回true;

* Buffer.isBuffer(Date)
    
      是否是Buffer实例

* Buffer.byteLength('Hello', 'utf-8')
    
      返回字符串或Buffer对象实际占据字节长度，默认编码utf-8

* Buffer.concat([new Buffer('hello'), new Buffer  ('world')], 10).toString();
    
      cancat接受一个包含多个Buffer对象的数组，和可选长度（提升性能），合并成一个新的Buffer。

* write()
    ```js
      let buf = new buffer(5); buf.write("He");buf.write("llo", 2);
      console.log(buf.toString()); // hello
      // 写入方法，参数1：内容，参数2：位置（可选）， 参数3：编码格式（可选）
    ```
* slice()
    ```js
      buf.slice(5, 9); // 累数组，左开右闭
    ```
* toString();
    
      转换成字符串，参数1：编码格式，参数2、3： 左闭右开

* toJSON()
    
    >将Buffer转为JSON对象，如果JSON.stringify方法调用Buffer实例，默认会先调用toJSON对象
    ```js
    buf.toJSON(new Buffer('test'));
    { type: 'Buffer', data: [ 116, 101, 115, 116 ] }
    ```

* length
    
      Buffer对象所占内存的长度

## 2.6 fs模块

  >fs是filesystem的缩写，该模块提供本地文件的读写能力，基本上是POSIX文件操作命令的简单包装。

* readFile()

    参数1：绝对路径或相对路径，如果是相对路径则取的是当前进程所在的路径（process.cwd()）;

    参数2：回调
    ```js
      fs.readFile('./src/math.js', function(err, buffer){
        if(err) throw err;
        console.log(buffer);
        console.log(buffer.toString());
      })
    ```

* readFileSync()

    参数1：路径

    参数2：配置对象（可选，encoding:编码, flag: 'r'只读）
    ```js
      var info = fs.readFileSync('./src/math.js', {
        encoding: 'utf-8',
        flag: 'r'
      })
      console.log(info);
    ```
* writeFile(file, data[, option], callback)

    writeFile方法用于异步写入文件。(默认直接覆盖)
    
      file <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符。
      data <string> | <Buffer> | <TypedArray> | <DataView>
      options <Object> | <string>
          encoding <string> | <null> 默认值: 'utf8'。
          mode <integer> 默认值: 0o666。
          flag <string> 参阅支持的文件系统标志。默认值: 'w'。
      callback <Function>
          err <Error>
    ```js
      fs.writeFile('./src/math.js', "你好万章", {
        encoding: 'utf-8',
        flag: 'w'
      }, (err) => {
        if(err) {
          throw err
        }
      });
    ```
* 文件系统标识

    >当 flag 选项采用字符串时，可用以下标志：

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

* exists(path, callback)

    >判断给定路径是否存在
    
    参数1：路径

    参数2：回调，参数返回布尔值
    ```js
      fs.exists('./src/math.js', function(exists){
        console.log(exists);
      });
    ```
* mkdir()/readdir()
    
    >新建目录

    参数1：目录名

    参数2：权限值

    参数3： 回调
    ```js
      fs.mkdir('./src/mkdir', 0777, function(err){
        if(err){throw err};
      });
    ```
    >新建目录

    参数1：目录名

    参数2： 回调
    ```js
      fs.readdir(process.cwd(), function(err, file){
        console.log(err);
        console.log(file);
      });
    ```
* stat()

    >判断是文件还是文件夹

    参数1：当前进程下的filename

    参数2：回调，param1:err; param2:stats;
    ```js
      fs.readdir(process.cwd(), function(err, files){
        if(err){throw err};
        files.forEach((filename)=>{
          fs.stat(filename, function(err, stats){
            console.log(filename+"是文件嘛"+ stats.isFile())
            console.log(filename+"是文件夹嘛"+ stats.isDirectory())
          })
        })
      });
    ```
* watchfile/unwatchfile()
    
    >watchfile方法监听一个文件，如果该文件发生变化，就会自动触发回调

    >unwatchfile接触监听
    ```js
      fs.watchFile('./src/math.js', function(curr, prev){
        console.log("this current mtime is"+curr.mtime);
        console.log("this previous mtime is"+prev.mtime);
      })

      fs.writeFile('./src/math.js', "hello world", function(error, buffer){
        console.log("file write complete");
      })
    ```
* rmdir(path, callback)/unlink(path, callback)
    
    >删除文件夹\删除文件
    ```js
      fs.unlink(`${__dirname}/ceshi.txt`, function(err){
        if(err){
          console.log(err);
        } else {
          console.log("删除成功");
        }
      });

      fs.rmdir(`${__dirname}/text`, function(err){
        if(err){
          console.log(err);
        } else {
          console.log("删除成功");
        }
      })
    ```
* rename(path1, path2, callback)
  
  >重命名、移动文件
    ```js
      fs.rename(`${__dirname}/text.txt`, `${__dirname}/mv/ceshi.txt`, function(err){
        if(err){console.log(err);}
        else{console.log("改名字+移动成功");}
      })
    ```
* createReadStream()

  >createReadStream方法往往用于打开大型的文本文件，创建一个读取操作的数据流。所谓大型文本文件，指的是文本文件的体积很大，读取操作的缓存装不下，只能分成几次发送，每次发送会触发一个data事件，发送结束会触发end事件。
  ```js
  var fs = require("fs");
  function readLine(input, func) {
    var remaining = '';
    var count = 0;
    input.on('data', function(data){
      remaining += data;
      var index = remaining.indexOf('\n');

      var last = 0;
      while(index > -1){
        var line = remaining.substring(last, index);
        last = index + 1;
        func(line, count);
        count++;
        index = remaining.indexOf('\n', last);
      }
      remaining = remaining.substring(last);
    })
    input.on('end', function(){
      if(remaining.length > 0){
        func(remaining, count);
      }
    });
  }
  function func(data, count){
    console.log(`Line ${count}: + ${data}`);
  }
  var input = fs.createReadStream('lines.txt');
  readLine(input, func);
  ```
* createWriteStream()
  >createWriteStream方法创建一个写入数据流对象，该对象的write方法用于写入数据，end方法用于结束写入操作

  ```js
  var out = fs.createWriteStream(fileName, {
    encoding: 'utf8'
  })
  out.write(str);
  out.end();
  ```
* createWriteStream()
  >复制大文件，写入与读入数据同步判断
  ```js
  var fs = require('fs');
  function copy(target, src, ){
    var rs = fs.createReadStream(src);
    var ws = fs.createWriteStream(target);
    rs.on('data', function(chunk){ 
      if(ws.write(chunk, function(){
        console.log('write');
      }) === false){ // 写入与读入数据同步判断
        rs.pause();
      } else {
        rs.resume();
      }
    })

    rs.on('end', function(){
      ws.end();
    })
  }
  copy('./target.txt', './lines.txt');
  ```
* pipe()
  >管道流
  ```js
  function copy(target, src){
    fs.createReadStream(src).pipe(fs.createWriteStream(target));
  }
  ```
## 2.7 events模块
  >回调函数模式让 Node 可以处理异步操作。但是，为了适应回调函数，异步操作只能有两个状态：开始和结束。
  
  >对于那些多状态的异步操作（状态1，状态2，状态3，……），回调函数就会无法处理，你不得不将异步操作拆开，分成多个阶段。每个阶段结束时，调用下一个回调函数。
    
  >为了解决这个问题，Node 提供 Event Emitter 接口。通过事件，解决多状态异步操作的响应问题。

* myEmit.on()/myEmit.emit()

  >同步的emit触发后,就会立刻调用on(),然后再继续顺序执行
  ```js
  var Events = require('events');
  let myEmit = new Events();
  myEmi.on('event', ()=>{
      console.log('监听事件');
  });

  myEmit.emit('event');
  ```

* myEmit.once()

    >类似on(), 但只执行一次

* myEmit.removeListener()

    >用于解绑监听函数

      参数1：监听事件名

      参数2：监听回调函数

      相当于把相应的事件名和回调解绑。

* myEmit.setMaxListeners(number)

    >设置一个事件最多绑定多个回调，默认绑定10个回调

* myEmit.removeAllListeners();

    >参数1：事件名（可选）
    如果带参数表示移除当前事件的所有回调，如果不带参数，则表示移除所有事件的所有回调。

* myEmit.listeners()

    >参数1：事件名
    返回当前事件绑定的所有回调函数组成的数组。

* try{}catch(err){}

    >可捕获同一个事件绑定的不同回调错误

* newListener/removeListener

    >Events模块自带事件，监听newListener，添加新的回调时触发。监听removeListener移除回调时触发。
    ```js
      myEmit.on('newListener', function(evtName){
        console.log("New Listener:"+evtName);
      })

      myEmit.on('removeListener', function(evtName){
        console.log("New Listener:"+evtName);
      })
    ```
## 2.8 http模块
  
* createServer()

    ```js
      const http = require("http")
      // http.STATUS_CODES: 是一个状态码解析对象
      // http.METHODS: 支持的请求方法数组
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

* 监听事件data和end
    ```js
    http.createServer(function(req, resp){
      let content = "";
      // data事件会在数据接收过程中，每收到一段数据就触发一次
      req.on('data', function(chunk){
        content += chunk;
      })
      // 所有数据接收完成后触发
      req.on('end', function(){
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write("You have sent:" + content);
        res.end()
      })
    }

* listen()

    >listen方法用于启动服务器，它可以接受多种参数。
    ```js
    // 端口
    server.listen(8000);
    server.listen(8000, 'localhost');
    serve.listen({
      port: 8000,
      host: 'localhost'
    });
* 服务端发送请求get()

    >它是简化版request()不需要手动调用req.end()
    ```js
    function getTestPersonalLoginCredentials(callback){
      return http.get({
        host: 'personatestuser.org',
        path: '/email',
      }, function(reponse){
        let body = '';
        reponse.on('data', function(){
          body+=d;
        })
        reponse.on('end', function(){
          let parsed = JSON.parse(body);
          callback({
            email: parsed.email,
            password: parsed.pass
          })
        })
      })
    }

* 服务端发送请求request()

    >request(options[, callback]);
      
    >request方法的options参数，可以是一个对象，也可以是一个字符串。如果是字符串，就表示这是一个URL，Node内部就会自动调用url.parse()，处理这个参数。
    ```js
      request({
          url: 'http://xxx.xxx.com',
          method: 'POST',
          body: formData
      }, function(error, response, body) {
          if (!error && response.statusCode == 200) {
              //输出返回的内容
              console.log(body);
          }
      });
    ```
* options对象可以设置如下属性:

      host: 域名或ip地址，默认localhost
      hostname: 该属性会被url.parse()解析，优先级高于host。
      port: 默认80
      localAddress: 本地网络接口。
      socketPath: Unix网络套接字，格式为host:port或者socketPath。
      method: 指定HTTP请求的方法，字符串默认为GET。
      path: 指定HTTP请求的路径，默认为路径（/）。可以加参数...？page=12，不可以有空格。
      headers: 一个对象，包含了HTTP请求头信息。
      auth: 一个代表HTTP基本认证的字符串user:password。
      agent: 控制缓存行为，如果HTTP请求使用了agent,则HTTP请求默认为Connection： keep-alive,它的可能值如下：
          undefined(默认)：对当前host和port,使用全局Agent。
          Agent：一个对象，会传入agent属性。
          false: 不缓存连接，默认HTTP请求为Connection：close。
      keepAlive: 一个布尔值，表示是否保留socket供未来其他请求使用，默认等于false。
      keepAliveMsecs:一个整数，当使用KeepAlive的时候，设置多久发送一个TCP KeepAlive包，使得连接不要被关闭。默认等于1000，只有keepAlive设为true的时候，该设置才有意义。


## 2.9 ajax
  
* 概要

    >Asynchronous javascript and XML(AJAX)
    JS执行异步网络请求
    
    >ajax的实现目的是为了能够做到局部更新网页的数据，从而避免高频次的网页整体更新
    ```js
      var myRequest = new XMLHttpRequest();

      myRequest.open(method, url, async?, user?, password); // 初始化一个请求
    ```
* send()

    >send异步请求，发送后立即返回状态，同步请求，直到响应才返回。
    GET或者HEAD，请求主题为null。发送主体信息类型：
    ```js
      XMLHttpRequest.send();
      XMLHttpRequest.send(ArrayBuffer data);
      XMLHttpRequest.send(ArrayBufferView data);
      XMLHttpRequest.send(Blob data);//上传文件必备
      XMLHttpRequest.send(Document data);
      XMLHttpRequest.send(DOMString? data);
      XMLHttpRequest.send(FormData data);`
    ```
* setRequestHeader() 

    >如果没有使用setRequestHeader()方法设置Accept关部信息，则会发送“*、*”
      
    >是设置HTTP请求头部的方法。此方法必须在  open() 方法和 send()   之间调用。如果多次对同一个请求头赋值，只会生成一个合并了多个值的请求头。
    ```js
      var myRequest = new XMLHttpRequest();
      myRequest.setRequestHeader("Accept", "application/json");
      myRequest.send();
    ```
* onreadystatechange和readyState

    >readyState返回XMLHttpRequest代理当前所处的状态。

  | 值 | 状态    |  描述  |
  | ---| -----:  | :----: |
  | 0  | UNSENT      |代理被创建，未调用open()|
  | 1  | OPENED      |open()方法已经被调用|
  | 2  | HEADERS_RECEIVED|send()已被调用，并且头部状态已经可获得|
  | 3  | LOADING      |下载中;responseText属性已经包含总数数据   |
  | 4  | DONE      |下载完成    |
    ```js
      var myRequest = new XMLHttpRequest();
      myRequest.open("GET", "./data", true);
      myRequest.setRequestHeader("Accept", "application/json");
      myRequest.onreadystatechange = function(){
        if(myRequest.readyState === 4){
          if(myRequest.status === 200){
            console.log("请求成功");
            console.log(myRequest.responseText);
          } else {
            console.log(myRequest.status);
          }
        } else{
          // 未请求完成
        }
      }
      myRequest.send();
    ```
* XMLHttpRequest.response

    >返回一个 ArrayBuffer、Blob、Document，或 DOMString，具体是哪种类型取决于 XMLHttpRequest.responseType 的值。其中包含整个响应体（response body）。
  
* XMLHttpRequest.responseText

    >返回一个 DOMString，该 DOMString 包含对请求的响应，如果请求未成功或尚未发送，则返回 null。

* XMLHttpRequest.status:

    >返回了XMLHttpRequest 响应报名的数字状态码

* XMLHttpRequest.responseType

    >一个用于定义响应类型的枚举值（enumerated value）。
* XMLHttpRequest.responseURL 只读

    >返回响应的序列化（serialized）URL，如果该 URL 为空，则返回空字符串。
* XMLHttpRequest.responseXML 只读

    >返回一个 Document，其中包含该请求的响应，如果请求未成功、尚未发送或时不能被解析为 XML 或 HTML，则返回 null。

* XMLHttpRequest.statusText 只读

    >返回一个 DOMString，其中包含 HTTP 服务器返回的响应状态。与 XMLHTTPRequest.status 不同的是，它包含完整的响应状态文本（例如，"200 OK"）。

* 跨域请求

  * 1、简单请求：

    >简单请求包括GET、HEAD和POST（请求头Content-Type类型 仅限application/x-www-form-urlencoded、multipart/form-data和text/plain），并且不能出现任何自定义头（例如，X-Custom: 12345）
      
    >后台设置响应头Access-Control-Allow-Origin为请求源地浏览器域地址。则简单请求下可以跨域。

    >Access-Control-Allow-Methods: 允许请求方法

    >备注：如果Access-Control-Allow-Origin允许指定跨域的话， Access-Control-Allow-Methods失效

  * 2、jsonp:

    >利用script标签请求相应接口，并带上相应参数方法。后台接收请求后执行方法传入响应参数。
    
    index.html
      ```js
        function getData(data){
          console.log(data);
        }
        <script src="http://127.0.0.2:8080/image?func=getData"></script>
      ```
    node服务器
      ```js
        var http = require("http");
        var fs = require("fs");
        var Url = require('url');

        http.createServer(function(request, response){

          let path = Url.parse(request.url);
          let params = path.query.split('=');
          let pathname = path.pathname;

        
          if(pathname==="/data"){
            fs.readFile(`${__dirname}/src/index.txt`,function(err, data){
                response.writeHead(200,  {'Content-Type': 'text/main', "Access-Control-Allow-Methods": 'GET'});
                var script = `${params[1]}(${data.toString()})`;
                  response.write(script);
                response.end();
            }) // Access-Control-Allow-Methods
          } else if(pathname==="/image"){
              fs.readFile(`${__dirname}/src/images/me.jpg`,function(err, data){
                  console.log(response);
                  response.writeHead(200, {'Content-Type': 'image/jpeg',"Access-Control-Allow-Methods": 'GET'});
                  var script = params[1]+"("+data.toString()+")";
                  console.log(params);
                  response.write(script);
                  response.end();
              })
          } else if(pathname==="/json"){
            fs.readFile(`${__dirname}/src/index.json`,function(err, data){
                response.writeHead(200, {'Content-Type': 'application/json', "Access-Control-Allow-Methods": 'GET'});
                var script = `${params[1]}(${data.toString()})`;
                response.write(script);
                response.end();
            })
        }
        }).listen(8080, '127.0.0.2');
      ```

## 2.10 stream流

* 在 Node.js 中有四种基本的流类型：Readable（可读流），Writable（可写流），Duplex（双向流），Transform（转换流）。

  * 可读流是数据可以被消费的源的抽象。一个例子就是 fs.createReadStream 方法。
  * 可读流是数据可以被写入目标的抽象。一个例子就是 fs.createWriteStream 方法。
  * 双向流即是可读的也是可写的。一个例子是 TCP socket。
  * 转换流是基于双向流的，可以在读或者写的时候被用来更改或者转换数据。一个例子是 zlib.createGzip 使用 gzip 算法压缩数据。你可以将转换流想象成一个函数，它的输入是可写流，输出是可读流。

* 常见事件

  >这里有一个被可读流和可写流使用的重要事件和函数列表：

  Readable Streams

      Events
        - data
        - end
        - error
        - close
        - readable
      Functions
        - pipe(), unpipe()
        - read(), unshift(), resume()
        - pause(), isPaused()
        - setEncoding()

  Writable Streams

      Events
        - drain
        - finish
        - error
        - close
        - pipe/unpipe
      Functions
        - write()
        - end()
        - cork(), uncork()
        - setDefaultEncoding()

* 写流事件

  * Close事件
    当流或其底层资源（比如文件描述符）被关闭时触发。 表明不会再触发其他事件，也不会再发生操作。
  * Drain事件
    当可以继续写入数据到流时会触发 'drain' 事件。
  * Finish事件
    当所有的数据都写入到底层系统中时会触发
  * Pipe事件
    当在可读流上调用 stream.pipe() 方法时会发出 'pipe' 事件，并将此可写流添加到其目标集。
  * Error事件
    如果在写入或管道数据时发生错误，则会触发 'error' 事件。 当调用时，监听器回调会传入一个 Error 参数。
* 读流事件
  * Close事件
    当流或其底层资源（比如文件描述符）被关闭时触发。 表明不会再触发其他事件，也不会再发生操作。
  * data事件
    当流将数据块传送给消费者后触发。
  * readable事件
    当有数据可从流中读取时，就会触发 'readable' 事件。 
  * end事件
    'end' 事件只有在数据被完全消费掉后才会触发。
  * Error事件
    如果在读取或管道数据时发生错误，则会触发 'error' 事件。 当调用时，监听器回调会传入一个 Error 参数。
* 读取数据流的暂停和流动
  >所有可读流默认都是以暂停模式开始的
  * 可读流有两个主要模式影响到我们消费它们的方式：

    暂停模式（paused）

    流动（flowing）模式 

  * 三种方法可以让暂停态转为流动态：

    添加data事件的监听函数

    调用resume方法

    调用pipe方法将数据送往一个可写数据流

  
## 2.11 Zlib模块

  >zlib 模块提供通过 Gzip 和 Deflate/Inflate 实现的压缩功能，Brotli 也是如此。

  ```js
    const zlib = require("zlib");
    console.log(zlib);

  { 
    Deflate:
    { [Function: Deflate] super_: { [Function: Zlib] super_: [Function] } },
    Inflate:
    { [Function: Inflate] super_: { [Function: Zlib] super_: [Function] } },
    Gzip:
    { [Function: Gzip] super_: { [Function: Zlib] super_: [Function] } },
    Gunzip:
    { [Function: Gunzip] super_: { [Function: Zlib] super_: [Function] } },
    DeflateRaw:
    { [Function: DeflateRaw] super_: { [Function: Zlib] super_: [Function] } },
    InflateRaw:
    { [Function: InflateRaw] super_: { [Function: Zlib] super_: [Function] } },
    Unzip:
    { [Function: Unzip] super_: { [Function: Zlib] super_: [Function] } },
    deflate: [Function: asyncBufferWrapper],
    deflateSync: [Function: syncBufferWrapper],
    gzip: [Function: asyncBufferWrapper],
    gzipSync: [Function: syncBufferWrapper],
    deflateRaw: [Function: asyncBufferWrapper],
    deflateRawSync: [Function: syncBufferWrapper],
    unzip: [Function: asyncBufferWrapper],
    unzipSync: [Function: syncBufferWrapper],
    inflate: [Function: asyncBufferWrapper],
    inflateSync: [Function: syncBufferWrapper],
    gunzip: [Function: asyncBufferWrapper],
    gunzipSync: [Function: syncBufferWrapper],
    inflateRaw: [Function: asyncBufferWrapper],
    inflateRawSync: [Function: syncBufferWrapper],
    createDeflate: [Function: value],
    createInflate: [Function: value],
    createDeflateRaw: [Function: value],
    createInflateRaw: [Function: value],
    createGzip: [Function: value],
    createGunzip: [Function: value],
    createUnzip: [Function: value],
    ...
  }
  ```
  >压缩（例如一个文件）通过zlib流将源数据流传输到目标中来完成
  方法一：
  ```js x
  const zlib = require("zlib");
  const gzip = zlib.createGzip();
  const fs = require("fs");
  const inp = fs.createReadStream('test.txt');
  const out = fs.createWriteStream('testtxt.gz');
  inp.pipe(gzip)
    .on('error', ()=>{
      console.log("数据发送至压缩包源数据错误");
    })
    .pipe(out)
    .on('error', ()=>{
      console.log("数据发送至压缩包源数据错误");
    })
  ```
  方法二：
  ```js
  const zlib = require("zlib");
  const fs = require('fs');
  fs.createReadStream('test.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('text.zip'));
  ```
  >压缩和解压缩对象都是一个可读可写流

  | 方法 | 说明   |
  | ---  | :----: |
  | zlib.createGzip | 返回Gzip流对象，使用Gzip算法对数据进行压缩处理 |
  | zlib.createGunzip | 返回Gzip流对象，使用Gzip算法对压缩的数据进行解压缩处理 |
  | zlib.createDeflate | 返回Deflate流对象，使用Deflate算法对数据进行压缩处理 |
  | zlib.createInflate | 返回Deflate流对象，使用Deflate算法对数据进行解压缩处理 |
  |zlib.createBrotliDecompress|返回Compress流对象，使用br算法对数据进行解压| 
  |zlib.createBrotliCompress|返回Compress流对象，使用br算法对数据进行压缩| 

  ```js
  const zlib = require("zlib");
  const fs = require('fs');
  fs.createReadStream('test.zip')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('text.txt'));
  ```
* 压缩之http

  >zlib 模块可以用来实现对 HTTP 中定义的 gzip 和 deflate 内容编码机制的支持。
  * HTTP 的 Accept-Encoding 消息头用来标记客户端接受的压缩编码。
  * Content-Encoding 消息头用于标识实际应用于消息的压缩编码。
  
  客户端
  ```js
  const zlib = require('zlib');
  const http = require('http');
  const fs = require('fs');
  const request = http.get({
    host: 'http://127.0.0.1/',
    path: '/',
    port: '8080',
    headers: {'Accept-Encoding': 'gzip,deflate'}
  })
  request.on('response', (response)=>{
    const output = fs.createWriteStream('example.com_index.html');
    switch(response.headers['content-encoding']){
      case 'br':
        response.pipe(zlib.createBrotliDecompress()).pipe(output);
        break;
      case 'gzip':
        response.pipe(zlib.createGunzip()).pipe(output);
        break;
      case 'deflate':
        response.pipe(zlib.createInflate).pipe(output);
        break;
      default:
        response.pipe(output);
    }
  });
  ```
  服务端
  ```js
  const zlib = require("zlib");
  const http = require("http");
  const fs = require("fs");
  http.createServer((req, resp) => {
    const raw = fs.createReadStream('lines.txt');

    resp.setHeader('Vary: Accept-Encoding');
    let acceptEncoding = request.headers['accept-encoding'];
    if (!acceptEncoding) {
        acceptEncoding = '';
    }

    if(/\bdeflate\b/.test(acceptEncoding)){
      resp.writeHead(200, {'Content-Encoding': 'deflate'})
      raw.pipe(zlib.createDeflate()).pipe(resp);
    } else if(/\bgzip\b/.test(acceptEncoding)){
      resp.writeHead(200, {'Content-Encoding': 'gzip'})
      raw.pipe(zlib.createGzip()).pipe(resp);
    } else if(/\bbr\b/.test(acceptEncoding)){
      resp.writeHead(200, {'Content-Encoding': 'br'})
      raw.pipe(zlib.createBrotliCompress()).pipe(resp);
    } else {
      resp.writeHead(200, {});
      raw.pipe(resp);
    }

  }).listen(8080);
  ```
## 2.12 Crypto模块

  >crypto 模块提供了加密功能，包括对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装

  ```js
  const crypto = require('crypto');
  console.log(crypto.getHashes())

  [ 'RSA-MD4',
  'RSA-MD5',
  'RSA-MDC2',
  'RSA-RIPEMD160',
  'RSA-SHA1',
  'RSA-SHA1-2',
  'RSA-SHA224',
  'RSA-SHA256',
  'RSA-SHA384',
  'RSA-SHA512',
  'blake2b512',
  'blake2s256',
  'md4',
  'md4WithRSAEncryption',
  'md5',
  'md5-sha1',
  'md5WithRSAEncryption',
  'mdc2',
  'mdc2WithRSA',
  'ripemd',
  'ripemd160',
  'ripemd160WithRSA',
  'rmd160',
  'sha1',
  'sha1WithRSAEncryption',
  'sha224',
  'sha224WithRSAEncryption',
  'sha256',
  'sha256WithRSAEncryption',
  'sha384',
  'sha384WithRSAEncryption',
  'sha512',
  'sha512WithRSAEncryption',
  'ssl3-md5',
  'ssl3-sha1',
  'whirlpool' ]
  ```
  >输出以等号分隔，分别是算法名、时间、密文。每一种算法所输出的密文长度和时间都是不一样的
  有几个方法需要注意：
  Update:添加数据
  Digest:编码格式，一般以16进制为主
  ```js
  const crypto = require('crypto');
  const fs = require("fs");

  function hashAlgorithm(algorithm){
    var s1 = new Date();
    var filename = "lines.txt";
    var txt = fs.ReadStream(filename);
    var shasum = crypto.createHash(algorithm);
    txt.on('data', function(d){
      shasum.update(d);
    })
    txt.on('end', function(){
      var d = shasum.digest('hex');
      var s2 = new Date();
      console.log(algorithm + ' = '+ (s2-s1)+'ms = '+ d)
    })
  }

  function doHash(hashs){
    hashs.forEach(name => {
      hashAlgorithm(name);
    });
  }

  var algs = crypto.getHashes();

  doHash(algs);
  ```
>Crypto模块之加密和解密算法
  ```js
  const crypto = require('crypto'),
        fs = require('fs'); // 引入基本模块
  // 加密
  /*
    @parma 加密算法函数
    @algorithm 算法类型
    @key 密钥
    @buf buffer数据
    #cb 回调函数
  */
  function cipher(algorithm, key, buf, cb){
		var encrypted = ""; // 加密通道
		console.log(buf, 22222222222222222222222222222222);
    var cip = crypto.createCipher(algorithm, key);//创建一个密码
    encrypted += cip.update(buf, 'utf8', 'hex');//添加二进制的原始buffer转成16进制的值
    encrypted += cip.final('hex'); //最后统一变成16进制
    cb(encrypted);//把获取的最终密值输入回调
  }
  // 解密
  /*
    @parma 解密算法函数
    @algorithm 算法类型
    @key 密钥
    @encrypted 已经加密后的数据
    #cb 回调函数
  */
  function decipher(algorithm, key, encrypted, cb){
		var decrypted = ""; 
		
    var decipher = crypto.createDecipher(algorithm, key);//创建解密通道
    decrypted += decipher.update(encrypted, 'hex', 'utf8');//往解码通道中添加加密的数据
		decrypted += decipher.final('utf8'); //解码通道最后输出二进制数据
    cb(decrypted);//讲解码后的数据 传入进回调函数
  }
  /*
    @parma 加密解密函数
    @filename 源数据文件名称地址
    @algorithm 加解密算法
    @key 密钥
  */
  function cipherDecipherFile(filename, algorithm, key){
    fs.readFile(filename, 'utf-8', function(err, data){
      if(err) throw err;
			var s1 = new Date();
      cipher(algorithm, key, data, function(encrypted){
				
        var s2 = new Date();
        console.log('cipher:' + algorithm + ',' + (s2-s1) + 'ms = ' + encrypted);
        // 计算总加密时间
        decipher(algorithm, key, encrypted, function(txt){
					
          var s3 = new Date();
          console.log('decipher:'+algorithm+','+(s3-s2)+'ms = ' + txt);
          //计算总解密时间
        })
      })
    })
  }

  var algs = ['blowfish', 'aes-256-cbc', 'cast', 'des', 'des3', 'idea', 'rc2', 'rc4', 'seed'];
  var key = 'abc';
  var filename = "./lines.txt";
  algs.forEach(function(name){
    cipherDecipherFile(filename, name, key);
  })
  ```

## 2.13 爬虫技术1

* request
  >request是一个函数，函数内部拥有很多的方法
  npm  install request --save

  ```js
  const request = require("request");
  console.log(request);

  { [Function: request]
  get: [Function],
  head: [Function],
  options: [Function],
  post: [Function],
  put: [Function],
  patch: [Function],
  del: [Function],
  delete: [Function],
  jar: [Function],
  cookie: [Function],
  defaults: [Function],
  forever: [Function],
  Request:
  { 
    [Function: Request]
    super_:{ 
      [Function: Stream]
      super_: [Function],
      Readable: [Function],
      Writable: [Function],
      Duplex: [Function],
      Transform: [Function],
      PassThrough: [Function],
      pipeline: [Function: pipeline],
      finished: [Function: eos],
      Stream: [Circular],
      _isUint8Array: [Function: isUint8Array],
      _uint8ArrayToBuffer: [Function: _uint8ArrayToBuffer] 
    },
    debug: undefined,
    defaultProxyHeaderWhiteList:
    [ 
      'accept',
      'accept-charset',
      'accept-encoding',
      'accept-language',
      'accept-ranges',
      'cache-control',
      'content-encoding',
      'content-language',
      'content-location',
      'content-md5',
      'content-range',
      'content-type',
      'connection',
      'date',
      'expect',
      'max-forwards',
      'pragma',
      'referer',
      'te',
      'user-agent',
      'via' 
    ],
    defaultProxyHeaderExclusiveList: [ 'proxy-authorization' ] },
    initParams: [Function: initParams],
    debug: [Getter/Setter] 
  }
  ```
  >body内容就是响应主体部分，除了文本类的数据，其他基本都是乱码。

  ```js
  const request=require("request");
  request({
    // 基本请求基本信息
    method: "GET",
		url: "https://mtl.gzhuibei.com/images/img/2132/1.jpg",
		headers:{
			"user-Agent": "",
			"Accept": "",
		}
  }, function(err, res, body){
		// 请求的回调函数，
		// err,错误信息
		// res,响应信息
		// body,返回的响应数据
    console.log(res);
  })
  ```
* JSDOM

  https://github.com/jsdom/jsdom/wiki/jsdom-%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3

  >使用 jsdom，主要用到jsdom主模块的一个命名导出的 jsdom 构造函数。往构造器传递一个字符串，将会得到一个 jsdom 构造实例对象，这个对象有很多实用的属性，特别是 window 对象:
  ```js
  const request=require("request");
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  request({
    // 基本请求基本信息
    method: "GET",
		url: "https://www.meitulu.com/item/2132.html",
  }, function(err, res, body){
		const dom = new JSDOM(body);
		dom.window.document.querySelectorAll("center>img").forEach(function(item){
			console.log(item.src);
		});
  })
  ```
>正则表达式的学习地址: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions

>在线测试工具: https://tool.oschina.net/regex



