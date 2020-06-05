package speleotica.unitized;

class Unit<T:UnitType<T>> {
	public final type:T;
	public final id:String;
	public final fromBaseFactor:Float;
	public final toBaseFactor:Float;

	public function new(type:T, id:String, ?fromBaseFactor:Float, ?toBaseFactor:Float) {
		this.type = type;
		this.id = id;
		this.fromBaseFactor = fromBaseFactor != null ? fromBaseFactor : Math.NaN;
		this.toBaseFactor = toBaseFactor != null ? toBaseFactor : Math.NaN;
	}

	public function fromBase(value:Float):Float {
		return value * fromBaseFactor;
	}

	public function toBase(value:Float):Float {
		return value * toBaseFactor;
	}

	public function toString():String {
		return this.id;
	}
}
