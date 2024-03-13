import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const INIT = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  address: "",
  countryCode: "",
  phoneNumber: "",
  acceptTnC: false,
};

// eslint-disable-next-line react/prop-types
const MultiForm = ({ children }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(INIT);
  const [visitedSteps, setVisitedSteps] = useState([0]);

  const navigate = useNavigate();

  const handlePrev = () => setStep((prevStep) => prevStep - 1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
    setVisitedSteps((prevVisited) => [...prevVisited, step + 1]);
  };

  const updateFormData = (newData) => {
    const updatedData = { ...formData, ...newData };
    setFormData(updatedData);
    if (step === children.length - 1) {
      handleSubmit(updatedData);
    }
  };

  const handleSubmit = async (data) => {
    const filteredData = delete data.acceptTnC;

    try {
      const requestBody = JSON.stringify(filteredData);
      const response = await fetch("https://codebuddy.review/submit", {
        method: "POST",
        body: requestBody,
      });
      if (response.ok) {
        navigate("/posts");
      } else {
        throw new Error("Error while submitting data");
      }
    } catch (e) {
      console.log("Error while sending request: " + e);
    } finally {
      setFormData(INIT);
    }
  };

  const formProps = {
    data: formData,
    updateFormData: updateFormData,
    onPrev: step === 0 ? null : handlePrev,
    onNext: handleNext,
  };

  const currentChild = children[step];

  const renderItem = React.isValidElement(currentChild)
    ? React.cloneElement(currentChild, { ...formProps })
    : null;

  return (
    <div>
      <div>
        {/* tabs for each form */}
        {children.map((item, i) => {
          return (
            <button
              key={item.props.title}
              disabled={!visitedSteps.includes(i)}
              onClick={() => setStep(i)}
            >
              {item.props.title}
            </button>
          );
        })}
      </div>
      {/* Form */}
      {renderItem}
    </div>
  );
};

export default MultiForm;

MultiForm.propTypes = {
  children: PropTypes.node.isRequired,
};
