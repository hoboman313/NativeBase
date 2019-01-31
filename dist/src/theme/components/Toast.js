Object.defineProperty(exports,"__esModule",{value:true});var _platform=require('./../variables/platform');var _platform2=_interopRequireDefault(_platform);var _commonColor=require('./../variables/commonColor');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default=function(){var variables=arguments.length>0&&arguments[0]!==undefined?arguments[0]:_platform2.default;var platform=variables.platform;var toastTheme={'.danger':{backgroundColor:variables.brandDanger},'.warning':{backgroundColor:variables.brandWarning},'.success':{backgroundColor:variables.brandSuccess},backgroundColor:'rgba(0,0,0,0.8)',borderRadius:platform===_commonColor.PLATFORM.IOS?5:0,flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10,minHeight:50,'NativeBase.Text':{color:'#fff',flex:1},'NativeBase.Button':{backgroundColor:'transparent',height:30,elevation:0,'NativeBase.Text':{fontSize:14}}};return toastTheme;};
//# sourceMappingURL=Toast.js.map