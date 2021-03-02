import React, { useState } from "react";

import Step from "./Step";
import Preview from "./Preview";
import validate from "../helpers/validate";
import Success from "./Success";

const Form = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    stepOne: {
      firstName: {
        value: "",
        required: true,
        type: "input",
        placeholder: "First name",
      },
      middleName: {
        value: "",
        required: "",
        type: "input",
        placeholder: "Middle name",
      },
      lastName: {
        value: "",
        required: true,
        type: "input",
        placeholder: "Last name",
      },
      state: {
        value: "",
        required: true,
        type: "select",
        placeholder: " ",
        choices: [
          { value: "", label: "Choose State" },
          { value: "delhi", label: "Delhi" },
          { value: "ap", label: "Andhra Pradesh" },
          { value: "assam", label: "Assam" },
          { value: "haryana", label: "Haryana" },
          { value: "rajasthan", label: "Rajasthan" },
          { value: "uk", label: "Uttarakhand" },
          { value: "tn", label: "Tamil Nadu" },
          { value: "gujrat", label: "Gujrat" },
          { value: "maharashtra", label: "Maharashtra" },
          { value: "punjab", label: "Punjab" },
          { value: "karnataka", label: "Karnataka" },
          { value: "kerela", label: "Kerela" },
          { value: "kolkata", label: "Kolkata" },
          { value: "bihar", label: "Bihar" },
          { value: "chattisgarh", label: "Chattisgarh" },
          { value: "goa", label: "Goa" },
          { value: "jharkhand", label: "Jharkhand" },
          { value: "mp", label: "Madhya Pradesh" },
          { value: "manipur", label: "Manipur" },
          { value: "meghalaya", label: "Meghalaya" },
          { value: "mizoram", label: "Mizoram" },
          { value: "up", label: "Uttar Pradesh" },
        ],
      },
      city: {
        value: "",
        required: true,
        type: "input",
        placeholder: "Enter City",
      },
    },
    stepTwo: {
      orgName: {
        value: "",
        required: true,
        type: "input",
        placeholder: "Organisation Name",
      },
      experience: {
        value: "",
        required: true,
        type: "input",
        placeholder: "Experience",
      },
      age: {
        value: "",
        required: "",
        type: "input",
        placeholder: "Age",
      },
      salary: {
        value: "",
        required: true,
        type: "input",
        placeholder: "Salary",
      },
    },
    stepThree: {

    },
  });
  const [errors, setErrors] = useState({});

  const changeHandler = (step, e) => {
    e.persist();

    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [e.target.name]: {
          ...prev[step][e.target.name],
          value: e.target.value,
        },
      },
    }));
  };

  const stepChangeHandler = (values, e) => {
    e.preventDefault();
    const newErrors = validate(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setStep(step + 1);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("firstName", formData.stepOne.firstName.value);
    data.append("lastName", formData.stepOne.lastName.value);
    data.append("middleName", formData.stepOne.middleName.value);
    data.append("state", formData.stepOne.state.value);
    data.append("city", formData.stepOne.city.value);
    data.append("orgName", formData.stepTwo.orgName.value);
    data.append("experience", formData.stepTwo.experience.value);
    data.append("age", formData.stepTwo.age.value);
    data.append("salary", formData.stepTwo.salary.value);
  };

  return (
    <form onSubmit={submitHandler}>
      {step === 1 && (
        <>
          <h1 className="is-size-2 has-text-centered mb-4">Primary details</h1>
          <Step
            data={formData.stepOne}
            onChange={changeHandler}
            onStepChange={stepChangeHandler}
            errors={errors}
            stepKey="stepOne"
            step={1}
          />
        </>
      )}
      {step === 2 && (
        <>
          <h1 className="is-size-2 has-text-centered mb-4">Official details</h1>
          <Step
            data={formData.stepTwo}
            onChange={changeHandler}
            onStepChange={stepChangeHandler}
            errors={errors}
            stepKey="stepTwo"
            onPrevStep={(step) => setStep(step)}
            step={2}
          />
        </>
      )}
      {step === 3 && (
        <Preview
          onPrevStep={() => setStep(step - 1)}
          data={[
            { label: "First name", value: formData.stepOne.firstName.value },
            { label: "Last name", value: formData.stepOne.lastName.value },
            { label: "Middle name", value: formData.stepOne.middleName.value },
            { label: "State", value: formData.stepOne.state.value },
            { label: "City", value: formData.stepOne.city.value },
            {
              label: "Organisation Name",
              value: formData.stepTwo.orgName.value,
            },
            { label: "Experience", value: formData.stepTwo.experience.value },
            { label: "Age", value: formData.stepTwo.age.value },
            { label: "Salary", value: formData.stepTwo.salary.value },

          ]}
        />
      )}
    </form>
  );
};

export default Form;
