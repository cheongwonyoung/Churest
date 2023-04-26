# node.ks 로 빌드 ( base로 사용할 Image name : build-stage )
FROM node:18.15.0 as build-stage
# package*.json에 등록되어 있는 라이브러리들을 npm install 으로 설치하고, 프로젝트 폴더를 이미지에 복사, npm run build 를 통해 build 폴더에 빌드 
WORKDIR /var/jenkins_home/workspace/Development/FE/churest 
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/Development/FE/churest/build /usr/share/nginx/html
COPY --from=build-stage /var/jenkins_home/workspace/Development/FE/churest/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80  
CMD ["nginx", "-g","daemon off;"] 
# CMD ["npm", "start"] 

