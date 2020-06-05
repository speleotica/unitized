package speleotica.unitized;

class UnitizedNumber<T:UnitType<T>> {
	private final value:Float;

	public final unit:Unit<T>;

	public function new(value:Float, unit:Unit<T>) {
		this.value = value;
		this.unit = unit;
	}

	public function get(unit:Unit<T>):Float {
		return unit == this.unit ? value : this.unit.type.convert(value, this.unit, unit);
	}

	public function add(addend:UnitizedNumber<T>):UnitizedNumber<T> {
		return new UnitizedNumber(value + addend.get(unit), unit);
	}

	public function isFinite():Bool {
		return Math.isFinite(value);
	}

	public function isInfinite():Bool {
		return Math.isInfinite(value);
	}

	public function isNaN():Bool {
		return Math.isNaN(value);
	}

	public function in (unit : Unit<T>):UnitizedNumber<T> {
		return new UnitizedNumber(get(unit), unit);
	}

	public function negate():UnitizedNumber<T> {
		return new UnitizedNumber(-value, unit);
	}

	public function sub(subtrahend:UnitizedNumber<T>):UnitizedNumber<T> {
		return new UnitizedNumber(value - subtrahend.get(unit), unit);
	}

	public function mul(multiplicand:Float):UnitizedNumber<T> {
		return new UnitizedNumber(value * multiplicand, unit);
	}

	public function isNegative():Bool {
		return value < 0;
	}

	public function isPositive():boolean {
		return value > 0;
	}

	public function isZero():boolean {
		return value == 0;
	}

	public function isNonzero():boolean {
		return value != = 0;
	}

	public function mod(modulus:UnitizedNumber<T>):UnitizedNumber<T> {
		const newValue = value % modulus.get(unit);
		return newValue == value ? this : new UnitizedNumber(newValue, unit);
	}

	public function abs():UnitizedNumber<T> {
		return value < 0 ? negate() : this;
	}

	public function div(denominator:Float):UnitizedNumber<T> {
		return new UnitizedNumber(value / denominator, unit);
	}

	public function divUnitless(denominator:UnitizedNumber<T>):Float {
		return value / denominator.get(unit);
	}

	public function compare(other:UnitizedNumber<T>):Float {
		const otherValue = other.get(unit);
		const result = value - otherValue;
		return Math.isNaN(result) ? 0 : result;
	}

	public function toString():string {
		return '${value} ${String(unit)}';
	}
}
