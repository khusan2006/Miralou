
// handle UI change
document.querySelectorAll('.product_img-container').forEach(el => {
    el.addEventListener('mouseover', () => {
        el.querySelector('.product_overlay-container').classList.add('active');   
    })
    el.addEventListener('mouseout', () => {
        el.querySelector('.product_overlay-container').classList.remove('active');
    })
})

// handle variant change 
document.querySelectorAll('.product_variant-select').forEach((el) => {
    el.addEventListener('change', () => {
          el.closest('.product_overlay-container').querySelector('input[name="id"]').value = el.value
          const price = el.querySelector(`.product_variant-option[value="${CSS.escape(el.value)}"]`).getAttribute("data-price");
          const compare_price = el.querySelector(`.product_variant-option[value="${CSS.escape(el.value)}"]`).getAttribute('data-compare')
          el.closest('.product_overlay-container').querySelector('.actual_price').textContent = window.formatPrice(price);
          if (el.closest('.product_overlay-container').querySelector('.sale_price') && compare_price > price) {
            console.log('hello')
            el.closest('.product_overlay-container').querySelector('.sale_price').textContent = window.formatPrice(compare_price);
          }else {
            el.closest('.product_overlay-container').querySelector('.sale_price').textContent = '';
          }
    })
})

document.querySelectorAll('.product_overlay').forEach((el) => {
    el.addEventListener('submit', async (e) => {
        e.preventDefault();
        window.loaderAnimation(el.querySelector('button'), 0.9);
        await window.cart.add(el.querySelector('input[name="id"]').value);
        window.stopLoaderAnimation(el.querySelector('button'), 'add to card')
    })
})


