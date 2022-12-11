
document.querySelector('#units_type').querySelector('.select-dropdown__list').innerHTML = units.map(unit => {
  return `
    <li data-value="${unit.value}" class="select-item">
      ${unit.name}
    </li>`
}).join('');
selects();

let currentType = null;
units_refresh();
function units_refresh() {
  document.querySelector('#units_type').addEventListener('click', () => {
    if (document.querySelector('#units_type').getAttribute('data-value') == currentType) return
    const unit = units.find(obj => obj.value == document.querySelector('#units_type').getAttribute('data-value'))
    if (!unit) return
    let html = () => {
      return unit.data.map(unit => {
        return `
      <li data-value="${unit.value}" class="select-item">
        ${unit.name}
      </li>`
      }).join('');
    }
    document.querySelector('#from_unit').querySelector('.select-dropdown__list').innerHTML = html();
    document.querySelector('#to_unit').querySelector('.select-dropdown__list').innerHTML = html();
    currentType = document.querySelector('#units_type').getAttribute('data-value');
    selects();
    units_refresh();
  })
}

const amount = document.querySelector('#amount')
const result = document.querySelector('#result')
const error_block = document.querySelector('#error_box')
amount.addEventListener('input', () => {
  reset_err()
})
document.querySelector('#convert').addEventListener('click', () => {
  reset_err()
  if (!amount.value.trim().length) return write_err('Please enter the amount')
  if (isNaN(amount.value)) return write_err('Please enter a valid number to convert')
  const unit = units.find(obj => obj.value == document.querySelector('#units_type').getAttribute('data-value'))
  if (!unit) return write_err('Please selects units')
  const from_unit = unit.data.find(obj => obj.value == document.querySelector('#from_unit').getAttribute('data-value'))
  if (!from_unit) return write_err('Please choose what unit you want to convert')
  const to_unit = unit.data.find(obj => obj.value == document.querySelector('#to_unit').getAttribute('data-value'))
  if (!to_unit) return write_err('Please choose what unit you want to convert to')

  const convert = (from_unit.divide * amount.value) / to_unit.divide
  result.value = convert

  // if (document.querySelector('#from_unit').getAttribute('data-value'))
})



function write_err(err = 'something went wrong') {
  error_block.innerHTML = err
}
function reset_err() {
  error_block.innerHTML = ''
}