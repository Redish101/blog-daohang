#!/bin/bash

BaseImage=node:16-alpine
ZhBlogsImage=ohyee/zhblogs

function func_run_docker() {
    docker run \
        -p 3000:3000 \
        --rm \
        -it \
        -v $(pwd):/data \
        --workdir /data \
        ${BaseImage} \
        $@
}


function func_help() {
    echo "$0 zhblogs 开发环境"
    echo "    pull      拉取镜像到本地"
    echo "    install   安装依赖到本地"
    echo "    dev       进入开发模式"
    echo "    build     构建生产环境镜像"
}

function func_build_image() {
    if [[ "$(git status | grep 'nothing to commit' | wc -l)" -eq "1" ]]; then
        Commit=$(git rev-parse --short HEAD)
        echo $Commit
        docker build -t ${ZhBlogsImage}:${Commit} .
        echo "镜像: ${ZhBlogsImage}:${Commit}"
    else
        echo "存在未提交的更改，请提交后再构建镜像"
    fi
}

if [ $# -eq "0" ]; then
    func_help
else
    case $1 in
        "pull")     docker pull ${BaseImage};;
        "install")  func_run_docker yarn install --frozen-lockfile;;
        "dev")      func_run_docker yarn dev;;
        "build")    func_build_image;;
        
        *)          func_help    ;;
    esac
fi
