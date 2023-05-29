const setData = (key: string, value: unknown) => {
  try {
    if (!value) {
      throw new Error("Value is empty");
    }
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

const getData = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "");
};
