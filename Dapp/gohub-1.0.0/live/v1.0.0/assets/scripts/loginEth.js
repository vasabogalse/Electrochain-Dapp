import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.0/ethers.esm.js";
import { checkChain } from "./checkChain.js";

// Create global userWalletAddress variable
window.userWalletAddress = null;
const wallet = window.localStorage.getItem("userWalletAddress");
// when the browser is ready
window.onload = async(event) => {
    // check if ethereum extension is installed
    if (window.ethereum) {
        // create web3 instance
        window.web3 = new Web3(window.ethereum);
    } else {
        // prompt user to install Metamask
        alert("Please install MetaMask or any Ethereum Extension Wallet");
    }

    // check if user is already logged in and update the global userWalletAddress variable
    window.userWalletAddress = window.localStorage.getItem("userWalletAddress");

    // show the user dashboard
    //showUserDashboard();
};

// Web3 login function
const loginWithEth = async() => {
    // check if there is global window.web3 instance
    if (wallet) {
        return
    }
    if (window.web3) {
        checkChain()
        try {
            // get the user's ethereum account - prompts metamask to login
            window.localStorage.setItem("userWalletAddress", null);
            window.userWalletAddress = null
            await window.ethereum
                .request({
                    method: "eth_requestAccounts",
                })
                .then(async(accounts) => {
                    window.userWalletAddress = accounts[0]
                        // store the user's wallet address in local storage
                    window.localStorage.setItem("userWalletAddress", accounts[0]);
                    // post login to express session
                    if (accounts) {
                        handlePostLogin(accounts[0]);
                    } else {
                        alert('user not autorized in this app');            
                    }
                })
                .catch((err) => {
                    console.log(err)
                        // if the user cancels the login prompt
                    throw Error("Please select an account on Polygon Network");
                });

            // show the user dashboard
            showUserDashboard(); ////REVISAR ESTA FUNCION
        } catch (error) {
            alert(error);
        }
    } else {
        alert("wallet not found");
    }
};

const handlePostLogin = async(addr) => {
    const rawResponse = await fetch('/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ addr: addr})
    });
    const content = await rawResponse.json();
    if (content.roll) {
        window.location.replace("/projects")
    } else {
        window.location.replace("/")
    }
    return content
}

const handlePostLogout = async(addr) => {
    const rawResponse = await fetch('/logout', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const content = await rawResponse.json();
    console.log(content)
    window.location.replace("/")
    return content
}


// function to show the user dashboard
/*
const showUserDashboard = async() => {
    // if the user is not logged in - userWalletAddress is null
    if (!window.userWalletAddress) {
        document.querySelector(".wallet-img").style.display = "flex";
        const wallettitleEl = document.querySelector(".wallet-dialog");
        wallettitleEl.innerHTML = 'Login With Metamask'
            // return from the function
        return false;
    }

    // change the page title
    document.title = "Web3 Dashboard  🤝";

    //showUserWalletAddress();
    //window.location.replace("/projects");   


    getWalletBalance();
};*/

// show the user's wallet address from the global userWalletAddress variable

/*
const showUserWalletAddress = () => {
    document.querySelector(".wallet-img").style.display = "none";
    const walletDialogEl = document.querySelector(".wallet-dialog");
    const addr = window.localStorage.getItem("userWalletAddress")
    walletDialogEl.innerHTML = addr.slice(0, 5) + '...' + addr.substring(addr.length - 5)
};*/

// get the user's wallet balance
const getWalletBalance = async() => {
    // check if there is global userWalletAddress variable
    if (!window.userWalletAddress) {
        return false;
    }

    // get the user's wallet balance
    const balance = await window.web3.eth.getBalance(window.userWalletAddress);

    // convert the balance to ether
    /* document.querySelector(".wallet-balance").innerHTML = web3.utils.fromWei(
      balance,
      "ether"
    ); */
};

// web3 logout function
const logout = () => {
    // set the global userWalletAddress variable to null
    window.userWalletAddress = null;

    // remove the user's wallet address from local storage
    window.localStorage.removeItem("userWalletAddress");

    handlePostLogout()

    // show the user dashboard
    showUserDashboard();
};

// when the user clicks the login button run the loginWithEth function
document.querySelector(".btn-Metamask").addEventListener("click", loginWithEth);

// when the user clicks the logout button run the logout function
/*
const elements = document.querySelectorAll(".logout-btn")
elements.forEach((userItem) => {
    userItem.addEventListener("click", logout);
});*/