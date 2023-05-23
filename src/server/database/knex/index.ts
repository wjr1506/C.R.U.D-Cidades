import knex from 'knex';
import { development, prod, test } from './environment'


const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case 'prod':
      return prod
      break;

    case 'test':
      return test
      break;

    default:
      return development

  }

}


export const Knex = knex(getEnvironment());