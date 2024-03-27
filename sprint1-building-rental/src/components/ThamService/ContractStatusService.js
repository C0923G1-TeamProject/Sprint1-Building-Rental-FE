import axios from "axios";

export const getAllStatus = async ()=>{
    try{
        const res = await axios.get("http://localhost:8080/contractStatus");
        return res.data;
    }catch(e){
        console.log(e);
    }
}