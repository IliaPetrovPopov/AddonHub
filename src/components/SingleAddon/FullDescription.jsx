import { useEffect, useState } from "react";
import { fetchReadMe } from "../../services/github.service";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import emoji from "remark-emoji";
import remarkHtml from "remark-html";
import PropTypes from "prop-types";

import "katex/dist/katex.min.css";

const FullDescription = ({ pathUrl }) => {
  const path = pathUrl.replace("https://github.com/", "");
  const [fullDescription, setFullDescription] = useState("");

  const renderImage = ({ src }) => {
    return (
      <img
        className="inline-block py-2"
        src={
          src.startsWith("http")
            ? src
            : `https://github.com/${path}/raw/master/${src}`
        }
      />
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const readMe = await fetchReadMe(path);
      setFullDescription(readMe);
    };
    fetchData();
  }, [path]);

  return (
    <ReactMarkdown
      className="pr-4"
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm, emoji, remarkHtml]}
      components={{
        img: renderImage,
      }}
    >
      {fullDescription}
    </ReactMarkdown>
  );
};

FullDescription.propTypes = {
  pathUrl: PropTypes.string,
};

export default FullDescription;
