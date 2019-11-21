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

The TypeScript types are also designed to help you avoid accidentally
mixing quantities of different unit types, for instance lengths and angles.

Here are some examples of what the API for this looks like:

```js
Length.feet(1).add(Length.inches(6)) // 1.5 ft
Length.feet(1).get(Length.meters) // 0.3048 m
Length.feet(2).div(Length.inches(4)) // 6

type Point = {
  northing: UnitizedNumber<Length>,
  easting: UnitizedNumber<Length>,
  elevation: UnitizedNumber<Length>,
}

type SurveyLeg = {
  distance: UnitizedNumber<Length>,
  azimuth: UnitizedNumber<Angle>,
  inclination: UnitizedNumber<Angle>,
}

function calculateLeg(
  from: Point,
  { distance, azimuth, inclination }: SurveyLeg
) {
  const xy = distance.mul(Angle.cos(inclination))
  const northing = xy.mul(Angle.cos(azimuth))
  const easting = xy.mul(Angle.sin(azimuth))
  const elevation = distance.mul(Angle.sin(inclination))

  return {
    northing: from.northing.add(northing),
    easting: from.easting.add(easting),
    elevation: from.elevation.add(elevation),
  }
}
```

# API

## `Length`

```js
import { Length } from '@speleotica/unitized'
```

Contains length units:

- `Length.meters`
- `Length.centimeters`
- `Length.kilometers`
- `Length.feet`
- `Length.inches`
- `Length.yards`
- `Length.miles`

Each of these units is an instance of `Unit<Length>`.

They may be called as functions; `Length.meters(3)` is
equivalent to `new UnitizedNumber(3, Length.meters)`.

## `Angle`

```js
import { Angle } from '@speleotica/unitized'
```

Contains angle units:

- `Angle.radians`
- `Angle.degrees`
- `Angle.gradians` (1/400 of a unit circle)
- `Angle.milsNATO` (1/6400 of a unit circle)
- `Angle.percentGrade` (rise over run as %; 100% = 45 degrees)

Each of these units is an instance of `Unit<Angle>`.

They may be called as functions; `Angle.degrees(3)` is
equivalent to `new UnitizedNumber(3, Angle.degrees)`.

### `static sin(angle: UnitizedNumber<Angle>): number`

Computes the sine of the given angle.

### `static cos(angle: UnitizedNumber<Angle>): number`

Computes the cosine of the given angle.

### `static tan(angle: UnitizedNumber<Angle>): number`

Computes the tangent of the given angle.

### `static asin(sin: number): UnitizedNumber<Angle>`

Computes the arcsine of the given number.

### `static acos(cos: number): UnitizedNumber<Angle>`

Computes the arccosine of the given number.

### `static atan(tan: number): UnitizedNumber<Angle>`

Computes the arctangent of the given number.

### `static atan2(y: number, x: number): nUnitizedNumber<Angle>`

Equivalent to `Math.atan2`, but returns a `UnitizedNumber<Angle>`.

### `static atan2(y: UnitizedNumber<Length>, x: UnitizedNumber<Length>): nUnitizedNumber<Angle>`

Equivalent to `Math.atan2`, but returns a `UnitizedNumber<Angle>`.

### `static normalize(angle: UnitizedNumber<Angle>): UnitizedNumber<Angle>`

Normalizes the given `angle` to the range [0, one revolution); returns the normalized
angle in the same units.

### `static opposite(angle: UnitizedNumber<Angle>): UnitizedNumber<Angle>`

Returns the angle facing the opposite direction, in the same units.

## `UnitizedNumber<T extends UnitType<T>>`

```js
import { UnitizedNumber } from '@speleotica/unitized'
```

### `constructor(value: number, unit: Unit<T>)`

Creates a `UnitizedNumber` with the given `value` and `unit`

### `unit: Unit<T>`

The unit this `UnitizedNumber`'s value is in.

### `private value: number`

The numeric value of this `UnitizedNumber`. Accessing this directly is discouraged;
use `get(unit)` instead.

### `get(unit: Unit<T>): number`

Converts this `UnitizedNumber`'s `value` to the given `unit`.

### `add(addend: UnitizedNumber<T>): UnitizedNumber<T>`

Returns `this + addend` as a new `UnitizedNumber` in the same units as this.

### `get isFinite(): boolean`

Returns `true` iff the numeric value is not `NaN` or infinite.

### `get isInfinite(): boolean`

Returns `true` iff the numeric value is infinite.

### `get isNaN(): boolean`

Returns `true` iff the numeric value is `NaN`.

### `in(unit: Unit<T>): UnitizedNumber<T>`

Returns a new `UnitizedNumber` in the given `unit`.

### `negate(): UnitizedNumber<T>`

Returns a new `UnitizedNumber` with the same units and negative value.

### `sub(subtrahend: UnitizedNumber<T>): UnitizedNumber<T>`

Returns `this - subtrahend` as a new `UnitizedNumber` in the same units as this.

### `mul(multiplicand: number): UnitizedNumber<T>`

Returns `this * multiplicand` as a new `UnitizedNumber` in the same units as this.

### `get isNegative(): boolean`

Returns `true` iff the numeric value is negative.

### `get isPositive(): boolean`

Returns `true` iff the numeric value is positive.

### `get isZero(): boolean`

Returns `true` iff the numeric value is 0.

### `get isNonzero(): boolean`

Returns `true` iff the numeric value is not 0.

### `mod(modulus: UnitizedNumber<T>): UnitizedNumber<T>`

Returns `this % modulus` as a `UnitizedNumber` in the same units as this.

### `abs(): UnitizedNumber<T>`

Returns a new `UnitizedNumber` with the same units and absolute value.

### `div(denominator: UnitizedNumber<T>): number`

Returns `this / denominator`.

### `div(denominator: number): UnitizedNumber<T>`

Returns `this / denominator` as a `UnitizedNumber` in the same units as this.

### `compare(other: UnitizedNumber<T>): number`

Returns `> 0` if `this > other`, `< 0` if `this < other`, and `0` otherwise.

## `class UnitType<T extends UnitType<T>>`

```js
import { UnitType } from '@speleotica/unitized'
```

A type of unit, for example length or angle or temperature.

### `convert(value: number, from: Unit<T>, to: Unit<T>): number`

Converts a value from one unit to another. The default implementation just returns

```js
to.fromBase(from.toBase(value))
```

If you want more precision you can use a `FactorTableUnitType` to provide a table of
conversion factors from one unit to another, or override this method in a derived class.

## `class Unit<T extends UnitType<T>>`

```js
import { Unit } from '@speleotica/unitized'
```

### `constructor(type: UnitType<T>, id: string, props)`

Props may have `fromBaseFactor` and `toBaseFactor`, which
will be used for the default `fromBase` and `toBase` implementations (which you may override in a derived class).

### `type: UnitType<T>`

The type of this unit.

### `id: string`

The unique id of this unit.

### `fromBase(value: number): number`

Converts the given number from this unit to the base unit. Only `UnitType` should call this method.
You may override this method in a derived class for nonlinear units.

### `toBase(value: number): number`

Converts the given number from the base unit to this unit. Only `UnitType` should call this method.
You may override this method in a derived class for nonlinear units.

## `class FactorTableUnitType<T extends FactorTableUnitType<T>> extends UnitType<T>`

```js
import { FactorTableUnitType } from '@speleotica/unitized'
```

A `UnitType` that uses a table of factors to more accurately convert from one unit to another
(instead of converting to some base unit as an intermediary).

### `constructor(factors: Record<string, Record<string, number>>)`

Factors is the conversion table, with unit `id`s as keys.
`value * factors[from.id][to.id]` is used to convert from one unit to another.
Not all pairs of units have to be included in the table; `convert` will fall back
to converting to the base unit as an intermediary if a factor isn't found in this table.
