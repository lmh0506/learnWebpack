export function hello () {
  let a = {b: 1, c: 2}
  let { b, c } = a
  console.log(`b:${b}, c:${c}`)
}