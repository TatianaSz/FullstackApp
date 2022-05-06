import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { RegisterInput } from '../components/RegisterInput';
import { useRegisterUserMutation } from '../generated/graphql';
import { useTranslation } from 'react-i18next';
import { errorFormat } from '../utils/register';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const { t } = useTranslation();
  const [{}, register] = useRegisterUserMutation();

  function validateName(value) {
    if (!value) {
      return t('register.invalid.usernameRequired');
    } else if (value.length < 4) {
      return t('register.invalid.usernameTooShort');
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
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data.createUser.errorArr.length > 0) {
            console.log(response.data?.createUser.errorArr);
            setErrors(errorFormat(response.data.createUser.errorArr));
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
            <FormControl isInvalid={props.touched.confirmPassword}>
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
              {props.touched.confirmPassword ? (
                <FormErrorMessage>dsahfdsfmkjh</FormErrorMessage>
              ) : null}
              {console.log(props.touched.confirmPassword)}
            </FormControl>
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
