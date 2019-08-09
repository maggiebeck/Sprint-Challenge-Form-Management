import React, { useState, useEffect } from 'react'
import { Form as Formik, Field, withFormik } from './node_modules/formik'
import { Form, Segment} from 'semantic-ui-react'

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
            email: values.email || '',
            password: values.password || '',
            Checkbox: values.Checkbox
        }
    },
    handleSubmit(values, { setStatus }) {

         Axios.post('https://reqres.in/api/users/', values)
            .then(res => setStatus(res.data))
    }
})(FormComp);

 export default FormikForm; 