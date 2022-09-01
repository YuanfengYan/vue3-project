# 基础 image
FROM node:16-alpine

# 设置项目目录
WORKDIR /app


# 安装项目依赖
COPY ./package.json .
# RUN npm config set registry=https://registry.npm.taobao.org
# RUN mkdir -p /app/node-sass
# COPY binding.node /app/node-sass
# ENV SASS_BINARY_PATH /app/node-sass/binding.node
# RUN npm install -g --unsafe-perm node-sass@4.8 --sass-binary-site=https://npm.taobao.org/mirrors/node-sass/

# RUN npm cache clean --force
RUN npm install -g npm@8.18.0
RUN npm install 
# RUN npm install node-sass@latest
# RUN npm rebuild node-sass


# 运行
CMD ["npm", "run", "serve"] 