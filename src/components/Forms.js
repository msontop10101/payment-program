import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';


const PaymentForm = ({ onSubmit }) => {
    return (
        <>
            <div className='bg-slate-500 mx-2 rounded'>
                <Formik
                    initialValues={{ name: '', amount: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = 'Required';
                        }
                        if (!values.amount) {
                            errors.amount = "Required";
                        }
                        return errors;
                    }}
                    onSubmit={(values, { resetForm }) => {
                        resetForm()
                        onSubmit(values)
                        // setSubmittedData({name:'Eliljah', amount:'89000'})
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className='flex justify-center'>
                                <div className='flex flex-col gap-y-2 w-[60%] p-4'>
                                    <div className='mb-4'>
                                        <h2 className="text-left text-base font-semibold leading-7 text-gray-900">Administrador!</h2>
                                        <p className="text-left mt-1 text-sm leading-6 text-gray-600">Esto solo es accesible para el administrador.</p>
                                    </div>
                                    <div className='flex flex-col gap-y-3 text-left'>
                                        <label className='block text-sm font-medium leading-6 text-gray-900'>Nombre</label>
                                        <Field className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-3 pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-[60%]' type="name" name="name" />
                                    </div>
                                    <div className='flex flex-col gap-y-3 text-left'>
                                        <label className='block text-sm font-medium leading-6 text-gray-900'>Cantidad($)</label>
                                        <Field className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-3 pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-[60%]' type="amount" name="amount" />
                                    </div>
                                    <div className="mt-6 flex items-center justify-end gap-x-6">
                                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
                                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">ahorrar</button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default PaymentForm