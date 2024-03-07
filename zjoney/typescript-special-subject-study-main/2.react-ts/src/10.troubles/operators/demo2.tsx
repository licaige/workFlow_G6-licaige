declare global {
  interface Window {
    MyVendorThing: MyVendorType;
  }
}

// declaration.d.ts
// anywhere in your project, NOT the same name as any of your .ts/tsx files
declare module '*.png';

// importing in a tsx file
// import * as logo from "./logo.png";

//tsconfig.json
//https://www.tslang.cn/docs/handbook/compiler-options.html

//推荐配置
// {
//     "compilerOptions": {
//       "incremental": true,
//       "outDir": "build/lib",
//       "target": "es5",
//       "module": "esnext",
//       "lib": ["dom", "esnext"],
//       "sourceMap": true,
//       "importHelpers": true,
//       "declaration": true,
//       "rootDir": "src",
//       "strict": true,
//       "noUnusedLocals": true,
//       "noUnusedParameters": true,
//       "noImplicitReturns": true,
//       "noFallthroughCasesInSwitch": true,
//       "allowJs": false,
//       "jsx": "react",
//       "moduleResolution": "node",
//       "baseUrl": "src",
//       "forceConsistentCasingInFileNames": true,
//       "esModuleInterop": true,
//       "suppressImplicitAnyIndexErrors": true,
//       "allowSyntheticDefaultImports": true,
//       "experimentalDecorators": true
//     },
//     "include": ["src/**/*"],
//     "exclude": ["node_modules", "build", "scripts"]
//   }
