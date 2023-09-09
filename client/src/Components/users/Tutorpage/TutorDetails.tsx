import aa from "../../../assets/images/tutor.jpeg";

import "./Tutor.css";
const TutorDetails = () => {
  return (
    <>
      <div className="tutor-header">
        <h1 className="text-center  tutor-header-first">Our Instructors</h1>
        <h5 className="text-center tutor-header-second">
          Meet Tutor Trek Subject Experts
        </h5>
      </div>

      <div className="container">
        <div className="card">
          <div className="row">
            <div className="col-lg-2">
              <img
                src={aa}
                className="image_rounded"
                style={{
                  width: "100px",
                  marginTop: "100px",
                  marginLeft: "30px",
                }}
                alt="sample"
              />
            </div>
            <div className="col-lg-10 mt-5">
              <h1>About Me</h1>
              <p>
                I am a passionate instructor with a strong background in
                Computer Science. My goal is to help students understand complex
                concepts in a simple and engaging way. I specialize in teaching
                Mathematics, Computer Science, and Physics.
              </p>
              <h1>Skills</h1>
              <p>reactjs,nodejs,mongodb,express</p>
              <h1>Qualification</h1>
              <p>Bsc computer science</p>
              <h1>Experience</h1>
              <p>1 year</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorDetails;
