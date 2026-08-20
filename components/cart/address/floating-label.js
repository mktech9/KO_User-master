import { useState } from "react";
import { Select, TextInput, Textarea } from "@mantine/core";
import classes from "./FloatingLabelInput.module.css";

export function FloatingLabelInput(props) {
  const [focused, setFocused] = useState(false);
  const floating = props.value?.trim().length !== 0 || focused || undefined;

  return (
    <TextInput
      classNames={classes}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      autoComplete="nope"
      data-floating={floating}
      labelProps={{ "data-floating": floating }}
      {...props}
    />
  );
}

export function FloatingLabelArea(props) {
  const [focused, setFocused] = useState(false);
  const floating = props.value?.trim().length !== 0 || focused || undefined;

  return (
    <Textarea
      classNames={classes}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      autoComplete="nope"
      data-floating={floating}
      labelProps={{ "data-floating": floating }}
      {...props}
    />
  );
}

export function FloatingLabelSelect(props) {
  console.log(props);
  const [focused, setFocused] = useState(false);
  const floating = props.value?.trim().length !== 0 || focused || undefined;

  return (
    <Select
      classNames={classes}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      data-floating={floating}
      labelProps={{ "data-floating": floating }}
      {...props}
    />
  );
}
