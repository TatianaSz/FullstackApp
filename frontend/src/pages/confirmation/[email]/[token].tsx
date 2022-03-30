import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { NextPage } from "next";
import { useValidateMutation } from "../../../generated/graphql";
import styles from "./../../../styles/token.module.css";

const ValidateEmail: NextPage<{ email: string; token: string }> = ({
  email,
  token,
}) => {
  const [, validateToken] = useValidateMutation();
  return (
    <Container className={styles.background} mx="auto" maxW="full" pt="5">
      <button
        onClick={() => {
          validateToken({ userToken: token, email: email });
        }}
      >
        {token}
      </button>
      <div>{email}</div>
    </Container>
  );
};

ValidateEmail.getInitialProps = ({ query }) => {
  return {
    email: query.email as string,
    token: query.token as string,
  };
};

export default ValidateEmail;
