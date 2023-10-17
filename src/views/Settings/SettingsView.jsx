import { useContext, useState } from "react";
import Header from "../../components/FormFields/Header";
import AccountDetails from "../../components/UserDetails/AccountDetails";
import PersonalDetails from "../../components/UserDetails/PersonalDetails";
import SaveButton from "../../components/UserDetails/SaveButton";
import SkipButton from "../../components/UserDetails/SkipButton";
import { changeUserData } from "../../services/users.service";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router";
import ProfilePicUpload from "../../components/ProfilePic/ProfilePicUpload";
import {
  emailValidAndNotTaken,
  phoneValidAndNotTaken,
} from "../../common/helperFunctions/userValidations";
import { toast } from "react-toastify";
import { updateEmail, updatePassword } from "@firebase/auth";
import { auth } from "../../config/firebase-config";
import OtherDetails from "../../components/UserDetails/SocialDetails";
import DeleteAccountButton from "../../components/UserDetails/DeleteAccountButtons";

const SettingsView = () => {
  const { userData } = useContext(AuthContext);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();

  // const photoUrl = userData && userData.photoUrl ? userData.photoUrl : "";
  const [newPhoto, setNewPhoto] = useState(userData?.photoUrl || "");

  const handleSavePhotoUrl = (url) => {
    setNewPhoto(url);
  };

  const handleEdit = (fieldId, value) => {
    setEditedData((prevData) => ({ ...prevData, [fieldId]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      if ("email" in editedData) {
        await emailValidAndNotTaken(editedData.email, userData.email);
        await updateEmail(auth.currentUser, editedData.email);
      } else if ("phone" in editedData) {
        await phoneValidAndNotTaken(editedData.phone, userData.phone);
      } else if ("password" in editedData) {
        await updatePassword(auth.currentUser, editedData.password);
      }
      const updatedEditedData = { ...editedData };

      if (newPhoto !== "") {
        updatedEditedData.photoUrl = newPhoto;
      }

      await changeUserData(userData.username, updatedEditedData);
      navigate(-2);
    } catch (error) {
      toast.error(error.message);
    }
  };


    return (
      <div className="px-3 mt-4 md:mt-8 md:px-10">
        <div className="card bg-base-200  p-4  md:p-10 shadow-xl rounded-xl max-w-3xl mr-auto ml-auto space-y-2 md:space-y-4">
          <Header
            heading={"Your details"}
            paragraph={"Feel free to change anything you want"}
          />
          <div className="divider" />
          <h4 className="font-bold opacity-85">Account details</h4>
          <AccountDetails onEdit={handleEdit} />
          <div className="divider" />
          <h4 className="font-bold opacity-85">Personal details</h4>
          <ProfilePicUpload
            userData={userData}
            onSavePhotoUrl={handleSavePhotoUrl}
          ></ProfilePicUpload>
          <PersonalDetails onEdit={handleEdit} />
          <div className="divider" />
          <h4 className="font-bold opacity-85">Other social profiles</h4>
          <OtherDetails onEdit={handleEdit} />
          <br />
          <div className="divider" />
          <span className="col-span-2 grid w-full">
            <DeleteAccountButton />
            <SkipButton />
            <SaveButton handleSubmit={handleSave} />
          </span>
        </div>{" "}
      </div>
    );
  
};

export default SettingsView;
