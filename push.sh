#!/bin/bash
#参数的完整性
#测试shell脚本
#
#
#
echo "输入此次提交原因："
read statement

if [[ $statement ]]; then
    git status
    git add "."
    git commit -m "$statement" #接收的参数
    echo "pull..........................................."
    git pull
    echo "push..........................................."
    git push
fi



# echo $$  #脚本运行的当前进程ID号

#echo $!  
#
# echo "输入的参数为："
# echo $*

# echo "参数个数："
# echo $#

# echo "返回加引号："
# echo $@

# echo "退出状态："
# echo $?

# echo "当前选项："
# echo $-

# echo "-- \$* 演示 ---"
# for i in "$*"; do
#     echo $i
# done

# echo "-- \$@ 演示 ---"
# for i in "$@"; do
#     echo $i
# done