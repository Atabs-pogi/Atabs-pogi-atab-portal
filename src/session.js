export const USER_TOKEN = "USER_TOKEN";

export default function useSession(key) {
  const { sessionStorage } = window;
  const value = sessionStorage.getItem(key);
  const setValue = (v) => sessionStorage.setItem(key, v);
  return [value, setValue];
}
