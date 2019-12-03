let Settings = require('sketch/settings')
const sketch = require('sketch')

const MESSAGES = {
  change: {
    0: [
      'Así no es lo suficientemente sublime',
      'Antes era más sublime',
      'Aún podría ser más sublime',
      'Mmm… ese cambio es poco sublime'
    ]
  },
  name: {
    0: [
      'Este texto no es sublime',
      'Este texto podría ser más sublime',
      '¡Qué poco sublime!'
    ]
  },
  insert: {
    0: [
      '¡Este diseño no es sublime!',
      'No deberías haber añadido esto',
      'Esta es una decisión muy poco sublime',
      'Te estás alejando de lo sublime',
      'Esto está lejos de ser sublime',
      'Tu diseño es cada vez menos sublime'
    ]
  },
  general: { 
    0: [
      'Así no',
      '¡Mal!',
      'No es lo suficientemente sublime',
      'Bah, ¡no es lo suficientemente sublime!',
      'Persevera, puede ser más sublime',
      'Te sigues alejando de lo sublime',
      'Te alejas de lo sublime',
      'Este diseño no es sublime',
      'Mal, este diseño no es sublime',
      'Todavía es poco sublime'
    ]
  },
  delete: { 
    0: [
      'Aún no es sublime',
      'Todavía es poco sublime',
      'Buen intento, pero aún no es sublime'
    ],
    1: [
      '¡Lo has logrado! Tu diseño es por fin sublime.',
      '¡Lo conseguiste! Tu diseño es por fin sublime.',
      '¡Felicidades! Tu diseño es por fin sublime.',
    ]
  },
  color: {
    0: [
      'Ese color no es sublime.',
      '{{color}} no es sublime.',
      '¡Qué color tan poco sublime!',
      '{{color}} no es lo suficientemente sublime.'
    ], 
    1: [
      'Sigue así',
      'Mejor'
    ]
  },
  points: {
    0: [
      'No es lo suficientemente sublime',
    ], 
    1: [
      'Mejor',
      'Sigue así'
    ]
  },
  opacity: { 
    0: [
      'Todo el mundo sabe que {{opacity}} de opacidad no es sublime',
      'Demasiado opaco para ser sublime'
    ],
    1: [
      'Ahora es sublime',
      'Mucho más sublime así',
      'Bien hecho',
      'Vas por el buen camino',
      'Kant estaría orgulloso de ti',
      'Mejor'
    ]
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
  let message = getMessage('general', 0)
  sketch.UI.message(message)
}

const document = sketch.getSelectedDocument()
const selectedPage = document.selectedPage

const onChange = (change, path) => {
  let mode = 0
  let type = undefined
  let value = eval(`document.${path}`)

  if (change && change.propertyName && change.propertyName() == 'frame') {
    type = 'change'
    mode = 0
  } else if (path.includes('insert')) {
    type = 'insert'
    mode = 0
  } else if (path.includes('name')) {
    type = 'name'
    mode = 0
  } else if (path.includes('color')) {
    type = 'color'
    mode = value.includes('ffffff') ?  1 : 0
  } else if (path.includes('opacity')) {
    value = value.toFixed(2)
    type = 'opacity'

    if (value < 0.03) {
      mode = 1
    }
  } else if (path.includes('points')) {
    type = 'points'
    value = value.map(p => p.cornerRadius).reduce((a,i) => a + i)
    mode = value >= (66 * 4) -1 ? 1 : 0
  }

  let message = getMessage(type, mode, value)
  sketch.UI.message(message)
}

const onDelete = (change, path) => {
  if (change.isMove()) {
    return
  }

  let mode = 0

  if (getLayerCount() <= 0) {
    mode = 1
  }

  let message = getMessage('delete', mode, getLayerCount())
  sketch.UI.message(message)
}

const onAdd = (change, path) => {
  let  message = getMessage('insert', 0)
  sketch.UI.message(message)
}

export function onDocumentChanged(context) {
  let changes = context.actionContext

  let isActivated = Settings.sessionVariable('sublime')

  if (!isActivated) {
    return
  }

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

export function on(context) {
  Settings.setSessionVariable('sublime', true)
  sketch.UI.message('Adelante, diseña')
}

export function off(context) {
  Settings.setSessionVariable('sublime', false)
  sketch.UI.message('Vale, ya me callo')
}
