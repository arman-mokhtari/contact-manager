const yargs = require("yargs");
const chalk = require("chalk");
const { addContact, listContacts, removeContacts } = require("./contacts");

yargs.scriptName(`${chalk.cyanBright("Contact Manager")}`);

yargs.usage(
  `$0 ${chalk.yellowBright("<command>")} ${chalk.greenBright("[args]")}`
);

yargs.command({
  command: "create",
  aliases: ["c", "cr"],
  describe: `${chalk.greenBright("[create new contact]")}`,
  builder: {
    fullname: {
      alias: "f",
      describe: "persons fullname",
      demandOption: true,
      type: "string",
    },
    email: {
      alias: "e",
      describe: "persons email",
      demandOption: true,
      type: "string",
    },
    phone: {
      alias: "p",
      describe: "persons phone",
      demandOption: true,
      type: "number",
    },
  },
  handler({ fullname, email, phone }) {
    addContact(fullname, email, phone);
  },
});

yargs.command({
  command: "list",
  aliases: ["l"],
  describe: `${chalk.greenBright("[listing the saved contacts]")}`,
  handler() {
    listContacts();
  },
});
yargs.command({
  command: "remove",
  aliases: ["r"],
  describe: `${chalk.green("[remove contact]")}`,
  builder: {
    fullname: {
      alias: "f",
      describe: "Person fullname",
      demandOption: true,
      type: "string",
    },
  },
  handler({ fullname }) {
    removeContacts(fullname);
  },
});

yargs.parse();
