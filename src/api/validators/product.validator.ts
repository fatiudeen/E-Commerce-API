import { query, param, body, check } from 'express-validator';
import path from 'path';
export default {
  create: [
    check('productName').exists().isString().trim(),
    check('price').exists().isInt().toInt(),
    check('quantity').exists().isInt().toInt(),
    check('category').exists().isString().trim(),
    check('subcategory').exists().isString().trim(),
    check('img').custom(function (value, { req }) {
      const extension = path.extname(req.files[0].originalname).toLowerCase();
      switch (extension) {
        case '.jpg':
          return '.jpg';
        case '.jpeg':
          return '.jpeg';
        case '.png':
          return '.png';
        default:
          return false;
      }
    }),
    // check('img').exists(),
    check('color').optional().isString().trim(),
    check('size').optional().isInt().trim(),
  ],
  update: [
    param('productId').exists().isString().trim(),
    body('price').optional().isInt(),
    body('quantity').optional().isInt(),
    body('category').optional().isString().trim(),
    body('subcategory').optional(),
    body('color').optional(),
    body('size').optional(),
  ],
  updateImg: [
    check('oldImgKey').exists().isString().trim(),
    check('img').custom(function (value, { req }) {
      //TODO add loop function
      const extension = path.extname(req.files[0].originalname).toLowerCase();
      switch (extension) {
        case '.jpg':
          return '.jpg';
        case '.jpeg':
          return '.jpeg';
        case '.png':
          return '.png';
        default:
          return false;
      }
    }),
  ],
  productId: [param('productId').exists()],
  getPrducts: [
    query('productName').optional().isString().trim(),
    query('price').optional().isInt(),
    query('quantity').optional().isInt(),
    query('category').optional().isString().trim(),
    query('subcategory').optional().isString(),
    query('color').optional().isString(),
    query('size').optional().isInt(),
    query('page').exists().isInt(),
  ],
};
