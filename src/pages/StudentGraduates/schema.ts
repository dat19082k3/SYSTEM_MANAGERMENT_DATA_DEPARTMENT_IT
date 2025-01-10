import Joi from 'joi';

export const ideaSchema = Joi.object({
    id: Joi.any(),
    code: Joi.number().empty(null).required().label("mã sinh viên"),
    last_name: Joi.string().required().max(255).trim().label("họ đệm"),
    first_name: Joi.string().required().max(255).trim().label("tên"),
    birthday: Joi.any().empty("").required().label("sinh nhật"),
    hometown: Joi.string().required().max(255).trim().label("quê quán"),
    class: Joi.string().required().max(255).trim().label("lớp"),
    course: Joi.number().empty(null).required().label("khóa học"),
    major: Joi.string().required().max(255).trim().label("chuyên ngành"),
    graduate_date: Joi.string().required().max(255).trim().label("tháng nắm tốt nghiệp"),
    note: Joi.string().allow("").trim().label("ghi chú")
});