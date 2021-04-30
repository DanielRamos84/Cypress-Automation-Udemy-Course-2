// Cypress.Commands.add('LoginToApplication',()=>{
//                 cy.request({
//                     url: "https://conduit.productionready.io/api/users/login",
//                     method: "POST",
//                     body: {
//                         user: {email: "conduittester2021@email.com", password: "conduittester2021"}
//                     }
//                 // }).then(res => cy.log(res))
//                 }).its('body')  
//                 .then(res=> localStorage.setItem('jwtToken', res.user.token))
//                 cy.visit('/')
//     });

Cypress.Commands.add('LoginToApplication',()=>{
    
    const userCredentials = {
        "user": {
            "email": "conduittester2021@email.com",
            "password": "conduittester2021"
        }
    }

    cy.request('POST', 'https://conduit.productionready.io/api/users/login', userCredentials)
    .its('body')  
    .then(res=> localStorage.setItem('jwtToken', res.user.token))
    cy.visit('/')
})
