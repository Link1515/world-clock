export const useModal = modal => {
  const openModal = () => {
    modal.value.classList.add('is-active');
  };

  const closeModal = () => {
    modal.value.classList.remove('is-active');
  };

  return { openModal, closeModal };
};
