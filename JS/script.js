document.querySelectorAll('.destinations-wrapper').forEach(wrapper => {
  const grid = wrapper.querySelector('.destinations-grid');
  const leftBtn = wrapper.querySelector('.scroll-btn.left');
  const rightBtn = wrapper.querySelector('.scroll-btn.right');

  const scrollAmount = 320; 

  leftBtn.addEventListener('click', () => {
    grid.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  rightBtn.addEventListener('click', () => {
    grid.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
});
