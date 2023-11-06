import { useEffect, useState } from "react"

export const useFetch = (loadCharacter) => {
    const [characters, setCharacter] = useState([])

    const getAllCharacters = async () => {
        const url = 'http://localhost:3000/allCharacters'
        const response = await fetch(url);

        console.log("response", response)

        const newData = await response.json();
        setCharacter(newData)

        console.log(newData)
    }

    const getCharacterByName = async (name) => {
        const url = `http://localhost:3000/getCharacter/${name}`
        const response = await fetch(url);

        console.log("response", response)

        const newData = await response.json();
        setCharacter(newData);
    }

    useEffect(() => {
        if (loadCharacter) {
            getAllCharacters()
        }
    }, [])

    /*Si quiero consumir desde el componente una funcion devuelvo la declaracion*/
    return {
        characters,
        getAllCharacters,
        getCharacterByName
    }
}

