import { randomBytes, scryptSync } from "crypto";


class Utils {
    constructor(){}

   
   
static criaHashESalSenha(senhaDigitada) {
  const salSenha = randomBytes(16).toString("hex");

  const hashSenha = scryptSync(senhaDigitada, salSenha, 64).toString("hex");

  return { salSenha, hashSenha };
}

}
 

 

export default Utils
