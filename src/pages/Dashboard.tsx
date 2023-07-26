import React, { FC, useEffect, useState } from "react";
import Http from "../helpers/Fetch";
import AuthUser from "../helpers/AuthUser";

import { AuthLayout, LoadingScreen } from "../components/layouts";
import { useNavigate, useParams } from "react-router-dom";

interface IChecklist {
	createdAt?: string,
	id?: number,
	name?: string,
	updatedAt?: string
}

const Dashboard: FC = () => {
	const user = AuthUser.GetAuth();
	const [checklistName, setChecklistName] = useState('')
	const [checklistData, setChecklistData] = useState<IChecklist[]>()

	const getChecklist = async() => {
		try {
			const {data} = await Http.get('/checklist', { headers: { 'Authorization': `Bearer ${user?.token}` } })
			setChecklistData(data.data);
		} catch (error) {
			console.log(error);
		}
	}

	const addChecklist = async() => {
		try {
			await Http.post('/checklist',{name: checklistName}, { headers: { 'Authorization': `Bearer ${user?.token}` } })
			getChecklist();
		} catch (error) {
			console.log(error);
		}
	}

	const deleteChecklist = async(id?: number) => {
		try {
			await Http.delete(`/checklist/${id}`, { headers: { 'Authorization': `Bearer ${user?.token}` } })
			getChecklist();
		} catch (error) {
			console.log(error);
		}
	}



	useEffect(() => {
		getChecklist()
	}, [])
	

	return (
		<AuthLayout>
			<div className="">
				<p>Checklist</p>
				<input onChange={(e)=>setChecklistName(e.target.value)} type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
				<button className="btn btn-primary" onClick={addChecklist}>Add</button>
				<div>
					{checklistData?.map((item: IChecklist) => 
						<ChecklistItem name={item.name} key={item.id} deleteId={(id)=>deleteChecklist(id)} id={item.id}/>
					)}
				</div>
			</div>
		</AuthLayout>
	)
}

interface ChecklistItemProps extends IChecklist{
	deleteId: (id?: number) => {}
}

const ChecklistItem: FC<ChecklistItemProps> =({name, id, deleteId})=>{
	const navigate = useNavigate()
	return (
		<>
		<div className="flex flex-row border-2 border-blue-400 justify-between items-center px-4 mx-4 my-1" >
			<div className=" flex-grow py-4" onClick={()=>navigate(`/checklist/${id}`)}>
				<div >{name}</div>
			</div>
			<button className="btn btn-primary my-2" onClick={()=>deleteId(id)}>Delete</button>
		</div>
		</>
	)
}

export default Dashboard;