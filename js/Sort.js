/**
 * Created by Wonder on 2018/1/24.
 */

function List(array){
    this.L = array;
    this.length = array.length;
}

/* 冒泡排序 */
List.prototype.BubbleSort = function () {
    var i, j, tmp;
    for (i = 0; i < this.length; i++) {
        for (j = this.length - 1; j > i; j--) { /* 注意 j 是从后往前循环 */
            if (this.L[j - 1] > this.L[j]) { /* 若前者大于后者 */
                /* 交换位置 */
                tmp = this.L[j];
                this.L[j] = this.L[j - 1];
                this.L[j - 1] = tmp;
            }
        }
    }
};
/* 简单选择排序 */
List.prototype.SimpleSelectionSort = function () {
    var i, j, min,tmp;
    for(i=0;i<this.length;i++){
        min = i; /* 将当前下标定义为最小值下标 */
        for(j=i+1;j<this.length;j++){
            if(this.L[min]>this.L[j]){ /* 若有小于当前最小值的关键字 */
                min = j; /* 将此关键字的下标赋给min */
            }
        }
        if(i!=min){ /* 若min与i不等，则说明找到了最小值 */
            /* 交换位置 */
            tmp = this.L[i];
            this.L[i] = this.L[min];
            this.L[min] = tmp;
        }
    }
};

/* 直接插入排序 */
List.prototype.InsertSort = function () {
    var i, j, tmp;
    for (i = 0; i < this.length - 1; i++) {
        /* 每次处理一个元素，第一个元素看作已处理，所以只需处理 n-1 个元素 */
        tmp = this.L[i + 1];
        j = i;
        while (j > -1 && tmp < this.L[j]) {
            this.L[j + 1] = this.L[j];
            j--;
        }
        this.L[j + 1] = tmp;
    }
};

/* 希尔排序 */
List.prototype.ShellSort = function () {
    var i, j, k, tmp;
    var span = parseInt(this.length / 2);
    while (span >= 1) {
        for (k = 0; k < span; k++) { /* 共 span 个小组 */
            /* 组内是直接插入排序，区别是：每次不是增 1 而是增加span */
            for (i = k; i < this.length - span; i += span) {
                tmp = this.L[i + span];
                j = i;
                while (j > -1 && tmp < this.L[j]) {
                    this.L[j + span] = this.L[j];
                    j = j - span;
                }
                this.L[j + span] = tmp;
            }
        }
        console.log(span);
        span = parseInt(span / 2);
    }
};

/* 构建大顶堆*/
List.prototype.CreateHeap = function (start,end) {
    var tmp = this.L[start];
    for (var j = 2 * start; j <= end; j *= 2) {
        /* 先找关键字较大的孩子结点 */
        if (j < end && this.L[j] < this.L[j + 1]) {
            ++j;
        }
        if (tmp >= this.L[j]) { /* 若根元素大于关键字较大的孩子结点 */
            break; /* 则根元素的位置不用改变 */
        }
        this.L[start] = this.L[j]; /* 否则将根元素改变为关键字较大的孩子结点 */
        start = j;
    }
    this.L[start] = tmp;
};
/* 堆排序 */
List.prototype.HeapSort = function () {
    /* 首先将数组调整为大顶堆 */
    /* 从下到上、从右到左将每个非叶子结点当做根结点，将其和其子树调整成大顶堆 */
    for (var i = parseInt(this.length / 2); i > 0; i--) {
        this.CreateHeap(i, this.length);
    }

    var tmp;
    for (var i = this.length; i > 1; i--) { /* 当前大顶堆个数每次递减1 */
        /* 将堆顶元素和当前大顶堆的最后一个元素交换*/
        tmp = this.L[1];
        this.L[1] = this.L[i];
        this.L[i] = tmp;

        /* 调整根结点满足大顶堆（注意：此时大顶堆结点个数为 i-1 */
        this.CreateHeap(1, i - 1);

    }
};

/**
 * 快速排序
 * @param low 数组的低端下标
 * @param high 数组的高端下标
 */
List.prototype.QuickSort = function (low,high) {
    var i = low, j = high;
    var key = this.L[low]; /* 取第一个元素为标准数据元素 */
    while(i<j){
        /* 在数组的右端扫描 */
        while (i < j && key <= this.L[j]){
            j--;
        }
        /* 找到比key小的数据元素的下标，将其移到前面 */
        if (i < j){
            this.L[i] = this.L[j];
            i++;
        }

        /* 在数组的左端扫描 */
        while (i < j && this.L[i] < key) {
            i++;
        }
        /* 找到比key大的数据元素的下标，将其移到后面 */
        if (i < j){
            this.L[j] = this.L[i];
            j--;
        }
    }
    this.L[i] = key;
    if (low < i) {
        this.QuickSort(low,i-1);
    }
    if (j < high){
        this.QuickSort(j+1,high);
    }
};

/**
 *  一次二路归并排序算法
 * @param a 要排序的序列
 * @param s 开始坐标
 * @param m 中间坐标
 * @param e 结束坐标
 */
function Merge(a,  s,  m,  e)
{
    var n1 = m - s + 1; /*前半段长度*/
    var n2 = e - m; /*后半段长度*/
    var L = [];
    var R = [];
    var i, j, k;

    for (i = 0; i < n1; i++){
        L[i] = a[s + i];
    }
    for (j = 0; j < n2; j++){
        R[j] = a[m + j + 1];
    }
    L[n1] = 10000000;
    R[n2] = 10000000;

    /* 将 前段数据与后段数据 比较由小到大归并入 L 中 */
    for (i = 0, j = 0, k = s; k <= e; k++)
    {
        if (L[i] <= R[j])
        {
            a[k] = L[i];
            i++;
        }
        else{
            a[k] = R[j];
            j++;
        }
    }

}

/* 归并排序 */
/**
 * 归并排序算法
 * @param a 要排序的序列
 * @param s 起始坐标
 * @param e 结束坐标
 */
function MergeSort(a, s, e) {
    if (s < e) {
        var m = parseInt((s + e) / 2);
        MergeSort(a, s, m);
        MergeSort(a, m + 1, e);
        Merge(a, s, m, e);
    }
}