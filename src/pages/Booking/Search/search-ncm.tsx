import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import api from '../../../services/api';

function SearchNcm({ value, onChange, inputValue, onInputChange }) {
  const [options, setOptions] = useState([]);

  const fetchOptions = async (inputValue) => {
    try {
      const response = await api.post('filters/ncms', { code: inputValue });
      
      return response.data.map(item => ({ label: item.code+' - '+item.name, value: item.code }));
    } catch (error) {
      console.error('Error fetching options:', error);
      return [];
    }
  };

  const handleInputChange = async (event, newInputValue) => {
    if (onInputChange) {
      onInputChange(event, newInputValue);
    }

    const newOptions = await fetchOptions(newInputValue);
    setOptions(newOptions);
  };

  const handleOptionClick = (event, newValue) => {
    if (onChange) {
      onChange(event, newValue);
    }

    if (onInputChange) {
      onInputChange(event, newValue);
    }
  };

  return (
    <div className="col-md-12">
    <Autocomplete
      value={value}
      onChange={handleOptionClick}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={options}
      renderInput={(params) => <TextField {...params} name="nomeMercadoria" label="Code/Name Mercadoria" />}
    />
    </div>
  );
}



export default SearchNcm;
