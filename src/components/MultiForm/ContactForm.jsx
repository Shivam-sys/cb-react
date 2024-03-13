import PropTypes from "prop-types";
import { useState } from "react";

const ContactForm = ({ data, updateFormData, onPrev }) => {
  const [countryCode, setCountryCode] = useState(data?.countryCode || "");
  const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber || "");
  const [acceptTnC, setAcceptTnC] = useState(data?.acceptTnC || false);

  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isCountryCodeSelected, setIsCountryCodeSelected] = useState(true);
  const [isTnCAccepted, setIsTnCAccepted] = useState(true);

  const validatePhoneNumber = (number) => /^\d{10}$/.test(number);

  const validateForm = () => {
    const isPhoneNumberValid = validatePhoneNumber(phoneNumber);
    const isCountryCodeValid = countryCode !== "";
    const isTnCValid = acceptTnC;

    setIsValidPhoneNumber(isPhoneNumberValid);
    setIsCountryCodeSelected(isCountryCodeValid);
    setIsTnCAccepted(isTnCValid);

    return isPhoneNumberValid && isCountryCodeValid && isTnCValid;
  };

  const handleSave = () => {
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
          <label htmlFor="countryCode">Country Code:</label>
          <select
            id="countryCode"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            required
          >
            <option value="">Select Country Code</option>
            <option value="+91">India (+91)</option>
            <option value="+1">America (+1)</option>
          </select>
          {!isCountryCodeSelected && <p style={{ color: "red" }}> Please select country code</p>}
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            title="Allow only 10-digit numeric phone number."
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {!isValidPhoneNumber && (
            <p style={{ color: "red" }}>
              Invalid phone number. Please enter a 10-digit numeric value
            </p>
          )}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptTnC}
              onChange={() => setAcceptTnC(!acceptTnC)}
              required
            />
            Accept Terms and Conditions
          </label>
          {!isTnCAccepted && <p style={{ color: "red" }}>Please accept terms and conditions.</p>}
        </div>
      </form>
      <button type="button" onClick={onPrev}>
        Previous
      </button>
      <button type="button" onClick={handleSave}>
        Save
      </button>
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
