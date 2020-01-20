[一、nginx反向代理](#一、nginx反向代理)
- [1.1 概念](#11-概念)
- [1.2 常用命令](#12-常用命令)
- [1.3 实际用法](#13-实际用法)
[二、nginx负载均衡](#一、nginx负载均衡)
- [2.1 概念](#21-概念)
- [2.2 常用命令](#22-常用命令)
- [2.3 实际用法](#23-实际用法)

# 一、nginx反向代理
## 1.1 概念
 *
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
## 1.3 常用指令

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

  >如果执行的是当前模块，那么require.main === module
common.js运行机制，输入的是输出值的拷贝如：

# 二、nginx反向代理
## 2.1 概念
 *
## 2.2 常用命令
  ```js
  ```
## 2.3 常用指令

  >如果执行的是当前模块，那么require.main === module
common.js运行机制，输入的是输出值的拷贝如：

  


