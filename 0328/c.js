"use strict";

let R = null;
let chart = null;
let tbl2 = null;

let b1 = document.querySelector("#b1");

async function sc ()
{
    let url = `https://juxinglong.github.io/static/data/states.json`;

    // fetch()
    // Swal.fire("ok");
    let r = await fetch(url); // async function, needs to wait to download before moving on 
    let rj = await r.json(); // json() is also async function, needs await

    // get container
    let cc = document.querySelector("#cc");
    let opts = { // {} is object
        type: "pie", // line, bar, pie type of chart
        data: {
            labels:rj.map(x=>x.st), 
            datasets: [ {
                data: rj.map(x => x.p),
                label:"Population", 
            }, ],
        },
    };

    if (chart != null)
    {
        chart.destroy(); 
    }
    cc.innerHTML = ``;

    chart = new Chart(cc, opts); // chart package provides chart function


    // show table in div sdiv
    // rj
    let sdiv = document.querySelector("#sdiv");

    let p = {
        data: rj,
        pagination: { limit: 5 },
        sort: true,
        search: true,
        columns: [{ id: "st", name: "State" }, {id:"p", name: "Population"},],
    };

    if (tbl2 != null)
    {
        tbl2.destroy();
    };
    sdiv.innerHTML = "";

    tbl2 = new gridjs.Grid(p);
    tbl2.render(sdiv); // show table in div 


    console.log(rj);
    R = rj;
};



b1.addEventListener("click", sc); // sc() is function call, sc is function




