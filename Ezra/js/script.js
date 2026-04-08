// Dark Mode Toggle

const toggle = document.getElementById("darkModeToggle");

toggle.addEventListener("click", function(){

document.body.classList.toggle("dark-mode");

if(document.body.classList.contains("dark-mode")){
localStorage.setItem("theme","dark");
}else{
localStorage.setItem("theme","light");
}

});

if(localStorage.getItem("theme") === "dark"){
document.body.classList.add("dark-mode");
}

//wig addition

function addToCart(name, price){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({
name:name,
price:price
});

localStorage.setItem("cart", JSON.stringify(cart));

alert(name + " added to cart!");

}


function displayCart(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartContainer = document.getElementById("cart-items");

let total = 0;

cart.forEach(item => {

cartContainer.innerHTML += `
<p>${item.name} - KSh ${item.price}</p>
`;

total += item.price;

});

document.getElementById("total").innerText =
"Total: KSh " + total;

}

displayCart();

function clearCart(){
localStorage.removeItem("cart");
}


// Form Validation

document.getElementById("contactForm").addEventListener("submit", function(event){

event.preventDefault();

let name=document.getElementById("name").value;
let email=document.getElementById("email").value;
let message=document.getElementById("message").value;

if(name==="" || email==="" || message===""){
alert("Please fill in all fields");
}

else{
document.getElementById("successMsg").innerText="Message sent successfully!";
}

});