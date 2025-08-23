import { FieldValue } from "@react-native-firebase/firestore";

export interface CommentModel {
    id: string | number;
    star: number
    text: string
    productId: string
    userId: string
    createdAt: FieldValue
    updateAt: FieldValue
  }
  