import PropTypes from "prop-types";
import { useState } from "react";

const PersonalInfoForm = ({ data, updateFormData, onPrev, onNext }) => {
  const [firstName, setFirstName] = useState(data?.firstName || "");
  const [lastName, setLastName] = useState(data?.lastName || "");
  const [address, setAddress] = useState(data?.address || "");

  const [isValidFirstName, setIsValidFirstName] = useState(true);
  const [isValidLastName, setIsValidLastName] = useState(true);
  const [isValidAddress, setIsValidAddress] = useState(true);

  const validateName = (name) => /^[A-Za-z]{2,50}$/.test(name);
  const validateAddress = (address) => address.length >= 10;

  const validateForm = () => {
    const isFirstNameValid = validateName(firstName);
    const isLastNameValid = validateName(lastName) || lastName === "";
    const isAddressValid = validateAddress(address);

    setIsValidFirstName(isFirstNameValid);
    setIsValidLastName(isLastNameValid);
    setIsValidAddress(isAddressValid);

    return isFirstNameValid && isLastNameValid && isAddressValid;
  };

  const handleSave = () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      updateFormData({ firstName, lastName, address });
      return true;
    }
    return false;
  };

  const handleSaveAndNext = () => {
    const isSaved = handleSave();
    if (isSaved) onNext();
  };

  return (
    <form>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          required
          title="Allow only alphabets. Minimum of 2 characters and maximum of 50."
          onChange={(e) => setFirstName(e.target.value)}
        />
        {!isValidFirstName && <p style={{ color: "red" }}>Invalid first name</p>}
      </div>

      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          title="Allow only alphabets."
          onChange={(e) => setLastName(e.target.value)}
        />
        {!isValidLastName && <p style={{ color: "red" }}>Invalid last name</p>}
      </div>

      <div>
        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          value={address}
          required
          minLength={10}
          onChange={(e) => setAddress(e.target.value)}
        />
        {!isValidAddress && (
          <p style={{ color: "red" }}>Address must be at least 10 characters long</p>
        )}
      </div>

      <button type="button" onClick={onPrev}>
        Previous
      </button>
      <button type="button" onClick={handleSave}>
        Save
      </button>
      <button type="button" onClick={handleSaveAndNext}>
        Save & Next
      </button>
    </form>
  );
};

PersonalInfoForm.propTypes = {
  data: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
  }),
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
  updateFormData: PropTypes.func,
};

export default PersonalInfoForm;
