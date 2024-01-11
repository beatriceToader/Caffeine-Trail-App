import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerCoffeeShop = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CoffeeShop, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly image?: string | null;
  readonly name: string;
  readonly address: string;
  readonly userId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCoffeeShop = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CoffeeShop, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly image?: string | null;
  readonly name: string;
  readonly address: string;
  readonly userId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CoffeeShop = LazyLoading extends LazyLoadingDisabled ? EagerCoffeeShop : LazyCoffeeShop

export declare const CoffeeShop: (new (init: ModelInit<CoffeeShop>) => CoffeeShop) & {
  copyOf(source: CoffeeShop, mutator: (draft: MutableModel<CoffeeShop>) => MutableModel<CoffeeShop> | void): CoffeeShop;
}