import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileuploadJd = ({ handleFileClose, files, setFiles, fileupload }) => {
  const [rejected, setrejected] = useState([]);

  const handleClose = () => {
    handleFileClose();
  };

  const handleupload = () => {
    fileupload();
    handleFileClose();
  };

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles) => [
          //   ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
      }

      console.log(rejectedFiles);
      if (rejectedFiles?.length) {
        setrejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
      }

      console.log(rejected, "use state");
    },
    [setFiles, rejected]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": ".pdf",
    },
    // max size 1mb
    maxSize: 1024 * 1000,
  });

  const handleDeleteFile = (name) => {
    setFiles((previousFiles) =>
      previousFiles.filter((file) => file.name !== name)
    );
  };

  const removeRejected = (name) => {
    setrejected((previousFiles) =>
      previousFiles.filter((file) => file.file.name !== name)
    );
  };

  return (
    <div className="ms-2  me-2  border  px-1 py-1  ">
      <div className="d-flex justify-content-between align-items-center ">
        <h3 className="modal-title fs-5 ms-1  " id="exampleModalLabel">
          Create a new JD
        </h3>
        <button
          type="button"
          className="btn-close"
          onClick={handleClose}
          aria-label="Close"
        ></button>
      </div>

      <div class="mb-3 mx-1 mt-2 ">
        <label for="exampleFormControlInput1" class="form-label">
          Enter a JD title
        </label>
        <input
          type="text"
          class="form-control bg-body-secondary "
          id="exampleFormControlInput1"
          placeholder=""
        />
      </div>

      <div className="ms-1 mt-2 ">
        <p> Drag and drop your Exsisting JD Pdf files here</p>
      </div>
      <div
        className=" text-center pt-4    my-2 bg-body-tertiary mx-1 text-muted   "
        style={{ height: "75px", borderStyle: "dashed", borderColor: "gray" }}
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      </div>

      {/* preview */}
      <div>
        {files?.length > 0 && (
          <>
            <h6 className="ms-1  text-muted  ">Accepted files:</h6>
            <div className="d-flex justify-content-center align-items-center flex-wrap">
              {files?.length ? (
                files.map((file, index) => (
                  <div className="m-2 position-relative" key={index}>
                    {/* <img
                      src={file.preview}
                      alt="No Preview"
                      style={{ width: "100px", height: "100px" }}
                    /> */}
                    <button
                      className="btn btn-danger  btn-sm position-absolute rounded-circle"
                      style={{ right: "-30px", top: "-8px", fontSize: "" }}
                      onClick={() => handleDeleteFile(file.name)}
                    >
                      X
                    </button>
                    <div className="text-muted font-6">{file.name}</div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted  ">No files uploaded</p>
              )}
            </div>
          </>
        )}

        {rejected?.length > 0 && (
          <>
            {" "}
            <h6 className="ms-1  text-muted mt-2   ">Rejected files:</h6>
            <div className="mt-2 d-flex  flex-column">
              {rejected?.length ? (
                rejected.map((file) => (
                  <div
                    className="d-flex justify-content-between align-items-start border mb-1 px-1   "
                    key={file.name}
                  >
                    <div className="">
                      <p className=" text-muted ">{file.file.name}</p>
                      <ul className="font-6 text-secondary list-unstyled py-0 px-0   ">
                        {file.errors.map((error) => (
                          <li key={error.code}>{error.message}</li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      className="mt-1 btn btn-secondary  btn-sm"
                      onClick={() => removeRejected(file.file.name)}
                    >
                      remove
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted ">No Rejected Files</p>
              )}
            </div>
          </>
        )}
      </div>

      <div>
        {/* big text Or center  */}
        <div className="d-flex justify-content-center align-items-center mt-2">
          <p className="text-muted font-1">Or</p>
        </div>
      </div>

      <div>
        {/* text area to paste jd text */}

        <div class="mb-3 ms-1 ">
          <label for="exampleFormControlTextarea1" class="form-label">
            Paste your Exsisting JD Text here
          </label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
      </div>

      <div className="d-flex justify-content-end align-items-center mb-1 mt-2   ">
        <button
          type="button"
          className="text-white border-0 px-2 py-1 rounded   pill-bg-color  font-5"
          onClick={handleupload}
        >
          Submit{" "}
        </button>
      </div>
    </div>
  );
};

export default FileuploadJd;
