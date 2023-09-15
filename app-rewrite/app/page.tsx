"use client";

import { useState } from "react";



// reactstrap components
import React from "react";
//import { Alert } from "reactstrap";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from "react-bootstrap";




export default function ContactForm() {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(true);
	const [paraphrazed, setParaphrazed] = useState<string>('');
	const [warningAlert, setWarningAlert] = React.useState(false);
	const [warningText, setWarningText] = useState<string>('');
	
	

	async function handleSubmit(event: any) {
		event.preventDefault();
		setLoading(true);
		setWarningAlert(false);

		const data = {
			query_string: String(event.target.query_string.value),
		};


		const response = await fetch("/api/rewrite", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const data_result = await response.json()	

		
		//console.log(data_result.error);
		


		if (response.ok) {
			//console.log("Query sent successfully");
			setLoading(false);

			
			// ERR
			if (typeof data_result.error !== 'undefined') {
				setWarningText(data_result.error);
				setWarningAlert(true);				
			}

			// GOOD
			if (typeof data_result.paraphrased_text !== 'undefined') {
				setParaphrazed(data_result.paraphrased_text);
				setResult(false);
			}
			
		}
		
		if (!response.ok) {
			//console.log("Error sending message");
			
			setLoading(false);

			setWarningText("Internal Server Error. Can't connect to n8n");
			setWarningAlert(true);
		}
	}
	
	
	
	return (
		<div>
		
		    <Alert color="warning" show={ warningAlert } className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
				<span className="alert-icon">
					<i className="ni ni-like-2"></i>
				</span>
				<span className="alert-text">
				<strong>Error!</strong>{" "}
					{warningText}
				</span>
				<button
					type="button"
					className="close"
					data-dismiss="alert"
					aria-label="Close"
					onClick={() => {setWarningAlert(false)}}
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</Alert>
		
		
		
			<div className="container">

	  
				<form onSubmit={handleSubmit}>
			    
					<div className="row">
						<h3 className="form-header">NLPCloud Paraphrazer</h3>
					</div>
		  
		  
					<div className="row">
						<label className="font-bold text-gray-800" htmlFor="query_string">
							Input Text
						</label>
						<textarea
							rows={7}
							required
							minLength={5}
							maxLength={process.env.max_str_length}
							placeholder="The quick brown fox jumps over the lazy dog"
							//value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
							name="query_string"
							className="w-full p-4 bg-gray-50 border border-gray-100 "
						/>
					</div>
				
					<div className="row">
						<button
							type="submit"
							disabled={loading}
							className="px-4 py-2 w-50 bg-gray-700 disabled:bg-gray-400 disabled:text-gray-100 text-white font-medium mt-4">
							Paraphrase Text
						</button>
					</div>
			
					<div className="row mt-10">
						<label className="font-bold text-gray-800" htmlFor="paraphrased_text">
							Output Text
						</label>
						<textarea
							disabled={result}
							rows={7}
							placeholder=""
							name="paraphrased_text"
							className="w-full p-4 bg-gray-50 border border-gray-100 "
							value={paraphrazed}
							placeholder="Output"
						/>
					</div>
		
			
				</form>
			</div>
		
		</div>
	);
}