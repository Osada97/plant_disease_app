export default function ValidateSignUp(values) {
  let formErrors = {};
  let pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  if (values.firstName.trim().length === 0) {
    formErrors.firstName = "Please Enter First Name";
  }
  if (values.firstName.length > 6) {
    formErrors.firstName = "Fist Name Should be Less Than 6 Characters";
  }
  if (values.lastName.trim().length === 0) {
    formErrors.lastName = "Please Enter Last Name";
  }
  if (values.lastName.trim().length > 15) {
    formErrors.lastName = "Last Name Should be Less Than 15 Characters";
  }
  if (values.userName.trim().length === 0) {
    formErrors.userName = "Please Enter Username";
  }
  if (values.userName.trim().length > 8) {
    formErrors.userName = "Username Should be Less Than 8 Characters";
  }
  if (values.email.trim().length === 0) {
    formErrors.email = "Please Enter Email";
  } else if (values.email.trim().length > 25) {
    formErrors.email = "Email Should be Less Than 25 Characters";
  } else if (!pattern.test(values.email)) {
    formErrors.email = "Please Enter Valid Email";
  }
  if (values.phoneNumber.trim().length === 0) {
    formErrors.phoneNumber = "Please Enter Phone Number";
  }
  if (values.phoneNumber.trim().length > 10) {
    formErrors.phoneNumber = "Phone Number Should be Less Than 10 Numbers";
  }
  if (values.password.trim().length === 0) {
    formErrors.password = "Please Enter Password";
  }
  if (values.password.trim().length <= 3) {
    formErrors.password = "Password should be More Than 3 Characters";
  }
  if (values.password.trim().length > 8) {
    formErrors.password = "Password should be Less Than 8 Characters";
  }
  if (values.confirmPassword.trim().length === 0) {
    formErrors.confirmPassword = "Please Enter Confirm Password";
  } else {
    if (values.password !== values.confirmPassword) {
      formErrors.confirmPassword = "Confirm Password Invalid";
    }
  }

  return formErrors;
}
