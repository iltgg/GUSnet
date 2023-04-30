import { op } from "../extension";
import type { node } from "./templateTypes";

const defaultTypeMap = {
  text: "",
  textStep: "",
  number: 0,
  textarea: "",
  label: "",
  dynamicLabel: undefined,
  checkbox: false,
  stat: 0,
};

export class Template {
  name: string;

  data: object;
  layout: node[];

  constructor(name: string) {
    this.name = name;

    this.data = {};
    this.layout = [];
  }

  node(
    x: number,
    y: number,
    type: string,
    data: string,
    label: string,
    props?: any
  ) {
    if (data && this.getPathSafe(data, this.data) === undefined) {
      if (props?.base) {
        this.initData(data, this.data, props.base);
      } else {
        this.initData(data, this.data, defaultTypeMap[type]);
      }
    }

    const build = { x: x, y: y, type: type, data: data, label: label };

    if (props) {
      Object.keys(props).forEach((key) => {
        if (key === "base") return;
        build[key] = props[key];
      });
    }

    this.layout.push(build);
  }

  private getPathSafe(path: string, dict): any {
    return path.split(".").reduce((obj, next) => {
      if (obj === undefined || obj[next] === undefined) {
        return undefined;
      }

      return obj[next];
    }, dict);
  }

  private initData(path: string, dict: object, x) {
    let split = path.split(".");
    let last = split.splice(split.length - 1).at(0);

    let base = split.reduce((obj, next) => {
      obj[next] ??= {};

      return obj[next];
    }, dict);

    base[last] = x;
  }

  private getBasePath(path: string, dict) {
    let split = path.split(".").splice(path.length - 1);

    return split.reduce((obj, next) => {
      obj[next] ??= {};

      return obj[next];
    }, dict);
  }

  exportTemplate() {
    return {
      name: this.name,
      character: { owner: "", data: this.data, layout: this.layout },
    };
  }
}
