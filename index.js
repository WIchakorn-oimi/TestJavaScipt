var product = [{
    id: 1,
    img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8fDB8fHww',
    name: 'Vans',
    price: 5000, // เปลี่ยนจาก 'print' เป็น 'price'
    description: 'Vans Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptate provident facilis impedit accusantium suscipit rem nobis, vel at, quibusdam est. Maxime quisquam nostrum adipisci nesciunt! Accusamus ipsum quibusdam porro!',
    type: 'Shoes'
}, {
    id: 2,
    img: 'https://media.istockphoto.com/id/932170554/photo/white-color-formal-shirt-with-button-down-collar-isolated-on-white.webp?b=1&s=170667a&w=0&k=20&c=yh4bZaGJa0gDXKEeIVxOVb2ONantdlozjqZEVlTQdmY=',
    name: 'Shirt',
    price: 1500, // เปลี่ยนจาก 'print' เป็น 'price'
    description: 'shirt Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptate provident facilis impedit accusantium suscipit rem nobis, vel at, quibusdam est. Maxime quisquam nostrum adipisci nesciunt! Accusamus ipsum quibusdam porro!',
    type: 'Shirt'
}, {
    id: 3,
    img: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Nike',
    price: 4500, // เปลี่ยนจาก 'print' เป็น 'price'
    description: 'Nike Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptate provident facilis impedit accusantium suscipit rem nobis, vel at, quibusdam est. Maxime quisquam nostrum adipisci nesciunt! Accusamus ipsum quibusdam porro!',
    type: 'Shoes'
}];


//แสดง Product หน้าเว็บ
$(document).ready(() => {
    var html = "";
    for (let i = 0; i < product.length; i++) {
        html += `<div onclick="openProductDetail(${i})" class="product-item ${product[i].type}">
                    <img src="${product[i].img}" class="product-img">
                    <p style="font-size: 1.2vw;">${product[i].name}</p>
                    <p style="font-size: 1.2vw;">${numbercomams(product[i].price)}</p>
                </div>`;
    }
    $("#productlist").html(html); //ประกาศ Id
});

function numbercomams(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2")
    return x;
}

function searchSomething(elem) {

    var value = $('#' + elem.id).val()
    console.log(value);

    var html = "";
    for (let i = 0; i < product.length; i++) {
        if (product[i].name.includes(value)) {
            html += `<div onclick="openProductDetail(${i})" class="product-item ${product[i].type}">
                        <img src="${product[i].img}" class="product-img">
                        <p style="font-size: 1.2vw;">${product[i].name}</p>
                        <p style="font-size: 1.2vw;">${numbercomams(product[i].price)}</p>
                    </div>`;
        }
    }
    if (html == '') {
        $('#productlist').html(`<p>Not found product </p>`);
    }

    $("#productlist").html(html); //ประกาศ Id
}

function searchProduct(param) {
    console.log(param);
    $('.product-item').css(`display`, 'none')
    if (param == 'all') {
        $('.product-item').css(`display`, 'block')
    }
    else {
        $("." + param).css(`display`, 'block')
    }
}

var productIndex = 0;
function openProductDetail(index) {
    productIndex = index;
    console.log(productIndex)
    $('#modalDesc').css(`display`, 'flex')
    $("#mdd-img").attr('src', product[index].img);
    $("#mdd-name").text(product[index].name);
    $("#mdd-price").text(numbercomams(product[index].price) + 'THB');
    $("#mdd-desc").text(numbercomams(product[index].description));
}

function closeModal() {
    $(".modal").css(`display`, 'none')
}

var cart = [];
function addtocarts() {
    var pass = true;
    for (let i = 0; i < cart.length; i++) {
        if (productIndex == cart[i].index) {
            cart[i].count++;
            pass = false;
        }
    }
    if (pass) {
        var obj = {
            index: productIndex,
            id: product[productIndex].id,
            name: product[productIndex].name,
            price: product[productIndex].price,
            img: product[productIndex].img,
            count: 1
        }
        console.log(obj);
        cart.push(obj)
    }
    console.log(cart);
    Swal.fire({
        icon: 'success',
        title: "Add " + product[productIndex].name + ' to cart !',
        timer: 1000
    })
    $("#cartcount").css(`display`, 'flex').text(cart.length)

}

function opencarts() {
    $(`#modalCart`).css(`display`, 'flex')
    rendercart();
}

function rendercart() {
    if (cart.length > 0) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `<div class="cartlist-item">
                        <div class="cartlist-left">
                            <img src="${cart[i].img}" >
                            <div class="cartslist-detail">
                                <p style="font-size: 1.5vw;">${cart[i].name}</p>
                                <p style="font-size: 1.2vw;">${numbercomams(cart[i].price * cart[i].count)}</p>
                            </div>
                        </div>
                        <div class="cartlist-rigth">
                            <p onclick="deinitems('-', ${i})" class="btnc">-</p>
                            <p id=""countitems${i} style="margin: 0 20px;" >${cart[i].count}</p>
                            <p onclick="deinitems('+', ${i})class="btnc">+</p>
                        </div>
                    </div>`;
        }
        $("#mycart").html(html)
    }
    else {
        $("#mycart").html(`<p>Not found product</p>`)
    }
}

function deinitems(action, index) {
    if (action == '-') {
        if (cart[index].count > 0) {
            cart[index].count--;
            $('#countitems' + index).text(cart[index].count)

            if (cart[index].count <= 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure to delete?',
                    showConfirmButton: true,
                    confirmButtonText: 'Delete',
                    cancleButtonText: 'cancle'
                }).then((res) => {
                    if (res.isConfirmed) {
                        cart.splice(index, 1)
                        rendercart();
                        $("#cartcount").css(`display`, 'flex').text(cart.length)

                        if(cart.length <= 0) {
                            $("#cartcount").css(`display`, 'none').text(cart.length)
                        }
                        
                    }
                    else {
                        cart[index].count++;
                        $("#cartcount").css(`display`, 'flex').text(cart.length)

                    }
                })
            }
        }
    }
    else if (action == '+') {

    }
}