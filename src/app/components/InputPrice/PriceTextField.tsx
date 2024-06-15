import React, { useEffect, useState } from "react";
import {
    InputProps,
    TextField,
    TextFieldProps,
    FormHelperText,
    InputBaseComponentProps,
} from "@mui/material";
import { removePointsExceptLast } from "core/utils/globalFunctions";

type TDefaultTextField<T> = {
    name: string;
    label: string;
    value: string;
    props?: InputProps & TextFieldProps;
    small?: boolean;
    priceNumber: number | undefined;
    setPriceNumber: React.Dispatch<React.SetStateAction<number | undefined>>;
    error?: boolean | undefined;
    helperText?: React.ReactNode;
    type?: React.HTMLInputTypeAttribute;
    onBlur?:
    | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
    onChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
    style?: React.CSSProperties | undefined;
};

function PriceTextField<T>({
    name,
    label,
    value,
    props,
    helperText,
    error,
    type,
    onBlur,
    onChange,
    style,
    priceNumber,
    setPriceNumber
}: TDefaultTextField<T>) {

    const formattedDisplayValue = (Number(value.replace(/\D/g, "")) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).replace("R$", "").replace(",", ".");
    setPriceNumber(removePointsExceptLast(formattedDisplayValue));
    
    
    return ( 
        <TextField
            helperText={
                error && (
                    <FormHelperText sx={{ margin: -0.5, padding: 0 }} error={error}>
                        {String(helperText)}
                    </FormHelperText>
                )
            }
            onChange={onChange}
            onBlur={onBlur}
            type={type ? type : undefined}
            size="small"
            variant="outlined"
            autoComplete="off"
            margin="none"
            id={name}
            label={label}
            value={formattedDisplayValue}
            error={error}
            style={style}
            InputProps={{
                startAdornment: <span>R$</span>, 
            }}
            {...props}
        />
    );
}

export default PriceTextField;