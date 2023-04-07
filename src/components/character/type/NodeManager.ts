import Label from "./Label.svelte";
import DynamicLabel from "./DynamicLabel.svelte";
import Field from "./Field.svelte";
import CheckBox from "./CheckBox.svelte";

export function nodeType(type: string): { node; nodeProps } {
  switch (type) {
    case "text":
      return { node: Field, nodeProps: { type: "text", style: "text" } };
    case "number":
      return {
        node: Field,
        nodeProps: {
          type: "number",
          regex: /^[-]?[0-9]+([.]{1}[0-9]+|[.]{0})$/,
          style: "number",
        },
      };
    case "textarea":
      return {
        node: Field,
        nodeProps: {
          type: "textarea",
          style: "textarea",
        },
      };
    case "label":
      return { node: Label, nodeProps: undefined };
    case "dynamicLabel":
      return { node: DynamicLabel, nodeProps: undefined };
    case "checkbox":
      return { node: CheckBox, nodeProps: undefined };
    default:
      break;
  }
}
