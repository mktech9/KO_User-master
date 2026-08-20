import { useState } from "react";

export function useInput(validation, value) {
  const [inputValue, setInputValue] = useState(value ?? "");
  const [isBlur, setIsBlur] = useState();

  const isValid = validation(inputValue);
  const error = !isValid && isBlur;

  function inputHandler(event) {
    setInputValue(event.currentTarget.value);
  }

  function blurHandler(event) {
    setIsBlur(true);
  }

  function clearInput() {
    setInputValue("");
    setIsBlur(false);
  }

  function setInput(v) {
    setInputValue(v);
  }

  return {
    input: { inputValue, error, isValid, inputHandler, blurHandler, clearInput, setInput },
  };
}
