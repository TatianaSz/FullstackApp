import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { RegisterInput } from "../components/RegisterInput";
import { useRegisterUserMutation } from "../generated/graphql";
import { useTranslation } from "react-i18next";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const { t } = useTranslation();
  const [{}, register] = useRegisterUserMutation();

  function validateName(value) {
    let error;
    if (!value) {
      error = "Username is required";
      return error;
    }
  }
  return (
    <Box mx="auto" maxW="sm" mt="5">
      <div>{t("test")}</div>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={async (values, actions) => {
          const response = await register(values);
          if (response.data.createUser.errorArr.length > 0) {
            console.log(response.data.createUser.errorArr);
          }
        }}
      >
        {(props) => (
          <Form>
            <RegisterInput
              name="username"
              label="Username"
              validate={validateName}
            />
            <RegisterInput name="email" label="Email" />
            <RegisterInput name="password" label="Password" type="password" />
            <RegisterInput
              name="confirmPassword"
              label="Confirm password"
              type="password"
            />
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              isLoading={props.isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
