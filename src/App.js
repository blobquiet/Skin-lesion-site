import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function App() {
  const [displayNone, setDisplayNone] = useState("");
  const [fadeClassOut, setFadeOut] = useState("");
  const [copySuccess, setCopySuccsess] = useState("Code");

  const textAreaRef = useRef(null);

  const [backgroundColor, setBackgroundColor] = useState();
  /* var bgColor= ["rgb(116, 128, 233)",
     "rgb(116, 120, 233)", "rgb(116, 140, 233)", "rgb(116, 110, 233)","rgb(116, 140, 233)"]; */
  var bgColor = [
    "rgb(255 82 82)",
    /*"rgb(116, 128, 233)",
    "rgb(68, 184, 64)",
    "rgb(255, 133, 33)",
    "rgb(255 82 82)",
    "rgb(73, 178, 209)",*/
  ];

  const copyToClipboard = (e) => {
    /* textAreaRef.current.select(); */
    /* document.execCommand('copy'); */
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    //e.target.focus();
    setCopySuccsess("Send us an email :)");
  };

  useEffect(() => {
    setTimeout(() => {
      setFadeOut("animate__animated animate__delay-1s animate__fadeOut");
    }, 1500);
    setTimeout(() => {
      setDisplayNone("displayNone");
    }, 4000);
    setBackgroundColor(bgColor[Math.floor(Math.random() * bgColor.length)]);
  }, []);

  return (
    <>
      <div
        className="App App-header"
        style={{ backgroundColor: backgroundColor }}
      >
        <h1
          className={`animate__animated animate__bounce ${fadeClassOut} ${displayNone}`}
          style={{ fontSize: "2.5em", position: "absolute" }}
        >
          First place in 2019 & third in 2020
          <br /> SIIM-ISIC skin lesion challenges
        </h1>
        <p
          className={`animate__animated animate__delay-4s animate__fadeIn `}
          style={{
            fontSize: "1.1em",
            fontWeight: "500",
            textAlign: "center",
            marginTop: "0.5em",
            paddingLeft: "0.5em",
            paddingRight: "0.5em",
          }}
        >
          <Container>
            <h2 style={{ marginBottom: "1em" }}>
              Superconverging Deep Learning Model for Skin Lesion Classification
            </h2>
            <Row xs={1} md={2}>
              {/* 
              <Col>
                <a
                  style={{ color: "white" }}
                  href="_David_D__Gaviria__Superconverging_Deep_Learning_Model_for_Skin_Lesion_Classification.pdf"
                  without
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    width="93"
                    src="paper_image.png"
                    thumbnail
                    title="Click here to get the paper!"
                  />
                  <p
                    style={{
                      position: "relative",
                      fontSize: "0.8em",
                      fontWeight: "500",
                      textAlign: "center",
                      marginTop: "0.5em",
                      fontWeight: "1500",
                    }}
                    title="Click here to get the paper!"
                  >
                    Paper
                  </p>
                </a>
              </Col>
              */}
              <Col>
                <Link style={{ color: "white" }} to="/classification">
                  <Image
                    width="130"
                    src="skin-icon.png"
                    title="Click here for online demo!"
                  />
                  <p
                    style={{
                      position: "relative",
                      fontSize: "0.8em",
                      fontWeight: "500",
                      textAlign: "center",
                      marginTop: "0.5em",
                      fontWeight: "1500",
                    }}
                    title="Click here for online demo!"
                  >
                    Skin Classification
                    <br />
                    Web App
                  </p>
                </Link>
              </Col>
              <Col>
                <a
                  style={{ color: "white" }}
                  href="https://github.com/blobquiet/SIIM-ISIC-Melanoma-Classification"
                  target="_blank"
                  title="Click here to get the code!"
                >
                  <Image width="130" src="git.png" />
                  <p
                    style={{
                      position: "relative",
                      fontSize: "0.8em",
                      fontWeight: "500",
                      textAlign: "center",
                      marginTop: "0.5em",
                      fontWeight: "1500",
                    }}
                    title="Click here to get the code!"
                  >
                    Code
                  </p>
                </a>
              </Col>
              {/*<Col>
             <div onClick={() => copyToClipboard()}>
              <Image width="93" src="git.png"/></div>
              <p style={{
                position:"relative",
                fontSize: "0.8em",
                fontWeight: "500",
                textAlign: "center",
                marginTop: "0.5em",
                fontWeight: "1500", 
                }}> {copySuccess}</p> 
                
            </Col>*/}
            </Row>
          </Container>
        </p>
      </div>

      <Container className="animate__animated animate__delay-2s animate__fadeIn">
        <Row xs={1} md={3}>
          <Col>
            <div>
              <h3
                style={{
                  fontSize: "1em",
                  fontWeight: "800",
                  textAlign: "center",
                  marginTop: "1.8em",
                }}
              >
                David D. Gaviria
              </h3>
              <p
                style={{
                  fontSize: "0.7em",
                  fontWeight: "800",
                  textAlign: "center",
                  marginTop: "0.5em",
                  paddingLeft: "0.5em",
                  paddingRight: "0.5em",
                }}
              >
                Universitat Politècnica de Catalunya
              </p>
            </div>
            <p
              className="animate__animated animate__delay-4s animate__fadeIn"
              style={{
                fontSize: "0.85em",
                fontWeight: "20",
                textAlign: "center",
                color: "black",
              }}
            >
              blobquiet@gmail.com
            </p>
          </Col>
          <Col>
            <div>
              <h3
                style={{
                  fontSize: "1em",
                  fontWeight: "800",
                  textAlign: "center",
                  marginTop: "1.8em",
                }}
              >
                Md Mostafa Kamal Saker
              </h3>
              <p
                style={{
                  fontSize: "0.7em",
                  fontWeight: "800",
                  textAlign: "center",
                  marginTop: "0.5em",
                  paddingLeft: "0.5em",
                  paddingRight: "0.5em",
                }}
              >
                University of Oxford
              </p>
            </div>
            <p
              className="animate__animated animate__delay-4s animate__fadeIn"
              style={{
                fontSize: "0.85em",
                fontWeight: "20",
                textAlign: "center",
                color: "black",
              }}
            >
              m.kamal.sarker@gmail.com
            </p>
          </Col>
          <Col>
            <div>
              <h3
                style={{
                  fontSize: "1em",
                  fontWeight: "800",
                  textAlign: "center",
                  marginTop: "1.8em",
                }}
              >
                Petia Ivanona Radeva
              </h3>
              <p
                style={{
                  fontSize: "0.7em",
                  fontWeight: "800",
                  textAlign: "center",
                  marginTop: "0.5em",
                  paddingLeft: "0.5em",
                  paddingRight: "0.5em",
                }}
              >
                Universitat de Barcelona
              </p>
            </div>
            <p
              className="animate__animated animate__delay-4s animate__fadeIn"
              style={{
                fontSize: ".85em",
                fontWeight: "20",
                textAlign: "center",
                color: "black",
              }}
            >
              radevap@gmail.com
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
