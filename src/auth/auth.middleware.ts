import { Request, Response, NextFunction } from 'express';
import * as UserService from '../user/user.service';
import bcrypt from 'bcrypt';

/**
 * 验证用户登陆数据
 */
export const validateLoginrData = async (
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

    // 验证用户名
    const user = await UserService.getUserByName(name, {password: true});
    if (!user) return next(new Error('用户不存在'));

    // 验证密码
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return next(new Error('密码错误'));

    // 下一步
    next();
}

/**
 * HASH 密码
 */
export const hashPassword = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    // 准备数据
    const {password} = request.body;

    // HASH 密码
    request.body.password = await bcrypt.hash(password, 10);

    // 下一步
    next();
}