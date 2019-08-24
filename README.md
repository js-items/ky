# ky

[![CircleCI](https://circleci.com/gh/js-items/ky.svg?style=svg)](https://circleci.com/gh/js-items/ky)
[![codecov](https://codecov.io/gh/js-items/ky/branch/master/graph/badge.svg)](https://codecov.io/gh/js-items/ky)
![GitHub tag (latest SemVer)](https://img.shields.io/github/tag/js-items/ky.svg)
![jscpd](assets/jscpd-badge.svg)

ky implementation of js-items

- cursor based pagination operates using `before` and `after` 
- optional `enveloping` response (envelope: boolean) for clients not capable of working with headers and JSONP
- possibility to `override` each `request handler`
- by default all methods request response to be `pretty` which improves readability, you can disable that by query param (pretty: boolean)

## Installation:

`npm i @js-items/ky --save`

Credits:

- [ryansmith94](https://github.com/ryansmith94)
- [best-practices-for-a-pragmatic-restful-api](https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
