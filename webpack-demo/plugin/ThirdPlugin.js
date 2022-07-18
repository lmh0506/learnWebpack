const pluginName = 'ThirdPlugin'
const TestPlugin = require('./TestPlugin')
// 插件是由一个构造函数（此构造函数上的 prototype 对象具有 apply 方法）的所实例化出来的
class ThirdPlugin {
  // apply方法在安装插件时，会被webpack compiler调用一次
  // apply接收一个webpack compiler
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('ThirdPlugin执行')
    })
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      console.log('ThirdPlugin执行 compilation')
      let TestPluginHooks = TestPlugin.getHooks(compilation)
      // 自定义hook
      TestPluginHooks.myHook.tap(pluginName, (a, b, c) => {
        console.log('自定义myHook执行')
        console.log('myHook-run', a, b, c)
      })
      TestPluginHooks.diyHook.tapAsync(pluginName, (a, b) => {
        console.log('自定义异步diyHook执行')
        setTimeout(() => {
          console.log('diyHook-async-run', a, b)
        }, 1000);
      });
    })
  }
}

module.exports = ThirdPlugin