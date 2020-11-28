import Reserve from "../models/Reserve";
import User from "../models/User";
import House from "../models/House";

class ReserveController {
  async index(req, res) {
    const { user_id } = req.headers;

    //reserves recebe = as reservas onde o usuario que solicitou a reserva é o mesmo que está consultando. E vai exibir junto todas as informações de "house"
    const reserves = await Reserve.find({ user: user_id }).populate("house");

    return res.json(reserves);
  }

  async store(req, res) {
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    const house = await House.findById(house_id); // house recebe = o "id" da casa que está contido em "House"
    if (!house) {
      // se não houver o id da casa, retorna um erro, se houver segue o fluxo
      return res.status(400).json({ error: "Casa não encontrada" });
    }
    if (house.status !== true) {
      // se o status da casa for diferente de true retorna um erro, se for igual segue o fluxo
      return res.status(400).json({ error: "Solicitação indisponível" });
    }

    const user = await User.findById(user_id); // user recebe = o "id" do usuário que está contido em "User"
    if (String(user._id) === String(house.user)) {
      // se o id do usuário for igual ao id do usuário que cadastrou a casa, retorna um erro, se não segue o fluxo
      return res.status(401).json({ error: "Reserva não permitida" });
    }

    const reserve = await Reserve.create({
      user: user_id,
      house: house_id,
      date,
    });

    await reserve.populate("house").populate("user").execPopulate();

    return res.json(reserve);
  }

  async destroy(req, res) {
    const { reserve_id } = req.body;

    await Reserve.findByIdAndDelete({ _id: reserve_id }); // verifica se existem um registro nas reservas cujo o campo ID seja o mesmo reserve_id que está vindo do body

    return res.status(200).json({ delete: "OK" });
  }
}

export default new ReserveController();
