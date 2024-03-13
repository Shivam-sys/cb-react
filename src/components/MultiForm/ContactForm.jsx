import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { tailwindClasses } from "../../constants";
import MyButton from "../MyButton";

const ContactForm = ({ data, updateFormData, onPrev }) => {
  const [countryCode, setCountryCode] = useState(data?.countryCode || "");
  const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber || "");
  const [acceptTnC, setAcceptTnC] = useState(data?.acceptTnC || false);

  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isCountryCodeSelected, setIsCountryCodeSelected] = useState(true);
  const [isTnCAccepted, setIsTnCAccepted] = useState(true);

  const [touchedFields, setTouchedFields] = useState({
    countryCode: false,
    phoneNumber: false,
    acceptTnC: false,
  });

  const handleFieldBlur = (field) => {
    setTouchedFields((prevTouched) => ({ ...prevTouched, [field]: true }));
  };

  const validatePhoneNumber = useCallback(() => /^\d{10}$/.test(phoneNumber), [phoneNumber]);

  const validateForm = () => {
    const isPhoneNumberValid = validatePhoneNumber(phoneNumber);
    const isCountryCodeValid = countryCode !== "";
    const isTnCValid = acceptTnC;

    setIsValidPhoneNumber(isPhoneNumberValid);
    setIsCountryCodeSelected(isCountryCodeValid);
    setIsTnCAccepted(isTnCValid);

    return isPhoneNumberValid && isCountryCodeValid && isTnCValid;
  };

  useEffect(() => {
    setIsValidPhoneNumber(validatePhoneNumber());
    setIsCountryCodeSelected(countryCode !== "");
    setIsTnCAccepted(acceptTnC);
  }, [validatePhoneNumber, countryCode, acceptTnC]);

  const handleSave = () => {
    setTouchedFields({ countryCode: true, phoneNumber: true, acceptTnC: true });
    const isFormValid = validateForm();
    if (isFormValid) {
      updateFormData({ countryCode, phoneNumber, acceptTnC });
      return true;
    }
    return false;
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="countryCode" className={tailwindClasses.inputLabel}>
            Country Code
          </label>
          <select
            id="countryCode"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            required
            onBlur={() => handleFieldBlur("countryCode")}
          >
            <option value="">Select Country Code</option>
            <option value="+91">India (+91)</option>
            <option value="+1">America (+1)</option>
          </select>
          {touchedFields.countryCode && !isCountryCodeSelected && (
            <p className="text-red-700"> Please select country code</p>
          )}
        </div>
        <div>
          <label htmlFor="phoneNumber" className={tailwindClasses.inputLabel}>
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            className={tailwindClasses.inputBox}
            value={phoneNumber}
            title="Allow only 10-digit numeric phone number."
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
            onBlur={() => handleFieldBlur("phoneNumber")}
          />
          {touchedFields.phoneNumber && !isValidPhoneNumber && (
            <p className="text-red-700">
              Invalid phone number. Please enter a 10-digit numeric value
            </p>
          )}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptTnC}
              required
              onChange={() => setAcceptTnC(!acceptTnC)}
              onBlur={() => handleFieldBlur("acceptTnC")}
            />
            Accept Terms and Conditions
          </label>
          {touchedFields.acceptTnC && !isTnCAccepted && (
            <p className="text-red-700">Please accept terms and conditions.</p>
          )}
        </div>
      </form>

      {onPrev && <MyButton onClick={onPrev} title={"Prev"} />}

      {handleSave && <MyButton onClick={handleSave} title={"Submit"} />}
    </>
  );
};

ContactForm.propTypes = {
  data: PropTypes.shape({
    countryCode: PropTypes.string,
    phoneNumber: PropTypes.string,
    acceptTnC: PropTypes.bool,
  }),
  onPrev: PropTypes.func,
  updateFormData: PropTypes.func,
  onNext: PropTypes.func,
};

export default ContactForm;
