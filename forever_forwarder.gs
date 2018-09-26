Logger.clear();
  
function email_forwarder(label) {
  email_responder(label);
  label_remover(label);
  Logger.log('finished label %s', label);
}

function email_responder(label) {
  //go over all emails with the label and respond to them
  var thread = GmailApp.search("label:" + label);
  if (thread.length >0) {
    for (var x = 0; x < thread.length; x++) {
      var messages = thread[x].getMessages();
      for (var y = 0; y < messages.length; y++) {  
        Logger.log('responded to %s', messages[y].getSubject());
        messages[y].reply("New contact",{
          htmlBody: response_mapper(label),
          noReply: true
        });
      }
    }
  }
}

function response_mapper(label) {
  if (label === "blood") {
    return "Hi! <br>" +
           "It looks like your email contains the word 'blood' and has been caught by my auto-responder. <br>" +
           "I no longer work at Puppet, so you'll want to reach out to _____ for blood drive info. <br>" +
           "If you weren't trying to email about blood drives, _____ might be able to help you <br>" +
           "unless you were really trying to get a hold of me, in which case..."
  } else if (label === "bikes") {
    return "Hi! <br>" +
           "It looks like your email contains words related to biking and has been caught by my auto-responder. <br>" +
           "I no longer work at Puppet, so you'll want to reach out to _____ for information on our biking programs. <br>" +
           "If you weren't trying to email about bikes, _____ might be able to help you get whatever you're looking for. <br>" 
  } else if (label === "hackathon") {
    return "Hi! <br>" +
           "It looks like your email contains the words 'hackathon' or 'meetup' and has been caught by my auto-responder. <br>" +
           "I no longer work at Puppet, so you'll want to reach out to _____ for info about hosting events at Puppet. <br>" +
           "If you weren't trying to email about events, _____ might be able to help you get what you're looking for.<br>" +
           "unless you were really trying to get a hold of me, in which case..."
 } else {
   return "Hi! <br>" +
          "I no longer work at Puppet- _____ will be able to help you get what you were looking for."
 }
}

function label_remover(label) {
  var myLabel = GmailApp.getUserLabelByName(label);
  if (myLabel) {
    var threads = myLabel.getThreads();
    for (var x in threads) {
      var thread = threads[x];
      thread.removeLabel(myLabel);
    }
  }
}

email_forwarder('hackathon');
email_forwarder('blood');
email_forwarder('bikes');
email_forwarder('other');
