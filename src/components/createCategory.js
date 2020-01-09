import React from 'react';
import "components/styles.scss";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function CreateCategory(props) {

  const accountants = props.accountants;

  //handle create category inputs for the api call to server
  const [accountant, setAccountant] = React.useState('');
  const handleChangeAccountant = event => {
    setAccountant(event.target.value);
  };
  const [category, setCategoryName] = React.useState('');
  const handleChangeCategoryName = event => {
    setCategoryName(event.target.value);
  };

  return (
    <div className="newCategory">
      <TextField
        className="textField"
        required={true}
        id="standard-multiline-flexible"
        label="Category"
        multiline
        rowsMax="4"
        value={category}
        onChange={handleChangeCategoryName}
      />

      <TextField
        className="textField"
        id="standard-multiline-flexible"
        select
        label="Accountant"
        value={accountant}
        onChange={handleChangeAccountant}
      >
        {accountants.map(option => (
          <MenuItem key={option.id} value={option.company}>
            {option.company}
          </MenuItem>
        ))}
      </TextField>
      <div className="actions">
        <div
          className="create"
          onClick={() => props.create(category, accountant)}>Create
      </div>
        <div
          className="create"
          onClick={() => console.log('back')}>Back
        </div>
      </div>

    </div>
  );
}