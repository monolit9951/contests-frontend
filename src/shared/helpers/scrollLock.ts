// Решает проблему разблокировки скролла при наложении модалок.
// Если модалки две и одну из них мы закрыли, скролл будет 
// Разблокирован, что не есть правильным, потому мы считаем модалки


let modalCount = 0;

export const lockScroll = () => {
    modalCount += 1;
    if (modalCount === 1) {
        document.body.classList.add('no-scroll');
    }
};

export const unlockScroll = () => {
    modalCount = Math.max(0, modalCount - 1);
    if (modalCount === 0) {
        document.body.classList.remove('no-scroll');
    }
};
