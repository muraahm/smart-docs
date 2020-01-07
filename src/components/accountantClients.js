import React from 'react';
import Collapsible from 'react-collapsible';
import "components/styles.scss";

export default function AccountantClients(props) {
  //prevent erroring out if the accountant does not have clients
  const clients = props.state.userInfo.users ? props.state.userInfo.users : [];

  const clientsList = clients.map(client => {

    //generate all clients for the accountant
    const categoriesList = client.categories.map(category => {
      return (
        <div className="categoryItem"
          key={category.category_id}
          id={category.category_id}
          clientemail={client.email}
          categoryname={category.category_name}
          onClick={() => props.viewCategory(category, client.id, client.email, client.name)}
        >{category.category_name}
        </div>
      )
    })

//generate all categories for one client
    return (
      <div className="categoryItem"
        key={client.id}>
        <Collapsible trigger={client.name}>
          <div className="categoryItem"
          >{categoriesList}</div>
        </Collapsible>
      </div>

    )
  })

  //main view
  return (
    <div className="categoryList">
      {clientsList}
    </div>
  );
}