import { doc, getDoc } from "@react-native-firebase/firestore";
import { db } from "../../firebase.config";
import { SetStateAction } from "react";

export const getDocByID = async (
    {
        id,
        nameCollect,
        setData
    }: {
        id: string,
        nameCollect: string,
        setData: SetStateAction<any>
    }) => {
    const docSnap = await getDoc(doc(db, nameCollect, id));
    if (docSnap.exists()) {
        setData({
            ...docSnap.data(),
            id: docSnap.id
        })
    } else {
        console.log(`getDoc taskDetail error`);
    }
};