import Joi from 'joi';
import {VALIDATE_URL_REGEX} from "@/utils/helper.tsx";

export const scienceSchema = Joi.object({
    id: Joi.any(),
    code: Joi.string().trim().required().max(255).label('mã đề tài'),
    name: Joi.string().trim().required().max(255).label('tên đề tài'),
    start_year: Joi.number().required().label('Năm bắt đầu'),
    end_year: Joi.number().required().label('Năm kết thúc'),
    leader: Joi.string().required().max(255).trim().label('chủ nhiệm đề tài'),
    member_count: Joi.number().empty(null).required().label("số người còn lại"),
    unit: Joi.string().required().max(255).trim().label('đơn vị'),
    start_date: Joi.any().empty(null).required().label('ngày bắt đầu'),
    end_date: Joi.any().empty(null).required().label('ngày kết thúc'),
    source: Joi.array().items(Joi.any()).min(1).unique().required().label("tên nguồn"),
    budget: Joi.number().empty(null).required().label("kinh phí"),
    budget_other: Joi.number().empty(null).required().label("kinh phí khác"),
    status: Joi.number().empty(null).required().label('trạng thái'),
    product_type: Joi.array().min(1).items(Joi.any()).unique().required().label('loại sản phẩm'),
    product_url: Joi.string().trim().allow(null).allow("").regex(VALIDATE_URL_REGEX).label('URL sản phẩm'),
    note: Joi.any().allow("").label('ghi chú'),
    total: Joi.number().empty(null).label('tổng tiền'),
    level: Joi.number().label('cấp quản lý'),
    type: Joi.number().label('loại đề tài'),
});
