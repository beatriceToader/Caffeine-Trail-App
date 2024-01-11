// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { CoffeeShop } = initSchema(schema);

export {
  CoffeeShop
};