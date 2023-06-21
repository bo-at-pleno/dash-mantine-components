import React, { useState, useEffect } from "react";
import {
    DefaultProps,
    PersistenceProps,
    InputComponentProps,
} from "../../../props";
import { TextInput as MantineTextInput } from "@mantine/core";
import { useDidUpdate } from "@mantine/hooks";

type Props = {
    /** Input element type */
    type?: "number" | "search" | "text" | "tel" | "url" | "email" | "password";
    /** Value for controlled input */
    value?: string;
    /** Spell check property */
    spellCheck?: boolean;
    /* Debounce only when input focus changes */
} & Omit<InputComponentProps, "debounce"> &
    PersistenceProps &
    DefaultProps;

/**
 * Just like TextInput, capture string input from user, but debounces on defocus or enter. For more information, see: https://mantine.dev/core/text-input/
 */
const LazyText = (props: Props) => {
    const {
        setProps,
        value,
        persistence,
        persisted_props,
        persistence_type,
        ...other
    } = props;

    // tracks the value of the input
    const [val, setVal] = useState(value);

    // debouncedVal is only updated when we lose focus or press enter
    const [debouncedVal, setDebouncedVal] = useState(value);

    useEffect(() => {
        setProps({ value: debouncedVal});
    }, [debouncedVal]);

    useDidUpdate(() => {
        setVal(value);
    }, [value]);

    return (
        <MantineTextInput
            {...other}
            value={val}
            wrapperProps={{ autoComplete: "off" }}
            onBlur={(ev) => setDebouncedVal(ev.currentTarget.value)}
            onChange={(ev) => setVal(ev.currentTarget.value)}
            onKeyDown={(ev) => {if (ev.key === "Enter") setDebouncedVal(ev.currentTarget.value);}} 
        />
    );
};

LazyText.defaultProps = {
    value: "",
    persisted_props: ["value"],
    persistence_type: "local",
};

export default LazyText;
