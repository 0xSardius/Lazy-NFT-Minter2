/** Connect to Moralis server */
const serverUrl = "https://byuk2ifryfqg.usemoralis.com:2053/server";
const appId = "Ny4quiyZ5FlQiT62F38CVnrUfBxnZkhPAHLIhSse";
Moralis.start({ serverUrl, appId });

/** Add from here down */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "Hello World!" })
      initApp()
   } catch(error) {
     console.log(error)
   }
  }
  else {
     initApp() 
  }
}

function initApp() {
    document.querySelector("#app").style.display = "block";
    document.querySelector("#submit_button").onclick = submit;
}

async function submit() {
    // Get image data
    const input = document.querySelector("#input_image");
    let data = input.files[0];
    const imageFile = new Moralis.File(data.name, data);
    await imageFile.saveIPFS();
    let imageHash = imageFile.hash();
    console.log(imageHash);
    console.log(imageFile.ipfs());
    // Upload image to IPFS
    // Create metadata with image hash and data from
    // Upload to Rarible (plugin)
}

login();


/* LOGOUT
async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}
*/

/** Useful Resources  */

// https://docs.moralis.io/moralis-server/users/crypto-login
// https://docs.moralis.io/moralis-server/getting-started/quick-start#user
// https://docs.moralis.io/moralis-server/users/crypto-login#metamask

/** Moralis Forum */

// https://forum.moralis.io/