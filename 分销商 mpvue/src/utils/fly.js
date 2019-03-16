import Fly from 'flyio/dist/npm/wx';
const fly = new Fly();

fly.globalData = {
  uid: "",
  userInfo: false,
  url: "https://xmp.ctbls.com",
  audit_status: '',
  openid: "",
  promo_code: "",
  skip: '',
  unionId: "",
};

//添加请求拦截器
fly.interceptors.request.use((request) => {
  wx.showLoading({
    title: "加载中",
    mask: true
  });
  // request.headers["X-Tag"] = "flyio";
  // request.headers['content-type']= 'application/json';
  request.headers = {
    "X-Tag": "flyio",
    'content-type': 'application/json',
  };
  let authParams = {
    "uid": fly.globalData.uid,
  };
  // request.body && Object.keys(request.body).forEach((val) => {
  //   if (request.body[val] === "") {
  //     delete request.body[val]
  //   };
  // });
  request.body = {
    ...request.body,
    ...authParams
  }
  return request;
});

//添加响应拦截器
fly.interceptors.response.use(
  (response) => {
    wx.hideLoading();
    return response.data; //请求成功之后将返回值返回
  },
  (err) => {
    //请求出错，根据返回状态码判断出错原因 
    wx.hideLoading();
    if (err) {
      return "请求失败";
    };
  }
);

fly.config.baseURL = fly.globalData.url;
export default fly;
