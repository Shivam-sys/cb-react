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
    <div className="p-4 sm:w-full md:w-1/2 lg:w-1/3">
      <div>
        {/* tabs for each form */}
        <div className="mb-4 border-b border-gray-200 text-center text-sm font-medium">
          <ul className="-mb-px flex flex-wrap">
            {children.map((item, i) => {
              return (
                <li className="me-2" key={item.props.title}>
                  <button
                    className={`inline-block border border-b-0 bg-green-200 ${step < i ? "bg-green-200" : "bg-blue-400"} p-4`}
                    onClick={() => setStep(i)}
                    disabled={!visitedSteps.includes(i)}
                  >
                    {item.props.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
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
