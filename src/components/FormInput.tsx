import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";

import {FormHelperText, Input,Typography ,InputProps, FormControl } from "@mui/material"
type IFormInputProps = {
    name: string;
    label: string;
} & InputProps;

const FormInput: FC<IFormInputProps> = ({ name, label, ...otherProps }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext()
    return (
        <Controller
            control={control}
            defaultValue=""
            name={name}
            render={({ field }) => (
                <FormControl fullWidth sx={{mb:2}}>
                    <Typography sx={{color: "dark-gray"}}>{label}</Typography>
                    <Input 
                    {...field}
                    fullWidth
                    disableUnderline
                    error={!!errors[name]}
                    {...otherProps}
                    sx={{color: "white"}}
                    />
                    <FormHelperText error={!!errors[name]}>
                        {errors[name]?(errors[name]?.message as unknown as string):""}
                    </FormHelperText> 
                </FormControl>
            )}
        />
    )
};

export default FormInput;