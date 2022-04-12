import * as SecureStore from "expo-secure-store";

export async function setSecureValue(key, value) {
  await SecureStore.setItemAsync(key, value);
}
export async function getSecureValue(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert("No values stored under that key.");
  }
}
