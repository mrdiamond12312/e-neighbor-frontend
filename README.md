# E-Neighbor

A Web App connecting renters and owners of furniture and vehicles.

# Ant Design Pro

This project Front End Web App is built based on Ant Design Pro - UmiJS Framework.

# How to Run

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

Running with Mock APIs

```bash
npm run start
```

Running while turn off the Mock APIs

```bash
npm run dev
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).

# Storybook

This project is using Storybook for component testing and unit testing

## Run Storybook

This process helps with linting code through Storybook EsLint, also provides developers with an interacting UI to showcase the component / widgets

```bash
npm run storybook
```

## Run Testcase

This process will run all testcase which is embedded in each stories automatically (for CI purposes) in headless mode Notice: You may need to install Chrominium through its given command during the process

```bash
npm run test-storybook
```
