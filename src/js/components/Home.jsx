import React, { useEffect, useState } from "react";
import "./Lists.css"


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { renderIntoDocument } from "react-dom/test-utils";

const url = "https://playground.4geeks.com/todo"

const createUser = () => {
	const options = {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			"name": "erick3294",
			"id": 0
		})
	}
	fetch("https://playground.4geeks.com/todo/users/erick3294", options)
		.then((r) => r.json())
		.then((d) => console.log("creater-user-data", d))

}
const getAllUsers = () => {
	fetch(url + "/users")
		.then(
			(resp) => {
				console.log("response:", resp)
				return resp.json()
			}
		)
		.then(
			(data) => (console.log("data:", data))
		)
}
const addToDo = ()=>{
	let options = {
		method:"POST",
		headers:{"content-type":"application/json"},
		body: JSON.stringify({
			"label": "clean the pool",
			"is_done":false
			

		})
	}
	fetch(url+"/todos/erick3294", options)
	.then((resp)=>resp.json()) 
	.then((data)=> console.log("addToDo", data))
}



const getToDos = () => {
	fetch( url + "/users/erick3294")
		.then((resp) => { return resp.json() })
		.then((data) => { console.log("dataUsers:", data) })
}


//create your first component
const Home = () => {
	useEffect(
		() => {
			addToDo()
			getToDos()
			createUser()
		}, []
	)


	const [newChore, setNewChores] = useState('');
	const [myTasks, setMyTasks] = useState(["Clean Room", "Clean Kitchen", "Wash Car", "Make Bed", "Dust"])
	const nextChore = () => {
		setMyTasks([newChore, ...myTasks])
		setNewChores("")

	}
	const deleteTask = (item) => {
		const filteredTasks = myTasks.filter(
			(choreData) => choreData != item
		)
		console.log("dust: ", filteredTasks)
		setMyTasks(filteredTasks)
	}
	return (
		<div className="text-center container">
			<h1>To Do List</h1>
			<div className="toDo container-fluid">
				<input
					value={newChore}
					className="add"
					type="text"
					placeholder="Add New task"

					onChange={(e) => {
						const newTask = e.target.value
						setNewChores(newTask)
					}
					}
					onKeyDown={
						(e) => {
							if (e.key == "Enter") {
								nextChore(newChore)
							}
						}
					}

				/>

				<button onClick={() => nextChore()}>
					Add chore
				</button>
				<button onClick={()=> addToDo()}>Add to API</button>
				<ul>
					<li className="things">{myTasks.map(
						(item, index) => {
							return (
								<div>
									<li key={index + "chore"}>{item}
										<span className=" text-danger "
											onClick={() => {
												deleteTask(item)
											}
											}
										>X</span>
									</li>

								</div>
							)
						}
					)}
					</li>
				</ul>
			</div>
		</div >
	);
};

export default Home;