import { useFetch } from "../hooks/useFetch"
import './Card.css'

export const Card = () => {
  
  const {data} = useFetch();
  
  return (
    <>
 <div className="container d-flex justify-content-space-around flex-wrap mt-5 ">
      {data.map((character,index) => (
        <div key={index} className="col-lg-3">
        <div className="card mb-2" style={{ width: '18rem' }}>
          <img src={character.imgURL} className="card-img-top img-fluid"  referrerPolicy="no-referrer"/>
          <div className="card-body">
            <h6 className="card-title">{character.name}</h6>
            <p className="card-text"></p>
            <a href="#" className="btn btn-primary mt-3 d-block m-auto">Go somewhere</a>
          </div>
        </div>
        </div>

      ))}
    </div>
    </>
  )
}
