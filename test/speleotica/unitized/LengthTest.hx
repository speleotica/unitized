package speleotica.unitized;

import massive.munit.Assert;

/**
 * Auto generated ExampleTest for MassiveUnit.
 * This is an example test class can be used as a template for writing normal and async tests
 * Refer to munit command line tool for more information (haxelib run munit)
 */
class LengthTest {
	public function new() {}

	@BeforeClass
	public function beforeClass():Void {}

	@AfterClass
	public function afterClass():Void {}

	@Before
	public function setup():Void {}

	@After
	public function tearDown():Void {}

	@Test
	public function imperialTests() {
		CheckConversions.checkConversions(0, [Unitize.yards(2), Unitize.feet(6), Unitize.inches(72)]);
	}

	@Test
	public function metricTests() {
		CheckConversions.checkConversions(0, [Unitize.kilometers(1.6), Unitize.meters(1600), Unitize.centimeters(160000)]);
	}

	@Test
	public function mixedTests() {
		CheckConversions.checkConversions(1e-8, [
			Unitize.kilometers(0.0003048),
			Unitize.meters(0.3048),
			Unitize.centimeters(30.48),
			Unitize.miles(1 / 5280),
			Unitize.yards(1 / 3),
			Unitize.feet(1),
			Unitize.inches(12),
		]);
	}
}
