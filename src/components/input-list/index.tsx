'use client';

import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import moment from 'moment';
import Calendar from 'react-calendar';
import { FaCheck } from 'react-icons/fa';
import { Button } from '@chakra-ui/react';
import 'react-calendar/dist/Calendar.css';

//validation rule
const EntrySchema = Yup.object().shape({
	patient_name: Yup.string().required('Patient name is required'),
	patient_id: Yup.string().required('Patient id is required'),
	treatment_date: Yup.string().required('Date is required'),
	treatment_desc: Yup.array()
		.of(Yup.string())
		.min(1, 'Treatment Description field must have at least 1 items')
		.required('Treatment Description is required'),
	medications: Yup.array()
		.of(Yup.string())
		.min(1, 'Medications Prescribed field must have at least 1 items')
		.required('Medications Prescribed is required'),
	cost: Yup.number().required('Cost is required'),
});

//type of form
export type IFormType = {
	id: number;
	title?: string;
	placeholder?: string;
	name: keyof IFormField;
	type:
		| 'none'
		| 'text'
		| 'tel'
		| 'url'
		| 'email'
		| 'numeric'
		| 'decimal'
		| 'search'
		| 'file';
	isText?: boolean;
	isOption?: boolean;
	isDate?: boolean;
	isAttach?: boolean;
	icon?: any;
	options?: string[] | any[] | [];
	isOptionsMultiple?: boolean;
};

//type of field
export type IFormField = {
	patient_name: string;
	patient_id: number | string;
	treatment_date: string;
	treatment_desc: string | string[];
	medications: string | string[];
	cost: number | string;
};

//props of InputList
export type TInputList = {
	_onSubmitData: (data: IFormField) => void;
};

function InputList(props: TInputList) {
	const { _onSubmitData } = props;
	const [formList, setFormList] = useState<IFormType[]>([
		{
			id: 1,
			title: 'Patient Name',
			placeholder: 'John Doe',
			name: 'patient_name',
			type: 'text',
			isText: true,
		},
		{
			id: 2,
			title: 'Patient ID',
			placeholder: 'CID1234',
			name: 'patient_id',
			type: 'text',
			isText: true,
		},
		{
			id: 3,
			title: 'Treatment Date',
			placeholder: moment().format('DD MMMM YYYY'),
			name: 'treatment_date',
			type: 'text',
			isDate: false,
		},
		{
			id: 4,
			title: 'Treatment Description',
			placeholder: 'Treatment Description',
			name: 'treatment_desc',
			type: 'text',
			isText: false,
			isOption: false,
			options: [
				'Treatment Description 1',
				'Treatment Description 2',
				'Treatment Description 3',
			],
			isOptionsMultiple: true,
		},
		{
			id: 5,
			title: 'Medication Prescribed',
			placeholder: 'Medication Prescribed',
			name: 'medications',
			type: 'text',
			isText: false,
			isOption: false,
			options: ['Medication 1', 'Medication 2', 'Medication 3'],
			isOptionsMultiple: true,
		},
		{
			id: 6,
			title: 'Cost',
			placeholder: 'Cost',
			name: 'cost',
			type: 'decimal',
			isText: true,
		},
	]);

	const formik = useFormik({
		initialValues: {
			patient_name: '',
			patient_id: '',
			treatment_date: '',
			treatment_desc: [],
			medications: [],
			cost: 0,
		},
		validationSchema: EntrySchema,
		onSubmit: (values: IFormField) => {
			console.log('submitform', values);
			_onSubmitData(values);
			formik.resetForm();
		},
	});

	//form click function
	const _onFormClick = (key: IFormType, i: number) => {
		const dat = [...formList];
		if (key.name === 'treatment_desc' || key.name === 'medications') {
			dat[i].isOption = !dat[i].isOption;
			setFormList(dat);
		}
		if (key.name === 'treatment_date') {
			dat[i].isDate = !dat[i].isDate;
			setFormList(dat);
		}
	};

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.keyCode === 27) {
				const dat = [...formList];
				const findIdxOption = dat.findIndex((o) => o.isOption === true);
				const findIdxDate = dat.findIndex((o) => o.isDate === true);
				if (findIdxOption > -1) {
					dat[findIdxOption].isOption = false;
				}
				if (findIdxDate > -1) {
					dat[findIdxDate].isDate = false;
				}
				setFormList(dat);
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	//on options select
	const _onOptionSelect = (option: string, name: keyof IFormField) => {
		const existingValue = formik.values[name];
		let updatedValue: string | string[];

		if (Array.isArray(existingValue)) {
			if (existingValue.includes(option)) {
				updatedValue = existingValue.filter((item) => item !== option);
			} else {
				updatedValue = [...existingValue, option];
			}
		} else {
			updatedValue = [option];
		}

		formik.setFieldValue(name, updatedValue);
	};

	return (
		<div>
			<div className='grid grid-cols-1 gap-6 justify-center items-center w-full'>
				{formList.map((o: IFormType, i) => (
					<div
						key={o.id.toString()}
						className='flex-col justify-center items-start gap-2 inline-flex relative'>
						<div className='w-[343px] h-5 justify-center items-center inline-flex'>
							<div className='w-[343px] text-black text-base font-medium leading-tight'>
								{o.title}
							</div>
						</div>
						<div
							className='self-stretch h-10 px-4 bg-white bg-opacity-10 rounded-lg border border-stone-400 justify-between items-center inline-flex'
							onClick={() => _onFormClick(o, i)}>
							<input
								placeholder={o.placeholder}
								value={formik?.values[o.name].toString()}
								className='flex flex-1 grow shrink basis-0 bg-white text-stone-950 text-base font-medium leading-tight outline-none'
								type={o.type}
								disabled={o.isDate || o.isOption}
								onChange={(e) => {
									formik.setFieldValue(o.name, e.target.value);
								}}
							/>
							{!o.isText && (
								<div className='w-6 h-6 justify-center items-center flex'>
									<div className='w-6 h-6 relative'>{o.icon}</div>
								</div>
							)}
						</div>
						{formik?.errors[`${o.name}`] && formik?.touched[`${o.name}`] ? (
							<div className='text-red-500'>
								{formik.errors[`${o.name}`]?.toString()}
							</div>
						) : null}
						{o.isDate && (
							<div id={o.id.toString()} className='absolute top-[80px] z-50'>
								<Calendar
									onChange={(date: any) => {
										console.log('date selected', date);
										formik.setFieldValue(
											`${o.name}`,
											moment(date).format('DD MMM, YYYY')
										);
										_onFormClick(o, i);
									}}
									value={formik.values[o.name].toString()}
								/>
							</div>
						)}
						{o?.isOption && (
							<div className='absolute top-[80px] z-50 max-h-[250px] overflow-y-scroll bg-white p-4 shadow-md w-full cursor-pointer gap-4'>
								{o?.options?.map((opt) => (
									<div
										key={opt}
										className={
											'hover: text-bold flex row items-center justify-between h-[30px]'
										}
										onClick={() => {
											_onFormClick(o, i);
											_onOptionSelect(opt, o.name);
										}}>
										<div>{opt}</div>
										{formik.values[o.name]?.toLocaleString().includes(opt) && (
											<FaCheck color='green' />
										)}
									</div>
								))}
							</div>
						)}
					</div>
				))}
				<Button
					bgColor='#E73873'
					color='white'
					p={2}
					borderRadius='lg'
					onClick={() => formik.handleSubmit()}>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default InputList;
