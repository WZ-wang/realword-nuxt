import {request} from "@/plugins/request.js"
// 获取标签
export const getTags = () => {
    return request({
        method: "GET",
        url: "/api/tags",
    })
}
// 获取公共列表
export const getArticles = (data) => {
    return request({
        method: "GET",
        url: "/api/articles",
        params: data,
    })
}
// 获取个人信息
export const getProfiles = (username) => {
    return request({
        method: "GET",
        url: `/api/profiles/${username}`,
    })
}
// 获取当前用户
export const getUser = () => {
    return request({
        method: "GET",
        url: `/api/user`,
    })
}
// 编辑当前用户
export const editUser = (data) => {
    return request({
        method: "PUT",
        url: `/api/user`,
        data
    })
}

// 获取自我的列表
export const getYourFeedArticles = (data) => {
    return request({
      method: 'GET',
      url: '/api/articles/feed',
      params: data,
    });
  };
// 获取文章详情
export const articleDetail = (slug) => {
    return request({
      method: 'GET',
      url: `/api/articles/${slug}`,
    });
  };
// 发表文章
export const addArticle = (data) => {
    return request({
      method: 'POST',
      url: `/api/articles`,
      data
    });
  };
// 获取文章评论
export const getComments = (slug) => {
    return request({
      method: 'GET',
      url: `/api/articles/${slug}/comments`,
    });
  };
// 点赞
export const favorite = (slug) => {
    return request({
      method: 'POST',
      url: `/api/articles/${slug}/favorite`,
    });
  };
// 取消点赞
export const nofavorite = (slug) => {
    return request({
      method: 'DELETE',
      url: `/api/articles/${slug}/favorite`
    });
  };
  
