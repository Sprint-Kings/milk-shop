import { useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from 'yup';
import * as styles from '../../styles.js';


import AuthService from "../../services/AuthService";

import Spinner from '../spinner/Spinner';

const LoginPage = () => {
    let navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        username: Yup.string()
          .required("Введите логин"),
        password: Yup.string()
          .required("Введите пароль")
    });

    const formik = useFormik({
        initialValues: {
        username: "",
        password: "",
    },
    validationSchema,
    onSubmit: (data) => {
        setLoading(true)
        AuthService.login(data.username, data.password).then(
            () => {
                setLoading(false)
                navigate("/");
                window.location.reload();
            },
            (error) => {
                const resMessage =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();

                setMessage(resMessage);
                setLoading(false)
            }
        );
                    
    }});

    const spinner = loading ? <div><Spinner/></div> : null;
    const content = !loading ?
    <div style={{display: 'flex', width: '90%', justifyContent: 'center', margin: '5%', marginBottom: '30%', flexDirection: 'row'}}>
            <div style={{width: '40%', borderColor: 'green', borderWidth: '30px'}}>

                    <h1 style={{color: '#3F4FD9'}}>Вход</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="username" style={{color: '#3F4FD9'}}>Логин</label>
                            {formik.errors.username && formik.touched.username ?
                                <styles.InputInvalid type="text" name="username" value={formik.values.username} onChange={formik.handleChange}>
                                </styles.InputInvalid> :
                                <styles.Input type="text" name="username" value={formik.values.username} onChange={formik.handleChange}>
                                </styles.Input>

                            }
                            
                            <p style={{color: '#dc3545'}}>{formik.errors.username && formik.touched.username
                                ? formik.errors.username
                            : null}</p>
                        </div>
                        <div>
                            <label htmlFor="password" style={{color: '#3F4FD9'}}>Пароль</label>
                            {formik.errors.password && formik.touched.password ?
                                <styles.InputInvalid type="password" name="password" value={formik.values.password} onChange={formik.handleChange}>
                                </styles.InputInvalid> :
                                <styles.Input type="password" name="password" value={formik.values.password} onChange={formik.handleChange}>
                                </styles.Input>

                            }
                            
                            <p style={{color: '#dc3545'}}>{formik.errors.password && formik.touched.password
                                ? formik.errors.password
                            : null}</p>
                        </div>
                        <div style ={{textAlign: 'center'}}>
                        <styles.Button type="submit">
                            Войти
                        </styles.Button>
                        </div>
                        { message ? <p style={{color: '#dc3545'}}>{message}</p> : null}
                    </form>

            </div>
        </div> : null;
    return (
        <>
            {spinner}
            {content}
        </>
    );
};

export default LoginPage;