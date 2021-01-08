import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image, Row, Col, Container } from "react-bootstrap";

function App() {
  
  const [displayNone, setDisplayNone] = useState("");
  const [fadeClassOut, setFadeOut] = useState("");
  const [copySuccess, setCopySuccsess] = useState("Code");

  const textAreaRef = useRef(null);

  const [backgroundColor, setBackgroundColor] = useState();
  /* var bgColor= ["rgb(116, 128, 233)",
     "rgb(116, 120, 233)", "rgb(116, 140, 233)", "rgb(116, 110, 233)","rgb(116, 140, 233)"]; */
    var bgColor= ["rgb(116, 128, 233)",
     "rgb(68, 184, 64)", "rgb(255, 133, 33)",
    "rgb(255 82 82)", "rgb(73, 178, 209)"];

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
  }, [])

  return (
    <>
   {/* <div id="counter-app">
     <div id="buttons-container" className={`container ${fadeClassIn}`}>
      <button id="increment-button" className="button" ><i className="fa fa-plus"></i></button>
      <button id="decrement-button" className="button" ><i className="fa fa-minus"></i></button>
      <button id="reset-button" className="button" ><i className="fa fa-refresh"></i></button>
    </div> 
  </div>*/}
      <div className="App App-header" style={{backgroundColor:backgroundColor}}>
        <h1          
          className={`animate__animated animate__bounce ${fadeClassOut} ${displayNone}`}
          style={{ fontSize: "2.5em", position: "absolute" }}
        >
          This is our CI project!
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
          <h2 style={{marginBottom:"1em"}}>Using Neural Networks to discriminate between Benign and Malignant Moles
          </h2>
          <Row>
            <Col xs={6} md={4}>
            <a style={{color: "white"}} href="CI_Report.pdf" download target="_blank">
              <Image width="93" src="paper_image.png" thumbnail/>
              <p style={{
                position:"relative",
                fontSize: "0.8em",
                fontWeight: "500",
                textAlign: "center",
                marginTop: "0.5em",
                fontWeight: "1500"
                }}>Paper</p></a>
            </Col>
            <Col xs={6} md={4}>
            <a style={{color: "white"}} href="skin-moles.apk" download target="_blank">
              <Image width="140" src="apk3.png"/>
              <p style={{
                position:"relative",
                fontSize: "0.8em",
                fontWeight: "500",
                textAlign: "center",
                marginTop: "0.5em",
                fontWeight: "1500",
                }}>skin-moles.apk</p></a>
            </Col>   
            <Col xs={6} md={4}>
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
                
            </Col>
          </Row>
        </Container>      
        </p>
      </div>

      <Container className="animate__animated animate__delay-2s animate__fadeIn">
        <Row>
          <Col>
          <div>
        <h3
          style={{
            fontSize: "1em",
            fontWeight: "800",
            textAlign: "center",
            marginTop: "0.8em",
          }}
        >
          Michael Birkholz
        </h3>
        <p
          style={{
            fontSize: "0.7em",
            fontWeight: "500",
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
          fontSize: "0.7em",
          fontWeight: "20",
          textAlign: "center",
          color: "black",
        }}
      >
        michael.birkholz@estudiantat.upc.edu
      </p>
          </Col>
          <Col>
          <div>
        <h3
          style={{
            fontSize: "1em",
            fontWeight: "800",
            textAlign: "center",
            marginTop: "0.8em",
          }}
        >
          David Dueñas
        </h3>
        <p
          style={{
            fontSize: "0.7em",
            fontWeight: "500",
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
          fontSize: "0.7em",
          fontWeight: "20",
          textAlign: "center",
          color: "black",
        }}
      >
        david.duenas.gaviria@estudiantat.upc.edu
      </p>
          </Col>
          <Col>
          <div>
        <h3
          style={{
            fontSize: "1em",
            fontWeight: "800",
            textAlign: "center",
            marginTop: "0.8em",
          }}
        >
          David Fernández Aldana
        </h3>
        <p
          style={{
            fontSize: "0.7em",
            fontWeight: "500",
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
          fontSize: "0.7em",
          fontWeight: "20",
          textAlign: "center",
          color: "black",
        }}
      >
        david.fernandez.aldana@estudiantat.upc.edu
      </p>
          </Col>
          <Col>
          <div>
        <h3
          style={{
            fontSize: "1em",
            fontWeight: "800",
            textAlign: "center",
            marginTop: "0.8em",
          }}
        >
          Ronald Rivera Torres
        </h3>
        <p
          style={{
            fontSize: "0.7em",
            fontWeight: "500",
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
          fontSize: "0.7em",
          fontWeight: "20",
          textAlign: "center",
          color: "black",
        }}
      >
        ronald.rivera@estudiantat.upc.edu
      </p></Col>
        </Row>
      </Container>
      
    </>
  );
}

export default App;
