# NOC App
## Development Structure: if you want to create this project.
1. Create init project ```npm init -y```
2. Install dev dependencies ```npm i -D typescript @types/node ts-node-dev rimraf```
3. Create typescript config json ```npx tsc --init --outDir dist/ --rootDir src/```
4. Copy & Paste this scripts in package.json "scripts" section
  ```
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "rimraf ./dist && tsc",
    "start:dev": "nodemon",
    "start": "npm run build && node dist/app.js"
  ```
5. Run Project With: ```npm run start:dev | npm run build | npm start```

## If you will download this repository try this.
1. Clone this repository
2. Set Up virtual environments .env
```
  PORT=

  MAILER_EMAIL=
  MAILER_SECRET_KEY=
  MAILER_SERVICE=

  MONGO_URL=
  MONGO_DB_NAME=
  MONGO_USER=
  MONGO_PASS=

  POSTGRES_USER=
  POSTGRES_DB=
  POSTGRES_PASSWORD=
  POSTGRES_URL=
  PGADMIN_DEFAULT_EMAIL=
  PGADMIN_DEFAULT_PASSWORD=

  IS_PRODUCTION=
```
4. Run all databases with: ```docker compose up -d```
5. Install dependencies with ```npm install```
6. Run Project With: ```npm run start:dev | npm run build | npm start```


- Link: para revision de email para crear la llave es el segundo
1. https://myaccount.google.com/security
2. https://myaccount.google.com/u/0/apppasswords
- Ver la documentacion de prisma por que se hacen migraciones como TYPEORM
