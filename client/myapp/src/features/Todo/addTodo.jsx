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
import{ useAddTodoMutation,useGetTodosQuery} from './todoApiSlice'
import { ListBox } from 'primereact/listbox';
import { PrimeIcons } from 'primereact/api';
import 'primeicons/primeicons.css';
import { Password } from 'primereact/password';
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";


const AddTodo = ({da}) => {
    const toast = useRef(null);

    const [visible, setVisible] = useState(false);
    const [addTodo, { isError, isSuccess, error }] = useAddTodoMutation()
    const [selectedFile, setSelectedFile] = useState(null);

   
useEffect(() => {
        console.log('errrrr', error);
        if (isError) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.data.message })
        }
    }, [error, isError])

    useEffect(() => {
        if (isSuccess) {
             toast.current.show({ severity: 'success', summary: 'Success', detail: `Data Saved  ${defaultValues.title}  added` })
        }
    }, [isSuccess])


    const urgencies = [
        'low', 
        'medium',
         'high', 
        'imediatly'
    ];


    const [showMessage, setShowMessage] = useState(false);
    const defaultValues = {
        title: "",
        workerId: da._id,
        workerName:da.userName,
        description: "",
        imageUrlMan: "",
        urgency: "medium",
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {

        const formData = new FormData();
        formData.append('title', data.title);
          formData.append('workerId',data.workerId);
          formData.append('workerName', data.workerName);
          formData.append('description', data.description);
          formData.append('imageUrlMan', selectedFile);
          formData.append('urgency', data.urgency);

        setShowMessage(true);
        setVisible(false)
        addTodo(formData)
        reset();
    };
    const customBase64Uploader = async (event) => {
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); 

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;
        };
        if(file){
             setSelectedFile(file);
        }
      else
      selectedFile(null)
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const onUpload = () => {
        // toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
        alert("on upload")
    };
  

    return (


        <div className="form-demo"><Button label="הוספת משימה" icon="pi pi-plus" onClick={() => setVisible(true)} ></Button>
           <Dialog 
           visible={visible} 
           onHide={() => setVisible(false)}>
        
            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">הוספת משימה</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="title" control={control} rules={{ required: 'כותרת חובה.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="title" className={classNames({ 'p-error': errors.name })}>כותרת*</label>
                            </span>
                            {getFormErrorMessage('title')}
                        </div><br></br>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="description" control={control} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field}  className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    
                                )} />
                                <label htmlFor="description" className={classNames({ 'p-error': errors.name })}>תיאור</label>
                            </span>
                            {getFormErrorMessage('description')}
                        </div><br></br>
            
                        <div className="field">
                            <label htmlFor="imageUrlMan" className={classNames({ 'p-error': errors.name })}>תמונה</label>
                            <span className="p-float-label">
                         <Controller name="imageUrlMan" control={control}  render={({ field, fieldState }) => (
                         <FileUpload id="imageUrlMan" url="localhost:3575/uploads/"  accept="image/*" maxFileSize={100000000} onSelect={customBase64Uploader} customUpload uploadHandler={customBase64Uploader} emptyTemplate={<p className="m-0">הוסף לפה תמונה</p>} />
                        )}/>
                        </span>
                            {getFormErrorMessage('imageUrlMan')}
                        </div>
                    
              
                        <br></br>
                        <br></br>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="urgency" control={control} render={({ field }) => (
                                    <Dropdown id={field.name}  value={field.value} onChange={(e) => field.onChange(e.value)} options={urgencies}  />
                                )} />
                                <label htmlFor="urgency">דחיפות</label>
                            </span>
                        </div><br></br>

                        <Button type="submit" label="Submit" className="mt-2" />
                        <Button label="cancel"  onClick={(e) => { setVisible(false)}}  className="mt-2"/>
                       
                    </form> 
                </div>
            </div></Dialog>
            <Toast ref={toast}></Toast>
        </div>
    );
}


export default AddTodo






