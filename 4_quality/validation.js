import Joi from 'joi';

// define validation schema
const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
    birthday: Joi.date().max('1-1-2004').iso()
});

//console.log(schema)

// validate some data
const bad_data = {email: "", phone:"", birthday: "2005-01-01"}

// assign validation result
const { error, value } = schema.validate(bad_data);
console.log(error);
console.log(value);

// alternatively
try {
    const value = await schema.validateAsync(bad_data);
}
catch (err) {
    console.log(err)
}