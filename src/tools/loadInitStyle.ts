export const loadInitStyle = () => {
  if (typeof document !== 'undefined') {
    const id = "ui_init_keyframe"
    if (document.getElementById(id)) {
      return
    }

    const style = document.createElement('style');
    style.id = id

    const keyframes = `
      @keyframes use-ripple-animation {
        from {
          opacity: 1;
          transform: scale(0);
        }
        to {
          opacity: 0;
          transform: scale(10);
        }
      }
      @keyframes spin-loading {
        0% {
          transform: rotate(0);
          animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }
        50% {
          transform: rotate(900deg);
          animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        100% {
          transform: rotate(1800deg);
        }
      }
    `;

    style.innerHTML = keyframes;

    document.querySelector('head')?.appendChild(style);
  }

}
