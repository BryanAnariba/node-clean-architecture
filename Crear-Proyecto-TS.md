1. Instalar Typescript y tipos de node, como dependencias de desarrollo
```npm init -yes```
```npm i -D typescript @types/node ts-node-dev rimraf```

2. Inicializar el archivo de configuracion de Typescript (Se puede configurar al gusto)
```npx tsc --init --outDir dist/ --rootDir src/```

3. Opcional: para transpilar el codigo usar
```npx tsc | npx tsc --watch```

4. Configurar Nodemon y NodeTS
```npm i -D ts-node nodemon```

5. Crear nodemon.json y pegar este codigo
```
{
  "watch": "[src]",
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/app.ts"
}
```

6. Copiar esto en package.json seccion de scripts
```
  "scripts": {
    "build": "rimraf ./dist && tsc",
    "start:dev": "tsnd --respawn --clear src/app.ts",
    "start": "npm run build && node dist/app.js"
  },
```

7. Ejecutar con:
```npm run start:dev | npm run build | npm start```