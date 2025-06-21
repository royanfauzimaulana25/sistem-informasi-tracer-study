// src/components/RadioGroup.jsx
import React from 'react';

function RadioGroup({ label, name, options, selectedValue, onChange }) {
  return (
    <div className="flex flex-col">
      <p className="block text-gray-700 text-sm font-medium mb-2">{label}</p>
      <div className="flex flex-col space-y-2">
        {options.map((option) => (
          <label key={option.value} className="inline-flex items-center">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={onChange}
              className="form-radio h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"
            />
            <span className="ml-2 text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default RadioGroup;