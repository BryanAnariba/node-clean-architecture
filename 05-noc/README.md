# NOC App
## Development Structure: if you want to create this project.
0. Create init project ```npm init -y```
1. Install dev dependencies ```npm i -D typescript @types/node ts-node-dev rimraf```
2. Create typescipt config json ```npx tsc --init --outDir dist/ --rootDir /src```
3. Copy & Paste this scripts in package.json "scripts" section
  ```
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "rimraf ./dist && tsc",
    "start:dev": "nodemon",
    "start": "npm run build && node dist/app.js"
  ```
4. Run Project With: ```npm run start:dev | npm run build | npm start```

## If you will download this repository try this.
0. Install dependencies with ```npm install```
1. Run Project With: ```npm run start:dev | npm run build | npm start```