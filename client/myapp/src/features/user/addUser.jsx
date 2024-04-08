import React, { useRef, useState } from "react";
import { useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputMask } from "primereact/inputmask";

import { useForm, Controller } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';

import { useAddTodoMutation, useAddUserMutation } from './userApiSlice';
import { ListBox } from 'primereact/listbox';
import { PrimeIcons } from 'primereact/api';
import 'primeicons/primeicons.css';
import { Password } from 'primereact/password';
import { Toast } from "primereact/toast";
//import emailjs from '@emailjs/browser';




const AddUser = () => {
    const toast = useRef(null);
    // const [selectedRole, setSelectedRole] = useState({ name: 'worker' });
    // const roles = [
    //     { name: 'worker' },
    //     { name: 'manager' },
    //     { name: 'advancedWorker' }

    // ];
    const [visible, setVisible] = useState(false);
    const [addUser, { isError, isSuccess, error }] = useAddUserMutation()

    // useEffect(() => {
    //     const a = selectedRole[0]
    //     setFormData({ ...formData, ["role"]: selectedRole.name })
    //     console.log(selectedRole.name);
    // }, [selectedRole])

useEffect(() => {
        
        if (isError) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.data.message })
        }
    }, [error, isError])

    useEffect(() => {
        if (isSuccess) {
             toast.current.show({ severity: 'success', summary: 'Success', detail: `נשמרו הפרטים נשלח מייל ל: ${formData.name}  נא לאשר במייל ${formData.email}` })
        }
    }, [isSuccess])



    const saveUser = () => {
        addUser(formData)

    }
    const roles = [
      'worker' ,
       'manager' ,
       'advancedWorker' 

    ];

    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const defaultValues = {
        userName: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        role: 'worker'
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        setFormData(data);
        setShowMessage(true);
        setVisible(false)
        addUser(data)
        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
  




    
    return (

<>
         {/* <div className="form-demo"> */}
         <Button label="הוספת עובד" icon="pi pi-user-plus" onClick={() => setVisible(true)} ></Button>
           <Dialog 
           style={{}}
           visible={visible} 
           onHide={() => setVisible(false)}>
        
            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Register</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">
                            
                            <span className="p-float-label">
                                <Controller name="userName" control={control} rules={{ required: 'userName is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="userName" className={classNames({ 'p-error': errors.name })}>שם משתמש*</label>
                            </span>
                            {getFormErrorMessage('userName')}
                        </div><br></br>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="name" control={control} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field}  className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>שם</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div><br></br>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller name="email" control={control}
                                    rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>כתובת מייל*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div><br></br>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                                    <Password id={field.name} {...field} feedback={false} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} header={passwordHeader} />
                                )} />
                                <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>סיסמא*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div><br></br>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="role" control={control} render={({ field }) => (
                                    <Dropdown id={field.name}  value={field.value} onChange={(e) => field.onChange(e.value)} options={roles}  />
                                )} />
                                <label htmlFor="role">סוג עובד</label>
                            </span>
                        </div><br></br>

                        <Button type="submit" label="אישור" className="mt-2" />
                        <Button label="ביטול"  onClick={(e) => { setVisible(false)}}  className="mt-2"/>
                       
                    </form> 
                </div>
            </div></Dialog>
            <Toast ref={toast}></Toast>
        {/* </div> */}
        </>
    );
}


export default AddUser