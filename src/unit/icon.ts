const loadIcon = () => {
  try {
    /* eslint-disable no-undef */
    /* 引入assets/imgs/icon文件下的所有svg */
    const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().map(requireContext)
    const req = require.context('@/assets/imgs/icons/', false, /\.svg$/)
    // console.log('req', req)
    requireAll(req)
    // eslint-disable-next-line no-empty
  } catch (error) {
  }
}
export default loadIcon()