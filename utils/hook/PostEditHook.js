import { View, Text } from "react-native";
import { useEffect, useState } from "react";

const PostEditHook = (details, setImage, handelSubmit) => {
  const [values, setValues] = useState({
    title: "",
    description: "",
  });
  const [checkError, setCheckError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({ title: "", comment: "" });

  useEffect(() => {
    setValues({
      ...values,
      ...{ title: details.post_title, description: details.description },
    });

    //set the previous added images
    if (details.images) {
      let arr = [];

      for (const img of details.images) {
        arr.push({
          id: img.id,
          edited: true,
          uri: img.image_name,
        });
      }
      setImage([...arr]);
    }
  }, [details]);

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

  const editComment = () => {
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
  const setPostValue = (text, name) => {
    //set textInput values
    setValues({ ...values, [name]: text });
  };

  return { editComment, setPostValue, values };
};

export default PostEditHook;
