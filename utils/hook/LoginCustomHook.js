import { useState, useEffect } from "react";

export default function LoginCustomHook(handelSubmit) {
  const [loginForm, setLoginForm] = useState({ userName: "", password: "" });
  const [errors, setErrors] = useState({ userName: "", password: "" });
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
    let formErrors = {};

    if (loginForm.userName.trim().length === 0) {
      formErrors.userName = "Please Enter UserName";
    }
    if (loginForm.password.trim().length === 0) {
      formErrors.password = "Please Enter Password";
    }
    setErrors({ ...formErrors });
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
    onFocus,
    onSubmit,
    setValues,
    setIsModel,
    errors,
    setErrors,
    loginForm,
    setCheckError,
    checkError,
  };
}
