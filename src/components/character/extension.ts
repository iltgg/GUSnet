interface datum {
  value: any;
  DB?: boolean;
}

const CONDITIONS = {
  lt: (a, b) => a < b,
  gt: (a, b) => a > b,
  leq: (a, b) => a <= b,
  geq: (a, b) => a >= b,
  eq: (a, b) => a === b,
  neq: (a, b) => a !== b,

  all: () => true,
};

const CONVERTERS = {
  // BASIC CONVERTERS
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
  pow: (a, b) => Math.pow(a, b),
  floor: (a) => Math.floor(a),
  ceil: (a) => Math.ceil(a),
  round: (a) => Math.round(a),
  max: (a, b) => Math.max(a, b),
  min: (a, b) => Math.min(a, b),
  map: (key, dictionary) => dictionary[key],

  //DEBUG
  print: (a, b) => {
    console.log(`a: ${a} | b: ${b}`);
    return a;
  },

  // SPECIFIC CONVERTERS
  cwStat: (stat) => {
    if (stat > 17) {
      stat - 18; // 18-18 = 0, 19-18 = 1, 20-18 = 2, 21| 22 23 | 24 25 | 26 27| 28 29 | 30 31 |32 33
      if (stat % 2 === 1) {
        return stat - 11 - (stat - 19) / 2;
      }
      return stat - 10 - (stat - 18) / 2;
    }
    switch (stat) {
      case -7:
      case -6:
        return -8;
      case -5:
        return -7;
      case -4:
      case -3:
        return -6;
      case -2:
      case -1:
        return -5;
      case 0:
        return -4;
      case 1:
        return -3;
      case 2:
      case 3:
        return -2;
      case 4:
        return -1;
      case 5:
        return 0;
      case 6:
        return 1;
      case 7:
      case 8:
        return 2;
      case 9:
      case 10:
        return 3;
      case 11:
      case 12:
        return 4;
      case 13:
      case 14:
        return 5;
      case 15:
        return 6;
      case 16:
      case 17:
        return 7;
      default:
        return 0;
    }
  },
  numStringify: (a) => {
    if (a > 0) {
      return `+${a}`;
    }
    return `${a}`;
  },
};

export interface calculationGroup {
  conditions: Array<[string, datum | null, datum | null]>;
  converters: Array<
    [
      string,
      { op: op; index?: number; a?: number; b?: number },
      datum | null,
      datum | null
    ]
  >;
}

// pass, append, get, mutate, return
export enum op {
  Pass = 0,
  Append,
  Mutate,
  Return,
}

export class Calculator {
  private e: calculationGroup[];
  private store;

  constructor(JSON: string, store);
  constructor(calculationArray: calculationGroup[], store);
  constructor(arg: calculationGroup[] | string, store);
  constructor(arg: calculationGroup[] | string, store) {
    if (typeof arg === "string") {
      this.e = JSON.parse(arg);
    } else {
      this.e = arg;
    }

    this.store = store;
    // on watch
  }

  public get JSON(): string {
    return JSON.stringify(this.e);
  }

  public evaluate(): any {
    const memory: datum[] = [{ value: 0 }];

    for (let i = 0; i < this.e.length; i++) {
      let pass = true;

      for (let j = 0; j < this.e[i].conditions.length; j++) {
        let a = this.e[i].conditions[j][1];
        let b = this.e[i].conditions[j][2];
        let aValue = a?.value;
        let bValue = b?.value;

        if (a?.DB) aValue = this.getFromDB(a.value);
        if (b?.DB) bValue = this.getFromDB(b.value);

        if (!CONDITIONS[this.e[i].conditions[j][0]](aValue, bValue)) {
          pass = false;
          break;
        }
      }

      if (pass) {
        for (let j = 0; j < this.e[i].converters.length; j++) {
          let options = this.e[i].converters[j][1];
          let a = this.e[i].converters[j][2];
          let b = this.e[i].converters[j][3];
          let aValue: any;
          let bValue: any;

          if (options.a >= 0) {
            aValue = memory[options.a].value;
          } else {
            if (a) {
              aValue = a?.value;
              if (a?.DB) aValue = this.getFromDB(a.value);
            }
          }

          if (options.b >= 0) {
            bValue = memory[options.b].value;
          } else {
            if (b) {
              bValue = b?.value;
              if (b?.DB) bValue = this.getFromDB(b.value);
            }
          }

          // console.log(
          //   aValue,
          //   bValue,
          //   this.e[i].converters[j][0],
          //   memory[0].value,
          //   memory[1]?.value
          // );
          const calc = CONVERTERS[this.e[i].converters[j][0]](aValue, bValue);
          const converted = { value: calc };

          // console.log(converted);

          switch (options.op) {
            case op.Pass:
              memory[0] = converted;
              break;
            case op.Append:
              memory.push(converted);
              break;
            case op.Mutate:
              memory[options.index] = converted;
              break;
            case op.Return:
              return converted.value;

            default:
              break;
          }
        }
      }
    }
  }

  private getFromDB(key: string) {
    // console.log(this.store)
    return this.getPath(key, this.store[0]);
  }
  private getPath(path: string, characterData): any {
    return path.split(".").reduce((obj, next) => obj[next], characterData);
  }
}
