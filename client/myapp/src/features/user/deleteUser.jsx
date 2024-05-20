import { Button } from "primereact/button"
import { useDeleteUserMutation } from "./userApiSlice"
import { ConfirmPopup } from 'primereact/confirmpopup';
import { confirmPopup } from 'primereact/confirmpopup'; 
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
const DeleteUser = (props) => {
   
    const toast = useRef(null);
    const [deleteUser, { isError, isSuccess, error }] = useDeleteUserMutation()
    useEffect(() => {
        if (isSuccess) {
         
            toast.current.show({ severity: 'success', summary: 'Success', detail: `You have deleted ${deleteUser.name} ` });
        }
    }, [isSuccess])
    const accept = () => {
        deleteUser(props._id)
    }
    const confirm = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: '?בטוח רוצה למחוק את העובד הזה',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            accept,


        });

    };

    return (
        <>
            <Toast ref={toast} />
            <ConfirmPopup />
            <Button onClick={confirm} icon="pi pi-trash" rounded aria-label="Bookmark"></Button>
        </>
    )
}
export default DeleteUser