/** Connect to Moralis server */
const serverUrl = "https://byuk2ifryfqg.usemoralis.com:2053/server";
const appId = "Ny4quiyZ5FlQiT62F38CVnrUfBxnZkhPAHLIhSse";
Moralis.start({ serverUrl, appId });
let user;

/** Add from here down */
async function login() {
  user = Moralis.User.current();
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "Hello World!" })
      initApp()
   } catch(error) {
     console.log(error)
   }
  }
  else {
    Moralis.enableWeb3();
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
    //Upload image to iPFS
    const imageFile = new Moralis.File(data.name, data);
    await imageFile.saveIPFS();
    let imageHash = imageFile.hash();
    console.log(imageHash);
    // Create metadata with image hash and data
    let metadata = {
        name: document.querySelector("#input_name").value,
        description: document.querySelector("#input_description").value,
        image: "/ipfs/" + imageHash
    }
    // Upload metadata to iPFS
    const jsonFile = new Moralis.File("metadata.json", {base64: btoa(JSON.stringify(metadata))})
    await jsonFile.saveIPFS();
    let metadataHash = jsonFile.hash();
    console.log(metadataHash);
    // Upload to Rarible (plugin)
    await Moralis.Plugins.rarible.lazyMint({
        chain: 'rinkeby',
        userAddress: user.get('ethAddress'),
        tokenType: "ERC721",
        tokenUri: '/ipfs/' + metadataHash,
        royaltiesAmound: 47
    })
    console.log(res);
    let token_address = res.data.result.token_address;
    let token_id = res.data.result.token_address;
    let url = `https://rinkeby.rarible.com/token/${token_address}:${token_id}`
    document.querySelector("#success_message").innerHTML = 
        `NFT Minted. <a target="_blank" href="${url}">View NFT</a>`
    document.querySelector("#success_message").style.display = "block";
    setTimeout(() => {
        document.querySelector("#success_message").style.display = "none";
    }, 5000)
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