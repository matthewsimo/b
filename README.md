# b

Your CLI brain - create list & items, view lists, view and copy items

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

## Build

Running `bun b` will build the cli and then copy it into your `$HOME/bin/`. If that's in your path, you'll be ready to start using it directly.

## Manually editing saved data

The CLI uses the `$HOME/.config/` convention and stores the `/b/config.json` file there that acts as the persistant data store for the `b` CLI.
