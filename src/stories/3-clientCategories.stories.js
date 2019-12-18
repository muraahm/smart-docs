import React from "react";
import Clientcategories from "components/clientCategories";
import CreateCategory from "components/createCategory";

const categories = [
  {id: 1, categoryname: "Personal", accountantname: "Acct1"},
  {id: 2, categoryname: "Business", accountantname: "Acct2"}
]

const accountants = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export default {
  title: "Client categories"
};

export const Categories = () => (
  
  <Clientcategories 
  categories={categories}
  >
  </Clientcategories>
);

export const Create = () => (
  <CreateCategory 
  accountants={accountants}
  >
  </CreateCategory>
);