import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Link, Outlet, Router, useNavigate } from 'react-router-dom';
import profile from '../../pics/logo.png'
import logoImg from '../../pics/logo.png'
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { removeToken } from '../auth/authSlice';
import apiSlice from '../../app/apiSlice';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import '../../index.css';
import '../../flag.css';
import image from './building.jpg'
import UpdateProfile from '../user/updateProfile';

export default function HomeManager() {
    
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
        
    );  
    // const router = useRouter();
    const items = [
        {
            label: 'בית',
            icon: 'pi pi-home',
            url: '/HomeManager/Home',
        },
        {
            label: 'כל העובדים',
            icon: 'pi pi-users',
            url: '/HomeManager/AllWorkers',
           

        },
        {
            label: 'כל המשימות',
            icon: 'pi pi-list',
            items:  [{
                label: 'נעשה',
                url: '/HomeManager/AllTodos/Complete' ,

            },{
                label:'עוד לא נעשה ',
                url: '/HomeManager/AllTodos/UnComplete',
           
         } ] 
            
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
            message: 'רוצה לעזוב את האתר?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            accept,


        });
    };
    const start = <img alt="logo" src={logoImg} height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
             <ConfirmPopup  />
            <Button icon="pi pi-sign-out" onClick ={confirm} label="יציאה"/>
             {/* <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" /> */}
           <UpdateProfile/>
    
        </div>

       

       
    );

    return (
        <>
        <div className="card">
            <Menubar model={items} start={start} end={end} />   
        </div>
        <div  style={{ backgroundImage: `url(${image})` }}></div>
        <Outlet/>
       </>
    )
}
        