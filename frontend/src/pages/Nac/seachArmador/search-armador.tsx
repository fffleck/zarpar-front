import React, { useState, useEffect, useCallback } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Chip, Box, OutlinedInput } from '@mui/material';
import api from '../../../services/api';
import debounce from 'lodash/debounce';

function SearchArmador({ value = [], onChange = () => {}, inputValue, onInputChange }) {
  const [options, setOptions] = useState([]);

  const fetchOptions = async () => {
    try {
      const response = await api.get('filters/armadores');
      // Adicionando a opção "todos" ao array de armadores
      // const armadores = response.data.map(item => ({ label: `${item.name}`, value: item.idArmador }));
      // const optionsWithTodos = [{ label: 'TODOS', value: 'todos' }, ...armadores];
      // setOptions(optionsWithTodos);
      setOptions(response.data.map(item => ({ label: `${item.name}`, value: item.idArmador })));
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const debouncedFetchOptions = useCallback(
    debounce(async () => {
      await fetchOptions();
    }, 300),
    []
  );

  useEffect(() => {
    debouncedFetchOptions();
  }, [debouncedFetchOptions]);

  const handleInputChange = (event) => {
    const newInputValue = event.target.value;
    if (onInputChange) {
      onInputChange(event, newInputValue);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    onChange(event, typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div className="col-md-12">
      <FormControl fullWidth>
        <InputLabel id="multiple-chip-label">Armador</InputLabel>
        <Select
          labelId="multiple-chip-label"
          multiple
          value={Array.isArray(value) ? value : []}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" name='Armadores' label="Armador" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={options.find(option => option.value === value)?.label || value} />
              ))}
            </Box>
          )}
          onOpen={fetchOptions}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SearchArmador;
