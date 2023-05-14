import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import './AchievementsInfo.css';
import { Alert, IconButton } from '@mui/material';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase-setup/firebase';
import db from '../../../firebase-setup/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const AchievementsInfo = ({userInfoData, save, setSave, wholeData}) => {
  const {ResumeId} = useParams()
  const [achievementsTitle, setAchievementsTitle] = useState('')
  const [achievementsDescription, setAchievementsDescription] = useState('')
  const [skill, setSkill] = useState('')
  const [skillAll, setSkillAll] = useState([])
  const [achievementActiveChip, setAchievementActiveChip] = useState('new')
  const [AchievementsInfoAll, setAchievementsInfoAll] = useState([])
  const [achievementupdateIndex, setAchievementUpdateIndex] = useState(0)

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (userInfoData) {
      setAchievementsInfoAll(userInfoData?.AchievementsInfoDetails)
      setSkillAll(userInfoData?.SkillsInfoDetails)
    }
  }, [ResumeId, userInfoData])

 // save achievement details in database user logged in details
 async function addDetails() {
  if (user) {
      const userEmail = user.email;
      // user-details
      try {
          // Add a new document in collection "users-details"
          await updateDoc(doc(db, "user-details", userEmail), updateDetail());
          setSave(true)
      } catch (e) {
          console.log(e)
      }
  }
  setTimeout(() => {
      setSave(false)
  }, 2000)
}
// update whole data
const updateDetail = () => {
  let tempWholeData = wholeData
  tempWholeData.resumecollectionall.filter((item) => item.id == ResumeId)[0].AchievementsInfoDetails = AchievementsInfoAll
  tempWholeData.resumecollectionall.filter((item) => item.id == ResumeId)[0].SkillsInfoDetails = skillAll
  return tempWholeData
}

      // add Achievements Details
      const addAchievementsDetails = () => {
        if (achievementsTitle.trim() && achievementsDescription.trim()) {
            setAchievementsInfoAll(oldArray => [...oldArray,
            {
                aTitle: achievementsTitle,
                aDescription: achievementsDescription
            }])
        }
setAchievementsDescription('')
setAchievementsTitle('')
setAchievementActiveChip('new')
    }

  // handle display of education details
  const handlechipdisplay = (chipTitle, chipDescription) => {
    setAchievementsTitle(chipTitle)
    setAchievementsDescription(chipDescription)
  }

  // update chip
  const updateAchievement = () => {
    let tempList = AchievementsInfoAll
    tempList[achievementupdateIndex] = { aTitle: achievementsTitle, aDescription: achievementsDescription}
    setAchievementsInfoAll(tempList)
    setAchievementsTitle('')
    setAchievementsDescription('')
    setAchievementActiveChip('new')
    
  }
  // delete chip from list
  const deleteSkillchip = (chipIndex) => {
    setSkillAll(skillAll.filter((_, index) => index !== chipIndex))
    setSkill('')
  }
  const deleteAchievementChip = (chipIndex) => {
    setAchievementsInfoAll(AchievementsInfoAll.filter((_, index) => index !== chipIndex))
    setAchievementsTitle('')
    setAchievementsDescription('')
  }

  // handle skill add
  const handleSkillAdd = () => {
    if (skill) {
      setSkillAll(oldArray => [...oldArray, skill])
      setSkill('')
    }
  }

  return (
    <div className="bottom">
      {save && <Alert severity="success" color="info" className="savealert">
                saved successfully!
            </Alert>}
      <div className="bottom-left data">
        {/* TITLE */}
        <span>
          <label htmlFor="achievetitle">ACHIEVEMENT TITLE<sup>*</sup> : </label>
          <input type="text" id="achievetitle" placeholder="Title"
            value={achievementsTitle} onChange={(e) => setAchievementsTitle(e.target.value)} />
        </span>
        {/* ACHIEVEMENT NAME */}
        <span>
          <label htmlFor="achievedescription">ACHIEVEMENT DESCRIPTION<sup>*</sup> : </label>
          <textarea type="text" id="achievedescription" placeholder="Achievement description"
            value={achievementsDescription} onChange={(e) => setAchievementsDescription(e.target.value)} />
        </span>

        {/* button to add */}
        {achievementActiveChip !== "new" ? <button className="simpleButton" onClick={updateAchievement}
                    style={{ backgroundColor: 'rgba(66, 55, 123, 0.7)', color: '#fff' }}><UpgradeIcon /> UPDATE</button> :
                    <button className="simpleButton" onClick={addAchievementsDetails}
                        style={{ backgroundColor: 'rgba(66, 55, 123, 0.7)', color: '#fff' }}>ADD</button>}
{/* skills */}
<div style={{ paddingBottom: '20px' }}></div>
<span className="social-title">
          <label htmlFor="Skill">SKILL : </label>
          <span>
            <input type="text" placeholder="Skill"
              value={skill} onChange={(e) => setSkill(e.target.value)} />
            <IconButton onClick={handleSkillAdd}>
              <AddIcon  />
            </IconButton>
          </span>
        </span>
        
        <div className='skillschipwrap'>
        {skillAll.length>0 && skillAll.map((preview, i) =>
              <div key={`preview${i}`} value={i} className={`chips skillchip ${achievementActiveChip === preview ? 'active' : ''}`}>
                <span>
                  <span >{preview}</span>
                </span>
                <CloseIcon onClick={() => { deleteSkillchip(i); }} />
              </div>)}
         </div>
        
        <div style={{ paddingBottom: '30px' }}></div>
      </div>
      <div className="bottom-right data">
      {AchievementsInfoAll.length > 0 &&
          <div className="previewEducationInfo AchievementsInfo">
            <div className={`new-chip ${achievementActiveChip === 'new' ? 'active' : ''}`}
              onClick={() => {
                setAchievementsTitle('');
                setAchievementsDescription('');
                setAchievementActiveChip('new');
              }}>NEW</div>

            {AchievementsInfoAll.map((preview, i) =>
              <div key={`preview${i}`} value={i} className={`chips ${achievementActiveChip === preview.aTitle ? 'active' : ''}`}>
                <span onClick={() => {
                  setAchievementActiveChip(preview.aTitle);
                  setAchievementUpdateIndex(i)
                  handlechipdisplay(preview.aTitle, preview.aDescription, i)
                }}>
                  <span >{`Title : ${preview.aTitle}`}</span>
                  <span>{`Description : ${preview.aDescription}`}</span>
                </span>
                <CloseIcon onClick={() => { deleteAchievementChip(i); }} />
              </div>)}
          </div>}
        
          <div style={{ paddingBottom: '30px' }}></div>
        {/* button to add */}
        <button className="simpleButton" onClick={addDetails}>SAVE</button>
        <span></span> {/* empty span for a gap in mobile view  */}
      </div>
    </div>
  )
}

export default AchievementsInfo;
