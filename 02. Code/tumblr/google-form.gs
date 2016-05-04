function Initialize(){
  var triggers = ScriptApp.getScriptTriggers();
  for(var i in triggers){
    ScriptApp.deleteTrigger(triggers[i]);
  }
  ScriptApp.newTrigger("SendGoogleForm")
  .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
  .onFormSubmit()
  .create();
}
function SendGoogleForm(e){
  try{
    // E-mail address of owner
    // var email = Session.getActiveUser().getEmail();
    var email = "naoki.kephart@gmail.com";
    var ccemail = "";

    // Edit as needed
    var subject = "ウェブサイトよりお問い合わせ";
    var ccsubject = "【自動返信】自然酵母 山のパン屋";
 
    var s = SpreadsheetApp.getActiveSheet();
    var columns = s.getRange(1,1,1,s.getLastColumn()).getValues()[0];

    var message_head = "ウェブサイトより下記のお問い合わせが送信されました。\n\n"; 
    var message_body = "";

    var ccmessage_name = "";
    var ccmessage = "";
    var ccmessage_head = "この度は、お問い合わせありがとうございます。\n";
    var ccmessage_before = "下記の内容で承りました。内容を確認次第、メールかお電話にてご返信いたします。\nお返事には2～3日かかる場合がございます。それ以降も連絡がない場合は\nお手数ですが yamanopanya@gmail.com 宛てに再度ご連絡をお願いいたします。\n";
    var ccmessage_after = "本メールに心当たりの無い方は、大変お手数ですがこのメールへの返信にてご連絡ください。\n-----\n自然酵母 山のパン屋\nE-mail:  yamanopanya@gmail.com\nWeb:  yamanopanya.tumblr.com\nFacebook:  www.facebook.com/yamanopanya\n";

    for ( var keys in columns ){
      var key = columns[keys];
      if (e.namedValues[key] && (e.namedValues[key] != "")){
        message_body += "【" + key + "】\n" + e.namedValues[key] + "\n\n";
        ccmessage += "【" + key + "】\n" + e.namedValues[key] + "\n\n";
      }
      if (keys == 1){
        ccmessage_name = e.namedValues[key] + " 様\n\n";
      }
      if (keys == 3){
        ccemail = e.namedValues[key];
      }
    }
    
    var message = message_head + message_body;
    var ccmessage = ccmessage_name + ccmessage_head + ccmessage_before + "-----\n\n" + message_body + "-----\n" + ccmessage_after;

    MailApp.sendEmail(email, subject, message);
    MailApp.sendEmail(ccemail, ccsubject, ccmessage);
  }    
  catch (e){
    Logger.log(e.toString());
  }
}