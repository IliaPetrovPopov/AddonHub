import PropTypes from "prop-types";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../config/firebase-config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addonErrorMessages } from "../../common/error.messages";
import { downloadAddon } from "../../services/addon.service";

const DownloadButton = ({ uid, name, username }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const folderRef = ref(storage, `addons/${name}/file`);
        const result = await listAll(folderRef);
        if (result.items.length > 0) {
          const url = await getDownloadURL(result.items[0]);
          setUrl(url);
        } else {
          throw new Error();
        }
        // eslint-disable-next-line no-empty
      } catch (e) {}
    };
    fetchFile();
  }, [name]);

  const handleDownload = async () => {
    try {
      await downloadAddon(uid, username);
    } catch (e) {
      console.error(e);
      toast.error(addonErrorMessages.downloadError);
    }
  };

  return (
    <a href={url} download onClick={handleDownload}>
      <button className="btn btn-success px-3 m-auto w-fit btn-sm text-sm">
        <ArrowDownCircleIcon className="md:mr-1 w-5 h-5" />
        <span className="hidden md:block">Download</span>
      </button>
    </a>
  );
};

DownloadButton.propTypes = {
  name: PropTypes.string,
  uid: PropTypes.string,
  username: PropTypes.string,
};

export default DownloadButton;
