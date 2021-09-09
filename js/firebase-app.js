var extendStatics=function(e,t){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)};function __extends(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}extendStatics(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}function __awaiter(e,t,n,r){return new(n||(n=Promise))(function(i,o){function a(e){try{c(r.next(e))}catch(e){o(e)}}function s(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(a,s)}c((r=r.apply(e,t||[])).next())})}function __generator(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}function __values(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function __read(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,i,o=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)a.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return a}function __spreadArray(e,t){for(var n=0,r=t.length,i=e.length;n<r;n++,i++)e[i]=t[n];return e}var Deferred=function(){function e(){var e=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise(function(t,n){e.resolve=t,e.reject=n})}return e.prototype.wrapCallback=function(e){var t=this;return function(n,r){n?t.reject(n):t.resolve(r),"function"==typeof e&&(t.promise.catch(function(){}),1===e.length?e(n):e(n,r))}},e}(),ERROR_NAME="FirebaseError",FirebaseError=function(e){function t(n,r,i){var o=e.call(this,r)||this;return o.code=n,o.customData=i,o.name=ERROR_NAME,Object.setPrototypeOf(o,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,ErrorFactory.prototype.create),o}return __extends(t,e),t}(Error),ErrorFactory=function(){function e(e,t,n){this.service=e,this.serviceName=t,this.errors=n}return e.prototype.create=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=t[0]||{},i=this.service+"/"+e,o=this.errors[e],a=o?replaceTemplate(o,r):"Error",s=this.serviceName+": "+a+" ("+i+").";return new FirebaseError(i,s,r)},e}();function replaceTemplate(e,t){return e.replace(PATTERN,function(e,n){var r=t[n];return null!=r?String(r):"<"+n+"?>"})}var PATTERN=/\{\$([^}]+)}/g;function deepEqual(e,t){if(e===t)return!0;for(var n=Object.keys(e),r=Object.keys(t),i=0,o=n;i<o.length;i++){var a=o[i];if(!r.includes(a))return!1;var s=e[a],c=t[a];if(isObject(s)&&isObject(c)){if(!deepEqual(s,c))return!1}else if(s!==c)return!1}for(var l=0,p=r;l<p.length;l++){a=p[l];if(!n.includes(a))return!1}return!0}function isObject(e){return null!==e&&"object"==typeof e}var Component=function(){function e(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return e.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},e.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},e.prototype.setServiceProps=function(e){return this.serviceProps=e,this},e.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},e}(),DEFAULT_ENTRY_NAME$1="[DEFAULT]",Provider=function(){function e(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}return e.prototype.get=function(e){var t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){var n=new Deferred;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{var r=this.getOrInitializeService({instanceIdentifier:t});r&&n.resolve(r)}catch(e){}}return this.instancesDeferred.get(t).promise},e.prototype.getImmediate=function(e){var t,n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),r=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error("Service "+this.name+" is not available")}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(r)return null;throw e}},e.prototype.getComponent=function(){return this.component},e.prototype.setComponent=function(e){var t,n;if(e.name!==this.name)throw Error("Mismatching Component "+e.name+" for Provider "+this.name+".");if(this.component)throw Error("Component for "+this.name+" has already been provided");if(this.component=e,this.shouldAutoInitialize()){if(isComponentEager(e))try{this.getOrInitializeService({instanceIdentifier:DEFAULT_ENTRY_NAME$1})}catch(e){}try{for(var r=__values(this.instancesDeferred.entries()),i=r.next();!i.done;i=r.next()){var o=__read(i.value,2),a=o[0],s=o[1],c=this.normalizeInstanceIdentifier(a);try{var l=this.getOrInitializeService({instanceIdentifier:c});s.resolve(l)}catch(e){}}}catch(e){t={error:e}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(t)throw t.error}}}},e.prototype.clearInstance=function(e){void 0===e&&(e=DEFAULT_ENTRY_NAME$1),this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)},e.prototype.delete=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return e=Array.from(this.instances.values()),[4,Promise.all(__spreadArray(__spreadArray([],__read(e.filter(function(e){return"INTERNAL"in e}).map(function(e){return e.INTERNAL.delete()}))),__read(e.filter(function(e){return"_delete"in e}).map(function(e){return e._delete()}))))];case 1:return t.sent(),[2]}})})},e.prototype.isComponentSet=function(){return null!=this.component},e.prototype.isInitialized=function(e){return void 0===e&&(e=DEFAULT_ENTRY_NAME$1),this.instances.has(e)},e.prototype.getOptions=function(e){return void 0===e&&(e=DEFAULT_ENTRY_NAME$1),this.instancesOptions.get(e)||{}},e.prototype.initialize=function(e){var t,n;void 0===e&&(e={});var r=e.options,i=void 0===r?{}:r,o=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(o))throw Error(this.name+"("+o+") has already been initialized");if(!this.isComponentSet())throw Error("Component "+this.name+" has not been registered yet");var a=this.getOrInitializeService({instanceIdentifier:o,options:i});try{for(var s=__values(this.instancesDeferred.entries()),c=s.next();!c.done;c=s.next()){var l=__read(c.value,2),p=l[0],f=l[1];o===this.normalizeInstanceIdentifier(p)&&f.resolve(a)}}catch(e){t={error:e}}finally{try{c&&!c.done&&(n=s.return)&&n.call(s)}finally{if(t)throw t.error}}return a},e.prototype.onInit=function(e,t){var n,r=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(r,i);var o=this.instances.get(r);return o&&e(o,r),function(){i.delete(e)}},e.prototype.invokeOnInitCallbacks=function(e,t){var n,r,i=this.onInitCallbacks.get(t);if(i)try{for(var o=__values(i),a=o.next();!a.done;a=o.next()){var s=a.value;try{s(e,t)}catch(e){}}}catch(e){n={error:e}}finally{try{a&&!a.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}},e.prototype.getOrInitializeService=function(e){var t=e.instanceIdentifier,n=e.options,r=void 0===n?{}:n,i=this.instances.get(t);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:normalizeIdentifierForFactory(t),options:r}),this.instances.set(t,i),this.instancesOptions.set(t,r),this.invokeOnInitCallbacks(i,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,i)}catch(e){}return i||null},e.prototype.normalizeInstanceIdentifier=function(e){return void 0===e&&(e=DEFAULT_ENTRY_NAME$1),this.component?this.component.multipleInstances?e:DEFAULT_ENTRY_NAME$1:e},e.prototype.shouldAutoInitialize=function(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode},e}();function normalizeIdentifierForFactory(e){return e===DEFAULT_ENTRY_NAME$1?void 0:e}function isComponentEager(e){return"EAGER"===e.instantiationMode}var _a,LogLevel,ComponentContainer=function(){function e(e){this.name=e,this.providers=new Map}return e.prototype.addComponent=function(e){var t=this.getProvider(e.name);if(t.isComponentSet())throw new Error("Component "+e.name+" has already been registered with "+this.name);t.setComponent(e)},e.prototype.addOrOverwriteComponent=function(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)},e.prototype.getProvider=function(e){if(this.providers.has(e))return this.providers.get(e);var t=new Provider(e,this);return this.providers.set(e,t),t},e.prototype.getProviders=function(){return Array.from(this.providers.values())},e}(),instances=[];!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(LogLevel||(LogLevel={}));var levelStringToEnum={debug:LogLevel.DEBUG,verbose:LogLevel.VERBOSE,info:LogLevel.INFO,warn:LogLevel.WARN,error:LogLevel.ERROR,silent:LogLevel.SILENT},defaultLogLevel=LogLevel.INFO,ConsoleMethod=((_a={})[LogLevel.DEBUG]="log",_a[LogLevel.VERBOSE]="log",_a[LogLevel.INFO]="info",_a[LogLevel.WARN]="warn",_a[LogLevel.ERROR]="error",_a),defaultLogHandler=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(t<e.logLevel)){var i=(new Date).toISOString(),o=ConsoleMethod[t];if(!o)throw new Error("Attempted to log a message with an invalid logType (value: "+t+")");console[o].apply(console,__spreadArray(["["+i+"]  "+e.name+":"],n))}},Logger=function(){function e(e){this.name=e,this._logLevel=defaultLogLevel,this._logHandler=defaultLogHandler,this._userLogHandler=null,instances.push(this)}return Object.defineProperty(e.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in LogLevel))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!1,configurable:!0}),e.prototype.setLogLevel=function(e){this._logLevel="string"==typeof e?levelStringToEnum[e]:e},Object.defineProperty(e.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,__spreadArray([this,LogLevel.DEBUG],e)),this._logHandler.apply(this,__spreadArray([this,LogLevel.DEBUG],e))},e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,__spreadArray([this,LogLevel.VERBOSE],e)),this._logHandler.apply(this,__spreadArray([this,LogLevel.VERBOSE],e))},e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,__spreadArray([this,LogLevel.INFO],e)),this._logHandler.apply(this,__spreadArray([this,LogLevel.INFO],e))},e.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,__spreadArray([this,LogLevel.WARN],e)),this._logHandler.apply(this,__spreadArray([this,LogLevel.WARN],e))},e.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,__spreadArray([this,LogLevel.ERROR],e)),this._logHandler.apply(this,__spreadArray([this,LogLevel.ERROR],e))},e}();function setLogLevel$1(e){instances.forEach(function(t){t.setLogLevel(e)})}function setUserLogHandler(e,t){for(var n=function(n){var r=null;t&&t.level&&(r=levelStringToEnum[t.level]),n.userLogHandler=null===e?null:function(t,n){for(var i=[],o=2;o<arguments.length;o++)i[o-2]=arguments[o];var a=i.map(function(e){if(null==e)return null;if("string"==typeof e)return e;if("number"==typeof e||"boolean"==typeof e)return e.toString();if(e instanceof Error)return e.message;try{return JSON.stringify(e)}catch(e){return null}}).filter(function(e){return e}).join(" ");n>=(null!=r?r:t.logLevel)&&e({level:LogLevel[n].toLowerCase(),message:a,args:i,type:t.name})}},r=0,i=instances;r<i.length;r++){n(i[r])}}class PlatformLoggerServiceImpl{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(isVersionServiceProvider(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}function isVersionServiceProvider(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}const name$o="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js",version$1="0.7.0",logger=new Logger("https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"),name$n="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js-compat",name$m="@firebase/analytics-compat",name$l="@firebase/analytics",name$k="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js-check-compat",name$j="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js-check",name$i="@firebase/auth",name$h="@firebase/auth-compat",name$g="@firebase/database",name$f="@firebase/database-compat",name$e="@firebase/functions",name$d="@firebase/functions-compat",name$c="@firebase/installations",name$b="@firebase/installations-compat",name$a="@firebase/messaging",name$9="@firebase/messaging-compat",name$8="@firebase/performance",name$7="@firebase/performance-compat",name$6="@firebase/remote-config",name$5="@firebase/remote-config-compat",name$4="@firebase/storage",name$3="@firebase/storage-compat",name$2="@firebase/firestore",name$1="@firebase/firestore-compat",name$p="firebase",version$2="9.0.0",DEFAULT_ENTRY_NAME="[DEFAULT]",PLATFORM_LOG_STRING={[name$o]:"fire-core",[name$n]:"fire-core-compat",[name$l]:"fire-analytics",[name$m]:"fire-analytics-compat",[name$j]:"fire-app-check",[name$k]:"fire-app-check-compat",[name$i]:"fire-auth",[name$h]:"fire-auth-compat",[name$g]:"fire-rtdb",[name$f]:"fire-rtdb-compat",[name$e]:"fire-fn",[name$d]:"fire-fn-compat",[name$c]:"fire-iid",[name$b]:"fire-iid-compat",[name$a]:"fire-fcm",[name$9]:"fire-fcm-compat",[name$8]:"fire-perf",[name$7]:"fire-perf-compat",[name$6]:"fire-rc",[name$5]:"fire-rc-compat",[name$4]:"fire-gcs",[name$3]:"fire-gcs-compat",[name$2]:"fire-fst",[name$1]:"fire-fst-compat","fire-js":"fire-js",[name$p]:"fire-js-all"},_apps=new Map,_components=new Map;function _addComponent(e,t){try{e.container.addComponent(t)}catch(n){logger.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function _addOrOverwriteComponent(e,t){e.container.addOrOverwriteComponent(t)}function _registerComponent(e){const t=e.name;if(_components.has(t))return logger.debug(`There were multiple attempts to register component ${t}.`),!1;_components.set(t,e);for(const t of _apps.values())_addComponent(t,e);return!0}function _getProvider(e,t){return e.container.getProvider(t)}function _removeServiceInstance(e,t,n=DEFAULT_ENTRY_NAME){_getProvider(e,t).clearInstance(n)}function _clearComponents(){_components.clear()}const ERRORS={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function."},ERROR_FACTORY=new ErrorFactory("app","Firebase",ERRORS);class FirebaseAppImpl{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Component("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ERROR_FACTORY.create("app-deleted",{appName:this._name})}}const SDK_VERSION="9.0.0";function initializeApp(e,t={}){if("object"!=typeof t){t={name:t}}const n=Object.assign({name:DEFAULT_ENTRY_NAME,automaticDataCollectionEnabled:!1},t),r=n.name;if("string"!=typeof r||!r)throw ERROR_FACTORY.create("bad-app-name",{appName:String(r)});const i=_apps.get(r);if(i){if(deepEqual(e,i.options)&&deepEqual(n,i.config))return i;throw ERROR_FACTORY.create("duplicate-app",{appName:r})}const o=new ComponentContainer(r);for(const e of _components.values())o.addComponent(e);const a=new FirebaseAppImpl(e,n,o);return _apps.set(r,a),a}function getApp(e=DEFAULT_ENTRY_NAME){const t=_apps.get(e);if(!t)throw ERROR_FACTORY.create("no-app",{appName:e});return t}function getApps(){return Array.from(_apps.values())}async function deleteApp(e){const t=e.name;_apps.has(t)&&(_apps.delete(t),await Promise.all(e.container.getProviders().map(e=>e.delete())),e.isDeleted=!0)}function registerVersion(e,t,n){var r;let i=null!==(r=PLATFORM_LOG_STRING[e])&&void 0!==r?r:e;n&&(i+=`-${n}`);const o=i.match(/\s|\//),a=t.match(/\s|\//);if(o||a){const e=[`Unable to register library "${i}" with version "${t}":`];return o&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&a&&e.push("and"),a&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void logger.warn(e.join(" "))}_registerComponent(new Component(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}function onLog(e,t){if(null!==e&&"function"!=typeof e)throw ERROR_FACTORY.create("invalid-log-argument");setUserLogHandler(e,t)}function setLogLevel(e){setLogLevel$1(e)}function registerCoreComponents(e){_registerComponent(new Component("platform-logger",e=>new PlatformLoggerServiceImpl(e),"PRIVATE")),registerVersion(name$o,version$1,e),registerVersion("fire-js","")}registerCoreComponents();var name="firebase",version="9.0.0";registerVersion(name,version,"cdn");export{FirebaseError,SDK_VERSION,DEFAULT_ENTRY_NAME as _DEFAULT_ENTRY_NAME,_addComponent,_addOrOverwriteComponent,_apps,_clearComponents,_components,_getProvider,_registerComponent,_removeServiceInstance,deleteApp,getApp,getApps,initializeApp,onLog,registerVersion,setLogLevel};