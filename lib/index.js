const capitalize = (str) => {
    if (typeof str !== 'string') return ''
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)
}

module.exports = { capitalize }