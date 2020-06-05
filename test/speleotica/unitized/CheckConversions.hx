package speleotica.unitized;

import massive.munit.Assert;

class CheckConversions {
	public static function checkConversions<T:UnitType<T>>(epsilon:Float, values:Array<UnitizedNumber<T>>) {
		for (i in values) {
			for (j in values) {
				final converted = i.get(j.unit);
				final diff = Math.abs(converted - j.get(j.unit));
				if (diff > converted * epsilon) {
					Assert.fail('${values[i]} -> ${values[j]}: expected diff to be <= ${converted * epsilon}, was ${diff}');
				}
			}
		}
	}
}
