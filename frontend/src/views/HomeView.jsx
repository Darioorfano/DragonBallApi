import { Card } from '../components/card/Card'
import { Header } from '../components/header/Header'
import { useFetch } from '../hooks/useFetch'

export const HomeView = () => {
const {characters,getAllCharacters,getCharacterByName} = useFetch(true);
  return (
    <>
    <Header getAllCharacters={getAllCharacters} getCharacterByName={getCharacterByName} ></Header>

      <Card data={characters}/>

      

    </>
  )
}

