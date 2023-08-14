import { useEffect, useState } from "react"

export const useFetch = () => {
    const [data, setData] = useState([])

    const getAllCharacters = async () =>{
        const url = 'http://localhost:3000/allCharacters'
        const response = await fetch(url);
        
        console.log("response",response)
       
        const newData = await response.json();
        setData(newData)
       
        console.log(newData)
 }


 useEffect(() =>{
    getAllCharacters();
},[])

return{
    data
}
}

