import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import "./About.css";

function About() {
  
  return (
    <div className="about">
      <div className="about__top">
        <img src="./images/shape-left.png" alt="shape left" id="shape-left" />
        <div className="about__bottomCard">
          <h1>
            <span>ABOUT</span> RESUME BUILDER
          </h1>
          <p>
            At Resume Builder, we are dedicated to helping you build a brighter
            future. Here you can craft professional resumes that showcase your
            skills and achievements. We understand the importance of making a
            great first impression and are committed to helping you stand out in
            a competitive job market. Let us help you take the next step in your
            career with a resume that truly represents you.
          </p>
        </div>

        <img
          src="./images/shape-right.png"
          alt="shape right"
          id="shape-right"
        />
      </div>

      <div className="about__bottom">
              <img src="./images/show/show2.png" alt="resume" id="show2" />
              <div className="resumeBtn"><Link to="/resume">Create Resume</Link></div>
      </div>
    </div>
  );
}

export default About;
