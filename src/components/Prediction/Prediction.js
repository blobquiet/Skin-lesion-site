import React, { useRef, useState, useEffect } from "react";
import "./Prediction.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Button } from "react-bootstrap";
import Plot from "react-plotly.js";

function App() {
  const [backgroundColor, setBackgroundColor] = useState();
  /* var bgColor= ["rgb(116, 128, 233)",
       "rgb(116, 120, 233)", "rgb(116, 140, 233)", "rgb(116, 110, 233)","rgb(116, 140, 233)"]; */
  var bgColor = [
    "rgb(116, 128, 233)",
    "rgb(68, 184, 64)",
    "rgb(255, 133, 33)",
    "rgb(255 82 82)",
    "rgb(73, 178, 209)",
  ];

  useEffect(() => {
    setBackgroundColor(bgColor[Math.floor(Math.random() * bgColor.length)]);
  }, []);

  const [files, setFiles] = useState([]);
  return (
    <div
      className="Classification"
      style={{ backgroundColor: backgroundColor, padding: "1.5em" }}
    >
      <h2
        style={{ fontSize: "1.5em", position: "center", marginBottom: "0.5em" }}
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
        <Row className="justify-content-center">
        <h4> Prediction: Melanoma</h4>
          <Plot
            data={[
              {
                type: "bar",
                x: [
                  "AK",
                  "BCC",
                  "BKL",
                  "DF",
                  "MEL",
                  "NV",
                  "SCC",
                  "UNK",
                  "VASC",
                ],
                y: [0.2, 0.5, 0.3, 0.2, 0.5, 0.3, 0.2, 0.5, 0.3],
                marker: {
                  color: [
                    "#ff0000",
                    "#ff2200",
                    "rgba(55,128,191,0.6)",
                    "#00ff00",
                    "#00ff00",
                    "#00ff00",
                    "#00ff00",
                    "#00ff00",
                    "#00ff00",
                  ],
                  width: 1,
                },
              },
            ]}
            layout={{
              autosize: true,
              title: "Model distribution for image IM0345340.jpg",
              font: {
                family: 'Comfortaa, cursive',
              },
            }}
            style={{ width: "100%", height: "40%" }}
            useResizeHandler={true}
            className="w-full h-full" // I am using tailwind.css here,
          />
        </Row>
        <Row className="justify-content-center">
          <p>Based on the input data, our model predicts Melanoma with a 93% confidence score. Please be aware that this is only a demo and is not intended to replace medical advice. Regardless of the outcome, please visit your doctor.</p>
          <Button style={{ fontFamily: "'Comfortaa', cursive" }} disabled>
            Save as PDF
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default App;
