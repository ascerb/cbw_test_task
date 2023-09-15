

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {



	try {
		const body = await request.json();

		if (typeof body.query_string === 'undefined') {
			throw new Error("Empty query string");
		}
		
		const query_string = body.query_string.trim();
	
		if (query_string.length > process.env.max_str_length){
			throw new Error("Too long query string");
		}

				
				
		const result = await fetch("http://" + process.env.api_host + ":5678/webhook/rewrite-gpt", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Basic Y2J3OnBhc3M=",
			},
			body:  JSON.stringify({"query_string":query_string}),
		});
	
	
		const data = await result.json()	
		
		return NextResponse.json(data);

	} catch(error){
		console.log(error);
		
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
	
	

}


