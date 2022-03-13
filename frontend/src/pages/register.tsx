import React from "react";
import {Field, Form, Formik} from "formik"
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

interface registerProps{

}

const Register: React.FC<registerProps> = ({}) => {
    function validateName(value) {
        let error
        if (!value) {
          error = 'Username is required'
        return error
      }
    }
    return (
      <Formik initialValues={{ username: '', password: "" }}
      onSubmit={(values, actions) => {
        console.log(values, actions)
      }}>
       {
           (props)=>(
               <Form>
                   <Field name='username' validate={validateName}>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.username && form.touched.username}>
                            <FormLabel htmlFor='username'>Username</FormLabel>
                            <Input {...field} id='username' placeholder='username' />
                            <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                           {console.log("prop", props)}
                        </FormControl>
                        )}
                    </Field>
            <Button
            mt={4}
            colorScheme='teal'
            type='submit'
            >
            Submit
          </Button>
               </Form>
           )
       }
      </Formik>
    )
  }

export default Register