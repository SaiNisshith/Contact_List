const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact');

let app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

// middle ware

app.use(express.static('assets'));


let ContactList = [
    {
        name: "S Pratap Reddy",
        phNo: "9821235764"
    },
    {
        name: "S Susmitha",
        phNo: "9823761909"
    }
];

app.get('/',function(req,res){

    Contact.find({})
        .then((data)=>{
            return res.render('home', {
                'title' : 'Contact List',
                'contact_list':data
            });
        }).catch((data)=>{
            console.log("Error Occured in fetching the Data");
            return;
        })
});

app.get('/extra',function(req,res){
    return res.render('extra');
});

//using query
app.get('/delete-contact',function(req,res){
    // console.log(req.query.phNo);
    // let ph = req.query.phNo;
    // let nC = [];
    // let ind ;
    // for(let i=0; i<ContactList.length; i++){
    //     if(ContactList[i].phNo==ph){
    //         ind = i;
    //     }
    // }
    // ContactList.splice(ind,1);
    let id = req.query.id;
    Contact.findByIdAndDelete(id)
        .then((data)=>{
            return res.redirect('back');
        }).catch((err)=>{
            console.log("Error in Deleting");
            return;
        })
    
});


app.post('/createcontact', function(req,res){
    // return res.redirect('extra');
    // ContactList.push(req.body);
    // ContactList.push({
    //     name: req.body.name,
    //     phNo: req.body.phNo
    // })
    // Contact.create({
    //     name: req.body.name,
    //     phNo: req.body.phNo
    // },function(err,newContact){
    //     if(err){
    //         console.log("Error in creating a new contact");
    //         return;
    //     }
    //     console.log('*********',newContact);
    //     return res.redirect('back');
    // })
    // console.log(req.body);
    Contact.create({
        name:req.body.name,
        phNo: req.body.phNo
    }).then((data)=>{
        console.log("******",data);
        return res.redirect('back');
    }).catch((err)=>{
        console.log("Error Occured");
        return res.redirect('back');
    })
    // return res.redirect('/');
});

app.listen(port,function(err){
    if(err){
        console.log("Error");
        return;
    }
    console.log("Server is running fine in the port: ",port);
})