import { useState, useEffect } from "react";
import axios from "axios";
import api from "../network/api";
import { ngrokUrl } from "../network/config";
function IpAddress(){
 
    const [ip,setIP] = useState('');

    const getData = async ()=>  {
        const res = await axios.get(`https://geolocation-db.com/json/`)
        console.log(res.data);
        console.log(res.data.IPv4);
        setIP(res.data.IPv4)
        console.log(ip)
      
        await api.post(`https://${ngrokUrl}/ipAddress/`,{ipAddress:ip})
    }
    useEffect(()=>{
       
        getData()
    },[])
    return(
        <div className = "App">
            <h2>Your IP Address is</h2>
            <h4>{ip}</h4>
         
        </div>
    );
}
export default IpAddress;