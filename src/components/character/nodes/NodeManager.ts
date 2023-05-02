import Label from "./Label.svelte";
import DynamicLabel from "./DynamicLabel.svelte";
import Field from "./Field.svelte";
import CheckBox from "./CheckBox.svelte";
import type { node } from "../templates/templateTypes";

export function nodeType(node: node): any {
  switch (node.type) {
    case "text":
      return {
        node: Field,
        data: node,
        nodeProps: { type: "text", style: "text" },
      };
    case "number":
      return {
        node: Field,
        data: node,
        nodeProps: {
          type: "number",
          regex: /^[-]?[0-9]+([.]{1}[0-9]+|[.]{0})$/,
          style: "number",
        },
      };
    case "textStep":
      return {
        node: Field,
        data: node,
        nodeProps: { type: "textStep", style: "text" },
      };
    case "textarea":
      return {
        node: Field,
        data: node,
        nodeProps: {
          type: "textarea",
          style: "textarea",
        },
      };
    case "label":
      return { node: Label, data: node, nodeProps: undefined };
    case "dynamicLabel":
      return { node: DynamicLabel, data: node, nodeProps: undefined };
    case "checkbox":
      return { node: CheckBox, data: node, nodeProps: undefined };

    case "stat":
      return [
        "center space-bottom",
        [
          {
            node: Field,
            data: { data: node.data, label: node.label },
            nodeProps: {
              type: "number",
              regex: /^[-]?[0-9]+([.]{1}[0-9]+|[.]{0})$/,
              style: "number stat",
              posOverride: true,
            },
          },
          {
            node: DynamicLabel,
            data: {
              data: node.data,
              label: "",
              method: node.method,
              watch: node.watch,
            },
            nodeProps: { posOverride: true, style: "stat" },
          },
        ],
      ];
    default:
      break;
  }
}
