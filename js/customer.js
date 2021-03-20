$(document).ready(function () {
    loadData();
    displayDataTable(loadData());
    setButtonEvent();
});

/*
 *Tạo hàm load dữ liệu từ phía server 
 * 
 */
function loadData() {
    var customers = null;
    $.ajax({
        method: "GET",
        url: "http://api.manhnv.net/api/customers",
        contentType: "application/json",
        data: null,
        async: false
    }).done(function (data) {
        customers = data;

    }).fail(function () {
        alert("Khong load duoc du lieu");
    });

    return customers;
}

/*
 *Tạo hàm hiển thị dữ liêu lên màn hình chính
 */

function displayDataTable(data) {
    $.each(data, function (index, value) {
        var trHTML = `<tr>
                        <td>${value.CustomerCode}</td>
                        <td>${value.FullName}</td>
                        <td>${value.Gender}</td>
                        <td>${value.DateOfBirth}</td>
                        <td>${value.CustomerGroupId}</td>
                        <td>${value.PhoneNumber}</td>
                        <td>${value.Email}</td>
                        <td>${value.DebitAmount}</td>

                    </tr>`;

        $("tbody").append(trHTML);
    });
}

/*
 Tạo sự kiện cho các nút trong trang WEB 
 */

function setButtonEvent() {

    /*
     Tạo chức năng cho nút THÊM KHÁCH HÀNG
     */
    $(".content-iconadd").click(function () {
        $(".dialog").removeClass("dialog-hidden");
    });
    $(".dialog-title-buttonclose").click(function () {
        $(".dialog").addClass("dialog-hidden");
    });

    /*
     * Tạo chức năng thêm dữ liệu người dùng vào API JSON
     * 
     * **/
    $(document).on('click', '#save-button', function () {

        var customerId = $("#txtCustomerId").val();
        var customerCardId = $("#txtCard").val();

        var customerDateOfBirth = $("#txtDateOfBirth").val();
        var customerName = $("#txtName").val();
        var customerGroupCustomer = $("#txtGroupCustomer").val();
        var customerGender = $("#txtGender").val();
        var customerEmail = $("#txtEmail").val();

        var customerTel = $("#txtTel").val();
        var customerCompany = $("#txtCompany").val();
        var customerTaxId = $("#txtTaxId").val();
        var customerAddress = $("#txtAddress").val();


        var newData = {
            "CustomerId": customerId,
            "CustomerCode": customerCardId,
            "FullName": customerName,
            "Gender": customerGender,
            "DateOfBirth": customerDateOfBirth,
            "Email": customerEmail,
            "PhoneNumber": customerTel,
            "CustomerGroupId": customerGroupCustomer
        }
        // Gọi service để lưu lại:
        $.ajax({
            method: "POST",
            url: "http://api.manhnv.net/api/customers",
            data: JSON.stringify(newData),
            async: false,
            contentType: "application/json"
        }).done(function (response) {
            alert('Thêm thành công!');
        }).fail(function (response) {
            alert('Không thêm được!');
        })
    });


}

