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
const updatingToDo = () => {
	const options = {
		method: "PUT",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			"label": "string",
			"is_done": true
		})
	}

	fetch(url + "/todos/37", options)
		.then((resp) => resp.json())
		.then((data) => console.log("updated toDOs:", data))
}
const getAllUsers = () => {
	fetch(url + "/users/erick3294")
		.then(
			(resp) => {
				console.log("getAllUsersResponse", resp)
				return resp.json()
			}
		)
		.then(
			(data) => (console.log("get all users data", data))
		)
}


const Home = () => {

	const [newChore, setNewChores] = useState('');
	const [myTasks, setMyTasks] = useState(["Clean Room", "Clean Kitchen", "Wash Car", "Make Bed", "Dust"])
	const updateChoresArray = () => {
		setMyTasks([newChore, ...myTasks])
		setNewChores("")

	};

const getToDos = () => {
	console.log("getToDOs")
	fetch(url + "/users/erick3294")
		.then((resp) => { return resp.json() })
		.then((data) => { 
			setMyTasks(data.todos)
			console.log("dataUsers:", data.todos) })
}

const addToDo = (Label) => {
	let options = {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			"label": Label.label,
			"is_done": false
		})
	}
	fetch(url + "/todos/erick3294", options)
		.then((resp) => resp.json())
		.then((data) => {console.log("addToDo", data)
			getToDos()
		})
}
const deleteToDo = (ID) => {
	const options = {
		method: "DELETE",
		headers: { "content-type": "application/json" },

	}
	fetch(url + "/todos/" + ID, options)
		.then((resp) => resp.json())
		.then((data) => {console.log("deleteToDo:", data)
			getToDos()
		})
}

	useEffect(
		() => {
			createUser()
			getToDos()
			
		}, []
	);
	console.log("chores tag:", myTasks)

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
					value={newChore.label}
					className="add"
					type="text"
					placeholder="Add New task"					
					onChange={(e) => {
						const newTask = e.target.value
						setNewChores({label:newTask, is_done: false})
					}
					}
					onKeyDown={
						(e) => {
							if (e.key == "Enter") {
								updateChoresArray(newChore)
								addToDo(newChore)
							}
						}
					}

				/>

				<button onClick={() => {
					updateChoresArray(newChore)
								addToDo(newChore)
				}}>
					Add chore
				</button>
				{/* <button onClick={() => addToDo()}>Add to API</button>
				<button onClick={() => updatingToDo()}>update</button>
				<button onClick={() => deleteToDo()}>delete</button> */}
				<ul>
					<li className="things">
					{myTasks.map(
						(item, index) => {
							console.log("mapItem", item.id)
							return (
								<div>
									<li key={index + "chore"}>{item.label}
										<span className=" text-danger "
											onClick={() => {
												deleteToDo(item.id)
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