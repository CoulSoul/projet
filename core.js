const express = require('express')
const twig = require('twig')
const mysql = require('mysql')  
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')


 


    var app = express();

//Moteur de template

    app.set('view engine', 'twig')

// Middleware

    app.use(express.static('views'))
    app.use(bodyParser.urlencoded({ extended: false}))
    app.use(bodyParser.json())
    app.use(expressValidator())
    app.use(session({
        secret: 'keyboad cat',
        resave: false,
        saveUninitialized: false,
        cookie:{ secure: false}
      }))
    app.use(require('./Middlewares/flash'))
    
//Routes


      app.get('/', function(req, res){
          res.render('index')
      })

    //   app.get('/', function(req, res){
    //       if(req.session.ley){
    //           res.render('/')
    //       }else{
    //           res.redirect('/connexion')
    //       }
    //   })

      app.get('/connexion', function(req, res){
        console.log(req.session)
          res.render('connexion')
      })

      app.post('/connexion', function(req, res){
        req.check('email',).isEmail();
        req.check('code',).notEmpty()
        const error = req.validationErrors();
        if(error)
        {
            req.flash('error', 'Veuillez remplir tous les champs correctement :(')
            res.redirect('/connexion')
        }else{
         const email = req.body.email
         const code = req.body.code
        
         if(email && code)
          connection = require('./config/db')
          connection.query("SELECT * FROM user WHERE email = ? AND code = ?", [email, code], function(err, result){
                if(result.length > 0){
                  req.session.ley = true
                  
                  res.redirect('/commander')
                }else{
                  req.flash('error2', 'Adresse ou mot de passe  incorrete !')
                  res.redirect('/connexion')
                }
         })
          
       }
      })

      app.get('/inscription', function(req,res){
        res.render('inscription')
      })

      app.post('/inscription', function(req,res){
        req.check('prenom').notEmpty()
        req.check('nom').notEmpty()
        req.check('phone').notEmpty()
        req.check('email').isEmail();
        req.check('code').notEmpty()
        const error = req.validationErrors();
        if(error)
        {
            req.flash('error', 'Veuillez remplir tous les champs correctement :(')
            res.redirect('/inscription')
        }else{
          let User = require('./models/user')
          User.create(req.body.prenom,req.body.nom,req.body.phone,req.body.email,req.body.code, function(){
            req.flash('succes', 'inscription Reussie :)')
            res.redirect('/inscription')
          })
        }
        
      })

      app.get('/commander', function(req, res){
        if(req.session.ley){
          res.render('commander')
        }else{
          res.redirect('/connexion')
        }
        
      })

      app.get('/index', function(req, res){
        res.render('index')
      })

      app.get('/temoignage', function(req, res){
        let Message = require('./models/message')
        Message.all(function(messages){
          res.render('temoignage', { messages: messages})
        })
        
      })

      app.post('/temoignage', function(req, res){
                  

        req.check('message').notEmpty()
        const error = req.validationErrors()
        if(error){
          req.flash('error', "Vous n'avez pas posté de message :(")
          res.redirect('/temoignage')
        }else{
          let Message = require('./models/message')
          Message.create(req.body.message, function(){
            req.flash('success', "Merci !")
            res.redirect('/temoignage')
          })
        }
      })

      app.get('/deconnection',function(req,res){
        delete req.session.ley
        res.redirect('index')
      })

      app.get('/livraison', function(req, res){
        res.render('livraison')
      })

       app.post('/livraison', function(req,res){
        req.check('nom').notEmpty()
        req.check('prenom').notEmpty()
        req.check('telephone').notEmpty()
        req.check('telephone2').notEmpty();
        const error = req.validationErrors();
        if(error)
        {
            req.flash('error', 'Les champs ne sont pas remplir correctement :(')
            res.redirect('/livraison')
        }else{
         
            req.flash('succes', 'Commande validée :)')
            res.redirect('/livraison')
        }
        
      })
      
      app.listen(8081)


