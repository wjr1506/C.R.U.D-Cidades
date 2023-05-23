import { server } from './server/server';
server.listen(process.env.PORT || 5000, () => console.log(`Server Running in https://localhost:${process.env.PORT || 5000}`));



//install typescript
//install ts-node-dev => help convert TS files to JS in development mode
//when install any package, add too the integration of this package with TypeScript
//install ESLint to standardize code


//to production, run yarn tsc --init
//search in tsconfig.json for "outDir" and add "./build"
//search in tsconfig.json for "rootDir" and add "./src"
//then run yarn tsc


//folders
//controller => funções que retornam respostas para o usuário ou manipulam dados no banco de dados
//database => config do banco de dados
//shared => algo que pode ser compartilhado com o projeto inteiro
  //middleware => função que pode interceptar chamadas dos controllers para coleta de dados chave
  //exemplo: (Autenticação JWT) usuário fez uma chamada para listar produtos, antes de consultar os produtos, o middleware checa se o token é válido.
  //service => pode ser usado para chamada de funções que não se aplicam às demais


//lib
//
//yup to validation
//jest ts-jest @types/jest to test (yarn jest --init) => discoment line 37,136,155,174
//(dev)supertest @type/supertest