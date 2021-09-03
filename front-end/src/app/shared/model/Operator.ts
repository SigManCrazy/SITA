export interface Operator{
    value: OPERATORTYPE;
} 

export enum OPERATORTYPE{
    openBrackets = '(',
    closedBrackets = ')',
    openSquareBrackets = '[',
    closedSquareBrackets = ']',
    openCurlyBrackets = '{',
    closedCurlyBrackets = '}',
    sum = '+',
    less = "-",
    multi = "*",
    div = "/"
}