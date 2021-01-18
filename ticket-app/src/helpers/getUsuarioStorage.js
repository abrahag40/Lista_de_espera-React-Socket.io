export const getuUsuarioStorage = () => {
    return {
        agente: localStorage.getItem('agente') || null,
        escritorio: localStorage.getItem('escritorio') || null
    }
}