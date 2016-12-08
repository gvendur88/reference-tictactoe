FROM node

WORKDIR /tictactoe

COPY package.json .

COPY . .

RUN npm install --silent

RUN ls

EXPOSE 3000

ENV NODE_PATH .

RUN chmod +x ./runNodeJS

CMD ["./runNodeJS"]

#CMD ["node","run.js"]

