import { useAuthen } from '../MainContext'

const useAuthenModal = () => {
  const {
    isAuthenModalOpen,
    setIsAuthenModalOpen,
    renderForm,
    setRenderForm,
    onCloseModal,
    onLogin,
    onRegister
  } = useAuthen()

  return {
    isAuthenModalOpen,
    setIsAuthenModalOpen,
    onCloseModal,
    renderForm,
    setRenderForm,
    onLogin,
    onRegister
  }
}

export default useAuthenModal
