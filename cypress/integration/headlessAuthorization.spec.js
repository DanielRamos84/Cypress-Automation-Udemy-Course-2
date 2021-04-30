// ///<reference types= "Cypress"/>

describe('Log into application with token',{baseUrl: "http://localhost:4200/"}, ()=>{

beforeEach(()=>{
    // cy.request({
    //     url: "https://conduit.productionready.io/api/users/login",
    //     method: "POST",
    //     body: {
    //         user: {email: "conduittester2021@email.com", password: "conduittester2021"}
    //     }
    // // }).then(res => cy.log(res))
    // }).its('body')  
    // .then(res=> localStorage.setItem('jwtToken', res.user.token))
    // cy.visit('/')
    cy.LoginToApplication();
})

    
it('some test',()=>{
            cy.contains('Your Feed').should('have.text', ' Your Feed ')
        })
})