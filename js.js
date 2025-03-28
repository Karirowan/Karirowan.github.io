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



  // Обработчик нажатия на кнопку
  document.getElementById('compareButton').addEventListener('click', compareTexts);
});

// Функция для выделения различий в тексте с использованием алгоритма Левенштейна
function highlightDifferences(text1, text2) {
    // Алгоритм Левенштейна для нахождения минимального количества операций редактирования
    function levenshteinDistance(s1, s2) {
        const m = s1.length;
        const n = s2.length;
        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

        for (let i = 0; i <= m; i++) {
            dp[i][0] = i;
        }

        for (let j = 0; j <= n; j++) {
            dp[0][j] = j;
        }

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (s1[i - 1] === s2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1]; // Совпадение
                } else {
                    dp[i][j] = Math.min(
                        dp[i - 1][j] + 1,     // Удаление
                        dp[i][j - 1] + 1,     // Вставка
                        dp[i - 1][j - 1] + 1  // Замена
                    );
                }
            }
        }

        // Возвращаем матрицу расстояний
        return dp;
    }

    // Функция для построения результирующего текста с учетом различий
    function buildHighlightedText(dpMatrix, s1, s2) {
        let resultHtml = '';
        let i = s1.length;
        let j = s2.length;

        while (i > 0 && j > 0) {
            if (dpMatrix[i][j] === dpMatrix[i - 1][j - 1] && s1[i - 1] === s2[j - 1]) {
                // Символы совпадают
                resultHtml = s1[i - 1] + resultHtml;
                i--;
                j--;
            } else if (dpMatrix[i][j] === dpMatrix[i - 1][j] + 1) {
                // Удаление
                resultHtml = `<span class="highlight">${s1[i - 1]}</span>` + resultHtml;
                i--;
            } else if (dpMatrix[i][j] === dpMatrix[i][j - 1] + 1) {
                // Вставка
                resultHtml = `<span class="highlight">${s2[j - 1]}</span>` + resultHtml;
                j--;
            } else {
                // Замена
                resultHtml = `<span class="highlight">${s1[i - 1]}</span>` + resultHtml;
                i--;
                j--;
            }
        }

        // Обрабатываем оставшиеся символы
        while (i > 0) {
            resultHtml = `<span class="highlight">${s1[i - 1]}</span>` + resultHtml;
            i--;
        }

        while (j > 0) {
            resultHtml = `<span class="highlight">${s2[j - 1]}</span>` + resultHtml;
            j--;
        }

        return resultHtml;
    }

    // Основной процесс сравнения
    const dpMatrix = levenshteinDistance(text1, text2);
    const highlightedText = buildHighlightedText(dpMatrix, text1, text2);

    return highlightedText;
}

// Основная функция для сравнения текстов
function compareTexts() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;

    const highlightedText = highlightDifferences(text1, text2);

    document.getElementById('result-div').innerHTML = highlightedText;

}
