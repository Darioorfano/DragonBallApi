import { useFetch } from "../hooks/useFetch"
import './Card.css'
import '../hooks/imageResize'

export const Card = () => {
  
  const {data} = useFetch();
  
  return (
    <>
 <div className="container d-flex flex-wrap mt-5 ">
      {data.map((character,index) => (
        <div key={index} className="col-lg-3">
        <div className="card mb-2" style={{ width: '18rem' }}>
          <div className="card-container">
          <img src={character.imgURL} className="card-img-top img-fluid"/>
          </div>
          <div className="card-body">
            
            <h6 className="card-title text-center mt-2">{character.name}</h6>
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
