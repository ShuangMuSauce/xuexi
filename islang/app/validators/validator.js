const {LinValidator,Rule} = require('../../core/lin-validator')
const { User } = require('../models/user')
const {LoginType} = require('../lib/enum')

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id=[
            new Rule('isInt','需要是正整数',{min:1})
        ]
    }
}

// 注册验证
class RegisterValidator extends LinValidator {
    constructor() {
      super()
      this.email = [new Rule('isEmail', '不符合Email规范')]
      this.password1 = [
        new Rule('isLength', '密码至少6个字符，最多32个字符', {
          min: 6,
          max: 32,
        }),
        new Rule(
          'matches',
          '密码不符合规范，请包含特殊字符',
          '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]',
        ),
      ]
      this.password2 = this.password1
      this.nickname = [new Rule('isLength', '昵称长度不符合规范', {
        min: 4,
        max: 32,
      })]
    }
  
    // 验证两个密码相同
    validatePassword(vals) {
      const psw1 = vals.body.password1
      const psw2 = vals.body.password2
      if (psw1 !== psw2) {
        throw new Error('前后密码必须相同')
      }
    }

   // 验证邮箱
  async validateEmail(vals) {
    const { email } = vals.body
    const user = await User.findOne({ where: { email } })
    if (user) {
      throw new Error('email已经存在')
    }
  }

}

class TokenValidator extends LinValidator {
  constructor() {
    super()
    this.account = [
      new Rule('isLength','不符合账号规则',{
        min: 4,
        max: 32
      })
    ]

    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength','至少6个字符',{
        min: 6,
        max: 128
      })
    ]
  }

  validateLoginType(vals) {
      if(!vals.body.type){
        throw new Error('type是必须参数')
      }
      if(!LoginType.isThisType(vals.body.type)){
        throw new Error('type参数不合法')
      }
  }
}

module.exports={
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator
}