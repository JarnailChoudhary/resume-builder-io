import { useEffect, useState } from "react";
import "./TempOne.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

// section icons
import SchoolIcon from '@mui/icons-material/School';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useParams } from "react-router-dom";

const TempOne = ({ data, dref }) => {

  const {ResumeId} = useParams()


  const [generalData, setGeneralData] = useState([])
  const [educationData, setEducationData] = useState([])
  const [projectData, setProjectData] = useState([])
  const [achievementData, setAchievementData] = useState([])
  const [skillsData, setSkillsData] = useState([])
  
  const AllIcons = [
    { iconValue: 'FacebookIcon', icon: <FacebookIcon /> },
    { iconValue: 'InstagramIcon', icon: <InstagramIcon /> },
    { iconValue: 'TwitterIcon', icon: <TwitterIcon /> },
    { iconValue: 'youtubeicon', icon: <YouTubeIcon /> },
    { iconValue: 'linkedinicon', icon: <LinkedInIcon /> },
    { iconValue: 'PinterestIcon', icon: <PinterestIcon /> },
    { iconValue: 'RedditIcon', icon: <RedditIcon /> },
  ]

  useEffect(() => {
    if (data) {
      const filterFromAll = data?.resumecollectionall?.filter((d) => d.id === ResumeId)[0]
      console.log(filterFromAll)
      setGeneralData(filterFromAll.GeneralInfoDetails || null)
      setEducationData(filterFromAll.EducationInfoDetails || null)
      setProjectData(filterFromAll.ProjectInfoDetails || null)
      setAchievementData(filterFromAll.AchievementsInfoDetails || null)
      setSkillsData(filterFromAll.SkillsInfoDetails || null)
    }
  }, [data])


  return (
    <div className="template1" ref={dref}>
      {/* general details */}
      <div className="s">
        {generalData ?
          <div className="general" >
            <h3>{generalData?.name}</h3>
            <span>

              <div className="subhead">
                {generalData.socialLinks ? generalData.socialLinks?.map((link, i) => (
                  <>
                    <p>
                      <a href={link?.slink} target="_blank" rel="noreferrer">{AllIcons.filter(icon => icon?.iconValue === link?.sicon).map(filteredIcon => filteredIcon?.icon)}
                        {link?.slink}</a>
                    </p>
                  </>
                )) : <></>}
                <p>
                  <a href={`mailto: ${generalData?.email}`}><EmailIcon />{generalData?.email}</a>
                </p>
                <p><a href={`tel: ${generalData?.phonenum}`}><LocalPhoneIcon />{generalData?.phonenum}</a></p>
              </div>
            </span>
          </div>: <></>}
      </div>

      <div className="belowdata">
        {/* education details */}
        {educationData ? <div className="education">
          <div className="top">
            <SchoolIcon />
            <h3>EDUCATION</h3>
          </div>
          {educationData?.map((edu, j) => (
            <div className="contentdata" key={j} style={{marginBottom: "10px"}}>
              <div className="pdesc">
                <h5>{edu.etitle}</h5>
                <ul className="plink" style={{ listStyleType: 'none' }}>
                  <li>{edu.eYearPass}</li>
                  <span>|</span>
                  <li>{edu.eCity}, {edu.eState}, {edu.eCountry}</li>
                </ul>
                <p>{edu.eSchool}</p>
                <p>{edu.eScoreType} scored {edu.eScoreType === 'percent' ? `${edu.eScore}%` : edu.eScore}.</p>

              </div>
            </div>
))}
        </div> : <></>}

        {/* project details */}
        {projectData ? <div className="projects">
          <div className="top">
            <AccountTreeIcon />
            <h3>PROJECTS</h3>
          </div>
          {projectData?.map((pro, j) => (
            <div className="contentdata" key={j} style={{marginBottom: "10px"}}>
              <div className="pdesc">
                <h5>{pro.ptitle}</h5>
                <h6>{pro.pdesc}</h6>
                <ul className="plink">
                  <a href={pro.plive}>live</a>
                  <span>|</span>
                  <a href={pro.psrc}>code</a>
                </ul>
              </div>
            </div>
          ))}

        </div> : <></>}

        {/* project details */}
        {(projectData || educationData || generalData) ? <div className="projects">
          <div className="top">
            <WorkspacePremiumIcon />
            <h3>WORK EXPERIENCE</h3>
          </div>

          <div className="contentdata" style={{marginBottom: "10px"}}>
            <div className="pdesc">
              <h5>VERKA DAIRY PLANT</h5>
              <h6>In verka plant in production/contol section. Worked as a HR there.</h6>
              <ul className="plink">
                <li>2020</li>
                <span>-</span>
                <li>2022</li>
              </ul>
            </div>
          </div>

          <div className="contentdata">
            <div className="pdesc">
              <h5>VERKA DAIRY PLANT</h5>
              <h6>In verka plant in production/contol section. Worked as a HR there.</h6>
              <ul className="plink">
                <li>2020</li>
                <span>-</span>
                <li>2022</li>
              </ul>
            </div>
          </div>

        </div> : <></>}


        {/* achievement details */}
        {/* project details */}
        {achievementData ? <div className="projects">
          <div className="top">
            <AccountTreeIcon />
            <h3>ACHIEVEMENTS</h3>
          </div>
          {achievementData?.map((achievement, j) => (
            <div className="contentdata" key={j} style={{marginBottom: "10px"}}>
              <div className="pdesc">
                <h5>{achievement.aTitle}</h5>
                <h6>{achievement.aDescription}</h6>
              </div>
            </div>
          ))}

        </div> : <></>}
{/* Skills */}
        {skillsData ? <div className="projects">
          <div className="top">
            <AccountTreeIcon />
            <h3>SKILLS</h3>
          </div>
          <div className="wrap" style={{display: "flex", flexWrap: "wrap", justifyContent: "flex-start", alignItems: "center", gap: '3px'}}>

          {skillsData?.map((skill, j) => (
            <div className="contentdata" key={j} style={{ width: "fit-content", padding: "4px 8px", display: "flex", justifyContent: "center", alignItems: "center"}}>
              <div className="pdesc">
                <h6 className="showskill">{skill}</h6>
              </div>
            </div>
          ))}
</div>
        </div> : <></>}
      </div>
    </div>
  )
}

export default TempOne;

