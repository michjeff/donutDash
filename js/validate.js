/*
 * validate.js 1.2.2
 * Copyright (c) 2013 Rick Harrison, http://rickharrison.me
 * validate.js is open sourced under the MIT license.
 * Portions of validate.js are inspired by CodeIgniter.
 * http://rickharrison.github.com/validate.js
 */

(function(n,p,j){var q={required:"The %s field is required.",matches:"The %s field does not match the %s field.",valid_email:"The %s field must contain a valid email address.",valid_emails:"The %s field must contain all valid email addresses.",min_length:"The %s field must be at least %s characters in length.",max_length:"The %s field must not exceed %s characters in length.",exact_length:"The %s field must be exactly %s characters in length.",greater_than:"The %s field must contain a number greater than %s.",less_than:"The %s field must contain a number less than %s.",alpha:"The %s field must only contain alphabetical characters.",alpha_numeric:"The %s field must only contain alpha-numeric characters.",alpha_dash:"The %s field must only contain alpha-numeric characters, underscores, and dashes.",numeric:"The %s field must contain only numbers.",integer:"The %s field must contain an integer.",decimal:"The %s field must contain a decimal number.",is_natural:"The %s field must contain only positive numbers.",is_natural_no_zero:"The %s field must contain a number greater than zero.",valid_ip:"The %s field must contain a valid IP.",valid_base64:"The %s field must contain a base64 string.",valid_credit_card:"The %s field must contain a vaild credit card number",is_file_type:"The %s field must contain only %s files.",valid_url:"The %s field must contain a valid URL."},r=function(){},s=/^(.+?)\[(.+)\]$/,k=/^[0-9]+$/,t=/^\-?[0-9]+$/,h=/^\-?[0-9]*\.?[0-9]+$/,m=/^[a-zA-Z0-9.!#$%&amp;'*+\-\/=?\^_`{|}~\-]+@[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*$/,u=/^[a-z]+$/i,v=/^[a-z0-9]+$/i,w=/^[a-z0-9_\-]+$/i,x=/^[0-9]+$/i,y=/^[1-9][0-9]*$/i,z=/^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,A=/[^a-zA-Z0-9\/\+=]/i,B=/^[\d\-\s]+$/,C=/^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,g=function(a,b,c){this.callback=c||r;this.errors=[];this.fields={};this.form=p.forms[a]||{};this.messages={};this.handlers={};a=0;for(c=b.length;a<c;a++){var d=b[a];d.name&&d.rules&&(this.fields[d.name]={name:d.name,display:d.display||d.name,rules:d.rules,id:null,type:null,value:null,checked:null})}var e=this.form.onsubmit,f=this;this.form.onsubmit=function(a){try{return f._validateForm(a)&&(e===j||e())}catch(b){}}},l=function(a,b){var c;if(0<a.length&&"radio"===a[0].type)for(c=0;c<a.length;c++){if(a[c].checked)return a[c][b]}else return a[b]};g.prototype.setMessage=function(a,b){this.messages[a]=b;return this};g.prototype.registerCallback=function(a,b){a&&("string"===typeof a&&b&&"function"===typeof b)&&(this.handlers[a]=b);return this};g.prototype._validateForm=function(a){this.errors=[];for(var b in this.fields)if(this.fields.hasOwnProperty(b)){var c=this.fields[b]||{},d=this.form[c.name];d&&d!==j&&(c.id=l(d,"id"),c.type=0<d.length?d[0].type:d.type,c.value=l(d,"value"),c.checked=l(d,"checked"),this._validateField(c))}"function"===typeof this.callback&&this.callback(this.errors,a);0<this.errors.length&&(a&&a.preventDefault?a.preventDefault():event&&(event.returnValue=!1));return!0};g.prototype._validateField=function(a){var b=a.rules.split("|");if(!(-1===a.rules.indexOf("required")&&(!a.value||""===a.value||a.value===j))||!(-1===a.rules.indexOf("callback_")||null===a.value))for(var c=0,d=b.length;c<d;c++){var e=b[c],f=null,g=!1,h=s.exec(e);h&&(e=h[1],f=h[2]);"function"===typeof this._hooks[e]?this._hooks[e].apply(this,[a,f])||(g=!0):"callback_"===e.substring(0,9)&&(e=e.substring(9,e.length),"function"===typeof this.handlers[e]&&!1===this.handlers[e].apply(this,[a.value])&&(g=!0));if(g){b=this.messages[e]||q[e];c="An error has occurred with the "+a.display+" field.";b&&(c=b.replace("%s",a.display),f&&(c=c.replace("%s",this.fields[f]?this.fields[f].display:f)));this.errors.push({id:a.id,name:a.name,message:c,rule:e});break}}};g.prototype._hooks={required:function(a){var b=a.value;return"checkbox"===a.type||"radio"===a.type?!0===a.checked:null!==b&&""!==b},matches:function(a,b){var c=this.form[b];return c?a.value===c.value:!1},valid_email:function(a){return m.test(a.value)},valid_emails:function(a){a=a.value.split(",");for(var b=0;b<a.length;b++)if(!m.test(a[b]))return!1;return!0},min_length:function(a,b){return!k.test(b)?!1:a.value.length>=parseInt(b,10)},max_length:function(a,b){return!k.test(b)?!1:a.value.length<=parseInt(b,10)},exact_length:function(a,b){return!k.test(b)?!1:a.value.length===parseInt(b,10)},greater_than:function(a,b){return!h.test(a.value)?!1:parseFloat(a.value)>parseFloat(b)},less_than:function(a,b){return!h.test(a.value)?!1:parseFloat(a.value)<parseFloat(b)},alpha:function(a){return u.test(a.value)},alpha_numeric:function(a){return v.test(a.value)},alpha_dash:function(a){return w.test(a.value)},numeric:function(a){return h.test(a.value)},integer:function(a){return t.test(a.value)},decimal:function(a){return h.test(a.value)},is_natural:function(a){return x.test(a.value)},is_natural_no_zero:function(a){return y.test(a.value)},valid_ip:function(a){return z.test(a.value)},valid_base64:function(a){return A.test(a.value)},valid_url:function(a){return C.test(a.value)},valid_credit_card:function(a){if(!B.test(a.value))return!1;var b=0,c=0,d=!1;a=a.value.replace(/\D/g,"");for(var e=a.length-1;0<=e;e--){c=a.charAt(e);c=parseInt(c,10);if(d&&9<(c*=2))c-=9;b+=c;d=!d}return 0===b%10},is_file_type:function(a,b){if("file"!==a.type)return!0;var c=a.value.substr(a.value.lastIndexOf(".")+1),d=b.split(","),e=!1,f=0,g=d.length;for(f;f<g;f++)c==d[f]&&(e=!0);return e}};n.FormValidator=g})(window,document);