import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import MyButton from "../MyButton";
import { tailwindClasses } from "../../constants";

const CredentialsForm = ({ data, updateFormData, onPrev, onNext }) => {
  const [email, setEmail] = useState(data?.email || "");
  const [password, setPassword] = useState(data?.password || "");

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
  });

  const handleFieldBlur = (field) => {
    setTouchedFields((prevTouched) => ({ ...prevTouched, [field]: true }));
  };

  // email regex
  const validateEmail = useCallback(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);

  // regex for given password validation
  const validatePassword = useCallback(
    () =>
      /^(?=(.*[A-Z]){2})(?=(.*[a-z]){2})(?=(.*\d){2})(?=(.*[\W_]){2})[A-Za-z\d\W_]{8,}$/.test(
        password,
      ),
    [password],
  );

  const validateForm = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    setIsValidEmail(isEmailValid);
    setIsValidPassword(isPasswordValid);

    return isEmailValid && isPasswordValid;
  };

  useEffect(() => {
    setIsValidEmail(validateEmail());
    setIsValidPassword(validatePassword());
  }, [email, password, validateEmail, validatePassword]);

  const handleSave = () => {
    setTouchedFields({ email: true, password: true });
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
        <label htmlFor="email" className={tailwindClasses.inputLabel}>
          Email
        </label>
        <input
          type="email"
          id="email"
          className={tailwindClasses.inputBox}
          value={email}
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleFieldBlur("email")}
        />
        {touchedFields.email && !isValidEmail && (
          <p className="text-red-700">Invalid email address</p>
        )}

        <label htmlFor="password" className="text-md mb-2 block font-medium">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className={tailwindClasses.inputBox}
          value={password}
          required
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleFieldBlur("password")}
        />
        {touchedFields.password && !isValidPassword && (
          <p className="text-red-700">
            Password must contain 2 capital letters, 2 small letters, 2 numbers, and 2 special
            characters.
          </p>
        )}
      </div>

      {onPrev && <MyButton onClick={onPrev} title={"Prev"} />}

      {handleSave && <MyButton onClick={handleSave} title={"Save"} />}

      {handleSaveAndNext && <MyButton onClick={handleSaveAndNext} title={"Save & Next"} />}
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
