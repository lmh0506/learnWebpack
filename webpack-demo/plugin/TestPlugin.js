const pluginName = 'TestPlugin'
const SyncHook = require('tapable').SyncHook
let HookMap = new WeakMap()

// 插件是由一个构造函数（此构造函数上的 prototype 对象具有 apply 方法）的所实例化出来的
class TestPlugin {
  static getHooks(compiler) {
    let hook = HookMap.get(compiler)
    if(!hook)  {
      hook = {
        // 所有的Hook构造函数都有一个可选的参数，是一个字符串数组。相当于定义函数形参
        myHook: new SyncHook(['arg1', 'arg2', 'arg3']),
        diyHook: new SyncHook(['arg1', 'arg2'])
      }
      HookMap.set(compiler, hook)
    }
    return hook
  }
  // apply方法在安装插件时，会被webpack compiler调用一次
  // apply接收一个webpack compiler
  apply(compiler) {
    let hook = TestPlugin.getHooks(compiler)

    compiler.hooks.run.tap(pluginName, compilation => {
      console.log('webpack 构建过程开始')
      console.log('以同步的方式触发 compile 钩子')
      // 调用触发自定义hook
      hook.myHook.call('a', 'b', 'c')
    })

    compiler.hooks.compile.tap(pluginName, compilation => {
      console.log('以同步的方式触发 compile 钩子')
      hook.diyHook.call('aaaa', 'bbbb')
    })

    compiler.hooks.run.tapAsync(pluginName, (compilation, callback) => {
      console.log('以异步回调的方式触发 run 钩子')
      callback()
    })

    compiler.hooks.run.tapPromise(pluginName, () => {
      return new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
        console.log('以Promise异步回调触发 run 钩子')
      })
    })
    
    compiler.hooks.run.tapPromise(pluginName, async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('以async await异步回调触发 run 钩子')
    })
  }
}


module.exports = TestPlugin