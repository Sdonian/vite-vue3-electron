// module.exports = {

//   title: 'Vue Admin Template',

//   /**
//    * @type {boolean} true | false
//    * @description Whether fix the header
//    */
//   fixedHeader: false,

//   /**
//    * @type {boolean} true | false
//    * @description Whether show the logo in sidebar
//    */
//   sidebarLogo: false
// }

interface settings {
  title: string,
  fixedHeader: Boolean,
  sidebarLogo: Boolean,
  showSettings: Boolean
}

const setting: settings = {
  title: 'Vue Admin Template',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,
  showSettings: true
}

export default setting;
