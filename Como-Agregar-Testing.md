# Pasos para configurar Jest con TypeScript, en Node 

Documentación [oficial sobre Jest](https://jestjs.io/docs/getting-started)


1. Instalaciones de desarrollo (super test es útil para probar Express)
```npm install -D jest @types/jest ts-jest supertest```

2. Crear archivo de configuración de Jest
```npx jest --init```
  - Select: y, y, node, y, v8, n


3. En el archivo **jest.config.js** configurar
```
preset: 'ts-jest',
testEnvironment: "jest-environment-node",

// Opcional - The paths to modules that run some code to configure or set up the testing environment before each test
// setupFiles: ['dotenv/config'],
```

4. Crear scripts en el **package.json**
```
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage",
```

5. Pegar esto en el tsconfig.json
```
  SI SE TIENE UNA CARPETA DE test AL MISMO NIVEL DE src
  {
    "include": ["src/**/*"],
    "exclude": ["node_modules", "**/*.spec.ts","**/*.test.ts"],
    "compilerOptions": {}
  }
  O SI EL TEST ESTA AL LADO DE CADA ARCHIVO POR EJEMPLO app.ts y app.test.ts en el mismo src
  {
    "include": ["src/**/*"],
    "exclude": ["node_modules", "src/**/*.spec.ts","src/**/*.test.ts"],
    "compilerOptions": {}
  }
```