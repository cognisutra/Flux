const darkModeControl = () => {
  const darkCheck = document.getElementById('night-light-checkbox');

  darkCheck.addEventListener('click', () => {
    if (darkCheck.checked) {
      document.body.classList.add('dark');
      localStorage.setItem('flux', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.removeItem('flux');
    }
  })

  if (localStorage.getItem('flux')) {
    document.body.className = 'dark';
    darkCheck.checked = true;
  }
}

export default darkModeControl;