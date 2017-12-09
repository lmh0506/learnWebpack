import Layer from './components/layer/layer.js'

const App = function () {
  console.log(Layer)
  const layer = new Layer()
  let dom = document.getElementById('app')
  dom.innerHTML = layer.tpl + layer.ejsTpl({
    name: 'lmh',
    arr: ['a', 'b', 'c']
  })

}

new App()
