import { useEffect, useState } from "react";

const AddPostHook = (handelSubmit, image, setImage) => {
  const [values, setValues] = useState({
    title: "",
    description: "",
  });
  const [checkError, setCheckError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({ title: "", comment: "" });

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

  const setPostValue = (text, name) => {
    //set textInput values
    setValues({ ...values, [name]: text });
  };

  const removeImage = (index) => {
    //removes newly added images
    const im = image.filter((data) => image.indexOf(data) !== index);
    setImage([...im]);
  };

  const addPost = () => {
    //validate data
    let postErrors = {};

    if (values.title.trim().length === 0) {
      postErrors = {
        title: "Please add title for post",
      };
    } else if (values.title.length >= 100) {
      postErrors = {
        title: "Your question must be less than 100 characters",
      };
    }
    if (values.description.trim().length === 0) {
      postErrors = {
        comment: "Please add description for post",
      };
    } else if (values.description.length >= 500) {
      postErrors = {
        comment: "Your question must be less than 100 characters",
      };
    }

    setErrors({ ...postErrors });
    setCheckError(!checkError);
    setIsSubmit(true);
  };
  return { values, errors, addPost, removeImage, setPostValue };
};

export default AddPostHook;
