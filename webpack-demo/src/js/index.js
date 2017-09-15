import './../css/index.css'
// 这是首页
/**!
 * 压缩时去除不掉的
 */
require(['./common.js'], common => {
  common.initIndex()
  $(() => {
    console.log('this is jquery')
  })
})