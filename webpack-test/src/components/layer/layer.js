import tpl from './layer.html'
import ejsTpl from './layer.tpl'
import './layer.scss'
import '../../css/index.scss'

function layer () {
  return {
    name: 'layer',
    tpl,
    ejsTpl
  }
}

export default layer
