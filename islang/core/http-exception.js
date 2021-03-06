class HttpException extends Error {
    constructor(msg='服务器异常',errorCode=10000,code=400){
        super()
        this.errorCode=errorCode
        this.code=code
        this.msg=msg
    }
}

// 参数异常类
class ParameterException extends HttpException {
    constructor(msg, errorCode) {
      super()
      this.code = 400
      this.msg = msg || '参数错误'
      this.errorCode = errorCode || 10000
    }
}

class Success extends HttpException {
    constructor(msg,errorCode){
        super()
        this.code=201
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 0
    }
}

class NotFound extends HttpException{
    constructor(msg,error_code){
        super()
        this.msg=msg || '资源未找到'
        this.error_code=error_code
        this.code=404
    }
}

class AuthFailed extends HttpException {
    constructor(msg,error_code){
        super()
        this.msg = msg || '授权失败'
        this.error_code = error_code || 10004
        this.code =401
    }
}
module.exports= {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed
}