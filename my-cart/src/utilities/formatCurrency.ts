const Rupees = new Intl.NumberFormat(undefined, {
    currency: "INR",
    style: "currency",
  })
  
  export function formatCurrency(number: number) {
    return Rupees.format(number)
  }