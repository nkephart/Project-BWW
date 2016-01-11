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

    var message_head = "以下のお問い合わせが送信されました。\n\n"; 
    var message_body = "";

    var ccmessage_name = "";
    var ccmessage = "";
    var ccmessage_head = "この度は、お問い合わせありがとうございます。\n";
    var ccmessage_before = "以下の内容で承りました。内容を確認次第、メールかお電話にてお返事を差し上げます。\n\n※ お返事には2〜3日かかる場合がございます。それ以降も連絡がない場合は大変お手数ですが、XXXX-XX-XXXXまで再度ご連絡ください。\n\n";
    var ccmessage_sep = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"
    var ccmessage_after = "※ 本メールに心当たりの無い方は、大変お手数ですがこのメールに返信の形でご連絡ください。";

    for ( var keys in columns ){
      var key = columns[keys];
      if (e.namedValues[key] && (e.namedValues[key] != "")){
        message_body += "【" + key + "】\n" + e.namedValues[key] + "\n\n";
        ccmessage += "【" + key + "】\n" + e.namedValues[key] + "\n\n";
      }
      if (keys == 2){
        ccmessage_name = e.namedValues[key] + " さま\n\n";
      }
      if (keys == 3){
        ccemail = e.namedValues[key];
      }
    }
    
    var message = message_head + message_body;
    var ccmessage = ccmessage_name + ccmessage_head + ccmessage_before + ccmessage_sep + message_body + ccmessage_sep + ccmessage_after;

    MailApp.sendEmail(email, subject, message);
    MailApp.sendEmail(ccemail, ccsubject, ccmessage);
  }    
  catch (e){
    Logger.log(e.toString());
  }
}

