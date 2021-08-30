# Node IOT Website
This is a simple site to catch some IOT posts

## Introduction
-Node App with POST API
-Store data in PostGres
-Display data in a Node Client table (with Chart.js?)

## Todo
-Create a postgres docker container**
-Create node server with API
-Create node client with chart.js

## Internal Reference
Utilize the server-setup and how-to-readme, for upload

## Install Process Manager(s) (Use either pm2 or nodemon)
sudo npm install pm2 -g
sudo npm install nodemon -g

## Database init - from the main dir
npm run dbinit

## Start
npm run start


## Stop, Restart, etc. pm2
sudo pm2 list
sudo pm2 stop www
sudo pm2 start www
sudo pm2 restart www
sudo pm2 delete www




