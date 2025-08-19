import React, { useState } from "react";
import "./Lists.css"


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { renderIntoDocument } from "react-dom/test-utils";

//create your first component
const Home = () => {
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
			value ={newChore}
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