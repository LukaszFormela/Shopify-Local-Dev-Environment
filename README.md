# Shopify-Local-Dev-Environment
Local setup for Shopify Theme development (work in progress)

## Requirements
- [Shopify Theme Kit](https://shopify.github.io/themekit/)
- [npm](https://www.npmjs.com/get-npm)
- Command line tool

## How to start
1. Create and navigate to empty directory (root directory)
   - either download and extract this repo in root directory,
   - or [clone this repo](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) in root directory,
2. [Obtain your Shopify API credentials](https://shopify.github.io/themekit/#get-api-access)
3. Navigate to `src` directory and run the following command:
```
theme new --password=[your-password] --store=[your-store.myshopify.com] --name=[theme name]
```
4. Move `config.yml` file from `src` to `dist` directory
5. In root directory run `npm install` command
6. Navigate to `src` directory and run `gulp` commmand, leave it running
7. Open additional command line tool instance, navigate to `dist` directory and run `theme watch` command, leave it running
