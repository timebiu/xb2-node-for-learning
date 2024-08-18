import express from 'express';
import * as authController from './auth.controller';
import { validateLoginrData } from './auth.middleware';

const router: express.Router = express.Router();

/**
 * 用户登录
 */
router.post('/login', validateLoginrData, authController.login);

/**
 * 导出路由
 */
export default router;