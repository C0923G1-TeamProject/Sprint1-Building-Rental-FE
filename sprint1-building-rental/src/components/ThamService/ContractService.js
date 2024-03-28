import axios from "axios";

export const getAll = async (search)=>{
    try{
        const res = await axios.get(`http://localhost:8080/contract?customer.name_like=${search.customer}&premises.name_like=${search.premises}`);
        console.log(res.data);
        return res.data;    
    }catch(e){
        console.log(e);
    }
}