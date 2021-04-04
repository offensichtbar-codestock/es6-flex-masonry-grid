# ES6 Flex Masonry Grid

![Offensichtbar Logo](https://i.postimg.cc/nz9jhvpZ/osb-header-git.jpg)

Lightweight ES6 Module for displaying items in a flex-based masonry layout without third party dependencies. The grid layout only uses the css flexbox feature. In contrast to well-known masonry layouts there is no absolute positioning which makes it applicable for various CSS frameworks. The offsets are set with CSS transform style (translateY). 

[![](https://img.shields.io/github/package-json/v/offensichtbar-codestock/es6-flex-masonry-grid?color=%23009fe3)](https://github.com/offensichtbar-codestock/es6-flex-masonry-grid) [![npm version](https://img.shields.io/npm/v/@offensichtbar-codestock/es6-flex-masonry-grid?color=%23009fe3)](https://www.npmjs.com/package/@offensichtbar-codestock/es6-flex-masonry-grid)
## Installation

`npm install @offensichtbar-codestock/es6-flex-masonry-grid --save`


## Usage

### Import
#### As npm package
Import `OSB_MasonryGrid` into your script:

```sh
import OSB_MasonryGrid from '@offensichtbar-codestock/es6-flex-masonry-grid';
```
#### As link 
Download bundle.min.js from git repo and link in html with script tag
```sh
<script type="text/javascript" src="./bundle.min.js"></script>
```
Embed from jsDelivr
```sh
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/offensichtbar-codestock/es6-flex-masonry-grid/build/bundle.min.js"></script>
```

[![](https://data.jsdelivr.com/v1/package/npm/@offensichtbar-codestock/es6-flex-masonry-grid/badge)](https://www.jsdelivr.com/package/npm/@offensichtbar-codestock/es6-flex-masonry-grid)

### Initialization
#### Intialization with Vanilla Javascript
The instance is created with a DOM element which is the direct parent element of the grid items and a config object.
```
const OSB_GRID = document.querySelector('#demo_masonry-grid');
new OSB_MasonryGrid(OSB_GRID, {
    // options
    animation: true, // boolean
    animationType: 'scaleDown', // string
    animationDelay: 300 // number (ms)
});
```
#### Options
* animation: Enable / Disable initial grid card animation 
* animationType: Initial animation type
* animationDelay: Initial animation speed

##### Animation types
* fade
* translateBottom
* translateTop
* scale
* scaleUp
* scaleDown
* slide
* slideIn
* flip

### HTML structure

The grid can be applied to any flex container.
All flex items must have the same with.
Direct children of the grid container may not have horizonal margins. Use padding instead or nest elements.
The masonry flex grid can be applied to the direct parent element of the flex cards.
It can be initialized on an item with any DOM element selector.
It is recommended to add width and height attributes to every image to avoid jumping content on image load. If images without width and height attributes are loaded after the initialization of the grid, the card offset is recalculated.

```
<div id="#demo_masonry-grid">
    <div>Card 1</div>
    <div>Card 2</div>
    <div>Card 3</div>
</div>
```

### CSS
The initial grid animation transitions are defined as CSS styles. 
If animation is enabled, the CSS file must be attached.

#### Import

##### In SCSS
```sh
@import '~@offensichtbar-codestock/es6-flex-masonry-grid/src/scss/main';
```
##### In CSS
```sh
@import '~@offensichtbar-codestock/es6-flex-masonry-grid/build/bundle.min.css';
```
##### As link
Download bundle.min.css from git repo and link in html head with link tag
```sh
<link rel="stylesheet" type="text/css" href="./bundle.min.css">
```
Embed from jsDelivr
```sh
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/offensichtbar-codestock/es6-flex-masonry-grid/build/bundle.min.css"></script>
```
[![](https://data.jsdelivr.com/v1/package/npm/@offensichtbar-codestock/es6-flex-masonry-grid/badge)](https://www.jsdelivr.com/package/npm/@offensichtbar-codestock/es6-flex-masonry-grid)

#### Add SCSS source code
Download main.scss from git repo ./src/scss and add source code to your SCSS.

Transition durations and distances of the single card transition can be adjusted in the SCSS variables:
```
$translation-bottom:   100px;
$translation-top:      -100px;
$translation-slide:    100%;
$translation-scale:    200px;
$translation-flip:     -100px;

$translation-transition-duration: 0.5s;
$fade-transition-duration:        0.75s;
$slide-transition-duration:       0.75s;
$scale-transition-duration:       0.5s;
$flip-transition-duration:        0.5s;

$transition-timing-function: ease;
```
### Example
The masonry flex grid can be used with popular CSS framework grids like Bootstrap.

```sh
<div class="container">
    <div id="demo_masonry-grid" class="row">
        <div class="col-sm-6 col-md-4 col-lg-3 pt-3">
            <div class="card">
                <img class="card-img-top" src="https://i.postimg.cc/tgMnbr02/osb-demo-1280x720.jpg" width="1280" height="720"/>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </div>
    </div>
</div>
```


## Demo

[Live demo on stackblitz](https://demo-es6-flex-masonry-grid.stackblitz.io/)

## Licence

[![](https://img.shields.io/github/license/offensichtbar-codestock/ngx-flex-masonry-grid?color=%23009fe3)](https://opensource.org/licenses/MIT)
