//import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import React, {useRef} from 'react'
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";


function App() {

  const upload = (file)=>{
    var file = file.target.files[0];

    const target = { Bucket:"htmlformat", Key:'tmp/' + file.name, Body:file};
    const creds = {accessKeyId: "AKIA5I7IZWJMZMBYJEVF", secretAccessKey: "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"};
    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({region:"us-west-1", credentials:creds}),
        leavePartsOnError: false,
        params: target,
      });

      parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
      });
    
      parallelUploads3.done();
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
            MLA Formatter Site
        </h1>
      </header>
      <body className="App-body">
      <p>
      (Sources must be formatted manually!)
        </p>
        <p>
        Select a .docx file:
        </p>
        <Button variant="contained" component="label">
          <input type='file' id='fileInput' onChange={upload}></input>
        </Button>
        <br></br>
        <p>
        <Button variant="contained">Convert to MLA</Button>
        </p>
        <p>
        <CircularProgress />
        </p>
        <p>
        <Button variant="contained">Download Converted File</Button>
        </p>
      </body>
    </div>
  );
}

export default App

