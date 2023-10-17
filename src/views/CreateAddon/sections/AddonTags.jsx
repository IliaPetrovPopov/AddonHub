import { XMarkIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import { MIN_TAGS } from "../../../common/constants";
import { useEffect, useState } from "react";
import { getTagsLive } from "../../../services/addon.service";

const AddonTags = ({ tag, tags, setTag, handleTagAdd, handleTagDelete }) => {
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      return await getTagsLive((result) => {
        if (result) {
          const fetchedTags = Object.keys(result);
          const filteredTags = fetchedTags.filter((t) =>
            t.toLowerCase().includes(tag.toLowerCase())
          );
          setSuggestedTags(filteredTags);
        }
      });
    };
    if (tag) {
      fetchTags();
      setShowSuggestions(true);
    } else {
      setSuggestedTags([]);
      setShowSuggestions(false);
    }
  }, [tag]);

  return (
    <div className="space-y-2 md:space-y-4">
      <h5 className="font-semibold opacity-85 md:text-md">
        <i className="bi bi-pencil-square"></i>
        <span className="info-wrapper">
          {" "}
          Addon tags
          <span className="text-error"> * </span>
          <span
            className="tooltip tooltip-right tooltip-info"
            data-tip="Must have at least 1 tag to make the addon easier for searching"
          >
            <i className="bi bi-info-circle icon-on-section"></i>
          </span>
        </span>
      </h5>
      <div>
        <div className="join w-full">
          <input
            className="input input-bordered input-sm md:input-md join-item"
            onChange={(e) => setTag(e.target.value)}
            placeholder="Type here..."
            value={tag}
          />
          <button
            className="btn join-item btn-sm md:btn-md rounded-r-full bg-accent"
            onClick={handleTagAdd}
          >
            Add Tag
          </button>
        </div>{" "}
        {showSuggestions && (
          <ul className="menu menu-dropdown border-2 border-base-300 rounded-xl shadow-xl w-[10rem]">
            {suggestedTags.map((tag) => (
              <li key={tag} value={tag} onClick={() => setTag(tag)}>
                {tag}
              </li>
            ))}
          </ul>
        )}
        {tags?.length >= MIN_TAGS && (
          <div>
            {" "}
            <table className="table w-full added-tags-section">
              <thead>
                <tr>
                  <th>Added Tags:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {tags.map((tag, index) => (
                    <td
                      key={index}
                      className="py-1 px-1 text-xs md:text-sm mr-2 mb-1 bg-base-300 border shadow border-primary rounded-box indicator cursor-pointer"
                    >
                      <button
                        type="button"
                        className="indicator-item w-4 h-4 border border-red-500 bg-red-400 rounded-full flex justify-center items-center absolute top-1 right-1 hover:bg-white transition-colors"
                        onClick={() => handleTagDelete(index)}
                      >
                        <XMarkIcon className="w-3 h-3 fill-white hover:fill-red-400 transition-colors" />
                      </button>
                      <span className="p-2">{tag}</span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

AddonTags.propTypes = {
  tag: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  setTag: PropTypes.func.isRequired,
  handleTagAdd: PropTypes.func.isRequired,
  handleTagDelete: PropTypes.func.isRequired,
};

export default AddonTags;
