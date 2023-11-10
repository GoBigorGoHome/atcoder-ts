// 用TypeScript写题：https://qiita.com/cosocaf/items/255003ecec1d3badfc7b
import { createInterface } from "readline";
import * as fs from "fs";

let inputs = "";
let inputArray: string[];
let currentIndex = 0;

let outputBuffer = "";

function next() {
    return inputArray[currentIndex++];
}
function nextNum() {
    return +next();
}
function nextBigInt() {
    return BigInt(next());
}
function nexts(length: number) {
    const arr = [];
    for (let i = 0; i < length; ++i) arr[i] = next();
    return arr;
}
function nextNums(length: number) {
    const arr = [];
    for (let i = 0; i < length; ++i) arr[i] = nextNum();
    return arr;
}
function next2DNums(length1: number, length2: number) {
    const arr: number[][] = [];
    for (let i = 0; i < length1; i++)
        arr[i] = nextNums(length2);
    return arr;
}
function nextBigInts(length: number) {
    const arr = [];
    for (let i = 0; i < length; ++i) arr[i] = nextBigInt();
    return arr;
}
function print<T>(out: string | number | bigint | boolean | Array<T>): void;
function print<T>(out: Array<T>, separator: string): void;
function print<T>(out: string | number | bigint | boolean| Array<T>, separator?: string) {
    if (Array.isArray(out)) {
        outputBuffer += out.join(separator || ' ');
    } else {
        outputBuffer += out;
    }
}
function println<T>(out: string | number | bigint | boolean | Array<T>): void;
function println<T>(out: Array<T>, separator: string): void;
function println<T>(out: string | number | bigint | boolean | Array<T>, separator?: string) {
    if (Array.isArray(out)) {
        print(out, separator || " ");
    } else {
        print(out);
    }
    print("\n");
}

function flush() {
    console.log(outputBuffer);
}

// デバッグ環境がWindowsであれば条件分岐する
if (process.env.OS == "Windows_NT") {
    const stream = createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    stream.on("line", (line) => {
        inputs += line;
        inputs += "\n";
    });
    stream.on("close", () => {
        inputArray = inputs.split(/\s/);
        main();
        flush();
    });
} else {
    inputs = fs.readFileSync("/dev/stdin", "utf8");
    inputArray = inputs.split(/\s/);
    main();
    flush();
}

function vec(len: number, val: number = 0) {
    return Array<number>(len).fill(val);
}

function vec2(len1: number, len2: number = 0, val: number = 0) {
    const arr = Array<Array<number>>(len1);
    for (let i = 0; i < len1; i++)
        arr[i] = vec(len2, val);
    return arr;
}

function vec3(len1: number, len2: number, len3: number = 0, val: number = 0) {
    const arr = Array<Array<Array<number>>>(len1);
    for (let i = 0; i < len1; i++)
        arr[i] = vec2(len2, len3, val);
    return arr;
}

function acc(arr: number[]): number {
    let sum = 0;
    for (let x of arr)
        sum += x;
    return sum;
}

function main() {
    const n = nextNum();
    const m = nextNum();
    const g = vec2(n + 1);
    const a = nextNums(m);
    const b = nextNums(m);
    for (let i = 0; i < m; i++) {
        g[a[i]].push(b[i]); 
        g[b[i]].push(a[i]);  
    }
    const color: number[] = [];
    function dfs(u: number, c: number) : boolean {
        if (color[u]) {
            return color[u] == c;
        }
        color[u] = c;
        for (let v of g[u]) {
            if (!dfs(v, -c)) {
                return false;
            }
        }
        return true;
    }
    for (let i = 1; i <= n; i++)
        if (!color[i] && !dfs(i, 1)) {
            print("No");
            return;
        }
    print("Yes");
}



