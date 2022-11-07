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
//import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
//import FilePondPluginFileValidateType from 'filepond-plugin-image-validate-size';
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
  FilePondPluginImageEdit

  // encodes the file as base64 data
  //FilePondPluginFileEncode,

  // validates files based on input type
  //FilePondPluginFileValidateType,

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
    navigate("/prediction", { replace: true });
  };

  const [backgroundColor, setBackgroundColor] = useState();
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
          style={{ position: "fixed", top: "2em", left: "2em", color: "white" }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="fa-sm" />
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
                  label="Use matadata"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAge">
                <Form.Control
                  type="number"
                  placeholder="Age"
                  min="0"
                  max="100"
                  step="any"
                />
              </Form.Group>

              <Form.Control className="mb-3" as="select">
                <option>Sex</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </Form.Control>

              <Form.Control as="select" className="mb-3">
                <option>Anatomical site</option>
                <option value="1">Torso</option>
                <option value="2">Anterior torso</option>
                <option value="3">Posterior torso</option>
                <option value="4">Head/neck</option>
              </Form.Control>
            </Form>
          </Col>
          <Col>
            <h4 style={{ marginBottom: "2.2rem" }}>Upload skin lesion image</h4>
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={true}
              maxFiles={1}
              //server="./api"

              //allowImageCrop={true}

              //allowFileTypeValidation={true}
              //accepted-file-types={['image/png', 'image/jpeg']}
              //labelFileTypeNotAllowed='File of invalid type'

              allowReorder={true}
              allowImageResize={true}
              imageResizeTargetWidth={256}
              imageResizeTargetHeight={256}
              imageResizeUpscale={true}
              imageResizeMode={"cover"}
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
              name="files" /* sets the file input name, it's filepond by default */
              labelIdle='<span class="filepond--label-action">Select</span> your skin lesion image <br /> or drop it here!'
              //labelIdle= {iconImage()}
              credits={false}
              //labelIdle= '<svg class="w-10 h-10 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>'
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Button
            onClick={handlePredict}
            style={{ fontFamily: "'Comfortaa', cursive" }}
          >
            Predict
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default App;
