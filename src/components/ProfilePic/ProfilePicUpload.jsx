import { useState } from "react";
import ProfilePic from "./ProfilePic";
import { storage } from "../../config/firebase-config";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { toast } from "react-toastify";
import { fetchPhotoUrl } from "../../services/users.service";
import PropTypes from "prop-types";
import { MAX_PROFILE_PIC_SIZE } from "../../common/constants";

// eslint-disable-next-line no-unused-vars
const ProfilePicUpload = ({ userData, onSavePhotoUrl }) => {
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [url, setUrl] = useState("");
  const [picUploaded, setPicUploaded] = useState(false);

  const handleChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile.size > MAX_PROFILE_PIC_SIZE) {
      toast.warn("Image is too large");
      return;
    }

    setFile(newFile);
    setPicUploaded(true);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.warn("Please upload an image first");
      cancelUpload();
    }
    setPicUploaded(false);

    const storageRef = ref(
      storage,
      `users/${userData.username}/profile-pic/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },
      (err) => console.error(err),
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setUrl(url);
          onSavePhotoUrl(url);
        } catch (e) {
          console.error(e);
        }
      }
    );
  };

  const cancelUpload = async () => {
    const oldUrl = await fetchPhotoUrl(userData.username);
    setUrl(oldUrl);
    setFile("");
  };

  return (
    <div className="grid grid-cols-4 gap-4 items-center">
      {userData && <ProfilePic username={userData.username} url={url} />}
      {!file && (
        <input
          type="file"
          className="col-span-3 md:col-span-2 mt-auto mb-auto file-input md:file-input-md file-input-sm"
          onChange={handleChange}
        />
      )}
      {file && picUploaded && (
        <>
          <button className="btn btn-accent btn-sm md:btn-md" onClick={handleUpload}>
            Upload
          </button>
        </>
      )}
      {file && !picUploaded && (
        <div className="col-span-3 space-x-5">
          <div
            className="col-span-2 radial-progress text-success shadow-lg"
            style={{ "--value": percent }}
          >
            {percent}%
          </div>
          <button className="col-start-4 btn btn-neutral btn-sm md:btn-md" onClick={cancelUpload}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePicUpload;

ProfilePicUpload.propTypes = {
  userData: PropTypes.object,
  onSavePhotoUrl: PropTypes.func,
};
