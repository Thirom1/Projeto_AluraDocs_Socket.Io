class UtilsFront {
    constructor(){}





    static definirCooklie(chave, valor){
        document.cookie = `${chave}=${valor};path=/`
    }

    static obterCookie(chave) {
        return document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith(`${chave}=`))
        ?.split("=")[1];
    }

    static removerCookie(chave) {
        document.cookie = `${chave}=; expires=Thu, 01 Jan 1970 00:00:00`;
    }
}


export default UtilsFront