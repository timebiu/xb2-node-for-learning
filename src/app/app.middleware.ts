import { Request,  Response, NextFunction} from 'express';

/**
 * 输出请求地址
 */
export const requestUrl = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log(request.url);
    next(); // 不加这个的话，请求会卡在这里，加上的话，这个请求才会被其他的中间件或者接口处理器处理
}

/**
 * 默认异常处理器
 */
export const defaultErrorHandler = (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if (error.message){
        console.log(error.message);
    }
    
    let statusCode: number, message: string;

    /**
     * 处理异常
     */
    switch (error.message){
        case '用户名不能为空':
            statusCode = 400;
            message = '用户名不能为空';
            break;
        case '密码不能为空':
            statusCode = 400;
            message = '密码不能为空';
            break;
        case '用户名已存在':
            statusCode = 409;
            message = '用户名已存在';
            break;
        case '用户不存在':
            statusCode = 400;
            message = '用户不存在';
            break;
        case '密码错误':
            statusCode = 400;
            message = '密码错误';
            break;
        case '无效的令牌':
            statusCode = 401;
            message = '无效的令牌';
            break;
        case '无权访问资源':
            statusCode = 403;
            message = '无权访问资源';
            break;
        case 'FILE_NOT_FOUND':
            statusCode = 404;
            message = '文件不存在';
            break;
        default:
            statusCode = 500;
            message = '服务暂时出了点问题 ~';
            break;
    }

    response.status(statusCode).send({ message });
};