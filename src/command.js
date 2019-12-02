const sketch = require("sketch")

const MESSAGES = {
  general: [
    'No es lo suficientemente sublime',
    'Así no',
    'Persevera',
    'Todavía es poco sublime'
  ],
  delete: [
    'delete 1',
    'delete 2',
  ],
  color: [
    'Color 1',
    'Color 2',
  ],
  points: [
    'points 1',
    'points 2',
  ],
  opacity: [
    'opacity 1',
    'opacity 2',
  ]
}

const getLayerCount = () => {
  return selectedPage.sketchObject.children().length - 1
}

const getMessage = (type, value) => {
  let messages  = []

  if (!type) {
    messages = MESSAGES['general']
  } else {
    messages = MESSAGES[type]
  }

  return messages[Math.floor(Math.random() * messages.length)]
}

const onDefault = (type) => {
  sketch.UI.message(`⚠️ Unexpected change type ${type}`)
}

const document = sketch.getSelectedDocument()
const selectedPage = document.selectedPage

const onChange = (change, path) => {
  let type = undefined
  let value = undefined

  if (path.includes('color')) {
    value = eval(`document.${path}`)
    type = 'color'
  } else if (path.includes('opacity')) {
    value = eval(`document.${path}`).toFixed(2)
    type = 'opacity'
  } else if (path.includes('points')) {
    type = 'radius'
    let points = eval(`document.${path}`)
    value = points.map(p => p.cornerRadius).reduce((a,i) => a + i)
  }

  let message = getMessage(type, value)
  sketch.UI.message(message)
}

const onDelete = (change, path) => {
  if (change.isMove()) {
    return
  }

  let message = getMessage('delete', getLayerCount())
  sketch.UI.message(message)
}

const onAdd = (change, path) => {
  if (change.isMove()) {
    let from = change.associatedChange().fullPath()
    sketch.UI.message( `Object moved from ${from} to ${path}`)
  } else {
    sketch.UI.message(`New object inserted at ${getLayerCount()}`)
  }
}

export function onDocumentChanged(context) {
  let changes = context.actionContext

  for (let i = 0; i < changes.length; i++) {
    let change = changes[i]
    let path = change.fullPath()
    let type = change.type()

    switch (type) {
      case 1: onChange(change, path); break
      case 2: onDelete(change, path); break
      case 3: onAdd(change, path); break
      default: onDefault(type)
    }
  }
}

export default function () {
  const document = sketch.getSelectedDocument()
  const selectedLayers = document.selectedLayers
  const selectedCount = selectedLayers.length
  const selectedPage = document.selectedPage

  let children = selectedPage.sketchObject.children()

  console.log(children)

  if (children && children.length) {
    sketch.UI.message(children.length)
  }
}
