var setData = function (key, value) {
    try {
        if (!value) {
            throw new Error("Value is empty");
        }
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch (error) {
        console.log(error);
    }
};
var getData = function (key) {
    return JSON.parse(localStorage.getItem(key) || "");
};
