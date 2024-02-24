import { IFormField } from '@/components/input-list';
import { firebase_app } from '@/config/firebase';
import {
	getFirestore,
	Firestore,
	addDoc,
	collection,
} from 'firebase/firestore';

const db: Firestore = getFirestore(firebase_app); //firestore api

export type AddDataResult = {
	result: any;
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
