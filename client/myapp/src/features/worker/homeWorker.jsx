import React from 'react';
import { Menubar } from 'primereact/menubar';
import logoImg from '../../pics/logo.png'
import { Outlet, useNavigate } from 'react-router-dom';
import apiSlice from '../../app/apiSlice';
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { removeToken } from '../auth/authSlice';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import UpdateProfile from '../user/updateProfile';

export default function HomeWorker() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const items = [
        {
            label: 'בית',
            icon: 'pi pi-home',
            command: () => {
                navigate('/HomeWorker/Home');
            }
        },
        {

            label: 'כל המשימות',
            icon: 'pi pi-list',
            items: [{
                label: 'נעשה',
                url: '/HomeWorker/AllTodos/Complete',

            }, {
                label: 'לא נעשה ',
                url: '/HomeWorker/AllTodos/UnComplete',

            }]


        }
    ];

    const accept = () => {
        dispatch(removeToken())
        dispatch(apiSlice.util.resetApiState())
        navigate("/")
    }
    const confirm = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: '?רוצה לצאת מהאתר',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            accept,


        });
    };
    const start = <img alt="logo" src={logoImg} height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
             <ConfirmPopup />
            <Button icon="pi pi-sign-out" onClick={confirm} label="יציאה" />
            < UpdateProfile/>
        </div>
        
    );

    return (<>
        <div className="card">
           
            <Menubar model={items} start={start} end={end} />
        </div>     <Outlet />
        <footer>
    <p>© 2024 ShevaShira</p>
  </footer>
</>
   
    )
}
