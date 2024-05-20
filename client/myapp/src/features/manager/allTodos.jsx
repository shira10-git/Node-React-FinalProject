import React, { useState, useEffect, useRef } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { useGetUserByIdMutation, useGetUsersQuery } from "../user/userApiSlice";
import { useGetTodosQuery } from '../Todo/todoApiSlice';
import DeleteTodo from '../Todo/deleteTodo';
import UpdatTodo from '../Todo/updateTodo';
import { useSearchParams } from 'react-router-dom';
import Search from '../../commponents/search/search';
import ShowImageWor from './ShowImageWor';
import useAuth from '../auth/useAuth';




const AllTodos = ({ done }) => {
    const[show,setShow]=useState(false)
    const toast = useRef(null);
    const { data: todos, isLoading, isError, error } = useGetTodosQuery(done);
    const [getUserById, { isErroru, erroru, isSuccessu, datau }] = useGetUserByIdMutation()
    
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


    const itemTemplate = (data) => {
        return (
   
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                <img src={data.imageUrlMan ? `http://localhost:3575/uploads/${data.imageUrlMan} ` : ""} alt={data.imageUrlMan} className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" />
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-1500">{data.title}</div>
                                <div className="text-2xl font-bold text-1500">{data.description}</div>
                                <div className="text-2xl font-bold text-1500">{data.workerName}</div>
                                <div className="text-2xl font-bold text-1500">{data.workerComments}</div>
                                <div className="text-2xl font-bold text-1500">{data.urgency==="low"?"נמוכה":data.urgency==="medium"?"בינונית":data.urgency==="high"?"גבוהה":"דחופה"}</div>
                               
                        <div className="text-2xl font-bold text-1500" >{done ? `${data.doneDate} :משך זמן ביצוע המשימה` : `התקבל ב:: ${data.recievingDate}`}</div>
                                {!show?<div className="card flex flex-wrap justify-content gap-3">
                                    <DeleteTodo _id={data._id} />
                                    <UpdatTodo data={data} /> </div>:""}
                            </div>

                        </div>
                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                       {show? <><UpdatTodo data={data}/></>:data.imageUrlWor?<ShowImageWor img={data.imageUrlWor}/>:""}
                            <span className="text-2xl font-semibold">{active}</span>                            
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <Search placeHolders={"חיפוש על פי כותרת משימה"} />
            <div className="card">
                <DataScroller value={filterData} itemTemplate={itemTemplate} rows={todos.length} inline scrollHeight="750px" />

            </div></>
    )


}
export default AllTodos