import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { RegisterInput } from "../components/RegisterInput";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  function validateName(value) {
    let error;
    if (!value) {
      error = "Username is required";
      return error;
    }
  }
  return (
    <Box mx="auto" maxW="sm" mt="5">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, actions) => {
          console.log(values, actions);
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
            <Button mt={4} colorScheme="teal" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
