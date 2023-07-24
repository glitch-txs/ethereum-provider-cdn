import pkg from "https://esm.run/@walletconnect/ethereum-provider@2.9.0/dist/index.umd.js"

// 0. Define ui elements and clients
let ethereumProvider = undefined;
const connectButton = document.getElementById("connect-button");

// 1. Define constants
const projectId = 'YOUR_PROJECT_ID';
if (projectId === 'YOUR_PROJECT_ID') {
  throw new Error("You need to provide a project ID");
}

// 4. Connect to provider, also handles opening and closing modal under the hood
async function onConnect() {
  try {
    connectButton.disabled = true;

    // 5. Create ethereum provider, if one doesn't exist
    if (!ethereumProvider) {
      ethereumProvider = await pkg.EthereumProvider.init({
        projectId,
        showQrModal: true,
        qrModalOptions: { themeMode: "light" },
        chains: [1],
        methods: ["eth_sendTransaction", "personal_sign"],
        events: ["chainChanged", "accountsChanged"],
        metadata: {
          name: "My Dapp",
          description: "My Dapp description",
          url: "https://my-dapp.com",
          icons: ["https://my-dapp.com/logo.png"],
        },
      });

      // 6. Set up connection listener
      ethereumProvider.on("connect", () =>
        console.info(ethereumProvider.accounts)
      );
    }

    ethereumProvider.connect();
  } catch (err) {
    console.error(err);
  } finally {
    connectButton.disabled = false;
  }
}

// 4. Create connection handler
connectButton.addEventListener("click", onConnect);
