import { getConfig } from "../storage";

export const listLists = async () => {
  const data = await getConfig();

  for (let list in data) {
    const count = Object.keys(data[list]).length;
    console.log(`${list} (#${count})`);
  }
};

export const handleList = async (list: string) => {
  const data = await getConfig();

  if (data[list]) {
    const count = Object.keys(data[list]).length;
    console.log(`${list} (#${count})`);

    for (let item in data[list]) {
      console.log(`  ${item}: ${data[list][item]}`);
    }

    console.log(``);
  } else {
    console.log(`make new list '${list}'`);
  }
};
