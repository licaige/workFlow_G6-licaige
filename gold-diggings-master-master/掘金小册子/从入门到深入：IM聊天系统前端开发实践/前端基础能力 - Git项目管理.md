# Git项目管理

![](https://user-gold-cdn.xitu.io/2019/2/13/168e4fc8087a6890?w=910&h=380&f=png&s=5734)

## 前言

和大家一起学习探讨下 Git 的内部原理，Git 基本操作，Git的版本管理策略， 最后会和大家通过一些场景问题，学习 Git 的常用黑科技, 例如：`cherry-pick`，`patch`，`reset vs revert`。

### Git项目管理源码地址

> 源码地址：[https://github.com/dkypooh/front-end-develop-demo/tree/master/base/git/git-resp](https://github.com/dkypooh/front-end-develop-demo/tree/master/base/git/git-resp)

**PS:** 查看隐藏文件夹 `.git`

### 一句话理解Git(面试专用)

Git 的每个分支的管理类似于链表，每次提交都会产生一个 SHA1 的唯一标识符，此唯一标识符是引用的指针，后续的增删改查操作都可以基于这个指针进行索引操作。

**关键字：分布式，四个分区，链表，SHA1指针**

### 通过本章读者可以学习了解到什么？

1.  git 的核心原理，四个分区差异，代码的不同状态在四个分区流转的规则。
2.  如何修改 git 的基本信息, 用户名，远端仓库地址
3.  如何删除及忽略 git 已经提交的资源
4.  git reset 和 git revert 的区别
5.  git pull 和 git pull --rebase 的区别
6.  git 版本管理策略模型

## 认识Git

### Git简史

同生活中的许多伟大事物一样，Git 诞生于一个极富纷争大举创新的年代。

Linux 内核开源项目有着为数众多的参与者。 绝大多数的 Linux 内核维护工作都花在了提交补丁和保存归档的繁琐事务上（1991－2002年间）。 到 2002 年，整个项目组开始启用一个专有的分布式版本控制系统 BitKeeper 来管理和维护代码。

### 版本管理策略

![image.png](https://user-gold-cdn.xitu.io/2019/1/23/168766ec461a0e9f?w=1540&h=670&f=png&s=134964)

**master分支：** 一般会以此分支为主分支（发布分支）。主分支的意思是说开发者不会在主分支上开发， 主分支只接受外分支的合并。合并完之后，验证通过，打 `tag` 上线。

**develop分支：** 作为日常开发分支，同时会有多人在上面提交代码，为了保证提交不冲突，尽量保证模块拆解合理，开发过程中没有多位开发者同时修改同一文件的情况。

**feture\_a 到 feture\_n分支：** 这些分支是发布之后的 bug 修复分支，不同开发者产生的 bug，会不同分支上修复 bug，最终合并到 master 分支上上线。

## Git核心概念及原理

Git 是分布式版本控制系统，SVN 是集中化版本控制系统。 Git 取代了 SVN 作为当前最好的版本管理工具。

**SVN缺点:** SVN 集中化版本控制系统虽然能够令多个团队成员一起协作开发，但有时如果中央服务器宕机的话，谁也无法在宕机期间提交更新和协同开发。甚至有时，中央服务器磁盘故障，恰巧又没有做备份或备份没及时，那就可能有丢失数据的风险。

### Git 四个工作区

Git 的文件操作原理都是基于 `Workspace` （工作区），`Index / Stage` （暂存区）, `Repository` （仓库区） 和 `Remote`（远程仓库）四个工作区来进行流转。

![image.png](https://user-gold-cdn.xitu.io/2019/1/23/168766ec478de231?w=1578&h=693&f=png&s=145032)

**Workspace工作区：** 平时存放编辑项目代码的空间

**Index / Stage暂存区：** 用于临时存放你的改动，事实上它只是一个文件，保存即将提交到文件列表信息

**Repository仓库区（或版本库）：** 就是安全存放数据的位置，这里面有你提交到所有版本的数据。其中 HEAD 指向最新放入仓库的版本

**Remote远程仓库：** 托管代码的服务器。例如 Github 的代码远端代码托管服务器

#### 操作说明

1.  `pull` 操作，Git 会从 远端仓库 到 工作区
2.  `fetch/clone` 操作，Git 会从 远端仓库 到 版本仓库
3.  `add` 操作，Git 会从 工作区 到 暂存区
4.  `commit` 操作，Git 会从 暂存区 到 版本仓库

例如我们一次完整的提交 `add --> commit --> push` 经历的工作区变化就是

> 工作区 --> 缓存区 --> 本地仓库区 --> 远端仓库

### Git内部构造

要理解 Git 内部构造的核心，我们应理解三个东西：**实体（objects）、引用（refs）、索引(index)。**，这些都会在 Git 的 `.git` 文件结构目录下找到对应的目录。

![image.png](https://user-gold-cdn.xitu.io/2019/1/23/168766ec4788277e?w=1740&h=694&f=png&s=227446)

**实体：** 提交到一个 Git 代码仓库中的所有文件，包括每个提交的说明信息（the commit info）都在目录 `.git/objects/` 中存储为实体。一个实体以一个 40 字符长度的字符串（该实体内容的 SHA1 哈希值）来标识。

**引用：** Git 中，一个分支（branch）、远程分支（remote branch）或一个标签（tag）（也称为轻量标签）仅是指向一个实体的一个指针，这里的实体通常是一个 commit 实体。这些引用以文本文件的形式存储在目录 `.git/refs/` 中。

**索引：** 索引是一个暂存区，以二进制文件的形式存储为文件 `.git/index`。当 git add 一个文件，Git 将该文件的信息添加到索引中。当 git commit，Git 仅提交索引文件中列出的文件。

## Git初始化

### Git授权SSH

大多数 Git 服务器都会选择使用 SSH 公钥来进行授权。在 Github 或者 Gitlab 上提交代码，我们需要把 SSH 公钥复制托管到Github的

> personal setting -> ssh keys

#### 生成 SSH-Key 方法

```
# 进入ssh目录
cd ~/.ssh               
# 生成ssh公私钥
ssh-keygen              
# 复制ssh公钥
cat ~/.ssh/id_rsa.pub   

```

### 仓库基本操作

```
# 在当前目录新建一个Git代码库
git init                        

# 新建一个目录，将其初始化为Git代码库
git init <project-name>         

# clone git仓库
git clone <git-hub-url>  

# [高阶用法] clone git仓库并且制定分支
git clone <url> -b <branch>     

```

### Git忽略不应该跟踪的文件

`.gitignore` 文件显式地指定了哪些文件不应被 Git 追踪，即被 Git 忽略掉。例如开发过程中 node\_module，.vscode 等文件不需要被跟踪和提交，可以在初始化的忽略它们。

```
# .gitignore 文件
node_module
.vscode

```

## Git配置

### 修改用户信息

```
# 配置信息列表
git config --list         

# 设置用户名
git config --global user.name "John Doe"   

# 设置邮箱
git config --global user.email johndoe@example.com  

```

### 设置不同的仓库源

```
# 查看帮助
git remote --help                   

# 查看不同源
git remote  

# 添加不同地址的源，并取一个别名
git remote add [name] [url]    

# 删除一个源
git remote remove [name]           

```

## Git基本操作

### 操作一次完整提交流程

当文件修改时，需要把本地仓库提交到远端仓库上面，一次完整提交路径： **工作区 --> 缓存区 --> 本地仓库区 --> 远端仓库**

```
# 修改readme文件，文件在工作区
vi readme.md                

# 文件进入缓存区，缓存区的文件可以被checkout移除到工作区
git add readme.md  

# 文件进入提交分支，但还是在本地
git commit 'add readme'  

# 提交分支 push 到远端分支
git push origin master      

```

### 操作一次完整更新流程

多人协同开发过程中，开发者随时需要更新本地仓库代码，始终保持本地代码处于最新状态。 本小节会介绍更新本地代码的具体操作， `git pull`，`git fetch`， `git pull --rebase`具体操作，以及他们之间的差异。

*   git pull : git fetch + git merge
*   git pull --rebase: git fetch + git rebase

![image.png](https://user-gold-cdn.xitu.io/2019/1/23/168766ec47ac0aff?w=1502&h=738&f=png&s=127234)

### 分支管理

本小节介绍如何创建一个分支，如何删除一个本地分支和远端分支。

**注意：本地分支删除了，并不代表远端分支删除。如何定期清理远端分支。**

```
# 已当前分支为基础，创建daily/0.0.1分支
git checkout -b daily/0.0.1            

# 查看本地分支及远端分支
git branch -la  

# 强制删除本地分支
git branch -D [branchName]  

# 删除已经Merge过的分支
git branch -d [branchName]    

# 创建一个分支
git checkout -b daily/0.0.1  

# 如何删除远端多余分支
# 大多数情况remote_name为origin
git push -delete <remote_name> <branchName> 

```

### Git提交信息检查

```
# 查看当前工作区改动点
git diff                               

# 提交hash1和hash2的差异
git diff commit_hash1 commit_hash2 

# 分支a和b的差异
git diff branch_a branch_b   

# 当前改动文件
git status     

# 查看提交历史
git log                

# 提交历史缩减一行查看，主要是提交Hash值
git log --pretty=oneline              

```

## Git高阶操作(黑科技)

### merge, cherry-pick和patch使用及差别

多人协同开发中我们需要合并别人的代码（或者pick别人的部分代码），使本地分支代码达到理想最新状态。Git提供了三种合并的方式，后两者操作属于高阶操作，初学者很少知道如何使用以及他们的差别。

下图列举了三种操作的使用场景和差异，并且举例了具体操作实例。

![image.png](https://user-gold-cdn.xitu.io/2019/1/23/168766ec481a11a1?w=1356&h=714&f=png&s=168876)

### 删除 Git 缓存文件

**场景：** 有些情况开发者把原有不需要提交的代码提交到了远端仓库，再使用.gitignore忽略文件不生效。哪怕我们删除后再提交也没有办法忽略。这种情况下我们应该怎么解决？

**方法：** 我们可以使用git rm --cache 删除原来git跟踪的文件缓存，再在.gitignore里面添加忽略文件

```
## 当我们需要删除暂存区或分支上的文件, 同时工作区也不需要这个文件了, 可以使用
git rm file_path 

## 当我们需要删除暂存区或分支上的文件, 但本地又需要使用, 只是不希望这个文件被版本控制, 可以使用
# PS: file_path 为文件路径
git rm --cached file_path       

```

### 如何强制提交

**场景：** 对于多人协作开发，有些时候我们会遇到版本管理混乱的情况，例如：远端版本错误了，但本地版本是正确的。 如何才能让强制更新远端版本，保持和本地工作区环境一样？

**方法：** 强制push本地正确的版本，但是慎用。因为它是不可逆转的。

```
# 强制更新，慎用
git push origin master --force  

```

### revert 和 reset区别

**场景：** 有些时候开发者需要退回到某次正确的提交记录，有些时候开发者的commit错误了，这时候可以使用 git revert 和 git reset。

*   git revert： 撤销某次操作，此次操作之前的commit都会被保留。
*   git reset ： 撤销某次提交，但是此次之后的修改都会被退回到暂存区。

```
# 强制回退到某次提交，且需要强制提交
git reset ——hard commit_hash 
git push origin master --force 

# 回退到某提提交，保存提交commit记录, 重新commit
git revert commit_hash
git add .
git commit -m "revert"
git push origin master

```

### 创建Tag，如何以某个Tag创建分支

有时我们代码已经发布很长时间才发现了一个Bug，同时当前开发分支又有需求在开发，如何以之前发布版本的节点开分支修复问题，这样就可以使用 `Tag` 创建分支。

```
# 创建tag
# 创建标注标签
git tag -a daily/0.0.1 -m "add develop file" 

# 简单创建tag
git tag daily/0.0.1                                 

# 分享tag到远端
git push origin [tagname]
git push origin --tags 

# 如何已某个tag创建分支
git checkout -b <newbranch> <tagname>

```

### 已某个远端分支为基础分支，创建本地分支

默认情况创建一个分支是以远端的 Master 分支为基础，本地创建一个 Master 分支。如果我们想直接远端某个分支为基础创建相应本地分支，可以如下操作， 或者想本地某个分支创建一个新分支，可以如下操作：

```
# 本地从当前所在分支上创建一个新分支： 
git checkout -b 新分支名 

# 拉取远程某个分支到本地: 
git checkout -b 本地分支名 origin/远程分支名

```

### 子模块（submodule）的使用场景

在复杂工程项目中，可能会遇到在一个 Git 仓库中添加其他 Git 仓库的场景，Submodule是仓库的一份引用。 下文会涉及到基于 lerna 多仓库管理的情况下，lerna 会去链接各个仓库的依赖关系，但是各个仓库又是独立的，那么就需要 submodule 进行管理，具体操作如下：

```
# 添加子模块
git submodule add 仓库地址

# 更新子模块
git submodule update --remote 模块名称

## 删除子模块
1. git rm --cached 模块名称
2. 删除 .gitmodules 下相应子模块信息
3. 删除 .git/config 下相应子模块信息


```

## 结语

本章介绍的 Git 版本管理策略是一个最简单模型，原理上需要区分开发（日常），预发，线上环境三套环境。对于 Git 的版本管理需要根据具体场景具体分析。

欢迎在此 ISSUE 补充问题，完善场景解决方案。 [Git 版本管理场景及解决方案合集](https://github.com/dkypooh/front-end-develop-demo/issues/8)

学习资料下载地址：[学习资料](https://github.com/dkypooh/front-end-develop-demo/tree/master/download/)

下面一章将要学习 Lerna包管理, 大家需要提前了解下 Lerna 基本知识。

查看 Lerna 官网 [Lerna 官网](https://lernajs.io/)

## 思考题

Q: [Learning Git Branching网站](https://learngitbranching.js.org/)，完成一次完整的发布更新流程。

## 参考文档

*   [Git Pro Book](https://git-scm.com/book/zh/v2)
*   [Git workflow 问题集合](https://stackoverflow.com/search?q=git+workflow)
*   [常用 Git 命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
*   [Git远程操作详解](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)
*   [Learning Git Branching网站](https://learngitbranching.js.org/)