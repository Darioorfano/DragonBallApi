
import PropTypes from "prop-types";
export const Header = ({getAllCharacters,getCharacterByName}) => {
 function handleChange(event){
  if(event.target.value){
    getCharacterByName(event.target.value)
  }else{
    getAllCharacters()
  }
 }
  return (
    <>
    <div className="container d-flex flex-column pt-4 ">
    <nav className="navbar navbar-expand-lg d-flex flex-column">
    <a className="navbar-brand text-light" href="#">WikiBall Z</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
        <input className="form-control me-2 " type="search" onChange={handleChange} placeholder="Ingrese el personaje que desea buscar" aria-label="Search"/>
</nav>
      </div>
    </>
  )
}

Header.propTypes = {
  getAllCharacters: PropTypes.func.isRequired,
  getCharacterByName:PropTypes.func.isRequired
};