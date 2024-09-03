import express from 'express';
import * as authController from './auth.controller';
import { validateLoginrData, authGuard } from './auth.middleware';

const router: express.Router = express.Router();

/**
 * 用户登录
 */
router.post('/login', validateLoginrData, authController.login);

/**
 * 定义验证登录接口
 */
router.post('/auth/validate', authGuard, authController.validate);

/**
 * 导出路由
 */
export default router;