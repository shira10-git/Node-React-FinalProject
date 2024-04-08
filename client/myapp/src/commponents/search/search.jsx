import { InputText } from "primereact/inputtext"
import { useSearchParams } from "react-router-dom"

const Search=({placeHolders})=>{
    const [searchParams,serSearchParams]= useSearchParams()
    const q=searchParams.get("q")
    return(
        
<>
<InputText defaultValue={q||""} placeholder={placeHolders} type="text" className="w-8rem sm:w-auto" onChange={(e)=>{serSearchParams({q:e.target.value})}}/>

</>

    )
}
export default Search