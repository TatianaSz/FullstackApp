import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FieldConfig, useField } from "formik";
import React from "react";

type RegisterInputProps = FieldConfig<any> & {
  label: string;
};

export const RegisterInput: React.FC<RegisterInputProps> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <Box mt="4">
      <FormControl isInvalid={!!meta.touched && !!meta.error}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Input
          {...field}
          id={field.name}
          placeholder={label}
          type={props.type}
        />
        {meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
      </FormControl>
    </Box>
  );
};
