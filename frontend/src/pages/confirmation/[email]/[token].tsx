import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { NextPage } from "next";
import { useValidateMutation } from "../../../generated/graphql";
import { useTranslation } from "react-i18next";

import styles from "./../../../styles/token.module.css";

const ValidateEmail: NextPage<{ email: string; token: string }> = ({
  email,
  token,
}) => {
  const { t } = useTranslation();
  const [, validateToken] = useValidateMutation();
  return (
    <Container className={styles.background} maxW="full" pt="5" centerContent>
      <Box
        borderRadius="lg"
        mt="1"
        p="8"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        isTruncated
        bg="white"
      >
        <div>{t("token.validated.main")}</div>
        <div>{t("token.validated.message")}</div>
        <button
          onClick={() => {
            validateToken({ userToken: token, email: email });
          }}
        >
          {t("token.goBack")}
        </button>
      </Box>
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
