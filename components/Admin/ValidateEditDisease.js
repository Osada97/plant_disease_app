export default function ValidateEditDisease(value) {
  let error = {};

  if (value.title.trim().length === 0) {
    error.title = "Please enter disease name";
  } else if (value.title.length > 155) {
    error.title = "Disease name must be less than 155 words";
  }
  if (value.shortDescription.trim().length === 0) {
    error.shortDescription = "Please enter Short Description";
  }
  if (value.shortDescription.length > 100) {
    error.shortDescription =
      "Disease short description must be less than 100 words";
  }
  if (!value.title.includes("Healthy") || value.title.includes("healthy")) {
    if (value.symptoms.trim().length === 0) {
      error.symptoms = "Please enter Symptoms";
    }
  }

  return error;
}
