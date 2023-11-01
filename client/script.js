document.getElementById('search-button').addEventListener('click', search);
document.getElementById('create-list-button').addEventListener('click', createNewList);
loadLists();
function loadLists(){

    const mainList = document.getElementById('list-ul');
    mainList.innerHTML = '';
    fetch("/create-list")
    .then(res => {
        res.json()
        .then(data => {
            console.log(data)
            data.forEach(e => {
            const l = document.createElement('li');
            const title = document.createElement('h2')
            title.appendChild(document.createTextNode(`${e.name}`));
            l.appendChild(title);

            l.setAttribute('id', e.name);
            const removeButton = document.createElement('button');
            removeButton.appendChild(document.createTextNode('-'));
            removeButton.setAttribute('class', 'remove-list-button');
            l.appendChild(removeButton);

            mainList.appendChild(l)
            // document.getElementById(e.name).addEventListener('click', displayLists);

            });
        });

    });
}

function createNewList(ids) {
    let listName = document.getElementById('list-name').value;
    
    // Create the list object
    const list = {
        name: listName,
        list: ids
    }
    
    // Send the list object to the server
    fetch("/create-list", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(list),
        
    })
    .then(res =>{
        if(res.ok){
        res.json()
        .then(data => {console.log(data)
            loadLists();

        }
        )
        .catch(err => console.log('Failed to add list'))
        }
        else{
            console.log('Error: ', res.status)

        }
    })
}

function search() {
    const filter = document.getElementById('filter-dropdown').value;
    const search = document.getElementById('search').value;
    const quantity = document.getElementById('display-quantity').value;
    console.log(search);

    fetch("/info-db")
        .then(res => {
            res.json()
                .then(data => {
                    let filteredData = data.filter(e => {
                        // Check if the search text is found in the property based on the selected filter
                        switch (filter) {
                            case "name":
                                return e.name.toLowerCase().includes(search.toLowerCase());
                            case "race":
                                return e.Race.toLowerCase().includes(search.toLowerCase());
                            case "publisher":
                                return e.Publisher.toLowerCase().includes(search.toLowerCase());
                            case "power":
                                // Replace 'power' with the actual property you want to search in
                                return e.Power.toLowerCase().includes(search.toLowerCase());
                            default:
                                return true; // No filter selected, return all data
                        }
                        
                    });
                    if (filteredData.length > quantity && quantity)
                    filteredData = filteredData.slice(0, quantity);
                    console.log(filteredData)
                    const l = document.getElementById('search-results-list-ul');
                    l.innerHTML = '';
                    const dontInclude = ['_id', '__v', 'id'];
                    filteredData.forEach(e => {
                        const item = document.createElement('li');
                        for (const key in e) {
                            if (e[key] !== null && e[key] !== '' && dontInclude.indexOf(key) ===-1) {
                                if (key === 'name') {
                                    //title
                                    const title = document.createElement('h2');
                                    title.appendChild(document.createTextNode(`${e[key]}`));
                                    item.appendChild(title);
                                } else {
                                    const label = document.createElement('strong');
                                    label.appendChild(document.createTextNode(`${key}:`));
                                    const value = document.createElement('span');
                                    value.appendChild(document.createTextNode(` ${e[key]}`));
                                    item.appendChild(label);
                                    item.appendChild(value);
                                    item.appendChild(document.createElement('br'));
                                }
                            }
                        }
                        const button = document.createElement('button');
                        button.setAttribute('id', 'b'+e.id);
                        button.setAttribute('class', 'add-to-list-button')
                        // console.log(button.id)

                        
                        button.appendChild(document.createTextNode('Add to list'));
                        item.appendChild(button);
                        l.appendChild(item);
                        document.getElementById('b'+e.id).addEventListener('click', addToList);

                    });

                });
        });
        

}

function addToList(){
    let id = this.id;
    id = id.substring(1)
    console.log(id)
    
}
function getInfo() {
    fetch("/info-db")
        .then(res => {
            res.json()
                .then(data => {
                    console.log(data);
                    const l = document.getElementById('search-results-list-ul');
                    l.innerHTML = '';
                    let count = 0
                    data.forEach(e => {
                        const item = document.createElement('li');
                        for (const key in e) {
                            if (count>1 && count<12){
                            if (e[key] !== null && e[key] !== '') {
                               if (count==2){
                                        //title
                                        const title = document.createElement('h2');
                                        title.appendChild(document.createTextNode(`${e[key]}`));
                                        item.appendChild(title);
                                }else{
                                
                                
                                const label = document.createElement('strong');
                                label.appendChild(document.createTextNode(`${key}:`));
                                const value = document.createElement('span');
                                value.appendChild(document.createTextNode(` ${e[key]}`));
                                item.appendChild(label);
                                item.appendChild(value);
                                item.appendChild(document.createElement('br'));
                            }
                        }
                        }
                       count+=1
                        }
                        l.appendChild(item);
                        count=0
                    });
                });
        });
}



document.getElementById('search-button').addEventListener('click', search);
