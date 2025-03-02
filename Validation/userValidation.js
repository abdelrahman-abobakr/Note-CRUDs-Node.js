import joi from "joi";

const userSchema = joi.object({
    name: joi.string()
    .min(5)
    .max(30)
    .required()
    .messages({
        "string.min":"name must be at least 5 letters",
        "string.empty":"name must not be empty",
        "string.max":"string must be less than 30 letters0"
    }),

    email: joi.string()
    .email()
    .required()
    .messages({
        "string.email":"not valid email format"
    }),

    password: joi.string()
    .required()
    .pattern(new RegExp("^[A-Za-z\d@$!%*?&]{6,}$")),

    role: joi.string()
    .valid("user", "admin")
    .default("user"),

    isConfirmed: joi.boolean()
    .default(false),
})

export default userSchema;