import aboutUs from "../../common/aboutUs";
import AboutUsCard from "../../components/AboutUsCard/AboutUsCard";
import Header from "../../components/FormFields/Header";

const AboutUsView = () => {
  const authors = aboutUs;
  const authorNames = Object.keys(authors);

  return (
    <div className="container h-full  max-w-full">
      <Header
        heading="Meet the team behind AddonHub"
        paragraph="More than just Telerik Academy graduates"
      />
      <div className="md:flex md:flex-cols-3 justify-around px-5 md:px-10 space-y-5 md:space-y-0 md:gap-10 mt-7 md:mt-20">
        {authorNames.map((a) => (
          <AboutUsCard key={a} author={authors[a]} />
        ))}
      </div>
    </div>
  );
};
export default AboutUsView;
