# node.ks 로 빌드 ( base로 사용할 Image name : build-stage )
FROM node:18.15.0 as build-stage 

# package*.json에 등록되어 있는 라이브러리들을 npm install 으로 설치하고, 프로젝트 폴더를 이미지에 복사, npm run build 를 통해 build 폴더에 빌드 

# WORKDIR /var/jenkins_home/workspace/churest/FE 
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# FROM nginx:stable-alpine as production-stage

# COPY --from=build-stage /var/jenkins_home/workspace/churest/FE/build /usr/share/nginx/html
# #COPY --from=build-stage /var/jenkins_home/workspace/churest/FE/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80 
# CMD ["nginx", "-g","daemon off;"] 

# 작업 폴더를 만들고 npm 설치
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install  --force

COPY . /usr/src/app
RUN npm run build
FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# 80포트 오픈하고 nginx 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
