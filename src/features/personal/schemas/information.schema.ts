import z from "zod";

export const informationSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(3,"حداقل شامل 3 کاراکتر باید باشد")
        .max(12, "حداکثر شامل 12 کاراکتر باشد")
        .regex(
      /^[آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/,
      "فقط حروف فارسی مجاز است"
    ),
    lastName: z
        .string()
        .trim()
        .min(3,"حداقل شامل 3 کاراکتر باشد")
        .max(15,"حداکثر شامل 15 کارارکتر باشد")
        .regex(
      /^[آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/,
      "فقط حروف فارسی مجاز است"
    ),
    email: z
        .string()
        .trim()
        .pipe(
            z.email({
                error:" ایمیل معتبر وارد کنید"
            })
        )
})
