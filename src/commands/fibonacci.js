const fibo = (n) => {
  let r1 = 0;
  let r2 = 1;

  while (n > 0) {
    let temp = r2;
    r2 = r1 + r2;
    r1 = temp;
    --n;
  }

  return r1;
};

module.exports = {
  name: "fibo",
  run: (message, args, _) => {
    if (args.lenght === 1 || !Number.isInteger(Number(args[0]))) {
      message.channel.send("ERROR: bad arguments\nusage: !fibo n");
      return;
    }

    const n = parseInt(args[0]);

    if (n < 0) {
      message.channel.send("ERROR: argument must be a positive number");
      return;
    }

    message.channel.send(`fibo(${n}) = ${fibo(n)}`);
  },
};
