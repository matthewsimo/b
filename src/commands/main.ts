import { type Arguments, type Argv, type CommandModule } from "yargs";
import { handleList, listLists } from "./list";
import { createItem, handleItem } from "./item";
import { getMatches } from "../utils";

type Args = {
  list?: string;
  item?: string;
  value?: string;
  e?: boolean;
  l?: boolean;
};

const Command: CommandModule<{}, Args> = {
  // b - list lists ✅
  // b [list] - create list or list its items ✅
  // b [item] - look for item & copy, if unclear output each potential match ✅
  // b [list] [item] - copy item in list ✅
  // b [list] [item] [val] - create item with value to list ✅
  command: ["* [list] [item] [value]"],
  describe:
    "Your CLI brain - create list & items, view lists, view and copy items",
  builder: (yargs: Argv<{}>) => {
    return yargs
      .option("e", {
        default: false,
        describe: "Only echo the item",
        type: "boolean",
      })
      .option("l", {
        default: false,
        describe: "Look for only lists explicitely",
        type: "boolean",
      })
      .positional("list", {
        describe: "The list to output or look in",
        type: "string",
        default: undefined,
      })
      .positional("item", {
        describe: "The item to look for",
        type: "string",
        default: undefined,
      })
      .positional("value", {
        describe: "The value to set item to",
        type: "string",
        default: undefined,
      });
  },
  handler: async (argv: Arguments<Args>) => {
    const { list, item, value, e, l } = argv;

    if (!list && !item && !value) {
      await listLists();
      return;
    }

    if (list && item && value) {
      await createItem(list, item, value);
      return;
    }

    if (list && item) {
      await handleItem(list, item, e);
      return;
    }

    if (list) {
      const matches = await getMatches(list, l);

      if (matches.length === 0) {
        console.log(`No matching items or lists found for '${list}'`);
        return;
      } else if (matches.length > 1) {
        matches.map((match) => {
          const msg = match.item
            ? `Found item '${match.item}' in the '${match.list}' list`
            : `Found the '${match.list}' list'`;
          console.log(msg);
        });
        console.log(
          `\nPlease rerun and specify both the list & item${matches.filter((v) => !v.item).length > 0 ? " or use the -l flag" : ""}`,
        );
        return;
      } else {
        const m = matches[0];
        if (m.item) {
          console.log("item");
          await handleItem(m.list, m.item, e);
          return;
        } else {
          console.log("list");
          await handleList(list);
          return;
        }
      }
    }

    console.log(`main:`, { argv, list, item, value });
  },
};

export default Command;
