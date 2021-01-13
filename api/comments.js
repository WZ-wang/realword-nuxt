import { request } from "@/plugins/request.js"
// 发表评论
export const sendComment = (slug, data) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/comments`,
        data
    });
};
// 删除评论
export const delComment = (slug, id) => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/comments/${id}`,
    });
};