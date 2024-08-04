const product = [{
    id: 1,
    img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D',
    name: "Nike",
    price: 4500,
    description: 'Lorem iaudantium harum doloremque alias. Quae, vel ipsum quasi, voluptas,it optio nemo magni numquam non dicta voluptates porro! Vero eveniet numquam sit aut veleligendi officiis iste tenetur expedita. Delectus vero quibusdam adipisci in. Esses',
    type: 'shoet'

}, {
    id: 2,
    img: 'https://media.istockphoto.com/id/483960103/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%94%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%A2%E0%B8%B7%E0%B8%94%E0%B8%AA%E0%B8%B5%E0%B8%94%E0%B9%8D%E0%B8%B2%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B9%88%E0%B8%B2%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B9%80%E0%B8%AA%E0%B9%89%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%95%E0%B8%B1%E0%B8%94.jpg?s=2048x2048&w=is&k=20&c=mnY0KDHT_vEbNAraxX7O69WpQUkVZWT8KribHBollYo=',
    name: "Black",
    price: 600,
    description: 'Lorem iaudantium harum doloremque alias. Quae, vel ipsum quasi, voluptas,it optio nemo magni numquam non dicta voluptates porro! Vero eveniet numquam sit aut veleligendi officiis iste tenetur expedita. Delectus vero quibusdam adipisci in. Esses',
    type: 'shirt'
}, {
    id: 3,
    img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8fDB8fHww',
    name: "Vans",
    price: 7000,
    description: 'Lorem iaudantium harum doloremque alias. Quae, vel ipsum quasi, voluptas,it optio nemo magni numquam non dicta voluptates porro! Vero eveniet numquam sit aut veleligendi officiis iste tenetur expedita. Delectus vero quibusdam adipisci in. Esses',
    type: 'shoet'
}];

$(document).ready(() => {
    var html = "";
    for (let i = 0; i < product.length; i++) {
        html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}" >
                    <img class="product-img"
                        src="${product[i].img}"alt="">
                    <p style="font-size: 1.2vw;">${product[i].name}</p>
                    <p stlye="font-size: 1vw;">${numberWithCommas(product[i].price)}</p>
                </div>`
    }
    $("#productlist").html(html)
})

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function search(elem) {
    
    var value = $('#'+elem.id).val()
    console.log(value)
    var html = "";

    for (let i = 0; i < product.length; i++) {
        if ( product[i].name.includes(value)) {
        html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}" >
                    <img class="product-img"
                        src="${product[i].img}"alt="">
                    <p style="font-size: 1.2vw;">${product[i].name}</p>
                    <p style="font-size: 1vw;">${product[i].price}</p>
                </div>`
        }
        if (html == '') {
            $("#productlist").html(`<p> Not fond product</p>`)
        } else {
            $("#productlist").html(html)
        }
    }
} 

function searchProduct(param) {
    $(".product-items").css('display', 'none')
    if(param == 'all'){
        $(".product-items").css('display', 'block')
    }
    else {
        $("."+param).css('display', 'block')
    }
}

var productindex = 0;
function openProductDetail(index) {
    productindex = index;
    console.log(productindex)
    $("#modalDec").css("display", "flex")
    $("#mdd-img").attr('src', product[index].img)
    $("#mdd-name").text(product[index].name)
    $("#mdd-price").text(numberWithCommas(product[index].price) + 'THB')
    $("#desc").text(product[index].description)
}

function closeModal() {
    $(".modal").css('display','none')
}

var cart = [];
function addtocart() {
    var pass = true;

    for (let i = 0; i < cart.length; i++) {
        if( productindex == cart[i].index ) {
            console.log('found same product')
            cart[i].count++;
            pass = false;
        }
    }

    if(pass) {
        var obj = {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].name,
            price: product[productindex].price,
            img: product[productindex].img,
            count: 1
        };
        // console.log(obj)
        cart.push(obj)
    }
    console.log(cart)

    Swal.fire({
        icon: 'success',
        title: 'Add ' + product[productindex].name + ' to cart !'
    })
    $("#cartcount").css('display','flex').text(cart.length)
}

function openCart() {
    $('#modalCart').css('display','flex')
    rendercart();
}

function rendercart() {
    if(cart.length > 0) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `<div class="cartlist-items">
                        <div class="cartlist-left">
                            <img src="${cart[i].img}" alt="">
                            <div class="cartlist-detail">
                                <p style="font-size: 1.5vw;">${cart[i].name}</p>
                                <p style="font-size: 1.2vw;">${ numberWithCommas(cart[i].price * cart[i].count) } THB</p>
                            </div>
                        </div>
                        <div class="cartlist-right">
                            <p onclick="deinitems('-', ${i})" class="btnc">-</p>
                            <p id="countitems${i}" style="margin: 0 20px;">${cart[i].count}</p>
                            <p onclick="deinitems('+', ${i})" class="btnc">+</p>
                        </div>
                    </div>`;
        }
        $("#mycart").html(html)
    }
    else {
        $("#mycart").html(`<p>Not found product list</p>`)
    }
}

function deinitems(action, index) {
    if(action == '-') {
        if(cart[index].count > 0) {
            cart[index].count--;
            $("#countitems"+index).text(cart[index].count)

            if(cart[index].count <= 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure to delete?',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel'
                }).then((res) => {
                  if(res.isConfirmed) {
                     cart.splice(index, 1) 
                     console.log(cart)
                     rendercart();
                     $("#cartcount").css('display','flex').text(cart.length)
                     
                     if(cart.length <= 0) {
                        $("#cartcount").css('display','none')
                     }
                  }  
                  else {
                    cart[index].count++;
                    $("#countitems"+index).text(cart[index].count)
                    rendercart();
                  }
                })
            }
            rendercart();
        }
        
    }
    else if(action == '+') {
        cart[index].count++;
        $("#countitems"+index).text(cart[index].count)
        rendercart();
    }
}