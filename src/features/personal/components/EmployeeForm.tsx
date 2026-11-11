import { employeeSchema, type EmployeeFormInput, type EmployeeFormValues } from '../schemas/employee.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { TextField } from '../../../components/ui/TextField';

export  function EmployeeForm() {
    const{
        register,
        handleSubmit,
        reset,
         formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
    },
    }= useForm<EmployeeFormInput, unknown, EmployeeFormValues>({
        resolver: zodResolver(employeeSchema),

        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            mobile: "",
            extension: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onBlur",
    });

    function onSubmit(values:EmployeeFormValues){
        console.log({
            mobile: values.mobile,
            extension: values.extension,
        })
    }
  return (
    <section aria-labelledby='employee-form-title'
        className='w-full max-w-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 rounded-3xl'
    >
        <header className='mb-8'>
            <p className='text-sm font-medium text-brand-600'>
                مدیریت پرسنل
            </p>
            <h1 
                id= "employee-form-title"
                className='mt-2 text-2xl font-bold text-slate-900'
            >
                ثبت اطلاعات کارمند
            </h1>
        </header>

        <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-8'
        >
            <fieldset className='min-w-0'>
                <legend className='mb-5 text-base font-medium text-slate-900'>
                    اطلاعات فردی
                </legend>
                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                    <TextField 
                        label="نام"
                        placeholder='مریم'
                        autoComplete='given-name'
                        required
                        error={errors.firstName?.message}
                        {...register("firstName")}
                    />
                    <TextField
                        label="نام خانوادگی"
                        placeholder="مثلاً احمدی"
                        autoComplete="family-name"
                        required
                        error={errors.lastName?.message}
                        {...register("lastName")}
                />
                </div>
            </fieldset>

            <fieldset className='min-w-0 border-t border-slate-100 pt-6'>
                <legend className='px-2 text-base font-medium text-slate-900'>اطلاعات تماس</legend>
                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                    <TextField
                        label='ایمیل'
                        type='email'
                        dir='ltr'
                        placeholder='maryam@example.com'
                        autoComplete='email'
                        required
                        error={errors.email?.message}
                        {...register("email")}
                    />
                    <TextField
                        label='شماره موبایل'
                        type="tel"
                        dir='ltr'
                        placeholder='09123456789'
                        autoComplete='tel'
                        hint='ارقام فارسی و انگلیسی پذیرفته میشوند'
                        required
                        error={errors.mobile?.message}
                        {...register("mobile")}
                    />
                    <TextField
                        label='شماره داخلی'
                        type='text'
                        inputMode='numeric'
                        dir="ltr"
                        placeholder='1234'
                        hint="دقیقا 4 رقم وارد کنید"
                        required
                        error={errors.extension?.message}
                        {...register("extension")}
                    />
                </div>
            </fieldset>
            <fieldset 
                className='min-w-0 border-t border-slate-100 pt-6'>
                <legend className='px-2 text-base font-semibold text-slate-900'>اطلاعات حساب کاربری</legend>
                <div className='grid grid-cols-1 gap-1 sm:grid-cols-2'>
                    <div className='sm:col-span-2'>
                        <TextField
                            label='نام کاربری'
                            dir='ltr'
                            placeholder='maryam_momeni'
                            autoComplete='none'
                            spellCheck={false}
                            hint='با حروف انگلیسی شروع کنید'
                            required
                            error={errors.username?.message}
                            {...register("username")}
                        />
                    </div>
                        <TextField
                            label='رمز عبور'
                            type='password'
                            dir="ltr"
                            autoComplete='new-password'
                            hint="بین 8 تا 10 کاراکتر وارد کنید"
                            required
                            error={errors.password?.message}
                            {...register("password")}
                        />
                        <TextField
                            label='تایید رمز عبور'
                            type='password'
                            dir='ltr'
                            autoComplete='new-password'
                            required
                            error={errors.confirmPassword?.message}
                            {...register("confirmPassword")}
                        />
                </div>
            </fieldset>
            <div className='flex flex-col border-t border-slate-100 sm:flex-row'>
                <button
                    type='submit'
                    disabled={isSubmitting}
                    className="min-h-12 m-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSubmitting ? "در حال بررسی ..." : "ثبت اطلاعات"}
                </button>
                <button
                    type='button'
                    onClick={()=>reset()}
                    disabled={isSubmitting}
                    className="min-h-12 m-2 rounded-xl border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                >پاک کردن فرم</button>
            </div>
            {isSubmitSuccessful &&(
                <p
                    role='status'
                    className='rounded-xl bg-green-50 text-sm leading-7 text-green-800'
                >اعتبار سنجی موفقیت آمیز بود</p>
            )}
        </form>
    </section>
  );
}
