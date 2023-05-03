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
  layout: Array<node[]>;
  pages: Array<string>;

  index: number;

  dataPathsStore: Array<string>;

  constructor(name: string) {
    this.name = name;

    this.data = {};
    this.layout = [[]];
    this.pages = ["default"];
    this.index = 0;

    this.dataPathsStore = [];
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

    if (data !== "" && this.dataPathsStore.includes(data)) {
      console.warn(`duplicate data ${data}, "${type}, ${label}"`);
    } else {
      this.dataPathsStore.push(data);
    }

    const build = { x: x, y: y, type: type, data: data, label: label };

    if (props) {
      Object.keys(props).forEach((key) => {
        if (key === "base") return;
        build[key] = props[key];
      });
    }

    this.layout.at(this.index).push(build);
  }

  newPage(name: string) {
    if (this.layout.length === 1 && this.pages[0] === "default") {
      this.pages[0] = name;
    } else {
      if (this.pages.includes(name)) {
        console.warn(
          `multiple page name declaration "${name}" did you intend this?`
        );
      }

      this.index++;
      this.layout.push([]);
      this.pages[this.index] = name;
    }
  }

  setPage(index: number);
  setPage(pageName: string);
  setPage(id: string | number): void {
    if (typeof id === "string") {
      this.index = this.pages.indexOf(id);
    } else if (typeof id === "number") {
      this.index = id;
    }
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
      character: {
        owner: "",
        data: this.data,
        layout: this.layout,
        pages: this.pages,
      },
    };
  }
}
