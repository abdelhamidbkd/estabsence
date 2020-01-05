var Attendances = []

function ajouterAbsence(name, date) {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8000/attendance/',
    data: {name, date},
    success: function(resultData) { 
      let picked = $(".date").data('date')
    picked = picked.split("-").reverse().join("/");
    console.log(picked)
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8000/attendance/',
      success: function (res) {
        let absence = res.filter(e => e.date == picked)
        let htmlblocks = absence.map(e => `<li class="list-group-item">
        <div class="checkbox">
          
          <label for="checkbox">
            ${e.name}
          </label>
        </div>
        <div class="pull-right action-buttons">
          <a class="trash"><span onclick="deleteAb('${e.id}')"
              class="glyphicon glyphicon-trash"></span></a>
        </div>
      </li>`);
      $("#absencelist").html(htmlblocks.join(" "))
      $("#nbrab").text(absence.length)
      }
    });
      alert("Absence Ajoutée") }
  })
}

function deleteAb(id) {
  $.ajax({
    type: 'DELETE',
    url: 'http://localhost:8000/attendance/'+id,
    success: function(resultData) { alert("Absence Supprimée") }
  })
}

$(function () {

  $( "#addab" ).click(function() {
    if($("#abEtudiant").val() != "") {
      let picked = $(".date").data('date')
      picked = picked.split("-").reverse().join("/");
      ajouterAbsence($("#abEtudiant").val(), picked)
    }
  });

  var datepick = $(".date")
  datepick.change(function () {
    let picked = $(".date").data('date')
    picked = picked.split("-").reverse().join("/");
    console.log(picked)
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8000/attendance/',
      success: function (res) {
        let absence = res.filter(e => e.date == picked)
        let htmlblocks = absence.map(e => `<li class="list-group-item">
        <div class="checkbox">
          
          <label for="checkbox">
            ${e.name}
          </label>
        </div>
        <div class="pull-right action-buttons">
          <a class="trash"><span onclick="deleteAb('${e.id}')"
              class="glyphicon glyphicon-trash"></span></a>
        </div>
      </li>`);
      $("#absencelist").html(htmlblocks.join(" "))
      $("#nbrab").text(absence.length)
      }
    });
    
    
  }); 


var bindDatePicker = function () {
  $(".date")
    .datetimepicker({
      format: "YYYY-MM-DD",
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-arrow-up",
        down: "fa fa-arrow-down"
      }
    })
    .find("input:first")
    .on("blur", function () {
      // check if the date is correct. We can accept dd-mm-yyyy and yyyy-mm-dd.
      // update the format if it's yyyy-mm-dd
      var date = parseDate($(this).val());

      if (!isValidDate(date)) {
        //create date based on momentjs (we have that)
        date = moment().format("YYYY-MM-DD");
      }

      $(this).val(date);


    });
};

var isValidDate = function (value, format) {
  format = format || false;
  // lets parse the date to the best of our knowledge
  if (format) {
    value = parseDate(value);
  }

  var timestamp = Date.parse(value);

  return isNaN(timestamp) == false;
};

var parseDate = function (value) {
  var m = value.match(/^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/);
  if (m)
    value =
      m[5] + "-" + ("00" + m[3]).slice(-2) + "-" + ("00" + m[1]).slice(-2);

  return value;
};

bindDatePicker();
});