import { type CommandModule } from "yargs";
import { getConfig } from "../storage";

type Args = {};

const Command: CommandModule<{}, Args> = {
  // b dump - list all lists and their items
  command: "dump",
  describe: "Lists all lists and their items",
  handler: async () => {
    const data = await getConfig();

    if (Object.keys(data).length > 0) {
      for (let list in data) {
        const count = Object.keys(data[list]).length;
        console.log(`${list} (#${count})`);

        for (let item in data[list]) {
          console.log(`  ${item}: ${data[list][item]}`);
        }

        console.log(``);
      }
    } else {
      console.log("No saved places yet...");
      console.log("See `b --help`");
    }
  },
};

export default Command;
