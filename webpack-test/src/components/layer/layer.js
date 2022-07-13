import tpl from './layer.html'
import ejsTpl from './layer.tpl'
import './layer.scss'
import '../../css/index.scss'
import { lmh } from '../../js/lmh'
import { hello } from '../../js/main'

function layer () {
  lmh();
  hello();
  return {
    name: 'layer',
    tpl,
    ejsTpl
  }
}

export default layer
