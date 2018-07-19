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
export const getBlogList = () => http.get('/get_blogList')

/**
 * 搜索博客
 */
export const searchBlog = (keywords) => http.post('/blog/search', {keywords})

/**
 * 获取博客详情
 */
export const getBlogInfo = (articleId) => http.post('/get_blog_detailInfo', {articleId})

/**
 * 发布博客
 */
export const publishBlog = (userId, title, content, relatedImg, thumbnailArticle, publishTime) =>
  http.post('/publish_blog', {userId, title, content, relatedImg, thumbnailArticle, publishTime})
