$(function(){
    
    var $btnGetRequest = $('#btnGetRequest');
    var $contactListBody = $('#leftTableBody');
    var $contactBody = $('#rightTableBody');
    var contactListTemplate = $('#contactListTemplate').html();
    var contactTemplate = $('#contactTemplate').html();

    $btnGetRequest.click(onClickBtnGetRequest);
    $contactListBody.on('click', '.delete-btn', onDeleteBtnClick);
    $contactListBody.on('click', 'tr', onClickContact);
    
    var xhr = new XMLHttpRequest();
    

    function onClickBtnGetRequest() {
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/', true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if(xhr.status != 200) {
                alert(xhr.status);
            } else {
                var list = JSON.parse(xhr.responseText);
                showContactList(list);
            }
        }
    }

    function showContactList(list){
        
        for (var i = 0; i < list.length; i++) {
            var item = contactListTemplate
                .replace('{{newId}}', list[i].id)
                .replace('{{id}}', list[i].id)
                .replace('{{name}}', list[i].name)
                .replace('{{username}}', list[i].username)
                .replace('{{email}}', list[i].email)
                .replace('{{phone}}', list[i].phone);
            $contactListBody.append(item);
        }
        
    }

    function onClickContact() {
        var id = $(this).data('id');
        renderContact(id);
    }

    function renderContact(id){
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/' + id, true);
        xhr.send();
        xhr.onreadystatechange = function() { // (3)
            if (xhr.readyState != 4) return;

            if(xhr.status != 200) {
                alert(xhr.status);
            } else {
                var contact = JSON.parse(xhr.responseText);
                showContact(contact);
            }
        }
    }

    function showContact(contact){
        var item = contactTemplate
            //.replace('{{newId}}', list.id)
            .replace('{{id}}', contact.id)
            .replace('{{name}}', contact.name)
            .replace('{{username}}', contact.username)
            .replace('{{email}}', contact.email)
            .replace('{{phone}}', contact.phone)
            .replace('{{address}}', contact.address)
            .replace('{{company}}', contact.company)
            .replace('{{website}}', contact.website)

        $contactBody.append(item);
    }

    function onDeleteBtnClick(){
        var id = $(this).closest('tr').data('id');
        removeContact(id);
        removeFromServer(id);
        clearItem(id);
    }

    function removeContact(id) {
        var $span = $('[data-id="' + id + '"]');
        $span.fadeOut('slow', function(){
            $span.remove();
        });
    }

    function removeFromServer(id) {
        xhr.open('DELETE', 'https://jsonplaceholder.typicode.com/users/' + id, true);
        xhr.send();
        xhr.onreadystatechange = function() { // (3)
            if (xhr.readyState != 4) return;
            if(xhr.status != 200) {
                alert(xhr.status);
            } else {
                alert('delete contact')
            }
        }
    }

    function clearItem(id){
        $contactBody.remove();
    }

})