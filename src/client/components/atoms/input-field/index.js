import React from 'react';
import PropTypes from 'prop-types';

import { InputFieldStyles } from './styles';

const InputField = ({
    id, placeholder, value,
    disabled, max, onChange,
}) => {
    return (
        <InputFieldStyles
            id={id}
            placeholder={placeholder}
            autoComplete={"off"}
            value={value}
            disabled={disabled}
            onChange={(e) => handleOnChange(e)}
        />
    );

    function handleOnChange (e) {
        if ((!max || _.get(e, ['target', 'value', 'length']) <= max) && !disabled) {
            onChange(e);
        }
    }
};

export default InputField;