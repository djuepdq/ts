# TS

> TS libraries + testing code

## File structure

- [packages](packages) - TS packages
  - [util](packages/util) - Utility functions
- [run](run) - running various TS code

## Setup

Everything is driven using [bun](https://bun.sh/) commands.

```
bun i
```

## Run

I use this repo to test TS code fast. Create a file `run.ts` in root, if you want to be able to run below command.

```
bun dev
```

Runs: `tput reset && bun --watch run.ts`

## Tests

```
bun test:watch
```

## Publish libraries

> **Warning**
> I still don't know how to publish libraries in TS well. Below instructions are incomplete. If you know how to publish TS packages, please contact me on [X](https://twitter.com/nikitavoloboev) ♥️

```
tsup src/index.ts --format esm --dts
```

Will create a `dist` folder out of exported functions.

Update version number in package.json and commit changes.

Then you can run:

```
npm publish
```

## Deno

Exploring use of [Deno in separate repo](https://github.com/nikitavoloboev/deno) as it has interesting ideas/libraries. Might become part of this repo eventually.

## Contribute

The tasks to do are outlined in [GitHub issues](../../issues) and in [todo.md](todo.md) (sorted by priority).

If issue/idea you have is not there, [open new issue](../../issues/new/choose) or [start discussion](../../discussions).

Any PR with code/doc improvements is welcome. ✨

Join [Discord](https://discord.com/invite/TVafwaD23d) for more indepth discussions on this repo and [others](https://github.com/nikitavoloboev#src).

## Inspiration

- [nothing-but](https://github.com/thetarnav/nothing-but)

### ♥️

[Support on GitHub](https://github.com/sponsors/nikitavoloboev) or look into [other projects](https://nikiv.dev/projects).

[![MIT](http://bit.ly/mitbadge)](https://choosealicense.com/licenses/mit/) [![Twitter](http://bit.ly/nikitatweet)](https://twitter.com/nikitavoloboev)
