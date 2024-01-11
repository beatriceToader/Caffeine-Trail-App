/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCoffeeShop = /* GraphQL */ `
  query GetCoffeeShop($id: ID!) {
    getCoffeeShop(id: $id) {
      id
      image
      name
      address
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCoffeeShops = /* GraphQL */ `
  query ListCoffeeShops(
    $filter: ModelCoffeeShopFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoffeeShops(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        image
        name
        address
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
