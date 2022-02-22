const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("user")
 
 
ac.grant("superadmin")
 .extend("admin")
 
 
ac.grant("admin")
 .extend("user")
 .extend("superadmin")
 
return ac;
})();