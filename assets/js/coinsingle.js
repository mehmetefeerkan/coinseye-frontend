var hash = (window.location.hash).replace("#", "")
console.log(hash);
if (hash) {
    setInterval(() => {
        axios.get("http://localhost:1357/coins/get/" + hash)
            .then(res => {
                coind = res.data
            })
            .catch(err => {
                console.error(err);
            })
    }, 500);
} else {
    window.location = "coins.html"
}

let coinUpScoreIsHigher = false
let uscache = 0
let incarcache = 0
let incrnetcache = 0
let decrcache = 0
let prcachce = 0
setInterval(() => {
    $("#coinImg").attr("src", coind.data.logo);
    $("#coinName").html(`${coind.data.name_alt} | ${(coind.name).replace(coind.data.worksWith, "")}`)
    $("#coinMarket").html("Market : " + toTitleCase(coind.data.market.slug))
    $("#coinWorksWith").html("Pair : " + coind.data.worksWith)
    $("#coinUpScoreGlobal").html(coind.upScoreGlobal)
    $("#coinIncreaseAverage").html(coind.increaseAverage)
    $("#coinIncreaseNet").html(coind.increaseNet)
    $("#coinDecreaseAverage").html(coind.decreaseAverage)
    $("#cryptwBtn").attr("onclick", `javascript:window.open('https://cryptowat.ch/charts/BINANCE:${(coind.name).replace(coind.data.worksWith, "")}-USDT', '_blank');`);
    $("#binanceBtn").attr("onclick", `javascript:window.open('https://www.binance.com/tr/trade/${(coind.name).replace(coind.data.worksWith, "")}_USDT', '_blank');`);
    $("#coinPrice").html(coind.price)
    
    if (parseFloat(coind.upScoreGlobal) > uscache) {
        $("#coinUpScoreGlobalCarrier").css("background-color", "rgba(0, 255, 0, 0.2)");
    } else {
        $("#coinUpScoreGlobalCarrier").css("background-color", "rgba(255, 0, 0, 0.2)");
    }
    if (parseFloat(coind.increaseAverage) > incarcache) {
        $("#coinIncreaseAverageCarrier").css("background-color", "rgba(0, 255, 0, 0.2)");
    } else {
        $("#coinIncreaseAverageCarrier").css("background-color", "rgba(255, 0, 0, 0.2)");
    }
    if (parseFloat(coind.increaseNet) > incrnetcache) {
        $("#coinIncreaseNetCarrier").css("background-color", "rgba(0, 255, 0, 0.2)");
    } else {
        $("#coinIncreaseNetCarrier").css("background-color", "rgba(255, 0, 0, 0.2)");
    }
    if (parseFloat(coind.decreaseAverage) > decrcache) {
        $("#coinDecreaseAverageCarrier").css("background-color", "rgba(0, 255, 0, 0.2)");
    } else {
        $("#coinDecreaseAverageCarrier").css("background-color", "rgba(255, 0, 0, 0.2)");
    }
    if (parseFloat(coind.price) > prcachce) {
        console.log(coind.price, prcachce);
        $("#coinPriceCarrier").css("background-color", "rgba(0, 255, 0, 0.2)");
    } else {
        $("#coinPriceCarrier").css("background-color", "rgba(255, 0, 0, 0.2)");
    }
    uscache = parseFloat(coind.upScoreGlobal)
    incarcache = parseFloat(coind.increaseAverage)
    incrnetcache = parseFloat(coind.increaseNet)
    incrnetcache = parseFloat(coind.increaseNet)
    decrcache = parseFloat(coind.decreaseAverage)
    prcachce = parseFloat(coind.price)
    $(".sched").remove()
    Object.keys(coind.states).forEach(element => {
        let csched = coind.states[element]
        let cschedDir = csched[csched.increase.true ? "increase" : "decrease"]
        let increased = null
        let bgc = csched.increase.true ? "0, 255, 0, 0.2" : "255, 0, 0, 0.2"
        $("#schedSum").append(`

        <li class="nav-item sched" role="presentation"  style="background-color: rgba(${bgc});">
            <a class="nav-link active" data-bs-toggle="tab"
                href="" role="tab" aria-selected="true" onclick="javascript:scrollTo_('sched-${element}')">
                <div class="d-flex align-items-center">
                    <div class="tab-icon"><i
                            class='bx bx-time font-18 me-1'></i>
                    </div>
                    <div class="tab-title">${element} | ${cschedDir.by.percDiff}</div>
                </div>
            </a>
        </li>
        
        `)
        $("#scheds").append(`
        <li class="list-group-item d-flex justify-content-between align-items-center sched" id="sched-${element}" style="background-color: rgba(${bgc});">${element}<span class="badge bg-${csched.increase.true ? "success" : "danger"} rounded-pill">${csched.increase.true ? "Increased" : "Decreased"}</span>
            <ul class="list-group" style="width: 50%;">
                <li class="list-group-item d-flex justify-content-between align-items-center">Instances<span class="badge bg-primary rounded-pill">${cschedDir.instances}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">Amount<span class="badge bg-primary rounded-pill">${cschedDir.by.amount}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">Relative Diff<span class="badge bg-primary rounded-pill">${cschedDir.by.relDiff}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">Percent Diff<span class="badge bg-primary rounded-pill">${cschedDir.by.percDiff}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">Since<span class="badge bg-primary rounded-pill">${new Date(cschedDir.since)}</span>
                </li>
                ${cschedDir.net ? '<li class="list-group-item d-flex justify-content-between align-items-center">Net<span class="badge bg-primary rounded-pill">22</span> </li>' : ""}
            </ul>
        </li>

        `)
    });
}, 750);

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function scrollTo_(idx) {
    console.log(idx);
    console.log("#" + idx);
    $('html, body').animate({ scrollTop: $("#" + idx).offset().top }, 599);
}