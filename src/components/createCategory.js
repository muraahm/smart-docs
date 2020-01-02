import React from 'react';
import "components/styles.scss";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function CreateCategory(props) {

  const accountants = props.accountants;

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
          id="standard-multiline-flexible"
          label="Category"
          multiline
          rowsMax="4"
          value={category}
          onChange={handleChangeCategoryName}
        />

      <TextField
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
      <div className="create" onClick={() => props.create(category, accountant)}>Create</div>
    </div>
  );
}