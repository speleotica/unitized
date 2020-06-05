package speleotica.unitized;

class Unitize {
	private function new() {}

	public static function meters(value:Float)
		return new UnitizedNumber(value, Length.meters);

	public static function centimeters(value:Float)
		return new UnitizedNumber(value, Length.centimeters);

	public static function kilometers(value:Float)
		return new UnitizedNumber(value, Length.kilometers);

	public static function feet(value:Float)
		return new UnitizedNumber(value, Length.feet);

	public static function inches(value:Float)
		return new UnitizedNumber(value, Length.inches);

	public static function yards(value:Float)
		return new UnitizedNumber(value, Length.yards);

	public static function miles(value:Float)
		return new UnitizedNumber(value, Length.miles);
}
