/* 顺序表（线性表）查找 */
function Sequential_Search(a,key){
    var i;
    for(i=0;i< a.length;i++){
        if(a[i]==key){
            return i;
        }
    }
    return a.length;
}
/* 顺序表（线性表）查找 优化 */
function Sequential_Search2(a,key){
    a[a.length] = key; /* 设置a[n]为关键字值，即“哨兵” */

    var i = 0; /* 从头循环数组 */
    while (a[i] != key) {
        i++;
    }
    return i;/* 返回 n 则说明查找失败 */
}

/* 折半查找 */
function Binary_Search(a,key){
    var low,high,mid;
    low = 0; /* 定义最低下标为记录首 */
    high = a.length-1; /* 定义最高下标为记录尾 */
    while (low <= high) {
        mid = parseInt((low + high) / 2); /* 折半 */
        if (key < a[mid]) { /* 若查找值比中值小 */
            high = mid - 1; /* 最高下表调整到中间下标小一位 */
        }else if(key >a[mid]){ /* 若查找值比中值大 */
            low = mid + 1; /* 最低下表调整到中间下标大一位 */
        }else{
            return mid; /* 若相等则说明 mid 即为查找到的位置 */
        }
    }
    return a.length; /* 返回原数组长度则说明查找失败 */
}

/* 插值查找 */
function Interpolation_search(a,key){
    var low,high,mid;
    low = 0; /* 定义最低下标为记录首 */
    high = a.length-1; /* 定义最高下标为记录尾 */
    while (low <= high) {
        mid = parseInt(low + (key -a[low]) / (a[high]-a[low])*(high-low)); /* 插值 */
        if (key < a[mid]) { /* 若查找值比中值小 */
            high = mid - 1; /* 最高下表调整到中间下标小一位 */
        }else if(key >a[mid]){ /* 若查找值比中值大 */
            low = mid + 1; /* 最低下表调整到中间下标大一位 */
        }else{
            return mid; /* 若相等则说明 mid 即为查找到的位置 */
        }
    }
    return a.length; /* 返回原数组长度则说明查找失败 */
}