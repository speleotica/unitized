package speleotica.unitized;

class FactorTableUnitType<T:FactorTableUnitType<T>> extends UnitType<T> {
	private final factors:Map<String, Map<String, Float>>;

	public function new(factors:Map<String, Map<String, Float>>) {
		this.factors = factors;
	}

	private override function addUnit(unit:Unit<T>) {
		if (factors[unit.id] == null)
			factors[unit.id] = new Map();
		factors[unit.id][unit.id] = 1;
		units.set(unit.id, unit);
	}

	public override function convert(value:Float, from:Unit<T>, to:Unit<T>):Float {
		final factor0 = factors[from.id];
		if (factor0 == null)
			return super.convert(value, from, to);
		final factor = factor0[to.id];
		if (factor != null)
			return value * factor;
		return super.convert(value, from, to);
	}
}
