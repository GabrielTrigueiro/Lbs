import React, { useEffect, useState } from "react";
import { TextField, TextFieldProps, FormHelperText, InputAdornment } from "@mui/material";


type TDefaultTextField<T> = {
  name: string;
  label: string;
  value: number;
  props?: TextFieldProps;
  small?: boolean;
  error?: boolean | undefined;
  helperText?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  onBlur?:
    | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties | undefined;
};

function PriceTextField<T>({
    name,
    label,
    value,
    props,
    small,
    helperText,
    error,
    type,
    onBlur,
    onChange,
    style,
  }: TDefaultTextField<T>) {

  
    const [currentValue, setCurrentValue] = useState<string>(`${value}`);

    useEffect(() => {
      const valueString = `${value}`;
  
      if (!/\D/.test(valueString.replace('.', ''))) {
        setCurrentValue(value.toFixed(2).toString().replace('.', ','));
        console.log(value)
      }
    }, [value]);
  
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const valueRemoved = event.target.value.replace(',', '');
  
      const sizeSlice = valueRemoved.length - 2;
      const newValue = [valueRemoved.slice(0, sizeSlice), '.', valueRemoved.slice(sizeSlice)].join(
        '',
      );
  
      onChange({
        ...event,
        target: {
          ...event.target,
          value: newValue,
        },
      });
    };
  
    return (
      <TextField
        helperText={
          error && (
            <FormHelperText sx={{ margin: -0.5, padding: 0 }} error={error}>
              {String(helperText)}
            </FormHelperText>
          )
        }
        onChange={handleOnChange}
        onBlur={onBlur}
        type={type ? type : undefined}
        size={small ? "small" : "medium"}
        variant="outlined"
        autoComplete="off"
        margin="none"
        id={name}
        label={label}
        InputProps={{
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        }}
        value={String(currentValue)}
        error={error}
        style={style}
        {...props}

      />
    );
  }
  
  export default PriceTextField;