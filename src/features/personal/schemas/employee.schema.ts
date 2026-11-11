import z from "zod";

function normalizeDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)),
    )
    .replace(/[٠-٩]/g, (digit) =>
      String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)),
    );
}

const employeeNameSchema = z
    .string()
    .trim()
    .min(2, "حداقل دو کاراکتر وارد کنید")
    .max(50,"حداکثر 50 کاراکتر مجاز میباشد");
const employeeMobileSchema = z 
    .string()
    .trim()
    .transform(normalizeDigits)
    .pipe(
        z.string().regex(
            /^09[0-9]{9}$/,
            "شماره موبایل باید 11 رقم باشد و با 09 شروع شود"
        ),
    );
const employeeExtensionSchema = z
    .string()
    .trim()
    .transform(normalizeDigits)
    .pipe(
        z.string().regex(
            /^[0-9]{4}$/,
        ),
    );
const employeePasswordSchema = z 
    .string()
    .min(8,"رمز عبور باید حداقل 8 کاراکتر باشد")
    .max(10, "رمز عبور نباید بیشتر از 10 کاراکتر باشد");
export const employeeSchema = z
    .object({
        firstName: employeeNameSchema,
        lastName: employeeNameSchema,
        username: z 
            .string()
            .trim()
            .min(3, "نام کاربردی باید حداقل 3 کاراکتر باشد")
            .max(30, "نام کاربری نباید بیش از 30 کاراکتر باشد")
            .regex(
               /^[a-zA-Z][a-zA-Z0-9_]*$/,
               "با حروف انگلیسی شروع کنید! فقط حروف انگلیسی مجاز میباشد و زیر خط مجاز است"
            ),
        email: z
            .string()
            .trim()
            .pipe(
                z.email({
                    error: "ایمیل معتبر وارد کنید"
                }),
            ),
        mobile: employeeMobileSchema,
        extension: employeeExtensionSchema,
        password: employeePasswordSchema,

        confirmPassword: z
            .string()
            .min(1,"تایید رمز عبور را وارد کنید"),
    })
    .refine(
        (values)=> values.password === values.confirmPassword,
        {
            message: "تایید رمز عبور با رمز عبور یکسان نیست",
            path: ["confirmPassword"],
        },
    );
    export type EmployeeFormInput = z.input<typeof employeeSchema>;
    export type EmployeeFormValues = z.output<typeof employeeSchema>;
