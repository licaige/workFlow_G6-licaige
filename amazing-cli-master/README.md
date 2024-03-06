# Amazing Cli

## Global Install

```bash
pnpm i -g amazing-cli
# or
npm install -g amazing-cli
# or
yarn add amazing-cli -g
```

## Use

### Create project

```bash
amazing-cli create
```

### Delete specified directory

```bash
amazing-cli delete <file-directory>
```

### Pull the remote project into the current project branch

```bash
amazing-cli pull
```

## Use Npx

### Create Project

```bash
npx amazing-cli create
# or
npx amazing-cli create <project-name> [-t|--template] <template-name>
```

### Example

```bash
npx amazing-cli create vue-project -template template-project
```
