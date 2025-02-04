import React from "react";
import { DefaultProps } from "../../../props";
import { Accordion } from "@mantine/core";

type Props = {
    /** AccordionPanel content */
    children?: React.ReactNode;
} & DefaultProps;

/**
 * Divide content into collapsible sections. For more information, see: https://mantine.dev/core/accordion/
 */
const AccordionPanel = (props: Props) => {
    const { children, setProps, ...other } = props;

    return <Accordion.Panel {...other}>{children}</Accordion.Panel>;
};

AccordionPanel.defaultProps = {};

export default AccordionPanel;
