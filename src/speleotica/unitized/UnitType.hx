package speleotica.unitized;

class UnitType<T:UnitType<T>> {
	private final units = new Map<String, Unit<T>>();

	private function addUnit(unit:Unit<T>) {
		units.set(unit.id, unit);
	}

	public function convert(value:Float, from:Unit<T>, to:Unit<T>):Float {
		if (from == to)
			return value;
		return to.fromBase(from.toBase(value));
	}
}
