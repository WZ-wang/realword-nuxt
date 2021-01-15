部署成功的服务器地址：http://117.50.9.10:3000/



简单部署操作步骤
1，连接服务器 ssh root@外网ip
2，通过mkdir创建文件夹，用来存储打包的文件，pwd 得到 存储地址
3，断开连接 exit , 通过scp 打包的文件地址 root@外网ip:存储地址
4，连接服务器，通过unzip解压zip格式的文件，ls查看文件目录
5，第一次可能需要安装node环境，然后在npm i ，npm run start
6，全局安装pm2利于管理 ，也可以通过pm2 start启动，pm2 list查看情况，pm2 stop id 停止服务等操作
7，无用文件可以通过rm -rf 删除文件的地址 直接删除


github上面实现自动部署
1，先把自己的项目放到github仓库里
2，在Settings/Developer settings/Personal access tokens里为这个项目生成一个TOKEN(也可以起别的名字，不过要对.github/worflows/main.yml里的进行相应修改)
3，在项目的settings里的secrets添加HOST,PASSWORD,PORT,TOKEN,USERNAME,(服务器的用户名密码等)，主要在.github/worflows/main.yml里使用
4，自动部署需要git tag v0.1.0生成一个tag，然后git push origin v0.1.0就可以了
5，需要更新只需添加一个tag ，然后在push这个tag就行了
6，git tag 查看当前所有的tag ，git tag -d v1.0加git push origin :refs/tags/v1.0可以删除tag



注意：
服务器设有防火墙需要进行配置，在控制台设置外网防火墙的开放端口（例如：3000），在服务器内部通过以下操作
# 1.查看防火墙状态
systemctl status firewalld.service
# 2.开启防火墙
systemctl start  firewalld.service
# 3.开放3306端口
firewall-cmd  --zone=public  --add-port=3000/tcp  --permanent
# 4.重启防火墙使新设置生效
firewall-cmd  --reload
# 5.查看已经打开放的端口
firewall-cmd  --list-ports
两个地方都配置完成就可以通过外网ip使用这个3000端口了，详情可以查看https://gitee.com/lagoufed/fed-e-questions/blob/master/part3/%E5%86%99%E7%BB%99%E5%89%8D%E7%AB%AF%E7%9A%84%E8%BF%9C%E7%A8%8B%E8%BF%9E%E6%8E%A5%20MySQL%20%E6%95%B0%E6%8D%AE%E5%BA%93.md




内容笔记在平时练习代码中