'use strict';

module.exports = function(Cuenta) {
  ((ModelType, ModelConfig) => {
    ModelType.settings.acls.length = 0;
    ModelConfig.acls.forEach(function(r) {
      ModelType.settings.acls.push(r);
    });
  })(Cuenta, require('./cuenta.json'));
};
