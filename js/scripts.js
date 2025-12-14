// web-page that were used:
// https://getbootstrap.com/docs/5.3/components/modal/ 

const products = [
    {id:1, title:"Surgical Operation Support", price:150, short:"Contribution to surgey fund", img:"img/operation.jpg"},
    {id:2, title:"Animal X-Ray", price:40, short:"Diagnostic radiography", img:"img/x-ray.jpg"},
    {id:3, title:"Sterilization Support", price:80, short:"Partial sterilization cost", img:"img/sterilization.PNG"},
    {id:4, title:"Blood Test", price:28, short:"Basic blood analysis", img:"img/bloodtest.PNG"},
    {id:5, title:"Ultrasound Examination", price:45, short:"Ultrasound diagnostics", img:"img/usi.jpg"},
    
    {id:6, title:"Medication (Antibiotics)", price:25, short:"Antibiotics course", img:"img/antibiotics.PNG"},
    {id:7, title:"Anti-Parasite Treatment", price:30, short:"Flea/tick/deworming", img:"img/anti-parasite.webp"},
    {id:8, title:"Vaccination", price:35, short:"Basic vaccine dose", img:"img/vaccination.jpg"},
    {id:9, title:"Antiseptics & Bandage Materials", price:8, short:"Wound care supplies", img:"img/antiseptics.png"},
    {id:10, title:"Emergency Vet Visit ", price:50, short:"Urgent consultation", img:"img/emergency.jpg"},
    
    {id:11, title:"Pet Transportation Support", price:15, short:"Transfer to clinic or shelter", img:"img/transportation.jpg"},
    {id:12, title:"Temporary Foster Care Support", price:25, short:"Daily foster support", img:"img/foster.jpg"},
    {id:13, title:"IV Drip Therapy", price:36, short:"Infusion therapy session", img:"img/ivdrip.png"},
    {id:14, title:"Rehabilitation Therapy", price:40, short:"Physio/rehab sessions", img:"img/rehabilitation.jpg"},
    {id:15, title:"Grooming & Care Supplies", price:23, short:"Shampoos & brushes", img:"img/grooming.webp"},

    {id:16, title:"Toys For Pets", price:10, short:"Comfort toys for pets", img:"img/toys.jpg"},
    {id:17, title:"Pet Food Package", price:18, short:"1-week food supply", img:"img/food.jpg"},
    {id:18, title:"Pet Carrier Purchase", price:35, short:"Carrier for safe transport", img:"img/purchase.jpg"},
    {id:19, title:"Warm Blankets for Animals", price:6, short:"Cozy blankets for shelter", img:"img/blankets.webp"},
    {id:20, title:"Litter Tray Purchase", price:12, short:"Hygiene tray for cats", img:"img/littertray.jpg"}
    ];

let cart = {};
const product_gallary = document.getElementById('product_gallary');
const num_p_cart = document.getElementById('num_p_cart');
const open_cart = document.getElementById('open_cart');
const shopping_cart = new bootstrap.Modal(document.getElementById('shopping_cart'), {keyboard:true});
const cart_head = document.getElementById('cart_head');
const cart_body = document.getElementById('cart_body');
const cart_footer = document.getElementById('cart_footer');

// const burger_nav = document.querySelector('#burger_nav');
// function open_nav(){
//    burger_nav.setAttribute('aria-expanded', 'true'); }
// burger_nav.addEventListener('click', open_nav);
// do not need but i ffound a goog youtube tutorial https://youtu.be/pBv7igaxfQE?si=llUF7_z6Mm6Us7Yn

function add_card(){
    product_gallary.innerHTML = '';
    products.forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-6 col-sm-6 col-md-4 col-lg-3 card-col d-flex';
        col.innerHTML = `
          <div class="card product-card w-100"> 
             <img src="${p.img}" class="card_img_top" alt="${p.title}">
             <div class="card-body d-flex flex-column">
             <h5 class="card-title">${p.title}</h5>
             <p class="card-text text-muted small mb-2">${p.short}</p>
             <div class="mt-auto d-flex justify-content-between align-items-center">
             <div class="price_tag">€${p.price.toFixed(2)}</div>
             <button class="btn btn-sm btn-primary add_product" data-id="${p.id}">Add to Cart </button> 
             </div>
             </div>
          </div>`; // button creates the connection between product amd cart thanks to id, and the class for key - add-product 
        product_gallary.appendChild(col);
    });
// next few steps are from tutorial https://youtu.be/z_mTYpx49v4?si=PyGte_PX6Q-m8r2H
    document.querySelectorAll('.add_product').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id); // finds in html the str with id and uses it
            add_to_cart(id); // cols the function for this id
        }); // finds all buttons with corect key
    });
}

function add_to_cart(by_id){
    if(cart[by_id]) cart[by_id] +=1;
    else cart[by_id] = 1;
    const btn = document.querySelector(`.add_product[data-id='${by_id}']`);
    if(btn){
        btn.classList.add('added');
        btn.textContent = 'Added to cart';
    }
    update_cart();
}

function update_cart(){
    const count = Object.values(cart).reduce((s,q)=>s+q,0);
    num_p_cart.textContent = count; // the num of products displays on the screen in icon
    num_p_cart.style.display = count>0 ? 'inline-block': 'none'; // if there is nothig displays 0
}
// create the cart 
function your_cart(){
    cart_head.textContent = 'Your Cart';
    cart_body.innerHTML='';
    cart_footer.innerHTML= '';
    if(Object.keys(cart).length === 0){  //if there is nothing in my cart 
        cart_body.innerHTML = `
        <div class="text-center py-4">
           <p class="mb-2">Your cart is empty</p>
           <button class="btn btn-outline-primary" data-bs-dismiss="modal">Continue Browsing</button>
        </div>`;
        return;
    }
//the creation of list of products in cart https://youtu.be/gXWohFYrI0M?si=Bznxt6IkK5EvOos6
    const product_list = document.createElement('div'); 
    product_list.className = 'container';
    for(const [used_id, col_pr] of Object.entries(cart)){  // like vocabulary in puthon [used_id, col_pr] the key and value col_pr (colichestvo productov) - for the num of pr, used_id - the str for id
        const id = parseInt(used_id);  // the key is str but i need num - presents this like num 
        const p = products.find(x=>x.id===id); 
        
        const row = document.createElement('div');
        row.className = 'row align-items-center mb-3';
        row.innerHTML = `
            <div class="col-2">
              <img src="${p.img}" alt="${p.title}" class="img-fluid rounded" style="height: 64px; object-fit: cover;">
              </div>
              <div class="col-5">
                  <div class="fw-semibold">${p.title}</div>
                  <div class="small text-muted">${p.short}</div>
              </div>
              <div class="col-2">
                <div>€${p.price.toFixed(2)}</div> <!-- for 2 num after , -->
              </div>
              <div class="col-2">
              <input type="number" class="form-control form-control-sm num_product" min="1" value="${col_pr}" data-id="${id}">
              </div>
              <div class="col-1 text-end">
              <button class="btn btn-sm btn-link text-danger remove_product" data-id="${id}"><i class="bi bi-x-lg"></i></button>
            </div>`;
        product_list.appendChild(row);
     }
     cart_body.appendChild(product_list);

     const calculator_sum = document.createElement('div');
     calculator_sum.className = 'd-flex justify-content-between align-items-center mt-3';
     calculator_sum.innerHTML = `
        <div>
        <button id="delit_key" class="btn btn-outline-danger btn-sm">Clear Cart</button>
        </div>
        <div class="text-end">
             <div class="small text-muted">Subtotal: €<span id="subtotal">0.00</span></div>
             <div class="small text-muted">Tax (5%): €<span id="tax">0.00</span></div>
             <div class="small text-muted">Discount: €<span id="discount">0.00</span></div>
             <div class="fw-bold">Total: €<span id="total">0.00</span></div>
             <div class="mt-2">
             <button id="checkout_key" class="btn btn-primary btn-sm">Checkout</button>
             </div>
        </div>`;
     cart_body.appendChild(calculator_sum);

// tutorial how to chenge the num of products in cart https://youtu.be/z_mTYpx49v4?si=PyGte_PX6Q-m8r2H
     cart_body.querySelectorAll('.num_product').forEach(inp=>{
        inp.addEventListener('change', (e)=>{
            const val = parseInt(e.target.value) || 1;
            const id = parseInt(e.target.dataset.id);
            if(val<1) e.target.value = 1;
            cart[id] = parseInt(e.target.value);
            update_cart();
            update_calculations();
        });
     });
// delite one product 
     cart_body.querySelectorAll('.remove_product').forEach(btn=>{
        btn.addEventListener('click', ()=>{
            const id = parseInt(btn.dataset.id);
            delete cart[id];
            update_cart();
            your_cart();
        });
     });
// delit all products
     document.getElementById('delit_key').addEventListener('click',()=>{
        cart={};
        update_cart();
        your_cart();
     });
// if i add one more product
     document.getElementById('checkout_key').addEventListener('click', ()=>{
        show_form();
     });
     update_calculations();
}
// all calculations 
function calculations(){
    let subtotal = 0;
    let item_sum = 0;
    for(const [used_id, col_pr] of Object.entries(cart)){
        const id = parseInt(used_id);
        const p = products.find(x=>x.id===id);
        subtotal += p.price * col_pr;
        item_sum += col_pr;
    }
    const tax_num = 0.05;
    let discount = 0;
    if(item_sum >= 3){
        discount = subtotal * 0.10;
    }
    const tax = (subtotal - discount) * tax_num;
    const total = subtotal - discount + tax;
    return {
        subtotal, tax, discount, total, item_sum
    };
}
// updated for one more product
function update_calculations(){
    const {subtotal, tax, discount, total} = calculations();
    document.getElementById('subtotal').textContent = `€${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `€${tax.toFixed(2)}`;
    document.getElementById('discount').textContent = `€${discount.toFixed(2)}`;
    document.getElementById('total').textContent = `€${total.toFixed(2)}`;
}
// yeeee i finishd 1st part evverything works!!! 
// ! https://codebrainer.com/blog/contact-form-in-javascript - web page with discription how to create a form in js
function show_form(){
    cart_head.textContent = 'Buyer Information';
    cart_body.innerHTML = `<form id="registr_form" novalidate>
    <div class="row g-3">
        <div class="col-md-6">
            <label class="form-label">Full Name</label>
            <input class="form-control" placeholder="Name Surname" id="your_name" required>
            <div class="invalid-feedback">Enter your name and surname</div>
        </div>
        <div class="col-md-6">
            <label class="form-label">Phone</label>
            <input class="form-control" placeholder="+43 212 ****" id="your_phone" required pattern ="\\d+">
            <div class="invalid-feedback">Enter your valid phone number</div>
        </div>
         <div class="col-12">
            <label class="form-label">Address</label>
            <input class="form-control" placeholder="Street, City" id="your_addres" required>
            <div class="invalid-feedback">Enter your Address </div>
        </div>
         <div class="col-md-4">
            <label class="form-label">ZIP</label>
            <input class="form-control" placeholder="123***" id="your_ZIP" maxlength="6" required>
            <div class="invalid-feedback">ZIP up to 6 characters</div>
        </div>
         <div class="col-md-8">
            <label class="form-label">Email</label>
            <input class="form-control" placeholder="your@email.com" id="your_email" required>
            <div class="invalid-feedback">Enter your email address</div>
        </div>
         <div class="col-12">
            <label class="form-label">Notes (optional)</label>
            <textarea id="notes" class="form-control" rows="2"></textarea>
        </div>
    </div>
    <div class="d-flex justify-content-between mt-3">
        <button id="form_box" class="btn btn-outline-secondary">Clear Form</button>
        <button class="btn btn-success">Submit Order</button>
    </div>
</form>
`;

cart_footer.innerHTML = `<button class="btn btn-secondary" id="back_key">Back to Cart</button> `;
document.getElementById('back_key').addEventListener('click', ()=>{
    your_cart();
});

const registr_form = document.getElementById('registr_form');
document.getElementById('form_box').addEventListener('click', ()=>{
    registr_form.reset();
});

registr_form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!form_valid()) return;
    confirm_bill();
});
}
// valid check used page https://codebrainer.com/blog/contact-form-in-javascript

// function isNotEmpty(value){
//    if (value == nul || typeof value == 'undefined') return false;
//    return (value.length >0);}

function form_valid(){
    const name = document.getElementById('your_name');
    const phone = document.getElementById('your_phone');
    const address = document.getElementById('your_addres');
    const zip = document.getElementById('your_ZIP');
    const email = document.getElementById('your_email');

    let valid = true

    if(!name.value.trim()){
        name.classList.add('is-invalid');
        valid = false;
    }
    else name.classList.remove('is-invalid');
// the same check as for email
     if(!/^\d+$/.test(phone.value.trim())){
        phone.classList.add('is-invalid');
        valid = false;
    }
    else phone.classList.remove('is-invalid');

    
     if(!address.value.trim()){
        address.classList.add('is-invalid');
        valid = false;
    }
    else address.classList.remove('is-invalid');

    
     if(zip.value.trim().length === 0 || zip.value.trim().length > 6){
        zip.classList.add('is-invalid');
        valid = false;
    }
    else zip.classList.remove('is-invalid');

// absatz "Check if a string is an email" https://codebrainer.com/blog/contact-form-in-javascript
     if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){
        email.classList.add('is-invalid');
        valid = false;
    }
    else email.classList.remove('is-invalid');

    return valid;
}

// final block
function confirm_bill(){
    cart_head.textContent = 'Order Confirmation';
    const {subtotal, tax, discount, total} = calculations();

    let items_list = ''; // clean the main part and add there a final list
    for(const [used_id,col_pr] of Object.entries(cart)){
        const id = parseInt(used_id);
        const p = products.find(x=>x.id===id);
        items_list += `
        <div class="d-flex justify-content-between mb-2"> 
        <div><strong>${p.title}</strong> x ${col_pr}</div>
        <div>€${(p.price * col_pr).toFixed(2)}</div>
        </div>`;
    }
    cart_body.innerHTML = `
    <div class="container">
    <div class="text-center mb-3"><h5 class="mb-0">Final Confirmation</h5></div>
    <div class="row">
        <div class="col-md-8">
            <h6>Items</h6>${items_list} </div>
        <div class="col-md-4">
            <h6>Summary</h6>
            <div class="small">Subtotal: €${subtotal.toFixed(2)}</div>
            <div class="small">Tax (7%): €${tax.toFixed(2)}</div>
            <div class="small">Discount: -€${discount.toFixed(2)}</div>
            <hr>
            <div class="small">Total: €${total.toFixed(2)}</div>
        </div>
    </div>
    <div class="mt-3 text-center">
        <div class="alert alert-success">Thank you! Your donation request has been received</div>
        <button id="close_resert" class="btn btn-primary">Close</button>
    </div>
    </div>
    `;
    cart_footer.innerHTML = `<button class="btn btn-secondary" data-bs-dismiss="modal">Dismiss</button> `;
    document.getElementById('close_resert').addEventListener('click', ()=>{
        cart = {};
        update_cart();
        shopping_cart.hide();
    });
}
// nothing was working and the solution was to addd initialisation 
function init(){
    add_card();
    update_cart();

    open_cart.addEventListener('click', ()=>{
        your_cart();
        shopping_cart.show();
    });
}
document.addEventListener('DOMContentLoaded', init);