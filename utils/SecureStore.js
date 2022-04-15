import * as SecureStore from "expo-secure-store";

export async function setSecureValue(key, value) {
  await SecureStore.setItemAsync(key, value);
}
export async function getSecureValue(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return result;
  }
}

export async function clearSecureValue(key) {
  await SecureStore.deleteItemAsync(key);
}
