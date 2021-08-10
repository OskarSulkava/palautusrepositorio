import { waitFor } from "@testing-library/react"

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'testiacco', name: 'Testaaja', password: 'salainen'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
      cy.contains('Username')
      cy.contains('Password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testiacco')
      cy.get('#password').type('salainen')
      cy.get('#loginbtn').click()

      cy.contains('Testaaja is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('fail')
      cy.get('#password').type('salainen')
      cy.get('#loginbtn').click()

      cy.get('.error').contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testiacco', password: 'salainen'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      })
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('Cypressin alkeet')
      cy.get('#author').type('Testi Seppo')
      cy.get('#url').type('www.cypress.com')
      cy.get('#formsub').click()

      cy.contains('Cypressin alkeet')
    })

    describe('and when a blog exists', function () {
      beforeEach(function (){
        cy.createBlog({
          title: 'Aloitus blogi', 
          author: 'Testeri', 
          url: 'Ei osoitetta'
        })
      })

      it('A blog can be liked', function() {
        cy.contains('Aloitus blogi')
          .contains('View').click()
        
        cy.get('.blog').contains('Like').click()
        cy.get('.blog').should('contain', '1')
      })

      it('A blog can be deleted', function() {
        cy.contains('Aloitus blogi')
          .contains('View').click()
        
        cy.get('.blog').contains('Remove').click()
        cy.get('.blog').should('not.exist')
      })
    })

    describe('when multiple blogs exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Blogi 1', 
          author: 'Testeri', 
          url: 'Ei osoitetta'
        })
        cy.createBlog({
          title: 'Blogi 2', 
          author: 'Testeri', 
          url: 'Ei osoitetta'
        })
        cy.createBlog({
          title: 'Blogi 3', 
          author: 'Testeri', 
          url: 'Ei osoitetta'
        })
      })
      
      it('blogs are arranged by likes', function() {
        cy.contains('Blogi 1').contains('View').click()
        cy.contains('Blogi 2').contains('View').click()
        cy.contains('Blogi 3').contains('View').click()

        cy.contains('Blogi 3').contains('Like').click()
        cy.contains('Blogi 2').contains('Like').click()
        cy.contains('Blogi 1').contains('Like').click()
        cy.wait(1000)
        cy.contains('Blogi 3').contains('Like').click()
        cy.contains('Blogi 2').contains('Like').click()
        cy.wait(1000)
        cy.contains('Blogi 3').contains('Like').click()

        cy.visit('http://localhost:3000')

        cy.get('.blog:first').should('contain', 'Blogi 3')
      })
    })
    
  })
})