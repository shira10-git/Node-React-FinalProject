
import React, { useState, useEffect, useRef } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Tag } from 'primereact/tag';
import { useGetUsersQuery } from "../user/userApiSlice";
import AddTodo from '../Todo/addTodo';
import { Toast } from 'primereact/toast';
import AddUser from '../user/addUser';
import DeleteUser from '../user/deleteUser';
import UpdateUser from '../user/updateUser';
import Search from '../../commponents/search/search';
import { useSearchParams } from 'react-router-dom';
const AllWorkers = () => {
    const toast = useRef(null);

    const [searchParams] = useSearchParams()

    const { data: users, isLoading, isError, error } = useGetUsersQuery();
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>

    const q = searchParams.get("q")
    let filterData
    if (users) {
        filterData = !q ? [...users] :
            users.filter(u => u.userName.indexOf(q) > -1)
    }
    const getSeverity = (active) => {
        switch (active) {
            case true:
                return "פעיל";

            case false:
                return 'לא פעיל';

            default:
                return null;
        }
    };
    const itemTemplate = (data) => {

        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-1500">{data.name}</div>
                                <div className="text-2xl font-bold text-1500">{data.userName}</div>

                                <Tag value={getSeverity(data.active)} ></Tag>
                                <div className="card flex flex-wrap justify-content gap-3">
                                    <DeleteUser _id={data._id} />
                                    <UpdateUser data={data} /> </div>
                            </div>
                            <div className="flex flex-column gap-2">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag product-category-icon"></i>
                                    <span className="font-semibold">{data.role === "manager" ? "מנהל" : data.role === "worker" ? "עובד" : "עובד מומחה"}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                            <span className="text-2xl font-semibold">{data.active}</span>
                            <AddTodo da={data} />

                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const save = () => {
        toast.current.show({ severity: 'success', summary: 'הצליח', detail: 'נשמרו הפרטים' });
    }
    const header = () => {
        return (<>
            <Search placeHolders={"חיפוש לפי שם משתמש"} />
            <Toast ref={toast}></Toast>
            <AddUser />
        </>
        )
    }
    return (

        <div className="card">

            <DataScroller value={filterData} itemTemplate={itemTemplate} rows={users.length} inline scrollHeight="750px" header={header()} />
        </div>
    )
}
export default AllWorkers