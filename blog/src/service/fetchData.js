import http from '../config/http'

/**
 * 上传图片
 */
export const uploadImg = (image) => http.imgPost('/upload_images', image)

/**
 * 账号密码登录
 */
export const accountLogin = (username, password) => http.post('/loginVerify', {username, password})

/**
 * 获取用户信息
 */
export const getUserInfo = (userId) => http.post('/get_userInfo', {userId})

/**
 * 获取博客列表(ADD:添加分页操作)
 */
export const getBlogList = (userId) => http.post('/get_blogList', {userId})

/**
 * 搜索博客
 */
export const searchBlog = (keywords) => http.post('/blog/search', {keywords})

/**
 * 获取博客详情
 */
export const getBlogInfo = (articleId, userId) => http.post('/blog/blog_detail', {articleId, userId})

/**
 * 获取博客评论列表
 */
export const getBlogCommentList = (articleId) => http.post('/blog/blog_comment', {articleId})

/**
 * 博客点赞
 */
export const blogLike = (articleId, userId, state) =>
  http.post('/blog/blog_like', {articleId, userId, state})

/**
 * 发表评论
 */
export const publishComment = (articleId, criticsId, commentContent, commentTime) =>
  http.post('/blog/publish_comment', {articleId, criticsId, commentContent, commentTime})

/**
 * 发布博客
 */
export const publishBlog = (userId, title, content, relatedImg, thumbnailArticle, publishTime) =>
  http.post('/publish_blog', {userId, title, content, relatedImg, thumbnailArticle, publishTime})
