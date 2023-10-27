import * as Yup from 'yup'
import User from '../models/User.js'
import jsonwebtoken from 'jsonwebtoken'
import authConfig from '../../config/auth.js'


class SessionsController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    const userEmailOrPasswordIncorrect = () => {
      return response
        .status(401)
        .json({ error: 'Make sure your password or email are correct' })
    }

    if (!(await schema.isValid(request.body))) userEmailOrPasswordIncorrect()

    const { email, password } = request.body

    const user = await User.findOne({
      where: { email },
    })
    if (!user) {
      return response
        .status(400)
        .json({ error: 'Make sure your password or email are correct' })
    }
    if (!(await user.checkPassword(password))) {
      return response
        .status(401)
        .json({ error: 'Make sure your password or email are correct' })
    }

    return response.json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin,
      token: jsonwebtoken.sign({id: user.id, name:user.name}, authConfig.secret , {
          expiresIn: authConfig.expiresIn,
      } )
    })
  }
}

export default new SessionsController()
