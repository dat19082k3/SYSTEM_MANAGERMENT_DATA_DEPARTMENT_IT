import Joi from 'joi';

export const ideaSchema = Joi.object({
    id: Joi.any(),
    name: Joi.string().required().max(255).trim().label("tên ý tưởng"),
    group: Joi.string().required().trim().label("nhóm"),
    class: Joi.string().required().trim().label("lớp"),
    guide: Joi.string().required().trim().max(255).label("giáo viên hướng dẫn"),
    year: Joi.number().empty(null).empty("").required().label("năm bắt đầu"),
    note: Joi.string().allow(null).allow("").trim().label("ghi chú")
});