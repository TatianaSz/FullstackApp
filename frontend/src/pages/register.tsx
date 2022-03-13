import React from "react";
import {Field, Form, Formik} from "formik"
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

interface registerProps{

}

const Register: React.FC<registerProps> = ({}) => {
    return (
      <Formik initialValues={{ username: '', password: "" }}
      onSubmit={(values, actions) => {
        console.log(values, actions)
      }}>
       {
           ()=>(
               <Form>
                   <Field name='username'>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.username && form.touched.username}>
                            <FormLabel htmlFor='username'>Username</FormLabel>
                            <Input {...field} id='username' placeholder='username' />
                            <FormErrorMessage>{form.errors.username}</FormErrorMessage>
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