import React, { useContext } from "react";
import styles from "./card.module.css";
import { TinderContext } from "../context/Tinder";
import Spinner from "../Spinner";
const Card = (props) => {
  const { swipe, swipeLoader } = useContext(TinderContext);
  const { uid, name, city, gender, age, picUrl } = props.card;
  return (
    <>
      <div className="col-md-4">
        <div className={`${styles.card} p-4 ;`}>
          <div className={styles.cardImg}>
            <img src={picUrl} alt="i-Process" />
          </div>
          <div className="card-body mt-3">
            <h5 className="text-center mt-4">
              <strong className="text-primary text-capitalize">{name}</strong>
            </h5>

            <div className="d-flex justify-content-center">
              <small className="form-text  text-muted mt-2">
                Age : <strong className="text-dark">{age} years Old</strong>
              </small>
            </div>
            <div className="d-flex justify-content-center">
              <small className="form-text  text-muted mt-2">
                Gender : <strong className="text-dark">{gender==0 ? "Male":"Female"}</strong>
              </small>
            </div>
            <div className="d-flex justify-content-center">
              <small className="form-text  text-muted mt-2">
                City : <strong className="text-dark text-capitalize">{city}</strong>
              </small>
            </div>

            <div className="d-flex justify-content-center mt-3 p-2">
              <div
                className={`${styles.buttons}  d-flex justify-content-between`}
              >
                <button className={`${styles.left} button`}> <Spinner/></button>
                <button className={`${styles.right} button`}> <Spinner/></button>         
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
