export class Url{
	
	id: Number
	original_url: String
	short_url   : String
	user_id     : Number
	createdAt   : String

	constructor(value: Object = {})
	{
		Object.assign(this,value)
	}

}