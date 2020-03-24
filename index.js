const Telegraf = require('telegraf')
const telegram = require('telegram-bot-api')
//const TelegramBot=require('node-telegram-bot-api');
const TelegrafFlow = require('telegraf-flow')
const { Scene } = TelegrafFlow
const TOKEN = '1071798096:AAGOrRniVHN11SOsOk-9bbjmLbXIk1wV7l8';
const flow = new TelegrafFlow()
var username;



// scenes 
const ageScene = new Scene('age')
ageScene.enter((ctx) => {ctx.reply('Please enter your age first');})
ageScene.on('message', (ctx) => {
    let age=ctx.message.text;
    if(isNaN(age) || age<0 || age >120 || age%1!=0 || age==0){
        ctx.flow.enter('errorAge',ctx.flow.state);//move to the next scene with the saved variable
    }
    else{
    ctx.flow.state.age=age; //saving the variable
    ctx.flow.enter('gender',ctx.flow.state);//move to the next scene with the saved variable
    }
})
const errorAgeScene = new Scene('errorAge')
errorAgeScene.enter((ctx) => ctx.reply('Please enter your age first'))
errorAgeScene.on('message', (ctx) => {
    let age = ctx.message.text;
    if(isNaN(age) || age<0 || age >120 || age%1!=0 || age==0){
        ctx.flow.enter('age',ctx.flow.state);//move to the next scene with the saved variable
    }
    else{
    ctx.flow.state.age = age;//saving the variable
    ctx.flow.enter('gender', ctx.flow.state);//move to the next scene with the saved variable
    }
})


const genderScene = new Scene('gender')
genderScene.enter((ctx) => ctx.reply('Great! Can you tell us your gender?'))
genderScene.on('message', (ctx) => {
    let gender = ctx.message.text;
    if(gender=="Female" || gender=="Male" || gender=="female" || gender=="male" || gender=="F" || gender=="M" || gender=="f" || gender=="m"){
        ctx.flow.state.gender = gender;//saving the variable
        ctx.flow.enter('symptom', ctx.flow.state);//move to the next scene with the saved variable
        
    }
    else{
    ctx.flow.enter('errorGender', ctx.flow.state);//move to the next scene with the saved variable
    }
})

const errorGenderScene = new Scene('errorGender')
errorGenderScene.enter((ctx) => ctx.reply('Great! Can you tell us your gender?'))
errorGenderScene.on('message', (ctx) => {
    let gender = ctx.message.text;
    
    if(gender=="Female" || gender=="Male" || gender=="female" || gender=="male" || gender=="F" || gender=="M" || gender=="f" || gender=="m"){
        ctx.flow.state.gender = gender;//saving the variable
        ctx.flow.enter('symptom', ctx.flow.state);//move to the next scene with the saved variable
        
    }
    else{
    ctx.flow.enter('gender', ctx.flow.state);//move to the next scene with the saved variable
    }
    
})

const symptomScene = new Scene('symptom')
symptomScene.enter((ctx) => {ctx.reply('Now please send us your questions and concerns')})
symptomScene.on('message', (ctx) => {
    let symptom = ctx.message.text;
    ctx.flow.state.symptom = symptom;//saving the variable
    ctx.reply('Thank You for your inquiry, we will get back to you soon! For more information follow us on https://t.me/joinchat/AAAAAEbS3BxBiP4AoA_dew')
    ctx.flow.enter('send',ctx.flow.state);//move to the next scene with the saved variable

})

const sendScene = new Scene('send')
sendScene.enter((ctx) => {
    let age = ctx.flow.state.age;//retriving the data
    let gender = ctx.flow.state.gender;//retriving the data
    let symptom = ctx.flow.state.symptom;//retriving the data
    let startDate=Date();
    userid = ctx.from.id;//retriving the username 
    let data = 'ID: '+userid + "\n"+'Age: '+age+"\n"+'Gender: '+gender+"\n"+'Symptom: '+symptom +"\n"+'Date: '+startDate ;
    ctx.telegram.sendMessage(337054173,data+"hi");//me

    if(userid%10==0){
        let data = 'ID: '+userid + "\n"+'Age: '+age+"\n"+'Gender: '+gender+"\n"+'Symptom: '+symptom;
        ctx.telegram.sendMessage(314860464,data);//Etsegenet
        }
    else if(userid%3==0 || userid%5==0){
        let data = 'ID: '+userid + "\n"+'Age: '+age+"\n"+'Gender: '+gender+"\n"+'Symptom: '+symptom;
        ctx.telegram.sendMessage(481130858,data);//lelina
        }
    else if(userid%7==0 || userid%2==0){
            let data = 'ID: '+userid + "\n"+'Age: '+age+"\n"+'Gender: '+gender+"\n"+'Symptom: '+symptom;
            ctx.telegram.sendMessage(324898609,data);//Salsa
    }
        else{
            let data = 'ID: '+userid + "\n"+'Age: '+age+"\n"+'Gender: '+gender+"\n"+'Symptom: '+symptom;
        ctx.telegram.sendMessage(326568244,data);//Si
        }
        /*
    else if(userid%8==0){
        let data = 'ID: '+userid + "\n"+'Age: '+age+"\n"+'Gender: '+gender+"\n"+'Symptom: '+symptom;
        ctx.telegram.sendMessage(334624780,data);//baharu
        }
    else if(userid%7==0){
        let data = 'ID: '+userid + "\n"+'Age: '+age+"\n"+'Gender: '+gender+"\n"+'Symptom: '+symptom;
        ctx.telegram.sendMessage(326568244,data);//si
        }
    else if(userid%6==0){
        let data = 'ID: '+userid + "\n"+'Age: '+age+"\n"+'Gender: '+gender+"\n"+'Symptom: '+symptom;
        ctx.telegram.sendMessage(334624780,data);
        }
    else if(userid%5==0){
        let data = 'ID: '+userid + "\n"+'Age: '+age+"\n"+'Gender: '+gender+"\n"+'Symptom: '+symptom;
        ctx.telegram.sendMessage(334624780,data);
        }
    else if(userid%4==0){
        let data = 'ID: '+userid + "\n"+'Age: '+age+"\n"+'Gender: '+gender+"\n"+'Symptom: '+symptom;
        ctx.telegram.sendMessage(334624780,data);
        }
    else if(userid%3==0){
        let data = 'ID: '+userid + "\n"+'Age: '+age+"\n"+'Gender: '+gender+"\n"+'Symptom: '+symptom;
        ctx.telegram.sendMessage(334624780,data);
        }
    else if(userid%2==0){
        let data = 'ID: '+userid + "\n"+'Age: '+age+"\n"+'Gender: '+gender+"\n"+'Symptom: '+symptom;
        ctx.telegram.sendMessage(334624780,data);
        }
    */
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//feedback message
const patientIdScene = new Scene('patientId')
patientIdScene.enter((ctx) => {ctx.reply('Enter the Id of your patient');})
patientIdScene.on('message', (ctx) => {
    let patientId=ctx.message.text;
    ctx.flow.state.patientId=patientId; //saving the variable
    ctx.flow.enter('feedback',ctx.flow.state);//move to the next scene with the saved variable
})

const feedbackScene = new Scene('feedback')
feedbackScene.enter((ctx) => {ctx.reply('Enter your Diagnosis');})
feedbackScene.on('message', (ctx) => {
    let feed=ctx.message.text;
    ctx.flow.state.feed=feed; //saving the variable
    ctx.flow.enter('replys',ctx.flow.state);//move to the next scene with the saved variable
})

const replyScene = new Scene('replys')
replyScene.enter((ctx) => {
    let feed = ctx.flow.state.feed;//retriving the data
    let patientId=ctx.flow.state.patientId;
    //console.log(username);
    let data = 'The diagnosis and treatment is as follows: '+ "\n"+feed ;
    ctx.telegram.sendMessage(patientId,data);
})

const helpScene = new Scene('help')
helpScene.enter((ctx) => {ctx.reply('/start: To communicate with our Doctors. Enter a Valid age [1-120]. Enter gender as Male or Female');})




// Scene registration

flow.register(ageScene)
flow.register(errorAgeScene)
flow.register(genderScene)
flow.register(errorGenderScene)
flow.register(symptomScene)
flow.register(sendScene)
flow.register(patientIdScene)
flow.register(feedbackScene)
flow.register(replyScene)
flow.register(helpScene)

const bot = new Telegraf(TOKEN)
// Flow requires valid Telegraf session
bot.use(Telegraf.session())
bot.use(flow.middleware())
bot.command('start', (ctx) => {ctx.reply('Welcome to AskHEY Bot!'); console.log('started from:'+ctx.from.id); ctx.flow.enter('age'); })
bot.command('reply', (ctx) => {ctx.reply('Welcome! Doctors'); console.log('started from:'+ctx.from.id); ctx.flow.enter('patientId'); })
bot.command('help', (ctx) => {ctx.reply('The commands you can use are:'); console.log('started from:'+ctx.from.id); ctx.flow.enter('help'); })
bot.startPolling()