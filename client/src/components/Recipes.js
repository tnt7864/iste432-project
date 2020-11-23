import { Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const sampleData = [
	{
		name: "Brownie",
		desc: "Chocolate, crumbly, delicious"
	},
	{
		name: "Sweet Potato Pie",
		desc: "Good with whipped cream on top"
	},
	{
		name: "Spaghetti",
		desc: "With tomato sauce"
	},
	{
		name: "Tacos",
		desc: ""
	}
]

const populate = async () => {
	for(let item of sampleData){
		await fetch("/api/recipe", {
			method: "POST",
			body: JSON.stringify(item),
			headers: {
				"Content-Type": "application/json"
			}
		})
	}
}

export const Recipes = () => {
	const [data, setData] = useState()
	const [loaded, setLoaded] = useState()
	
	useEffect(() => {(async () => {
		if(loaded && data && data.length){
			return;
		}
		
		if(!loaded){
			setLoaded(true);
		}else if(data && !data.length){
			await populate();
		}else{
			return;
		}
		const res = await fetch("/api/recipe");
		if(!res.ok){
			return;
		}
		
		try{
			setData(await res.json())
		}catch{}
		
	})()}, [loaded, data])
	
	if(!data){
		return <></>
	}
	
	return <div style={{ padding: "2rem", display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}>
		{data && data.map((item, index) => {
			return <Paper key={item.RecipeID} style={{ padding: "1rem", margin: "1rem", minWidth: "20rem" }}>
				<Typography variant="h4">{item.name}</Typography>
				<Typography variant="h6">{item.desc}</Typography>
			</Paper>
		})}
	</div>
}