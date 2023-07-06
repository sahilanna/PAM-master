import { useState, useEffect } from "react";
import axios from "axios";
import api from "../Components/Dashboard/api";
import { ngrokUrl } from "./config";

function IpAddress(){
    //creating IP state
    const [ip,setIP] = useState('');
    const [ipAdd, setIpAdd] = useState('');
    
    //creating function to load ip address from the API
    const getData = async ()=>  {
        const res = await axios.get(`https://geolocation-db.com/json/`)
        console.log(res.data);
        console.log(res.data.IPv4);
        setIP(res.data.IPv4)
        console.log(ip)
        // const ip=res.data.IPv4
        // setIpAdd(ip.IPv4)
        // console.log(ipAdd)

        
        
        // setIP(res.data.IPv4)
        // console.log(ip)
        // setIpAdd(ip)

        await api.post(`https://${ngrokUrl}/api/ipAddress/`,{ipAddress:ip})
        

       
    }
    
    useEffect(()=>{
        //passing getData method to the lifecycle method
        getData()
    },[])

 
    return(
        <div className = "App">
            <h2>Your IP Address is</h2>
            <h4>{ip}</h4>
            {/* <button onClick={postData}>submit</button> */}
        </div>
    );
}

export default IpAddress;