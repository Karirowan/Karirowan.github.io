function selectRandomFaculty(faculties) {
    return faculties[Math.floor(Math.random() * faculties.length)];
}

document.addEventListener("DOMContentLoaded", function () {
    const facultyButton = document.getElementById('facultyButton');
    const resultParagraph = document.getElementById('result');

    if (!facultyButton || !resultParagraph) {
        console.error("Не найден один из необходимых элементов.");
        return;
    }

    facultyButton.addEventListener('click', function () {
        const faculties = ['Гриффиндор', 'Слизерин', 'Когтевран', 'Пуффендуй'];
        const selectedFaculty = selectRandomFaculty(faculties);
        
        resultParagraph.textContent = `Твой факультет: ${selectedFaculty}`;
 resultParagraph.classList.add('styled-text'); // Применение класса


  // Удаляем предыдущие классы, если они есть
        document.body.classList.remove('gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff');

 // Применяем класс в зависимости от выбранного факультета
        switch(selectedFaculty) {
            case 'Гриффиндор':
                document.body.classList.add('gryffindor');
                break;
            case 'Слизерин':
                document.body.classList.add('slytherin');
                break;
            case 'Когтевран':
                document.body.classList.add('ravenclaw');
                break;
            case 'Пуффендуй':
                document.body.classList.add('hufflepuff');
                break;
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cipherForm');
    const encryptButton = document.getElementById('encryptButton');
    const decryptButton = document.getElementById('decryptButton');
    
    encryptButton.addEventListener('click', () => processCaesarCipher(true));
    decryptButton.addEventListener('click', () => processCaesarCipher(false));

    function processCaesarCipher(isEncrypting) {
        const plaintext = document.getElementById("plaintext").value;
        const selectedLanguage = document.getElementById("language").value;
        const shift = Number(document.getElementById("shift").value);

        const processedText = caesarCipher(plaintext, shift, selectedLanguage, isEncrypting);
        const outputElement = document.getElementById("output");

        if (outputElement) {
            outputElement.textContent = processedText;
        } else {
            console.error("Элемент с id='output' не найден.");
        }
    }

    function caesarCipher(text, shift, language, isEncrypting = true) {
        let result = '';
        
        // Если мы расшифровываем, то меняем знак сдвига на противоположный
        if (!isEncrypting) {
            shift = -shift;
        }
        
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);

            switch (language) {
                case "English":
                    if (charCode >= 65 && charCode <= 90) { // Uppercase letters
                        result += String.fromCharCode((charCode - 65 + shift) % 26 + 65);
                    } else if (charCode >= 97 && charCode <= 122) { // Lowercase letters
                        result += String.fromCharCode((charCode - 97 + shift) % 26 + 97);
                    } else {
                        result += text[i];
                    }
                    break;
                case "Russian":
                    if (charCode >= 1040 && charCode <= 1071) { // Заглавные русские буквы
                        result += String.fromCharCode((charCode - 1040 + shift) % 32 + 1040);
                    } else if (charCode >= 1072 && charCode <= 1103) { // Строчные русские буквы
                        result += String.fromCharCode((charCode - 1072 + shift) % 32 + 1072);
                    } else {
                        result += text[i];                
                    }
                    break;
                default:
                    result += text[i];
            }
        }

        return result;
    }
});
