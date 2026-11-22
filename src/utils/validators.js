export function validateName(value) {
  if (!value || !value.trim()) {
    return 'Please enter your full name.'
  }
  return null
}

export function validateEmail(value) {
  if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Enter a valid email id'
  }
  return null
}

export function validatePhone(value) {
  const digits = (value || '').replace(/\D/g, '')
  if (digits.length !== 10) {
    return 'Enter a 10-digit phone number.'
  }
  return null
}

export function validatePincode(value) {
  if (!/^\d{6}$/.test(value || '')) {
    return 'Enter a valid 6-digit PIN code.'
  }
  return null
}

export function validateCardNumber(value) {
  const digits = (value || '').replace(/\D/g, '')
  if (digits.length < 13 || digits.length > 19) {
    return 'Enter a valid card number.'
  }
  return null
}

export function validateExpiry(value) {
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value || '')) {
    return 'Enter a valid expiry (MM/YY).'
  }
  return null
}

export function validateCVV(value) {
  if (!/^\d{3,4}$/.test(value || '')) {
    return 'Enter a valid CVV.'
  }
  return null
}

export function validateUpi(value) {
  if (!value || !/@/.test(value.trim())) {
    return 'Enter a valid UPI ID.'
  }
  return null
}
