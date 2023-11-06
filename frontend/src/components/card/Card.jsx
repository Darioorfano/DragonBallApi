import "../card/card.css";
import PropTypes from "prop-types";

export const Card = (props) => {
  return (
      <div className="container d-flex flex-wrap mt-5 ">
        {props.data.map((character, index) => (
          <div key={index} className="col-lg-3">
            <div className="card mt-3" style={{ width: "18rem" }}>
              <img src={character.imgURL} className="images" />

              <div className="card-body">
                <h6 className="card-title text-center mt-2">
                  {character.name}
                </h6>
                <p className="card-text"></p>
                <a
                  href={character.url}
                  className="btn btn-primary mt-3 d-block m-auto"
                >
                  Ver más detalles
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
};
Card.propTypes = {
  data: PropTypes.array.isRequired,
};
