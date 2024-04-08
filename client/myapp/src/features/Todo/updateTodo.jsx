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
import { ListBox } from 'primereact/listbox';
import { PrimeIcons } from 'primereact/api';
import 'primeicons/primeicons.css';
import { Password } from 'primereact/password';
import { Toast } from "primereact/toast";
import { useUpdateTodoMutation } from "./todoApiSlice";
import { FileUpload } from "primereact/fileupload";

const UpdatTodo = ({ data }) => {
    const toast = useRef(null);

    const [visible, setVisible] = useState(false);
    const [updateTodo, { isError, isSuccess, error }] = useUpdateTodoMutation();
    const [show, setShow] = useState(false)
    const [checked, setChecked] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});


    useEffect(() => {

        if (localStorage.getItem("role") === 'manager') {
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
            toast.current.show({ severity: 'success', summary: 'Success', detail: `פרטים נשמרו ${data.title}` })
        }
    }, [isSuccess])

    useEffect(() => {
        if (data.complete)
            setChecked(true)
        else
            setChecked(false)
    }, [data])
    const handle = (e) => {
        setChecked(e.checked)
    }

    const urgencies = [
        'low',
        'medium',
        'high',
        'imediatly',
    ];

    const customBase64Uploader = async (event) => {
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;
        };
        if (file) {
            setSelectedFile(file);
        }
        else
            selectedFile(null)
    };




    const defaultValues = {

        title: data.title,
        workerId: data.workerId,
        email: data.email ? data.email : "",
        description: data.description ? data.description : "",
        imageUrlMan: data.imageUrlMan ? data.imageUrlMan : "",
        imageUrlWor: data.imageUrlWor ? data.imageUrlWor : "",
        urgency: data.urgency ? data.urgency : "",
        complete: checked,
        workerComments: data.workerComments ? data.workerComments : ""
    }



    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('workerId', data.workerId);
        formData.append('workerName', data.workerName);
        formData.append('description', data.description);
        formData.append('imageUrlMan', selectedFile);
        // if (show) {
        //     formData.append('imageUrlMan', data.imageUrlMan);
        //     formData.append('imageUrlWor', selectedFile);
        // }
        // else {
        //     formData.append('imageUrlMan', selectedFile);
        //     formData.append('imageUrlWor', data.imageUrlMan);
        // }

        formData.append('urgency', data.urgency);
        formData.append('complete', checked);
        formData.append('workerComments', data.workerComments);
        setFormData(data);
        setShowMessage(true);
        data.complete = checked

        updateTodo(formData)
        setVisible(false)
        // reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const handleCancel = () => {

        setVisible(false)
        reset()

    }

    return (
        <div className="form-demo">
            {!show ? <Button icon="pi pi-user-edit" rounded aria-label="Bookmark" onClick={() => setVisible(true)} ></Button> : <Button label="לעדכן שנעשה" icon="pi pi-check" iconPos="right" onClick={() => setVisible(true)} />}
            <Dialog
                visible={visible}
                onHide={() => setVisible(false)}>

                <div className="flex justify-content-center">
                    <div className="card">
                        <h5 className="text-center">עדכון</h5>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                            <div className="field">

                                {getFormErrorMessage('title')}
                            </div><br></br>
                            {!show ? <><div className="field">
                                <span className="p-float-label">
                                    <Controller name="description" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>תאור</label>
                                </span>
                                {getFormErrorMessage('description')}
                            </div><br></br></> : ""}

                            {!show ? <> <div className="field">
                                <label htmlFor="imageUrlMan" className={classNames({ 'p-error': errors.name })}>תמונה</label>
                                <span className="p-float-label">
                                    <Controller name="imageUrlMan" control={control} render={({ field, fieldState }) => (
                                        <FileUpload id="imageUrlMan" url="localhost:3575/uploads/" accept="image/*" maxFileSize={100000000} onSelect={customBase64Uploader} customUpload uploadHandler={customBase64Uploader} emptyTemplate={<img src={data.imageUrlMan ? `http://localhost:3575/uploads/${data.imageUrlMan} ` : ""} alt={data.imageUrlMan} className="w-3 shadow-2 " />} />
                                    )} />
                                </span>
                                {getFormErrorMessage('imageUrlMan')}
                            </div>

                                <br></br></> : <><div className="field">
                                    <label htmlFor="imageUrlWor" className={classNames({ 'p-error': errors.name })}>תמונה</label>
                                    <span className="p-float-label">
                                        <Controller name="imageUrlWor" control={control} render={({ field, fieldState }) => (
                                            <FileUpload id="imageUrlWor" url="localhost:3575/uploads/" accept="image/*" maxFileSize={100000000} onSelect={customBase64Uploader} customUpload uploadHandler={customBase64Uploader} emptyTemplate={<img src={data.imageUrlWor ? `http://localhost:3575/uploads/${data.imageUrlWor} ` : ""} alt={data.imageUrlWor} className="w-3 shadow-2 " />} />
                                        )} />
                                    </span>
                                    {getFormErrorMessage('imageUrlWor')}
                                </div>

                            </>
                            }

                            {!show ? <><div className="field">
                                <span className="p-float-label">
                                    <Controller name="urgency" control={control} render={({ field }) => (
                                        <Dropdown id={field.name} {...field} value={field.value} onChange={(e) => field.onChange(e.value)} options={urgencies} />
                                    )} />
                                    <label htmlFor="urgency">דחיפות</label>
                                </span>
                            </div><br></br></> : ""}
                            {show ? <>              <div className="field">
                                <span className="p-float-label">
                                    <Controller name="workerComments" control={control} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>הערות עובד</label>
                                </span>
                                {getFormErrorMessage('workerComments')}
                            </div><br></br></> : ""}
                            <div className="field">

                            </div>
                            <Checkbox onChange={e => handle(e)} checked={checked}></Checkbox>
                            <Button type="submit" label="אישור" className="mt-2" />
                            <Button type="button" label="ביטול" onClick={(e) => { handleCancel(e) }} className="mt-2" />

                        </form>
                    </div>
                </div></Dialog>
            <Toast ref={toast}></Toast>
        </div>
    );
}


export default UpdatTodo