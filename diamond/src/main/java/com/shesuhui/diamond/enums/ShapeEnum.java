package com.shesuhui.diamond.enums;

public enum ShapeEnum {
	ROUND("Round", "圆形"), PEAR("Pear", "梨形"), Princess("Princess", "公主方"), Marquise(
		    "Marquise", "马眼形"),  Emerald("Emerald", "祖母绿"), Sq_Emerald(
		    "Sq.Emerald", "祖母绿"),  Asscher("Asscher", "Asscher"), Oval("Oval", 
		    "椭圆形"),  Radiant("Radiant", "雷迪恩"), Sq_Radiant("Sq.Radiant", "雷迪恩"), Trilliant(
		    "Trilliant", "三角形"),  Heart("Heart", "心形"), European_Cut(
		    "EuropeanCut", "EuropeanCut"),  Old_Miner("OldMiner", "OldMiner"), Flanders(
		    "Flanders", "Flanders"),  Cushion_Brilliant("CushionBrilliant", "垫形"), Cushion_Modified(
		    "CushionModified", "垫形"),  Baguette("Baguette", "Baguette"), Tapered_Baguette(
		    "TaperedBaguette", "TaperedBaguette"),  Kite("Kite", "Kite"), Star(
		    "Star", "Star"),  Other("Others", "其他"), Half_Moon("HalfMoon", 
		    "HalfMoon"),  Trapezoid("Trapezoid", "Trapezoid"), Bullets(
		    "Bullets", "Bullets"),  Hexagonal("Hexagonal", "Hexagonal"), Lozenge(
		    "Lozenge", "Lozenge"),  Pentagonal("Pentagonal", "Pentagonal"), Rose(
		    "Rose", "Rose"),  Shield("Shield", "Shield"), Square("Square", 
		    "Square"),  Triangular("Triangular", "Triangular"), Briolette(
		    "Briolette", "Briolette"),  Octagonal("Octagonal", "Octagonal"), Calf(
		    "Calf", "Calf"),  Tapered_Bullet("TaperedBullet", "TaperedBullet");
	
	private String cnName = null;
	private String name=null;
	
	private ShapeEnum(String name,String cnName) {
		this.cnName = cnName;
	}

	public String getCNName(){
		return this.cnName;
	}
	
	public String getName(){
		return this.name;
	}



}
