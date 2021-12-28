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
      console.log(user)
      console.log(user.get('ethAddress'))
   } catch(error) {
     console.log(error)
   }
  }
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