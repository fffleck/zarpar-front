import React, { useState, useEffect, useCallback } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, OutlinedInput, Chip, Box } from '@mui/material';
import api from '../../../services/api';
import debounce from 'lodash/debounce';

function SearchArmador({ value = [], onChange = () => {}, inputValue, onInputChange }) {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(null);

  const fetchOptions = async () => {
    try {
      const response = await api.get('filters/armadores');
      const armadores = response.data.map(item => ({ label: `${item.name}`, value: item.idArmador }));
      const optionsWithTodos = [{ label: 'TODOS', value: 'todos' }, ...armadores];
      setOptions(optionsWithTodos);
    } catch (error) {
      console.error('Error fetching options:', error);
      setError('Erro ao buscar opções');
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
    let newValue = typeof value === 'string' ? value.split(',') : value;

    if (newValue.includes('todos')) {
      newValue = ['todos'];
    } else {
      newValue = newValue.filter(item => item !== 'todos');
    }

    onChange(event, newValue);
  };

  return (
    <div className="col-md-12">
      <FormControl fullWidth>
        <InputLabel id="multiple-checkbox-label">Armador</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          multiple
          value={Array.isArray(value) ? value : []}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-checkbox" name='Armadores' label="Armador" />}
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
            <MenuItem key={option.value} value={option.value} disabled={value.includes('todos') && option.value !== 'todos'}>
              <Checkbox checked={value.indexOf(option.value) > -1} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </FormControl>
    </div>
  );
}

export default SearchArmador;
