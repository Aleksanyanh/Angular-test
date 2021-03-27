# AngularTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## State management

In this app is used NGXS state management. Navigate to `https://www.ngxs.io/` to see how it works.

## Styles

The app uses scss and here ara some instructions for global, local and library styles:

1. global styles starts with `G-` e.g. `G-page `so you can use it in the whole app (no encapsulation)
2. local styles starts with `L-` e.g. `L-user-filter` in this case your style is accessible only in the component (encapsulated)
3. library styles e.g. `Mat-modal` or `Zorro-modal `which stands for Angular material and NG-ZORRO libraries respectively

## Libraries

For ui components is used Angular material `https://material.angular.io/` and NG-ZORRO `https://ng.ant.design/docs/introduce/en`

To work with asynchronous data calls, callbacks and event-based programs is userd RxJS `https://rxjs-dev.firebaseapp.com/guide/overview`

For multi words variables are used in camelcase e.g. `const userList`
For private variables it can start with underscore e.g `const _userList`
For constant variables are used in upercase e.g. `const USERS`
To unsubscribe from subscription is used ngneat until-destroy from RxJS `https://github.com/ngneat/until-destroy`

## Forms

In the app is used reactive forms appraoch for better validation and scalabilty `https://angular.io/guide/reactive-forms`

## Image

In any cases is preferable to use the image as svg format in point of view the performance and better view. It is used also the `sprite` method. We get the svg image with id. The usage is:
`<svg><use xlink:href="assets/images/sprite.svg#empty-box-open"></use></svg>`
here is the sprite svg generator link `https://svgsprit.es/`