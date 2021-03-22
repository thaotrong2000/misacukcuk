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
    $(document).on("click", "#save-button", function () {
        var newData = {
            "CustomerCode": "KH11177dddddd8886324324",
            "FullName": "Nguyen Trong Thao hat",
            "Gender": 1,
            "Address": "America",
            "DateOfBirth": "1998-12-31T00:00:00",
            "Email": "no1qecc@gmail.com",
            "PhoneNumber": "98799377ddd3334433",
            "CustomerGroupId": "0cb5da7c-59cd-4953-b17e-c9adc9161663",
            "DebitAmount": null,
            "MemberCardCode": "3438839",
            "CompanyName": "BrackGroup",
            "CompanyTaxCode": "12343",
            "IsStopFollow": false,
            "CustomerGroupName": "Nhóm khách hàng MISA",
            "GenderName": "Nam",
            "MISAEntityState": 0
        };

        $.ajax({
            method: "POST",
            url: "http://api.manhnv.net/api/customers",
            contentType: "application/json",
            data: JSON.stringify(newData),
            async: false
        }).done(function (data) {
            alert("THEM DU LIEU THANH CONG");
            debugger;
        }).fail(function (data) {
            alert("khong them duoc du lieu");
            debugger;
        });
    })


}

