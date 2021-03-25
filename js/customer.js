$(document).ready(function () {
    loadData();
    setButtonEvent();

});

var formVariable = null;
var customerIdSelected = null;


/*
 *Tạo hàm load dữ liệu từ phía server 
 * 
 */
function loadData() {
    var data = getData();
    buildDataTableHTML(data);
}

function getData() {
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

function buildDataTableHTML(customer) {
    $("tbody").html("");
    $.each(customer, function (index, value) {

        trHTML = $(`<tr>
                        <td>${value.CustomerCode}</td>
                        <td>${value.FullName}</td>
                        <td>${value.Gender}</td>
                        <td>${value.DateOfBirth}</td>
                        <td>${value.CustomerGroupId}</td>
                        <td>${value.PhoneNumber}</td>
                        <td>${value.Email}</td>
                        <td>${value.DebitAmount}</td>

                    </tr>`);
        trHTML.data("recordId", value.CustomerId);
        trHTML.data("record", value);


        $("tbody").append(trHTML);
    });
}

/*
 *Tạo hàm hiển thị dữ liêu lên màn hình chính
 */

// function displayDataTable(data) {
//     $.each(data, function (index, value) {
//         var trHTML = $(`<tr>
//                         <td>${value.CustomerCode}</td>
//                         <td>${value.FullName}</td>
//                         <td>${value.Gender}</td>
//                         <td>${value.DateOfBirth}</td>
//                         <td>${value.CustomerGroupId}</td>
//                         <td>${value.PhoneNumber}</td>
//                         <td>${value.Email}</td>
//                         <td>${value.DebitAmount}</td>

//                     </tr>`);
//         trHTML.data("recordId", value.CustomerId);
//         trHTML.data("record", value);


//         $("tbody").append(trHTML);
//     });
// }

/*
 Tạo sự kiện cho các nút trong trang WEB 
 */

function setButtonEvent() {

    /*
     Tạo chức năng cho nút THÊM KHÁCH HÀNG
     */
    $(".content-iconadd").click(function () {
        formVariable = 1;
        $(".dialog").removeClass("dialog-hidden");
        $(".dialog-body input").val("");
    });
    $(".dialog-title-buttonclose").click(function () {
        $(".dialog").addClass("dialog-hidden");
    });

    /*
     * Tạo chức năng thêm dữ liệu người dùng vào API JSON
     * 
     * **/


    $(document).on("click", "#save-button", function () {
        var customerCode = $("#txtCustomerId").val();
        var customerCardId = $("#txtCard").val();
        var customerDateOfBirth = $("#txtDateOfBirth").val();
        var customerName = $("#txtName").val();
        var customerGroupId = $("#txtGroupCustomer").val();
        var customerGender = $("#txtGender input[type='radio']:checked").val();

        var customerEmail = $("#txtEmail").val();
        var customerTel = $("#txtTel").val();
        var customerCompany = $("#txtCompany").val();
        var customerTaxId = $("#txtTaxId").val();

        var customerAdress = $("#txtAddress").val();
        var customerGenderName = $("#txtGender input[type='radio']:checked").next("label:first").text();



        var newData = {
            "CustomerCode": customerCode,
            "FullName": customerName,
            "Gender": customerGender,
            "Address": customerAdress,
            "Email": customerEmail,
            "PhoneNumber": customerTel,
            "DebitAmount": 1234567,
            "CompanyName": customerCompany,
            "CompanyTaxCode": customerTaxId,
            "CustomerGroupName": "Nhóm khách hàng MISA",
            "GenderName": "Nam",
            "DateOfBirth": customerDateOfBirth,
            "CustomerGroupId": "0cb5da7c-59cd-4953-b17e-c9adc9161663",
            "MISAEntityState": 0
        };


        var methodForm = "POST";
        var urlForm = "http://api.manhnv.net/api/customers";

        if (formVariable === 2) {
            newData.CustomerId = customerIdSelected;
            methodForm = "PUT";
            urlForm = "http://api.manhnv.net/api/customers/" + customerIdSelected;
        }


        $.ajax({
            method: methodForm,
            url: urlForm,
            contentType: "application/json",
            data: JSON.stringify(newData),
            async: false
        }).done(function (data) {
            alert("THEM DU LIEU THANH CONG");
            $(".dialog").addClass("dialog-hidden");
            loadData();
            debugger;
        }).fail(function (data) {
            alert(data.responseText);
            debugger;
        });

    })

    // Tạo chức năng hiển thị dữ liệu dữ liệu khi CLICK vào 1 hàng dữ liệu 
    $("#tblListCustomer").on("dblclick", "tbody tr", rowOnDblClick);


    // Tạo chức năng xóa người dùng

    // B1: Hover vào dữ liệu và chuyển màu sang #CCC
    $("tbody tr").on("mouseover", function () {
        $(this).css("background-color", "#ccc");
    });

    $("tbody tr").on("mouseout", function () {
        $(this).css("background-color", "white");
    });

    // B2: Click mouse va chon phan tu DELETE

    $("#delete-customer").on("click", function () {
        var confirmDelete = confirm("Are you Delete");
        if (confirmDelete) {
            alert("Please, Let you select row need delete");
            $("tbody tr").on("click", function () {
                alert("Are you delete");
                var customerIdDelete = $(this).data("recordId");
                alert(customerIdDelete);
                $.ajax({
                    method: "DELETE",
                    url: "http://api.manhnv.net/api/customers/" + customerIdDelete,

                }).done(function (res) {
                    alert("Ban da xoa du lieu thanh cong");
                    loadData();
                }).fail(function (res) {
                    alert("Khong xoa duoc");
                    alert(res.responseText);
                });
            });
        }
    });


    // Search dữ liệu cần tìm

    $(".iconsearch-icon").on("click", function () {
        var customerPerson = null;
        var customerIdSearch = $("#search-customerId").val();

        // Gọi AJAX để hiển thị dữ liệu

        $.ajax({
            method: "GET",
            url: "http://api.manhnv.net/api/customers/" + customerIdSearch,
            contentType: "application/json",
            data: null,
            async: false
        }).done(function (data) {
            customerPerson = data;
            alert("Them du lieu thanh cong"); 

        }).fail(function () {
            alert("Khong load duoc du lieu");
        });
        


    });


}

function rowOnDblClick() {
    formVariable = 2;
    var customer = null;

    $(".dialog-hidden").removeClass("dialog-hidden");

    // Lấy dữ liệu data của customerID và lưu vào data với một biến có tên "saveCustomerId"

    var saveCustomerId = $(this).data("recordId");
    customerIdSelected = saveCustomerId;

    // Truy vấn thông tin từ thông tin đã biết đó là "CustomerId"
    $.ajax({
        type: "GET",
        url: "http://api.manhnv.net/api/customers/" + saveCustomerId,
        async: false
    }).done(function (response) {
        customer = response;


    }).fail(function () {
        alert("Khong hien thi duoc thong tin");
    });

    // Set giá trị cho các thành phần trong bảng sửa đổi 
    $("#txtCustomerId").val(customer.CustomerCode);
    $("#txtName").val(customer.FullName);
    $("#txtEmail").val(customer.Email);
    $("#txtTel").val(customer.PhoneNumber);
    $("#txtCompany").val(customer.CompanyName);

    $("#txtTaxId").val(customer.CompanyTaxCode);
    $("#txtAddress").val(customer.Address);



}
