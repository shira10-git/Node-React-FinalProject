import React, { useRef, useState } from "react";
import { useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useForm, Controller } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { useAddTodoMutation, useAddUserMutation } from './userApiSlice';
import 'primeicons/primeicons.css';
import { Password } from 'primereact/password';
import { Toast } from "primereact/toast";
const AddUser = () => {
    const toast = useRef(null);
    const [visible, setVisible] = useState(false);
    const [addUser, { isError, isSuccess, error }] = useAddUserMutation()

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
    useEffect(()=>{
        reset({
        userName: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        role: 'worker'
        })
    },[])

    const roles = [
        'עובד',
        'מנהל',
        'עובד מומחה'

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
        changeToHebrew(data)
        setFormData(data);
        setShowMessage(true);
        setVisible(false)
        addUser(data)
        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

   const passwordHeader = <h6>Pick a password</h6>;

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

    return (

        <>
            <Button label="הוספת עובד" icon="pi pi-user-plus" onClick={() => setVisible(true)} ></Button>
            <Dialog
                style={{}}
                visible={visible}
                onHide={() => setVisible(false)}>

                <div className="flex justify-content-center">
                    <div className="card">
                        <h2 className="text-center">רישום עובד</h2><br></br>
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
                                        <InputText   id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
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
                                        <Dropdown id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={roles} />
                                    )} />
                                    <label htmlFor="role">סוג עובד</label>
                                </span>
                            </div><br></br>

                            <Button type="submit" label="אישור" className="mt-2" />
                            <Button label="ביטול" onClick={(e) => { setVisible(false) }} className="mt-2" />

                        </form>
                    </div>
                </div></Dialog>
            <Toast ref={toast}></Toast>
            {/* </div> */}
        </>
    );
}


export default AddUser