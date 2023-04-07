const name = "bnb";

const methods = {
  modifier: function (stat) {
    return Math.floor((stat - 10) / 2);
  },
};

export const extension = {
  name: name,
  methods: methods,
};
