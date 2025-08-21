import { collection, FieldPath, FirebaseFirestoreTypes, getDocs, query, where } from "@react-native-firebase/firestore";
import { db } from "../../firebase.config";
import { SetStateAction } from "react";

export const getDocWhere = async ({
    nameCollect,
    condition,
    setData
}: {
    nameCollect: string,
    condition: {
        fieldPath: string | FieldPath,
        opStr: FirebaseFirestoreTypes.WhereFilterOp,
        value: unknown
    } | null,
    setData: SetStateAction<any>
}) => {
    const q = condition && query(
        collection(db, nameCollect),
        where(condition.fieldPath, condition.opStr, condition?.value)
    );

    const querySnapshot = await getDocs(q)
    const items: any = []
    querySnapshot.forEach((doc: any) => {
        items.push({
            id: doc.id,
            ...doc.data()
        })
    })
    setData(items[0])
}