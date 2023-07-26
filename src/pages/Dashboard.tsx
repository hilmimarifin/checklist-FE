import React, { FC, useEffect, useState } from "react";
import Http from "../helpers/Fetch";
import AuthUser from "../helpers/AuthUser";

import { AuthLayout, LoadingScreen } from "../components/layouts";

const Dashboard: FC = () => {
	const user = AuthUser.GetAuth();
	const [checklistName, setChecklistName] = useState({name:''})

	const GetCurrentUser = async () => {
		try {
			const res = await Http.get("/user/current-user", { headers: { 'Authorization': `Bearer ${user?.token}` } });

			console.log(res.data);
		} catch (error:any) {
			console.log(error);
		}
	};

	const getChecklist = async() => {
		try {
			const data = await Http.get('/checklist', { headers: { 'Authorization': `Bearer ${user?.token}` } })
			console.log(data);
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
			</div>
		</AuthLayout>
	)
}

export default Dashboard;