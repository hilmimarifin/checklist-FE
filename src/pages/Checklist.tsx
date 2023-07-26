import React, { FC, useEffect, useState } from "react";
import Http from "../helpers/Fetch";
import AuthUser from "../helpers/AuthUser";

import { AuthLayout, LoadingScreen } from "../components/layouts";
import { useParams } from "react-router-dom";

interface IChecklistItem {
    createdAt?: string,
    id?: number,
    itemName?: string,
    checklistId?: number,
    updatedAt?: string
}

const ChecklistPage: FC = () => {
    const user = AuthUser.GetAuth();
    const params = useParams()
    const [checklistName, setChecklistName] = useState('')
    const [checklistData, setChecklistData] = useState<IChecklistItem[]>()

    const getChecklistItems = async () => {
        try {
            const { data } = await Http.get(`/checklist/${params.checklistId}/item`, { headers: { 'Authorization': `Bearer ${user?.token}` } })
            setChecklistData(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const addChecklist = async () => {
        try {
            await Http.post(`/checklist/${params.checklistId}/item`, { itemName: checklistName }, { headers: { 'Authorization': `Bearer ${user?.token}` } })
            getChecklistItems();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteChecklist = async (id?: number) => {
        try {
            await Http.delete(`/checklist/${params.checklistId}/item/${id}`, { headers: { 'Authorization': `Bearer ${user?.token}` } })
            getChecklistItems();
        } catch (error) {
            console.log(error);
        }
    }
    const renameChecklistItem = async (name?: string, id?: number) => {
        try {
            console.log('lihat data', name, id);

            await Http.put(`/checklist/${params.checklistId}/item/rename/${id}`, { itemName: name }, { headers: { 'Authorization': `Bearer ${user?.token}` } })
            getChecklistItems();
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getChecklistItems()
    }, [])


    return (
        <AuthLayout>
            <div className="">
                <p>Checklist</p>
                <input onChange={(e) => setChecklistName(e.target.value)} type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
                <button className="btn btn-primary" onClick={addChecklist}>Add</button>
                <div>
                    {checklistData?.map((item: IChecklistItem) =>
                        <ChecklistItem itemName={item.itemName} key={item.id} editChecklistItemName={(name, id) => renameChecklistItem(name, id)} deleteId={(id) => deleteChecklist(id)} id={item.id} />
                    )}
                </div>
            </div>
        </AuthLayout>
    )
}

interface ChecklistItemProps extends IChecklistItem {
    deleteId: (id?: number) => {}
    editChecklistItemName: (itemName?: string, id?: number) => {}
}

const ChecklistItem: FC<ChecklistItemProps> = ({ itemName, id, deleteId, editChecklistItemName }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [itemNameEdited, setitemNameEdited] = useState(itemName)
    const handleSave = (id?: number) => {
        setIsEdit(false)
        editChecklistItemName(itemNameEdited, id)
    }
    return (
        <>
            <div className="flex flex-row border-2 border-blue-400 justify-between items-center px-4 mx-4 my-1" >
                <div className=" flex-grow py-4">
                    {isEdit ? <input type="text" defaultValue={itemNameEdited} onChange={(e) => setitemNameEdited(e.target.value)} className="input input-bordered input-primary w-full max-w-xs" />
                        : <div >{itemName}</div>}

                </div>
                {isEdit ? <button className="btn btn-success my-2" onClick={() => handleSave(id)}>Save</button> : <button className="btn btn-primary my-2" onClick={() => setIsEdit(true)}>Edit</button>
                }
                {isEdit ? <button className="btn btn-primary my-2" onClick={() => setIsEdit(false)}>Cancel</button> : <button className="btn btn-error my-2" onClick={() => deleteId(id)}>Delete</button>
                }

            </div>
        </>
    )
}

export default ChecklistPage;