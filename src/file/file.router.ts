import express from 'express';
import { Router } from 'express';
import * as fileController from './file.controller';
import { authGuard } from '../auth/auth.middleware';
import { fileInterceptor } from './file.middleware';

const router: Router = express.Router();

/**
 * 文件上传
 */
router.post('/files', authGuard, fileInterceptor, fileController.store);

/**
 * 文件服务
 */
router.get('/files/:fileId/serve', fileController.serve);

/**
 * 导出路由
 */
export default router;