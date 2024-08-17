import {Request, Response, NextFunction} from 'express';
import * as UserService from './user.service';

/**
 * 验证用户数据
 */
export const validateUserData = async (
    requesr: Request, 
    response: Response, 
    next: NextFunction
) => {
    console.log("验证用户数据");

    // 准备数据
    const {name, password} = requesr.body;

    // 验证必填数据
    if (!name) return next(new Error('用户名不能为空'));
    if (!password) return next(new Error('密码不能为空'));

    // 下一步
    next();
}