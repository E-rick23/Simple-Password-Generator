const flags = {
    numbers: false,
    numbers: false,
    symbols: false,
    lenght: 14
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
    const defaultchar = 'zyxwvutsrqponmlkjihgfedcba' //They're backwards because yes. :)
    //By default, the generator starts with the alphabet in lowercase.
    const characters = {
        uppercase: defaultchar.toUpperCase(), //This simply changes the defaultchar value to uppercase.
        numbers: '9876543210', //Again, backwards because yes. :)
        symbols: '!@#$%^&*~' //Some symbols for password generation.
    }
    const charList = [
        defaultchar,
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
        //Event Listener for the copy event.
        case selectors.copy:
            const dummy = document.createElement('textarea')

            document.body.appendChild(dummy)

            dummy.value = selectors.input.value
            dummy.select()

            document.execCommand('copy')
            document.body.removeChild(dummy)
        break;

        //Event Listener for the checkboxes.
        case selectors.checkbox:
            flags[event.target.control.id] = !event.target.control.checked
            //This make sure the flags that are based on whether a checkbox is checked or not are properly updated.
        break;

        //Event Listener for the slider.
        case selectors.slider:
            const value = event.target.valueAsNumber //This make sure we are able to get the value of the slider thanks to the valueAsNumber attibute.

            selectors.sliderValue.innerText = value
            flags.lenght = value
        break;
        //Event Listener for the generate button.
        case selectors.button:
            selectors.input.value = generatePassword()
        break;
    }
})
