import "./ResumeCollections.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CreateIcon from "@mui/icons-material/Create";
import { v4 as uuidv4 } from "uuid";

// firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase-setup/firebase";
import db from "../../firebase-setup/firebase";
import { useEffect, useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";

// modal
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// react router dom
import { Link } from "react-router-dom";
import LoginComp from "../../components/logincomp/LoginComp";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "92%",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ResumeCollections({ signIn, fbsignin }) {

  const ranImageData = [
    {src: "./images/random/1.jpg", alt: "coverimage"},
    {src: "./images/random/2.jpg", alt: "coverimage"},
    {src: "./images/random/3.jpg", alt: "coverimage"},
    {src: "./images/random/4.jpg", alt: "coverimage"},
    {src: "./images/random/5.jpg", alt: "coverimage"},
    {src: "./images/random/6.jpg", alt: "coverimage"},
    {src: "./images/random/7.jpg", alt: "coverimage"},
    {src: "./images/random/8.jpg", alt: "coverimage"},
    {src: "./images/random/9.jpg", alt: "coverimage"},
  ]
  const [user] = useAuthState(auth);
  const [resumeListAll, setResumeListAll] = useState(null);

  // material ui
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //

  // name
  const [addName, setAddName] = useState("" || "Draft");
  const [loading, setLoading] = useState(false);

  // fetch user data
  useEffect(() => {
    async function fetchData() {
      if (user) {
        setLoading(true);
        const querySnapshot = doc(db, "resumecollections", user?.email);
        const allData = await getDoc(querySnapshot);
        setResumeListAll(allData?.data());
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  // add new resume
  const addNewHandle = async () => {
    if (user && !loading) {
      const generateId = uuidv4();
      let tempResumeList = resumeListAll;
      setLoading(true);
      tempResumeList?.resumelist?.push({
        id: generateId,
        name: addName,
        coverPhoto: null,
      });
      await updateDoc(
        doc(db, "resumecollections", user?.email),
        tempResumeList
      );

      // users-details >>add id
      const querySnapshot = doc(db, "user-details", user?.email);
      if (querySnapshot?.id === user?.email) {
        const allData = await getDoc(querySnapshot);

        let tempdataForUserDetails = allData?.data();
        tempdataForUserDetails?.resumecollectionall?.push({
          EducationInfoDetails: [],
          GeneralInfoDetails: {},
          ProjectInfoDetails: [],
          SkillsInfoDetails: [],
          WorkInfoDetails: [],
          AchievementsInfoDetails: [],
          HobbiesInfoDetails: [],
          id: generateId,
        });

        await updateDoc(
          doc(db, "user-details", user?.email),
          tempdataForUserDetails
        );
      }
      handleClose();
      setLoading(false);
      setAddName("" || "Draft");
    }
  };
  
//  show random image
const showRandomImage = () => {
  return ranImageData[Math.floor(Math.random() * ranImageData.length)].src;
}


  if (!user ) {
    return <LoginComp signIn={signIn} fbsignin={fbsignin} />;
  }
  return (
    <div className="resumecollections">
      {/* create new */}
      <div className="resumecollections__create" onClick={handleOpen}>
        <CreateIcon style={{ color: "#fffff" }} />
        <h1>CREATE NEW</h1>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Give the title to your resume
          </Typography>
          <input
            id="modal-modal-description"
            style={{ width: "80%", height: "40px", padding: "8px 10px" }}
            sx={{ mt: 3 }}
            placeholder="Title"
            value={addName}
            onChange={(e) => setAddName(e.target.value)}
          />

          <Button color="primary"  onClick={addNewHandle}>
            Create New
          </Button>
        </Box>
      </Modal>

      <div className="resumecollections__header">
        <h1>RECENTS</h1>
      </div>
      <div className="resumecollections__wrap">
        {/* grid */}

        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto !important",
            paddingBottom: "80px",
          }}
        >
          <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
            {loading ? (
              <h1
                style={{
                  marginTop: "30px",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Loading...
              </h1>
            ) : (
              <>
                {resumeListAll?.resumelist?.map((_, index) => (
                  <Grid item xs={6} sm={4} md={4} key={index}>
                    <Link to={`/resume/${_.id}`}>
                      <div className="resumecollections__item">
                        <img
                          src={showRandomImage()}
                          alt="resume"
                        />
                        <div className="resumecollections__item__details">
                          <h1>{_?.name}</h1>
                        </div>
                      </div>
                    </Link>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Box>
        {/* grid ends here */}
        <div></div>
      </div>
    </div>
  );
}

export default ResumeCollections;
