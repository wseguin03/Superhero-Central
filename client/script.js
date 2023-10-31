document.getElementById('search-button').addEventListener('click', getInfo);


function getInfo(){
    fetch("/info-db")
    .then(res => {
        res.json()
        .then(data=>{
            console.log(data);
            const l = document.getElementById('search-results-list-ul');
            l.innerHTML = '';
            data.forEach(e=>{
                const item = document.createElement('li');
                item.appendChild(document.createTextNode(`${e}`))
                l.appendChild(item);

            })
        })
    })
}