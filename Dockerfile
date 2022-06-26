FROM node:latest


WORKDIR /app

COPY ./ ./
RUN npm install --global expo-cli
RUN npm i

CMD ["expo", "start"]