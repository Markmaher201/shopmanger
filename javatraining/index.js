let body = document.body;
let title = document.getElementById("title");
let price = document.getElementById("price");
let agentpricefrom = document.getElementById("agentpricefrom");
let agentpriceto = document.getElementById("agentpriceto");
let genralprice = document.getElementById("genralprice");
let sumbit = document.getElementById("sumbit");
let category = document.getElementById("category");
let count = document.getElementById("count");
let deleteall = document.getElementById("clearall");
let deleteallbtn = document.getElementById("deleteall");
let pleasefilldata = document.getElementById("filldata");
let mood = "create";
let updateva;
let search = document.getElementById("search");
//createproduct
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

sumbit.onclick = function () {
  if (title.value != "" && price.value != "" && count.value <= 150) {
    let newpro = {
      title: title.value.toLowerCase(),
      price: price.value,
      agentpricefrom: agentpricefrom.value,
      agentpriceto: agentpriceto.value,
      genralprice: genralprice.value,
      category: category.value.toLowerCase(),
      count: count.value,
    };
    if (mood === "create") {
      if (newpro.count > 1) {
        for (i = 0; i < newpro.count; i++) {
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[updateva] = newpro;
      mood = "create";
      sumbit.innerHTML = "create";
      count.style.display = "block";
    }

    localStorage.setItem("product", JSON.stringify(datapro));
    cleardata();
    showdata();
    pleasefilldata.innerHTML = "";
  } else {
    pleasefilldata.innerHTML = `<h2 style='   transition: 0.7s ; text-align:center ; margin:10px 0 ; color:white; letter-spacing:1px ;
'>pleasefilldata or sumbit alower count</h2>`;
  }
};
function cleardata() {
  title.value = "";
  price.value = "";
  agentpricefrom.value = "";
  agentpriceto.value = "";
  genralprice.value = "";
  category.value = "";
  count.value = "";
}

function showdata() {
  let table = "";
  for (i = 0; i < datapro.length; i++) {
    table += `<tr>
       <td>${i + 1}</td>    
       <td>${datapro[i].title}</td>
       <td>${datapro[i].price}</td>
       <td>${datapro[i].agentpricefrom}</td>
       <td>${datapro[i].agentpriceto}</td>
       <td>${datapro[i].genralprice}</td>
       <td>${datapro[i].category}</td>
       <td><button onclick='updatedata(${i})' id="update">update</button></td>
       <td><button onclick='deletedata(${i})' id="delete">delete</button></td>`;
  }

  tablebody.innerHTML = table;

  if (datapro.length > 0) {
    deleteall.innerHTML = `<button onclick="deleteevery()" border=none style='width:250px; height:50px' id="deleteall">deleteall(${datapro.length})</button>`;
  } else {
    deleteall.innerHTML = "";
  }
}
showdata();
//deletedata
function deletedata(i) {
  datapro.splice(0, 1);
  localStorage.product = JSON.stringify(datapro);
  showdata();
}

function deleteevery() {
  localStorage.removeItem("product");
  datapro.splice(0);
  showdata();
}
function updatedata(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  agentpricefrom.value = datapro[i].agentpricefrom;
  agentpriceto.value = datapro[i].agentpriceto;
  genralprice.value = datapro[i].genralprice;
  category.value = datapro[i].category;
  count.style.display = "none";
  sumbit.innerHTML = "Update";
  mood = "update";
  updateva = i;
  scroll({ top: 0, behavior: "smooth" });
}
//search
let searchmood = "title";

function getsearchmood(id) {
  if (id == "searchtitle") {
    searchmood = "title";
  } else {
    searchmood = "category";
  }
  search.placeholder = `searchby${searchmood}`;
  search.focus();
  search.value = "";
  showdata();
}
function searchend(value) {
  table = "";
  for (i = 0; i < datapro.length; i++)
    if (searchmood == "title") {
      {
        if (datapro[i].title.includes(value.toLowerCase())) {
          table += `<tr>
       <td>${i + 1}</td>    
       <td>${datapro[i].title}</td>
       <td>${datapro[i].price}</td>
       <td>${datapro[i].agentpricefrom}</td>
       <td>${datapro[i].agentpriceto}</td>
       <td>${datapro[i].genralprice}</td>
       <td>${datapro[i].category}</td>
       <td><button onclick='updatedata(${i})' id="update">update</button></td>
       <td><button onclick='deletedata(${i})' id="delete">delete</button></td>`;
        }
      }
    } else {
      for (i = 0; i < datapro.length; i++) {
        if (datapro[i].category.includes(value.toLowerCase())) {
          table += `<tr>
       <td>${i + 1}</td>    
       <td>${datapro[i].title}</td>
       <td>${datapro[i].price}</td>
       <td>${datapro[i].agentpricefrom}</td>
       <td>${datapro[i].agentpriceto}</td>
       <td>${datapro[i].genralprice}</td>
       <td>${datapro[i].category}</td>
       <td><button onclick='updatedata(${i})' id="update">update</button></td>
       <td><button onclick='deletedata(${i})' id="delete">delete</button></td>`;
        }
      }
    }
  tablebody.innerHTML = table;
}
