import { useNavigate, useParams } from "react-router-dom";
import BasicInformation from "../CreateAddon/sections/BasicInformation";
import Description from "../CreateAddon/sections/Description";
import { useEffect, useState } from "react";
import TargetIDE from "../CreateAddon/sections/TargetIDE";
import AddonTags from "../CreateAddon/sections/AddonTags";
import Price from "../CreateAddon/sections/Price";
import Logo from "../CreateAddon/sections/Logo";
import CheckList from "../CreateAddon/checklist/Edit/CheckList";
import {
  getAddonById,
  modifyAddon,
} from "../../services/addon.service";
import Header from "../../components/FormFields/Header";

const Edit = () => {
  const { uid } = useParams();

  const [enteredValues, setEnteredValues] = useState({});
  const [newTags, setNewTags] = useState([]);
  const [tag, setTag] = useState("");
  const [nameOfAddon, setNameOfAddon] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTargetIDE, setNewTargetIDE] = useState("");
  const [image, setImage] = useState([]);
  const [rejectedImages, setRejectedImages] = useState([]);
  const [isToastOn, setToastOn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const result = await getAddonById(uid);
        setEnteredValues({ ...result });
        setNewTags([...result.tags]);
        setNameOfAddon(result.name);
        setNewDescription(result.description);
        setNewTargetIDE(result.targetIDE);
      } catch (error) {
        throw new Error(error.message);
      }
    })();
  }, [uid]);

  const handleToggleToast = () => {
    setToastOn(!isToastOn);
  };

  const [form, setForm] = useState({
    name: "",
    description: "",
    targetIDE: "",
    price: "",
    license: "",
  });

  const handleChange = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const handleTagAdd = () => {
    if (!tag) {
      throw new Error("Please type in tag name to add it succesfully!");
    }

    setNewTags([...newTags, tag]);
    setTag("");
  };

  const handleTagDelete = (index) => {
    const tagsCopy = [...newTags];
    const firstSlice = tagsCopy.slice(0, index);
    const secondSlice = tagsCopy.slice(index + 1);
    const updatedTags = [...firstSlice, ...secondSlice];

    setNewTags(updatedTags);
  };

  const handleUpload = async () => {
    await modifyAddon(
      nameOfAddon,
      form.name,
      form.description,
      form.targetIDE,
      newTags,
      form.price,
      image[0],
      uid
    );

    navigate("/");
  };

  return (
    <div className="px-3 mt-4 md:mt-8 md:px-10">
      <div className="card bg-base-200  p-4  md:px-10 shadow-xl rounded-xl max-w-4xl mr-auto ml-auto space-y-2 md:space-y-4">
        <Header
          heading={"Update addon details"}
          paragraph={"Feel free to change anything you want"}
        />
        <div className="divider" />
        <h4 className="font-bold opacity-85">
          <i className="bi bi-pencil-square"></i>
          <span className="info-wrapper">
            {" "}
            General information <span className="text-error"> * </span>
          </span>
        </h4>{" "}
        <div className="grid gap-3">
          <BasicInformation
            handleChange={handleChange}
            placeholder={enteredValues.name}
          />

          <Description
            handleChange={handleChange}
            placeholder={enteredValues.description}
          />
        </div>
        <div className="divider" />
        <div className="grid md:grid-cols-2 gap-3">
          <TargetIDE form={form} handleChange={handleChange} />
          <Price form={form} handleChange={handleChange} />
        </div>
        <div className="divider" />
        <AddonTags
          tag={tag}
          tags={newTags}
          setTag={setTag}
          handleTagAdd={handleTagAdd}
          handleTagDelete={handleTagDelete}
        />
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
          Update addon info
        </label>
        <CheckList
          isToastOn={isToastOn}
          handleToggleToast={handleToggleToast}
          name={form.name === "" ? nameOfAddon : form.name}
          tags={newTags}
          description={
            form.description === "" ? newDescription : form.description
          }
          targetIDE={form.targetIDE === "" ? newTargetIDE : form.targetIDE}
        />
      </div>
    </div>
  );
};

export default Edit;
