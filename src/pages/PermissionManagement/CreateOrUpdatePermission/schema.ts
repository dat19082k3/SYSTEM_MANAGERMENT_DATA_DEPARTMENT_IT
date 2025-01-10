import Joi from "joi";

export const updatePermissionSchema = Joi.object({
  id: Joi.any(),
  name: Joi.string()
  .trim()
  .required()
  .invalid(
    'super_admin', 
    'super admin', 
    'Super Admin', 
    'Super admin',
    'super Admin',
  )
  .label("Tên vai trò")
  .messages({
    'any.invalid': '{{#label}} không hợp lệ'
  }),
  description: Joi.string()
    .trim()
    .allow(null, '')
    .label("Mô tả"),
  parent_id: Joi.number()
    .allow(null, '')
    .label("Vai trò cha"),
});

export const createPermissionSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .invalid(
      'super_admin', 
      'super admin', 
      'Super Admin', 
      'Super admin',
      'super Admin',
    )
    .label("Tên vai trò")
    .messages({
      'any.invalid': '{{#label}} không hợp lệ'
    }),
  description: Joi.string()
    .trim()
    .allow(null, '')
    .label("Mô tả"),
  parent_id: Joi.number()
    .allow(null, '')
    .label("Vai trò cha"),
});
