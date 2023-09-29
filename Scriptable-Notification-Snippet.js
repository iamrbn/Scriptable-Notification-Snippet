/*#################################################################################################
The most of my scripts has this notification module. Check them out, for more details and how they usually works.
#################################################################################################*/

// *** = important for images as attachment


// CREATE KEYCHAIN. THE KEYCHAIN IS A SECURE STORAGE FOR CREDENTIALS, KEYS ETC. STORED JUST IN THIS SCRIPT ON THIS DEVICE!
let nKey = Keychain
let nParamter = await args.notification //***

if (Config.runsInNotification) QuickLook.present(nParameter.userInfo.image) // important for images as attachment

// GET DATAS FROM JSON API
let apiRequest = new Request('https://example.com/api')
let apiResponse = await apiRequest.loadJSON()

// CHECKS IF THE KEY IS ALREADY SET ON THE DEVICE (IMPORTANT FOR THE FIRST RUN)
if (!nKey.contains("key_name")) nKey.set("key_name", apiResponse.valueID)

// CHECK IF THE VALUE FROM THE INTERFACE IS NOT EQUAL TO THE STORED VALUE
if (nKey.get("key_name") != apiResponse.valueID) await runNotification()

// FUNCTION FOR THE PUSH NOTIFICATION
async function runNotification(){
  //check out the scriptable docu for more details: https://docs.scriptable.app/notification
  let pn = new Notification()
      pn.title = 'STRING'
      pn.subtitle = 'STRING'
      pn.body = 'STRING'
      pn.openURL = 'STRING'
      pn.addAction('STRING', 'STRING') //e. g. "open url", apiResponse.url
      pn.identifier = 'STRING' //preferably something unique (UUID)
      pn.threadIdentifier = Script.name() //notifications are grouped by the identifier in the Notification Center
      pn.preferredContentHeight = NUMBER //***
      pn.scriptName = Script.name() //***
      pn.userInfo = {"image":apiResponse.imageURL} //***
      pn.schedule()
  
  // RESETS THE KEYCHAIN VALUE  
  nKey.set("key_name", apiResponse.valueID)
};

// END
