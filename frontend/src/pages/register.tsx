import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { RegisterInput } from '../components/RegisterInput';
import { useRegisterUserMutation } from '../generated/graphql';
import { useTranslation } from 'react-i18next';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const { t } = useTranslation();
  const [{}, register] = useRegisterUserMutation();

  function validateName(value) {
    let error;
    if (!value) {
      error = 'Username is required';
      return error;
    }
  }
  return (
    <Box mx='auto' maxW='sm' mt='5'>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async (values, actions) => {
          const response = await register(values);
          if (response.data.createUser.errorArr.length > 0) {
            console.log(response.data.createUser.errorArr);
          }
        }}
      >
        {props => (
          <Form>
            <RegisterInput
              name='username'
              label={t('register.username')}
              validate={validateName}
            />
            <RegisterInput name='email' label={t('register.email')} />
            <RegisterInput
              name='password'
              label={t('register.password')}
              type='password'
            />
            <RegisterInput
              name='confirmPassword'
              label={t('register.confirmPassword')}
              type='password'
            />
            <Button
              mt={4}
              colorScheme='teal'
              type='submit'
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
