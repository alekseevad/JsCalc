const output = document.querySelector('output')
const div = document.createElement('div')
div.classList.add('keyboard')   
document.querySelector('.calculator').appendChild(div)

'( ) ^ CE 7 8 9 / 4 5 6 * 1 2 3 + . 0 = -'.split(' ')
    .map(symbol => {
        div.insertAdjacentHTML('beforeend', `<button value="${symbol}">${symbol}</button>`)
    })

document.querySelectorAll('button').forEach(button => {
    switch(button.value){
        case '=':
            button.style.backgroundColor = 'steelblue';
            button.addEventListener('click', function (){calc()})
            break
        
        case 'CE':
            button.style.backgroundColor = 'darkred'
            button.addEventListener('click', function(){clearThis()})
            break

        default:
            button.addEventListener('click', function(){print(button.value)})
            break
    }
})


function print(sign) {
    output.value += sign 
}

function calc(){
    const myExpr = output.value
    var postfix = parser(myExpr)
    let result
    let a
    let b
    let i = 0
    var stack = new Array()
    while(i < postfix.length) {
        if(priority(postfix[i]) == 5) {
            stack.push(postfix[i])
            ++i
        } 
        else {
            b = stack.pop()
            a = stack.pop()
            a = parseInt(a)
            b = parseInt(b)
            result = decision(postfix[i], a, b)
            stack.push(result)
            ++i
        }
    }
    output.value = result
}

function clearThis(){
    output.value = ''    
}

function priority(sign){
    switch (sign) {
        case '(':
            return 0
            break
        case ')':
            return 1
            break
        case '+':
            return 2
            break

        case '-':
            return 2
            break
            
        case '*':
            return 3
            break        
    
        case '/':
            return 3
            break
        case '^':
            return 4
            break
        default:
            return 5
            break

    }
}

function parser(expression){
    var result = new Array()
    var stack = new Array()
    let index = 0
    var myInt = ""
    while(index < expression.length) {
        switch(priority(expression[index])){
            case 0:
                stack.push(expression[index])
                ++index
                break

            case 1:
                let index1 = stack.length - 1
                while((stack[0] != undefined) && (stack[index1] != '(')) {                
                    result.push(stack.pop())
                    --index1
                }
                stack.pop()
                ++index
                break

            case 2:
                var index2 = stack.length - 1
                if(stack[0] == undefined) {
                    stack.push(expression[index])
                }
                else {
                    while((stack[0] != undefined) && (priority(stack[index2]) >= priority(expression[index])) && (stack[index2] != '(')) {
                        result.push(stack.pop())
                        --index2;
                    }
                    stack.push(expression[index])
                }
                index++
                break

            case 3:
                var index3 = stack.length - 1
                if(stack[0] == undefined) {
                    stack.push(expression[index])
                }
                else {
                    while((stack[0] != undefined) && (priority(stack[index3]) >= priority(expression[index])) && (stack[index3] != '(')) {
                        result.push(stack.pop())
                        --index3;
                    }
                    stack.push(expression[index])
                }
                index++
                break    

            case 4:
                var index4 = stack.length - 1
                if(stack[0] == undefined) {
                    stack.push(expression[index])
                }
                else {
                    while((stack[0] != undefined) && (priority(stack[index4]) >= priority(expression[index])) && (stack[index4] != '(')) {
                        result.push(stack.pop())
                        --index4;
                    }
                    stack.push(expression[index])
                }
                index++
                break
            
            case 5:
                while((priority(expression[index]) == 5) && (index < expression.length)) {
                    myInt += expression[index]
                    ++index
                }
                result.push(myInt)
                myInt = ""
                break
            }
    }
    if(stack.length > 0) {
        for(let i = stack.length - 1; i >= 0; --i){
            result.push(stack.pop())
        }
    }
    return result
}   

function decision(operation, a, b){
    switch (operation) {
        case '+':
            return (a + b)
            break;

        case '-':
            return (a - b)
            break

        case '*':
            return (a * b)
            break

        case '/':
            return (a / b)
            break

        case '^':
            return (a**b)
            break

        default:
            alert('Wrong expression')
            break;
    }
}