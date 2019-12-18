import React from 'react';
import "components/styles.scss";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function CreateCategory(props) {

  const accountants = props.accountants
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
          label="Category Name"
          multiline
          rowsMax="4"
          value={category}
          onChange={handleChangeCategoryName}
        />

      <TextField
        id="standard-select-accountant"
        select
        label="Accountant"
        value={accountant}
        onChange={handleChangeAccountant}
        helperText="Please select your accountant"
      >
        {accountants.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <div className="create" onClick={() => console.log("create category")}>Create</div>
    </div>
  );
}