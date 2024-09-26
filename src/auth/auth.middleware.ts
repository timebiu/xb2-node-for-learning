import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as UserService from '../user/user.service';
import bcrypt from 'bcrypt';
import { PUBLIC_KEY } from '../app/app.config';
import { TokenPayload } from './auth.interface';
import { request } from 'http';
import { possess } from './auth.service';

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

    // 在请求主体中添加用户信息
    requesr.body.user = user;

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

/**
 * 验证用户身份
 */
export const authGuard = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log("验证用户身份");

    try{
        // 提取 Authorization 头部
        const authorization = request.header('Authorization');
        if (!authorization) throw new Error();

        // 提取 JWT 令牌
        const token = authorization.replace('Bearer ', '');
        if (!token) throw new Error();

        // 验证 JWT 令牌
        const decoded = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });

        // 在请求主体中添加用户信息
        request.user = decoded as TokenPayload;

        // 下一步
        next();
    }catch(error){
        next(new Error('无效的令牌'));
    }
}

/**
 * 访问控制
 */
interface AccessControlOptions {
    possession?: boolean;
}

export const accessControl = (options: AccessControlOptions) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        console.log("访问控制");

        // 结构选项
        const { possession } = options;

        // 当前用户id
        const { id: userId } = request.user;

        // 放行管理员
        if (userId === 1) return next();

        // 准备资源
        const resourceIdParam = Object.keys(request.params)[0];
        const resourceType = resourceIdParam.replace('Id', '');
        const resourceId = parseInt(request.params[resourceIdParam], 10);

        // 验证权限
        if (possession) {
            try{
                const ownResource = await possess({userId, resourceType, resourceId});

                if (!ownResource) {
                    return next(new Error('无权访问资源'));
                }
            }catch(error){
                return next(error);
            }
        }

        // 下一步
        next();
    }
}