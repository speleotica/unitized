package speleotica.unitized;

class Length extends FactorTableUnitType<Length> {
	public static final type = new Length();

	public static final kilometers:Unit<Length> = type.get('km');
	public static final meters:Unit<Length> = type.get('m');
	public static final centimeters:Unit<Length> = type.get('cm');
	public static final feet:Unit<Length> = type.get('ft');
	public static final miles:Unit<Length> = type.get('mi');
	public static final yards:Unit<Length> = type.get('yd');
	public static final inches:Unit<Length> = type.get('in');

	private function new() {
		super([
			'km' => ['m' => 1000, 'cm' => 100000],
			'm' => ['km' => 0.001, 'cm' => 100, 'ft' => 1 / 0.3048],
			'cm' => ['m' => 0.01, 'km' => 0.00001],
			'mi' => ['ft' => 5280],
			'yd' => ['ft' => 3, 'in' => 36],
			'ft' => ['m' => 0.3048, 'mi' => 1 / 5280, 'yd' => 1 / 3, 'in' => 12],
			'in' => ['yd' => 1 / 36, 'ft' => 1 / 12],
		]);
		final feet = new Unit(this, 'ft', 1 / 0.3048, 0.3048);
		addUnit(new Unit(this, 'km', 0.001, 1000));
		addUnit(new Unit(this, 'm', 1, 1));
		addUnit(new Unit(this, 'cm', 100, 0.01));
		addUnit(feet);
		addUnit(new Unit(this, 'mi', feet.fromBaseFactor / 5280, feet.toBaseFactor * 5280));
		addUnit(new Unit(this, 'yd', feet.fromBaseFactor / 3, feet.toBaseFactor * 3));
		addUnit(new Unit(this, 'in', feet.fromBaseFactor * 12, feet.toBaseFactor / 12));
	}
}
