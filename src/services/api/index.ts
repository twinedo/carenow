import { IFormField } from '@/components/input-list';
import { firebase_app } from '@/config/firebase';
import {
	getFirestore,
	Firestore,
	addDoc,
	collection,
} from 'firebase/firestore';

const db: Firestore = getFirestore(firebase_app);
export type AddDataResult = {
	result: any; // Type of result from setDoc
	error: Error | null;
};

export default async function addDataPatients(
	data: IFormField
): Promise<AddDataResult> {
	let result = null;
	let error = null;

	try {
		result = await addDoc(collection(db, 'patients'), data);
	} catch (e: any) {
		error = e;
	}

	return { result, error };
}
