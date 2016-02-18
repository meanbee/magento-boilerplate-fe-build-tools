# Magento frontend build tools

Meanbee's build tools and Magento theme skin directory structure. The task runner used for these build tools is [gulp](http://gulpjs.com/).

## Directory structure

All development should occur inside the ```src/``` directory. Imagery, css and js are all moved to top level folders after being run through the build tools.

### Images

All imagery that is not part of a sprite should be added to ```src/images/template```.
All sprite imagery should be added to it's own directory located at ```src/images/sprites```. Please see the documentation for the sprite task below for more information.

### JS

It is recommended that Classes and Modules be added to a directory relevant to it's type. Prototype inside ```src/js/prototype```, jQuery inside ```src/js/jquery```, es6 inside ```src/js/es6```. This separation allows for the build tools to apply specific tasks if required.

### Dependencies

Currently dependencies are managed via [bower](http://bower.io/). Components are installed to ```src/components/```

### SCSS

#### Configuration

Common configuration is set inside ```src/scss/_config.scss```. This specifies breakpoint maps, z-index maps, typography and brand colour maps as well as any other variables used throughout a theme. Any consistently reused value should be added here.

#### Utilities

Any placeholder, mixin, function or animation should be added as a separate partial within it's type specific directory at ```src/scss/utils/```. These should be documented using [sassdoc annotations](http://sassdoc.com/annotations/).

#### Base

Element styles that all other theme scss should inherit from should be added here. The elements partial is for element node and pseudo-classes only. No other selectors should be present.

#### Components

Any re-usable CSS component/module should be added as a separate partial inside ```src/scss/components``` and documented with details describing any manipulations whether through JS or media queries. Components should never have a container with a fixed width. This should be addressed through the use of Layouts.

#### Layouts

Any layout structure that positions components on a page should be added here. Additionally, skeleton and grid structure belongs here. Presentation styles should not exist in this directory and should be restricted to box-model and positioning.

#### Pages

In the case that page specific styles are required they should be added here. This should only ever happen if a component or layout modifier is not suitable.

#### Development

All sass partials created should be loaded by adding an import to the _core.scss partial in the relevant section. An addition to the table of contents at the top of this file is also required.


## Tasks


The default task can be run using ```gulp```. The following tasks are executed when run:

- sass
- sasslint
- browser-sync
- images

Please reference these below.

In addition to this, the following watch events are set:

| Path to watch   | Tasks to run   |
| --------------- | -------------- |
| ```src/scss/``` | sass, sasslint |
| ```src/images/template``` | imagemin |
| ```src/images/sprites/``` | sprite |
| ```src/js/``` | js |



### sasslint

This task performs [scss linting](https://github.com/stylelint/stylelint) on sass files based inside ```src/scss/```

Please see .stylelintrc for information on linting rules.


**Exclusions**

Currently the only path excluded from linting is ```src/scss/utils/mixins/spritesmith```

Any additional paths to be excluded should be added to the src of this task.


### sass

This task will compile all top level sass files from ```src/scss/``` to ```css/```
By default this task will run through [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) and [gulp-combine-mq](https://www.npmjs.com/package/gulp-combine-mq) to ensure output is kept optimal and relevant. Browsersync reloading will occur at the end of the task.

### combinemqs

This task will combine any media queries with the same definition to reduce the quantity output. This is achieved through the use of [gulp-combine-mq](https://www.npmjs.com/package/gulp-combine-mq). Although being available as a separate task there should be no need to run this locally due to being supplied as part of the sass task.

### browser-sync

[browser sync](http://www.browsersync.io/) will run for the host specified in PATHS.localhost at the top of the gulpfile. It is recommended to change this value for your environment setup if you wish to use it. This task is executed on ```gulp``` so does not need to be run manually.

### sprite

This task will run [spritesmith](https://github.com/Ensighten/spritesmith) on all directories located in ```src/images/sprites/```

Spritesmith will generate a sprite image and a sass partial for each directory. The image will be moved to ```src/images/template/``` with the name of the directory as the filename. The sass partial will be added to ```src/scss/utils/mixins/spritesmith/``` as a partial with the given directory name.

Example:

The following files

- ```src/images/sprites/global-sprite/bag.png``` 
- ```src/images/sprites/global-sprite/logo.png``` 
- ```src/images/sprites/navigation/menu.png``` 
- ```src/images/sprites/navigation/chevron.png``` 

will produce:

- ```src/images/template/global-sprite.png```
- ```src/images/template/navigation.png```
- ```src/scss/utils/mixins/spritesmith/_global-sprite.scss```
- ```src/scss/utils/mixins/spritesmith/_navigation.scss```

Cache busting is inbuilt by using date timestamps on CSS image paths.

This task should **never be run independently**.

### imagemin

This task will run all imagery from ```src/images/template``` through an optimisation process. Currently this is using [imagemin](https://www.npmjs.com/package/gulp-imagemin). The output files will be located at ```images/template```

### images

This task runs the sprite and imagemin tasks sequentially. If either of these tasks are required to be run manually and not part of the default task then this task should be used.

### JS

JavaScript based inside ```src/js``` will be monitored and linted by both [jshint](http://jshint.com/) and [jscs](https://www.npmjs.com/package/jscs). Linting preferences are set in .jshintrc and .jscsrc files

### sassdoc

This task runs [sassdoc](http://sassdoc.com/) generation over the sass directory and output to ```docs/scss/``` by default. This can be configured by changing the PATHS.docs.dest var at the top of the gulpfile.