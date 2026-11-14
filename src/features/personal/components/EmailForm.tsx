import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema, type formValue } from '../schemas/form.schema'

export default function EmailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit: SubmitHandler<formValue> = (data) => {
    console.log(data)
  }

  return (
    <main
      dir="rtl"
      className="flex  items-center justify-center  px-4 py-8 sm:px-6"
    >
      <section
        aria-labelledby="form-title"
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <header className="mb-8">
          <h1
            id="form-title"
            className="text-xl font-bold text-slate-900 sm:text-2xl"
          >
            ثبت ایمیل
          </h1>

          <p className="mt-2 text-sm leading-7 text-slate-500">
            آدرس ایمیل خود را وارد کنید و دکمه ارسال را بزنید.
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              ایمیل
              <span aria-hidden="true" className="mr-1 text-rose-500">
                *
              </span>
            </label>

            <input
              id="email"
              type="email"
              dir="ltr"
              autoComplete="email"
              placeholder="you@example.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email')}
              className={`block min-h-12 w-full rounded-xl border bg-white px-4 py-3 text-left text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                errors.email
                  ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-100'
                  : 'border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
            />

            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="mt-2 text-sm leading-6 text-rose-600"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 active:bg-indigo-800"
          >
            ارسال
          </button>
        </form>
      </section>
    </main>
  )
}