import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { XMarkIcon } from "@heroicons/react/24/solid";
import "./DropZone.css";
import PropTypes from "prop-types";
import { useEffect } from "react";

export const DropZone = ({
  className,
  files,
  setFiles,
  rejectedFiles,
  setRejectedFiles,
}) => {
  useEffect(() => {
    setFiles([]);
    setRejectedFiles([]);
  }, [setFiles, setRejectedFiles]);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);

      if (rejectedFiles?.length) {
        setRejectedFiles((previousFiles) => [
          ...previousFiles,
          ...rejectedFiles,
        ]);
      }
    },
    [setFiles, setRejectedFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024,
  });
  const dropZoneStyles = {
    marginTop: "0.4cm",
    marginBottom: "0.7cm",
    width: "160px",
    height: "160px",
    border: "2px dashed #ccc",
    borderRadius: "8px",
    padding: "28px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: isDragActive ? "#f7f7f7" : "white",
    outline: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3">
      <div
        {...getRootProps({
          className: className,
          style: dropZoneStyles,
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div>
            <p className="text-sm">
              <strong>Drop</strong> the file here...
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm">
              <strong>Drag and Drop</strong> file here, or{" "}
              <a className="link link-hover text-blue-500">click</a> to select
              file
            </p>
          </div>
        )}
      </div>

      {rejectedFiles?.length ? (
        <div>
          {rejectedFiles.map((reject, index) =>
            reject.errors.map((error) => (
              <div
                className="alert alert-error m-4 text-white w-30"
                key={index}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  {reject.file.name}: {error.message}
                </span>
              </div>
            ))
          )}
        </div>
      ) : (
        files.length > 0 && (
          <div className="indicator card card-compact w-full mr-2 bg-base-100 shadow-xl">
            <figure className="px-3 pt-2 md:px-10 md:pt-8">
              <div>
                <div className="avatar">
                  <div className="w-30 h-40  rounded-xl object-contain">
                    <img
                      src={files[0].preview}
                      alt="Uploaded picture by current user"
                      onLoad={() => URL.revokeObjectURL(files[0].preview)}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="indicator-item w-8 h-8 border border-red-500 bg-red-400 rounded-full flex justify-center items-center absolute top-2 right-2 hover:bg-white transition-colors"
                  onClick={() => setFiles([])}
                >
                  <XMarkIcon className={`w-6 h-6 fill-white`} />
                </button>
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2
                className="card-title typing-animation text-sm"
                style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)" }}
              >
                Currently selected Logo
              </h2>
            </div>
          </div>
        )
      )}
    </div>
  );
};

DropZone.propTypes = {
  className: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  setFiles: PropTypes.func.isRequired,
  rejectedFiles: PropTypes.array.isRequired,
  setRejectedFiles: PropTypes.func.isRequired,
};
