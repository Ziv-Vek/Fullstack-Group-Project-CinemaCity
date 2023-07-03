"use strict";
const setData = (key, value) => {
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
const getData = (key) => {
    return JSON.parse(localStorage.getItem(key) || "");
};
