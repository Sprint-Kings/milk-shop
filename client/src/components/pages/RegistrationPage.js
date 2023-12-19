import { useState} from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import * as styles from '../../styles.js';


import AuthService from "../../services/AuthService";

import Spinner from '../spinner/Spinner';

const RegistrationPage = () => {
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .required("Введите ваше имя"),
        surname: Yup.string()
            .required("Введите вашу фамилию"),
        patronymic: Yup.string()
            .required("Введите ваше отчество"),
        login: Yup.string()
          .required("Придумайте логин")
          .min(6, "Логин должен иметь минимум 6 символов")
          .max(20, "Логин не должен быть больше 20 символов"),
        email: Yup.string().required("Введите электронную почту").email("Неправильный адрес электронной почты"),
        password: Yup.string()
          .required("Придумайте пароль")
          .min(6, "Пароль должен иметь минимум 6 символов")
          .max(40, "Пароль не должен быть больше 40 символов"),
        confirm_password: Yup.string()
            .required('Повторите пароль')
            .oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
        rules: Yup.bool().required('Подтвердите согласие')
    });

    const formik = useFormik({
      initialValues: {
        firstname: "",
        surname: "",
        patronymic: "",
        login: "",
        email: "",
        password: "",
        confirm_password: "",
        rules: false,
    },
    validationSchema,
    onSubmit: (data) => {
        setLoading(true)
        AuthService.register(data.firstname, data.email, data.password, data.surname, data.patronymic, data.login).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                setLoading(false);
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
                setMessage(resMessage);
                setSuccessful(false);
                setLoading(false)
            }
          );           
    }});

    const spinner = loading ? <div><Spinner/></div> : null;
    const congratulation = successful && !loading ? 
    <div style={{display: 'flex', width: '90%', justifyContent: 'center', margin: '5%', marginBottom: '30%', flexDirection: 'row'}}>
              <h2>{message}</h2>
        </div> : null;
    const content = !successful && !loading ? 
        <div style={{display: 'flex', width: '90%', justifyContent: 'center', margin: '5%', marginBottom: '30%', flexDirection: 'row'}}>
            <div style={{width: '40%', borderColor: 'green', borderWidth: '30px'}}>
                
                    <h1>Регистрация</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="firstname">Имя</label>
                            {formik.errors.firstname && formik.touched.firstname ?
                                <styles.InputInvalid type="text" name="firstname" value={formik.values.firstname} onChange={formik.handleChange}>
                                </styles.InputInvalid> :
                                <styles.Input type="text" name="firstname" value={formik.values.firstname} onChange={formik.handleChange}>
                                </styles.Input>

                            }
                            
                            <p style={{color: '#dc3545'}}>{formik.errors.firstname && formik.touched.firstname
                                ? formik.errors.firstname
                            : null}</p>
                        </div>
                        <div>
                            <label htmlFor="surname">Фамилия</label>
                            {formik.errors.surname && formik.touched.surname ?
                                <styles.InputInvalid type="text" name="surname" value={formik.values.surname} onChange={formik.handleChange}>
                                </styles.InputInvalid> :
                                <styles.Input type="text" name="surname" value={formik.values.surname} onChange={formik.handleChange}>
                                </styles.Input>

                            }
                            
                            <p style={{color: '#dc3545'}}>{formik.errors.surname && formik.touched.surname
                                ? formik.errors.surname
                            : null}</p>
                        </div>
                        <div>
                            <label htmlFor="patronymic">Отчество</label>
                            {formik.errors.patronymic && formik.touched.patronymic ?
                                <styles.InputInvalid type="text" name="patronymic" value={formik.values.patronymic} onChange={formik.handleChange}>
                                </styles.InputInvalid> :
                                <styles.Input type="text" name="patronymic" value={formik.values.patronymic} onChange={formik.handleChange}>
                                </styles.Input>

                            }
                            
                            <p style={{color: '#dc3545'}}>{formik.errors.patronymic && formik.touched.patronymic
                                ? formik.errors.patronymic
                            : null}</p>
                        </div>
                        <div>
                            <label htmlFor="login">Логин</label>
                            {formik.errors.login && formik.touched.login ?
                                <styles.InputInvalid type="text" name="login" value={formik.values.login} onChange={formik.handleChange}>
                                </styles.InputInvalid> :
                                <styles.Input type="text" name="login" value={formik.values.login} onChange={formik.handleChange}>
                                </styles.Input>

                            }
                            
                            <p style={{color: '#dc3545'}}>{formik.errors.login && formik.touched.login
                                ? formik.errors.login
                            : null}</p>
                        </div>
                        <div>
                            <label htmlFor="email">E-mail</label>
                            {formik.errors.email && formik.touched.email ?
                                <styles.InputInvalid type="text" name="email" value={formik.values.email} onChange={formik.handleChange}>
                                </styles.InputInvalid> :
                                <styles.Input type="text" name="email" value={formik.values.email} onChange={formik.handleChange}>
                                </styles.Input>

                            }
                            
                            <p style={{color: '#dc3545'}}>{formik.errors.email && formik.touched.email
                                ? formik.errors.email
                            : null}</p>
                        </div>
                        <div>
                            <label htmlFor="password">Пароль</label>
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
                        <div>
                            <label htmlFor="confirm_password">Подтвердите пароль</label>
                            {formik.errors.confirm_password && formik.touched.confirm_password ?
                                <styles.InputInvalid type="password" name="confirm_password" value={formik.values.confirm_password} onChange={formik.handleChange}>
                                </styles.InputInvalid> :
                                <styles.Input type="password" name="confirm_password" value={formik.values.confirm_password} onChange={formik.handleChange}>
                                </styles.Input>

                            }
                            
                            <p style={{color: '#dc3545'}}>{formik.errors.confirm_password && formik.touched.confirm_password
                                ? formik.errors.confirm_password
                            : null}</p>
                        </div>
                        <div>
                        <label htmlFor="rules">Пользовательское соглашение</label>
                            {formik.errors.rules && formik.touched.rules ?
                                <styles.InputInvalid type="checkbox" name="rules" onChange={formik.handleChange}>
                                </styles.InputInvalid> :
                                <styles.Input type="checkbox" name="rules" onChange={formik.handleChange}>
                                </styles.Input>

                            }
                            <p style={{color: '#dc3545'}}>{formik.errors.rules && formik.touched.rules
                                ? formik.errors.rules
                            : null}</p>
                        </div>
                        <div style ={{textAlign: 'center'}}>
                        <styles.Button type="submit">
                            Зарегестрироваться
                        </styles.Button>
                        </div>
                        { message ? <p style={{color: '#dc3545'}}>{message}</p> : null}
                    </form>
                </div>           
            
        </div> : null;
    
    return (
        <>
            {spinner}
            {congratulation}
            {content}
        </>
    );
};

export default RegistrationPage;