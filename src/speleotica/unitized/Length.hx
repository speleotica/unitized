package speleotica.unitized;

class Length extends FactorTableUnitType<Length> {
	public static final type = new Length();

	public static final kilometers = new Unit(Length.type, 'km', 0.001, 1000);
	public static final meters = new Unit(Length.type, 'm', 1, 1);
	public static final centimeters = new Unit(Length.type, 'cm', 100, 0.01);
	public static final feet = new Unit(Length.type, 'ft', 1 / 0.3048, 0.3048);
	public static final miles = new Unit(Length.type, 'mi', Length.feet.fromBaseFactor / 5280, Length.feet.toBaseFactor * 5280);
	public static final yards = new Unit(Length.type, 'yd', Length.feet.fromBaseFactor / 3, Length.feet.toBaseFactor * 3);
	public static final inches = new Unit(Length.type, 'in', Length.feet.fromBaseFactor * 12, Length.feet.toBaseFactor / 12);

	public function new() {
		super([
			'km' => ['m' => 1000, 'cm' => 100000],
			'm' => ['km' => 0.001, 'cm' => 100, 'ft' => 1 / 0.3048],
			'cm' => ['m' => 0.01, 'km' => 0.00001],
			'mi' => ['ft' => 5280],
			'yd' => ['ft' => 3, 'in' => 36],
			'ft' => ['m' => 0.3048, 'mi' => 1 / 5280, 'yd' => 1 / 3, 'in' => 12],
			'in' => ['yd' => 1 / 36, 'ft' => 1 / 12],
		]);
		addUnit(Length.kilometers);
		addUnit(Length.meters);
		addUnit(Length.centimeters);
		addUnit(Length.feet);
		addUnit(Length.miles);
		addUnit(Length.yards);
		addUnit(Length.inches);
	}
}
