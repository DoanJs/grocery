import { collection, FieldPath, FirebaseFirestoreTypes, onSnapshot, query, where } from "@react-native-firebase/firestore";
import { SetStateAction } from "react";
import { db } from "../../firebase.config";

export const getDataOnSnapshot = async (
    {
        condition,
        nameCollect,
        setData
    }: {
        condition: {
            fieldPath: string | FieldPath,
            opStr: FirebaseFirestoreTypes.WhereFilterOp,
            value: unknown
        } | null,
        nameCollect: string,
        setData: SetStateAction<any>
    }) => {



    const q = condition ?
        query(collection(db, nameCollect),
            where(condition.fieldPath, condition.opStr, condition.value)
        )
        : query(
            collection(db, nameCollect),
            // where('uids', 'array-contains', user?.uid),
        );

    await onSnapshot(q, doc => {
        if (doc.empty) {
            console.log(`Data not found`);
        } else {
            const items: any = [];

            doc.forEach((item: any) => {
                items.push({
                    id: item.id,
                    ...item.data(),
                });
            });

            setData(items);
        }
    });
};