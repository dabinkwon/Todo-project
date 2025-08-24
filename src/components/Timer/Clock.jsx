import { useEffect, useState } from "react"


export const Clock = ()=>{
    const [time,setTime] = useState(new Date());
    useEffect(()=>{
        setInterval(() => {
            setTime(new Date())
        }, 1000);
    },[])
    return <p className="text-gray-800">{time.toLocaleTimeString()}</p>
}