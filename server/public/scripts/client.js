$(document).ready(function () {
    console.log('JQ');
    // Establish Click Listeners
    setupClickListeners()
    // load existing koalas on page load
    getTasks();
    $('#viewTasks').on('click', '.done-button', yeetTask);
    $('#viewTasks').on('click', '.remove-button', killTask);

}); 
function setupClickListeners(){
    $("#addButton").on('click', saveTask )
}
function getTasks() {
    console.log('in getTasks');
    // ajax call to server to get koalas

    $.ajax({
        method: 'GET',
        url: '/list'
    }).then(function (response) {
        $('input').val('');

        $('#viewTasks').empty();

        //conditional statment for transfer button

        response.forEach(function (task) {
            if (task.done == 'no') {
                $('#viewTasks').append(`
          <tr id="${task.id}">
          <td>${task.description}</td>
          <td>${task.motivation}</td>
          
         <!--<td><button class="done-button" data-id="${task.id}">Complete</button>-->
         <td><input class="done-button" data-id="${task.id}" type="checkbox"> done?</input></td>
          <td><button class="remove-button" data-id="${task.id}">Remove</button>
          </tr>
          `)
            }
            

        })// end of forEach loop
    }).catch
}
function saveTask() {
  
 let newTask = {
     description: $("#descriptionIn").val(),
     motivation: $("#motivationIn").val()
 }
 
    $.ajax({
        method: 'POST',
        url: '/list',
        data: newTask
    }).then(function () {
        $('input').val('');
        getTasks();
    })
}
function yeetTask() {
    $(this).parent().parent().addClass('nowGreen')
    console.log('transfer button clicked');
    $.ajax({
        method: 'PUT',
        url: '/list/' + $(this).data().id,
    }).then(function () {
        // getTasks();
    })
}
function killTask() {
    console.log('delete was clicked');
    console.log($(this).data().id);
    const deadTask = $(this).data().id;
    $.ajax({
        method: 'DELETE',
        url: '/list/' + deadTask
    }).then(function () {
        getTasks();
    })
}
