# shell 脚本编程详解

shell 脚本（shell script），是一种为 shell 编写的脚本程序，一般文件后缀为 `.sh`。

## 脚本解释器

`#!` 是一个约定的标记，它告诉系统这个脚本需要什么解释器来运行，即：使用哪一种 Shell。`#!`被称为[shebang（也称为 Hashbang）](https://zh.wikipedia.org/wiki/Shebang),例如使用 bash：`#! /bin/bash`

新建一个 test.sh 的文件，内容如下：

```
#!/bin/bash

echo "Hello World!"
```

## 运行 shell 脚本

### 第一种方式：作为可执行程序

1、当前 test.sh 是没有可执行权限的，首先使脚本文件具有执行权限。

```
# 使脚本文件具有执行权限
chmod +x ./test.sh
```

2、执行脚本

```
# 执行脚本，需注意要加目录的标识
./test.sh

# 也可以用 source 来执行脚本，跟上面的写法是等价的，但是不需要脚本具有执行权限
source ./test.sh
```

**注意：一定要写成 ./test.sh ,而不是 test.sh 。运行其他二进制的程序也是一样，直接写 test.sh，Linux 系统会去 PATH 中寻找有没有叫 test.sh 的，而只有 /bin, /sbin, /usr/bin, /usr/sbin 等在 PATH 中。你的当前目录通常不在 PATH 中，所以写成 test.sh 是找不到命令的，要用./test.sh 告诉系统，就在当前目录找。**

通过这种方式运行 bash 脚本，第一行一定要写对，好让系统（Shell 程序）查找到正确的解释器。如果是使用标准默认的 Shell，可以省去第一行。

#### 扩展：`source script.sh` 和 `./script.sh` 有什么区别?

这两种情况 script.sh 都会在 bash 会话中被读取和执行，不同点在于哪个会话执行这个命令。

对于 source 命令来说，命令是在当前的 bash 会话中执行的，因此当 source 执行完毕，对当前环境的任何更改（例如更改目录或是定义函数）都会留存在当前会话中。

单独运行 ./script.sh 时，当前的 bash 会话将启动新的 bash 会话（实例），并在新实例中运行命令 script.sh。因此，如果 script.sh 更改目录，新的 bash 会话（实例）会更改目录，但是一旦退出并将控制权返回给父 bash 会话，父会话仍然留在先前的位置（不会有目录的更改）。

同样，如果 script.sh 定义了要在终端中访问的函数，需要用 source 命令在当前 bash 会话中定义这个函数。否则，如果你运行 ./script.sh，只有新的 bash 会话（进程）才能执行定义的函数，而当前的 shell 不能。

### 第二种方式：作为解释器参数

直接运行解释器，其参数就是 Shell 脚本的文件名。

```
/bin/bash test.sh
```

这种方式运行的脚本，不需要在第一行指定解释器信息，写了也没用。

## 语法

### 1、注释

- 单行注释：以 `#` 开头，到行尾结束。
- 多行注释：以 `:<<EOF` 开头，到 `EOF` 结束

```
# 这是单行注释

:<<EOF
这是多行注释
这是多行注释
EOF
```

如果有段代码要频繁的注释和取消注释，可以用花括号括起来，定义成一个函数，没有地方调用这个函数，这块代码就不会执行，达到了和注释一样的效果。

### 2、变量

#### 变量类型

- **局部变量**：局部变量是仅在某个脚本内部有效的变量，它们不能被其他的程序和脚本访问。函数中能声明函数内部的局部变量。
- **环境变量**：环境变量是从父进程中继承而来的变量，对当前 Shell 会话内所有的程序和脚本都可见。创建它们跟创建局部变量类似，但使用的是 `export`、`declare -x` 关键字，shell 脚本也可以定义环境变量，但一般自己定义的环境变量关掉当前 Shell 就失效了，后面有介绍怎么让环境变量持久化。
- **shell 变量（系统变量）**：shell 变量是由 shell 程序设置的特殊变量，对所有 Shell 会话有效。shell 变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了 shell 的正常运行。

#### 变量语法

1、声明变量

可以使用等号操作符为变量赋值：`varName=value`，varName 是变量名，value 是赋值给变量的值。

变量名的命名规则：

- 只能使用英文字母，数字、下划线
- 中间不能有空格，可以使用下划线，如果有空格，必须使用单引号或双引号
- 不能使用标点符号
- 不能使用 shell 关键字

```sh
#!/bin/bash

# 等号左右不能有空格
fruit=apple
count=5

# 将命令赋值给变量
_ls=ls

# 将命令的执行结果赋值给变量
file_list=$(ls -a)

page_size=1
page_num=2
# 默认为字符串，不会进行数学运算
total=${page_size}*${page_num}
# 声明变量为整型
let total=${page_size}*${page_num}
declare -i total=${page_size}*${page_num}

# 到处环境变量
export total
declare -x total
```

**注意：`varName=value`的等号两边没有空格，变量值如果有空格，需要用引号包住。**

2、访问变量

访问变量的语法形式为：`${varName}` 和 `$varName`，变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界（推荐加花括号）。

```
#!/bin/bash

fruit=apple
count=5
echo "We have $count ${fruit}s"
#输出：We have 5 apples
```

因为 Shell 使用空白字符来分隔单词，所以上面的例子中需要加上花括号来告诉 Shell 这里的变量名是 fruit，而不是 fruits

**注意：使用单引号时，变量不会被扩展(expand)，仍依照原样显示。这意味着 `echo '$var'`会显示 `$var`。使用双引号时，如果 `$var` 已经定义过，那么 `echo "$var"`会显示出该变量的值，如果没有定义过，则什么都不显示。**

3、只读变量

使用 readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变

```
#!/bin/bash

fruit=apple
echo $fruit
readonly fruit
#fruit=banana  #如果放开注释，执行时会报错
```

4、删除变量

使用 unset 命令可以删除变量，变量被删除后不能再次使用。**unset 命令不能删除只读变量**

```
#!/bin/bash

fruit=apple
echo $fruit
#输出： apple

unset fruit
echo $fruit
#输出： (空)
```

![](./images/declare.png)

#### Shell 特殊变量（系统变量）

上面讲过变量名的命名规则，但是还有一些包含其他字符的变量有特殊含义，这样的变量被称为特殊变量。

| 变量        | 含义                                                                         |
| :---------- | :--------------------------------------------------------------------------- |
| `$0`        | 当前脚本的文件名                                                             |
| `$n`        | 传递给脚本或函数的参数。n 是一个数字，表示第几个参数。例如，第一个参数是`$1` |
| `$#`        | 传递给脚本或函数的参数个数                                                   |
| `$*`        | 传递给脚本或函数的所有参数                                                   |
| `$@`        | 传递给脚本或函数的所有参数，被双引号（""）包含时，与`$*`稍有不同             |
| `$FUNCNAME` | 函数名称（仅在函数内值）                                                     |
| `$?`        | 上个命令的退出状态，或函数的返值                                             |
| `$-`        | 显示 shell 使用的当前选项(flag)，后面扩展中检测是否为交互模式时会用到        |
| `$$`        | 当前 Shell 进程 ID。对于 Shell 脚本，就是这些脚本所在的进程 ID               |
| `$!`        | 最后一个后台运行的进程 ID 号                                                 |
| `$HOME`     | 当前由用户主目录                                                             |
| `$PATH`     | 全局命令的搜索路径                                                           |
| `$PS1`      | 命令提示符                                                                   |

> 命令行参数：运行脚本时传递给脚本的参数称为命令行参数，命令行参数用 `$n` 表示。

```
#!/bin/bash

# ./test.sh

echo "文件名：$0"
echo "第一个命令行参数：$1"
echo "第二个命令行参数：$2"
echo "传入的全部参数：$@"
echo "传入的全部参数：$*"
echo "全部参数的数量：$#"
```

执行命令：`./test.sh Linux Shell`，结果为：

```
文件名：./test.sh
第一个命令行参数：Linux
第二个命令行参数：Shell
传入的全部参数：Linux Shell
传入的全部参数：Linux Shell
全部参数的数量：2
```

`$?` 可以获取上一个命令的退出状态。所谓退出状态，就是上一个命令执行后的返回结果。退出状态是一个数字，一般情况下，大部分命令执行成功会返回 0，失败会返回 1。`$?`也可以表示函数的返回值。

### 3、字符串

#### 字符串引号

shell 字符串可以使用单引号 `''` ，也可以使用双引号`""` ， 也可以不用引号。

- 单引号：不识别变量，单引号中间不能出现单独的单引号（使用转义字符转义也不行），可以成对出现实现字符串拼接。

```
name='world'

before='hello,'${name}'!' #使用单引号拼接字符串
after='hello,${name}!'  #单引号中变量不解析

echo ${before}_${after}
# 输出：hello,world!_hello,${name}!
```

- 双引号：可以识别变量，双引号中可以出现用转义字符转义的双引号

```
name="\"shell\""  #双引号内允许出现被转义的双引号

before="hello,"${name}"!" #使用双引号拼接字符串
after="hello,${name}!" #双引号中变量会解析

echo ${before}_${after}
# 输出：hello,"shell"!_hello,"shell"!
```

- 反引号：执行一段命令

> 设置一个字符串变量，下面的都是对这个变量的操作

```
file=/dir1/dir2/dir3/my.file.txt
```

#### `${#var}`：获得变量值的长度

```
echo ${#file}
# 输出：27
```

#### `${var:x:x}`：通过索引位置截取子字符串

```
echo ${file:0:5} #截取最左侧的5个字符
# 输出：/dir1

echo ${file:5:5} #从第6个字符开始，截取5个字符
# 输出：/dir2
```

#### `${var#}`、`${var##}`：删除字符串左侧的值

```
echo ${file#*/} #删除第一个 / 及其左侧的字符串
# 输出：dir1/dir2/dir3/my.file.txt

echo ${file##*/} #删除最后一个 / 及其左侧的字符串
# 输出：my.file.txt

echo ${file#*.} #删除第一个 . 及其左侧的字符串
# 输出：file.txt

echo ${file##*.} #删除最后一个 . 及其左侧的字符串
# 输出：txt
```

#### `${var%}`、`${var%%}`：删除字符串右侧的值

```
echo ${file%/*} #删除最后一个 / 及其右侧的字符串
# 输出：/dir1/dir2/dir3

echo ${file%%/*} #删除第一个 / 及其右侧的字符串
# 输出：(空值)

echo ${file%.*} #删除最后一个 . 及其右侧的字符串
# 输出：/dir1/dir2/dir3/my.file

echo ${file%%.*} #删除第一个 . 及其右侧的字符串
#输出：/dir1/dir2/dir3/my
```

#### `${var:-word}`：如果变量 var 为空、没有定义或已被删除（unset），那么返回 word，但不改变 var 的值。

```
echo ${var:-"var is not set"}
#输出：var is not set

echo "var is ${var}"
#此时 var 还是没有定义，所以输出：var is
```

#### `${var:=word}`：如果变量 var 为空、没有定义或者已被删除，那么返回 word，并将 var 的值设置为 word。

```
echo ${var:="var is not set"}
#输出：var is not set

echo "var is ${var}"
#此时 var 已经定义为var is not set 了，所以输出：var is var is not set
```

#### `${var:?message}`：如果变量 var 为空、没有定义或者已被删除，那么将消息 message 送到标准错误输出。

可以用来检测变量 var 是否可以被正常赋值。若此替换出现在 shell 脚本中，那么脚本将停止运行。

#### `${var:+word}`：如果变量 var 被定义，那么返回 word，但不改变 var 的值。

### 数组

数组是可以存储多个值的变量，这些值可以单独引用，也可以作为整个数组来引用。数组的下标从 0 开始，下标可以是整数或算数表达式，其值应该大于等于 0。

#### 创建数组

```
numbers=(one two three four five)

#创建数组时指明下标
colors=([1]=red [0]=yello [2]=blue)
```

#### 访问数组

访问单个元素

```
echo ${numbers[2]}
#输出：three
```

访问数组的所有元素

```
echo ${colors[*]}
#输出：yello red blue

echo ${colors[@]}
#输出：yello red blue
```

`${colors[*]}`和`${colors[@]}`有些细微的差别，在将数组中的每个元素单独一行输出的时候，有没有被引号包住会有不同的差别，在引号内，`${colors[@]}`将数组中的每个元素扩展为一个单独的参数，数组元素中的空格得以保留。

访问数组部分元素

```
# :0:2 去除数组中从0开始，长度为2的数组元素
echo ${colors[@]:0:2}
#输出：yello red
```

#### 数组的长度

```
echo ${#colors[@]}
#输出：3
```

#### 数组中添加元素

```
colors=(white "${colors[@]}" green black)

echo ${colors[@]}
#输出：white yello red blue green black
echo ${#colors[@]}
#输出：6
```

#### 数组中删除元素

```
unset colors[2]

echo ${colors[@]}
#输出：white yello blue green black
echo ${#colors[@]}
#输出：5
```

#### 完整的代码示例：

```
#!/bin/bash


numbers=(one two three four five)

colors=([1]=red [0]=yello [2]=blue)

echo ${numbers[2]}

echo ${colors[*]}

echo ${colors[@]}

echo ${colors[@]:0:2}

echo ${#colors[@]}

colors=(white "${colors[@]}" green black)

echo ${colors[@]}

echo ${#colors[@]}

unset colors[2]

echo ${colors[@]}

echo ${#colors[@]}
```

### 运算符

Shell 中有很多运算符，包括算数运算符、关系运算符、布尔运算符、字符串运算符和文件测试符。

#### 算数运算符

原生 bash 不支持简单的数学运算，较为常用的是借助 `expr` 来实现数学运算。

算数运算符列表，变量 a 是 10 变量 b 是 50

| 运算符 | 说明 | 举例                           |
| :----- | :--- | :----------------------------- |
| `+`    | 加法 | `expr ${a} + ${b}` 结果为 60   |
| `-`    | 减法 | `expr ${b} - ${a}` 结果为 40   |
| `*`    | 乘法 | `expr ${a} \* ${b}` 结果为 500 |
| `/`    | 除法 | `expr ${b} / ${a}` 结果为 5    |
| `%`    | 取余 | `expr ${b} % ${a}` 结果为 0    |
| `=`    | 赋值 | `a=$b` 就是正常的变量赋值      |

示例代码如下：

```
#!/bin/bash

a=10
b=50

value=`expr ${a} + ${b}`
echo "a + b = ${value}"

value=`expr ${b} - ${a}`
echo "b - a = ${value}"

value=`expr ${a} \* ${b}`
echo "a * b = ${value}"

value=`expr ${b} / ${a}`
echo "b / a = ${value}"

value=`expr ${b} % ${a}`
echo "b % a = ${value}"

#输出
#a + b = 60
#b - a = 40
#a * b = 500
#b / a = 5
#b % a = 0
```

**注意：**

1. 表达式和运算符之间要有空格，例如`1+1`是错误的，必须写成`1 + 1`
2. 完整的表达式要用反引号 ` 包住
3. 条件表达式要放在方括号之间，并且要有空格，例如 `[${a}==${b}]`是错误的，必须写成 `[ ${a} == ${b} ]`

#### 条件运算符（关系运算符）

关系运算符只支持数字，不支持字符串，除非字符串的值是数字。

关系运算符列表，变量 a 是 10 变量 b 是 50

| 运算符 | 说明                                                            | 举例                           |
| :----- | :-------------------------------------------------------------- | :----------------------------- |
| `-eq`  | 检测两个数是否相等，相等返回 true                               | [ `${a} -eq ${b} ]` 返回 false |
| `-ne`  | 检测两个数是否不相等，不相等返回 true                           | `[ ${a} -ne ${b} ]` 返回 true  |
| `-gt`  | 检测左边的数是否大于右边的数，如果是，返回 true                 | `[ ${a} -gt ${b} ]` 返回 false |
| `>`    | 跟 `-gt` 一样，不过因为兼容性问题，可能要在 `[[]]` 表达式中使用 | `[[ ${a} > ${b} ]]` 返回 false |
| `-lt`  | 检测左边的数是否小于右边的数，如果是，返回 true                 | `[ ${a} -lt ${b} ]` 返回 true  |
| `<`    | 跟 `-lt` 一样，不过因为兼容性问题，可能要在 `[[]]` 表达式中使用 | `[[ ${a} < ${b} ]]` 返回 true  |
| `-ge`  | 检测左边的数是否大于等于右边的数，如果是，返回 true             | `[ ${a} -ge ${b} ]` 返回 false |
| `-le`  | 检测左边的数是否小于等于右边的数，如果是，返回 true             | `[ ${a} -le ${b} ]` 返回 true  |

实例代码如下：

```
!/bin/bash

a=10
b=50

if [ ${a} -eq ${b} ]; then
  echo "${a} -eq ${b} : a 等于 b"
else
  echo "${a} -eq ${b} : a 不等于 b"
fi
#输出：10 -eq 50 : a 不等于 b

if [ ${a} -ne ${b} ]; then
  echo "${a} -ne ${b} : a 不等于 b"
else
  echo "${a} -ne ${b} : a 等于 b"
fi
#输出：10 -ne 50 : a 不等于 b

if [ ${a} -gt ${b} ]; then
  echo "${a} -gt ${b} : a 大于 b"
else
  echo "${a} -gt ${b} : a 小于 b"
fi
#输出：10 -gt 50 : a 小于 b
if [[ ${a} > ${b} ]]; then
  echo "${a} > ${b} : a 大于 b"
else
  echo "${a} > ${b} : a 小于 b"
fi
#输出：10 > 50 : a 小于 b

if [ ${a} -lt ${b} ]; then
  echo "${a} -lt ${b} : a 小于 b"
else
  echo "${a} -lt ${b} : a 大于 b"
fi
#输出：10 -lt 50 : a 小于 b
if [[ ${a} < ${b} ]]; then
  echo "${a} < ${b} : a 小于 b"
else
  echo "${a} < ${b} : a 大于 b"
fi
#输出：10 < 50 : a 小于 b

if [ ${a} -ge ${b} ]; then
  echo "${a} -ge ${b} : a 大于等于 b"
else
  echo "${a} -ge ${b} : a 小于等于 b"
fi
#输出：10 -ge 50 : a 小于等于 b

if [ ${a} -le ${b} ]; then
  echo "${a} -le ${b} : a 小于等于 b"
else
  echo "${a} -le ${b} : a 大于等于 b"
fi
#输出：10 -le 50 : a 小于等于 b
```

#### 条件运算符（布尔运算符、逻辑运算符、字符串运算符）

条件运算符列表，变量 a 是 10， 变量 b 是 50，变量 x 是 "abc"，变量 y 是 "efg"
| 运算符 | 说明 | 举例 |
| :----- | :-------------------------------------------------- | :--- |
| `!` | 非运算 | `[ ! false ]` 返回 true |
| `-o` | 或运算 |[ ${a} -eq 10 -o ${b} -eq 100 ] 返回 true |
| `\|\|` | 跟 `-o` 类似，逻辑的 OR，不过需要使用 `[[]]` 表达式 |`[[ ${a} -eq 10 \|\| ${b} -eq 100 ]]` 返回 true |
| `-a` | 与运算 | `[ ${a} -eq 10 -a ${b} -eq 50 ]` 返回 true|
| `&&` | 跟 `-a` 类似，逻辑的 AND，不过需要使用 `[[]]` 表达式 | `[[ ${a} -eq 10 && ${b} -eq 50 ]]` 返回 true|
| `=` | 检测两个数字或字符串是否相等，相等返回 true | `[ ${a} = ${b} ]` 返回 false |
| `!=` | 检测两个数字或字符串是否相等，不相等返回 true | `[ ${a} != ${b} ]`返回 true |
| `==` | 相等。比较两个数字或字符串，如果相等返回 true（不推荐使用，有兼容性问题） | `[ ${a} == ${b} ]` 返回 false |
| `-z` | 检测字符串长度是否为 0，为 0 返回 true | `[ -z ${x} ]` 返回 false |
| `-n` | 检测字符串长度是否不为 0，不为 0 返回 true | `[ -n ${x} ]` 返回 true |
| `var` | 检测变量是否存在或不为空，存在或不为空返回 true | `[ $s ]` 返回 false |

![](./images/shell4.png)

代码示例如下：

```
#!/bin/bash

a=10
b=50
x="abc"
y="edf"

#单 []
if [ ${a} -eq 10 -a ${b} -eq 50 ]; then
  echo "${a} -eq 10 -a ${b} -eq 50 : 返回 true"
else
  echo "${a} -eq 10 -a ${b} -eq 50 : 返回 false"
fi
#输出：10 -eq 10 -a 50 -eq 50 : 返回 true

#双 []
if [[ ${a} -eq 10 && ${b} -eq 50 ]]; then
  echo "${a} -eq 10 && ${b} -eq 50 : 返回 true"
else
  echo "${a} -eq 10 && ${b} -eq 50 : 返回 false"
fi
#输出：10 -eq 10 && 50 -eq 50 : 返回 true

if [ ${a} = ${b} ]
then
  echo "a 和 b 相等"
fi

if [ ${a} != ${b} ]
then
  echo "a 和 b 不相等"
fi
#a 和 b 不相等

if [ -z ${x} ]; then
  echo "-z ${x}：字符串长度为0 "
else
  echo "-z ${x}：字符串长度不为0 "
fi
#输出：-z abc：字符串长度不为0

if [ -n ${y} ]; then
  echo "-z ${y}：字符串长度不为0 "
else
  echo "-z ${y}：字符串长度为0 "
fi
#输出：-z edf：字符串长度不为0

if [ $x ];then
  echo "${x}：不是空字符串"
else
  echo "${x}：是空字符串"
fi
#输出：abc：不是空字符串

if [ $s ];then
  echo '${s}：存在'
else
  echo '${s}：不存在'
fi
#输出：${s}：不存在

```

#### 文件目录判断运算符

文件目录判断运算符列表
| 运算符 | 说明 |
| :----- | :-------------------------------------------------- |
| `-f filename` |判断文件是否存在，当 filename 存在且是普通文件时（既不是目录，也不是设备文件）返回 true|
| `-d pathname` |判断目录是否存在，当 pathname 存在且是目录时返回 true|
| `-e pathname` |判断【某个东西】是否存在，当 pathname 指定的文件或目录存在时返回 true|
| `-a pathname` |同上，已经过时，而且使用的时候还有另外一个与的逻辑，容易混淆|
| `-s filename` |判断是否是一个非空文件，当 filename 存在并且文件大小大于 0 时返回 true|
| `-r pathname` |判断是否可读，当 pathname 指定的文件或目录存在并且可读时返回 true|
| `-x pathname` |判断是否可执行，当 pathname 指定的文件或目录存在并且可执行时返回 true|
| `-w pathname` |判断是否可写，当 pathname 指定的文件或目录存在并且可写时返回 true|
| `-b filename` |判断是否是一个块文件，当 filename 存在且是块文件时返回 true|
| `-c filename` |判断是否是一个字符文件，当 filename 存在且是字符文件时返回 true|
| `-L filename` |判断是否是一个符号链接，当 filename 存在且是符号链接时返回 true|
| `-u filename` |判断文件是否设置 SUID 位，SUID 是 Set User ID|
| `-g filename` |判断文件是否设置 SGID 位，SGID 是 Set Group ID|

![](./images/shell5.png)

示例代码如下：

```
#!/bin/bash

file="/etc/hosts"

if [ -f ${file} ]; then
  echo "${file}：是一个普通文件"
else
  echo "${file}：不是一个普通文件"
fi
#输出：/etc/hosts：是一个普通文件

if [ -d ${file} ]; then
  echo "${file}：是个目录"
else
  echo "${file}：不是目录"
fi
#输出：/etc/hosts：不是目录

if [ -e ${file} ]; then
  echo "${file}：文件存在"
else
  echo "${file}：文件不存在"
fi
#输出：/etc/hosts：文件存在

if [ -s ${file} ]; then
  echo "${file}：文件不为空"
else
  echo "${file}：文件为空"
fi
#输出：/etc/hosts：文件不为空

if [ -r ${file} ]; then
  echo "${file}：文件可读"
else
  echo "${file}：文件不可读"
fi
#输出：/etc/hosts：文件可读
```

### 条件语句

在条件语句中，由 `[]` 或 `[[]]` 包起来的表达式被称为**检测命令**或**基元**。

#### if...fi 语句

```
语法：

if [ expression ]
then
  expression 是 true ，这里会被执行
fi
```

```
#!/bin/bash

if [ 1 = 1 ]
then
  echo "相等"
fi
#输出：相等

#也可以写成一行
if [ "a" = "a" ]; then echo "相等"; fi
#输出：相等
```

if...else 经常跟 `test` 命令结合使用，`test`命令用于检查某个条件是否成立，与方括号`[]`类似（它们两个在/usr/bin 中是用软连接指向的）。

```
#!/bin/bash

a=10
b=50

if test ${a} -eq ${b}
then
  echo "a 等于 b"
else
  echo "a 不等于 b"
fi
#输出：a 不等于 b
```

#### if...else...fi

```
语法：

if [ expression ]
then
  expression 是 true ，这里会被执行
else
  expression 是 false , 这里会被执行
fi
```

```
#!/bin/bash

if [ 1 = 2 ]
then
  echo "相等"
else
  echo "不相等"
fi
#输出：不相等
```

#### if...elif...fi

```
语法：

if [ expression1 ]
then
  expression 是 true ，这里会被执行
elif [ expression2 ]
then
  expression1 是 true ，这里会被执行
else
  上面的 expression 都是 false , 这里会被执行
fi
```

```
#!/bin/bash

a=10
b=50

if [ ${a} -eq ${b} ]
then
  echo "a 等于 b"
elif [ ${a} -gt ${b} ]
then
  echo "a 大于 b"
else
  echo "a 小于 b"
fi
#输出：a 小于 b
```

#### case...esac

case...esac 与其他语言中的 switch...case 类似，是一种多分支选择结构。

case 语句匹配一个值或一个模式，如果匹配成功，执行想匹配的命令。适用于需要面对很多情况，分别要采取不同的措施的情况。

```
case 值 in
模式1)
  command1
  command2
  command3
  ;;
模式2)
  command1
  command2
  command3
  ;;
*)
  command1
  command2
  command3
  ;;
esac
```

```
#!/bin/bash

echo "输入1-4的一个数字"
echo "你输入的数字是："

read number

case $number in
  1)
  echo "你输入了1"
  ;;
  2)
  echo "你输入了2"
  ;;
  3)
  echo "你输入了3"
  ;;
  4)
  echo "你输入了4"
  ;;
  *)
  echo "你输入的不是1-4的数字"
  ;;
esac

#运行后可以自己输入数字体验
```

**注意：可以在 `)` 前用 `|` 分割多个模式。**

### 循环语句

bash 中有四种循环：for , while , until , select

#### for 循环

```
语法：

for 变量 in 列表
do
  command1
  command2
  ...
  commandN
done
```

语法中的列表是一组值（数字、字符串）组成的序列，每个值通过空格分隔。这些值还可以是通配符或大括号扩展，例如 `*.sh` 和 `{1..5}`。

```
#!/bin/bash

for i in 1 2 3 4 5
do
  echo $i
done

# 写在一行
for i in {1..5}; do echo $i ; done
```

#### while 循环

while 循环会不断的检测一个条件，只要这个条件返回 true，就执行一段命令。被检测的条件跟 if 中的一样。while 也可用于从输入文件中读取数据。

```
语法：

while [[ condition ]]
do
  如果 condition 是 true ，这里的命令会执行
done
```

```
#!/bin/bash

x=0
y=10

while [ ${x} -lt 5 ]
do
  echo $x
  x=`expr ${x} + 1`
done

# do 也跟条件写在一行，前面需要加分号 ;
while [ ${y} -gt 5 ]; do echo $y; y=`expr ${y} - 1`; done
```

#### until 循环

until 循环是检测一个条件，只要条件是 false 就会一直执行循环，直到条件条件为 true 时停止。它跟 while 正好相反。

```
#!/bin/bash

x=0

until [ ${x} -eq 5 ]; do
  echo ${x}
  x=`expr ${x} + 1`
done
```

#### select 循环

select 循环的语法跟 for 循环基本一致。它帮助我们组织一个用户菜单。

```
语法：

select 变量 in 列表
do
  执行相应的命令
done
```

select 会打印列表的值以及他们的序列号到屏幕上，之后会提示用户选择，用户通常看到的提示是 `$?` ，用户输入相应的信号，选择的结果会被保存到变量中。

```
#!/bin/bash

#PS3——shell脚本中使用select时的提示符
PS3="选择你要安装的包管理工具，输入序号："

select ITEM in bower npm gem pip
do
  echo "输入的包名称是：\c" && read PACKAGE
  case ${ITEM} in
    bower) echo "模拟 bower install ${PACKAGE}" ;;
    npm) echo "模拟 npm install ${PACKAGE}" ;;
    gem) echo "模拟 gem install ${PACKAGE}" ;;
    pip) echo "模拟 pip install ${PACKAGE}" ;;
    *) echo "包管理工具选择错误" ;;
  esac
  break #跳出循环
done
```

#### break 命令

break 命令允许跳出所有循环（终止执行后面的所有循环）。在嵌套循环中 break 命令后面还可以跟一个整数，表示跳出几层循环。

```
#!/bin/bash

# 当 x 等于 2，并且 y 等于 0，就跳出循环
for x in 1 2 3
do
  for y in 0 5
  do
   if [ ${x} -eq 2 -a ${y} -eq 0 ]
   then
     echo "x 等于 ${x}，y 等于 ${y}"
     break 2
   else
    echo "${x} ${y}"
   fi
  done
done
```

#### continue 命令

continue 命令跟 break 命令类似，只有一点差别，它不会跳出所有循环，仅仅跳出当前循环。同样，continue 后面也可以跟一个数字，表示跳出第几层循环。

```
#!/bin/bash

# 当 x 等于 2，并且 y 等于 0，就跳出循环
for x in 1 2 3
do
  for y in 0 5
  do
   if [ ${x} -eq 2 -a ${y} -eq 0 ]
   then
     continue 2
   else
    echo "${x} ${y}"
   fi
  done
done
```

### 函数

- shell 函数必须先定义后使用，调用函数仅使用其函数名即可。
- 函数定义时，`function`关键字可有可无
- 函数返回值：可以显式的使用 return 语句，返回值类型只能为整数（0-255）。如果不加 return 语句，会默认将最后一条命令运行结果作为返回值。
- 函数返回值在调用该函数后，通过 `$?` 获得。
- 在函数内部声明变量一般会使用 `local` 进行限定在当前作用域中生效，或者使用 unset 进行变量撤销

```
语法：中括号内表示可选

[function] function_name () {
  在这里执行命令
  [return value]
}
```

```
#!/bin/bash

hello () {
  echo "hello"
  world #函数嵌套
}

world () {
  echo "world"
}

hello
```

#### 参数

位置参数是在调用一个函数并传给它参数时创建的变量，见上文 Shell 特殊变量。

```
#!/bin/bash

funWithParam () {
  echo "第1个参数：$1"
  echo "第2个参数：$2"
  echo "第3个参数：$3"
  echo "错误的获取第10个参数：$10"
  # $10 不能获取第10个参数，需要用 ${10}，当 n>=10 时，需要使用 ${n} 获取参数。(其中有兼容性，某些Shell解释器两种都能获取到)
  echo "正确的获取第10个参数：${10}"
  echo "获取第11个参数：${11}"
  echo "获取传参的个数：$#"
  echo "获取所有的传参：$*"
  echo "当前函数的名称是：$FUNCNAME"
}

funWithParam 1 2 3 4 5 6 7 8 9 34 73
```

### 输入输出重定向

Unix 命令默认从标准输入设备（stdin）获取输入，将结果输出到标准输出设备（stdout）显示。一般情况下，标准输入设备就是键盘，标准输出设备就是显示器。

![](http://images.cnblogs.com/cnblogs_com/chengmo/WindowsLiveWriter/linuxshell_EB66/image_2.png)

#### 输入输出流

shell 接收输入，并以字符序列或字符流的形式产生输出。这些流能被重定向到文件或另一个流中。

一般情况下，每个 Unix/Linux 命令都会打开三个文件：标准输入文件、标准输出文件、标准错误文件，三个文件描述符：

| 代码 | 描述符 | 描述         |
| :--- | :----- | :----------- |
| 0    | stdin  | 标准输入     |
| 1    | stdout | 标准输出     |
| 2    | stderr | 标准错误输出 |

#### 重定向

重定向让我们可以控制一个命令的输入来自哪里，输出结果到什么地方。

输出重定向：命令的输出不仅可以是显示器，还可以很容的转义到文件，这被称为输出重定向。

```
语法：

command > file  此语法会覆盖文件内容

command >> file 如果不希望文件被覆盖，可以使用 >> 追加到文件末尾
```

输入重定向：使 Unix 命令也可以从文件获取输入，这样本来要从键盘获取输入的命令会转移到文件读取内容。

```
语法：
command < file
```

有一个文件是 test.sh，用两种方式输出文件的行数

```
wc -l ./test.sh
#输出：14 ./test.sh

wc -l < ./test.sh
#输出：14  没有文件名
```

第一个例子会输出文件名，第二个不会，因为它仅仅知道从标准输入读取的内容。

以下操作符在控制流的重定向时会被用到：

| 操作符 | 描述                                                                          |
| :----- | :---------------------------------------------------------------------------- |
| >      | 重定向输出                                                                    |
| >>     | 将输出已追加的方式重定向                                                      |
| >&     | 将两个输出文件合并，需要在命令的最后使用                                      |
| 2>     | 错误重定向                                                                    |
| &>     | 正确和错误输出统一写入到一个文件中                                            |
| <&     | 将两个输入文件合并                                                            |
| <      | 重定向输入                                                                    |
| <<     | Here 文档语法（见下文扩展），将开始标记 tag 和结束标记 tag 之间的内容作为输入 |
| <<<    | Here 字符串                                                                   |

如果希望 stderr 重定向到 file，可以这样写：

```
command 2 > file
```

如果希望将 stdout 和 stderr 合并后重定向的 file，可以这样写：

```
#&[n] 代表是已经存在的文件描述符，&1 代表输出 &2代表错误输出 &-代表关闭与它绑定的描述符
command > file 2>&1
```

如果希望 stdin 和 stdout 都重定向，可以这样写：

```
command < file1 > file2

#例如：
cat < test.sh  > catfile

#提一下 << 这个连续两个小符号， 他代表的是『结束的输入字符』的意思。这样当空行输入eof字符，输入自动结束，不用ctrl+D
#例如：
cat <<eof >catfile
```

**如果希望执行某个命令，但又不希望在屏幕上显示输出结果，那么可以将输出重定向到 /dev/null。**

/dev/null 是一个特殊的文件，写入到它的内容都会被丢弃，如果尝试从该文件读取内容，那么什么也读不到。但是 /dev/null 文件非常有用，将命令的输出重定向到它，会起到"禁止输出"的效果。

```
#test1.sh 没有的情况下，将错误输出信息关闭掉
ls test.sh test1.sh 2>/dev/null

ls test.sh test1.sh 2>&-

#关闭所有输出
ls test.sh test1.sh  1>&- 2>&-
ls test.sh test1.sh  2>/dev/null 1>/dev/null

#将错误输出2 绑定给 正确输出 1，然后将 正确输出 发送给 /dev/null设备  这种常用
ls test.sh test1.sh >/dev/null 2>&1
# & 代表标准输出和错误输出 将所有标准输出与错误输出 输入到/dev/null文件
ls test.sh test1.sh &>/dev/null
```

### 加载外部脚本

像其他语言一样，Shell 也可以加载外部脚本，将外部脚本的内容合并到当前脚本。shell 中加载外部脚本有两种写法。

```
第一种：. filename

第二种：source filename
```

两种方式效果相同，简单起见，一般使用点号（.），但是！**注意点号（.）和文件名中间有一个空格**

```
#!/bin/bash

. ./pre_test.sh

echo $a
# 输出：100
```

### Debug

#### 全局 Debug

shell 提供了用于 debug 脚本的工具。如果想采用 debug 模式运行某脚本，可以在其 shebang 中使用一个特殊的选项。（有些 shell 不支持）

```
#!/bin/bash [options]
```

或者在执行 Bash 脚本的时候，从命令行传入这些参数

```
bash -euxo pipefail test.sh
```

#### 局部 Debug

有时我们只需要 debug 脚本的一部分。这种情况下，使用 set 命令会很方便。这个命令可以启用或禁用选项。 使用 `-` 启用选项，使用 `+` 禁用选项。

1、用来在运行结果之前，先输出执行的那一行命令

```
set -x
#或者
set -o xtrace
```

2、执行脚本时，如果遇到不存在的变量会报错，并停止执行。（默认是忽略报错的）

```
set  -u
#或者
set  -o nounset
```

**顺便说一下，如果命令行下不带任何参数，直接运行`set`，会显示所有的环境变量和 Shell 函数。**

3、执行脚本时，发生错误就终止执行。（默认是继续执行的）

```
set  -e
#或者
set -o errexit

#可以用下面的方法
command || exit 1
#或者
command1 && command2
```

`set -e` 根据返回值来判断，一个命令是否运行失败。但是，某些命令的非零返回值可能不表示失败，或者开发者希望在命令失败的情况下，脚本继续执行下去。这时可以暂时关闭 `set +e`，该命令执行结束后，再重新打开 `set -e`。

```
set +e
command1
command2
set -e

#也可以用下面的方法
command || true
```

4、管道命令执行失败，脚本终止执行

管道命令就是多个子命令通过管道运算符（`|`）组合成为一个大的命令。Bash 会把最后一个子命令的返回值，作为整个命令的返回值。最后一个子命令不失败，管道命令就总是会执行成功的，因此 `set -e` 会失效，后面的命令会继续执行。

`set -o pipefail` 用来解决这个情况，搭配 `-e` 只要一个子命令失败，整个管道命令就会失败，脚本就会终止执行。

```
set -eo pipefail
```

上面的命令可以放在一起使用：

```
set -euxo pipefail
#或者
set -eux
set -o pipefail
```

## 参考文档

- [Shell 中傻傻分不清楚的 TOP3](https://mp.weixin.qq.com/s/UofKYTb9hp2FXYIKM5Q3Qw)
- [千万别混淆 Bash/Zsh 的四种运行模式](https://zhuanlan.zhihu.com/p/47819029)
- [一篇文章让你彻底掌握 shell 语言](https://juejin.im/post/6844903784158593038)
- [Bash 脚本 set 命令教程](http://www.ruanyifeng.com/blog/2017/11/bash-set.html)
- [linux shell 数据重定向（输入重定向与输出重定向）详细分析](https://www.cnblogs.com/chengmo/archive/2010/10/20/1855805.html)
- [linux shell 管道命令(pipe)使用及与 shell 重定向区别](https://www.cnblogs.com/chengmo/archive/2010/10/21/1856577.html)
- [Linux 系统环境变量位置， 环境变量持久化](https://www.linuxidc.com/Linux/2018-09/154325.htm)
- [手把手教你为 Mac 配一个好用的终端](https://mp.weixin.qq.com/s/dle27qPDYXYcalfy0RGJeQ)
- [打造 Mac OS 最强终端利器 iTerm2](https://mp.weixin.qq.com/s?__biz=MzA5MjUyMzY0MA==&mid=2247483813&idx=1&sn=cba56cec12616415f7bcececcfacd79c&chksm=906a9cb2a71d15a411e6b6ff661b07b64b3b77454b1aee6c593646e4ba113a6daa9ea028f62c&token=166666239&lang=zh_CN#rd)
- [Mac 终端增强技能](https://www.jianshu.com/p/0d4d5c0c31a1)
- [iTerm 与 Zsh 篇](https://xiaozhou.net/learn-the-command-line-iterm-and-zsh-2017-06-23.html)
