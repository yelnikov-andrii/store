import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql `
query {
  categories {
    name, products {
      name, id, brand, description, inStock, gallery, prices {
        currency {
          symbol
        } amount
      },
      attributes {
        id, name, type, items {
          value, id, displayValue
        }
      }
    }
  }
}
`;

export const GET_CURRENCIES = gql `
query {
  currencies {
    label, symbol
  }
}
`;