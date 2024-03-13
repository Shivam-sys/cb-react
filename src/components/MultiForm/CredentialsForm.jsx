import PropTypes from "prop-types";
import { useState } from "react";

const CredentialsForm = ({ data, updateFormData, onPrev, onNext }) => {
  const [email, setEmail] = useState(data?.email || "");
  const [password, setPassword] = useState(data?.password || "");

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  // email regex
  const validateEmail = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // regex for given password validation
  const validatePassword = () =>
    /^(?=(.*[A-Z]){2})(?=(.*[a-z]){2})(?=(.*\d){2})(?=(.*[\W_]){2})[A-Za-z\d\W_]{8,}$/.test(
      password,
    );

  const validateForm = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    setIsValidEmail(isEmailValid);
    setIsValidPassword(isPasswordValid);

    return isEmailValid && isPasswordValid;
  };

  const handleSave = () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      updateFormData({ email, password });
      return true;
    }
    return false;
  };

  const handleSaveAndNext = () => {
    const saved = handleSave();
    if (saved) {
      onNext();
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="email"
          autoFocus
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isValidEmail && <p style={{ color: "red" }}>Invalid email address</p>}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isValidPassword && (
          <p style={{ color: "red" }}>
            Password must contain 2 capital letters, 2 small letters, 2 numbers, and 2 special
            characters.
          </p>
        )}
      </div>

      <button type="button" onClick={onPrev} />

      <button type="button" onClick={handleSave}>
        Save
      </button>
      <button type="button" onClick={handleSaveAndNext}>
        Save & Next
      </button>
    </form>
  );
};

CredentialsForm.propTypes = {
  data: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  onPrev: PropTypes.func,
  updateFormData: PropTypes.func,
  onNext: PropTypes.func,
};

export default CredentialsForm;
