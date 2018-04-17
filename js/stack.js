/* 栈的顺序表示 */
function Stack() {
    this.dataStore = [];
    /* 用于储存栈元素的数组 */
    this.top = -1;
    /* 用于栈顶指针 */
}
Stack.prototype = {
    constructor: Stack,
    push: function (element) { /* 入栈方法 */
        this.dataStore[++this.top] = element;
    },
    pop: function () { /* 出栈方法 */
        if (this.length() == 0) {
            return undefined;
        }
        var topvalue = this.dataStore[this.top];
        delete this.dataStore[this.top--];
        return topvalue;
    },
    peek: function () { /* 返回顶部的栈元素 */
        return this.dataStore[this.top];
    },
    clear: function () { /* 清除栈元素 */
        this.top = -1;

        //下面两句任选其一清除数组dataStore里的数据
        // this.dataStore = [];
        this.dataStore.length = 0;
    },
    length: function () { /* 返回栈元素个数 */
        return this.top + 1;
    }
};

/* 栈的链式表示 */
/*
 function Stack() {
 this.top = null;
 this.size = 0;
 }
 Stack.prototype = {
 constructor: Stack,
 push: function (data) {
 var node = {
 data: data,
 next: null
 };

 node.next = this.top;
 this.top = node;
 this.size++;
 },
 peek: function () {
 return this.top === null ?
 null :
 this.top.data;
 },
 pop: function () {
 if (this.top === null) return null;

 var out = this.top;
 this.top = this.top.next;

 if (this.size > 0) this.size--;

 return out.data;
 },
 clear: function () {
 this.top = null;
 this.size = 0;
 },
 length: function () {
 return this.size;
 },
 displayAll: function () {
 if (this.top === null) return null;

 var arr = [];
 var current = this.top;

 for (var i = 0, len = this.size; i < len; i++) {
 arr[i] = current.data;
 current = current.next;
 }

 return arr;
 }
 };*/

/************************************************** 栈的应用 ***************************************************/
/**
 * 优先级函数
 * @param str
 * @returns {number}
 */
function priority(str) {
    switch (str) {
        case '+' :
        case '-' :
            return 1;
            break;
        case '*' :
        case '/':
            return 2;
            break;
        case '(':
            return 3;
            break;
        case ')':
            return 4;
            break;
        default : /* 若为数字 */
            return 0;
            break;
    }
}

/**
 * 中缀表达式转后缀表达式函数：infix2Suffix()
 * @param infix 中缀表达式字符串
 * @returns {string} 后缀表达式字符串
 */
function infix2Suffix(infix) {
    var out = ''; /* 保存输出的后缀表达式 */
    var stack = new Stack();
    for (var i = 0; i < infix.length; i++) {
        if (priority(infix[i]) == 0) {
            out += infix[i];
        } else {
            var peek = stack.peek();
            if (!peek) {  /* 栈为空 */
                stack.push(infix[i]);
            } else if (priority(infix[i]) == 4) { /* 遇到右括号 */
                var tmp = stack.pop();
                while (tmp != '(') {
                    out += tmp;
                    tmp = stack.pop();
                }
            } else if (priority(peek) <= priority(infix[i])) { /* 栈顶运算符的优先级不大于当前运算符，则直接进栈 */
                stack.push(infix[i]);
            } else if (priority(peek) > priority(infix[i])) {
                /* 栈顶运算符的优先级大于当前运算符，则栈顶元素一次出栈并输出，并将当前符号进栈 */
                var tmp = stack.pop();
                while (priority(tmp) >= priority(infix[i]) || stack.length() != 0) {
                    if (priority(tmp) == 3) { /* 左括号优先级比‘+ - * /’高，但左括号只有遇到右括号才出栈 */
                    stack.push(tmp);
                        break;
                    }
                    out += tmp;
                    tmp = stack.pop()
                }
                stack.push(infix[i]);
            }
        }
    }
    while (stack.length() != 0) { /* 中缀表达式遍历完后，栈中运算符要全部出栈 */
        var tmp = stack.pop();
        if (tmp != '(') {
            out += tmp;
        }
    }
    return out;
}

/**
 * 后缀表达式计算
 * @param suffix
 * @returns {number}
 */
function caculateSuffix(suffix) {
    var result = 0;
    var stack = new Stack();
    for (var i = 0; i < suffix.length; i++) {
        if (suffix[i].match(/\d/)) {
            stack.push(suffix[i]);
        } else {
            var after = stack.pop(),
                before = stack.pop();
            switch (suffix[i]) {
                case '+':
                    result = before * 1 + after * 1;
                    stack.push(result);
                    break;
                case '-':
                    result = before * 1 - after * 1;
                    stack.push(result);
                    break;
                case '*':
                    result = before * 1 * after * 1;
                    stack.push(result);
                    break;
                case '/':
                    result = before * 1 / after * 1;
                    stack.push(result);
                    break;
            }
        }
    }
    result = stack.pop();
    return result;
}