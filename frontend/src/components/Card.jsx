import { useFetch } from "../hooks/useFetch"


export const Card = () => {
  
  const {data} = useFetch();
  
  return (
    <>
 <div className="container">
      {data.map((character) => (
        <div key={character.id} className="card" style={{ width: '18rem' }}>
          <img src={character.url} className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{character.name}</h5>
            <p className="card-text"></p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}
