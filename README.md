# @speleotica/unitized

[![CircleCI](https://circleci.com/gh/speleotica/unitized.svg?style=svg)](https://circleci.com/gh/speleotica/unitized)
[![Coverage Status](https://codecov.io/gh/speleotica/unitized/branch/master/graph/badge.svg)](https://codecov.io/gh/speleotica/unitized)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://badge.fury.io/js/%40speleotica%2Funitized.svg)](https://badge.fury.io/js/unitized)

A nice API for handling numbers with associated units.

Only units relevant to cave surveying are built into this package, but it's
possible to define your own using the API.

# Motivation

I've dealt with a lot of unit conversion bugs over the years.
There are usually two root causes:

- storing the associated unit in a separate variable than a number
- forgetting to perform a unit conversion somewhere during a calculation

To cut down on these kinds of mistakes, now I try to always store the
number and its unit together in a single object, and perform calculations
on those objects instead of directly on the numbers. I only deal with raw
numbers at the input or output boundaries of an API.

Here are some examples of what the API for this looks like:

```js
Length.feet(1).add(Length.inches(6)) // 1.5 ft
Length.feet(1).get(Length.meters) // 0.3048 m
Length.feet(2).div(Length.inches(4)) // 6
```

# API

## `Length`

```js
import { Length } from '@speleotica/unitized'
```

TODO

## `Angle

```js
import { Angle } from '@speleotica/unitized'
```

TODO
