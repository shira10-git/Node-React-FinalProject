import { useGetUserByIdMutation, useUpdateUserMutation } from './userApiSlice'
import React, { useRef, useState } from "react";
import { useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useForm, Controller } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { ListBox } from 'primereact/listbox';
import { PrimeIcons } from 'primereact/api';
import 'primeicons/primeicons.css';
import { Password } from 'primereact/password';
import { Toast } from "primereact/toast";
import useAuth from '../auth/useAuth';
const UpdateProfile = () => {
    const toast = useRef(null);
    const [visible, setVisible] = useState(false);
    const [updateUser, { isError, isSuccess, error }] = useUpdateUserMutation();
    const [show, setShow] = useState(false)
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const { _id, name, userName,phone, role, email } = useAuth()
    console.log("rrrr" + role);
    const letter = userName[0]
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
            toast.current.show({ severity: 'success', summary: 'Success', detail: `פרטין נשמרו ${formData.name}  בבקשה אשר במייל: ${formData.email}` })
        }
    }, [isSuccess])

    const defaultValues = {
        _id:_id,
        userName: userName,
        // password: password ? password : "",
        name: name ? name : "",
        email: email,
        phone: phone ? phone : "",
        role: role ? role : "worker",

    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    const onSubmit = (data) => {
        setFormData(data);
        console.log(data.role+"asasasasasas");
        setShowMessage(true);
        updateUser(data)
        setVisible(false)
        console.log(role + "after submit")

    };
    const handleCancel = () => {

        setVisible(false)
    }
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;

    return (
        <div className="form-demo">
            <Button rounded aria-label="Bookmark" onClick={() => setVisible(true)} >{letter}</Button>
            <Dialog
                visible={visible}
                onHide={() => setVisible(false)}
                reject>
                <div className="flex justify-scontent-center">
                    <div className="card">
                        <h5 className="text-center">עדכון פרופיל</h5>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                            <div className="field">

                                <span className="p-float-label">
                                    <Controller name="name" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
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
                            <Button type="submit" label="אישור" className="mt-2" />
                            <Button type="button" label="ביטול" onClick={() => { setVisible(false) }} className="mt-2" />

                        </form>
                    </div>
                </div></Dialog>
            <Toast ref={toast}></Toast>
        </div>
    );
}
export default UpdateProfile