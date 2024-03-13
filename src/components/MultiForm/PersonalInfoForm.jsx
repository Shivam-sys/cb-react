import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import MyButton from "../MyButton";
import { tailwindClasses } from "../../constants";

const PersonalInfoForm = ({ data, updateFormData, onPrev, onNext }) => {
  const [firstName, setFirstName] = useState(data?.firstName || "");
  const [lastName, setLastName] = useState(data?.lastName || "");
  const [address, setAddress] = useState(data?.address || "");

  const [isValidFirstName, setIsValidFirstName] = useState(true);
  const [isValidLastName, setIsValidLastName] = useState(true);
  const [isValidAddress, setIsValidAddress] = useState(true);

  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    address: false,
  });

  const handleFieldBlur = (field) => {
    setTouchedFields((prevTouched) => ({ ...prevTouched, [field]: true }));
  };

  const validateName = useCallback((name) => /^[A-Za-z]{2,50}$/.test(name), []);
  const validateAddress = useCallback(() => address.length >= 10, [address]);

  const validateForm = () => {
    const isFirstNameValid = validateName(firstName);
    const isLastNameValid = validateName(lastName) || lastName === "";
    const isAddressValid = validateAddress();

    setIsValidFirstName(isFirstNameValid);
    setIsValidLastName(isLastNameValid);
    setIsValidAddress(isAddressValid);

    return isFirstNameValid && isLastNameValid && isAddressValid;
  };

  useEffect(() => {
    setIsValidFirstName(validateName(firstName));
    setIsValidLastName(!lastName || validateName(lastName));
    setIsValidAddress(validateAddress());
  }, [firstName, lastName, address, validateName, validateAddress]);

  const handleSave = () => {
    //on save set the fields which are required as touched.
    setTouchedFields({ firstName: true, address: true });
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
        <label htmlFor="firstName" className={tailwindClasses.inputLabel}>
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          className={tailwindClasses.inputBox}
          value={firstName}
          required
          title="Allow only alphabets. Minimum of 2 characters and maximum of 50."
          onChange={(e) => setFirstName(e.target.value)}
          onBlur={() => handleFieldBlur("firstName")}
        />
        {touchedFields.firstName && !isValidFirstName && (
          <p className="text-red-700">Invalid first name</p>
        )}
      </div>

      <div>
        <label htmlFor="lastName" className={tailwindClasses.inputLabel}>
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          className={tailwindClasses.inputBox}
          value={lastName}
          title="Allow only alphabets."
          onChange={(e) => setLastName(e.target.value)}
          onBlur={() => handleFieldBlur("lastName")}
        />
        {touchedFields.lastName && !isValidLastName && (
          <p className="text-red-700">Invalid last name</p>
        )}
      </div>

      <div>
        <label htmlFor="address" className={tailwindClasses.inputLabel}>
          Address
        </label>
        <textarea
          id="address"
          value={address}
          className={tailwindClasses.inputBox}
          required
          minLength={10}
          onChange={(e) => setAddress(e.target.value)}
          onBlur={() => handleFieldBlur("address")}
        />
        {touchedFields.address && !isValidAddress && (
          <p className="text-red-700">Address must be at least 10 characters long</p>
        )}
      </div>

      {onPrev && <MyButton onClick={onPrev} title={"Prev"} />}

      {handleSave && <MyButton onClick={handleSave} title={"Save"} />}

      {handleSaveAndNext && <MyButton onClick={handleSaveAndNext} title={"Save & Next"} />}
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
