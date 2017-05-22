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

function quickSortIterative (arr, l, h, M) {
    // Create an auxiliary stack
    let stack = new Array( h - l + 1 );
    // initialize top of stack
    let top = -1;
    // push initial values of l and h to stack
    stack[ ++top ] = l;
    stack[ ++top ] = h;
    // Keep popping from stack while is not empty
    while ( top >= 0 ) {
        // Pop h and l
        h = stack[ top-- ];
        l = stack[ top-- ];
        // Set pivot element at its correct position
        // in sorted array
        //let p = partition( arr, l, h );

        let x = arr[h];
        let i = (l - 1);

        for (let j = l; j <= h - 1; j++) {
            if (arr[j] <= x) {
                i++;
                swap (arr, i, j);
            }
        }
        swap (arr, i + 1, h);
        let p = (i + 1);

        // If there are elements on left side of pivot,
        // then push left side to stack
        if ( p-1 > l ) {
            stack[ ++top ] = l;
            stack[ ++top ] = p - 1;
        }
        // If there are elements on right side of pivot,
        // then push right side to stack
        if ( p+1 < h && p + 1 < M) {
            stack[ ++top ] = p + 1;
            stack[ ++top ] = h;
        }
    }
    return arr;
}


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

