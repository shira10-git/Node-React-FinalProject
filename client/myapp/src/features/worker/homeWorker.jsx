import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import logoImg from '../../pics/logo.png'
import { Outlet, useNavigate } from 'react-router-dom';
import apiSlice from '../../app/apiSlice';
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { removeToken } from '../auth/authSlice';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

import UpdateProfile from '../user/updateProfile';
//  const HomeWorker=()=>{


//     return (<>

// oigdj8hyfgs7tv
//         </>)

// }
// export default HomeWorker



export default function HomeWorker() {
    const leter=localStorage.getItem("profile")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const items = [
        {
            label: 'בית',
            icon: 'pi pi-home',
            command: () => {
                navigate('/HomeWorker');
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
            {/* <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" /> */}
            {/* <Button rounded  onClick={UpdateProfile}>{leter}</Button> */}
            < UpdateProfile/>
        </div>
    );

    return (<>
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
        <Outlet /></>
    )
}
