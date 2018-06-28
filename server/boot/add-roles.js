'use strict';

module.exports = function addRoles(server) {
  var Role = server.models.Role;
  var RoleMapping = server.models.RoleMapping
  var Cuenta = server.models.Cuenta
  
  const ADMIN = "admin", SUPERADMIN = "superadmin"
  const ROLES = [ ADMIN, SUPERADMIN ]
  const AGENTS = [
    { email: "caleb.viola@ctc.edu.do", role: SUPERADMIN }
  ]

  ROLES.forEach( ROLE =>{
    Role.create({ name: ROLE }, () => { /* Ignore errors*/})
  })

  AGENTS.forEach( AGENT => {
    Role.findOne({where: {name: AGENT.role}}, (err, role) => {
      Cuenta.findOne({where: {email: AGENT.email}}, (err, cuenta)=>{
        if(err || !cuenta) return
        RoleMapping.findOne({where: {principalId: cuenta.id}}, (err, principal)=>{
          if(principal) return
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: cuenta.id
          }, ()=>{
            cuenta.rol = AGENT.role
            cuenta.save()
          })
        })
      })
    })
  })
}