export default {
  name: 'HelloJSX',
  props: {
    msg: String,
  },
  render() {
    return <h1>{this.msg}</h1>
  },
}
