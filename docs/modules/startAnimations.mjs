/**
  Intro animation
*/

const startAnimation = () => {
  const title = document.querySelector('.callout-title')
  const subTitle = document.querySelector('.callout-subtitle')
  const sidebar = document.querySelector('.animation-list')
  const button = document.querySelector('.callout-showList')


  const titleAnimation = 'zoomInDown'
  const subTitleAnimation = 'zoomInDown'
  const buttonAnimation = 'zoomInUp'
  const sidebarAnimation = 'fadeInRight'

  title.classList.add('fl-animated', `fl-${titleAnimation}`)
  subTitle.classList.add('fl-animated', `fl-${subTitleAnimation}`)
  button.classList.add('fl-animated', `fl-${buttonAnimation}`)
  sidebar.classList.add('fl-animated', `fl-${sidebarAnimation}`)
}

export default startAnimation
