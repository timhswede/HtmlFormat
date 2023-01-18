//import logo from './logo.svg';
import './App.css';
import React, {useRef} from 'react'
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";


function App() {

  const upload = (file)=>{
    var file = file.target.files[0];

    const target = { Bucket:"htmlformat", Key:file.name, Body:file};
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
            MLA Formatter
        </h1>
      </header>
      <body className="App-body">
      <p>
          Upload your paper here:
        </p>

        <input type='file' id='fileInput' onChange={upload}></input>
        <br></br>
        <button id='uploadButton'>Upload</button>
        {/* 1. add upload function
            2. read file from upload
            3. change format of file to MLA
            4. output MLA formatter file
        */ }
      </body>
    </div>
  );

}

export default App

