import { Link } from "react-router-dom";
import "./Home.css";
import StepsComponent from "../../components/timelineComponent/StepsComponent";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <div className="home__top">
        <img src="./images/shape-left.png" alt="shape-left" className="shape-left" />
        <h1>
          <span>RESUME BUILDER</span>
        </h1>
        <p>Building a Brighter Future</p>
      </div>

      <div className="home__middle">
      <div className="home__bottomcover">
          <img src="./images/show/show.png" alt="show" id="resume2" />
        </div>
      </div>

      <div className="home__bottom">
      <h1>Ready to Create your Resume? </h1>
        <div className="resumeBtn"><Link to="/resume">Create Resume</Link></div>
      </div>

      <div className="home__features">
        <h2>HOW IT WORKS</h2>
        <StepsComponent />
        </div>
      <Footer />
    </div>
  );
};

export default Home;
