package speleotica.unitized;

import massive.munit.Assert;

class CheckConversions {
	public static function checkConversions<T:UnitType<T>>(epsilon:Float, values:Array<UnitizedNumber<T>>) {
		for (i in values) {
			for (j in values) {
				final diff = Math.abs(i.get(j.unit) - j.get(j.unit));
				if (diff > i.get(j.unit) * epsilon) {
					Assert.fail('expected diff to be less than ${i.get(j.unit) * epsilon}');
				}
			}
		}
	}
}
