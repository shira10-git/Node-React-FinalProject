
import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import { setToken } from './authSlice';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from './authApiSlice';
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { useForm, Controller } from 'react-hook-form';
import { Divider } from 'primereact/divider';
import { jwtDecode } from "jwt-decode"
import useAuth from "./useAuth";
import '../../css/main.css'
import '../../css/util.css'
import image from './building.jpg'
const Login = () => {
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loginFunc, { isError, error, isSuccess, data }] = useLoginMutation()
    // const { _id,name,userName,role,email} = useAuth()
    // const [rol,setRol]=useState(role)
    // console.log("r3"+role);

    // useEffect(()=>{

    // },[role])
    // console.log("rrrr2222"+role);
    useEffect(() => {
        // console.log("aaaaa"+ role+"l");

        //   debugger
        if (data) {
            const userDecoded = jwtDecode(data.token)
            console.log("userDecoded", userDecoded)
            const { _id, name, userName, phone, role, email } = userDecoded
            if (isSuccess) {
                console.log("bbbbbbb" + role + "jj");
                dispatch(setToken(data))
                if (role === "manager") {

                    navigate('/HomeManager/Home')
                }
                else if (role === "worker" || role === "advancedWorker")
                    navigate('/HomeWorker')

                // console.log(data);
                // 
            }
            else {

            }
        }

        // return { _id,name,userName,phone,role,email}



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
                        <span class="login100-form-title p-b-43">
                            כניסה                        </span>
                        <div class="wrap-input100 validate-input" >
                            <Controller name="userName" control={control} rules={{ required: 'שם משתמש הוא חובה' }} render={({ field, fieldState }) => (
                                <input class="input100" id={field.name} {...field} autoFocus />

                            )} />
                            {/* <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>User Name*</label> */}
                            <span class="focus-input100"></span>
                            <span class="label-input100">שם משתמש</span>
                            {getFormErrorMessage('userName')}
                        </div>

                        {/* <div class="wrap-input100 validate-input" data-validate="Password is required">
						<input class="input100" type="password" name="pass" onChange={e=>setPassword(e.target.value)}/>
						<span class="focus-input100"></span>
						<span class="label-input100">Password</span> 
                         
					</div> */}
                        <div class="wrap-input100 validate-input" data-validate="סיסמא חובה">

                            <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                                <input class="input100" type="password" id={field.name} {...field} toggleMask />
                            )} />
                            {/* <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label> */}

                            <span class="focus-input100"></span>
                            <span class="label-input100">סיסמא</span>
                            {getFormErrorMessage('password')}
                        </div>
                        <div class="flex-sb-m w-full p-t-3 p-b-32">


                            <div>
                                <a href="#" class="txt1">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>


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




