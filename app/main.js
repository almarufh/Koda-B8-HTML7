// Contoh jika menggunakan struktur RequireJS (main.js atau app.js)
require(['jquery'], function($) {
  
    $(document).ready(function() {
        const calc = `
        <div class="calc">
        <div class="result">
            <div class="history"></div>
            <input type="number" value="0">
        </div>
            <div><button type="button" class="btn">AC</button></div>
            <div><button type="button" class="btn">DEL</button></div>
            <div><button type="button" class="btn">%</button></div>
            <div><button type="button" class="operator">/</button></div>
            <div><button type="button">7</button></div>
            <div><button type="button">8</button></div>
            <div><button type="button">9</button></div>
            <div><button type="button" class="operator">x</button></div>
            <div><button type="button">4</button></div>
            <div><button type="button">5</button></div>
            <div><button type="button">6</button></div>
            <div><button type="button" class="operator">-</button></div>
            <div><button type="button">1</button></div>
            <div><button type="button">2</button></div>
            <div><button type="button">3</button></div>
            <div><button type="button" class="operator">+</button></div>
            <div><button type="button">+/-</button></div>
            <div><button type="button">0</button></div>
            <div><button type="button">.</button></div>
            <div><button type="button" class="operator equal">=</button></div>
        </div>
        `;
        $('.main').html(calc);
        const $display = $('.result > input');
        $display.attr('type', 'text');
        
        let memory = 0;
        let isCalculated = false;
        
        $('.calc button').on('click', function() {
            let btnText = $(this).text();
            let currentDisplay = $display.val();

            console.log(btnText, currentDisplay)
            
            if ((currentDisplay === '0' || isCalculated) && !isNaN(btnText) && btnText !== '.') {
                currentDisplay = '';
            }
        
            isCalculated = false;
        
            switch(btnText) {
                case 'AC':
                    $display.val('0');
                    break;
                case 'DEL':
                    let newDisplay = currentDisplay.slice(0, -1);
                    $display.val(newDisplay === '' ? '0' : newDisplay);
                    break;
                case '=':
                    try {
                        let expression = currentDisplay.replace(/x/g, '*');
                    
                        let result = eval(expression);
                    
                        $display.val(result);
        
                        isCalculated = true;
                    } catch (error) {
                        $display.val('Error');
                        isCalculated = true;
                    }
                    break;
            
                case '%':
                    try {
                        $display.val(eval(currentDisplay.replace(/x/g, '*')) / 100);
                        isCalculated = true;
                    } catch (error) {
                        $display.val('Error');
                    }
                    break;
                case '+/-':
                    try {
                        $display.val(eval(currentDisplay.replace(/x/g, '*')) * -1);
                    } catch (error) {
                        $display.val('Error');
                    }
                    break;
                default:
                    let lastChar = currentDisplay.slice(-1);
                    let operators = ['+', '-', 'x', '/'];
                    
                    if (operators.includes(btnText) && operators.includes(lastChar)) {
                        $display.val(currentDisplay.slice(0, -1) + btnText);
                    } else {
                        $display.val(currentDisplay + btnText);
                    }
                    break;
                }
        }); 
    });
 
});