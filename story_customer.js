$(document).ready(function () {
    var butonFunction = new buttonfunction();
    loadData();
    setEvent();


});

/**
 * Gán sự kiện cho các nút
 * */

function setEvent() {
    $("tbody").on("dblclick","tr",function () {
        $(".dialog").show();
    }); 

    // Thu thập thông tin khách hàng 

    
}


class buttonfunction {
    constructor() {
        this.addButton();
        this.closeButton();
        this.saveButton();
    }
    addButton() {
        $(".iconname").click(function () {
            $(".dialog").show();
        })
    }
    closeButton() {
        $(".dialog-title-buttonclose").click(function () {
            $(".dialog").hide();
        })
        $(".dialog-footer-cancel").click(function () {
            $(".dialog").hide();
        })
    }
    saveButton() {
        $(".text-save").click(function () {
            alert("Bạn đã lưu dữ liệu");
        });
    }


}


/**
 * Hàm hiển thị dữ liệu từ server về màn hình dùng
 * @param {any} data
 */
function buildDataTableHTML(data) {
    // lấy dữ liệu từ API về 
    $("tbody").html("");
    $.each(data, function (index, customer) {
        // Xử lý dữ liệu ngày tháng(Hiện thị dạng ngày/tháng/năm-nếu có)
        var dateOfBirth = customer.DateOfBirth;
        var dateFormat = formatDateDDMMYY(dateOfBirth);
        var countMoney = 123453535345345;
        var money = formatMoney(countMoney);

        var trHTML = `<tr>
                      <td>${customer.CustomerCode}</td>
                       <td>${customer.FullName}</td>
                      <td>${customer.Gender}</td>
                      <td>${dateFormat}</td>
                      <td>${customer.CustomerGroupName}</td>
                      <td>${customer.PhoneNumber}</td>
                      <td>${customer.Email}</td>
                      <td>${money}</td> 
                      <td><input type="checkbox"/></td>

                  </tr>`;
        $("tbody").append(trHTML);
    });

}

/**
 * Hàm định dạng tiền theo Format 
 * @param {any} money
 */
function formatMoney(money) {
    var money = money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " VND";
    return money;
}


/**
 * Hàm định dạng ngày tháng năm theo format
 * @param {any} date
 */
function formatDateDDMMYY(date) {
    if (!date) {
        return "";
    }
    var newDate = new Date(date);
    var dateString = newDate.getDate();
    var monthString = newDate.getMonth() + 1;
    var year = newDate.getFullYear();
    return `${dateString}/${monthString}/${year}`;
}
// 

function loadData() {
    var data = getData();
    buildDataTableHTML(data);
}


/**
 * Hàm ajax xử lý dữ liệu phía server 
 * */
function getData() {
    var customers = null;
    //$.ajax({
    //    method: "GET",
    //    url: "http://api.manhnv.net/api/customers",
    //    data: null,
    //    async: false,
    //    contentType: "application/json"

    //}).done(function (response) {
    //    customers = response;
    //}).fail(function (response) {
    //    alert("khong lay duoc du lieu");
    //})

    $.ajax({
        method: "GET",
        url: "http://api.manhnv.net/api/customers",
        data: null,
        contentType: "json",
        async: false
    }).done(function (data) {
        customers = 5; 
        alert("Du lieu da duoc them" + customers); 
    }).fail(function (data) {
        alert("Lấy dữ liệu không thành công"); 
    }); 

    return customers;


}
