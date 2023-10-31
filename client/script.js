document.getElementById('search-button').addEventListener('click', search);
// document.getElementById('filter-dropdown').addEventListener('change', search);


// function search(){
//     const filter = document.getElementById('filter-dropdown').value;
//     const search = document.getElementById('search').value;
//     console.log(search);
//     fetch("/info-db")
//     .then(res => {
//         res.json()
//             .then(data => {
//                 // console.log(data);
//                 const l = document.getElementById('search-results-list-ul');
//                 l.innerHTML = '';
//                 let count = 0
//                 data.forEach(e => {
//                     const item = document.createElement('li');
//                     for (const key in e) {
//                         if (count>1 && count<12){
//                         if (e[key] !== null && e[key] !== '') {
//                            if (count==2){
//                                     //title
//                                     const title = document.createElement('h2');
//                                     title.appendChild(document.createTextNode(`${e[key]}`));
//                                     item.appendChild(title);
//                             }else{
                            
                            
//                             const label = document.createElement('strong');
//                             label.appendChild(document.createTextNode(`${key}:`));
//                             const value = document.createElement('span');
//                             value.appendChild(document.createTextNode(` ${e[key]}`));
//                             item.appendChild(label);
//                             item.appendChild(value);
//                             item.appendChild(document.createElement('br'));
//                         }
//                     }
//                     }
//                    count+=1
//                     }
//                     l.appendChild(item);
//                     count=0
//                 });
//             });
//     });
//     switch(filter){
//         case "name":

//             break;
//         case "race":
//             console.log("race");
//             break;
//         case "publisher":
//             console.log("publisher");
//             break;
//         case "power":
//             console.log("power");
//             break;
//     }

// }

function search() {
    const filter = document.getElementById('filter-dropdown').value;
    const search = document.getElementById('search').value;
    console.log(search);

    fetch("/info-db")
        .then(res => {
            res.json()
                .then(data => {
                    const filteredData = data.filter(e => {
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
                        l.appendChild(item);
                    });
                });
        });
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
