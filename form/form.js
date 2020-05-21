var stdList = []

function handleForm(callback){
    event.preventDefault()
    var children = event.target.querySelectorAll("input")

    var list = {}

    Array.from(children).forEach(function(ele){
        if(ele.name){
            list[ ele.name ] = ele.value
            ele.value = ""
        }
    })

    var tot = Number(list.Subject1) + Number(list.Subject2) + Number(list.Subject3)
    list["Total"] = tot
    var avg = (tot/3)
    list["T.Average"] = avg

    callback(list)
}
 
function addData(data){
    stdList.push(data)
}

function renderData(data){
    var res = document.getElementById("result")
    res.innerHTML = ""
    var tableData = document.createElement("div")
    var keys = Object.keys( data[0] )
    var header = document.createElement("div")
    header.setAttribute("class", "header")

    keys.forEach( function(value){
        var headName = document.createElement("div")
        headName.textContent = value
        header.append( headName )
    })

    var hr = document.createElement("hr")

    tableData.append(header, hr)

    data.forEach(function(item){
        var rowName = document.createElement("div")
        keys.forEach( function(key){
            var row = document.createElement("div")
            row.textContent = item[key]
            rowName.append(row)
        })
        tableData.append(rowName)
    })


    res.append(header, tableData)
}

function getDecending(callback){
    stdList.sort(function(a,b){
        return b.Total - a.Total
    })
    callback(stdList)
}

function getAcending(callback){
    stdList.sort(function(a,b){
        return a.Total - b.Total
    })
    callback(stdList)
}

window.addEventListener('load', function(){
    var form = document.querySelector(".form")
    form.addEventListener("submit", function(){
        handleForm( addData )

        renderData(stdList)
    })

    var dec = document.getElementById("dec")

    dec.addEventListener("click", function(){
        getDecending( renderData )
    })

    var ace = document.getElementById("ace")

    ace.addEventListener("click", function(){
        getAcending( renderData )
    })
})