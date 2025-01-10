import Joi from 'joi';
import {VALIDATE_URL_REGEX} from "@/utils/helper.tsx";

export const paperSchema = Joi.object({
    id: Joi.any(),
    article_title: Joi.string().trim().required().max(255).label("tên bài báo"),
    journal_name: Joi.string().trim().required().max(255).label("tên tạp chí"),
    year: Joi.number().empty(null).required().label("năm xuất bản"),
    unit: Joi.string().trim().required().max(255).label("đơn vị"),
    country: Joi.string().trim().required().max(255).label("quốc gia"),
    field: Joi.string().trim().required().max(255).label("lĩnh vực"),
    authors: Joi.string().trim().required().max(255).label("tác giả"),
    author_count: Joi.number().empty(null).required().label("số lượng tác giả"),
    hour: Joi.number().empty(null).required().label("tính giờ"),
    creator: Joi.string().trim().required().max(255).label("người tạo"),
    creation_date: Joi.string().trim().allow(null).label("ngày tạo"),
    url: Joi.string().trim().empty(null).max(255).regex(VALIDATE_URL_REGEX).required().label("link bài báo"),
    status: Joi.string().trim().empty(null).max(255).label("trạng thái"),
    type: Joi.number().empty(null).required().label("loại bài báo"),
    note: Joi.string().trim().allow(null).allow("").max(1000).label("ghi chú"),
});
