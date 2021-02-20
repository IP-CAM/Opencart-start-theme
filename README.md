# [RC-oc] (https://github.com/redclick-eu/Opencart-start-theme)

RC-oc starter theme for opencart

## Core technologies

| Technologies | Checking | Installation
| --------------- | ------------ | ------------- |
| PHP> = 5.4.x | `php -v` | [php.net] (http://php.net/manual/en/install.php) |
| Node.js> = 4.5 | `node -v` | [nodejs.org] (http://nodejs.org/) |
| gulp> = 3.8.10 | `gulp -v` | `npm install -g gulp` |
| Bower> = 1.3.12 | `bower -v` | `npm install -g bower` |

For more information on installation, go to the [Installing gulp and bower] section (# Installing gulp and bower)

## Additional technologies

* [gulp] (http://gulpjs.com/) build script that compiles both Sass and Less, checks for JavaScript errors, optimizes images, and merges and minifies files
* [BrowserSync] (http://www.browsersync.io/) to ensure synchronization of multiple browsers and devices during testing, as well as connecting updated CSS and JS to your browser during development
* [Bower] (http://bower.io/) to manage front-end dependencies
* [asset-builder] (https://github.com/austinpray/asset-builder) to set up the project via manifest.json
* [Bootstrap] (http://getbootstrap.com/)

## Installing the theme

Copy RC-oc to the site root with file replacement

## Theme customization

Edit `lib / setup.php` to enable / disable site functionality, customize menus, post and page thumbnails, post formats, and sidebars.

## Theme development

RC-oc uses [gulp] (http://gulpjs.com/) to manage project build and [Bower] (http://bower.io/) to manage front-end dependencies

### Installing gulp and bower

Working through the command line:

1. Install [gulp] (http://gulpjs.com) and [Bower] (http://bower.io/) globally using `npm install -g gulp bower`
2. In the theme directory, run `npm install`
3. Then run `bower install`
4. PROFIT !!!

### Used gulp commands

* `gulp` - Compiles and optimizes files in the 'assets' directory
* `gulp watch` - Compiles the file to the 'assets' directory after change
* `gulp --production` - Compile source for production (disable source maps)

### Using BrowserSync

To use BrowserSync, after running `gulp watch`, you need to update` settings.local_url` in `gulpfile.js` file to use local url

For example, if your local development url is `http: // project-name.dev` you need to update the file:
`` 'json
...
  "config": {
    "devUrl": "http://project-name.dev"
  }
...
``,
If url is `http: // localhost: 8888 / project-name /` you need to update the file:
`` 'json
...
  "config": {
    "devUrl": "http: // localhost: 8888 / project-name /"
  }
...
``, 
