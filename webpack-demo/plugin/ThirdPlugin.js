const pluginName = 'ThirdPlugin'
const TestPlugin = require('./TestPlugin')
// 插件是由一个构造函数（此构造函数上的 prototype 对象具有 apply 方法）的所实例化出来的
class ThirdPlugin {
  // apply方法在安装插件时，会被webpack compiler调用一次
  // apply接收一个webpack compiler
  apply(compiler) {
    let TestPluginHooks = TestPlugin.getHooks(compiler)
    // 自定义hook
    TestPluginHooks.myHook.tap('TestA', (compilation, test, run) => {
      console.log('自定义myHook执行')
      console.log('myHook-run', compilation, test, run)
    })
    TestPluginHooks.diyHook.tap('TestB', (compilation, test, run) => {
      console.log('自定义diyHook执行')
      console.log('diyHook-run', compilation, test, run)
    })

    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('ThirdPlugin执行')
    })
  }
}

module.exports = ThirdPlugin