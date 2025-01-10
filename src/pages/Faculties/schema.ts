import Joi from 'joi';

export const facultySchema = Joi.object({
    id: Joi.any(),
    code: Joi.string().required().max(255).trim().label("mã cán bộ"),
    last_name: Joi.string().required().max(255).trim().label("họ đệm"),
    first_name: Joi.string().required().max(255).trim().label("tên"),
    birthday: Joi.any().empty(null).required().label("sinh nhật"),
    hometown: Joi.string().required().max(255).trim().label("quê quán"),
    department: Joi.string().required().max(255).trim().label("bộ môn"),
    note: Joi.string().allow("").trim().label("ghi chú")
});