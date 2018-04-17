/**
 * Created by fl-new on 2018/1/10.
 */

/**
 * Sunday算法
 * @param dest 主串
 * @param pattern 模式串
 * @returns {number}
 */
function sunday(dest, pattern) {

    var pos = 0,
        destLen = dest.length,
        patternLen = pattern.length;

    //使用hash方法：用字符编码作为下标而不是位置数字作为下标，这样可以直接得到相匹配的最右边的位置。
    var next = [];
    for (var i = 0; i < 256; i++){
        next[i] = -1;
    }
    for (var i = 0; i < patternLen; i++){
        next[pattern[i].charCodeAt(0)] = i;
    }

    while (pos < destLen - patternLen + 1) {
        for (var i = pos, j = 0; j < patternLen && i < destLen && dest[i] == pattern[j]; i++, j++)
            ;

        if (j == patternLen)
            return pos;
        else {
            if (pos + patternLen < destLen)
                pos += (patternLen - next[dest[pos + patternLen].charCodeAt(0)]);
            else
                return -1;
        }
    }
    return -1;
}