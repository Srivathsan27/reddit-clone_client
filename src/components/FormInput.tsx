import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  SpacerProps,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import { FC } from "react";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  boxProps?: SpacerProps;
  inputType?: "input" | "textarea";
  labelColor?: string;
};

const FormInput: FC<FormInputProps> = ({
  size: _,
  boxProps,
  inputType,
  labelColor,
  ...props
}) => {
  let Comp: any = Input;
  if (inputType === "textarea") {
    Comp = Textarea;
  }
  const [field, { error }] = useField(props);
  return (
    <Box {...boxProps}>
      <FormControl isInvalid={!!error}>
        <FormLabel
          htmlFor={field.name}
          color={labelColor ? labelColor : "teal"}
        >
          {props.label}
        </FormLabel>
        <Comp
          color="white"
          {...props}
          id={field.name}
          placeholder={props.label}
          {...field}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};

export default FormInput;
