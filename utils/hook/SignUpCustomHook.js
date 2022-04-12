import { useState, useEffect } from "react";
import ValidateSignUp from "../../components/ValidateSignUp";

export default function SignUpCustomHook(handelSubmit) {
  const [loginForm, setLoginForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [isModel, setIsModel] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    //check if there is an any errors and show the model
    if (Object.keys(errors).length > 0) {
      if (errors[Object.keys(errors)[0]] !== "") {
        setIsModel(true);
      }
    }
  }, [checkError]);

  useEffect(() => {
    //check if there is an any errors and show the model
    if (Object.keys(errors).length === 0 && isSubmit) {
      handelSubmit();
    }
  }, [errors]);

  const setValues = (text, name) => {
    setLoginForm({ ...loginForm, [name]: text });
  };

  const onSubmit = () => {
    setErrors(ValidateSignUp(loginForm));
    setCheckError(!checkError);
    setIsSubmit(true);
  };

  const onFocus = (type) => {
    if (errors[type] && errors[type] !== "") {
      setErrors({ ...errors, [type]: "" });
    }
  };

  return {
    isModel,
    setValues,
    onSubmit,
    onFocus,
    errors,
    setErrors,
    setIsModel,
    setCheckError,
    checkError,
    loginForm,
  };
}
