const fs = require("fs");
const chalk = require("chalk");

const addContact = (fullname, email, phone) => {
  const contacts = loadContacts();

  const duplicateContact = contacts.find((c) => c.fullname === fullname);

  if (!duplicateContact) {
    contacts.push({ fullname, email, phone });

    saveContacts(contacts);

    console.log(chalk.greenBright("contact saved"));
  } else {
    console.log(chalk.redBright("contact already exist"));
  }
};

const listContacts = () => {
  const contacts = loadContacts();
  if (contacts.length > 0) {
    console.log(chalk.yellowBright("Your contacts:\n"));

    contacts.forEach((contact) => {
      console.log(`\t${chalk.greenBright("Fullname")}: ${contact.fullname}`);
      console.log(`\t${chalk.greenBright("Phone")}: ${contact.phone}`);
      console.log(`\t${chalk.greenBright("Email")}: ${contact.email}`);
      console.log(chalk.blueBright("\t---------------------------"));
    });
  } else {
    console.log(chalk.redBright("you don't have any contacts"));
  }
};

const removeContacts = (fullname) => {
  const contacts = loadContacts();
  const filteredContacts = contacts.filter((c) => c.fullname !== fullname);

  if (contacts.length > filteredContacts.length) {
    saveContacts(filteredContacts);
    console.log(chalk.cyanBright(`${fullname} has been removed.`));
  } else {
    console.log(chalk.red("Contact not found"));
  }
};

const loadContacts = () => {
  try {
    const dataBuffer = fs.readFileSync("contacts.json");
    const contact = dataBuffer.toString();
    return JSON.parse(contact);
  } catch (err) {
    console.log(`loadContacts error: ${err}`);
    return [];
  }
};

const saveContacts = (contacts) => {
  const data = JSON.stringify(contacts);
  fs.writeFileSync("contacts.json", data);
};

module.exports = {
  addContact,
  listContacts,
  removeContacts,
};
