import React, { useState, useEffect } from 'react'
import { Form as Formik, Field, withFormik } from 'formik'
import { Form, Segment} from 'semantic-ui-react'
import * as Yup from "yup";

import Axios from 'axios';
import CardContent from './card'

 const FormComp = ({ status }) => {
    const [user, setUser] = useState([])
    //console.log(status)
    useEffect(() => {
        // status sometimes comes through as undefined
        if (status) {
            setUser([...user, status])
        }
    }, [status]);
    user.map(e => <CardContent data={e} />)
    return (
        <Segment raised compact>
            <Form>
                <Formik>
                    <Form.Field>
                        <Field type="name" name="name" placeholder="Name" />
                    </Form.Field>
                    <Form.Field>
                        <Field type="password" name="password" placeholder="Password" />
                    </Form.Field>
                    <button type="submit">Submit</button>
                    {user.map(e => <CardContent data={e} />)}
                </Formik>
            </Form>
        </Segment>
    )
}
const FormikForm = withFormik({

     mapPropsToValues(values) {
        return {
            name: values.name || '',
            password: values.password || '',
           
        }
    },

   validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(3, "must be 3 characters")
      .required("This field is required"),
    email: Yup.string()
      .email("Not valid entry")
      .required("This field is required"),
    password: Yup.string()
      .min(6, "At least 6 characters")
      .required("This field is required"),
    terms: Yup.boolean().oneOf([true], "Must Agree To TOS")
  }),
    handleSubmit(values, { setStatus }) {

         Axios.post('https://reqres.in/api/users/', values)
            .then(res => setStatus(res.data))
    }
})(FormComp);

 export default FormikForm; 