import MultiForm from "../components/MultiForm";
import ContactForm from "../components/MultiForm/ContactForm";
import CredentialsForm from "../components/MultiForm/CredentialsForm";
import PersonalInfoForm from "../components/MultiForm/PersonalInfoForm";

const Home = () => {
  return (
    <MultiForm>
      <CredentialsForm title="Credentials" />
      <PersonalInfoForm title="Personal Details" />
      <ContactForm title="Contact Details" />
    </MultiForm>
  );
};

export default Home;
