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
        <div className="categories"
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
      <div className="clients"
        key={client.id}>
        <Collapsible trigger={<div className="client-trigger">{client.name}</div>} className="clientsList">
          {categoriesList}
        </Collapsible>
      </div>

    )
  })

  //main view
  return (
    <div className="clients-list">
      <div className='items-container'>
        {clientsList}
      </div>
    </div>
  );
}