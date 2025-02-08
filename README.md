# b

Your CLI brain - create list & items, view lists, view and copy items

## Build

Running `bun b` will build the cli and then copy it into your `$HOME/bin/`.
If that's in your path, you'll be ready to start using it directly.

## Manually editing saved data

The CLI uses the `$HOME/.config/` convention. It stores the `/b/config.json` file
there that acts as the persistant data store for the `b` CLI.

## Usage

```bash
Commands:
  b [list] [item] [value]     Your CLI brain - create list & items, view lists,
                              view and copy items                      [default]
  b dump                      Lists all lists and their items
  b remove <list> [item]      Removes a list or item    [aliases: rm, delete, d]

Positionals:
  list   The list to output or look in                                  [string]
  item   The item to look for                                           [string]
  value  The value to set item to                                       [string]

Options:
      --version  Show version number                                   [boolean]
      --help     Show help                                             [boolean]
  -e             Only echo the item                   [boolean] [default: false]
  -l             Look for only lists explicitely      [boolean] [default: false]
```

### Core commands

- `b` - output lists and how many items exist in each
- `b <list>` - output the list's items if it exists,
  if not create a new list with the given name
- `b <item>` - look in all lists and output and copy the item if found,
  use `-e` flag to only echo it
- `b <list> <item>` - output and copy the item from the given list to clipboard,
  use `-e` flag to only echo it
- `b <list> <item> <value>` - add the item with value to given list
- `b dump` - output all known lists and all their items
- `b remove [list] [item]` - remove the list or item

> [!TIP]
> You can use the `-e` flag for using the value in other command line commands. i.e.
>
> `b places new-place $(pwd)` # save the current directory as the 'new-place' item in the 'places' list
>
> `cd $(b places new-place -e)` # change directories to the 'new-place' item
