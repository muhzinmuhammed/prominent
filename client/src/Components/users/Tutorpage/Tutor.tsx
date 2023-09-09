import React from "react";
import image from "../../../assets/images/a.jpg";

import "./Tutor.css";

const TutorComponent = () => {
  return (
    <>
      <div className=" tutor-header ">
        <h1 className="text-center  tutor-header-first">Our Instructors</h1>
        <h5 className="text-center tutor-header-second">
        Meet Tutor Trek Subject Experts
        </h5>
      </div>
     
      <section className="course-card">

        
        <div className="container">
          <div className="row ms-5 mt-5">
            <div className="col-lg-4">
              <div className=" card-border card" style={{ width: "18rem", height:"20rem" }}>
                <img
                  className="card-img-top"
                  src={image}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title text-center">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className=" card-border card" style={{ width: "18rem", height:"20rem" }}>
                <img
                  className="card-img-top"
                  src={image}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title text-center">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <div className="row">

                  </div>
                  <small>Price :999</small>
                  <small  className="float-end">*********</small>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className=" card-border card" style={{ width: "18rem", height:"20rem" }}>
                <img
                  className="card-img-top"
                  src={image}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title text-center">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TutorComponent;
