/* 图 邻接矩阵 */
/*function Graph(v) {
    this.v = v;
    this.e = [];
    //边数组初始化
    for (var i = 0; i < this.v.length; i++) {
        this.e[i] = [];
        for (var j = 0; j < this.v.length; j++) {
            if (i === j) {
                this.e[i][j] = 0;
            } else {
                this.e[i][j] = 65535;
            }
        }
    }

    this.D = [];
    this.P = [];
}

Graph.prototype.addEdge = function (v1, v2, data) {
    this.e[v1][v2] = data;
    this.e[v2][v1] = data;
}
Graph.prototype.shortestPath_Floyd = function () {

    /!* 初始化 D 与 P *!/
    this.D = this.e; /!* D为路径的权值 *!/
    for (i = 0; i < this.v.length; i++) {
        this.P[i] = [];
        for (var j = 0; j < this.v.length; j++) {
            this.P[i][j] = j;
        }
    }

    var i, j, k;
    for (k = 0; k < this.v.length; k++) {
        for (i = 0; i < this.v.length; i++) {
            for (j = 0; j < this.v.length; j++) {
                /!* 如果经过下标为 k 顶点路径比原两点间路径更短 *!/
                if (this.D[i][j] > this.D[i][k] + this.D[k][j]) {
                    /!* 将当前两点间权值设为更小的一个 *!/
                    this.D[i][j] = this.D[i][k] + this.D[k][j];
                    this.P[i][j] = this.P[i][k]; /!* 路径设置经过下标为 k 的顶点 *!/
                }
            }
        }
    }
}

/!* 最短路径的显示 *!/
Graph.prototype.shortestPathShow = function () {
    for(var i =0;i<this.v.length;i++){
        for(var j=0;j<this.v.length;j++){
            console.group("v"+i+" - v"+j+" 的路径长度为"+this.D[i][j]+"，路径为:");
            console.log(i); /!* 打印源点 *!/
            var k = this.P[i][j]; /!* 获得第一个路径顶点下标 *!/
            while(k!=j){
                console.log(k); /!* 打印路径顶点 *!/
                k=this.P[k][j];
            }
            console.log(j); /!* 打印终点 *!/
            console.groupEnd();
        }
    }
}*/

/* 图 邻接表 */
/*function Graph(v) {
    this.v = v;
    this.e = [];
    for (var i = 0; i < this.v.length; i++) {
        this.e[i] = [];
    }
    this.visited = [];
    for (var i = 0; i < this.v.length; ++i) {
        this.visited[i] = false;
    }
}
Graph.prototype.addEdge = function (v1, v2) {
    var v1Index = v1.charCodeAt(0) - 'A'.charCodeAt(0);
    var v2Index = v2.charCodeAt(0) - 'A'.charCodeAt(0);
    this.e[v1Index].push(v2Index);
    this.e[v2Index].push(v1Index);
}
Graph.prototype.DFSTraverse = function (v) {
    //获取顶点对应的下标（因为这里存储的是大写字母，若存储的是顶点是number则不需要这一步）
    var vIndex = v.charCodeAt(0) - 'A'.charCodeAt(0);
    this.visited[vIndex] = true;
    console.log("Visited vertex: " + v);
    for (var i in this.e[vIndex]) {
        //console.log(this.e[vIndex][i]);
        var next_v = this.e[vIndex][i]
        if (!this.visited[next_v]) {
            this.DFSTraverse(this.v[next_v]);
        }
    }
}

Graph.prototype.BFSTraverse = function (v) {
    var queue = [];
    var vIndex = v.charCodeAt(0) - 'A'.charCodeAt(0);
    this.visited[vIndex] = true;
    queue.push(vIndex);
    while (queue.length > 0) {
        var vOut = queue.shift();
        console.log("Visited vertex: " + this.v[vOut]);
        for (var i in this.e[vOut]) {
            var next_v = this.e[vOut][i];
            if (!this.visited[next_v]) {
                this.visited[next_v] = true;
                queue.push(next_v);
            }
        }
    }
}*/

/* 求拓扑排序的图类 */
function Graph(v) {
    this.v = [];
    for (var i in v) {
        this.v[i] = {
            data: v[i],
            in: 0 /* 增加一个入度属性 */
        }
    }
    this.e = [];
    for (var i = 0; i < this.v.length; i++) {
        this.e[i] = [];
    }
}
Graph.prototype.addEdge = function (v1, v2) {
    this.v[v2].in++; /* 弧尾顶点的入度加一 */
    this.e[v1].push(v2);
}

Graph.prototype.TopoSort= function () {
    var count = 0; /* 统计输出顶点的个数 */
    var stack = []; /* 建栈存储入度为 0 的顶点*/
    for(var i in this.v){
        if(this.v[i].in === 0){
            stack.push(this.v[i].data); /* 将入度为 0 的顶点入栈*/
        }
    }
    console.group("输出顶点序列如下：");
    while(stack.length!=0){
        var gettop = stack.pop();
        console.log(this.v[gettop].data); /* 打印出栈顶点 */
        count++; /* 统计输出顶点数 */
        for(var i in this.e[gettop]){ /* 对此顶点弧表遍历 */
            var k = this.e[gettop][i];
            if(!(--this.v[k].in)){ /* 将 k 顶点邻接点入度减一 */
                stack.push(k); /* 若为 0 则入栈 */
            }
        }
    }
    console.groupEnd();
    if(count<this.v.length){
        console.log("此有向图有环。");
    }else{
        console.log("此有向图无环。");
    }
}
