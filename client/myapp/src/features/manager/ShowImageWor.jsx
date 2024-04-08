import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog";
import { useState } from "react";
const ShowImageWor=({img})=>{
const [visible, setVisible] = useState(false);
return(<>
<Button  onClick={e=>setVisible(true)}>הצגת תמונה מהעובד</Button>
  <Dialog
                visible={visible}
                onHide={() => setVisible(false)}>
                    <div>
                  <img src={img? `http://localhost:3575/uploads/${img} ` : ""} alt={img} className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" />  </div>
                
                  </Dialog></>)
}
export default ShowImageWor