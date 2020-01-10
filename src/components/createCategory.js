import React from 'react';
import "components/styles.scss";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { FormHelperText } from '@material-ui/core';

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

  //check if field empty
  const [error, setError] = React.useState(false);

  //reset form after successfuly creating
  const resetForm = () => {
    setError(false)
    setCategoryName('')
    setAccountant('')
  }

  return (
    <div className="newCategory">
      <TextField
        className="textField"
        required={true}
        id="standard-multiline-flexible"
        label="Category"
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
          onClick={() => {
            if (!category || !accountant) {
              setError(true)
            }
            else {
              props.create(category, accountant)
              resetForm()
            }
          }}>Create
      </div>
        <div
          className="create"
          onClick={() => props.back()}>Back
        </div>
      </div>
      {error === true && <FormHelperText className="error" error={error}>All fields required</FormHelperText>}
    </div>
  );
}