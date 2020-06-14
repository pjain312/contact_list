const express = require('express');
const path = require('path');
const port = 8001;

const db = require('./config/mongoose');

const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//middle ware
app.use(express.urlencoded());
//access static files
app.use(express.static('asset'));
//middleware1

// app.use(function(req,res,next){
//     console.log("Middle Ware 1 called");
//     next();
// });

 //middleware2

// app.use(function(req,res,next){
//     console.log("Middle Ware 2 called");
//     next();
// });


// var contactList = [
//     {
//         name: "prachi",
//         phone : "111111111"
//     },
//     {
//         name : "vasu",
//         phone : "11111111"
//     }
// ]
app.get('/', function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contact');
            return;
        }
        return res.render('home',{
            title : "My Contacts List",
            contact_list : contacts
        });
    });
    
});

app.get('/practice', function(req,res){

    return res.render('practice', {
        title : "playground"
    });
});

app.post('/create-contact',function(req,res){
    // contactList.push(req.body);
    // return res.redirect('back');

    Contact.create({
        name: req.body.name,
        phone: req.body.phone } , function(err,newContact){
            if(err){console.log('error in creating a new contact');
            return;
        }
        console.log('*******',newContact);
        return res.redirect('back');

        });
});

app.get('/delete-contact/',function(req,res){
    let id = req.query.id;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }
    // return res.redirect('back');

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('err in deleting a contact from DB');
            return;
        }
        return res.redirect('back');
    });
});

app.listen(port, function(err)
{
    if(err)
    {
        console.log('error in running the server', err);
    }

    console.log('yup, my express server is running on port',port);
});