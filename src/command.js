const sketch = require("sketch")

const MESSAGES = {
  general: { 
    0: [
      'No es lo suficientemente sublime',
      'Así no',
      'Persevera',
      'Todavía es poco sublime'
    ],
    1: [
    ]
  },
  delete: { 
    0: ['delete 1', 'delete 2'],
    1: ['delete 1', 'delete 2']
  },
  color: {
    0: [
    'Ese color no es sublime.',
    '{{color}} no es sublime.',
    '¡Qué color tan poco sublime!',
    '{{color}} no es lo suficientemente sublime.'
  ], 
    1: []
  },
  points: {
    0: [
    'points 1',
    'points 2',
  ], 
    1: []
  },
  opacity: { 
    0: ['opacity 1', 'opacity 2'],
    1: ['opacity 1', 'opacity 2']
  },
}

const getLayerCount = () => {
  return selectedPage.sketchObject.children().length - 1
}

const getMessage = (type = 'general', mode, value) => {
  let messages = MESSAGES[type][mode]
  let regexp = new RegExp(`{{\W*${type}:?.*?}}`, 'g')
  let message = messages[Math.floor(Math.random() * messages.length)]

  return value ? message.replace(regexp, value) : message
}

const onDefault = (type) => {
  sketch.UI.message(`⚠️ Unexpected change type ${type}`)
}

const document = sketch.getSelectedDocument()
const selectedPage = document.selectedPage

const onChange = (change, path) => {
  let mode = 0
  let type = undefined
  let value = eval(`document.${path}`)

  if (path.includes('color')) {
    type = 'color'
  } else if (path.includes('opacity')) {
    value = value.toFixed(2)
    type = 'opacity'
  } else if (path.includes('points')) {
    type = 'radius'
    value = value.map(p => p.cornerRadius).reduce((a,i) => a + i)
  }

  let message = getMessage(type, mode, value)
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
