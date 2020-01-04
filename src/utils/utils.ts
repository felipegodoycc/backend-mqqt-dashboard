import _ = require("lodash");
import { integer } from "aws-sdk/clients/lightsail";

export function decodeOID(objectID:string):{ets:integer,mid:integer,pid:integer,uid:integer,fts:string}{
	/**
	 * @returns ets: (int)  Epoch TimeStamp
	 * @returns fts: (str)  Formatted TimeStamp
	 * @returns mid: (int)  Machine ID
	 * @returns pid: (int)  Process ID
	 * @returns uid: (int)  Unique ID 
	 */
	let data = {} as any;
	data["ets"] = parseInt(objectID.substr(0,8),16);
	data["mid"] = parseInt(objectID.substr(8,6),16);
	data["pid"] = parseInt(objectID.substr(14,4),16);
	data["uid"] = parseInt(objectID.substr(18,6),16);
	let d = new Date(0);
	d.setUTCSeconds(data.ets);
	data["fts"] = d.toISOString();
  
	return data
  }

export function decodeDate(meta_date:string){
	let data = {} as any;
	meta_date = meta_date.replace('D:','')
	data["year"] = meta_date.substr(0,4)
	data["month"] = meta_date.substr(4,2)
	data["day"] = meta_date.substr(6,2)
	data["hours"] = meta_date.substr(8,2)
	data["minutes"] = meta_date.substr(10,2)
	data["seconds"] = meta_date.substr(12,2)
	data["tz"] = meta_date.substr(14,3)

	return data
}

export function jsonToDate(json_date):Date{
	let date = new Date(json_date.year,
						json_date.month,
						json_date.day,
						json_date.hours,
						json_date.minutes,
						json_date.seconds,
						0)

	date.setHours(date.getHours()-Number(json_date.tz))
	return date
}

export function decodeDateMetadata(meta_date){
	return jsonToDate(decodeDate(meta_date))
}

export function checkModify(created_meta:string,updated_meta:string): Promise<Boolean>{
	return new Promise( (resolve, reject) => {
		let created = Number(jsonToDate(decodeDate(created_meta)))
		let updated = Number(jsonToDate(decodeDate(updated_meta)))
		const second_threshold = 5
		const diff = (updated-created)/(1000)
		return resolve(Math.abs(diff) > second_threshold)
	})
	
}