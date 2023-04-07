export const name = "cw";

const methods = {
  modifier: function (stat) {
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
  carryWeight: function (data) {
    switch (data.case) {
      case "L":
        return Math.max(1, data.con);
      case "M":
        return Math.max(2, Math.floor(data.con * 1.5));
      case "H":
        return Math.max(3, Math.floor(data.con * 2));
      default:
        break;
    }
  },
  skills: function (data) {
    switch (data.case) {
      case 0:
        return Math.floor((data.dex + data.con) / 2);
      case 1:
        return data.wis;
      case 2:
        return Math.floor((data.wis + data.int) / 2);
      case 3:
        return Math.floor((data.str + data.con) / 2);
      case 4:
        return data.cha;
      case 5:
        return data.wis;
      case 6:
        return data.cha;
      case 7:
        return Math.floor((data.dex + data.int) / 2);
      case 8:
        return data.int;
      case 9:
        return Math.floor((data.wis + data.str) / 2);
      case 10:
        return data.wis;
      case 11:
        return Math.floor((data.int + data.wis) / 2);
      case 12:
        return data.int;
      case 13:
        return data.wis;
      case 14:
        return data.cha;
      case 15:
        return data.dex;
      case 16:
        return data.int;
      case 17:
        return data.dex;
      case 18:
        return data.wis;
      case 19:
        return Math.floor((data.int + data.wis) / 2);
      case 20:
        return data.str;
    }
  },
};

export const extension = {
  name: name,
  methods: methods,
};
