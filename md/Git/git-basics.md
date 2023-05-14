# Git 基础

## git log

-p / --patch

`git log -p` 用来展示每次提交所引入的差异。

<img src="/Users/mono/WorkSpaces/code/learn/md/Git/assets/image-20230514154551734.png" alt="image-20230514154551734" style="zoom:50%;" align="left"/>

`-<n>` n 为任意正整数，可以显示指定数目的提交。

<img src="/Users/mono/WorkSpaces/code/learn/md/Git/assets/image-20230514154701130.png" alt="image-20230514154701130" style="zoom:50%;" align="left"/>

`git log --stat` 展示每次提交的简略统计信息。

<img src="/Users/mono/WorkSpaces/code/learn/md/Git/assets/image-20230514154820230.png" alt="image-20230514154820230" style="zoom:50%;" align="left"/>

`git log --pretty=oneline` 一行显示所有提交。

<img src="/Users/mono/WorkSpaces/code/learn/md/Git/assets/image-20230514154922111.png" alt="image-20230514154922111" style="zoom:50%;" align="left"/>

`--pretty` 支持的选项：

| Name    | 命令                       | 效果                                                         |
| ------- | -------------------------- | ------------------------------------------------------------ |
| short   | `git log --pretty=short`   | <img src="/Users/mono/WorkSpaces/code/learn/md/Git/assets/image-20230514155205080.png" alt="image-20230514155205080" style="zoom:50%;" /> |
| full    | `git log --pretty=full`    | <img src="/Users/mono/WorkSpaces/code/learn/md/Git/assets/image-20230514155249349.png" alt="image-20230514155249349" style="zoom:50%;" /> |
| fuller  | `git log --pretty=fuller`  | <img src="/Users/mono/WorkSpaces/code/learn/md/Git/assets/image-20230514155310434.png" alt="image-20230514155310434" style="zoom:50%;" /> |
| oneline | `git log --pretty=oneline` | <img src="/Users/mono/WorkSpaces/code/learn/md/Git/assets/image-20230514154922111.png" alt="image-20230514154922111" style="zoom:50%;" align="left"/> |

`--pretty` 还有一个 `format` 选项，可以定制记录的显示格式：

```shell
git log --pretty=format:"%h - %an, %ar : %s"
```

<img src="/Users/mono/WorkSpaces/code/learn/md/Git/assets/image-20230514155603751.png" alt="image-20230514155603751" style="zoom:50%;" align="left"/>

## 撤销操作

如果发现漏掉了几个文件没有提交，或者提交信息写错了，可以运行带有 `--amend` 选项的提交命令来重新提交：

```shell
git commit --amend
```

这个命令会将暂存区里的文件提交。如果自上次提交以来还没有做修改（比如上次 commit 后立刻执行这个命令），那么快照会保持不变，而所修改的只是提交信息。

如果提交后忘记了暂存某些需要的修改，可以像下面这样操作：

```shell
git commit -m 'feat: some feature'
git add forgotten_file
git commit --amend
```

这样，第二次提交会取代第一次提交的结果，最终只会有一个提交。











