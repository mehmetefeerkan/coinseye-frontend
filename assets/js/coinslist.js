let temparr = []
let coind = {}
let sortee = localStorage.getItem('sortee') || "increaseAverage"
let lupd = Date.now()
async function fetchCoins() {
    let state = "info"

    let coincache = {}
    return axios.get("http://localhost:1357/coins/")
        .then(res => {
            temparr = []
            Object.keys(res.data).forEach((ccd) => {
                temparr.push(res.data[ccd]);
            })
            temparr.sort((a, b) => (a[sortee] > b[sortee]) ? -1 : 1)
            temparr = temparr.slice(0, 50)
            temparr.forEach((cc_, index) => {
                state === "primary" ? state = "info" : state = "primary"

                coind[cc_.name] ? coincache[cc_.name] = coind[cc_.name].cardColor : null
                coind[cc_.name] = cc_
                coind[cc_.name].index = index
                coind[cc_.name].cardColor = coincache[cc_.name]
                coind[cc_.name].html =  `
        <a href="coin.html#${cc_.name}">
        <div class="col coinline" id="${cc_.name}">
            <div class="card radius-10 bg-${state} bg-gradient">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div>
                        <p class="mb-0 text-white">${cc_.name}</p>
                        <p class="mb-0 text-white">IA : ${cc_.increaseAverage}</p>
                        <p class="mb-0 text-white">INET : ${cc_.increaseNet}</p>
                        <p class="mb-0 text-white">USG : ${cc_.upScoreGlobal}</p>
                        <h4 class="my-1 text-white">$${cc_.price}</h4>
                        </div>
                        <div class="text-white ms-auto font-35">${index}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </a>
                
                `
            })
            lupd = Date.now()
            return
        })
        .catch(err => {
            console.error(err);
        })
}

setInterval(async () => {
    await fetchCoins()
}, 1000);

setInterval(() => {
    $("#whatsort").html(`Coins (Sorted to ${sortee}) | Last update : ${Date.now() - lupd} ms ago`)
}, 900);

async function initiate() {
    await fetchCoins()
    temparr.forEach((currCoin, index) => {
        $("#coinsHolder").append(currCoin.html)
    })
}

initiate()

function setSortee(so) {
    localStorage.setItem("sortee", so)
    if (localStorage.getItem("sortee")) {
        location.reload()
    }
}

setInterval(() => {
    refreshCoins()
}, 2000);

setInterval(() => {

}, 1000);

function refreshCoins() {
    temparr.forEach((ccx, index) =>{
        console.log(ccx);
        ($(`#${ccx.name}`)).html(ccx.html)
    })
}