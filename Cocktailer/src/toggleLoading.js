import get from './getElement.js';

const loading = get('.loading');

export const showLoading = () => {
  loading.classList.remove('hide-loading');
};

export const hideLading = () => {
  loading.classList.add('hide-loading');
};
