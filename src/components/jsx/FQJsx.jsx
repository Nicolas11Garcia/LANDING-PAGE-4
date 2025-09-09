import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";

export default function FQJsx() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["1"]));

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const itemClasses = {
    base: "py-3 border-b-2 border-gray-200",
    title: "font-semibold",
    indicator: "text-lg font-semibold",
    content:
      "text-plomo p-8 border border-primary rounded-3xl mb-5 text-lg font-medium",
  };

  return (
    <Accordion 
    selectedKeys={selectedKeys}
    onSelectionChange={setSelectedKeys}
    showDivider={false} itemClasses={itemClasses}>
      <AccordionItem key="1" aria-label="Accordion 1" title="01 - Accordion 1">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="02 - Accordion 2">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="03 - Accordion 3">
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
}
