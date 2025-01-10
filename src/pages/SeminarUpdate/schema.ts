import Joi from 'joi';
import {VALIDATE_URL_REGEX} from "@/utils/helper.tsx";

export const seminarSchema = Joi.object({
    id: Joi.any(),
    type: Joi.number().empty(null).required().label("loại hội thảo"),
    name: Joi.string().trim().required().max(255).label("tên hội thảo"),
    start_date: Joi.any().empty(null).required().label("ngày bắt đầu"),
    end_date: Joi.any().empty(null).required().label("ngày kết thúc"),
    delegates: Joi.number().empty(null).required().label("số đại biểu"),
    place: Joi.string().trim().required().max(255).label("địa điểm"),
    unit_host: Joi.string().trim().required().max(255).label("đơn vị chủ trì"),
    unit_partner: Joi.string().trim().required().max(255).label("đơn vị phối hợp"),
    authors: Joi.string().trim().required().max(255).label("tác giả"),
    creator: Joi.string().trim().required().max(255).label("người tạo"),
    creation_date: Joi.string().allow("").trim().label("Ngày tạo"),
    status: Joi.string().trim().required().max(255).label("trạng thái"),
    url: Joi.string().trim().empty(null).max(255).regex(VALIDATE_URL_REGEX).required().label("link hội thảo"),
    note: Joi.string().trim().allow("").allow(null).max(255).label("ghi chú")
});
