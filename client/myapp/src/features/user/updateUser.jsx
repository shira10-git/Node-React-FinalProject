import { useGetUserByIdMutation, useUpdateUserMutation } from './userApiSlice'
import React, { useRef, useState } from "react";
import { useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useForm, Controller } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import 'primeicons/primeicons.css';
import { Password } from 'primereact/password';
import { Toast } from "primereact/toast";
import useAuth from '../auth/useAuth';

const UpdateUser = ({ data }) => {

    const toast = useRef(null);

    const [visible, setVisible] = useState(false);
    const [updateUser, { isError, isSuccess, error }] = useUpdateUserMutation();
    const [show, setShow] = useState(false)
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const { _id,name,userName,role,email } = useAuth()
    let i;
    useEffect(() => {
        if (role === 'manager') {
            setShow(false)
        }
        else
            setShow(true)

    }, [])


    useEffect(() => {
        if (isError) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.data.message })
        }
    }, [error, isError])

    useEffect(() => {
        if (isSuccess) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: `Data Saved ` })
        }
    }, [isSuccess])


    const roles = [
        'עובד',
        'מנהל',
        'עובד מומחה'

    ];

    const defaultValues = {

        userName: data.userName,
        password: data.password ? data.password : "",
        name: data.name ? data.name : "",
        email: data.email,
        phone: data.phone,
        role: data.role
    }
    useEffect(()=>{
        reset({
            userName: data.userName,
        password: data.password ? data.password : "",
        name: data.name ? data.name : "",
        email: data.email,
        phone: data.phone,
        role: data.role
        })
    },[data])

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });


    const onSubmit = (data) => {
        changeToHebrew(data)
        setFormData(data);
        setShowMessage(true);
        updateUser(data)
        setVisible(false)
      
   
       
    };
    const changeToHebrew = (val) => {
        if (val.role == "עובד")
            val.role= "worker"
        else {
            if (val.role == "מנהל")
                val.role = "manager"
            else
                val.role = "advancedWorker"
        }
    }

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;


    return (


        <div className="form-demo">
            <Button icon="pi pi-user-edit" rounded aria-label="Bookmark" onClick={() => setVisible(true)} ></Button>
            <Dialog
                visible={visible}
                onHide={() => setVisible(false)}
                reject>

                <div className="flex justify-content-center">
                    <div className="card">
                        <h2 className="text-center">עדכון משתמש</h2>
                        <br>
                        </br>
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
                                        <InputText id={field.name} {...field} autoFocus placeholder={data.name} className={classNames({ 'p-invalid': fieldState.invalid })} />
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
                            {show ? <div className="field" >
                                < span className="p-float-label">
                                    <Controller name="password" control={control}
                                        render={({ field, fieldState }) => (
                                            <Password id={field.name} {...field} feedback={false} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} header={passwordHeader} />
                                        )} />
                                    <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>סיסמא</label>
                                </span>
                                {getFormErrorMessage('password')}
                                <br></br></div> : <></>}
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="role" control={control} render={({ field, fieldState }) => (

                                        <Dropdown id={field.name} {...field} value={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} defaultValue={data.role} options={roles} />
                                    )} />
                                    <label htmlFor="role" className={classNames({ 'p-error': errors.name })}>סוג עובד</label>
                                </span>
                                {getFormErrorMessage('role')}
                            </div><br></br>


                            <Button type="submit" label="Submit" className="mt-2" />
                            <Button type="button" label="cancel" onClick={() => {  setVisible(false) }} className="mt-2" />

                        </form>
                    </div>
                </div></Dialog>
            <Toast ref={toast}></Toast>
        </div>
    );
}


export default UpdateUser