import { Request,  Response, NextFunction} from 'express';
import { getPosts } from './post.service';

/**
 * 内容列表
 */
export const index = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if (request.headers.authorization !== 'SECRET') {
        return next(new Error()); // 不加 return 则会继续执行该接口处理器中的其他代码
    };

    const posts = getPosts();

    response.send(posts);
}