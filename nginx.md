[toc]
# 一、nginx反向代理
## 1.1 概念
>客户端本来可以直接通过HTTP协议访问某网站应用服务器，如果网站管理员在中间加上一个Nginx，客户端请求Nginx，Nginx请求应用服务器，然后将结果返回给客户端，此时Nginx就是反向代理服务器。
```js
server {
	listen 80;
	location / {
		proxy_pass http://192.168.0.112:8080; # 应用服务器HTTP地址
	}
}
```
## 1.2 常用命令
  ```js
  start nginx //开户
  nginx -s reload // 重启

  netstat -ano // 查询所有端口号
  netstat -tlnp // 查看端口号
  netstat -aon|findstr "80" // 查看PID(49157是端口)
  tasklist|findstr "2720" // 查看哪个进程占用的PID(2720是PID)
  taskkill /f /t /im Tencentdl.exe // 结束Tencentdl.exe进程

  nginx -s quit // 温和关闭方法，需要进程完成当前工作后再关闭
  nginx -s stop // 强硬关闭方法
  killall nginx // 更粗暴的直接杀死进程


  systemctl stop nginx.service // systemctl属于linux命令
  systemctl start nginx.service

  ps aux | grep nginx // 查看启动后记录
  systemctl restart nginx.service // 重启
  
  ```
## 1.3 nginx.conf文件结构
* 1、全局块：配置影响nginx全局的指令。一般有运行nginx服务器的用户组，nginx进程pid存放路径，日志存放路径，配置文件引入，允许生成worker process数等。
* 2、events块：配置影响nginx服务器或与用户的网络连接。有每个进程的最大连接数，选取哪种事件驱动模型处理连接请求，是否允许同时接受多个网路连接，开启多个网络连接序列化等。
* 3、http块：可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。如文件引入，mime-type定义，日志自定义，是否使用sendfile传输文件，连接超时时间，单连接请求数等。
* 4、server块：配置虚拟主机的相关参数，一个http中可以有多个server。
* 5、location块：配置请求的路由，以及各种页面的处理情况。
```js
...              #全局块

events {         #events块
   ...
}

http      #http块
{
    ...   #http全局块
    server        #server块
    { 
        ...       #server全局块
        location [PATTERN]   #location块
        {
            ...
        }
        location [PATTERN] 
        {
            ...
        }
    }
    server
    {
      ...
    }
    ...     #http全局块
}
```
## 1.4 nginx的基本配置详解
> 几个常见配置项：
* 1.$remote_addr 与 $http_x_forwarded_for 用以记录客户端的ip地址；
* 2.$remote_user ：用来记录客户端用户名称；
* 3.$time_local ： 用来记录访问时间与时区；
* 4.$request ： 用来记录请求的url与http协议；
* 5.$status ： 用来记录请求状态；成功是200；
* 6.$body_bytes_s ent ：记录发送给客户端文件主体内容大小；
* 7.$http_referer ：用来记录从那个页面链接访问过来的；
* 8.$http_user_agent ：记录客户端浏览器的相关信息；
```js
########### 每个指令必须有分号结束。#################
#user administrator administrators;  #配置用户或者组，默认为nobody nobody。
#worker_processes 2;  #允许生成的进程数，默认为1
#pid /nginx/pid/nginx.pid;   #指定nginx进程运行文件存放地址
error_log log/error.log debug;  #制定日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
events {
    accept_mutex on;   #设置网路连接序列化，防止惊群现象发生，默认为on
    multi_accept on;  #设置一个进程是否同时接受多个网络连接，默认为off
    #use epoll;      #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
    worker_connections  1024;    #最大连接数，默认为512
}
http {
    include       mime.types;   #文件扩展名与文件类型映射表
    default_type  application/octet-stream; #默认文件类型，默认为text/plain
    #access_log off; #取消服务日志    
    log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for'; #自定义格式
    access_log log/access.log myFormat;  #combined为日志格式的默认值
    sendfile on;   #允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。
    sendfile_max_chunk 100k;  #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
    keepalive_timeout 65;  #连接超时时间，默认为75s，可以在http，server，location块。

    upstream mysvr {   
      server 127.0.0.1:7878;
      server 192.168.10.121:3333 backup;  #热备
    }
    error_page 404 https://www.baidu.com; #错误页
    server {
        keepalive_requests 120; #单连接请求上限次数。
        listen       4545;   #监听端口
        server_name  127.0.0.1;   #监听地址       
        location  ~*^.+$ {       #请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写。
           #root path;  #根目录
           #index vv.txt;  #设置默认页
           proxy_pass  http://mysvr;  #请求转向mysvr 定义的服务器列表
           deny 127.0.0.1;  #拒绝的ip
           allow 172.18.5.54; #允许的ip           
        } 
    }
}
```
## 1.5 实际用法

  server {
        listen       80;
        server_name  localhost;
        location / {
            proxy_pass http://127.0.0.1:8080;
        }
        location /api {
            #rewrite ^/api(.*)  http://127.0.0.1:8081$1 break;   #永久重定向到http://www.myweb.com网址上&1是匹配的uri
            #return 307;
            rewrite ^/api/(.*)$ /$1 break;
            proxy_pass http://127.0.0.1:8082;
            proxy_set_header   X-Forwarded-Proto $scheme;
            proxy_set_header   Host              $http_host;
            proxy_set_header   X-Real-IP         $remote_addr;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

# 二、nginx负载均衡
## 2.1 概念
>当网站访问量非常大,网站越来越慢，一台服务器已经不够用了。于是将相同的应用部署在多台服务器上，将大量用户的请求分配给多台机器处理。作用：减小服务器压力，并且其中某台服务器出了问题也不会影响用户正常使用。
>Nginx可以通过反向代理来实现负载均衡。
## 2.2 实际用法
  ```js
    upstream myweb {
      server 192.168.0.111:8080; # 应用服务器1
      server 192.168.0.112:8080; # 应用服务器2
    }
    server {
      listen 80;
      location / {
        proxy_pass http://myweb;
      }
    }
  ```
# 三、虚拟主机
## 3.1 概念
>有的网站，由于访问量太小，需要节省成本，将多个网站部署在同一台服务器上。
## 3.2 实际用法
>另外，server_name配置还可以过滤有人恶意将某些域名指向你的主机服务器。

>在服务器8080和8081分别开了一个应用，客户端通过不同的域名访问，根据server_name可以反向代理到对应的应用服务器。

>虚拟主机的原理是通过HTTP请求头中的Host是否匹配server_name来实现的，有兴趣的同学可以研究一下HTTP协议
```js
server {
	listen 80 default_server;
	server_name _;
	return 444; # 过滤其他域名的请求，返回444状态码
}
server {
	listen 80;
	server_name www.aaa.com; # www.aaa.com域名
	location / {
		proxy_pass http://localhost:8080; # 对应端口号8080
	}
}
server {
	listen 80;
	server_name www.bbb.com; # www.bbb.com域名
	location / {
		proxy_pass http://localhost:8081; # 对应端口号8081
	}
}
```
# 四、静态HTTP服务器
## 4.1概念
>Nginx是一个HTTP服务器，可以将服务器上的静态文件（如HTML、图片）通过HTTP协议展现给客户端。
```js
server {
	listen 80; # 端口号
	location / {
		root /usr/share/nginx/html; # 静态文件路径
	}
}
```
 