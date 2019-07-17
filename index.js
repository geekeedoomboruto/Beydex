const botconfig = require("botconfig.json"); //Truc a importer
const Discord = require("discord.js"); //Truc a importer
const bot = new Discord.Client({disableEveryone: true}); //truc a importer
const translate = require('translate'); //truc a importer
var googleSearcher = require("google-searcher") //truc a importer
bot.on("ready", async () => { //Quand le bot est pret
  console.log('Beylogger is online!');
  let activity = ["Beyblade Burst","Vous servir","Mise a jour","Maintenance"]
  // 0: Normal, 1: Nouvelles fonctionnalites, 2: MAJ, 3: Maintenance
  bot.user.setActivity(activity[0]);

});
bot.on("message", async message => {
  if(message.author.bot) return; // Si jamais l'auteur du message est un bot comme Beydex ou bien mee6, il va pas repondre
  if(message.channel.type === "dm") return; // Si jamais le client l'envoie un message prive il va pas repondre
  let prefix = botconfig.prefix; // pour le prefixe du bot
  let messageArray = message.content.split("=");
  let cmd = messageArray[0]; //pour trouver la commande faite par le client
  let bey_name = messageArray[1]; // specifique a la commande !bey, elle trouve le nom du bey
  let args = messageArray.slice(1); // un truc inutile mais utile
  if(message.content == '!hello'){ // commande test qui envoie hello
    return message.channel.send("Hello!");
  }
  if (cmd === "!bey"){ //commande qui envoie les infos sur les beys : !bey=<nom de la bey>
    var fs = require('fs');
    var bey = message.content;
    var bey11 = bey.split("=");
    fs.readFile('./beys/'+bey11[1]+".txt",'utf8',function(error, data){
      console.log(data);
      bey_info = data
      return message.channel.send(bey_info)

    });
  }
  if (cmd === "!trans"){ // qui traduit
    var all = message.content;
    var word = bey.split("=");
    const text = await translate(word[1], 'fr');
    return message.channel.send(text)
  }
  if (cmd === "cafard!"){
    return message.channel.send("Je ne suis pas venu ici pour souffrir OKAY!!!!!")
  }
  if (cmd === "ah!"){
    return message.channel.send("Mais oui c'est clair")
  }
  if (cmd === "!search"){ //qui cherche un truc dans l'internet
    search = (message.content).split("=");
    const GoogleSearch = require("./index");
    new GoogleSearch()
        .host("www.google.com")
        .lang("fr")
        .query(search[1])
        .exec()
        .then(results => {
            return message.channel.send(results[0]) // https://www.youtube.com/watch?v=qb_hqexKkw8
        });
  }

// C'est la version 2.1.1
});

bot.login(botconfig.token); //Pour que le bot se connecte a l'API
