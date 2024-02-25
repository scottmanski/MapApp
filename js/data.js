
import Data from '../data/Data.json' assert { type: 'json' };

var dt = Data.filter(element => element.filter == "11");

function callback(mutationsList) {
  mutationsList.forEach((mutation) => {
    if (mutation.attributeName === "class") {
      updateData();
    }
  });
}

const mutationObserver = new MutationObserver(callback);

mutationObserver.observe(document.querySelector("#qualifier"), { attributes: true });
mutationObserver.observe(document.querySelector("#mainevent"), { attributes: true });

function stage(x) {
  var y = null;
  if (x.srcElement.tagName == "I") {
    y = x.srcElement.parentElement.parentElement;
  } else {
    y = x.srcElement;
  }
  
  if (y.classList.contains('active')) {
    y.children[0].style.display = "none";
    y.setAttribute("data-active", "false");
  } else {
    y.children[0].style.display = "inline-block";
    y.setAttribute("data-active", "true");
  }
}

function updateData() {
  //console.log("updating data");
  dt.clear();
  var dt_new = Data; //Data.filter(element => element.Player_Civ == "Franks")

  var filter = "";
  if (document.querySelector("#qualifier").getAttribute("data-active") != "false") {
    filter = "1";
  } else {
    filter = "0";
  }
  if (document.querySelector("#mainevent").getAttribute("data-active") != "false") {
    filter = filter+"1";
  } else {
    filter = filter+"0";
  }
  dt_new = dt_new.filter(element => element.filter == filter);
  dt.rows.add(dt_new);
  dt.draw();
}

document.querySelector("#mainevent").addEventListener("click", stage);
document.querySelector("#qualifier").addEventListener("click", stage);

//new DataTable('#example', {

dt = $('#example').DataTable( {
      order: [[1, 'desc']],
    pageLength: 100,
    dom: "t",
    columns: [
      { data: 'Map', title: 'Map' },
      { data: 'Played', title: 'Played' },
      { data: 'First Ban', title: 'First Ban' },
      { data: 'Ban', title: 'Ban' },
      { data: 'Pick', title: 'Pick' },
      { data: 'Remaining', title: 'Remaining' },
      { data: 'First Ban%', title: 'First Ban%' },
      { data: 'Ban%', title: 'Ban%' },
      { data: 'Pick%', title: 'Pick%' },
      { data: 'Remaining%', title: 'Remaining%' },
      { data: 'Wins', title: 'Wins' },
      { data: 'Win%', title: 'Win%' }
      ],
      data: dt,

    autoWidth: true
});
