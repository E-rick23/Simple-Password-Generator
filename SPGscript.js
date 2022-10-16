const flags = {
    uppercase: false,
    numbers: false,
    symbols: false,
    length: 14
}

const selectors = {
    copy: 'copy',
    checkbox: 'checkbox',
    slider: 'slider',
    button: 'button',
    sliderValue: document.querySelector('.value'),
    input: document.querySelector('input[type="text"]')
}

const generatePassword = () => {
    const defaultChar = 'zyxwvutsrqponmlkjihgfedcba' //They're backwards because yes. :)
    //By default, the generator starts with the alphabet in lowercase.
    const characters = {
        uppercase: defaultChar.toUpperCase(),  //This simply changes the defaultchar value to uppercase.
        numbers: '9876543210', //Again, backwards because yes. :)
        symbols: '!@#$%^&*~' //Some symbols for password generation.
    }

    const charList = [
        defaultChar,
        ...flags.uppercase ? characters.uppercase : [],
        ...flags.numbers ? characters.numbers : [],
        ...flags.symbols ? characters.symbols : []
    ].join('')

    return Array.from({ length: flags.length }, () => Math.floor(Math.random() * charList.length))
        .map(number => charList[number])
        .join('')
}

document.querySelector('#app').addEventListener('click', event => {
    switch (event.target.dataset.jsSelector) {
        // Event listener for copy
        case selectors.copy:
            const dummy = document.createElement('textarea')

            document.body.appendChild(dummy)

            dummy.value = selectors.input.value
            dummy.select()

            document.execCommand('copy')
            document.body.removeChild(dummy)
        break;

        // Event listeners for checkboxes
        case selectors.checkbox:
            flags[event.target.control.id] = !event.target.control.checked
            //This make sure the flags that are based on whether a checkbox is checked or not are properly updated.
        break;

        // Event listeners for slider
        case selectors.slider:
            const value = event.target.valueAsNumber //This make sure we are able to get the value of the slider thanks to the valueAsNumber attibute.

            selectors.sliderValue.innerText = value
            flags.length = value
        break;

        // Event listener for generate button
        case selectors.button:
            selectors.input.value = generatePassword()
        break;
    }
})
