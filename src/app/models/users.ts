export class User{
	
	id: Number
	nombre   : String
	apellido : String
	usuario  : Number
	password : String

	constructor(value: Object = {})
	{
		Object.assign(this,value)
	}

}