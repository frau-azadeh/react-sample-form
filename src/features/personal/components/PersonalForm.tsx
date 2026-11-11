import React from 'react'
import { useForm } from 'react-hook-form'
import { type PersonalFormValues, personalSchema } from '../schemas/personal.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '../../../components/ui/TextField'

export  function PersonalForm() {
    const {
        register,
        handleSubmit,
        formState:{errors, isSubmitSuccessful},
    } = useForm<PersonalFormValues>({
        resolver:zodResolver(personalSchema),
        defaultValues:{
            firstName:"",
            lastName:"",
        },
        mode: "onBlur"
    })
    function onSubmit(values: PersonalFormValues){
        console.log(values);
    }
  return (
    <section 
        aria-labelledby='personal-title'
        className='w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8'
    >
        <header className='mb-8'>
            <h1
                id="personal-title"
                className='text-2xl font-bold text-slate-500'
            >
                اطلاعات پرسنلی
            </h1>
            <p className='mt-3 text-sm leading-7 text-slate-500'>
                اطلاعات خود را وارد نمایید.
            </p>
        </header>
        <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <TextField
                    label="نام"
                    placeholder='مریم'
                    autoComplete='given-name'
                    required
                    error={errors.firstName?.message}
                    {...register("firstName")}
                />

                <TextField
                    label='نام خانوادگی'
                    placeholder='مومنی'
                    autoComplete='family-name'
                    required
                    error={errors.lastName?.message}
                    {...register("lastName")}
                />
            </div>

            <button
                type='submit'
                className='min-h-12 w-full rounded-xl bg-brand-600 mt-5 px-6 py-3 text-sm font-semibold text-white transition-colors  hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20 sm:w-auto'
            >
                ثبت اطلاعات
            </button>
            {isSubmitSuccessful && (
                <p role='status' className='text-sm leading-7 text-green-700'>اعتبار سنجی با موفقیت ذخیره گردید.</p>
            )}
        </form>
    </section>
  )
}
