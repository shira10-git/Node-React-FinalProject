
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
// import { ProductService } from './service/ProductService';
import { useGetUsersQuery } from "../user/userApiSlice";
import AddTodo from '../Todo/addTodo';
import { Toast } from 'primereact/toast';
import AddUser from '../user/addUser';
import DeleteUser from '../user/deleteUser';
import UpdateUser from '../user/updateUser';
import Search from '../../commponents/search/search';
import { useSearchParams } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
const AllWorkers = () => {
    const toast = useRef(null);

    const [searchParams] = useSearchParams()
    // const [products, setProducts] = useState([]);
    const { data: users, isLoading, isError, error } = useGetUsersQuery();
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>


    const q = searchParams.get("q")
    let filterData
    if (users) {
        filterData = !q ? [...users] :
            users.filter(u => u.userName.indexOf(q) > -1)
    }
    // useEffect(() => {
    //     ProductService.getProducts().then((data) => setProducts(data));
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

    // public void SendEmail(string emailTo)
    // {
    //     // Set up the email message
    //     MailMessage mail = new MailMessage();
    //     mail.From = new MailAddress("YadBeyad2024@gmail.com", "יד ביד - מכירה סינית 2024");
    //     mail.To.Add(emailTo);
    //     mail.Subject = "מערכת יד ביד - מכירה סינית 2024";
    //     mail.Body = "<div dir=\"rtl\">מזל טוב על זכייתך במכירה סינית.<br><br>!!המשך לצבור זכויות ותתרום תמיד אלינו</div>";

    //     mail.IsBodyHtml = true;

    //     // Set up the SMTP client
    //     SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
    //     smtpClient.Port = 587; // or the appropriate port number
    //     smtpClient.Credentials = new NetworkCredential("YadBeyad2024@gmail.com", "rldm vxiq taeh ccko");
    //     //smtpClient.Credentials = new NetworkCredential("yehuda5862522@gmail.com", "stdu ywhk eski eixd");
    //     smtpClient.EnableSsl = true;

    //     // Send the email
    //     smtpClient.Send(mail);
    // }


    {/* <a href="mailto:`{email}`?subject={subject}&body={body}">Click to Send an Email</a> */ }


    const itemTemplate = (data) => {

        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    {/* <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${data.image}`} alt={data.name} /> */}
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-1500">{data.name}</div>
                                <div className="text-2xl font-bold text-1500">{data.userName}</div>

                                <Tag value={getSeverity(data.active)} ></Tag>
                                <div className="card flex flex-wrap justify-content gap-3">


                                    <DeleteUser _id={data._id} />
                                    <UpdateUser data={data} /> </div>
                                {/* <div className="text-200">{getSeverity(data.active)}</div> */}
                            </div>
                            <div className="flex flex-column gap-2">
                                {/* <Rating value={data.rating} readOnly cancel={false}></Rating> */}
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag product-category-icon"></i>
                                    <span className="font-semibold">{data.role}</span>
                                    {/* <span className="font-semibold">{getSeverity(data.active)}</span> */}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                            <span className="text-2xl font-semibold">{data.active}</span>
                            <AddTodo da={data} />
                            {/* <Button  label="Add Assignment" disabled={data.active === 'false'} onClick={()=><AddTodo/>}>  <MdAssignmentAdd /></Button> */}

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
{/* <InputText /> */}
             
            {/* <div className="card flex justify-content-center"> */}
                <Toast ref={toast}></Toast>
                {/* <Button label="Add User" icon="pi pi-user-plus"  ></Button> */}
                    <AddUser />
                {/* <Button label="Add User" icon="pi pi-plus" onClick={<AddUser/>}  /> */}
            {/* </div></> */}
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