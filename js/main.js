'use strict';

class Sorting {
    constructor(arr, M) {
        this.arr = arr;
        this.M = M;
        this.count = 0;
        this.comparisonTargetIndex1 = 0;
        this.comparisonTargetIndex2 = Math.floor(Math.random() * (this.arr.length));
        console.log(this.comparisonTargetIndex2);
        this.comparisonTarget1 = this.arr[this.comparisonTargetIndex1];
        this.comparisonTarget2 = this.arr[this.comparisonTargetIndex2];
    }

    get1() {
        return this.arr[this.comparisonTargetIndex1];
    }
    get2() {
        return this.arr[this.comparisonTargetIndex2];
    }
    getIndex1() {
        return this.comparisonTargetIndex1;
    }
    getIndex2() {
        return this.comparisonTargetIndex2;
    }

    select(i) {
        console.log(i);
    }

}

function afterSwap(stack, p, h, l, M){
    if ( p - 1 > l ) {
        stack.push(l);
        stack.push(p - 1);
    }

    if ( p + 1 < h &&
         p + 1 < M // 打ち切り
    ) {
        stack.push(p + 1);
        stack.push(h);
    }
}

function compare(x, y) {
    return (x <= y);
}

function afterCompare(result, arr, i, j) {
    if (result) {
        i++;
        swap(arr, i, j);
    }
    return i;
}

function quickSortIterative (arr, l, h, M) {
    let stack = [];
    stack.push(l);
    stack.push(h);
    while (true) {
        if (!(stack.length > 0)) break;
        h = stack.pop();
        l = stack.pop();

        let i = (l - 1);
        let j = l;
        while (true) {
            if (!(j <= h - 1)) break;
            let result = compare(arr[j], arr[h]);
            i = afterCompare(result, arr, i, j);
            j++;
        }
        swap(arr, i + 1, h);

        let p = i + 1;
        afterSwap(stack, p, h, l, M);
    }
    return arr;
}
// 理想的なi/f
// good(index); -> nextProcess();

function swap(arr, i, j) {
        let tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
}

function select(n) {
    console.log(n);
}

/* This function is same in both iterative and recursive*/
function partition (arr, l, h)
{
    let x = arr[h];
    let i = (l - 1);

    for (let j = l; j <= h - 1; j++) {
        if (arr[j] <= x) {
            i++;
            swap (arr, i, j);
        }
    }
    swap (arr, i + 1, h);
    return (i + 1);
}

function quickTopSort(arr, M) {
    arr = arr.slice(0);
    quickTopSortCore(arr, M, 0, arr.length - 1);
    return arr;
}

function quickTopSortCore(arr, M, from, to) {
    const p = arr[to];
    let i = from, j = to -1;
    if (from >= to) return;
    while (true) {
        while(arr[i] < p && i <= j) i++;
        while(arr[j] >= p && i <= j) j--;

        if (i >= j) break;
        swap(arr, i, j);
    }

    arr[to] = arr[i];
    arr[i] = p;
    quickTopSortCore(arr, M, from, i - 1);
    if (i + 1 < M) {
        quickTopSortCore(arr, M, i + 1, to);
    }
}

document.addEventListener("DOMContentLoaded", function(evt) {
    let left = document.querySelector('#left');
    let right = document.querySelector('#right');
    let center = document.querySelector('#center');

    left.addEventListener("click", function(evt) {
        select(1);
    });
    right.addEventListener("click", function(evt) {
        select(-1);
    });
    center.addEventListener("click", function(evt) {
        select(0);
    });
    let a = new Sorting([5,3,7,2], 2);
    console.log(a);
});

