/* METODOS : INDEX, SHOW, UPDATE, STORE, DESTROY
INDEX: LISTAGEM DE SESSÕES
SHOW: LISTAGEM DE UMA SESSÃO
UPDATE: ATUALIZA UM SESSÃO
STORE: CRIAR UMA SESSÃO
DESTROY: DELETAR UMA SESSÃO
*/
import * as Yup from "yup";

import User from "../models/User";

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      user_name: Yup.string().max(15).required(),
      email: Yup.string().email().required(),
    });

    const { email, user_name } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Authentication error" });
    }

    let user = await User.findOne({ email }); //procura um registro (email) no banco de dados

    if (!user) {
      user = await User.create({ email, user_name }); //cria um User no banco de dados
      return res.json({ message: `Sucess! ${user}` });
    }

    return res.json({ message: `This e-mail as already exists ${user}` });
  }
}

export default new SessionController();
