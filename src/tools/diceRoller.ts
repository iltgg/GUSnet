export class DiceRoller {
  webhook: string;
  cutoff: number;

  /*
  roll syntax:
  {x}d{y}{adv/dis/none {a}}{+/-/none {b}},...

  r2d6adv5+2, ...

  advantage type: stack
  */

  constructor(webhook: string, params?: { cutoff?: number }) {
    this.webhook = webhook;
    this.cutoff = params?.cutoff ? params?.cutoff : 10;
  }

  // private rollDice(n: number, x: number) {
  //   const rolls = [];
  //   for (let i = 0; i < x; i++) {
  //     rolls.push(Math.floor(Math.random() * n) + 1);
  //   }
  //   return rolls;
  // }

  private rollsToString(rolled: number[][], sums: number[]) {
    let full = "";

    rolled.forEach((r, i) => {
      let string = "";
      // console.log(r);

      if (r.length > this.cutoff) {
        const trunc = [...r];
        trunc.splice(this.cutoff - 1, trunc.length - this.cutoff);
        string = trunc.join(", ");
        string += " ...";
      } else {
        string = r.join(", ");
      }

      full += "{" + string + `} = ${sums[i]}\n`;
    });

    return full.slice(0, full.length - 1);
  }

  private rollDie(n, mod = 0) {
    return Math.floor(Math.random() * n) + 1 + mod;
  }

  private rollDice(n, x, mod = 0) {
    const rolls = [];

    for (let i = 0; i < x; i++) {
      rolls.push(this.rollDie(n, mod));
    }

    return rolls;
  }

  private rollAdv(n, x, mod = 0): number {
    const rolls = Array(x).map((i) => this.rollDie(n, mod), this);
    return Math.max(...rolls);
  }

  private rollDis(n, x, mod = 0): number {
    const rolls = Array(x).map((i) => this.rollDie(n, mod), this);
    return Math.min(...rolls);
  }

  private stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = 0;
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += value << ((2 - i) * 8);
    }
    return color;
  }

  private rollParser(roll: string) {
    // const tags = roll.match(
    //   /([0-9]*)d([0-9]+)((adv[0-9]*)(all)?|(dis[0-9]*)(all)?)?((\+[0-9]+)(all)?|(\-[0-9]+)(all)?)?/
    // );

    // if (tags === null) {
    //   return false;
    // }

    // return {
    //   roll: tags[0],
    //   num: tags[1] ? Number(tags[1]) : 1,
    //   ord: Number(tags[2]),
    //   adv: tags[4]
    //     ? { level: tags[4].slice(3) ? Number(tags[4].slice(3)) : 1, all: !!tags[5] }
    //     : false,
    //   dis: tags[6]
    //     ? { level: tags[6].slice(3) ? Number(tags[6].slice(3)) : 1, all: !!tags[7] }
    //     : false,
    //   mod: tags[8]
    //     ? {
    //         op: tags[8].at(0),
    //         amount: tags[9] ? Number(tags[9].slice(1)) : Number(tags[11].slice(1)),
    //         all: !!tags[10] || !!tags[12],
    //       }
    //     : false,
    // };
    /*
    d20
      xd20
  
    d20 adv a
    d20 adv a all
      xd20 adv a
      xd20 adv a all
  
    d20 + b
    d20 + b all
      xd20 + b
      xd20 + b all
  
    d20 adv a + b
    d20 adv a all + b
    d20 adv a + b all
    d20 adv all + b all 
      xd20 adv a + b
      xd20 adv a all + b
      xd20 adv a + b all
      xd20 adv all + b all 
    */
    // another time

    const tags = roll.match(
      /([0-9]*)d([0-9]+)((adv|dis)([0-9]*))?(\+[0-9]+|\-[0-9]+)?/
    );

    if (tags === null) {
      return false;
    }

    return {
      roll: tags[0],
      num: tags[1] ? Number(tags[1]) : 1,
      ord: Number(tags[2]),
      adv: tags[3]
        ? { type: tags[4], ord: tags[5] ? Number(tags[5]) : 2 }
        : false,
      mod: tags[6] ? Number(tags[6]) : 0,
    };
  }

  public roll(NAME, USER, ROLLTYPE, ROLL, COLOR) {
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if (!this.webhook?.match(regex)) {
      return "invalid webhook";
    } 

    const parse = this.rollParser(ROLL);

    if (!parse) {
      return "invalid syntax";
    }

    const rolls = [];
    const color = COLOR ? COLOR : this.stringToColor(NAME + ROLLTYPE);
    const username = USER ? USER + " Roller": "Gus Roller";
    let x = 1;
    let type = "";

    if (typeof parse.adv === "object") {
      
      x = parse.adv.ord;

      type = parse.adv.type;
    }

    for (let i = 0; i < x; i++) {
      rolls.push(this.rollDice(parse.ord, parse.num));
    }
    // console.log(rolls);

    const sums = rolls.map((r) => r.reduce((a, b) => a + b, 0));

    const final =
      x > 1
        ? type === "adv"
          ? Math.max(...sums) + parse.mod
          : Math.min(...sums) + parse.mod
        : sums[0] + parse.mod;

    // roll.rolled = this.rollDice(roll.dice, roll.number);
    // roll.color = this.stringToColor(
    //   roll.character + roll.type + roll.number + roll.dice + roll.modifier
    // );

    const title = `${NAME} rolls ${ROLLTYPE}`;
    const description = `\`\`\`${parse.roll}:\n${this.rollsToString(rolls, sums)}\n${final-parse.mod}${
      parse.mod ? (parse.mod > 0 ? "+" + parse.mod : parse.mod) : ""
    } \`\`\`\n🎲 = **${final}**`;

    const data = {
      content: null,
      embeds: [
        {
          title: title,
          description: description,
          color: color,
        },
      ],
      username: username,
    };

    fetch(this.webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));

      return "";
  }
}
