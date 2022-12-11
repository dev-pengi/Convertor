
selects()
function selects() {
    let selects = document.querySelectorAll('.select')
    selects.forEach(select => {
        $(select).replaceWith($(select).clone())
    })
    selects = document.querySelectorAll('.select')

    selects.forEach(select => {
        select.querySelector('.select-dropdown__button').addEventListener('click', () => {
            select.classList.toggle('active')
        })
        $(window).on('click', function (e) {
            if ($(e.target).closest(select).length == 0) {
                select.classList.remove('active')
            }
        });
        select.querySelectorAll('.select-item').forEach(item => {
            item.addEventListener('click', () => {
                select.classList.remove('active')
                select.setAttribute('data-value', item.getAttribute('data-value'))
                select.querySelector('span').innerHTML = item.innerHTML;
            })
        })
    })
}
