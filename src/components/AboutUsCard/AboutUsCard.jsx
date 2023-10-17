import Logo from "../SingleAddon/Logo";
import PropTypes from "prop-types";

const AboutUsCard = ({ author }) => {
  return (
    <div className="bg-primary-focus w-full md:w-[28rem] h-[25rem] md:h-[24rem] shadow-2xl rounded-2xl bg-base-300 py-4 ">
      <div className="h-[11rem] justify-center">
        <span className="flex flex-cols-2 space-x-1 px-4 py-1 text-xl">
          <Logo url={author.photoUrl} />
          <div className="p-1 md:px-2 text-sm md:text-lg ">
            <h5 className="text-xl md:text-2xl font-extrabold  ">
              {author.name}
            </h5>
            <h6 className="font-light ">{author.location}</h6>
            <a className="font-light" href={`mailto:${author.email}`}>
              {author.email}
            </a>
            <div className="mt-1">
              <a href={author.linkedin}>
                <i className="bi bi-linkedin "></i>
              </a>
              <a href={author.gitlab}>
                <i className="bi bi-git p-2"></i>
              </a>
            </div>
          </div>
        </span>
        <p className="text-md text-center mt-3 md:mt-5 px-6">{author.bio}</p>
      </div>
    </div>
  );
};

AboutUsCard.propTypes = {
  author: PropTypes.object,
};

export default AboutUsCard;
