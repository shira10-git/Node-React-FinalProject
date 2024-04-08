import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { useGetUserByIdMutation, useGetUsersQuery } from "../user/userApiSlice";
import AddTodo from '../Todo/addTodo';
import { Toast } from 'primereact/toast';
import AddUser from '../user/addUser';
import DeleteUser from '../user/deleteUser';
import UpdateUser from '../user/updateUser';
import { useGetTodosQuery } from '../Todo/todoApiSlice';
import DeleteTodo from '../Todo/deleteTodo';
import UpdatTodo from '../Todo/updateTodo';
import { useSearchParams } from 'react-router-dom';
import Search from '../../commponents/search/search';
import { Checkbox } from 'primereact/checkbox';
import ShowImageWor from './ShowImageWor';
import useAuth from '../auth/useAuth';




const AllTodos = ({ done }) => {

    const [checked, setChecked] = useState(false);
    const[show,setShow]=useState(false)
    const toast = useRef(null);
    const { data: todos, isLoading, isError, error } = useGetTodosQuery(done);
    const [getUserById, { isErroru, erroru, isSuccessu, datau }] = useGetUserByIdMutation()
    console.log(todos);
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
    let filterData
    if (todos) {
        filterData = !q ? [...todos] : todos.filter(t => t.title.indexOf(q) > -1)
    }
    const { _id, userName, password, email, phone, active, name, role } = useAuth()
    useEffect(() => {
        if (role=== 'manager') {
            setShow(false)
        }
        else
            setShow(true)

    }, [])
    useEffect(() => {
        { getUserById() }
    }, [todos])

    if (!todos) return <h1>טוען</h1>

    if (isLoading) return <h1>טוען</h1>
    if (isError) return <h2>{error}</h2>



    const getSeverity = (active) => {
        switch (active) {
            case true:
                return "active";

            case false:
                return 'not active';

            default:
                return null;
        }
    };

    // const name = (userNa) => {
    //     getUserById(userNa)
    // }
    const itemTemplate = (data) => {

        //  getUserById(data.workerId)
        return (
   
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                <img src={data.imageUrlMan ? `http://localhost:3575/uploads/${data.imageUrlMan} ` : ""} alt={data.imageUrlMan} className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" />

                    {/* <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${data.image}`} alt={data.name} /> */}
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-1500">{data.title}</div>
                                <div className="text-2xl font-bold text-1500">{data.description}</div>
                                <div className="text-2xl font-bold text-1500">{data.workerName}</div>
                                <div className="text-2xl font-bold text-1500">{data.workerComments}</div>
                                <div className="text-2xl font-bold text-1500">{data.urgency}</div>
                                {/* {name(data.workerId)} */}


                                <div className="text-2xl font-bold text-1500" >{done ? `amount of days that took to do assignment ${data.doneDate}` : `התקבל ב:: ${data.recievingDate}`}</div>
                                {/* <div className="text-2xl font-bold text-1500" label="h">{data.doneDate}</div> */}


                                {!show?<div className="card flex flex-wrap justify-content gap-3">
                                    <DeleteTodo _id={data._id} />
                                    <UpdatTodo data={data} /> </div>:""}
                                {/* <div className="text-200">{getSeverity(data.active)}</div> */}
                            </div>
                           

                            <div className="flex flex-column gap-2">
                                {/* <Rating value={data.rating} readOnly cancel={false}></Rating> */}
                                <span className="flex align-items-center gap-3">
                                    <i className="pi pi-tag product-category-icon"></i>
                                    <span className="font-semibold">{role}</span>
                                    {/* <span className="font-semibold">{getSeverity(data.active)}</span> */}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                       {show? <><UpdatTodo data={data}/></>:data.imageUrlWor?<ShowImageWor img={data.imageUrlWor}/>:""}
                            <span className="text-2xl font-semibold">{active}</span>
                            {/* <Button  label="Add Assignment" disabled={data.active === 'false'} onClick={()=><AddTodo/>}>  <MdAssignmentAdd /></Button> */}
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const save = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
    }

    return (
        <>
            <Search placeHolders={"חיפוש על פי כותרת משימה"} />
            <div className="card">
                <DataScroller value={filterData} itemTemplate={itemTemplate} rows={todos.length} inline scrollHeight="750px" />

            </div></>
    )


}
export default AllTodos