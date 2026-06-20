/**
  Docs index
*/

const indexList = (sections = [], container = '.sidebar', heading = 'h2') => {
  const containerEl = document.querySelector(container)
  const list = document.createElement('ul')
  list.classList.add('docs-index')

  sections.forEach(section => {
    const title = section.querySelector(heading)
    const id = section.getAttribute('id')
    if (!title) return

    const li = document.createElement('li')
    li.classList.add('docs-indexItem')
    const a = document.createElement('a')
    a.href = '#' + id
    a.title = title.innerText
    a.textContent = title.innerText
    li.appendChild(a)
    list.appendChild(li)
  })

  containerEl.insertAdjacentElement('beforeend', list)
  return list
}

const buildDocsIndex = (docs = '#documentation', docSection = '[class*="docSection-"]', titles = 'h2') => {
  const docsEl = document.querySelector(docs)
  const sections = [...docsEl.querySelectorAll(docSection)]

  const list = indexList(sections)

  return list
}

export default buildDocsIndex
