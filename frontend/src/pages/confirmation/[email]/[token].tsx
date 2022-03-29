import React from "react";
import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { useValidateMutation } from "../../../generated/graphql";

const ValidateEmail: NextPage<{ email: string; token: string }> = ({
  email,
  token,
}) => {
  const [, validateToken] = useValidateMutation();
  return (
    <Box mx="auto" maxW="sm" mt="5">
      <button
        onClick={() => {
          validateToken({ userToken: token, email });
        }}
      >
        {token}
      </button>
      <div>{typeof token}</div>
    </Box>
  );
};

ValidateEmail.getInitialProps = ({ query }) => {
  return {
    email: query.email as string,
    token: query.token as string,
  };
};

export default ValidateEmail;
