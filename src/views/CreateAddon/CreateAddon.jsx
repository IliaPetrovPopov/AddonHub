import { useContext, useState } from "react";
import "./CreateAddon.css";
import { createPendingAddon } from "../../services/addon.service";
import AuthContext from "../../context/AuthContext";
import BasicInformation from "./sections/BasicInformation";
import Origin from "./sections/Origin";
import Description from "./sections/Description";
import TargetIDE from "./sections/TargetIDE";
import AddonTags from "./sections/AddonTags";
import FileUpload from "./sections/FileUpload";
import Price from "./sections/Price";
import Logo from "./sections/Logo";
import CheckList from "./checklist/CreateAddon/CheckList";
import {
  isFileExtensionValid,
  isFileSizeValid,
  setFile,
} from "../../common/helperFunctions/addon/addon.validations";
import Header from "../../components/FormFields/Header";
import { useNavigate } from "react-router-dom";

export const CreateAddon = () => {
  const { userData } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [image, setImage] = useState([]);
  const [rejectedImages, setRejectedImages] = useState([]);
  const [isToastOn, setToastOn] = useState(false);
  const navigate = useNavigate();
  
  const handleToggleToast = () => {
    setToastOn(!isToastOn);
  };

  const [form, setForm] = useState({
    name: "",
    description: "",
    gitHubLink: "",
    targetIDE: "",
    price: "",
    file: {},
    license: "",
  });

  const handleChange = (prop) => (e) => {
    if (prop === "price") {
      setForm({
        ...form,
        [prop]: e,
      });
    } else {
      setForm({
        ...form,
        [prop]: e.target.value,
      });
    }
  };

  const handleTagAdd = () => {
    if (!tag) {
      throw new Error("Please type in tag name to add it successfully!");
    }

    setTags([...tags, tag]);
    setTag("");
  };

  const handleTagDelete = (index) => {
    const tagsCopy = [...tags];

    const firstSlice = tagsCopy.slice(0, index);
    const secondSlice = tagsCopy.slice(index + 1);
    const updatedTags = [...firstSlice, ...secondSlice];

    setTags(updatedTags);
  };

  const handleFileUpload = async (e) => {
    const uploadedFile = await e.target?.files[0];

    const validSize = isFileSizeValid(uploadedFile);

    if (validSize) {
      const fileExtension = isFileExtensionValid(uploadedFile);

      fileExtension === true ? setFile(uploadedFile, setForm, form) : "";
    }
  };

  const handleUpload = async () => {
    const result = await createPendingAddon(
      form.name,
      form.description,
      form.gitHubLink,
      form.targetIDE,
      tags,
      form.license,
      userData.username,
      form.price,
      form.file,
      image[0]
    );

    if(result !== false) {
      navigate("/");
    }
  };

  return (
    <div className="px-3 mt-4 md:mt-8 md:px-10">
      <div className="card bg-base-200 p-4 md:px-10 shadow-xl rounded-xl max-w-3xl mr-auto ml-auto space-y-2 md:space-y-4">
        <Header
          heading={"Upload addon"}
          paragraph={"Verify the info with the checklist down there"}
        />
        <div className="divider" />

    {console.log(userData)}
        <h5 className="font-semibold opacity-85">
          <i className="bi bi-pencil-square"></i>
          <span className="info-wrapper">
            {" "}
            General information <span className="text-error"> * </span>
          </span>
        </h5>
        <div className="grid md:grid-cols-2 gap-3">
          <BasicInformation handleChange={handleChange} />

          <Origin handleChange={handleChange} />

          <Description handleChange={handleChange} />
        </div>
        <div className="divider" />

        <div className="grid md:grid-cols-2 gap-3 ">
          <TargetIDE form={form} handleChange={handleChange} />
          <Price form={form} handleChange={handleChange} />
        </div>
        <div className="divider" />

        <AddonTags
          tag={tag}
          tags={tags}
          setTag={setTag}
          handleTagAdd={handleTagAdd}
          handleTagDelete={handleTagDelete}
        />
        <div className="divider" />

        <FileUpload form={form} handleFileUpload={handleFileUpload} />

        <div className="divider" />

        <Logo
          image={image}
          setImage={setImage}
          rejectedImages={rejectedImages}
          setRejectedImages={setRejectedImages}
        />

        <div className="divider" />
        <label
          className="btn btn-outline btn-info flex justify-center"
          onClick={handleUpload}
        >
          Upload addon for admin review
        </label>

        <CheckList
          isToastOn={isToastOn}
          handleToggleToast={handleToggleToast}
          name={form.name}
          origin={form.gitHubLink}
          description={form.description}
          targetIDE={form.targetIDE}
          tags={tags}
          file={form.file}
        />
      </div>
    </div>
  );
};
