import React, { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css"
import "primereact/resources/primereact.min.css"
import "primeflex/primeflex.css"
import { setToken } from './authSlice';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from './authApiSlice';
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { useForm, Controller } from 'react-hook-form';
import { jwtDecode } from "jwt-decode"
import '../../css/main.css'
import '../../css/util.css'
import { Checkbox } from 'primereact/checkbox';
import image from './building.jpg'
const Login = () => {
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loginFunc, { isError, error, isSuccess, data }] = useLoginMutation()

    useEffect(() => {
        if (data) {
            const userDecoded = jwtDecode(data.token)

            const { _id, name, userName, phone, role, email } = userDecoded
            if (isSuccess) {
                dispatch(setToken(data))
                if (role === "manager") {

                    navigate('/HomeManager/Home')
                }
                else if (role === "worker" || role === "advancedWorker")
                    navigate('/HomeWorker/Home')

            }
            else {

            }
        }

    }, [isSuccess])

    const defaultValues = {
        userName: '',
        password: ''
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        loginFunc(data)
    };
    useEffect(() => {
        if (isError) {
            alert(error.data.message)

        }
    }, [isError])

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <div class="limiter">
            <div class="container-login100">
                <div class="wrap-login100">
                    <form class="login100-form validate-form" onSubmit={handleSubmit(onSubmit)}>
                        <span class="login100-form-title p-b-46">
                            כניסה   </span>
                        <div class="wrap-input100 validate-input" data-validate="שם משתמש חובה" >
                            
                            <Controller name="userName" control={control} rules={{ required: 'שם משתמש הוא חובה' }} render={({ field, fieldState }) => (
                                <input class="input100"  id={field.name} {...field}  placeholder="שם משתמש"  />

                            )} />

                            {/* <span class="focus-input100"></span>
                            <span class="label-input100" >שם משתמש</span> */}
                            {getFormErrorMessage('userName')}
                        </div>


                        <div class="wrap-input100 validate-input" data-validate="סיסמא חובה">
                            
                            <Controller name="password" control={control} rules={{ required: '.סיסמא חובה' }} render={({ field, fieldState }) => (
                                <input class="input100" type="password" id="myInput" {...field} feedback={false} placeholder="סיסמא"  />


                            )} />
                            {/* <span class="focus-input100"></span>
                            <span class="label-input100">סיסמא</span> */}
                            {getFormErrorMessage('password')}
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox checked={checked} onClick={myFunction => {
                                var x = document.getElementById("myInput");
                                if (x.type === "password") {
                                    setChecked(true)
                                    x.type = "text";
                                } else {
                                    x.type = "password";
                                    setChecked(false)
                                }
                            }}></Checkbox>
                            <label className="ml-2">הצגת סיסמא</label>
                        </div>
                        <br>
                        </br>

                        <div class="container-login100-form-btn">
                            <button class="login100-form-btn" type="submit">
                                כניסה
                            </button>
                        </div>

                    </form>

                    <div class="login100-more" style={{ backgroundImage: `url(${image})` }}>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Login


