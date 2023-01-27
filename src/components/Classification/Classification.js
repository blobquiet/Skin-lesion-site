import React, { useRef, useState, useEffect } from "react";
import "./Classification.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image, Row, Col, Container, Button, Form } from "react-bootstrap";

import { renderToString } from "react-dom/server";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

//---------------

import ReactDOM from "react-dom";

// Import React FilePond
import { FilePond, File, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import Doka. For testing purpose only, if you're intrested in using Doka
// in your project please purchase a license at https://pqina.nl/doka/
import "../../vendor/doka.min.css";
import { create } from "../../vendor/doka.esm.min";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import FilePondPluginFileMetadata from "filepond-plugin-file-metadata";
//import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginFileValidateType from "filepond-plugin-image-validate-size";
//import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
//registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
registerPlugin(
  // corrects mobile image orientation
  FilePondPluginImageExifOrientation,

  // previews the image
  FilePondPluginImagePreview,

  // resizes the image to fit a certain size
  FilePondPluginImageResize,

  // applies crop and resize information on the client
  FilePondPluginImageTransform,

  // The Image Edit plugin allows integration of image editing libraries like Pintura to make modifications to image files loaded in FilePond.
  FilePondPluginImageEdit,

  // The File Metadata plugin makes it possible to add initial metadata to file objects without using the file item setMetadata method.
  FilePondPluginFileMetadata,

  // encodes the file as base64 data
  //FilePondPluginFileEncode,

  // validates files based on input type
  FilePondPluginFileValidateType

  // crops the image to a certain aspect ratio
  //FilePondPluginImageCrop,
);

function iconImage() {
  return renderToString(<Image width="250" src="skin-icon-drag.png" />);
}

function roundNearest5(num) {
  // to get adequate age for meta model
  return Math.round(num / 5) * 5;
}
//---------------
function App() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/", { replace: true });
  };

  const handlePredict = () => {
    navigate("/prediction", { state: predData_ });
  };

  const handleChange = () => {
    disabled = enabled;
    setEnabled(!disabled);
  };

  const handleClick = (event) => {
    console.log("Image clicked");
  };

  var disabled = true;
  var pred = [];
  var predData = {
    diagnosis: "",
    score: 0,
    pred: [],
  };

  const [backgroundColor, setBackgroundColor] = useState();
  const [enabled, setEnabled] = useState();
  const [predictor_disabler, setPredictor] = useState();
  const [predData_, setPredictions] = useState();

  const [age, setAge] = useState(),
    //onInputAge = ({ target: { age } }) => setAge(age);
    onInputAge = (e) => {
      e.preventDefault();
      setAge(round5(e.target.value));
      console.log(round5(e.target.value));
    };
  const [location, setLocation] = useState(),
    onInputLocation = (e) => {
      setLocation(e.target.value);
      console.log(e.target.value);
    };
  //onInputLocation = function({ target: { location } }) setLocation(location);

  const [sex, setSex] = useState(),
    onInputSex = (e) => {
      setSex(e.target.value);
      console.log(e.target.value);
    };
  /* var bgColor= ["rgb(116, 128, 233)",
       "rgb(116, 120, 233)", "rgb(116, 140, 233)", "rgb(116, 110, 233)","rgb(116, 140, 233)"]; */
  var bgColor = [
    "rgb(68, 184, 64)",
    /*"rgb(116, 128, 233)",
    "rgb(68, 184, 64)",
    "rgb(255, 133, 33)",
    "rgb(255 82 82)",
    "rgb(73, 178, 209)",*/
  ];

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBackgroundColor(bgColor[Math.floor(Math.random() * bgColor.length)]);
    setEnabled(disabled);
    setPredictor(true);
    setPredictions(predData_);
  }, []);

  function round5(x) {
    return x % 5 >= 2.5 ? parseInt(x / 5) * 5 + 5 : parseInt(x / 5) * 5;
  }

  const [files, setFiles] = useState([]);
  return (
    <div
      className="Classification"
      style={{ backgroundColor: backgroundColor, padding: "1.5em"}}
    >
      {/* <div className="loader-container">
      </div>*/}
      <h2
        style={{
          fontSize: "1.5em",
          position: "center",
          marginBottom: "0.5em",
          paddingTop: "1.5em",
        }}
      >
        Skin Lesion Classification Demo
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
          style={{
            position: "fixed",
            top: "2em",
            left: "2em",
            color: "white",
            paddingTop: "1em",
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </a>
        <Row xs={1} md={2}>
          <Col>
            <h4 style={{ marginBottom: "2.2rem" }}>
              Patient-level information
            </h4>
            <Form>
              <Form.Group className="mb-3" controlId="formMetadata" disabled>
                <Form.Check
                  style={{ fontSize: "0.7em" }}
                  type="checkbox"
                  label="Use metadata"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAge">
                <Form.Control
                  type="number"
                  placeholder="Age"
                  min="0"
                  max="94"
                  step="any"
                  onChange={onInputAge}
                  disabled={enabled}
                />
              </Form.Group>

              <Form.Control
                className="mb-3"
                as="select"
                onChange={onInputSex}
                disabled={enabled}
              >
                <option>Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Control>

              <Form.Control
                as="select"
                className="mb-3"
                onChange={onInputLocation}
                disabled={enabled}
              >
                <option>Anatomical site</option>
                <option value="torso">Torso</option>
                <option value="anterior torso">Anterior torso</option>
                <option value="posterior torso">Posterior torso</option>
                <option value="lateral torso">Lateral torso</option>
                <option value="upper extremity">Upper extremity</option>
                <option value="lower extremity">Lower extremity</option>
                <option value="head/neck">Head/neck</option>
                <option value="palms/soles">Palms/soles</option>
                <option value="oral/genital">Oral/genital</option>
                <option value="unknown">Unknown</option>
              </Form.Control>
            </Form>
          </Col>
          <Col>
            <h4 style={{ marginBottom: "2.2rem" }}>Upload skin lesion image</h4>
            <FilePond
              files={files}
              name="files" /* sets the file input name, it's filepond by default */
              onupdatefiles={setFiles}
              allowMultiple={true}
              maxFiles={1}
              //server="http://localhost:8080/predictmeta"
              //server="http://localhost:8080/predict"
              //server="http://localhost:8080/ttapredict"
              server={{
                url: "https://skindiagnosis-7jr3vz7j2a-ew.a.run.app/predict",
                //onload: handleClick(),
                //onload: handleClick()
                timeout: 25000,
              }}
              //server="http://localhost:8080/upload"
              //server="http://172.17.0.2:8080/upload"
              //server="http://172.17.0.2:8080/predict"
              //server="http://172.17.0.2:8080/predict"
              //server="https://skindiagnosis-7jr3vz7j2a-ew.a.run.app/predict"
              //allowImageCrop={true}
              labelFileProcessing={"Predicting"}
              labelFileProcessingComplete={"Done!"}
              allowFileTypeValidation={true}
              accepted-file-types={["image/png", "image/jpeg"]}
              labelFileTypeNotAllowed="File of invalid type"
              allowReorder={true}
              allowImageResize={true}
              imageResizeTargetWidth={224}
              imageResizeTargetHeight={224}
              imageResizeUpscale={true}
              imageResizeMode={"cover"}
              allowFileMetadata={!enabled}
              fileMetadataObject={{
                age: age,
                location: location,
                sex: sex,
              }}
              onprocessfile={function(err, file) {
                try {
                  const { serverId } = file;
                  const data = JSON.parse(serverId);
                  //console.log(data);
                  //console.log(data.label);
                  //console.log(data.pred);
                  //console.log(data.score * 100);

                  predData.diagnosis = data.diagnosis;
                  predData.pred = data.pred;
                  predData.score = data.score;
                  setPredictor(false);
                  setPredictions(predData);
                  setLoading(true);
                  //handlePredict(); //only to predict after upload
                } catch (error) {}
                //console.log("server id ", err, file.serverId);
                //console.log("on process ", err, file)
                // console.log(file.serverId,serverId,serverId.);
                //console.log("predData", predData);
              }}
              // insert img bellow
              //onpreparefile={(file, output) => {
              //  const img = document.createElement("img");
              //  img.src = URL.createObjectURL(output);
              //  document.body.appendChild(img);
              //}}

              //imageEditAllowEdit={false}
              //allowImageEdit={false}
              imageEditEditor={create({
                cropMinImageWidth: 100,
                cropMinImageHeight: 100,
              })}
              labelIdle='<span class="filepond--label-action">Select</span> your skin lesion image <br /> or drop it here!'
              //labelIdle= {iconImage()}
              credits={false}
              //labelIdle= '<svg class="w-10 h-10 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>'
            />
            {/*
            <p>Or select one of the examples:</p>
            <Row className="justify-content-center">
              <Image
                style={{
                  borderRadius: "0.6em",
                  width: "5.3em",
                }}
                src="https://mdbootstrap.com/img/new/fluid/city/055.webp"
                thumbnail
              ></Image>
              <Image
                style={{
                  borderRadius: "0.6em",
                  width: "5.3em",
                }}
                src="https://mdbootstrap.com/img/new/fluid/city/055.webp"
                thumbnail
                onClick={handleClick}
              ></Image>
              <Image
                style={{
                  borderRadius: "0.6em",
                  width: "5.3em",
                }}
                src="https://mdbootstrap.com/img/new/fluid/city/055.webp"
                thumbnail
              ></Image>
            </Row>*/}
          </Col>
        </Row>
        {loading ? (
          <Row
            className="justify-content-center"
            style={{ marginTop: "0.5em" }}
          >
            <Button
              onClick={handlePredict}
              style={{ fontFamily: "'Comfortaa', cursive" }}
              disabled={predictor_disabler}
            >
              Show prediction
            </Button>
          </Row>
        ) : (
          <div></div>
        )}
      </Container>
    </div>
  );
}

export default App;
