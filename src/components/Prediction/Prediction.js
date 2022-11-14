import React, { useRef, useState, useEffect } from "react";
import "./Prediction.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Button, Table } from "react-bootstrap";
import Plot from "react-plotly.js";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function App() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/classification", { replace: true });
  };
  const [backgroundColor, setBackgroundColor] = useState();
  /* var bgColor= ["rgb(116, 128, 233)",
       "rgb(116, 120, 233)", "rgb(116, 140, 233)", "rgb(116, 110, 233)","rgb(116, 140, 233)"]; */
  var bgColor = [
    "rgb(73, 178, 209)",
    /*
    "rgb(116, 128, 233)",
    "rgb(68, 184, 64)",
    "rgb(255, 133, 33)",
    "rgb(255 82 82)",
    "rgb(73, 178, 209)",*/
  ];

  useEffect(() => {
    setBackgroundColor(bgColor[Math.floor(Math.random() * bgColor.length)]);
  }, []);

  const { state } = useLocation();
  //console.log(state);
  var diagnosis = "";
  var pred = [];
  var score = 0;
  try {
    diagnosis = state.diagnosis;
    pred = state.pred;
    score = (state.score * 100).toFixed(2);
  } catch (error) {
    diagnosis = "";
    pred = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
    score = 0;
  }

  if (window.innerWidth > 1200) {
    var classes = [
      "Actinic<br>keratosis",
      "Basal cell<br>carcinoma",
      "Benign <br>keratosis",
      "Dermatofibroma",
      "Melanoma",
      "Melanocytic<br>nevus",
      "Squamous<br>cell carcinoma",
      "Unknown",
      "Vascular<br>lesion",
    ];
  } else {
    var classes = ["AK", "BCC", "BKL", "DF", "MEL", "NV", "SCC", "UNK", "VASC"];
  }

  return (
    <div
      className="Classification"
      style={{ backgroundColor: backgroundColor, padding: "1.5em" }}
    >
      <h2
        style={{ fontSize: "1.5em", position: "center", marginBottom: "0.5em", padding: "1.5em" }}
      >
        Skin Lesion Classification demo
      </h2>
      <Container
        style={{
          minWidth: "90%",
          background: "white",
          color: "black",
          padding: "1.5em",
          borderRadius: "0.6em",
        }}
      >
        <a
          href=""
          onClick={handleBack}
          style={{ position: "fixed", top: "2em", left: "2em", color: "white", paddingTop: "1em" }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </a>
        <Row className="justify-content-center">
          <h4>
            {" "}
            <strong>Prediction: {diagnosis}</strong>
          </h4>
        </Row>
        <Row className="justify-content-center">
          <p style={{ textAlign: "justify", margin: "0" }}>
            Based on the input data, our model predicts <b>{diagnosis}</b> with
            a <b>{score}%</b> confidance.
          </p>
          <Plot
            data={[
              {
                type: "bar",
                x: classes,
                y: pred,
                marker: {
                  color: [
                    "rgba(13, 200, 58, 0.8)",
                    "rgba(13, 160, 200, 0.8)",
                    "rgba(190, 81, 249, 0.9)",
                    "rgba(255, 102, 6, 0.8)",
                    "rgba(255, 0, 0, 0.8)",
                    "rgba(53, 51, 120, 0.8)",
                    "rgba(136, 206, 14, 0.8)",
                    "rgba(159, 96, 67, 0.8)",
                    "rgba(237, 218, 14, 0.8)",
                  ],
                  width: 1,
                },
              },
            ]}
            layout={{
              //autosize: true,
              title: "Model distribution",
              font: {
                family: "Comfortaa, cursive",
              },
              plot_bgcolor: "rgba(228,236,245,255)",
              yaxis: {
                title: "Probability",
                showline: false,
                gridcolor: "rgb(255,255,255)",
                showgrid: true,
                showline: false,
                showticklabels: true,
                tickcolor: "rgb(127,127,127)",
                ticks: "outside",
                zeroline: false,
              },
              xaxis: {
                automargin: true,
                gridcolor: "rgb(255,255,255)",
                showgrid: true,
                showline: false,
                showticklabels: true,
                tickcolor: "rgb(127,127,127)",
                ticks: "outside",
                zeroline: false,
              },
            }}
            style={{ width: "100%", height: "100%" }}
            useResizeHandler={true}
            className="w-full h-full" // I am using tailwind.css here,
          />
        </Row>
        <Row className="justify-content-center">
          {window.innerWidth > 1200 ? (
            <div></div>
          ) : (
            <Table
              responsive="sm"
              striped
              bordered
              hover
              style={{ fontSize: "calc(10px + 0.5vmin)" }}
            >
              <thead>
                <tr>
                  <th>Abbreviation</th>
                  <th>Diagnosis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>AK</td>
                  <td>Actinic keratosis</td>
                </tr>
                <tr>
                  <td>BCC</td>
                  <td>Basal cell carcinoma</td>
                </tr>
                <tr>
                  <td>BKL</td>
                  <td>Benign keratosis</td>
                </tr>
                <tr>
                  <td>DF</td>
                  <td>Dermatofibroma</td>
                </tr>
                <tr>
                  <td>MEL</td>
                  <td>Melanoma</td>
                </tr>
                <tr>
                  <td>NV</td>
                  <td>Melanocytic nevus</td>
                </tr>
                <tr>
                  <td>SCC</td>
                  <td>Squamous cell carcinoma</td>
                </tr>
                <tr>
                  <td>UNK</td>
                  <td>Unknown</td>
                </tr>
                <tr>
                  <td>VASC</td>
                  <td>Vascular lesion</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Row>
        <Row className="justify-content-center">
          {/*<Button
            style={{
              fontFamily: "'Comfortaa', cursive",
              marginBottom: "1em",
            }}
            disabled
          >
            Save as PDF
          </Button>*/}
        </Row>
        <Row>
          <p style={{ textAlign: "justify", margin: "0" }}>
            <b>Disclaimer:</b> please be aware that this is an integration of a{" "}
            <b>Computer Aided Diagnosis (CAD) demo</b>, and is not intended to
            replace medical advice. Regardless of the outcome, please visit your
            doctor.
          </p>
        </Row>
      </Container>
    </div>
  );
}

export default App;
